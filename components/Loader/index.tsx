import { ComponentProps, FC } from "react";
import Diamonds from "../Icons/Diamonds";

const Loader: FC<ComponentProps<typeof Diamonds>> = (props) => (
  <Diamonds
    {...props}
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
);

export default Loader;
