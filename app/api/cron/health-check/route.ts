/**
 * Cron Health Check API
 *
 * Scheduled endpoint that runs all health checks.
 * Called by Vercel Cron every 5 minutes.
 *
 * GET /api/cron/health-check
 *
 * Security:
 * - Vercel cron jobs include Authorization header
 * - Can also be triggered manually with CRON_SECRET
 */

import { NextRequest, NextResponse } from "next/server";
import { runAllChecks } from "../../../../source/services/StatusService";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // Allow up to 30 seconds for all checks

/**
 * Verify the request is from Vercel cron or has valid secret
 */
function isAuthorized(request: NextRequest): boolean {
  // Check for Vercel cron authorization header
  const authHeader = request.headers.get("Authorization");
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  // Check for manual trigger with secret in query
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret === process.env.CRON_SECRET) {
    return true;
  }

  // In development, allow without auth
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  return false;
}

export async function GET(request: NextRequest) {
  // Verify authorization
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const startTime = Date.now();

  try {
    const results = await runAllChecks();

    const summary = {
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime,
      checks: results.length,
      status: {
        up: results.filter((r) => r.status === "up").length,
        degraded: results.filter((r) => r.status === "degraded").length,
        down: results.filter((r) => r.status === "down").length,
      },
      results,
    };

    return NextResponse.json(summary, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[Cron Health Check] Error:", error);

    return NextResponse.json(
      {
        error: "Health check failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
