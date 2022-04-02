import {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
} from "react";
import { theme } from "../../pages/_app";
import { Props as LinkProps } from "../Link";
import { Props as ButtonProps } from "../Button";

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
    | "dd"
    | "button"
    | "span"
    | "li"
    | FC<LinkProps>
    | FC<ButtonProps>;
  variant?: keyof typeof theme.typography | "h7";
  href?: LinkProps["href"];
  target?: LinkProps["target"];
  shallow?: LinkProps["shallow"];
  scroll?: LinkProps["scroll"];
}

const Text: ForwardRefRenderFunction<any, Props> = (
  {
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
    href,
    color,
    style,
    ...props
  },
  ref
) => {
  return (
    <Component
      ref={ref}
      href={href as URL}
      color={color as any}
      {...props}
      style={
        Component === "button"
          ? {
              background: "none",
              padding: 0,
              color: "currentcolor",
              border: 0,
              ...style,
            }
          : style
      }
      css={(theme) => theme.typography[variant]}
    >
      {children}
    </Component>
  );
};

export default forwardRef(Text);
