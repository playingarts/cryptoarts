import { FC, HTMLAttributes } from "react";
import { Props as LinkProps } from "../Link";

interface Props extends Omit<LinkProps, "component" | "href"> {
  href?: LinkProps["href"];
  text: string;
  Icon?: FC<HTMLAttributes<SVGElement>>;
  component?: "button" | FC<LinkProps>;
}

const Button: FC<Props> = ({
  component: Component = "button",
  text,
  Icon,
  href = "",
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
        lineHeight: "50px",
        fontSize: 18,
        fontWeight: 600,
        textTransform: "uppercase",
        alignItems: "center",
        fill: "#0A0A0A",
        stroke: "#0A0A0A",
        border: "none",
      }}
    >
      {Icon && <Icon css={{ marginRight: 10 }} />}
      <div>{text}</div>
    </Component>
  );
};

export default Button;
