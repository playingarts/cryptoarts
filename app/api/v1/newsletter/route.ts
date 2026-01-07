import { NextRequest, NextResponse } from "next/server";
import { rateLimiters } from "../../../../lib/rateLimitChecker";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isValidEmail = (email: string): boolean => {
  if (email.length > 254) {
    return false;
  }
  return emailRegex.test(email);
};

const subscribeEmail = async (
  email: string,
  tries = 0
): Promise<Response> => {
  const response = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUPID}/subscribers`,
    {
      method: "post",
      headers: {
        "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY || "empty",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (response.status === 500 || response.status === 400) {
    return response;
  }

  if (tries >= 4) {
    console.log("Timed out after five tries");
    return response;
  }

  if (response.status === 429) {
    const time = Number(response.headers.get("X-RateLimit-Retry-After"));
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
    return subscribeEmail(email, tries + 1);
  }

  return response;
};

// Use shared rate limiter (5 req/min for sensitive endpoint)
const rateLimiter = rateLimiters.strict;

/**
 * Newsletter subscription endpoint
 *
 * POST /api/v1/newsletter
 * Body: { email: string }
 */
export async function POST(request: NextRequest) {
  // Check rate limit
  const rateLimitResponse = rateLimiter.check(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const emailRes = await subscribeEmail(email);

    return NextResponse.json({}, { status: emailRes.status });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
