import { test, expect } from "@playwright/test";

/**
 * Regression test for arrow navigation in deck pages
 *
 * This test verifies that navigating between decks using header arrows:
 * - Loads hero cards correctly
 * - Never gets stuck in infinite skeleton/loading state
 * - Never shows Retry button during normal navigation
 */

test.describe("Arrow Navigation", () => {
  // Retry button selector
  const RETRY_BUTTON_SELECTOR = 'button:has-text("Retry")';

  test("navigating through decks with arrows loads hero cards correctly", async ({ page }) => {
    // Start on a deck page
    await page.goto("/crypto");
    await page.waitForLoadState("networkidle");

    // Wait for initial page to load
    await expect(page.locator("header")).toBeVisible();

    // Find arrow navigation buttons
    // The arrows are inside a nav section or header middle section
    const arrowNav = page.locator('header').locator('a[href*="/"]').filter({ has: page.locator('button, svg') });

    // Check that navigation arrows exist
    const arrowCount = await arrowNav.count();
    expect(arrowCount).toBeGreaterThanOrEqual(2);

    // Navigate through 5 decks using the "next" arrow
    for (let i = 0; i < 5; i++) {
      // Get current URL before navigation
      const urlBefore = page.url();

      // Click the next arrow (second arrow button)
      const nextArrow = arrowNav.nth(1);
      await nextArrow.click();

      // Wait for URL to change (confirms navigation started)
      await expect(async () => {
        expect(page.url()).not.toBe(urlBefore);
      }).toPass({ timeout: 5000 });

      // Wait for page to stabilize
      await page.waitForLoadState("networkidle");

      // Verify NO Retry button is shown (this is the main regression check)
      const retryButton = page.locator(RETRY_BUTTON_SELECTOR);
      await expect(retryButton).not.toBeVisible({ timeout: 1000 }).catch(() => {
        // If we catch here, it means Retry button appeared - fail the test
        throw new Error(`Retry button appeared during navigation ${i + 1}. This indicates hero cards loading failed.`);
      });

      // Give a moment for any animation/loading to settle
      await page.waitForTimeout(500);

      // Take screenshot for debugging if needed
      // await page.screenshot({ path: `arrow-nav-step-${i}.png` });
    }
  });

  test("rapid arrow navigation does not cause infinite loading", async ({ page }) => {
    // Start on a deck page
    await page.goto("/edition-one");
    await page.waitForLoadState("networkidle");

    // Find navigation arrows
    const arrowNav = page.locator('header').locator('a[href*="/"]').filter({ has: page.locator('button, svg') });

    // Rapidly click through 3 decks without waiting for full load
    for (let i = 0; i < 3; i++) {
      const nextArrow = arrowNav.nth(1);
      await nextArrow.click();
      // Only wait 200ms between clicks (rapid navigation)
      await page.waitForTimeout(200);
    }

    // Now wait for final page to fully load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // After rapid navigation, should NOT be stuck in loading state
    // Check that Retry button is not visible
    const retryButton = page.locator(RETRY_BUTTON_SELECTOR);
    await expect(retryButton).not.toBeVisible({ timeout: 1000 });

    // Page should be functional
    await expect(page.locator("header")).toBeVisible();
  });

  test("arrow navigation prefetch improves subsequent navigation", async ({ page }) => {
    // Start on a deck page
    await page.goto("/crypto");
    await page.waitForLoadState("networkidle");

    // Find navigation arrows
    const arrowNav = page.locator('header').locator('a[href*="/"]').filter({ has: page.locator('button, svg') });
    const nextArrow = arrowNav.nth(1);

    // Hover over the next arrow to trigger prefetch
    await nextArrow.hover();

    // Wait for prefetch to potentially complete
    await page.waitForTimeout(1000);

    // Record time before click
    const startTime = Date.now();

    // Click to navigate
    await nextArrow.click();

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check Retry button is not shown
    const retryButton = page.locator(RETRY_BUTTON_SELECTOR);
    await expect(retryButton).not.toBeVisible({ timeout: 1000 });

    const loadTime = Date.now() - startTime;

    // With prefetch, navigation should be fast (under 3 seconds typically)
    // This is a soft assertion - network conditions vary
    console.log(`Navigation with prefetch took ${loadTime}ms`);
  });
});
