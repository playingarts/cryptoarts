import { Work_Sans, Aldrich } from "next/font/google";
import localFont from "next/font/local";

/**
 * Work Sans - Primary body font
 * Used for general text content
 */
export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-work-sans",
});

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
      path: "../public/AllianceMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/AllianceBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-alliance",
});

/**
 * Combined font class names for use in _app.tsx
 */
export const fontVariables = `${workSans.variable} ${aldrich.variable} ${alliance.variable}`;
