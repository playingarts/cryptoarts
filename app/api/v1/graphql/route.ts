import { createHandler } from "graphql-http/lib/use/fetch";
import { NextRequest, NextResponse } from "next/server";
import { schema } from "../../../../source/graphql/schema";
import { connect } from "../../../../source/mongoose";

// Create the GraphQL handler using graphql-http
const graphqlHandler = createHandler({ schema });

// Simple in-memory rate limiter for App Router
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100;
const WINDOW_MS = 60000;

function checkRateLimit(ip: string): { limited: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { limited: false, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { limited: true, remaining: 0 };
  }

  record.count++;
  return { limited: false, remaining: RATE_LIMIT - record.count };
}

async function handleGraphQL(request: NextRequest) {
  // Get IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { limited, remaining } = checkRateLimit(ip);

  if (limited) {
    return NextResponse.json(
      { errors: [{ message: "Rate limit exceeded" }] },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(RATE_LIMIT),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  await connect();

  try {
    const response = await graphqlHandler(request);

    // Create a new response with rate limit headers
    const headers = new Headers(response.headers);
    headers.set("X-RateLimit-Limit", String(RATE_LIMIT));
    headers.set("X-RateLimit-Remaining", String(remaining));

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("GraphQL error:", error);
    return NextResponse.json(
      { errors: [{ message: "Internal server error" }] },
      { status: 500 }
    );
  }
}

/**
 * GraphQL endpoint
 *
 * GET/POST /api/v1/graphql
 */
export async function GET(request: NextRequest) {
  return handleGraphQL(request);
}

export async function POST(request: NextRequest) {
  return handleGraphQL(request);
}
