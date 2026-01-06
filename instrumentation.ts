import * as Sentry from "@sentry/nextjs";

/**
 * Next.js instrumentation file for server-side initialization
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

// Export request error hook for server component error tracking
export const onRequestError = Sentry.captureRequestError;

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side Sentry initialization
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      enabled: !!process.env.SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      environment: process.env.NODE_ENV,
      integrations: [
        Sentry.captureConsoleIntegration({
          levels: ["error"],
        }),
      ],
      beforeSend(event) {
        // Remove sensitive headers
        if (event.request?.headers) {
          delete event.request.headers["authorization"];
          delete event.request.headers["cookie"];
          delete event.request.headers["x-api-key"];
        }
        return event;
      },
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime Sentry initialization
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      enabled: !!process.env.SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      environment: process.env.NODE_ENV,
    });
  }
}
