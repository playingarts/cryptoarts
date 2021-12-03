import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  component?: "h1" | "h2" | "div" | "dt";
}

const Title: FC<Props> = ({
  component: Component = "div",
  children,
  ...props
}) => {
  return (
    <Component
      {...props}
      css={{
        fontFamily: "Aldrich, sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </Component>
  );
};

export default Title;
