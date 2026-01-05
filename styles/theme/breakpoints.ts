import { breakpoints } from "../../source/enums";

export type BreakpointsObjectType = {
  [index in keyof typeof breakpoints]: string;
};

/**
 * Media query helpers for min-width (mobile-first)
 * Usage: [mq.sm]: { fontSize: 16 }
 */
export const mq = (Object.keys(breakpoints) as Array<keyof typeof breakpoints>)
  .filter((value) => isNaN(Number(value)) !== false)
  .reduce(
    (prev, key) => ({
      ...prev,
      [key]: `@media only screen and (min-width: ${breakpoints[key]}px)`,
    }),
    {} as BreakpointsObjectType
  );

/**
 * Media query helpers for max-width (desktop-first)
 * Usage: [maxMQ.sm]: { fontSize: 14 }
 */
export const maxMQ = (
  Object.keys(breakpoints) as Array<keyof typeof breakpoints>
)
  .filter((value) => isNaN(Number(value)) !== false)
  .reduce(
    (prev, key) => ({
      ...prev,
      [key]: `@media only screen and (max-width: ${breakpoints[key] - 1}px)`,
    }),
    {} as BreakpointsObjectType
  );
