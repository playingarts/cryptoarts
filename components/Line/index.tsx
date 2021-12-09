import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHRElement> {
  size?: number;
  spacing?: number;
}

const Line: FC<Props> = ({ size = 1, spacing = 1, ...props }) => (
  <hr
    {...props}
    css={(theme) => ({
      background: "currentColor",
      border: 0,
      height: size,
      marginTop: theme.spacing(spacing),
      marginBottom: theme.spacing(spacing),
      opacity: 0.1,
    })}
  />
);

export default Line;
