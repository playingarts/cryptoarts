import { FC, HTMLAttributes } from "react";

const Label: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => (
  <div
    css={(theme) => [
      {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "18px",
        textAlign: "left",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
        padding: "6px 10px 4px",
        background: "white",
        borderRadius: 50,
        textTransform: "capitalize",
        color: theme.colors.black,
      },
    ]}
    {...props}
  >
    {children}
  </div>
);

export default Label;
