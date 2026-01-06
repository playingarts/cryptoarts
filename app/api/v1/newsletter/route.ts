import { NextRequest, NextResponse } from "next/server";

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

// Simple in-memory rate limiter for App Router
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Newsletter subscription endpoint
 *
 * POST /api/v1/newsletter
 * Body: { email: string }
 */
export async function POST(request: NextRequest) {
  // Get IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too Many Requests", message: "Rate limit exceeded" },
      { status: 429 }
    );
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
