import { NextApiRequest, NextApiResponse } from "next";
import * as Sentry from "@sentry/nextjs";

interface LogEntry {
  timestamp: string;
  method: string;
  path: string;
  status: number;
  duration: number;
  ip: string;
  userAgent?: string;
}

/**
 * Get client IP from request headers
 */
function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string") {
    return realIp;
  }
  return req.socket?.remoteAddress || "unknown";
}

/**
 * Create a structured log entry for API requests
 */
export function createLogEntry(
  req: NextApiRequest,
  res: NextApiResponse,
  startTime: number
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    method: req.method || "UNKNOWN",
    path: req.url || "/",
    status: res.statusCode,
    duration: Date.now() - startTime,
    ip: getClientIp(req),
    userAgent: req.headers["user-agent"],
  };
}

/**
 * Log an API request in structured JSON format
 */
export function logApiRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  startTime: number
): void {
  const entry = createLogEntry(req, res, startTime);

  // In production, this would go to your logging service
  // For now, we use console.log with JSON format
  if (process.env.NODE_ENV === "production") {
    console.log(JSON.stringify(entry));
  } else {
    // Pretty print in development
    console.log(
      `[${entry.timestamp}] ${entry.method} ${entry.path} ${entry.status} ${entry.duration}ms`
    );
  }
}

/**
 * Log an API error to console and Sentry
 */
export function logApiError(
  req: NextApiRequest,
  error: Error,
  context?: Record<string, unknown>
): void {
  const entry = {
    timestamp: new Date().toISOString(),
    method: req.method || "UNKNOWN",
    path: req.url || "/",
    error: error.message,
    ip: getClientIp(req),
    ...context,
  };

  console.error(JSON.stringify(entry));

  // Report to Sentry with request context
  Sentry.withScope((scope) => {
    scope.setExtra("api_path", entry.path);
    scope.setExtra("method", entry.method);
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }
    Sentry.captureException(error);
  });
}

/**
 * Higher-order function to wrap an API handler with logging
 */
export function withLogging<T>(
  handler: (req: NextApiRequest, res: NextApiResponse<T>) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse<T>): Promise<void> => {
    const startTime = Date.now();

    // Hook into response finish to log after completion
    res.on("finish", () => {
      logApiRequest(req, res, startTime);
    });

    return handler(req, res);
  };
}
