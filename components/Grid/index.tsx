import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";

export type Props = HTMLAttributes<HTMLDivElement> & {
  short?: boolean;
  shop?: boolean;
};

const Grid: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { shop, children, short, ...props },
  ref
) => (
  <div
    ref={ref}
    {...props}
    css={(theme) => [
      {
        display: "grid",
        // gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px)`,
        columnGap: theme.spacing(3),
        // [theme.maxMQ.sm]:{

        // }
        "--columnWidth": `${theme.spacing(7.5)}px`,
        [theme.maxMQ.sm]: {
          columnGap: theme.spacing(2),
          "--columnWidth": `${theme.spacing(4)}px`,
        },
        justifyContent: "center",
      },
      shop
        ? {
            [theme.maxMQ.md]: {
              gridTemplateColumns: `repeat(8, 1fr)`,
            },
          }
        : {
            // [theme.mq.mobile]: {
            //   gridTemplateColumns: `repeat(3, ${theme.spacing(7.5)}px)`,
            // },
            // [theme.mq.xsm]: {
            //   gridTemplateColumns: `repeat(6, ${theme.spacing(7.5)}px)`,
            // },
            // [theme.mq.sm]: {
            //   gridTemplateColumns: `repeat(9, ${theme.spacing(7.5)}px)`,
            // },
            [theme.maxMQ.md]: {
              gridTemplateColumns: "repeat(9, var(--columnWidth))",
            },

            // [theme.mq.lg]: {
            //   gridTemplateColumns: `repeat(11, ${theme.spacing(7.5)}px)`,
            // },
            // [theme.mq.xl]: {
            //   gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px)`,
            // },
          },
      short
        ? {
            [theme.mq.md]: {
              gridTemplateColumns: `repeat(10, ${theme.spacing(7.5)}px)`,
            },
            // [theme.mq.lg]: {
            //   gridTemplateColumns: `repeat(11, ${theme.spacing(7.5)}px)`,
            // },
            // [theme.mq.xl]: {
            //   gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px)`,
            // },
          }
        : {
            [theme.mq.md]: {
              gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px)`,
            },
          },
      {
        [theme.maxMQ.sm]: {
          // gridTemplateColumns: "repeat(6, var(--columnWidth))",
          gridTemplateColumns: "repeat(6, 1fr)",
        },
      },
    ]}
  >
    {children}
  </div>
);

export default forwardRef(Grid);
