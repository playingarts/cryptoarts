import { NextResponse } from "next/server";
import mongoose from "mongoose";
import pkg from "../../../package.json";
import { connect } from "../../../source/mongoose";

interface HealthCheck {
  status: "ok" | "error";
  latency?: number;
  message?: string;
  critical?: boolean; // If true, check failure returns 503
}

interface HealthResponse {
  status: "ok" | "degraded" | "down";
  version: string;
  timestamp: string;
  uptime: number;
  checks?: {
    [key: string]: HealthCheck;
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
export async function GET() {
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

  const heapUsagePercent = Math.round(
    (memUsage.heapUsed / memUsage.heapTotal) * 100
  );
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
    message: isRedisConfigured
      ? "Upstash Redis (distributed)"
      : "In-memory (per-instance)",
  };

  // Check MongoDB connectivity (critical - returns 503 on failure)
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
      critical: true, // Database is required for the app to function
    };
  } catch (error) {
    health.checks!.database = {
      status: "error",
      latency: Date.now() - dbStart,
      message: error instanceof Error ? error.message : "Connection failed",
      critical: true,
    };
  }

  // Determine overall status
  const hasCriticalErrors = Object.values(health.checks!).some(
    (check) => check.status === "error" && check.critical
  );
  const hasNonCriticalErrors = Object.values(health.checks!).some(
    (check) => check.status === "error" && !check.critical
  );

  if (hasCriticalErrors) {
    health.status = "down"; // Critical failure - service is unusable
  } else if (hasNonCriticalErrors) {
    health.status = "degraded"; // Non-critical failure - service works with reduced functionality
  }

  // Return 503 if any critical check failed
  const statusCode = hasCriticalErrors ? 503 : 200;

  return NextResponse.json(health, {
    status: statusCode,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Response-Time": `${Date.now() - startTime}ms`,
    },
  });
}
