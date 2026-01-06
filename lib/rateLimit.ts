import { NextApiRequest, NextApiResponse } from "next";

interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// Note: In production with multiple instances, use Redis or similar
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Get client IP from request headers (handles proxies like Vercel)
 */
function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string") {
    return realIp;
  }
  return req.socket?.remoteAddress || "unknown";
}

/**
 * Clean up expired entries periodically
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

/**
 * Rate limiting middleware for Next.js API routes
 *
 * @example
 * ```ts
 * const limiter = rateLimit({ limit: 10, windowMs: 60000 }); // 10 req/min
 *
 * export default async function handler(req, res) {
 *   const rateLimitResult = limiter(req, res);
 *   if (rateLimitResult) return rateLimitResult;
 *   // ... handle request
 * }
 * ```
 */
export function rateLimit(config: RateLimitConfig) {
  const { limit, windowMs } = config;

  return function rateLimiter(
    req: NextApiRequest,
    res: NextApiResponse
  ): boolean {
    const ip = getClientIp(req);
    const key = `${req.url}:${ip}`;
    const now = Date.now();

    let entry = rateLimitStore.get(key);

    // Reset if window has expired
    if (!entry || entry.resetTime < now) {
      entry = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    entry.count++;
    rateLimitStore.set(key, entry);

    // Set rate limit headers
    const remaining = Math.max(0, limit - entry.count);
    const resetSeconds = Math.ceil((entry.resetTime - now) / 1000);

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", resetSeconds);

    // Check if rate limit exceeded
    if (entry.count > limit) {
      res.setHeader("Retry-After", resetSeconds);
      res.status(429).json({
        error: "Too Many Requests",
        message: `Rate limit exceeded. Try again in ${resetSeconds} seconds.`,
        retryAfter: resetSeconds,
      });
      return true; // Request was rate limited
    }

    return false; // Request is allowed
  };
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const rateLimiters = {
  /** 5 requests per minute - for sensitive endpoints like newsletter signup */
  strict: rateLimit({ limit: 5, windowMs: 60 * 1000 }),

  /** 30 requests per minute - for general API endpoints */
  standard: rateLimit({ limit: 30, windowMs: 60 * 1000 }),

  /** 100 requests per minute - for high-traffic endpoints like GraphQL */
  relaxed: rateLimit({ limit: 100, windowMs: 60 * 1000 }),
};
