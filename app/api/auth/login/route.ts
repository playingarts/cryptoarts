/**
 * Magic Link Login Endpoint
 *
 * POST /api/auth/login
 * Body: { email: string }
 *
 * Sends a magic link to the email if it's an admin email.
 * Rate limited to 3 requests per email per hour.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createRateLimiter } from "../../../../lib/rateLimitChecker";
import {
  isAdminEmail,
  generateMagicLinkToken,
} from "../../../../lib/auth";

// Strict rate limiting for login (3 per minute per IP)
const rateLimiter = createRateLimiter({
  limit: 3,
  windowMs: 60 * 1000,
  keyPrefix: "auth:login",
});

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function isValidEmail(email: string): boolean {
  if (email.length > 254) {
    return false;
  }
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  // Rate limit check
  const rateLimitResponse = rateLimiter.check(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    const { email } = body;

    // Validate email format
    if (typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email is allowed (admin whitelist)
    if (!isAdminEmail(email)) {
      // Don't reveal that email is not admin - just say "check your email"
      // This prevents enumeration attacks
      return NextResponse.json({
        success: true,
        message: "If this email is registered, you will receive a magic link.",
      });
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Generate magic link token
    const token = await generateMagicLinkToken(email);

    // Build magic link URL - use request host for dev, env var for production
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    const magicLink = `${baseUrl}/api/auth/verify?token=${token}`;

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Use verified playingarts.com domain
    const fromEmail = "Playing Arts <noreply@playingarts.com>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Your login link for Playing Arts",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; font-weight: 600; color: #000; margin-bottom: 24px;">
            Sign in to Playing Arts
          </h1>
          <p style="font-size: 16px; color: #333; line-height: 1.5; margin-bottom: 32px;">
            Click the button below to sign in. This link expires in 15 minutes.
          </p>
          <a href="${magicLink}" style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 500;">
            Sign in to Playing Arts
          </a>
          <p style="font-size: 14px; color: #666; margin-top: 32px; line-height: 1.5;">
            If you didn't request this email, you can safely ignore it.
          </p>
          <p style="font-size: 12px; color: #999; margin-top: 24px;">
            Or copy and paste this link: ${magicLink}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send magic link email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    console.log("Magic link email sent successfully:", { to: email, id: data?.id });

    return NextResponse.json({
      success: true,
      message: "If this email is registered, you will receive a magic link.",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
