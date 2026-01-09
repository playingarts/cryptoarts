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
      {
        display: "grid",
        columnGap: theme.spacing(3),
        "--columnWidth": `${theme.spacing(8)}px`,
        [theme.maxMQ.sm]: {
          // Mobile styles - to be implemented
        },
        justifyContent: "center",
      },
      auto
        ? {
            gridTemplateColumns: "repeat(auto-fill, var(--columnWidth))",
          }
        : [
            shop
              ? {
                  [theme.maxMQ.md]: {
                    gridTemplateColumns: `repeat(8, 1fr)`,
                  },
                }
              : {
                  [theme.maxMQ.sm]: {
                    // Mobile styles - to be implemented
                  },
                  [theme.maxMQ.md]: {
                    gridTemplateColumns: "repeat(9, var(--columnWidth))",
                  },
                },
            short
              ? {
                  [theme.mq.md]: {
                    gridTemplateColumns: `repeat(10, ${theme.spacing(8)}px)`,
                  },
                }
              : {
                  [theme.mq.md]: {
                    gridTemplateColumns: `repeat(12, ${theme.spacing(8)}px)`,
                  },
                },
          ],
      {
        [theme.maxMQ.sm]: {
          // Mobile styles - to be implemented
        },
      },
    ]}
  >
    {children}
  </div>
);

export default forwardRef(Grid);
