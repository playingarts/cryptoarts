/**
 * Navigation Performance Tracer
 *
 * Enable with ?perfNav=1 query param or localStorage.perfNav=true
 *
 * Tracks comprehensive navigation metrics:
 * - t_click: When link click event fires
 * - t_routeStart: Next.js routeChangeStart event
 * - t_routeComplete: Next.js routeChangeComplete event
 * - t_paint: First Paint timing
 * - t_lcp: Largest Contentful Paint timing
 * - Long Tasks during navigation
 * - Network requests during navigation
 */

export interface NavigationEntry {
  id: string;
  source: string;
  sourceComponent: string;
  destinationPath: string;
  navigationType: 'spa' | 'full-reload' | 'hash';

  // Timing (ms from navigation epoch)
  t_click: number;
  t_routeStart: number | null;
  t_routeComplete: number | null;
  t_firstPaint: number | null;
  t_lcp: number | null;

  // Derived metrics
  clickToRouteStart: number | null;
  routeStartToComplete: number | null;
  routeStartToLCP: number | null;
  totalTime: number | null;

  // Long tasks
  longTasks: Array<{
    startTime: number;
    duration: number;
    phase: 'pre-route' | 'during-route' | 'post-route';
  }>;
  longTasksTotalMs: number;

  // Network requests
  networkRequests: Array<{
    url: string;
    startTime: number;
    duration: number;
    phase: 'pre-route' | 'during-route';
    initiatorType: string;
  }>;
  blockingRequests: string[];

  // Context
  hadAwaitBeforeNav: boolean;
  timestamp: number;
}

// In-memory store for recent navigations
const MAX_ENTRIES = 20;
let navigationHistory: NavigationEntry[] = [];
let currentNavigation: Partial<NavigationEntry> | null = null;
let navEpoch: number = 0;
let lcpObserver: PerformanceObserver | null = null;
let longTaskObserver: PerformanceObserver | null = null;
let resourceObserver: PerformanceObserver | null = null;
let pendingLongTasks: NavigationEntry['longTasks'] = [];
let pendingNetworkRequests: NavigationEntry['networkRequests'] = [];
let routeStartTime: number | null = null;

// Check if tracing is enabled
export const isPerfNavEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('perfNav') ||
    localStorage.getItem('perfNav') === 'true';
};

// Generate unique ID for each navigation
const generateNavId = () => `nav_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

// Log with styling
const logNav = (message: string, data?: unknown) => {
  if (!isPerfNavEnabled()) return;
  // eslint-disable-next-line no-console
  console.log(`%c[PerfNav]%c ${message}`, 'color: #00bcd4; font-weight: bold', 'color: inherit', data || '');
};

const logTable = (entries: NavigationEntry[]) => {
  if (!isPerfNavEnabled() || entries.length === 0) return;

  const tableData = entries.map(e => ({
    source: `${e.sourceComponent} → ${e.destinationPath}`,
    'click→start': e.clickToRouteStart !== null ? `${e.clickToRouteStart.toFixed(0)}ms` : '-',
    'start→complete': e.routeStartToComplete !== null ? `${e.routeStartToComplete.toFixed(0)}ms` : '-',
    'start→LCP': e.routeStartToLCP !== null ? `${e.routeStartToLCP.toFixed(0)}ms` : '-',
    'long tasks': `${e.longTasks.length} (${e.longTasksTotalMs.toFixed(0)}ms)`,
    'blocking': e.blockingRequests.length > 0 ? e.blockingRequests.join(', ') : 'none',
    type: e.navigationType,
  }));

  // eslint-disable-next-line no-console
  console.table(tableData);
};

// Start tracking a navigation
export const startPerfNavTiming = (
  source: string,
  sourceComponent: string,
  destinationPath: string,
  isHashLink: boolean = false
) => {
  if (!isPerfNavEnabled()) return;

  navEpoch = performance.now();
  routeStartTime = null;
  pendingLongTasks = [];
  pendingNetworkRequests = [];

  currentNavigation = {
    id: generateNavId(),
    source,
    sourceComponent,
    destinationPath,
    navigationType: isHashLink ? 'hash' : 'spa',
    t_click: 0, // Relative to epoch
    t_routeStart: null,
    t_routeComplete: null,
    t_firstPaint: null,
    t_lcp: null,
    longTasks: [],
    networkRequests: [],
    blockingRequests: [],
    hadAwaitBeforeNav: false,
    timestamp: Date.now(),
  };

  logNav(`Click: ${sourceComponent} → ${destinationPath}`);

  // Start observing performance entries
  startObservers();
};

// Mark that there was await before navigation
export const markAwaitBeforeNav = () => {
  if (!isPerfNavEnabled() || !currentNavigation) return;
  currentNavigation.hadAwaitBeforeNav = true;
  logNav('⚠️ Detected await before navigation!');
};

// Handle route change start
export const markPerfNavRouteStart = (url: string) => {
  if (!isPerfNavEnabled() || !currentNavigation) return;

  const now = performance.now();
  routeStartTime = now;
  currentNavigation.t_routeStart = now - navEpoch;
  currentNavigation.clickToRouteStart = currentNavigation.t_routeStart - (currentNavigation.t_click || 0);

  // Check if URL matches expected (detect full reloads)
  const destPath = currentNavigation.destinationPath || '';
  if (url !== destPath && !url.startsWith(destPath)) {
    logNav(`Route URL mismatch: expected ${destPath}, got ${url}`);
  }

  logNav(`Route Start: +${currentNavigation.t_routeStart.toFixed(0)}ms (click→start: ${currentNavigation.clickToRouteStart.toFixed(0)}ms)`);

  // Categorize pending long tasks
  pendingLongTasks.forEach(task => {
    if (task.startTime < currentNavigation!.t_routeStart!) {
      task.phase = 'pre-route';
    }
  });
};

// Handle route change complete
export const markPerfNavRouteComplete = (url: string) => {
  if (!isPerfNavEnabled() || !currentNavigation) return;

  const now = performance.now();
  currentNavigation.t_routeComplete = now - navEpoch;

  if (currentNavigation.t_routeStart !== null && currentNavigation.t_routeStart !== undefined) {
    currentNavigation.routeStartToComplete = currentNavigation.t_routeComplete - currentNavigation.t_routeStart;
  }

  logNav(`Route Complete: +${currentNavigation.t_routeComplete.toFixed(0)}ms (start→complete: ${currentNavigation.routeStartToComplete?.toFixed(0) || '-'}ms)`);

  // Wait a bit for LCP, then finalize
  setTimeout(() => finalizePerfNavEntry(), 500);
};

// Handle full page navigation (detected via beforeunload or similar)
export const markFullReload = () => {
  if (!isPerfNavEnabled() || !currentNavigation) return;
  currentNavigation.navigationType = 'full-reload';
  logNav('⚠️ Full page reload detected!');
};

// Finalize and store the navigation entry
const finalizePerfNavEntry = () => {
  if (!currentNavigation) return;

  // Stop observers
  stopObservers();

  // Process pending entries
  currentNavigation.longTasks = [...pendingLongTasks];
  currentNavigation.longTasksTotalMs = pendingLongTasks.reduce((sum, t) => sum + t.duration, 0);
  currentNavigation.networkRequests = [...pendingNetworkRequests];

  // Calculate final metrics
  const tRouteStart = currentNavigation.t_routeStart;
  const tLcp = currentNavigation.t_lcp;
  const tRouteComplete = currentNavigation.t_routeComplete;

  if (tRouteStart !== null && tRouteStart !== undefined && tLcp !== null && tLcp !== undefined) {
    currentNavigation.routeStartToLCP = tLcp - tRouteStart;
  }

  if (tRouteComplete !== null && tRouteComplete !== undefined) {
    currentNavigation.totalTime = tRouteComplete - (currentNavigation.t_click || 0);
  }

  // Store entry
  const entry = currentNavigation as NavigationEntry;
  navigationHistory.push(entry);
  if (navigationHistory.length > MAX_ENTRIES) {
    navigationHistory.shift();
  }

  // Log summary
  logNav('Navigation Summary:', {
    'click→routeStart': `${entry.clickToRouteStart?.toFixed(0) || '-'}ms`,
    'routeStart→complete': `${entry.routeStartToComplete?.toFixed(0) || '-'}ms`,
    'routeStart→LCP': `${entry.routeStartToLCP?.toFixed(0) || '-'}ms`,
    'longTasks': `${entry.longTasks.length} tasks (${entry.longTasksTotalMs.toFixed(0)}ms)`,
    'blockingRequests': entry.blockingRequests,
    'hadAwait': entry.hadAwaitBeforeNav,
  });

  // Reset
  currentNavigation = null;
};

// Performance observers
const startObservers = () => {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;

  // LCP observer
  try {
    lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry && currentNavigation) {
        currentNavigation.t_lcp = lastEntry.startTime - navEpoch;
        logNav(`LCP: +${currentNavigation.t_lcp.toFixed(0)}ms`);
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: false });
  } catch {
    // LCP not supported
  }

  // Long task observer
  try {
    longTaskObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const relativeStart = entry.startTime - navEpoch;
        const phase: 'pre-route' | 'during-route' | 'post-route' =
          routeStartTime === null ? 'pre-route' :
          entry.startTime < routeStartTime ? 'pre-route' : 'during-route';

        pendingLongTasks.push({
          startTime: relativeStart,
          duration: entry.duration,
          phase,
        });

        if (entry.duration > 100) {
          logNav(`⚠️ Long Task: ${entry.duration.toFixed(0)}ms at +${relativeStart.toFixed(0)}ms (${phase})`);
        }
      }
    });
    longTaskObserver.observe({ type: 'longtask', buffered: false });
  } catch {
    // Long tasks not supported
  }

  // Resource timing observer
  try {
    resourceObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const resourceEntry = entry as PerformanceResourceTiming;
        const relativeStart = resourceEntry.startTime - navEpoch;

        // Only track requests that started after our click
        if (relativeStart < 0) continue;

        const phase: 'pre-route' | 'during-route' =
          routeStartTime === null || resourceEntry.startTime < routeStartTime ? 'pre-route' : 'during-route';

        // Extract filename from URL for cleaner logging
        const url = resourceEntry.name;
        const filename = url.split('/').pop()?.split('?')[0] || url;

        pendingNetworkRequests.push({
          url: filename,
          startTime: relativeStart,
          duration: resourceEntry.duration,
          phase,
          initiatorType: resourceEntry.initiatorType,
        });

        // Check if this was a blocking request (started pre-route, significant duration)
        if (phase === 'pre-route' && resourceEntry.duration > 50 && currentNavigation) {
          currentNavigation.blockingRequests = currentNavigation.blockingRequests || [];
          if (!currentNavigation.blockingRequests.includes(filename)) {
            currentNavigation.blockingRequests.push(filename);
          }
        }
      }
    });
    resourceObserver.observe({ type: 'resource', buffered: false });
  } catch {
    // Resource timing not supported
  }
};

const stopObservers = () => {
  lcpObserver?.disconnect();
  longTaskObserver?.disconnect();
  resourceObserver?.disconnect();
  lcpObserver = null;
  longTaskObserver = null;
  resourceObserver = null;
};

// Initialize router event listeners
type RouterEvents = {
  on: (event: 'routeChangeStart' | 'routeChangeComplete' | 'beforeHistoryChange', handler: (url: string) => void) => void;
  off: (event: 'routeChangeStart' | 'routeChangeComplete' | 'beforeHistoryChange', handler: (url: string) => void) => void;
};

export const initPerfNavTracer = (router: { events: RouterEvents }) => {
  if (!isPerfNavEnabled()) return () => {};

  logNav('🚀 Performance Navigation Tracer Enabled');
  logNav('Access window.__perfNavHistory for last 20 navigations');
  logNav('Call window.__perfNavTable() to show summary table');

  // Expose to window for debugging
  if (typeof window !== 'undefined') {
    (window as { __perfNavHistory?: NavigationEntry[]; __perfNavTable?: () => void }).__perfNavHistory = navigationHistory;
    (window as { __perfNavTable?: () => void }).__perfNavTable = () => logTable(navigationHistory);
  }

  const handleStart = (url: string) => markPerfNavRouteStart(url);
  const handleComplete = (url: string) => markPerfNavRouteComplete(url);

  router.events.on('routeChangeStart', handleStart);
  router.events.on('routeChangeComplete', handleComplete);

  // Detect full reloads
  const handleBeforeUnload = () => markFullReload();
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    router.events.off('routeChangeStart', handleStart);
    router.events.off('routeChangeComplete', handleComplete);
    window.removeEventListener('beforeunload', handleBeforeUnload);
    stopObservers();
  };
};

// Get navigation history
export const getPerfNavHistory = (): NavigationEntry[] => [...navigationHistory];

// Clear history
export const clearPerfNavHistory = () => {
  navigationHistory = [];
  logNav('History cleared');
};

// Export summary for external analysis
export const exportPerfNavSummary = (): string => {
  const summary = navigationHistory.map(e => ({
    source: e.sourceComponent,
    destination: e.destinationPath,
    clickToStart: e.clickToRouteStart,
    startToComplete: e.routeStartToComplete,
    startToLCP: e.routeStartToLCP,
    longTasksMs: e.longTasksTotalMs,
    blocking: e.blockingRequests,
    type: e.navigationType,
    hadAwait: e.hadAwaitBeforeNav,
  }));
  return JSON.stringify(summary, null, 2);
};
