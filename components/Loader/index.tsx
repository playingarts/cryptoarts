import { FC, HTMLAttributes } from "react";
import Diamonds from "../Icons/Diamonds";

const Loader: FC<HTMLAttributes<HTMLSpanElement>> = (props) => (
  <span
    {...props}
    css={{
      display: "inline-block",
    }}
  >
    <Diamonds
      css={{
        "@keyframes animation": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        animation: "2s linear infinite animation",
        opacity: 0.5,
      }}
    />
  </span>
);

export default Loader;
