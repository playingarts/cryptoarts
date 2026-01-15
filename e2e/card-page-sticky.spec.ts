import { test, expect } from "@playwright/test";

test.describe("Card Page Hero Sticky", () => {
  test("card stays sticky when scrolling down the page", async ({ page }) => {
    // Navigate to a card page (Pages Router handles [deckId]/[artistSlug])
    await page.goto("/future/stefano-ronchi");

    // Wait for page to fully load
    await page.waitForLoadState("networkidle");

    // Wait for card image to load - the Card component uses alt="Card by {artist}"
    const cardImg = page.locator('img[alt*="Card by"]').first();
    await expect(cardImg).toBeVisible({ timeout: 20000 });

    // Get initial viewport position of the card
    const initialBoundingBox = await cardImg.boundingBox();
    expect(initialBoundingBox).not.toBeNull();
    const initialY = initialBoundingBox!.y;

    console.log(`Initial card Y position: ${initialY}`);

    // Scroll down significantly (more than the initial position)
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);

    // Get position after scroll
    const afterScrollBoundingBox = await cardImg.boundingBox();
    expect(afterScrollBoundingBox).not.toBeNull();
    const afterScrollY = afterScrollBoundingBox!.y;

    console.log(`After scroll card Y position: ${afterScrollY}`);

    // If sticky is working:
    // - The card should NOT have scrolled off screen (y should be > 0)
    // - The card should be near the top (around top: 100px sticky position)
    // - The y position should be roughly the same or only slightly changed (stuck)

    // Without sticky: card would have moved up by ~600px (scrolled away)
    // With sticky: card stays near its sticky position

    const yDifference = initialY - afterScrollY;
    console.log(`Y difference: ${yDifference} (should be small if sticky works, ~600 if not)`);

    // The card should have stayed mostly in place (within ~200px of original)
    // If sticky doesn't work, yDifference would be close to 600
    expect(yDifference).toBeLessThan(400); // Generous margin, but catches non-sticky behavior
    expect(afterScrollY).toBeGreaterThan(-100); // Should still be visible (not scrolled off)
  });
});
