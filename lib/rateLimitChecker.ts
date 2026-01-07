import { NextRequest, NextResponse } from "next/server";

/**
 * Shared rate limiter for App Router API routes
 *
 * Note: Middleware handles edge-level rate limiting with Redis.
 * This provides additional per-route rate limiting for specific endpoints
 * that need stricter limits than the global 100 req/min.
 */

interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in milliseconds (default: 60000 = 1 minute) */
  windowMs?: number;
  /** Custom key prefix for namespacing (default: route path) */
  keyPrefix?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitResult {
  limited: boolean;
  remaining: number;
  reset: number;
}

// Shared in-memory store (per serverless instance)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup every 100 requests (probabilistic)
let requestCount = 0;
const CLEANUP_INTERVAL = 100;

function cleanupExpiredEntries(windowMs: number): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime + windowMs) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get client IP from Next.js App Router request
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

/**
 * Check rate limit for a given IP and key
 */
function checkLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  let entry = rateLimitStore.get(key);

  // Reset if window has expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, entry);
    return {
      limited: false,
      remaining: limit - 1,
      reset: Math.ceil(entry.resetTime / 1000),
    };
  }

  // Check if over limit
  if (entry.count >= limit) {
    return {
      limited: true,
      remaining: 0,
      reset: Math.ceil(entry.resetTime / 1000),
    };
  }

  // Increment count
  entry.count++;
  return {
    limited: false,
    remaining: Math.max(0, limit - entry.count),
    reset: Math.ceil(entry.resetTime / 1000),
  };
}

/**
 * Create a rate limiter for App Router API routes
 *
 * @example
 * ```ts
 * const limiter = createRateLimiter({ limit: 5 });
 *
 * export async function POST(request: NextRequest) {
 *   const rateLimitResponse = limiter.check(request);
 *   if (rateLimitResponse) return rateLimitResponse;
 *   // ... handle request
 * }
 * ```
 */
export function createRateLimiter(config: RateLimitConfig) {
  const { limit, windowMs = 60000, keyPrefix } = config;

  return {
    /**
     * Check if request is rate limited
     * @returns NextResponse if rate limited, null if allowed
     */
    check(request: NextRequest): NextResponse | null {
      // Probabilistic cleanup
      requestCount++;
      if (requestCount % CLEANUP_INTERVAL === 0) {
        cleanupExpiredEntries(windowMs);
      }

      const ip = getClientIp(request);
      const prefix = keyPrefix || request.nextUrl.pathname;
      const key = `${prefix}:${ip}`;

      const { limited, reset } = checkLimit(key, limit, windowMs);

      if (limited) {
        return NextResponse.json(
          {
            error: "Too Many Requests",
            message: `Rate limit exceeded. Try again later.`,
          },
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "60",
              "X-RateLimit-Limit": String(limit),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": String(reset),
            },
          }
        );
      }

      return null;
    },

    /**
     * Get rate limit status without consuming a request
     */
    getStatus(request: NextRequest): RateLimitResult {
      const ip = getClientIp(request);
      const prefix = keyPrefix || request.nextUrl.pathname;
      const key = `${prefix}:${ip}`;
      const entry = rateLimitStore.get(key);

      if (!entry || Date.now() > entry.resetTime) {
        return { limited: false, remaining: limit, reset: 0 };
      }

      return {
        limited: entry.count >= limit,
        remaining: Math.max(0, limit - entry.count),
        reset: Math.ceil(entry.resetTime / 1000),
      };
    },

    /**
     * Add rate limit headers to response
     */
    addHeaders(
      response: NextResponse,
      result: RateLimitResult
    ): NextResponse {
      response.headers.set("X-RateLimit-Limit", String(limit));
      response.headers.set("X-RateLimit-Remaining", String(result.remaining));
      response.headers.set("X-RateLimit-Reset", String(result.reset));
      return response;
    },
  };
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const rateLimiters = {
  /** 5 requests per minute - for sensitive endpoints like newsletter signup */
  strict: createRateLimiter({ limit: 5 }),

  /** 30 requests per minute - for general API endpoints */
  standard: createRateLimiter({ limit: 30 }),

  /** 100 requests per minute - for high-traffic endpoints like GraphQL */
  relaxed: createRateLimiter({ limit: 100 }),
};
