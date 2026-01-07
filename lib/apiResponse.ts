import { NextResponse } from "next/server";
import { REQUEST_ID_HEADER } from "./apiLogger";

/**
 * Standardized API error codes
 */
export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

/**
 * Standardized API error response structure
 */
export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * API response wrapper for errors
 */
export interface ApiErrorResponse {
  error: ApiError;
}

/**
 * API response wrapper for success with data
 */
export interface ApiSuccessResponse<T> {
  data: T;
}

/**
 * Response options for adding headers
 */
interface ResponseOptions {
  requestId?: string;
  headers?: Record<string, string>;
}

/**
 * Add standard headers to response
 */
function buildHeaders(options: ResponseOptions = {}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (options.requestId) {
    headers[REQUEST_ID_HEADER] = options.requestId;
  }

  return headers;
}

/**
 * Create a standardized success response
 *
 * @example
 * ```ts
 * return apiSuccess({ users: [...] });
 * return apiSuccess({ created: true }, { status: 201 });
 * ```
 */
export function apiSuccess<T>(
  data: T,
  options: ResponseOptions & { status?: number } = {}
): NextResponse<ApiSuccessResponse<T>> {
  const { status = 200, ...headerOptions } = options;
  return NextResponse.json(
    { data },
    {
      status,
      headers: buildHeaders(headerOptions),
    }
  );
}

/**
 * Create a standardized error response
 *
 * @example
 * ```ts
 * return apiError("BAD_REQUEST", "Invalid email format");
 * return apiError("NOT_FOUND", "User not found", { userId: "123" });
 * ```
 */
export function apiError(
  code: ApiErrorCode,
  message: string,
  details?: Record<string, unknown>,
  options: ResponseOptions = {}
): NextResponse<ApiErrorResponse> {
  const statusMap: Record<ApiErrorCode, number> = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    RATE_LIMITED: 429,
    VALIDATION_ERROR: 422,
    INTERNAL_ERROR: 500,
  };

  const error: ApiError = { code, message };
  if (details) {
    error.details = details;
  }

  return NextResponse.json(
    { error },
    {
      status: statusMap[code],
      headers: buildHeaders(options),
    }
  );
}

/**
 * Convenience functions for common error types
 */
export const ApiErrors = {
  badRequest: (message: string, details?: Record<string, unknown>, options?: ResponseOptions) =>
    apiError("BAD_REQUEST", message, details, options),

  unauthorized: (message = "Unauthorized", options?: ResponseOptions) =>
    apiError("UNAUTHORIZED", message, undefined, options),

  forbidden: (message = "Forbidden", options?: ResponseOptions) =>
    apiError("FORBIDDEN", message, undefined, options),

  notFound: (message = "Not found", details?: Record<string, unknown>, options?: ResponseOptions) =>
    apiError("NOT_FOUND", message, details, options),

  rateLimited: (message = "Too many requests", options?: ResponseOptions) =>
    apiError("RATE_LIMITED", message, undefined, options),

  validationError: (message: string, details?: Record<string, unknown>, options?: ResponseOptions) =>
    apiError("VALIDATION_ERROR", message, details, options),

  internal: (message = "Internal server error", options?: ResponseOptions) =>
    apiError("INTERNAL_ERROR", message, undefined, options),
};
