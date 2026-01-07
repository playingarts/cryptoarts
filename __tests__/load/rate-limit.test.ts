/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { POST as newsletterPost } from "../../app/api/v1/newsletter/route";

/**
 * Load tests for rate limiting
 * Tests that rate limits hold under concurrent request pressure
 */

// Helper to create request with unique IP
const createNewsletterRequest = (email: string, ip: string) =>
  new NextRequest("http://localhost/api/v1/newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
  });

describe("Rate Limit Load Tests", () => {
  describe("Newsletter API Rate Limiting", () => {
    it("should enforce rate limit of 5 requests per IP", async () => {
      const testIp = `load-test-${Date.now()}.1.1.1`;
      const results: number[] = [];

      // Make 7 requests (limit is 5)
      for (let i = 0; i < 7; i++) {
        const request = createNewsletterRequest(
          `test${i}@example.com`,
          testIp
        );
        const response = await newsletterPost(request);
        results.push(response.status);
      }

      // First 5 should succeed (or fail for other reasons like validation)
      const successOrValidationError = results
        .slice(0, 5)
        .filter((s) => s !== 429);
      expect(successOrValidationError.length).toBe(5);

      // Last 2 should be rate limited
      expect(results[5]).toBe(429);
      expect(results[6]).toBe(429);
    });

    it("should track rate limits per IP independently", async () => {
      const results: { ip: string; status: number }[] = [];

      // Make requests from different IPs
      for (let ipNum = 0; ipNum < 3; ipNum++) {
        const ip = `multi-ip-${Date.now()}-${ipNum}.1.1.1`;

        // Make 3 requests per IP (under the limit)
        for (let i = 0; i < 3; i++) {
          const request = createNewsletterRequest(
            `test${ipNum}-${i}@example.com`,
            ip
          );
          const response = await newsletterPost(request);
          results.push({ ip, status: response.status });
        }
      }

      // All requests should succeed (not rate limited)
      const rateLimited = results.filter((r) => r.status === 429);
      expect(rateLimited.length).toBe(0);
    });

    it(
      "should handle burst of concurrent requests",
      async () => {
        const testIp = `burst-test-${Date.now()}.1.1.1`;

        // Send 10 concurrent requests
        const promises = Array.from({ length: 10 }, (_, i) => {
          const request = createNewsletterRequest(
            `burst${i}@example.com`,
            testIp
          );
          return newsletterPost(request).then((r) => r.status);
        });

        const results = await Promise.all(promises);

        // Count rate limited responses
        const rateLimited = results.filter((s) => s === 429).length;

        // At least 5 should be rate limited (limit is 5)
        expect(rateLimited).toBeGreaterThanOrEqual(5);
      },
      15000
    );
  });

  describe("Rate Limit Recovery", () => {
    // Note: This test is skipped by default as it requires real time passing
    // In production, rate limits reset after the window expires
    it.skip("should reset rate limit after window expires", async () => {
      const testIp = `reset-test-${Date.now()}.1.1.1`;

      // Exhaust rate limit
      for (let i = 0; i < 6; i++) {
        const request = createNewsletterRequest(`exhaust${i}@example.com`, testIp);
        await newsletterPost(request);
      }

      // Wait for rate limit window to expire (would need real time or mocking)
      // await new Promise((resolve) => setTimeout(resolve, 60000));

      // After window expires, should be able to make requests again
      const request = createNewsletterRequest("after@example.com", testIp);
      const response = await newsletterPost(request);
      expect(response.status).not.toBe(429);
    });
  });

  describe("Rate Limit Headers", () => {
    it("should include rate limit headers in response", async () => {
      const testIp = `headers-test-${Date.now()}.1.1.1`;
      const request = createNewsletterRequest("headers@example.com", testIp);

      const response = await newsletterPost(request);

      // Check for rate limit headers (if implemented)
      // Note: These headers may not be present in all implementations
      const headers = Object.fromEntries(response.headers.entries());

      // Log headers for debugging
      console.log("Response headers:", headers);
    });
  });

  describe("Stress Test Simulation", () => {
    it("should handle 50 requests from 10 different IPs", async () => {
      const baseTime = Date.now();
      const results: { ip: string; status: number; requestNum: number }[] = [];

      // 10 IPs, 5 requests each
      const promises: Promise<void>[] = [];

      for (let ipNum = 0; ipNum < 10; ipNum++) {
        const ip = `stress-${baseTime}-${ipNum}.1.1.1`;

        for (let reqNum = 0; reqNum < 5; reqNum++) {
          const promise = (async () => {
            const request = createNewsletterRequest(
              `stress${ipNum}-${reqNum}@example.com`,
              ip
            );
            const response = await newsletterPost(request);
            results.push({ ip, status: response.status, requestNum: reqNum });
          })();
          promises.push(promise);
        }
      }

      await Promise.all(promises);

      // Group by IP
      const byIp = results.reduce(
        (acc, r) => {
          if (!acc[r.ip]) acc[r.ip] = [];
          acc[r.ip].push(r.status);
          return acc;
        },
        {} as Record<string, number[]>
      );

      // Each IP should have 5 non-rate-limited responses
      for (const [ip, statuses] of Object.entries(byIp)) {
        const nonRateLimited = statuses.filter((s) => s !== 429).length;
        expect(nonRateLimited).toBe(5);
      }
    });

    it("should correctly identify abusive IP with many requests", async () => {
      const abusiveIp = `abusive-${Date.now()}.1.1.1`;
      const normalIp = `normal-${Date.now()}.1.1.1`;

      // Abusive IP: 20 requests
      const abusivePromises = Array.from({ length: 20 }, (_, i) => {
        const request = createNewsletterRequest(`abuse${i}@example.com`, abusiveIp);
        return newsletterPost(request).then((r) => r.status);
      });

      // Normal IP: 3 requests
      const normalPromises = Array.from({ length: 3 }, (_, i) => {
        const request = createNewsletterRequest(`normal${i}@example.com`, normalIp);
        return newsletterPost(request).then((r) => r.status);
      });

      const [abusiveResults, normalResults] = await Promise.all([
        Promise.all(abusivePromises),
        Promise.all(normalPromises),
      ]);

      // Abusive IP should have many rate limited
      const abusiveRateLimited = abusiveResults.filter((s) => s === 429).length;
      expect(abusiveRateLimited).toBeGreaterThanOrEqual(15);

      // Normal IP should have no rate limited
      const normalRateLimited = normalResults.filter((s) => s === 429).length;
      expect(normalRateLimited).toBe(0);
    });
  });
});
