import { FC, HTMLAttributes } from "react";

export type Props = HTMLAttributes<HTMLDivElement>;

const Grid: FC<Props> = ({ children, ...props }) => (
  <div
    {...props}
    css={(theme) => ({
      display: "grid",
      gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px)`,
      columnGap: theme.spacing(3),
    })}
  >
    {children}
  </div>
);

export default Grid;
