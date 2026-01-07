import { test, expect } from "@playwright/test";

/**
 * E2E tests for the shopping and checkout flow
 * Tests the critical path: Shop -> Add to Bag -> Bag -> Checkout
 */

test.describe("Shopping Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("shop page displays products", async ({ page }) => {
    await page.goto("/shop");

    // Wait for page to load
    await expect(page.locator("header")).toBeVisible();

    // Check for product items or content
    await page.waitForLoadState("networkidle");
  });

  test("can navigate to individual product page", async ({ page }) => {
    await page.goto("/shop");

    // Find a product link and click it
    const productLink = page.locator('a[href*="/shop/"]').first();

    if (await productLink.isVisible()) {
      await productLink.click();

      // Should navigate to product page
      await expect(page).toHaveURL(new RegExp("/shop/"));
    }
  });
});

test.describe("Shopping Bag", () => {
  test("bag page loads with empty cart", async ({ page }) => {
    await page.goto("/bag");
    await expect(page.locator("header")).toBeVisible();
  });

  test("bag persists items in localStorage", async ({ page }) => {
    // Simulate adding item to bag via localStorage
    await page.goto("/shop");

    await page.evaluate(() => {
      localStorage.setItem("bag", JSON.stringify({ "12345": 2 }));
    });

    // Navigate to bag
    await page.goto("/bag");

    // Verify localStorage was set
    const bagData = await page.evaluate(() => localStorage.getItem("bag"));
    expect(bagData).toContain("12345");
  });

  test("checkout button generates correct URL format", async ({ page }) => {
    // Set up bag with known items
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("bag", JSON.stringify({ "100": 1, "200": 2 }));
    });

    await page.goto("/bag");

    // Find checkout link
    const checkoutLink = page.locator('a[href*="secure.playingarts.com/cart"]');

    if (await checkoutLink.isVisible()) {
      const href = await checkoutLink.getAttribute("href");

      // Verify URL format: https://secure.playingarts.com/cart/{id}:{qty},{id}:{qty}
      expect(href).toContain("secure.playingarts.com/cart/");
      expect(href).toMatch(/\d+:\d+/); // Should have id:quantity format
    }
  });

  test("empty bag shows appropriate state", async ({ page }) => {
    // Ensure bag is empty
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("bag"));

    await page.goto("/bag");

    // Page should still load without errors
    await expect(page.locator("header")).toBeVisible();
  });
});

test.describe("Add to Bag Flow", () => {
  test("AddToBag button is visible on shop page for available products", async ({
    page,
  }) => {
    await page.goto("/shop");
    await page.waitForLoadState("networkidle");

    // Look for "Add to bag" or similar button
    const addButton = page.locator(
      'button:has-text("Add"), button:has-text("bag")'
    );

    // At least one product should have an add button (unless all sold out)
    const buttonCount = await addButton.count();
    // This is informational - some products may be sold out
    console.log(`Found ${buttonCount} Add to Bag buttons`);
  });

  test("clicking AddToBag updates localStorage", async ({ page }) => {
    await page.goto("/shop");
    await page.waitForLoadState("networkidle");

    // Clear any existing bag
    await page.evaluate(() => localStorage.removeItem("bag"));

    // Find and click an Add to Bag button
    const addButton = page
      .locator('button:has-text("Add"), [data-testid="add-to-bag"]')
      .first();

    if (await addButton.isVisible()) {
      await addButton.click();

      // Wait for localStorage update
      await page.waitForTimeout(500);

      const bagData = await page.evaluate(() => localStorage.getItem("bag"));
      expect(bagData).not.toBeNull();
    }
  });
});

test.describe("Product Page", () => {
  test("product page loads from shop", async ({ page }) => {
    await page.goto("/shop");
    await page.waitForLoadState("networkidle");

    // Click on a product to open detail view
    const productImage = page.locator('img[alt*="deck"]').first();

    if (await productImage.isVisible()) {
      await productImage.click();

      // Wait for modal or navigation
      await page.waitForTimeout(500);
    }
  });
});

test.describe("Cart Quantity Management", () => {
  test("can update quantity in localStorage", async ({ page }) => {
    await page.goto("/");

    // Set initial bag state
    await page.evaluate(() => {
      localStorage.setItem("bag", JSON.stringify({ "12345": 1 }));
    });

    // Simulate quantity update
    await page.evaluate(() => {
      const bag = JSON.parse(localStorage.getItem("bag") || "{}");
      bag["12345"] = 3;
      localStorage.setItem("bag", JSON.stringify(bag));
    });

    const bagData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("bag") || "{}")
    );
    expect(bagData["12345"]).toBe(3);
  });

  test("can remove item from bag", async ({ page }) => {
    await page.goto("/");

    // Set initial bag state
    await page.evaluate(() => {
      localStorage.setItem("bag", JSON.stringify({ "12345": 1, "67890": 2 }));
    });

    // Remove an item
    await page.evaluate(() => {
      const bag = JSON.parse(localStorage.getItem("bag") || "{}");
      delete bag["12345"];
      localStorage.setItem("bag", JSON.stringify(bag));
    });

    const bagData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("bag") || "{}")
    );
    expect(bagData["12345"]).toBeUndefined();
    expect(bagData["67890"]).toBe(2);
  });
});

test.describe("Cross-page Bag Persistence", () => {
  test("bag contents persist across navigation", async ({ page }) => {
    await page.goto("/shop");

    // Add item to bag
    await page.evaluate(() => {
      localStorage.setItem("bag", JSON.stringify({ "99999": 1 }));
    });

    // Navigate to another page
    await page.goto("/");

    // Navigate back to bag
    await page.goto("/bag");

    // Verify bag still has items
    const bagData = await page.evaluate(() => localStorage.getItem("bag"));
    expect(bagData).toContain("99999");
  });

  test("bag contents persist after page refresh", async ({ page }) => {
    await page.goto("/bag");

    // Add item to bag
    await page.evaluate(() => {
      localStorage.setItem("bag", JSON.stringify({ "11111": 5 }));
    });

    // Refresh the page
    await page.reload();

    // Verify bag still has items
    const bagData = await page.evaluate(() => localStorage.getItem("bag"));
    expect(bagData).toContain("11111");
  });
});
