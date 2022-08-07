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
        "--columnWidth": `${theme.spacing(7.5)}px`,
        [theme.maxMQ.sm]: {
          columnGap: theme.spacing(2),
          "--columnWidth": `${theme.spacing(4)}px`,
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
                  [theme.maxMQ.md]: {
                    gridTemplateColumns: "repeat(9, var(--columnWidth))",
                  },
                },
            short
              ? {
                  [theme.mq.md]: {
                    gridTemplateColumns: `repeat(10, ${theme.spacing(7.5)}px)`,
                  },
                }
              : {
                  [theme.mq.md]: {
                    gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px)`,
                  },
                },
          ],
      {
        [theme.maxMQ.sm]: {
          gridTemplateColumns: "repeat(6, 1fr)",
        },
      },
    ]}
  >
    {children}
  </div>
);

export default forwardRef(Grid);
