import { css } from "@emotion/react";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  component?: "h1" | "div";
}

const Title: FC<Props> = ({
  component: Component = "div",
  children,
  ...props
}) => {
  return (
    <Component
      {...props}
      css={css`
        font-family: Aldrich, sans-serif;
      `}
    >
      {children}
    </Component>
  );
};

export default Title;
