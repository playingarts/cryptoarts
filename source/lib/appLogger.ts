/**
 * Client-safe logging utility
 *
 * Works in both browser and server environments.
 * In production, errors can be sent to external monitoring service.
 *
 * Usage:
 *   import { logger } from '@/source/lib/appLogger';
 *   logger.error('Something went wrong', { userId: 123 });
 *   logger.warn('Deprecated API used');
 *   logger.info('User logged in');
 */

import { AppError, ErrorContext, isAppError, wrapError } from "./errors";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: ErrorContext;
}

interface LoggerConfig {
  /** Minimum log level to output */
  minLevel: LogLevel;
  /** Whether to include timestamps */
  timestamps: boolean;
  /** Custom handler for errors (e.g., send to Sentry) */
  onError?: (entry: LogEntry) => void;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const isDevelopment = process.env.NODE_ENV === "development";
const isServer = typeof window === "undefined";

const defaultConfig: LoggerConfig = {
  minLevel: isDevelopment ? "debug" : "warn",
  timestamps: true,
};

class AppLogger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.minLevel];
  }

  private formatMessage(entry: LogEntry): string {
    const parts: string[] = [];

    if (this.config.timestamps) {
      parts.push(`[${entry.timestamp}]`);
    }

    parts.push(`[${entry.level.toUpperCase()}]`);
    parts.push(entry.message);

    return parts.join(" ");
  }

  private createEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: unknown
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    if (error) {
      const appError = isAppError(error) ? error : wrapError(error);
      entry.error = appError.toJSON();
    }

    return entry;
  }

  private output(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) {
      return;
    }

    const formattedMessage = this.formatMessage(entry);

    // Use appropriate console method
    switch (entry.level) {
      case "debug":
        console.debug(formattedMessage, entry.context ?? "");
        break;
      case "info":
        console.info(formattedMessage, entry.context ?? "");
        break;
      case "warn":
        console.warn(formattedMessage, entry.context ?? "");
        break;
      case "error":
        console.error(formattedMessage, entry.context ?? "", entry.error ?? "");
        // Call custom error handler if configured
        if (this.config.onError) {
          this.config.onError(entry);
        }
        break;
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.output(this.createEntry("debug", message, context));
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.output(this.createEntry("info", message, context));
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.output(this.createEntry("warn", message, context));
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    this.output(this.createEntry("error", message, context, error));
  }

  /**
   * Log an error with full context
   * Useful for catch blocks
   */
  captureError(error: unknown, context?: Record<string, unknown>): void {
    const appError = isAppError(error) ? error : wrapError(error);
    this.error(appError.message, appError, {
      ...context,
      errorCode: appError.code,
    });
  }

  /**
   * Create a child logger with additional context
   */
  child(defaultContext: Record<string, unknown>): ChildLogger {
    return new ChildLogger(this, defaultContext);
  }
}

class ChildLogger {
  constructor(
    private parent: AppLogger,
    private defaultContext: Record<string, unknown>
  ) {}

  debug(message: string, context?: Record<string, unknown>): void {
    this.parent.debug(message, { ...this.defaultContext, ...context });
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.parent.info(message, { ...this.defaultContext, ...context });
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.parent.warn(message, { ...this.defaultContext, ...context });
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    this.parent.error(message, error, { ...this.defaultContext, ...context });
  }

  captureError(error: unknown, context?: Record<string, unknown>): void {
    this.parent.captureError(error, { ...this.defaultContext, ...context });
  }
}

// Export singleton instance
export const logger = new AppLogger();

// Export class for custom instances
export { AppLogger };

// Re-export error types for convenience
export * from "./errors";
