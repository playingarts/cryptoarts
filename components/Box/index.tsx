import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  padding?: number;
}

const Box: FC<Props> = ({ padding = 1, ...props }) => (
  <section
    {...props}
    css={(theme) => ({
      borderRadius: theme.spacing(1),
      padding: `${theme.spacing(6 * padding)}px ${theme.spacing(
        9.5 * padding
      )}px`,
    })}
  />
);

export default Box;
