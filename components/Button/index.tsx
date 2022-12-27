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
  iconProps?: HTMLAttributes<SVGElement> & {
    css?: Interpolation<Theme>;
    width?: string;
    height?: string;
  };
  variant?: "default" | "bordered";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  size?: "small" | "normal";
  color?: "black";
  loading?: boolean;
  centeredText?: boolean;
  shape?: "round" | "square";
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
    centeredText,
    shape = "square",
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
          padding: 0,
          alignItems: "center",
          border: "none",
          ...(color === "black"
            ? {
                color: theme.colors.page_bg_light,
                background: theme.colors.dark_gray,
              }
            : {}),
        },
        shape === "round"
          ? {
              // borderRadius: theme.spacing(size === "small" ? 4 : 5),
              borderRadius: "100%",
            }
          : {
              borderRadius: theme.spacing(1),
            },
        variant === "bordered" && {
          border: "2px solid currentColor",
        },
        loading && {
          pointerEvents: "none",
        },

        children
          ? [
              {
                ...(color !== "black"
                  ? {
                      color: theme.colors.page_bg_dark,
                      background: theme.colors.page_bg_light,
                    }
                  : {}),
                fontSize: 18,
                fontWeight: 600,
                lineHeight: "50px",
                [theme.maxMQ.sm]: {
                  lineHeight: "42px",
                },
                textTransform: "uppercase",
              },
              shape === "round"
                ? {
                    [theme.maxMQ.sm]: {
                      paddingLeft: theme.spacing(1.7),
                      paddingRight: theme.spacing(2),
                    },
                    paddingLeft: theme.spacing(2.5),
                    paddingRight: theme.spacing(2.5),
                  }
                : {
                    paddingLeft: theme.spacing(1.7),
                    paddingRight: theme.spacing(1.7),
                  },
            ]
          : {
              ...(color !== "black"
                ? {
                    color: "inherit",
                  }
                : {}),
              justifyContent: "center",
              width:
                size === "small"
                  ? "var(--buttonSmallWidth)"
                  : "var(--buttonWidth)",
              height:
                size === "small"
                  ? "var(--buttonSmallHeight)"
                  : "var(--buttonHeight)",
              // height: theme.spacing(size === "small" ? 3.8 : 4.2),
              // [theme.mq.sm]: {
              //   width: theme.spacing(size === "small" ? 3.8 : 5),
              //   height: theme.spacing(size === "small" ? 3.8 : 5),
              // },
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
      {children && (
        <span
          css={[
            loading && { opacity: 0.1 },
            centeredText && { margin: "auto" },
          ]}
        >
          {children}
        </span>
      )}
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
