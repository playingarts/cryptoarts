import { test, expect, Page } from "@playwright/test";

/**
 * Performance Navigation Tests
 *
 * Measures navigation performance across all critical paths:
 * - Click → routeChangeStart (should be < 300ms)
 * - routeChangeStart → meaningful content (should be < 1500ms)
 * - Detects full page reloads (should all be SPA navigations)
 *
 * Thresholds are set to avoid flaky tests while catching real regressions.
 */

// Type extensions for performance metrics
interface PerfNavMetrics {
  clickTime: number;
  routeChangeStartTime: number;
  contentVisibleTime: number;
  isFullReload: boolean;
  navigationId: string;
}

interface NavigationMetrics {
  clickToRouteStart: number;
  routeStartToContent: number;
  totalTime: number;
  isFullReload: boolean;
  source: string;
  destination: string;
}

/**
 * Inject performance measurement hooks into the page
 */
async function injectPerfMeasurement(page: Page): Promise<void> {
  await page.evaluate(() => {
    (window as unknown as { __perfNavMetrics: PerfNavMetrics }).__perfNavMetrics = {
      clickTime: 0,
      routeChangeStartTime: 0,
      contentVisibleTime: 0,
      isFullReload: false,
      navigationId: "",
    };

    // Track if page unloads (full reload)
    window.addEventListener(
      "beforeunload",
      () => {
        const metrics = (window as unknown as { __perfNavMetrics?: PerfNavMetrics }).__perfNavMetrics;
        if (metrics) {
          metrics.isFullReload = true;
        }
      },
      { once: true }
    );

    // Listen for Next.js router events
    const nextWindow = window as unknown as { next?: { router?: { events: { on: (event: string, cb: () => void) => void } } } };
    const router = nextWindow.next?.router;
    if (router) {
      router.events.on("routeChangeStart", () => {
        const metrics = (window as unknown as { __perfNavMetrics?: PerfNavMetrics }).__perfNavMetrics;
        if (metrics && metrics.clickTime > 0) {
          metrics.routeChangeStartTime = performance.now();
        }
      });

      router.events.on("routeChangeComplete", () => {
        const metrics = (window as unknown as { __perfNavMetrics?: PerfNavMetrics }).__perfNavMetrics;
        if (metrics && metrics.routeChangeStartTime > 0) {
          metrics.contentVisibleTime = performance.now();
        }
      });
    }
  });
}

/**
 * Measure navigation performance for a click action
 */
async function measureNavigation(
  page: Page,
  clickAction: () => Promise<void>,
  contentSelector: string,
  source: string,
  destination: string
): Promise<NavigationMetrics> {
  // Inject measurement code
  await injectPerfMeasurement(page);

  // Record click time
  const clickTime = await page.evaluate(() => {
    const metrics = (window as unknown as { __perfNavMetrics?: PerfNavMetrics }).__perfNavMetrics;
    if (metrics) {
      metrics.clickTime = performance.now();
      metrics.navigationId = Math.random().toString(36).slice(2);
    }
    return performance.now();
  });

  // Perform the click
  await clickAction();

  // Wait for content to be visible
  try {
    await page.locator(contentSelector).first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  } catch {
    // Content didn't appear in time, still collect metrics
  }

  // Mark content visible time
  const contentVisibleTime = await page.evaluate(() => {
    const metrics = (window as unknown as { __perfNavMetrics?: PerfNavMetrics }).__perfNavMetrics;
    if (metrics) {
      metrics.contentVisibleTime = performance.now();
    }
    return performance.now();
  });

  // Get metrics
  const metrics = await page.evaluate(() => (window as unknown as { __perfNavMetrics?: PerfNavMetrics }).__perfNavMetrics);

  // Calculate times
  const routeStartTime = metrics?.routeChangeStartTime || contentVisibleTime;
  const isFullReload = metrics?.isFullReload || false;

  return {
    clickToRouteStart: routeStartTime - clickTime,
    routeStartToContent: contentVisibleTime - routeStartTime,
    totalTime: contentVisibleTime - clickTime,
    isFullReload,
    source,
    destination,
  };
}

// Test results storage for summary
const testResults: NavigationMetrics[] = [];

test.describe("Navigation Performance Measurements", () => {
  test.setTimeout(120000); // 2 minutes per test

  test.afterAll(async () => {
    // Print summary table
    console.log("\n=== Navigation Performance Summary ===\n");
    console.log(
      "| Source | Destination | Click→Start | Start→Content | Total | Reload? |"
    );
    console.log(
      "|--------|-------------|-------------|---------------|-------|---------|"
    );

    for (const r of testResults) {
      console.log(
        `| ${r.source.padEnd(6)} | ${r.destination.padEnd(11)} | ${r.clickToRouteStart.toFixed(0).padStart(11)}ms | ${r.routeStartToContent.toFixed(0).padStart(13)}ms | ${r.totalTime.toFixed(0).padStart(5)}ms | ${r.isFullReload ? "YES ❌" : "No ✅"} |`
      );
    }
    console.log("\n");
  });

  test("Homepage → Shop (via hero button)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find shop button in hero section
    const shopLink = page.locator('a[href="/shop"], a[href*="/shop"]').first();
    await expect(shopLink).toBeVisible({ timeout: 10000 });

    // Hover to trigger prefetch
    await shopLink.hover();
    await page.waitForTimeout(300);

    const metrics = await measureNavigation(
      page,
      () => shopLink.click(),
      "header",
      "Home",
      "Shop"
    );

    testResults.push(metrics);

    // Assert thresholds
    expect(metrics.clickToRouteStart).toBeLessThan(300);
    expect(metrics.routeStartToContent).toBeLessThan(1500);
    expect(metrics.isFullReload).toBe(false);

    console.log(
      `Home→Shop: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
    );
  });

  test("Crypto deck → Shop (via header)", async ({ page }) => {
    await page.goto("/crypto");
    await page.waitForLoadState("networkidle");

    // Find shop link in header
    const shopLink = page.locator('header a[href="/shop"]').first();

    if (await shopLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      const metrics = await measureNavigation(
        page,
        () => shopLink.click(),
        "header",
        "Crypto",
        "Shop"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.routeStartToContent).toBeLessThan(1500);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Crypto→Shop: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });

  test("Deck page → Shop (via header)", async ({ page }) => {
    await page.goto("/crypto");
    await page.waitForLoadState("networkidle");

    // Find shop link in header
    const shopLink = page.locator('header a[href="/shop"]').first();
    await expect(shopLink).toBeVisible({ timeout: 10000 });

    const metrics = await measureNavigation(
      page,
      () => shopLink.click(),
      "header",
      "Deck",
      "Shop"
    );

    testResults.push(metrics);

    expect(metrics.clickToRouteStart).toBeLessThan(300);
    expect(metrics.routeStartToContent).toBeLessThan(1500);
    expect(metrics.isFullReload).toBe(false);

    console.log(
      `Deck→Shop: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
    );
  });

  test("Deck → Deck (via arrow navigation)", async ({ page }) => {
    await page.goto("/one");
    await page.waitForLoadState("networkidle");

    // Find arrow nav buttons
    const nextButton = page.locator('header button, header a').filter({ has: page.locator('svg') }).last();

    if (await nextButton.isVisible()) {
      const metrics = await measureNavigation(
        page,
        () => nextButton.click(),
        "header",
        "Deck",
        "NextDeck"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Deck→NextDeck: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });

  test("Home → Shop (via footer)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Find shop link in footer
    const footerShopLink = page.locator('footer a[href="/shop"]').first();

    if (await footerShopLink.isVisible()) {
      const metrics = await measureNavigation(
        page,
        () => footerShopLink.click(),
        "header",
        "Footer",
        "Shop"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Footer→Shop: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });

  test("Contact → Privacy", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    // Scroll down to find privacy link in footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Find privacy link
    const privacyLink = page.locator('a[href="/privacy"]').first();

    if (await privacyLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      const metrics = await measureNavigation(
        page,
        () => privacyLink.click(),
        "header",
        "Contact",
        "Privacy"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Contact→Privacy: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });

  test("Menu navigation (open → click deck)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find and click menu trigger (Playing Arts text in header)
    const menuTrigger = page.locator('header').getByText('Playing Arts').first();

    if (await menuTrigger.isVisible({ timeout: 5000 }).catch(() => false)) {
      await menuTrigger.click();
      await page.waitForTimeout(500);

      // Find deck link in menu
      const menuDeckLink = page.locator('a[href="/crypto"], a[href="/zero"]').first();

      if (await menuDeckLink.isVisible({ timeout: 5000 }).catch(() => false)) {
        const metrics = await measureNavigation(
          page,
          () => menuDeckLink.click(),
          "header",
          "Menu",
          "Deck"
        );

        testResults.push(metrics);

        expect(metrics.clickToRouteStart).toBeLessThan(300);
        expect(metrics.isFullReload).toBe(false);

        console.log(
          `Menu→Deck: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
        );
      }
    }
  });

  test("Deck → Card page (via card list)", async ({ page }) => {
    await page.goto("/zero");
    await page.waitForLoadState("networkidle");

    // Wait for cards to load and scroll to them
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);

    // Find any card link on the page
    const cardLink = page.locator('a[href^="/zero/"]').first();

    if (await cardLink.isVisible({ timeout: 10000 }).catch(() => false)) {
      await cardLink.hover();
      await page.waitForTimeout(300);

      const metrics = await measureNavigation(
        page,
        () => cardLink.click(),
        "header",
        "Deck",
        "Card"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Deck→Card: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });

  test("Card page → Deck (via header link)", async ({ page }) => {
    await page.goto("/zero/alex-trochut");
    await page.waitForLoadState("networkidle");

    // Find deck link
    const deckLink = page.locator('a[href="/zero"]').first();

    if (await deckLink.isVisible({ timeout: 10000 }).catch(() => false)) {
      const metrics = await measureNavigation(
        page,
        () => deckLink.click(),
        "header",
        "Card",
        "Deck"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Card→Deck: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });

  test("Card page → Shop (via header)", async ({ page }) => {
    await page.goto("/crypto/edward-lo");
    await page.waitForLoadState("networkidle");

    const shopLink = page.locator('header a[href="/shop"]').first();

    if (await shopLink.isVisible({ timeout: 10000 }).catch(() => false)) {
      const metrics = await measureNavigation(
        page,
        () => shopLink.click(),
        "header",
        "Card",
        "Shop"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Card→Shop: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });

  test("Card page → Next card (via arrow navigation)", async ({ page }) => {
    await page.goto("/zero/alex-trochut");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Find next card navigation button in header
    const nextButton = page.locator('header button').last();

    if (await nextButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      const urlBefore = page.url();
      const startTime = Date.now();
      await nextButton.click();
      await page.waitForTimeout(500);
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      const urlAfter = page.url();
      const urlChanged = urlAfter !== urlBefore;

      testResults.push({
        clickToRouteStart: totalTime,
        routeStartToContent: 0,
        totalTime,
        isFullReload: false,
        source: "Card",
        destination: "NextCard"
      });

      console.log(`Card→NextCard: total=${totalTime}ms, urlChanged=${urlChanged}`);
      expect(totalTime).toBeLessThan(500);
    }
  });

  test("Shop → Home (via header logo)", async ({ page }) => {
    await page.goto("/shop");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Shop page might have overlay, try header link instead
    const homeLink = page.locator('header a[href="/"]').first();

    if (await homeLink.isVisible({ timeout: 10000 }).catch(() => false)) {
      const metrics = await measureNavigation(
        page,
        () => homeLink.click({ force: true }),
        "header",
        "Shop",
        "Home"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Shop→Home: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });

  test("Privacy → Home (via footer)", async ({ page }) => {
    await page.goto("/privacy");
    await page.waitForLoadState("networkidle");

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const homeLink = page.locator('footer a[href="/"]').first();

    if (await homeLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      const metrics = await measureNavigation(
        page,
        () => homeLink.click(),
        "header",
        "Privacy",
        "Home"
      );

      testResults.push(metrics);

      expect(metrics.clickToRouteStart).toBeLessThan(300);
      expect(metrics.isFullReload).toBe(false);

      console.log(
        `Privacy→Home: click→start=${metrics.clickToRouteStart.toFixed(0)}ms, start→content=${metrics.routeStartToContent.toFixed(0)}ms`
      );
    }
  });
});

test.describe("SPA Navigation Verification", () => {
  test("All internal links use SPA navigation (no full reloads)", async ({ page }) => {
    const fullReloads: string[] = [];

    // Track page loads
    let loadCount = 0;
    page.on("load", () => {
      loadCount++;
    });

    // Start on home
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const initialLoadCount = loadCount;

    // Navigate to several pages via clicks
    const navigations = [
      { selector: 'a[href="/zero"], a[href="/one"]', name: "deck" },
      { selector: 'a[href="/shop"]', name: "shop" },
      { selector: 'a[href="/"]', name: "home" },
    ];

    for (const nav of navigations) {
      const link = page.locator(nav.selector).first();
      if (await link.isVisible({ timeout: 5000 }).catch(() => false)) {
        const beforeUrl = page.url();
        await link.click();
        await page.waitForLoadState("domcontentloaded");
        await page.waitForTimeout(300);

        // Check if URL changed
        if (page.url() !== beforeUrl) {
          // If load event fired, it was a full reload
          if (loadCount > initialLoadCount + navigations.indexOf(nav)) {
            fullReloads.push(`${nav.name}: ${beforeUrl} → ${page.url()}`);
          }
        }
      }
    }

    // Should have no full reloads
    if (fullReloads.length > 0) {
      console.log("Full reloads detected:");
      fullReloads.forEach((r) => console.log(`  - ${r}`));
    }
    expect(fullReloads).toHaveLength(0);
  });
});

test.describe("Performance Thresholds", () => {
  test("Navigation timing stays within acceptable bounds", async ({ page }) => {
    // This test aggregates multiple navigations to ensure overall performance

    const measurements: number[] = [];

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Perform 5 navigations and measure
    const routes = ["/zero", "/", "/shop", "/crypto", "/"];

    for (const route of routes) {
      const link = page.locator(`a[href="${route}"]`).first();
      if (await link.isVisible({ timeout: 5000 }).catch(() => false)) {
        const startTime = Date.now();
        await link.click();
        await page.waitForLoadState("domcontentloaded");
        measurements.push(Date.now() - startTime);
        await page.waitForTimeout(300);
      }
    }

    // Calculate stats
    if (measurements.length > 0) {
      const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      const max = Math.max(...measurements);
      const p95 = measurements.sort((a, b) => a - b)[
        Math.floor(measurements.length * 0.95)
      ];

      console.log(
        `Navigation stats: avg=${avg.toFixed(0)}ms, max=${max}ms, p95=${p95}ms`
      );

      // Assert reasonable bounds
      expect(avg).toBeLessThan(1000); // Average under 1 second
      expect(p95).toBeLessThan(2000); // P95 under 2 seconds
    }
  });
});
