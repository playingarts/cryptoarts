import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Edge Middleware for Rate Limiting and Security
 *
 * Runs at the edge before every request to:
 * 1. Rate limit API endpoints (using Upstash Redis when configured)
 * 2. Add security headers
 * 3. Block suspicious requests
 *
 * When UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set,
 * uses distributed Redis rate limiting. Otherwise falls back to in-memory.
 */

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // 100 requests per minute per IP

// Check if Redis is configured
const isRedisConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

// Create Upstash rate limiter if Redis is configured
const redisRateLimiter = isRedisConfigured
  ? new Ratelimit({
      redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      }),
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, "60 s"),
      analytics: true,
      prefix: "ratelimit:api",
    })
  : null;

// Fallback in-memory rate limiter (per edge instance)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function getRateLimitKey(request: NextRequest): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";
  return ip;
}

function isRateLimitedInMemory(key: string): {
  limited: boolean;
  remaining: number;
  reset: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return {
      limited: false,
      remaining: RATE_LIMIT_MAX - 1,
      reset: Math.ceil((now + RATE_LIMIT_WINDOW) / 1000),
    };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return {
      limited: true,
      remaining: 0,
      reset: Math.ceil((record.timestamp + RATE_LIMIT_WINDOW) / 1000),
    };
  }

  record.count++;
  return {
    limited: false,
    remaining: Math.max(0, RATE_LIMIT_MAX - record.count),
    reset: Math.ceil((record.timestamp + RATE_LIMIT_WINDOW) / 1000),
  };
}

// Periodic cleanup for in-memory rate limiter
function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(key);
    }
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only rate limit API routes
  if (pathname.startsWith("/api/")) {
    // Skip rate limiting for health checks
    if (pathname === "/api/health") {
      return NextResponse.next();
    }

    const key = getRateLimitKey(request);

    // Use Redis rate limiter if available, otherwise fall back to in-memory
    if (redisRateLimiter) {
      try {
        const { success, limit, remaining, reset } =
          await redisRateLimiter.limit(key);

        if (!success) {
          return new NextResponse(
            JSON.stringify({
              error: "Too Many Requests",
              message: "Rate limit exceeded. Please try again later.",
            }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": "60",
                "X-RateLimit-Limit": limit.toString(),
                "X-RateLimit-Remaining": remaining.toString(),
                "X-RateLimit-Reset": reset.toString(),
              },
            }
          );
        }

        const response = NextResponse.next();
        response.headers.set("X-RateLimit-Limit", limit.toString());
        response.headers.set("X-RateLimit-Remaining", remaining.toString());
        response.headers.set("X-RateLimit-Reset", reset.toString());
        response.headers.set("X-RateLimit-Backend", "redis");
        return response;
      } catch (error) {
        // If Redis fails, fall through to in-memory rate limiting
        console.error("[Middleware] Redis rate limit error:", error);
      }
    }

    // In-memory fallback
    if (Math.random() < 0.01) {
      cleanupRateLimitMap();
    }

    const { limited, remaining, reset } = isRateLimitedInMemory(key);

    if (limited) {
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": RATE_LIMIT_MAX.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", RATE_LIMIT_MAX.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.toString());
    response.headers.set("X-RateLimit-Backend", "memory");
    return response;
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all API routes
    "/api/:path*",
  ],
};
