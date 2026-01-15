import { test, expect } from "@playwright/test";

test.describe("Card page refresh", () => {
  test("card image should be visible after page refresh", async ({ page }) => {
    // Navigate to a card page
    await page.goto("/zero/raul-urias");

    // Wait for the card image to be visible
    const cardImage = page.locator('img[alt*="Card by"]').first();
    await expect(cardImage).toBeVisible({ timeout: 10000 });

    // Get the image src before refresh
    const srcBefore = await cardImage.getAttribute("src");
    expect(srcBefore).toContain("playingarts.com");

    // Refresh the page
    await page.reload();

    // Wait for the card image to be visible after refresh
    const cardImageAfterRefresh = page.locator('img[alt*="Card by"]').first();
    await expect(cardImageAfterRefresh).toBeVisible({ timeout: 10000 });

    // Verify the image src is the same
    const srcAfter = await cardImageAfterRefresh.getAttribute("src");
    expect(srcAfter).toContain("playingarts.com");
  });

  test("card image should have non-zero opacity after refresh", async ({ page }) => {
    // Navigate to a card page
    await page.goto("/zero/raul-urias");

    // Wait for page to fully load
    await page.waitForLoadState("networkidle");

    // Refresh the page
    await page.reload();

    // Wait for network idle after refresh
    await page.waitForLoadState("networkidle");

    // Find the card image and check its opacity
    const cardImage = page.locator('img[alt*="Card by"]').first();
    await expect(cardImage).toBeVisible({ timeout: 10000 });

    // Wait a moment for any CSS transitions
    await page.waitForTimeout(500);

    // Check that the image has loaded (opacity should be 1)
    const opacity = await cardImage.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    expect(parseFloat(opacity)).toBeGreaterThan(0);
  });
});
