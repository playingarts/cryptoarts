/**
 * Magic Link Verification Endpoint
 *
 * GET /api/auth/verify?token=xxx
 *
 * Verifies the magic link token, creates a session, and redirects to homepage.
 */

import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../source/mongoose";
import { User } from "../../../../source/models/User";
import {
  verifyMagicLinkToken,
  createSessionToken,
  setSessionCookie,
} from "../../../../lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  // Build redirect URL - use request host for proper redirects
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  if (!token) {
    // Redirect to login with error
    return NextResponse.redirect(`${baseUrl}/login?error=missing_token`);
  }

  try {
    // Verify the magic link token
    const email = await verifyMagicLinkToken(token);

    if (!email) {
      // Token invalid or expired
      return NextResponse.redirect(`${baseUrl}/login?error=invalid_token`);
    }

    // Connect to database
    await connect();

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        email,
        role: "admin",
        lastLogin: new Date(),
      });
    } else {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
    }

    // Create session token
    const sessionToken = await createSessionToken(email, user.role);

    // Create redirect response and set session cookie
    const response = NextResponse.redirect(`${baseUrl}/`);
    setSessionCookie(response, sessionToken);

    return response;
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.redirect(`${baseUrl}/login?error=server_error`);
  }
}
