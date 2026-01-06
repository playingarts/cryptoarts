import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import pkg from "../../package.json";
import { connect } from "../../source/mongoose";

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

  // Add detailed memory usage check
  const memUsage = process.memoryUsage();
  const toMB = (bytes: number) => Math.round(bytes / 1024 / 1024);

  const heapUsedMB = toMB(memUsage.heapUsed);
  const heapTotalMB = toMB(memUsage.heapTotal);
  const rssMB = toMB(memUsage.rss);
  const externalMB = toMB(memUsage.external);
  const arrayBuffersMB = toMB(memUsage.arrayBuffers);

  const heapUsagePercent = Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100);
  const isMemoryHigh = heapUsagePercent >= 90;

  health.checks!.memory = {
    status: isMemoryHigh ? "error" : "ok",
    message: `heap: ${heapUsedMB}/${heapTotalMB}MB (${heapUsagePercent}%), rss: ${rssMB}MB, external: ${externalMB}MB, buffers: ${arrayBuffersMB}MB`,
  };

  // Check rate limiting backend
  const isRedisConfigured =
    !!process.env.UPSTASH_REDIS_REST_URL &&
    !!process.env.UPSTASH_REDIS_REST_TOKEN;
  health.checks!.rateLimit = {
    status: "ok",
    message: isRedisConfigured ? "Upstash Redis (distributed)" : "In-memory (per-instance)",
  };

  // Check MongoDB connectivity
  const dbStart = Date.now();
  try {
    await connect();
    const readyState = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const isConnected = readyState === 1;
    health.checks!.database = {
      status: isConnected ? "ok" : "error",
      latency: Date.now() - dbStart,
      message: isConnected ? "MongoDB connected" : `MongoDB state: ${readyState}`,
    };
  } catch (error) {
    health.checks!.database = {
      status: "error",
      latency: Date.now() - dbStart,
      message: error instanceof Error ? error.message : "Connection failed",
    };
  }

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
