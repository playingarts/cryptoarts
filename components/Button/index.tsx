import { Interpolation, Theme } from "@emotion/react";
import {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
} from "react";
import { Props as LinkProps } from "../Link";

export interface Props extends Omit<LinkProps, "component" | "href"> {
  href?: LinkProps["href"];
  Icon?: FC<HTMLAttributes<SVGElement>>;
  component?: "button" | FC<LinkProps>;
  iconProps?: HTMLAttributes<SVGElement> & { css?: Interpolation<Theme> };
  variant?: "default" | "bordered";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  size?: "small" | "normal";
  color?: "black";
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  {
    component: Component = "button",
    Icon,
    href,
    iconProps,
    children,
    size = "normal",
    variant = "default",
    color,
    ...props
  },
  ref
) => {
  return (
    <Component
      {...props}
      ref={ref}
      href={href as URL}
      css={(theme) => [
        {
          "&:disabled": {
            cursor: "default",
            opacity: 0.3,
          },
          background: "none",
          display: "inline-flex",
          borderRadius: theme.spacing(size === "small" ? 4 : 5),
          padding: 0,
          alignItems: "center",
          border: "none",
        },
        variant === "bordered" && {
          border: `1px solid currentColor`,
        },
        children
          ? {
              color:
                color === "black"
                  ? theme.colors.page_bg_light
                  : theme.colors.page_bg_dark,
              background:
                color === "black"
                  ? theme.colors.page_bg_dark
                  : theme.colors.page_bg_light,
              fontSize: 18,
              fontWeight: 600,
              lineHeight: "50px",
              textTransform: "uppercase",
              paddingLeft: theme.spacing(2.5),
              paddingRight: theme.spacing(2.5),
            }
          : {
              color: "inherit",
              justifyContent: "center",
              width: theme.spacing(size === "small" ? 4 : 5),
              height: theme.spacing(size === "small" ? 4 : 5),
              lineHeight: 1,
            },
      ]}
    >
      {Icon && (
        <Icon
          {...iconProps}
          {...(children
            ? {
                css: (theme) => [
                  iconProps && iconProps.css,
                  { marginRight: theme.spacing(1) },
                ],
              }
            : {})}
        />
      )}
      {children && <span>{children}</span>}
    </Component>
  );
};

export default forwardRef(Button);
