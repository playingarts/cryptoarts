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
        justifyContent: "center",
      },
      // Mobile (<660px): 4 columns, full width with small margins
      {
        [theme.maxMQ.xsm]: {
          gridTemplateColumns: "repeat(4, 1fr)",
          columnGap: theme.spacing(1.5),
          paddingLeft: theme.spacing(1.5),
          paddingRight: theme.spacing(1.5),
          justifyContent: "stretch",
        },
      },
      auto
        ? {
            gridTemplateColumns: "repeat(auto-fill, var(--columnWidth))",
            [theme.maxMQ.xsm]: {
              gridTemplateColumns: "repeat(4, 1fr)",
            },
          }
        : [
            // Tablet (660-1000px): 6 columns
            {
              [theme.maxMQ.sm]: {
                gridTemplateColumns: "repeat(6, 1fr)",
                columnGap: theme.spacing(2),
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
                justifyContent: "stretch",
              },
            },
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
                    gridTemplateColumns: `repeat(10, ${theme.spacing(8)}px)`,
                  },
                }
              : {
                  [theme.mq.md]: {
                    gridTemplateColumns: `repeat(12, ${theme.spacing(8)}px)`,
                  },
                },
          ],
    ]}
  >
    {children}
  </div>
);

export default forwardRef(Grid);
