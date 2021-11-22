import { css, cx } from "@emotion/css";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  component?: "h1" | "div";
}

const Title: FC<Props> = ({
  className,
  component: Component = "div",
  children,
  ...props
}) => {
  return (
    <Component
      {...props}
      className={cx(
        css`
          font-family: Aldrich, sans-serif !important;
        `,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Title;
