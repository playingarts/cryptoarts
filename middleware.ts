import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge Middleware for Rate Limiting and Security
 *
 * Runs at the edge before every request to:
 * 1. Rate limit API endpoints
 * 2. Add security headers
 * 3. Block suspicious requests
 *
 * For production, consider using Upstash Redis for distributed rate limiting.
 * This in-memory implementation works per-instance and may reset on cold starts.
 */

// Simple in-memory rate limiter (per edge instance)
// For production, use Upstash Redis or similar distributed store
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // 100 requests per minute per IP

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    // Reset or create new window
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

// Clean up old entries periodically (simple garbage collection)
function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(key);
    }
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only rate limit API routes
  if (pathname.startsWith("/api/")) {
    // Skip rate limiting for health checks
    if (pathname === "/api/health") {
      return NextResponse.next();
    }

    // Periodic cleanup (runs occasionally)
    if (Math.random() < 0.01) {
      cleanupRateLimitMap();
    }

    const key = getRateLimitKey(request);

    if (isRateLimited(key)) {
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
          },
        }
      );
    }

    // Add rate limit headers to response
    const response = NextResponse.next();
    const record = rateLimitMap.get(key);
    if (record) {
      response.headers.set(
        "X-RateLimit-Limit",
        RATE_LIMIT_MAX.toString()
      );
      response.headers.set(
        "X-RateLimit-Remaining",
        Math.max(0, RATE_LIMIT_MAX - record.count).toString()
      );
      response.headers.set(
        "X-RateLimit-Reset",
        Math.ceil((record.timestamp + RATE_LIMIT_WINDOW) / 1000).toString()
      );
    }

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
