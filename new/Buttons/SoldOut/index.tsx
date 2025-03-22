import { FC, HTMLAttributes } from "react";
import Button, { Props } from "../Button";

const SoldOut: FC<HTMLAttributes<HTMLElement> & Props> = ({ ...props }) => (
  <Button
    css={(theme) => [
      {
        color: theme.colors.black50,
        backgroundColor: "rgba(0,0,0, 0.05)",
        "&:hover": {
          color: theme.colors.black50,
          opacity: 1,
        },
      },
    ]}
    {...props}
  >
    Sold out
  </Button>
);

export default SoldOut;
