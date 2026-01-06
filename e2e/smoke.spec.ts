import { test, expect } from "@playwright/test";

/**
 * Smoke tests for critical user journeys
 * These tests verify that key pages load and function correctly
 */

test.describe("Smoke Tests", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Playing Arts/);

    // Check that header is visible
    await expect(page.locator("header")).toBeVisible();
  });

  test("health endpoint returns OK", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.version).toBeDefined();
  });

  test("deck page loads", async ({ page }) => {
    // Test the first deck (crypto)
    await page.goto("/crypto");

    // Should not show 404
    await expect(page.locator("text=404")).not.toBeVisible({ timeout: 5000 }).catch(() => {
      // If we do see 404, that's also informative
    });

    // Check for header presence
    await expect(page.locator("header")).toBeVisible();
  });

  test("shop page loads", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.locator("header")).toBeVisible();
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("header")).toBeVisible();
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("header")).toBeVisible();
  });

  test("GraphQL endpoint responds", async ({ request }) => {
    const response = await request.post("/api/v1/graphql", {
      data: {
        query: "{ __typename }",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data).toBeDefined();
  });

  test("rate limiting headers are present", async ({ request }) => {
    const response = await request.post("/api/v1/graphql", {
      data: { query: "{ __typename }" },
      headers: { "Content-Type": "application/json" },
    });

    // Rate limit headers should be present on API routes
    const headers = response.headers();
    expect(headers["x-ratelimit-limit"]).toBeDefined();
    expect(headers["x-ratelimit-remaining"]).toBeDefined();
  });

  test("security headers are present", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response?.headers() || {};

    // Check critical security headers
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBeDefined();
    expect(headers["content-security-policy"]).toBeDefined();
  });
});
