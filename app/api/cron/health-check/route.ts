/**
 * Cron Health Check API
 *
 * Public endpoint that runs all health checks.
 * Can be called by Vercel Cron, cron-job.org, or manually.
 *
 * GET /api/cron/health-check
 */

import { NextResponse } from "next/server";
import { runAllChecks } from "../../../../source/services/StatusService";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // Allow up to 30 seconds for all checks

export async function GET() {
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
