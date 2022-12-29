import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHRElement> {
  size?: number;
  spacing?: number;
  vertical?: boolean;
  palette?: "dark" | "light";
}

const Line: ForwardRefRenderFunction<HTMLHRElement, Props> = (
  { palette = "light", size = 1, spacing = 1, vertical, ...props },
  ref
) => (
  <hr
    ref={ref}
    {...props}
    css={(theme) => ({
      color: palette === "dark" ? theme.colors.white : theme.colors.black,
      background: "currentColor",
      border: 0,
      marginTop: theme.spacing(spacing),
      marginBottom: theme.spacing(spacing),
      // [theme.maxMQ.sm]: {
      //   opacity: 0.25,
      // },
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

export default forwardRef(Line);
