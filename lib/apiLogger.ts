import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import * as Sentry from "@sentry/nextjs";
import * as crypto from "crypto";

/**
 * Request ID header name
 * Used for request tracing across services
 */
export const REQUEST_ID_HEADER = "x-request-id";

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return crypto.randomUUID();
}

/**
 * Get or generate a request ID from headers
 */
export function getRequestId(
  headers: Headers | { [key: string]: string | string[] | undefined }
): string {
  if (headers instanceof Headers) {
    return headers.get(REQUEST_ID_HEADER) || generateRequestId();
  }
  const existing = headers[REQUEST_ID_HEADER];
  if (typeof existing === "string") {
    return existing;
  }
  return generateRequestId();
}

interface LogEntry {
  timestamp: string;
  requestId: string;
  method: string;
  path: string;
  status: number;
  duration: number;
  ip: string;
  userAgent?: string;
}

interface ErrorLogEntry {
  timestamp: string;
  requestId: string;
  method: string;
  path: string;
  error: string;
  ip: string;
  [key: string]: unknown;
}

/**
 * Get client IP from Pages Router request headers
 */
function getClientIpFromPagesRequest(req: NextApiRequest): string {
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
 * Get client IP from App Router request
 */
function getClientIpFromAppRequest(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

/**
 * Format log entry for output
 */
function formatLogEntry(entry: LogEntry): string {
  if (process.env.NODE_ENV === "production") {
    return JSON.stringify(entry);
  }
  // Pretty print in development with request ID
  return `[${entry.timestamp}] [${entry.requestId.slice(0, 8)}] ${entry.method} ${entry.path} ${entry.status} ${entry.duration}ms`;
}

// ============================================
// Pages Router API Logging (NextApiRequest)
// ============================================

/**
 * Create a structured log entry for Pages Router API requests
 */
export function createLogEntry(
  req: NextApiRequest,
  res: NextApiResponse,
  startTime: number,
  requestId?: string
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    requestId: requestId || getRequestId(req.headers),
    method: req.method || "UNKNOWN",
    path: req.url || "/",
    status: res.statusCode,
    duration: Date.now() - startTime,
    ip: getClientIpFromPagesRequest(req),
    userAgent: req.headers["user-agent"],
  };
}

/**
 * Log a Pages Router API request in structured JSON format
 */
export function logApiRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  startTime: number,
  requestId?: string
): void {
  const entry = createLogEntry(req, res, startTime, requestId);
  console.log(formatLogEntry(entry));
}

/**
 * Log a Pages Router API error to console and Sentry
 */
export function logApiError(
  req: NextApiRequest,
  error: Error,
  context?: Record<string, unknown>,
  requestId?: string
): void {
  const reqId = requestId || getRequestId(req.headers);
  const entry: ErrorLogEntry = {
    timestamp: new Date().toISOString(),
    requestId: reqId,
    method: req.method || "UNKNOWN",
    path: req.url || "/",
    error: error.message,
    ip: getClientIpFromPagesRequest(req),
    ...context,
  };

  console.error(JSON.stringify(entry));

  // Report to Sentry with request context
  Sentry.withScope((scope) => {
    scope.setTag("request_id", reqId);
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
 * Higher-order function to wrap a Pages Router API handler with logging
 */
export function withLogging<T>(
  handler: (req: NextApiRequest, res: NextApiResponse<T>) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse<T>): Promise<void> => {
    const startTime = Date.now();
    const requestId = getRequestId(req.headers);

    // Add request ID to response headers for tracing
    res.setHeader(REQUEST_ID_HEADER, requestId);

    // Hook into response finish to log after completion
    res.on("finish", () => {
      logApiRequest(req, res, startTime, requestId);
    });

    return handler(req, res);
  };
}

// ============================================
// App Router API Logging (NextRequest)
// ============================================

interface AppRouterLogEntry {
  timestamp: string;
  requestId: string;
  method: string;
  path: string;
  status: number;
  duration: number;
  ip: string;
  userAgent?: string;
}

/**
 * Create a request context for App Router handlers
 * Use this at the start of your route handler to get a request ID
 *
 * @example
 * ```ts
 * export async function GET(request: NextRequest) {
 *   const ctx = createRequestContext(request);
 *   ctx.log("Processing request");
 *
 *   try {
 *     // ... handle request
 *     return ctx.json({ success: true });
 *   } catch (error) {
 *     ctx.error("Request failed", error);
 *     return ctx.json({ error: "Internal error" }, 500);
 *   }
 * }
 * ```
 */
export function createRequestContext(request: NextRequest) {
  const startTime = Date.now();
  const requestId = getRequestId(request.headers);
  const method = request.method;
  const path = request.nextUrl.pathname;
  const ip = getClientIpFromAppRequest(request);
  const userAgent = request.headers.get("user-agent") || undefined;

  return {
    requestId,
    startTime,

    /**
     * Log an info message with request context
     */
    log(message: string, data?: Record<string, unknown>): void {
      const entry = {
        timestamp: new Date().toISOString(),
        requestId,
        level: "info",
        message,
        method,
        path,
        ...data,
      };

      if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify(entry));
      } else {
        console.log(
          `[${entry.timestamp}] [${requestId.slice(0, 8)}] ${message}`,
          data || ""
        );
      }
    },

    /**
     * Log an error with request context and report to Sentry
     */
    error(message: string, error?: unknown, data?: Record<string, unknown>): void {
      const entry = {
        timestamp: new Date().toISOString(),
        requestId,
        level: "error",
        message,
        method,
        path,
        error: error instanceof Error ? error.message : String(error),
        ...data,
      };

      console.error(JSON.stringify(entry));

      if (error) {
        Sentry.withScope((scope) => {
          scope.setTag("request_id", requestId);
          scope.setExtra("api_path", path);
          scope.setExtra("method", method);
          if (data) {
            Object.entries(data).forEach(([key, value]) => {
              scope.setExtra(key, value);
            });
          }
          Sentry.captureException(error);
        });
      }
    },

    /**
     * Log the completion of a request
     */
    logComplete(status: number): void {
      const entry: AppRouterLogEntry = {
        timestamp: new Date().toISOString(),
        requestId,
        method,
        path,
        status,
        duration: Date.now() - startTime,
        ip,
        userAgent,
      };

      if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify(entry));
      } else {
        console.log(
          `[${entry.timestamp}] [${requestId.slice(0, 8)}] ${method} ${path} ${status} ${entry.duration}ms`
        );
      }
    },

    /**
     * Create a JSON response with request ID header
     */
    json<T>(data: T, status = 200): Response {
      this.logComplete(status);
      return new Response(JSON.stringify(data), {
        status,
        headers: {
          "Content-Type": "application/json",
          [REQUEST_ID_HEADER]: requestId,
        },
      });
    },
  };
}

/**
 * Type for the request context returned by createRequestContext
 */
export type RequestContext = ReturnType<typeof createRequestContext>;
