import { Aldrich } from "next/font/google";
import localFont from "next/font/local";

/**
 * Aldrich - Display font
 * Used for specific decorative elements
 */
export const aldrich = Aldrich({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-aldrich",
});

/**
 * Alliance No.2 - Brand font (local)
 * Custom font loaded from public directory
 */
export const alliance = localFont({
  src: [
    {
      path: "../public/AllianceRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/AllianceMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/AllianceBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-alliance",
  declarations: [{ prop: "descent-override", value: "15%" }],
});

/**
 * Combined font class names for use in _app.tsx
 */
export const fontVariables = `${aldrich.variable} ${alliance.variable}`;
