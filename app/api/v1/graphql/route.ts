import { createHandler } from "graphql-http/lib/use/fetch";
import { NextRequest, NextResponse } from "next/server";
import { NoSchemaIntrospectionCustomRule } from "graphql";
import depthLimit from "graphql-depth-limit";
import { schema } from "../../../../source/graphql/schema";
import { connect } from "../../../../source/mongoose";
import { rateLimiters } from "../../../../lib/rateLimitChecker";

const isProduction = process.env.NODE_ENV === "production";

// Security validation rules
const validationRules = [
  // Limit query depth to prevent DoS via deeply nested queries
  depthLimit(10),
  // Disable introspection in production to hide API surface
  ...(isProduction ? [NoSchemaIntrospectionCustomRule] : []),
];

// Create the GraphQL handler using graphql-http
const graphqlHandler = createHandler({ schema, validationRules });

// Use shared rate limiter (100 req/min)
const rateLimiter = rateLimiters.relaxed;

async function handleGraphQL(request: NextRequest) {
  // Check rate limit
  const rateLimitResponse = rateLimiter.check(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  await connect();

  try {
    const response = await graphqlHandler(request);
    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
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
