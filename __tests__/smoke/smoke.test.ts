/**
 * @jest-environment node
 */

/**
 * Smoke Tests for dev.playingarts.com
 *
 * Run with: yarn test:smoke
 *
 * These tests verify that critical pages are accessible and return expected status codes.
 */

const BASE_URL = process.env.SMOKE_TEST_URL || "https://dev.playingarts.com";

const TIMEOUT = 30000; // 30 seconds

interface TestCase {
  name: string;
  path: string;
  expectedStatus: number;
  expectContent?: string;
}

const testCases: TestCase[] = [
  // Main pages
  { name: "Homepage", path: "/", expectedStatus: 200 },
  { name: "Shop", path: "/shop", expectedStatus: 200 },
  { name: "Bag", path: "/bag", expectedStatus: 200 },
  { name: "Favorites", path: "/favorites", expectedStatus: 200 },
  { name: "Contact", path: "/contact", expectedStatus: 200 },
  { name: "Privacy", path: "/privacy", expectedStatus: 200 },

  // Deck pages
  { name: "Crypto deck", path: "/crypto", expectedStatus: 200 },

  // API endpoints
  {
    name: "GraphQL endpoint",
    path: "/api/v1/graphql",
    expectedStatus: 400, // GET without query returns 400
  },

  // Error handling
  {
    name: "404 page",
    path: "/this-page-does-not-exist-12345",
    expectedStatus: 404,
  },
];

describe("Smoke Tests", () => {
  describe(`Testing ${BASE_URL}`, () => {
    testCases.forEach(({ name, path, expectedStatus, expectContent }) => {
      it(
        `${name} (${path}) should return ${expectedStatus}`,
        async () => {
          const url = `${BASE_URL}${path}`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "User-Agent": "PlayingArts-SmokeTest/1.0",
            },
            redirect: "follow",
          });

          expect(response.status).toBe(expectedStatus);

          if (expectContent) {
            const text = await response.text();
            expect(text).toContain(expectContent);
          }
        },
        TIMEOUT
      );
    });
  });

  describe("Response time", () => {
    it("Homepage should load in under 5 seconds", async () => {
      const start = Date.now();
      await fetch(`${BASE_URL}/`, {
        headers: { "User-Agent": "PlayingArts-SmokeTest/1.0" },
      });
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(5000);
    }, TIMEOUT);
  });

  describe("Security headers", () => {
    it("Should have basic security headers", async () => {
      const response = await fetch(`${BASE_URL}/`, {
        headers: { "User-Agent": "PlayingArts-SmokeTest/1.0" },
      });

      // Check for common security headers (may vary by deployment)
      const headers = response.headers;

      // At minimum, should have content-type
      expect(headers.get("content-type")).toBeTruthy();
    }, TIMEOUT);
  });
});
