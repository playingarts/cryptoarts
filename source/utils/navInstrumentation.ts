/**
 * Navigation Instrumentation for debugging slow navigation
 *
 * Enable by adding ?debugNav to URL or setting localStorage.debugNav=true
 * This logs click→routeStart→routeComplete timing to console
 */

interface NavTiming {
  clickTime: number;
  routeChangeStart?: number;
  routeChangeComplete?: number;
  source: string;
  href: string;
}

let currentNavTiming: NavTiming | null = null;

// Track in console only when enabled (check lazily to avoid SSR issues)
const isDebugEnabled = () => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('debugNav') ||
    localStorage.getItem('debugNav') === 'true';
};

export const startNavTiming = (source: string, href: string) => {
  if (!isDebugEnabled()) return;

  currentNavTiming = {
    clickTime: performance.now(),
    source,
    href,
  };
  // eslint-disable-next-line no-console
  console.log(`[Nav] Click detected on ${source} → ${href}`);
};

export const markRouteChangeStart = () => {
  if (!isDebugEnabled() || !currentNavTiming) return;

  currentNavTiming.routeChangeStart = performance.now();
  const clickToStart = currentNavTiming.routeChangeStart - currentNavTiming.clickTime;
  // eslint-disable-next-line no-console
  console.log(`[Nav] Route change START - click→start: ${clickToStart.toFixed(1)}ms`);
};

export const markRouteChangeComplete = () => {
  if (!isDebugEnabled() || !currentNavTiming) return;

  currentNavTiming.routeChangeComplete = performance.now();
  const startToComplete = currentNavTiming.routeChangeComplete - (currentNavTiming.routeChangeStart || currentNavTiming.clickTime);
  const totalTime = currentNavTiming.routeChangeComplete - currentNavTiming.clickTime;

  // eslint-disable-next-line no-console
  console.log(`[Nav] Route change COMPLETE`);
  // eslint-disable-next-line no-console
  console.log(`[Nav] Summary for ${currentNavTiming.source} → ${currentNavTiming.href}:`);
  // eslint-disable-next-line no-console
  console.log(`  Click → RouteStart: ${((currentNavTiming.routeChangeStart || 0) - currentNavTiming.clickTime).toFixed(1)}ms`);
  // eslint-disable-next-line no-console
  console.log(`  RouteStart → Complete: ${startToComplete.toFixed(1)}ms`);
  // eslint-disable-next-line no-console
  console.log(`  Total: ${totalTime.toFixed(1)}ms`);

  // Reset for next navigation
  currentNavTiming = null;
};

// Initialize router event listeners
type RouterEvents = {
  on: (event: 'routeChangeStart' | 'routeChangeComplete', handler: () => void) => void;
  off: (event: 'routeChangeStart' | 'routeChangeComplete', handler: () => void) => void;
};

export const initNavInstrumentation = (router: { events: RouterEvents }) => {
  if (!isDebugEnabled()) return () => {};

  // eslint-disable-next-line no-console
  console.log('[Nav] Instrumentation enabled. Add ?debugNav or set localStorage.debugNav=true');

  const handleStart = () => markRouteChangeStart();
  const handleComplete = () => markRouteChangeComplete();

  router.events.on('routeChangeStart', handleStart);
  router.events.on('routeChangeComplete', handleComplete);

  return () => {
    router.events.off('routeChangeStart', handleStart);
    router.events.off('routeChangeComplete', handleComplete);
  };
};

export default { startNavTiming, markRouteChangeStart, markRouteChangeComplete, initNavInstrumentation };
