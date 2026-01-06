"use client";

/**
 * Global error boundary for App Router
 *
 * This component catches errors that occur in the root layout
 * and reports them to Sentry. It's required for proper error
 * tracking in the App Router.
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#react-render-errors-in-app-router
 */

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2rem",
                color: "#333",
                margin: 0,
                marginBottom: "1rem",
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "#666",
                margin: 0,
                marginBottom: "2rem",
              }}
            >
              An unexpected error occurred
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "12px 24px",
                background: "#6A5ACD",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
