import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  text: string;
  Icon?: FC<HTMLAttributes<SVGElement>>;
}

const Button: FC<Props> = ({ text, Icon, ...props }) => {
  return (
    <div
      {...props}
      css={{
        background: "#EAEAEA",
        color: "#0A0A0A",
        display: "inline-flex",
        borderRadius: 50,
        paddingLeft: 25,
        paddingRight: 25,
        lineHeight: "50px",
        fontSize: 18,
        fontWeight: 600,
        textTransform: "uppercase",
        alignItems: "center",
        fill: "#0A0A0A",
        stroke: "#0A0A0A",
      }}
    >
      {Icon && <Icon css={{ marginRight: 10 }} />}
      <div>{text}</div>
    </div>
  );
};

export default Button;
