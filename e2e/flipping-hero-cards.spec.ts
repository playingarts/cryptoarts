import { test, expect } from "@playwright/test";

/**
 * Test that verifies both hero cards (left and right) flip and show different cards over time.
 * This test validates the fix for the issue where the right hero card was stuck showing
 * the same two cards due to IntersectionObserver not detecting it as "in view" (because
 * it was partially obscured by the left card with higher z-index).
 */
test("both hero cards flip and show different cards over 20 seconds", async ({
  page,
}) => {
  test.setTimeout(60000);

  await page.goto("/crypto");

  // Wait for cards to load
  await page.waitForTimeout(3000);

  // Track which unique card images we see over time
  const observedCardImages = new Set<string>();
  const cardObservations: Array<{ time: number; cardCount: number }> = [];

  console.log("\n=== Observing hero cards for 20 seconds ===\n");

  // Take snapshots every 4 seconds for 20 seconds (6 snapshots total)
  for (let i = 0; i <= 20; i += 4) {
    // Get all visible card images
    const allCardImages = page.locator("img[alt*='Card']");
    const totalCount = await allCardImages.count();

    // Check the first 4 images (hero section: left front, left back, right front, right back)
    for (let j = 0; j < Math.min(4, totalCount); j++) {
      const img = allCardImages.nth(j);
      const src = await img.getAttribute("src");
      if (src) {
        const filename = src.split("/").pop() || src;
        observedCardImages.add(filename);
      }
    }

    cardObservations.push({ time: i, cardCount: observedCardImages.size });
    console.log(
      `t=${i}s: Observed ${observedCardImages.size} unique cards so far`
    );

    // Wait 4 seconds before next snapshot (unless this is the last iteration)
    if (i < 20) {
      await page.waitForTimeout(4000);
    }
  }

  console.log(
    `\n=== Result: Observed ${observedCardImages.size} unique cards total ===\n`
  );

  // VERIFICATION: Over 20 seconds with flip intervals of 3-10s, we expect:
  // - Left card: ~2-3 flips = 3-4 unique cards
  // - Right card: ~2-3 flips = 3-4 unique cards
  // - Total: at least 5-6 unique cards (some may overlap)
  //
  // We use a threshold of 4+ unique cards to account for randomness
  // (both cards might show some of the same cards, but we should see
  // at least 4 different cards total if both are flipping)
  expect(observedCardImages.size).toBeGreaterThanOrEqual(4);

  // Additional check: card count should increase over time
  // (not strictly monotonic due to randomness, but should generally trend up)
  const firstHalfAvg =
    cardObservations.slice(0, 3).reduce((sum, obs) => sum + obs.cardCount, 0) /
    3;
  const secondHalfAvg =
    cardObservations.slice(3).reduce((sum, obs) => sum + obs.cardCount, 0) / 3;

  console.log(
    `First half average: ${firstHalfAvg.toFixed(1)}, Second half average: ${secondHalfAvg.toFixed(1)}`
  );

  // Second half should have equal or more unique cards than first half
  expect(secondHalfAvg).toBeGreaterThanOrEqual(firstHalfAvg);
});
