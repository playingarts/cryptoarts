import { Metadata } from "next";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "modern-normalize/modern-normalize.css";
import { Providers } from "./providers";

/**
 * Root layout for App Router
 *
 * This is the foundation for the App Router migration.
 * During the transition, both pages/ and app/ directories coexist.
 *
 * @see docs/APP_ROUTER_MIGRATION.md
 */

export const metadata: Metadata = {
  title: "Playing Arts - Collective Art Project",
  description:
    "Collective Art Project for creative people who are into illustrations, playing cards, NFTs and sometimes magic.",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics trackPageViews />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
