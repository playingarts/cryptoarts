import { Interpolation, Theme } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import { Props as LinkProps } from "../Link";

export interface Props extends Omit<LinkProps, "component" | "href"> {
  href?: LinkProps["href"];
  Icon?: FC<HTMLAttributes<SVGElement>>;
  component?: "button" | FC<LinkProps>;
  iconProps?: HTMLAttributes<SVGElement> & { css?: Interpolation<Theme> };
}

const Button: FC<Props> = ({
  component: Component = "button",
  Icon,
  href = "",
  iconProps,
  children,
  ...props
}) => {
  return (
    <Component
      {...props}
      href={href}
      css={(theme) => [
        {
          background: "none",
          color: "#0A0A0A",
          display: "inline-flex",
          borderRadius: theme.spacing(5),
          padding: 0,
          alignItems: "center",
          border: "none",
        },
        children
          ? {
              background: "#EAEAEA",
              fontSize: 18,
              fontWeight: 600,
              lineHeight: "50px",
              textTransform: "uppercase",
              paddingLeft: theme.spacing(2.5),
              paddingRight: theme.spacing(2.5),
            }
          : {
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
