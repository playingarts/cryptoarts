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
        "&:hover": {
          cursor: "pointer",
        },
        display: "flex",
        alignItems: "center",
        borderRadius: 100,
        paddingRight: 25,
        fontSize: 18,
        fontWeight: 600,
        textTransform: "uppercase",
        paddingTop: 9,
        paddingBottom: 9,
        width: "fit-content",
        height: "fit-content",
      }}
    >
      {Icon && <Icon css={{ marginLeft: 15, marginRight: 10 }} />}
      <div>{text}</div>
    </div>
  );
};

export default Button;
