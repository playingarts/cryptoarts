import { NextApiRequest, NextApiResponse } from "next";
import pkg from "../../package.json";

interface HealthResponse {
  status: "ok" | "degraded" | "down";
  version: string;
  timestamp: string;
  uptime: number;
  checks?: {
    [key: string]: {
      status: "ok" | "error";
      latency?: number;
      message?: string;
    };
  };
}

/**
 * Health check endpoint for monitoring and load balancers
 *
 * GET /api/health
 *
 * Returns:
 * - 200: Service is healthy
 * - 503: Service is degraded or down
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end();
  }

  const startTime = Date.now();

  const health: HealthResponse = {
    status: "ok",
    version: pkg.version,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {},
  };

  // Add memory usage check
  const memUsage = process.memoryUsage();
  const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);

  health.checks!.memory = {
    status: heapUsedMB < heapTotalMB * 0.9 ? "ok" : "error",
    message: `${heapUsedMB}MB / ${heapTotalMB}MB`,
  };

  // Determine overall status
  const hasErrors = Object.values(health.checks!).some(
    (check) => check.status === "error"
  );

  if (hasErrors) {
    health.status = "degraded";
  }

  // Set response headers
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("X-Response-Time", `${Date.now() - startTime}ms`);

  // Return appropriate status code
  const statusCode = health.status === "ok" ? 200 : 503;

  return res.status(statusCode).json(health);
}
