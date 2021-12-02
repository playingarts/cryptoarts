import { Interpolation, Theme } from "@emotion/react";
import { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";
import { Props as LinkProps } from "../Link";

export interface Props extends Omit<LinkProps, "component" | "href"> {
  href?: LinkProps["href"];
  Icon?: FC<HTMLAttributes<SVGElement>>;
  component?: "button" | FC<LinkProps>;
  iconProps?: HTMLAttributes<SVGElement> & { css?: Interpolation<Theme> };
  variant?: "default" | "bordered";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button: FC<Props> = ({
  component: Component = "button",
  Icon,
  href,
  iconProps,
  children,
  variant = "default",
  ...props
}) => {
  return (
    <Component
      {...props}
      href={href as URL}
      css={(theme) => [
        {
          background: "none",
          display: "inline-flex",
          borderRadius: theme.spacing(5),
          padding: 0,
          alignItems: "center",
          border: "none",
        },
        variant === "bordered" && {
          border: `1px solid ${theme.colors.dimWhite}`,
        },
        children
          ? {
              color: "#0A0A0A",
              background: "#EAEAEA",
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
              width: theme.spacing(5),
              height: theme.spacing(5),
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

export default Button;
