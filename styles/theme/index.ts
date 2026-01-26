import { Theme } from "@emotion/react";
import { CSSPropertiesWithMultiValues } from "@emotion/serialize";
import { mq, maxMQ, BreakpointsObjectType } from "./breakpoints";
import { colorLiterals, deckColors } from "./colors";
import { typographyLiterals } from "./typography";

// Re-export all theme parts for convenience
export { mq, maxMQ } from "./breakpoints";
export type { BreakpointsObjectType } from "./breakpoints";
export { colorLiterals, deckColors, customcolors } from "./colors";
export { typographyLiterals } from "./typography";
// Note: SPACING and layouts are exported directly from this file

type TransitionProperty =
  | string
  | keyof CSSPropertiesWithMultiValues
  | (keyof CSSPropertiesWithMultiValues)[]
  | string[];

/**
 * Standard spacing values (in theme.spacing units)
 * Use these constants for consistent spacing across the app
 */
export const SPACING = {
  xs: 1, // 10px
  sm: 1.5, // 15px
  md: 2, // 20px
  lg: 3, // 30px
  xl: 4, // 40px
  xxl: 6, // 60px
} as const;

/**
 * Layout utility objects for common CSS patterns
 * Usage: css={[theme.layouts.flexRow, { ... }]}
 */
export const layouts = {
  /** Flex row with standard gap (30px) */
  flexRow: {
    display: "flex" as const,
    gap: 30,
  },
  /** Flex row with items centered */
  flexRowCenter: {
    display: "flex" as const,
    gap: 30,
    alignItems: "center" as const,
  },
  /** Flex column with standard gap */
  flexColumn: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 30,
  },
  /** Common section margin top */
  sectionGap: {
    marginTop: 30,
  },
  /** Button row pattern (marginTop + flex + gap) */
  buttonRow: {
    marginTop: 30,
    display: "flex" as const,
    gap: 30,
  },
  /** Standard container padding */
  containerPadding: {
    padding: 30,
  },
} as const;

/**
 * Main theme object for Emotion ThemeProvider
 */
export const theme: Theme = {
  spanColumns: (columns: number) =>
    "calc(var(--columnWidth) * " +
    columns +
    " + " +
    (columns - 1) +
    " * " +
    30 +
    "px)",
  transitions: {
    fast: (attrs: string | Array<string>) =>
      typeof attrs === "object"
        ? attrs.map((attr) => `${attr} 0.15s ease-in-out`).join(", ")
        : `${attrs} 0.15s ease-in-out`,
    normal: (attrs: string | Array<string>) =>
      typeof attrs === "string"
        ? `${attrs} 0.4s ease`
        : attrs.map((attr) => `${attr} 0.4s ease`).join(", "),
    slow: (attrs: string | Array<string>) =>
      typeof attrs === "string"
        ? `${attrs} 0.55s ease`
        : attrs.map((attr) => `${attr} 0.55s ease`).join(", "),
  },
  colors: { ...colorLiterals, ...deckColors },
  typography: typographyLiterals,
  layouts,
  mq,
  maxMQ,
  spacing: (size: number) => size * 10,
};

/**
 * Emotion theme type augmentation
 * This extends the default Theme interface with our custom properties
 */
declare module "@emotion/react" {
  export interface Theme {
    spanColumns: (columns: number) => string;
    transitions: {
      fast: (property: TransitionProperty) => string;
      normal: (property: TransitionProperty) => string;
      slow: (property: TransitionProperty) => string;
    };
    colors: typeof colorLiterals & typeof deckColors;
    mq: BreakpointsObjectType;
    maxMQ: BreakpointsObjectType;
    typography: typeof typographyLiterals;
    layouts: typeof layouts;
    spacing: (size: number) => number;
  }
}
