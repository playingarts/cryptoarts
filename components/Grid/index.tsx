import { FC, HTMLAttributes } from "react";

export type Props = HTMLAttributes<HTMLDivElement> & {
  short?: boolean;
  shop?: boolean;
};

const Grid: FC<Props> = ({ shop, children, short, ...props }) => (
  <div
    {...props}
    css={(theme) => [
      {
        display: "grid",
        // gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px)`,
        columnGap: theme.spacing(3),

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
              gridTemplateColumns: `repeat(9, ${theme.spacing(7.5)}px)`,
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
    ]}
  >
    {children}
  </div>
);

export default Grid;
