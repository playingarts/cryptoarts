/**
 * Current User Endpoint
 *
 * GET /api/auth/me
 *
 * Returns the current logged-in user or 401 if not authenticated.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "../../../../lib/auth";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({
    email: session.email,
    role: session.role,
  });
}
