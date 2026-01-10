/**
 * Status API
 *
 * Public endpoint that returns current status and uptime history
 * for all monitored services.
 *
 * GET /api/status
 * GET /api/status?history=24 (hours of history to include)
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getCurrentStatus,
  getUptimeHistory,
  getAllUptimePercentages,
  CheckResult,
} from "../../../source/services/StatusService";
import { ServiceName } from "../../../source/models/UptimeCheck";

export const dynamic = "force-dynamic";

// Display order for services on the status page
const SERVICE_ORDER: ServiceName[] = [
  "website",
  "mongodb",
  "mailerlite",
  "redis",
  "graphql",
  "opensea",
  "crazyaces",
];

interface ServiceStatusResponse {
  service: ServiceName;
  status: "up" | "down" | "degraded";
  latency: number;
  message?: string;
  uptime: {
    "24h": number;
    "7d": number;
    "30d": number;
  };
}

interface StatusResponse {
  overall: "up" | "down" | "degraded";
  timestamp: string;
  services: ServiceStatusResponse[];
  history?: {
    service: ServiceName;
    checks: {
      timestamp: string;
      status: "up" | "down" | "degraded";
      latency: number;
    }[];
  }[];
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Get query params
    const historyHours = parseInt(
      request.nextUrl.searchParams.get("history") || "0"
    );

    // Get current status and uptime percentages in parallel (2 queries instead of 22+)
    const [currentStatus, uptimePercentages] = await Promise.all([
      getCurrentStatus(),
      getAllUptimePercentages(),
    ]);

    // Determine overall status from current status (avoid extra DB call)
    const hasDown = currentStatus.some((s) => s.status === "down");
    const hasDegraded = currentStatus.some((s) => s.status === "degraded");
    const overall = hasDown ? "down" : hasDegraded ? "degraded" : "up";

    // Build service status with uptime percentages
    const services: ServiceStatusResponse[] = currentStatus
      .map((status: CheckResult) => ({
        service: status.service,
        status: status.status,
        latency: status.latency,
        message: status.message,
        uptime: uptimePercentages.get(status.service) || { "24h": 100, "7d": 100, "30d": 100 },
      }))
      // Sort by defined display order
      .sort((a, b) => {
        const orderA = SERVICE_ORDER.indexOf(a.service);
        const orderB = SERVICE_ORDER.indexOf(b.service);
        // Put unknown services at the end
        return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
      });

    const response: StatusResponse = {
      overall,
      timestamp: new Date().toISOString(),
      services,
    };

    // Include history if requested
    if (historyHours > 0) {
      const historyPromises = currentStatus.map(async (status: CheckResult) => {
        const checks = await getUptimeHistory(status.service, historyHours);
        return {
          service: status.service,
          checks: checks.map((check) => ({
            timestamp: check.timestamp.toISOString(),
            status: check.status,
            latency: check.latency,
          })),
        };
      });

      response.history = await Promise.all(historyPromises);
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
        "X-Response-Time": `${Date.now() - startTime}ms`,
      },
    });
  } catch (error) {
    console.error("[Status API] Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
