import { Interpolation, Theme } from "@emotion/react";
import {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
} from "react";
import { Props as LinkProps } from "../Link";
import Loader from "../Loader";

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
  loading?: boolean;
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
    loading,
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
          position: "relative",
          background: "none",
          display: "inline-flex",
          borderRadius: theme.spacing(size === "small" ? 4 : 5),
          padding: 0,
          alignItems: "center",
          border: "none",
          ...(color === "black"
            ? {
                color: theme.colors.page_bg_light,
                background: theme.colors.page_bg_dark,
              }
            : {}),
        },
        variant === "bordered" && {
          border: "2px solid currentColor",
        },
        loading && {
          pointerEvents: "none",
        },
        children
          ? {
              ...(color !== "black"
                ? {
                    color: theme.colors.page_bg_dark,
                    background: theme.colors.page_bg_light,
                  }
                : {}),
              fontSize: 18,
              fontWeight: 600,
              lineHeight: "50px",
              textTransform: "uppercase",
              paddingLeft: theme.spacing(2.5),
              paddingRight: theme.spacing(2.5),
            }
          : {
              ...(color !== "black"
                ? {
                    color: "inherit",
                  }
                : {}),
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
                  loading && { opacity: 0.1 },
                ],
              }
            : {})}
        />
      )}
      {children && <span css={loading && { opacity: 0.1 }}>{children}</span>}
      {loading && (
        <Loader
          css={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            lineHeight: 1,
          }}
        />
      )}
    </Component>
  );
};

export default forwardRef(Button);
