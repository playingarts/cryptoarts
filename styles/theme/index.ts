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

type TransitionProperty =
  | string
  | keyof CSSPropertiesWithMultiValues
  | (keyof CSSPropertiesWithMultiValues)[]
  | string[];

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
    spacing: (size: number) => number;
  }
}
