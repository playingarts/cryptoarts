/**
 * Authentication utilities for magic link auth
 *
 * Handles:
 * - JWT session tokens (stored in HTTP-only cookie)
 * - Magic link token generation/verification (stored in Redis)
 * - Admin email validation
 */

import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "./redis";

// Constants
const SESSION_COOKIE_NAME = "pa_session";
const SESSION_DURATION_DAYS = 7;
const MAGIC_LINK_TTL_SECONDS = 15 * 60; // 15 minutes
const REDIS_TOKEN_PREFIX = "auth:token:";

// In-memory token storage for development (when Redis not configured)
// WARNING: This will not work across serverless function instances in production
const inMemoryTokens = new Map<string, { email: string; expires: number }>();

function cleanExpiredTokens() {
  const now = Date.now();
  for (const [key, value] of inMemoryTokens.entries()) {
    if (value.expires < now) {
      inMemoryTokens.delete(key);
    }
  }
}

// Get secret key for JWT signing
function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }
  // eslint-disable-next-line no-undef
  return new TextEncoder().encode(secret);
}

// Get allowed admin emails
function getAdminEmails(): string[] {
  const emails = process.env.ADMIN_EMAILS || "info@playingarts.com";
  return emails.split(",").map((e) => e.trim().toLowerCase());
}

export interface SessionPayload extends JWTPayload {
  email: string;
  role: "admin" | "editor";
}

/**
 * Check if an email is allowed to login (admin whitelist)
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email.toLowerCase().trim());
}

/**
 * Generate a magic link token and store in Redis (or in-memory for dev)
 * Returns the token to be sent in the email
 */
export async function generateMagicLinkToken(email: string): Promise<string> {
  const token = crypto.randomUUID();
  const redis = getRedis();

  if (redis) {
    // Use Redis in production
    const key = `${REDIS_TOKEN_PREFIX}${token}`;
    await redis.set(key, email.toLowerCase(), { ex: MAGIC_LINK_TTL_SECONDS });
  } else {
    // Fall back to in-memory for development
    console.warn("Redis not configured - using in-memory token storage (dev only)");
    cleanExpiredTokens();
    inMemoryTokens.set(token, {
      email: email.toLowerCase(),
      expires: Date.now() + MAGIC_LINK_TTL_SECONDS * 1000,
    });
  }

  return token;
}

/**
 * Verify a magic link token and return the email if valid
 * Deletes the token after use (one-time use)
 */
export async function verifyMagicLinkToken(
  token: string
): Promise<string | null> {
  const redis = getRedis();

  if (redis) {
    // Use Redis in production
    const key = `${REDIS_TOKEN_PREFIX}${token}`;
    const email = await redis.get<string>(key);

    if (!email) {
      return null;
    }

    // Delete token (one-time use)
    await redis.del(key);
    return email;
  } else {
    // Fall back to in-memory for development
    cleanExpiredTokens();
    const stored = inMemoryTokens.get(token);

    if (!stored || stored.expires < Date.now()) {
      inMemoryTokens.delete(token);
      return null;
    }

    // Delete token (one-time use)
    inMemoryTokens.delete(token);
    return stored.email;
  }
}

/**
 * Create a JWT session token
 */
export async function createSessionToken(
  email: string,
  role: "admin" | "editor" = "admin"
): Promise<string> {
  const payload: SessionPayload = {
    email: email.toLowerCase(),
    role,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_DAYS}d`)
    .sign(getSecretKey());

  return token;
}

/**
 * Verify a JWT session token
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Get the current session from cookies (server-side)
 * For use in Server Components and API routes
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  return verifySessionToken(sessionCookie.value);
}

/**
 * Get session from a request object (for API routes)
 */
export async function getSessionFromRequest(
  request: NextRequest
): Promise<SessionPayload | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  return verifySessionToken(sessionCookie.value);
}

/**
 * Set the session cookie on a response
 */
export function setSessionCookie(
  response: NextResponse,
  token: string
): NextResponse {
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60, // in seconds
    path: "/",
  });

  return response;
}

/**
 * Clear the session cookie
 */
export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}

/**
 * Require admin authentication for an API route
 * Returns 401 response if not authenticated
 */
export async function requireAdmin(
  request: NextRequest
): Promise<SessionPayload | NextResponse> {
  const session = await getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return session;
}

/**
 * Check if a value is a NextResponse (for type narrowing)
 */
export function isNextResponse(value: unknown): value is NextResponse {
  return value instanceof NextResponse;
}
