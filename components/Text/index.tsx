import { FC, HTMLAttributes } from "react";
import { theme } from "../../pages/_app";

export interface Props extends HTMLAttributes<HTMLElement> {
  component?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "div"
    | "label"
    | "dt"
    | "dd";
  variant?: keyof typeof theme.typography;
}

const Text: FC<Props> = ({
  component: Component = "p",
  variant = Component === "h1" ||
  Component === "h2" ||
  Component === "h3" ||
  Component === "h4" ||
  Component === "h5" ||
  Component === "h6"
    ? Component
    : "body",
  children,
  ...props
}) => {
  return (
    <Component {...props} css={(theme) => theme.typography[variant]}>
      {children}
    </Component>
  );
};

export default Text;
