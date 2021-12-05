import { FC, HTMLAttributes } from "react";
import { theme } from "../../pages/_app";

interface Props extends HTMLAttributes<HTMLElement> {
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
  variant = "body",
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
