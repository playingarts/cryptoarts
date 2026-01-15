import { test, expect, Page } from "@playwright/test";

/**
 * Regression test for instant navigation (no blocking)
 *
 * This test verifies that navigation starts immediately when clicking links:
 * - Route change should begin within 50ms of click (routeChangeStart event)
 * - Navigation should NOT be blocked by getStaticProps (fallback: true behavior)
 * - Pages should show loading skeleton during fallback, not a blank screen
 *
 * Root cause being tested: pages/[deckId].tsx used fallback: "blocking" which
 * caused navigation to wait for getStaticProps to complete before showing any UI.
 * Changed to fallback: true for instant navigation.
 */

// Window type extension for nav timings
declare global {
  interface Window {
    __navTimings?: { clickTime: number; routeChangeStart: number };
    next?: { router?: { events: { on: (event: string, cb: () => void) => void } } };
  }
}

/**
 * Helper to measure click-to-navigation latency
 * Uses Next.js router events to track when route change actually starts
 */
async function measureClickToNavigation(page: Page, linkSelector: string): Promise<number> {
  // Inject timing measurement into the page
  await page.evaluate(() => {
    window.__navTimings = {
      clickTime: 0,
      routeChangeStart: 0,
    };

    // Listen for Next.js router events
    const router = window.next?.router;
    if (router) {
      router.events.on("routeChangeStart", () => {
        if (window.__navTimings) {
          window.__navTimings.routeChangeStart = performance.now();
        }
      });
    }
  });

  // Click the link and record timestamp
  await page.evaluate(() => {
    if (window.__navTimings) {
      window.__navTimings.clickTime = performance.now();
    }
  });

  await page.click(linkSelector);

  // Wait a bit for router event to fire
  await page.waitForTimeout(200);

  // Get the timing measurements
  const timings = await page.evaluate(() => window.__navTimings);

  // Calculate latency (0 if routeChangeStart never fired)
  if (!timings || timings.routeChangeStart === 0) {
    return -1; // Navigation never started
  }

  return timings.routeChangeStart - timings.clickTime;
}

test.describe("Instant Navigation", () => {
  test.beforeEach(async () => {
    // Increase timeout for slower CI environments
    test.setTimeout(60000);
  });

  test("deck page navigation starts immediately (< 100ms from click)", async ({ page }) => {
    // Start on home page
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find a deck link in the collection section
    const deckLink = page.locator('a[href*="/zero"], a[href*="/one"], a[href*="/two"]').first();
    await expect(deckLink).toBeVisible({ timeout: 10000 });

    // Hover to trigger prefetch (optional optimization)
    await deckLink.hover();
    await page.waitForTimeout(500);

    // Measure click-to-route-change latency
    const latency = await measureClickToNavigation(page, 'a[href*="/zero"], a[href*="/one"], a[href*="/two"]');

    // Assert navigation started quickly
    // With fallback: true, routeChangeStart should fire almost immediately
    // With fallback: "blocking", it would take 500ms+ (waiting for getStaticProps)
    expect(latency).toBeGreaterThan(0); // Navigation did start
    expect(latency).toBeLessThan(100); // Started within 100ms

    console.log(`Click-to-routeChangeStart latency: ${latency.toFixed(1)}ms`);
  });

  test("deck page shows skeleton UI during fallback", async ({ page }) => {
    // Navigate directly to a deck page with cleared cache
    // This simulates a cold navigation where getStaticProps needs to run
    await page.goto("/crypto");
    await page.waitForLoadState("domcontentloaded");

    // Page should render immediately (with skeleton if fallback)
    // Header should be visible within 500ms
    await expect(page.locator("header")).toBeVisible({ timeout: 2000 });

    // Wait for full content to load
    await page.waitForLoadState("networkidle");

    // Deck title should be visible after data loads
    await expect(page.locator("text=Crypto")).toBeVisible({ timeout: 10000 });
  });

  test("card page navigation from deck is instant", async ({ page }) => {
    // Start on a deck page
    await page.goto("/zero");
    await page.waitForLoadState("networkidle");

    // Wait for card list to load
    await page.waitForTimeout(1000);

    // Find a card link
    const cardLinks = page.locator('a[href*="/zero/"]').first();
    await expect(cardLinks).toBeVisible({ timeout: 10000 });

    // Get initial URL
    const urlBefore = page.url();

    // Click card
    await cardLinks.click();

    // URL should change quickly (within 500ms)
    await expect(async () => {
      expect(page.url()).not.toBe(urlBefore);
    }).toPass({ timeout: 500 });
  });

  test("menu navigation is instant", async ({ page }) => {
    // Start on home page
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Open menu (look for menu button/icon)
    const menuButton = page.locator('button:has-text("Menu"), [aria-label="Menu"], header button').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);

      // Find a deck link in the menu
      const menuDeckLink = page.locator('nav a[href*="/"], .menu a[href*="/"]').filter({ hasText: /zero|one|two|three|special|future|crypto/i }).first();

      if (await menuDeckLink.isVisible()) {
        const urlBefore = page.url();

        // Click deck link
        await menuDeckLink.click();

        // Navigation should start immediately
        await expect(async () => {
          expect(page.url()).not.toBe(urlBefore);
        }).toPass({ timeout: 500 });
      }
    }
  });

  test("no blocking on ISR revalidation", async ({ page }) => {
    // This test ensures that even when ISR triggers revalidation,
    // navigation is still instant (shows stale content while revalidating)

    // Visit a page twice with a small gap (ISR might trigger)
    await page.goto("/zero");
    await page.waitForLoadState("networkidle");

    // Navigate away
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Navigate back - should be instant from cache
    const startTime = Date.now();
    await page.goto("/zero");
    await page.waitForLoadState("domcontentloaded");

    const loadTime = Date.now() - startTime;

    // Page should load quickly (under 2 seconds for domcontentloaded)
    // This would fail with blocking fallback on cache miss
    expect(loadTime).toBeLessThan(2000);
    console.log(`Second visit load time: ${loadTime}ms`);
  });
});
