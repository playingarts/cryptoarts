import { Interpolation, Theme } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import { Props as LinkProps } from "../Link";

export interface Props extends Omit<LinkProps, "component" | "href"> {
  href?: LinkProps["href"];
  text: string;
  Icon?: FC<HTMLAttributes<SVGElement>>;
  component?: "button" | FC<LinkProps>;
  textProps?: HTMLAttributes<HTMLDivElement> & { css: Interpolation<Theme> };
  iconProps?: HTMLAttributes<SVGElement> & { css: Interpolation<Theme> };
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
      css={{
        background: "#EAEAEA",
        color: "#0A0A0A",
        display: "inline-flex",
        borderRadius: 50,
        padding: 0,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 18,
        fontWeight: 600,
        lineHeight: "50px",
        textTransform: "uppercase",
        alignItems: "center",
        fill: "#0A0A0A",
        stroke: "#0A0A0A",
        border: "none",
      }}
    >
      {Icon && <Icon {...iconProps} css={{ marginRight: 10 }} />}
      <div {...textProps}>{text}</div>
    </Component>
  );
};

export default Button;
