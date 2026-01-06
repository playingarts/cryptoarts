import * as Sentry from "@sentry/nextjs";

// Export router transition hook for navigation instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

/**
 * Next.js client-side instrumentation file
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[Sentry] Would send event:",
        event.exception?.values?.[0]?.value
      );
      return process.env.NEXT_PUBLIC_SENTRY_DSN ? event : null;
    }
    return event;
  },
  ignoreErrors: [
    /^chrome-extension:/,
    /^moz-extension:/,
    "Network request failed",
    "Failed to fetch",
    "Load failed",
    "AbortError",
    "ResizeObserver loop",
  ],
});
