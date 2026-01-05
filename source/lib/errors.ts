/**
 * Custom error classes for better error handling and categorization
 */

export enum ErrorCode {
  // Network/API errors
  NETWORK_ERROR = "NETWORK_ERROR",
  API_ERROR = "API_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  RATE_LIMITED = "RATE_LIMITED",

  // Data errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  PARSE_ERROR = "PARSE_ERROR",

  // Auth errors
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  SIGNATURE_INVALID = "SIGNATURE_INVALID",

  // External service errors
  OPENSEA_ERROR = "OPENSEA_ERROR",
  MONGODB_ERROR = "MONGODB_ERROR",

  // Generic
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export interface ErrorContext {
  code: ErrorCode;
  message: string;
  originalError?: Error;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly timestamp: string;
  public readonly metadata?: Record<string, unknown>;
  public readonly originalError?: Error;

  constructor(
    code: ErrorCode,
    message: string,
    options?: {
      originalError?: Error;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.timestamp = new Date().toISOString();
    this.originalError = options?.originalError;
    this.metadata = options?.metadata;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  toJSON(): ErrorContext {
    return {
      code: this.code,
      message: this.message,
      timestamp: this.timestamp,
      metadata: this.metadata,
      originalError: this.originalError,
    };
  }
}

/**
 * Network-related errors (fetch failures, timeouts)
 */
export class NetworkError extends AppError {
  constructor(message: string, options?: { originalError?: Error; metadata?: Record<string, unknown> }) {
    super(ErrorCode.NETWORK_ERROR, message, options);
    this.name = "NetworkError";
  }
}

/**
 * API errors (non-2xx responses)
 */
export class ApiError extends AppError {
  public readonly statusCode: number;

  constructor(
    statusCode: number,
    message: string,
    options?: { originalError?: Error; metadata?: Record<string, unknown> }
  ) {
    super(ErrorCode.API_ERROR, message, options);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

/**
 * Rate limiting errors
 */
export class RateLimitError extends AppError {
  public readonly retryAfter?: number;

  constructor(
    message: string,
    options?: { retryAfter?: number; originalError?: Error; metadata?: Record<string, unknown> }
  ) {
    super(ErrorCode.RATE_LIMITED, message, options);
    this.name = "RateLimitError";
    this.retryAfter = options?.retryAfter;
  }
}

/**
 * OpenSea-specific errors
 */
export class OpenSeaError extends AppError {
  constructor(message: string, options?: { originalError?: Error; metadata?: Record<string, unknown> }) {
    super(ErrorCode.OPENSEA_ERROR, message, options);
    this.name = "OpenSeaError";
  }
}

/**
 * Validation errors
 */
export class ValidationError extends AppError {
  public readonly field?: string;

  constructor(
    message: string,
    options?: { field?: string; originalError?: Error; metadata?: Record<string, unknown> }
  ) {
    super(ErrorCode.VALIDATION_ERROR, message, options);
    this.name = "ValidationError";
    this.field = options?.field;
  }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Wrap unknown errors in AppError
 */
export function wrapError(error: unknown, defaultMessage = "An unexpected error occurred"): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(ErrorCode.UNKNOWN_ERROR, error.message, { originalError: error });
  }

  return new AppError(ErrorCode.UNKNOWN_ERROR, defaultMessage, {
    metadata: { originalValue: String(error) },
  });
}
