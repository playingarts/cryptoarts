import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHRElement> {
  size?: number;
  spacing?: number;
  vertical?: boolean;
}

const Line: FC<Props> = ({ size = 1, spacing = 1, vertical, ...props }) => (
  <hr
    {...props}
    css={(theme) => ({
      background: "currentColor",
      border: 0,
      marginTop: theme.spacing(spacing),
      marginBottom: theme.spacing(spacing),
      opacity: 0.1,
      ...(vertical
        ? {
            height: "100%",
            width: size,
          }
        : {
            height: size,
          }),
    })}
  />
);

export default Line;
