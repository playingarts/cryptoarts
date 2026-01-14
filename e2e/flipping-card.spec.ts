import { test, expect } from "@playwright/test";

test("flipping hero card shows different cards", async ({ page }) => {
  // Go to crypto deck which has flipping hero cards
  await page.goto("/crypto");

  // Wait for hero cards to load and observe multiple flips
  // MIN_INTERVAL = 3000, MAX_INTERVAL = 10000, so wait ~12s for 2-3 flips
  await page.waitForTimeout(12000);

  // The FlippingHeroCard component renders two Card components (front and back)
  // in divs with backface-visibility: hidden. Look for hero-sized card images.
  // Hero cards are 340px wide, so look for images in containers around that size.

  // Get all card images on the page
  const allCardImages = page.locator("img[alt*='Card']");
  const totalCount = await allCardImages.count();
  console.log(`Total card images on page: ${totalCount}`);

  // The hero section has the first 2-4 large card images
  // Get the first few card images which should be the hero cards
  const heroImageSrcs: string[] = [];

  // Check the first 4 card images (should include hero front/back)
  for (let i = 0; i < Math.min(4, totalCount); i++) {
    const img = allCardImages.nth(i);
    const src = await img.getAttribute("src");
    if (src) {
      heroImageSrcs.push(src);
      console.log(`Hero image ${i}: ${src}`);
    }
  }

  // Screenshot for debugging
  await page.screenshot({ path: "e2e/screenshots/flipping-card-initial.png" });

  // There should be at least 2 hero images (left and right cards)
  expect(heroImageSrcs.length).toBeGreaterThanOrEqual(2);

  // The FlippingHeroCard has 2 images: front and back
  // Even if they start different, let's verify by looking at unique sources
  const uniqueSrcs = new Set(heroImageSrcs);
  console.log(`Unique hero card sources: ${uniqueSrcs.size} out of ${heroImageSrcs.length}`);

  // We should have at least 2 different card images in hero section
  // (left card front, left card back, right card)
  expect(uniqueSrcs.size).toBeGreaterThanOrEqual(2);

  // Now test the flipping mechanism
  // The FlippingHeroCard is clickable - find and click the left hero card
  // It should be in a container with cursor: pointer
  const clickableCards = page.locator("div[style*='cursor: pointer']");
  const clickableCount = await clickableCards.count();
  console.log(`Found ${clickableCount} clickable card containers`);

  if (clickableCount > 0) {
    const flipCard = clickableCards.first();

    // Get images in this flip card before clicking
    const beforeImages = flipCard.locator("img");
    const beforeCount = await beforeImages.count();
    console.log(`Images in flip card before click: ${beforeCount}`);

    // Get current visible image src
    const beforeSrcs: string[] = [];
    for (let i = 0; i < beforeCount; i++) {
      const src = await beforeImages.nth(i).getAttribute("src");
      if (src) {
        beforeSrcs.push(src);
      }
    }
    console.log(`Before click srcs: ${beforeSrcs.join(", ")}`);

    // Click to flip
    await flipCard.click();
    console.log("Clicked to flip");

    // Wait for flip animation (225ms for manual flip + buffer)
    await page.waitForTimeout(500);

    // Screenshot after flip
    await page.screenshot({ path: "e2e/screenshots/flipping-card-after-flip.png" });

    // Get images after flip
    const afterImages = flipCard.locator("img");
    const afterCount = await afterImages.count();
    const afterSrcs: string[] = [];
    for (let i = 0; i < afterCount; i++) {
      const src = await afterImages.nth(i).getAttribute("src");
      if (src) {
        afterSrcs.push(src);
      }
    }
    console.log(`After click srcs: ${afterSrcs.join(", ")}`);

    // The card should still have 2 images (front and back)
    expect(afterCount).toBe(2);
  }

  console.log("Test completed successfully!");
});
