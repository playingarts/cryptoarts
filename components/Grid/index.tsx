import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";

export type Props = HTMLAttributes<HTMLDivElement> & {
  short?: boolean;
  shop?: boolean;
  auto?: boolean;
};

const Grid: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { shop, children, short, auto, ...props },
  ref
) => (
  <div
    ref={ref}
    {...props}
    css={(theme) => [
      // Base styles (desktop 1340px+)
      {
        display: "grid",
        columnGap: theme.spacing(3),
        "--columnWidth": `${theme.spacing(8)}px`,
        justifyContent: "center",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      },
      // Desktop grid columns (1340px+)
      short
        ? {
            gridTemplateColumns: `repeat(10, ${theme.spacing(8)}px)`,
          }
        : {
            gridTemplateColumns: `repeat(12, ${theme.spacing(8)}px)`,
          },
      // Small desktop (1000-1339px): 9 columns fixed OR 8 columns fluid for shop
      shop
        ? {
            [theme.maxMQ.md]: {
              gridTemplateColumns: `repeat(8, 1fr)`,
              paddingLeft: theme.spacing(3),
              paddingRight: theme.spacing(3),
              justifyContent: "stretch",
            },
          }
        : {
            [theme.maxMQ.md]: {
              gridTemplateColumns: "repeat(9, var(--columnWidth))",
            },
          },
      // Tablet (660-999px): 6 columns fluid
      {
        [theme.maxMQ.sm]: {
          gridTemplateColumns: "repeat(6, 1fr)",
          columnGap: theme.spacing(2),
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          justifyContent: "stretch",
          // Make all direct children full-width by default on tablet
          "> *": {
            gridColumn: "1 / -1",
          },
        },
      },
      // Mobile (<660px): 4 columns fluid - MUST be last to override tablet
      {
        [theme.maxMQ.xsm]: {
          gridTemplateColumns: "repeat(4, 1fr)",
          columnGap: theme.spacing(1.5),
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          justifyContent: "stretch",
          overflowX: "hidden",
          // Make all direct children full-width by default on mobile
          "> *": {
            gridColumn: "1 / -1",
          },
        },
      },
      // Auto-fill mode overrides
      auto && {
        gridTemplateColumns: "repeat(auto-fill, var(--columnWidth))",
        [theme.maxMQ.sm]: {
          gridTemplateColumns: "repeat(6, 1fr)",
        },
        [theme.maxMQ.xsm]: {
          gridTemplateColumns: "repeat(4, 1fr)",
        },
      },
    ]}
  >
    {children}
  </div>
);

export default forwardRef(Grid);
