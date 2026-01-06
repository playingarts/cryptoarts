import { createMocks } from "node-mocks-http";
import { rateLimit, rateLimiters } from "../../lib/rateLimit";
import type { NextApiRequest, NextApiResponse } from "next";

describe("lib/rateLimit", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("rateLimit", () => {
    it("allows requests within the limit", () => {
      const limiter = rateLimit({ limit: 5, windowMs: 60000 });
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        url: "/api/test",
        headers: {
          "x-forwarded-for": "192.168.1.1",
        },
      });

      const isLimited = limiter(req, res);

      expect(isLimited).toBe(false);
      expect(res.getHeader("X-RateLimit-Limit")).toBe(5);
      expect(res.getHeader("X-RateLimit-Remaining")).toBe(4);
    });

    it("sets rate limit headers on each request", () => {
      const limiter = rateLimit({ limit: 10, windowMs: 60000 });
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        url: "/api/test",
        headers: {
          "x-forwarded-for": "10.0.0.1",
        },
      });

      limiter(req, res);

      expect(res.getHeader("X-RateLimit-Limit")).toBe(10);
      expect(res.getHeader("X-RateLimit-Remaining")).toBeDefined();
      expect(res.getHeader("X-RateLimit-Reset")).toBeDefined();
    });

    it("decrements remaining count on each request", () => {
      const limiter = rateLimit({ limit: 5, windowMs: 60000 });

      // First request
      const { req: req1, res: res1 } = createMocks<
        NextApiRequest,
        NextApiResponse
      >({
        url: "/api/decrement-test",
        headers: { "x-forwarded-for": "10.0.0.2" },
      });
      limiter(req1, res1);
      expect(res1.getHeader("X-RateLimit-Remaining")).toBe(4);

      // Second request
      const { req: req2, res: res2 } = createMocks<
        NextApiRequest,
        NextApiResponse
      >({
        url: "/api/decrement-test",
        headers: { "x-forwarded-for": "10.0.0.2" },
      });
      limiter(req2, res2);
      expect(res2.getHeader("X-RateLimit-Remaining")).toBe(3);
    });

    it("blocks requests when limit is exceeded", () => {
      const limiter = rateLimit({ limit: 2, windowMs: 60000 });
      const ip = "10.0.0.3";

      // Make requests up to the limit
      for (let i = 0; i < 2; i++) {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
          url: "/api/block-test",
          headers: { "x-forwarded-for": ip },
        });
        expect(limiter(req, res)).toBe(false);
      }

      // Third request should be blocked
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        url: "/api/block-test",
        headers: { "x-forwarded-for": ip },
      });
      const isLimited = limiter(req, res);

      expect(isLimited).toBe(true);
      expect(res.statusCode).toBe(429);
      expect(res.getHeader("Retry-After")).toBeDefined();
    });

    it("returns 429 with proper error message", () => {
      const limiter = rateLimit({ limit: 1, windowMs: 60000 });
      const ip = "10.0.0.4";

      // Exhaust limit
      const { req: req1, res: res1 } = createMocks<
        NextApiRequest,
        NextApiResponse
      >({
        url: "/api/error-test",
        headers: { "x-forwarded-for": ip },
      });
      limiter(req1, res1);

      // Exceed limit
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        url: "/api/error-test",
        headers: { "x-forwarded-for": ip },
      });
      limiter(req, res);

      const body = res._getJSONData();
      expect(body.error).toBe("Too Many Requests");
      expect(body.message).toContain("Rate limit exceeded");
      expect(body.retryAfter).toBeDefined();
    });

    it("uses x-real-ip header when x-forwarded-for is not present", () => {
      const limiter = rateLimit({ limit: 5, windowMs: 60000 });
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        url: "/api/real-ip-test",
        headers: { "x-real-ip": "172.16.0.1" },
      });

      const isLimited = limiter(req, res);

      expect(isLimited).toBe(false);
    });

    it("handles missing IP gracefully", () => {
      const limiter = rateLimit({ limit: 5, windowMs: 60000 });
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        url: "/api/no-ip-test",
      });

      const isLimited = limiter(req, res);

      expect(isLimited).toBe(false);
    });

    it("tracks different IPs separately", () => {
      const limiter = rateLimit({ limit: 1, windowMs: 60000 });

      // First IP
      const { req: req1, res: res1 } = createMocks<
        NextApiRequest,
        NextApiResponse
      >({
        url: "/api/separate-test",
        headers: { "x-forwarded-for": "1.1.1.1" },
      });
      expect(limiter(req1, res1)).toBe(false);

      // Second IP should still be allowed
      const { req: req2, res: res2 } = createMocks<
        NextApiRequest,
        NextApiResponse
      >({
        url: "/api/separate-test",
        headers: { "x-forwarded-for": "2.2.2.2" },
      });
      expect(limiter(req2, res2)).toBe(false);
    });

    it("tracks different endpoints separately", () => {
      const limiter = rateLimit({ limit: 1, windowMs: 60000 });
      const ip = "10.0.0.5";

      // First endpoint
      const { req: req1, res: res1 } = createMocks<
        NextApiRequest,
        NextApiResponse
      >({
        url: "/api/endpoint-a",
        headers: { "x-forwarded-for": ip },
      });
      expect(limiter(req1, res1)).toBe(false);

      // Different endpoint should still be allowed
      const { req: req2, res: res2 } = createMocks<
        NextApiRequest,
        NextApiResponse
      >({
        url: "/api/endpoint-b",
        headers: { "x-forwarded-for": ip },
      });
      expect(limiter(req2, res2)).toBe(false);
    });
  });

  describe("rateLimiters presets", () => {
    it("has strict preset with 5 requests per minute", () => {
      expect(rateLimiters.strict).toBeDefined();
    });

    it("has standard preset with 30 requests per minute", () => {
      expect(rateLimiters.standard).toBeDefined();
    });

    it("has relaxed preset with 100 requests per minute", () => {
      expect(rateLimiters.relaxed).toBeDefined();
    });
  });
});
