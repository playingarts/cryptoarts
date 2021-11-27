import { Interpolation, Theme } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import { Props as LinkProps } from "../Link";

export interface Props extends Omit<LinkProps, "component" | "href"> {
  href?: LinkProps["href"];
  text: string;
  Icon?: FC<HTMLAttributes<SVGElement>>;
  component?: "button" | FC<LinkProps>;
  textProps?: HTMLAttributes<HTMLDivElement> & { css?: Interpolation<Theme> };
  iconProps?: HTMLAttributes<SVGElement> & { css?: Interpolation<Theme> };
}

const Button: FC<Props> = ({
  component: Component = "button",
  text,
  Icon,
  href = "",
  textProps,
  iconProps,
  ...props
}) => {
  return (
    <Component
      {...props}
      href={href}
      css={(theme) => ({
        background: "#EAEAEA",
        color: "#0A0A0A",
        display: "inline-flex",
        borderRadius: theme.spacing(5),
        padding: 0,
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        fontSize: 18,
        fontWeight: 600,
        lineHeight: "50px",
        textTransform: "uppercase",
        alignItems: "center",
        border: "none",
      })}
    >
      {Icon && (
        <Icon
          {...iconProps}
          css={(theme) => [
            iconProps && iconProps.css,
            { marginRight: theme.spacing(1) },
          ]}
        />
      )}
      <div {...textProps}>{text}</div>
    </Component>
  );
};

export default Button;
