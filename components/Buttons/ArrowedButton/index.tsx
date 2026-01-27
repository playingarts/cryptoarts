import { FC, HTMLAttributes } from "react";
import IconArrow from "../../Icons/IconArrow";
import Text from "../../Text";
import { maxMQ } from "../../../styles/theme";

const ArrowedButton: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <Text
    css={{
      display: "inline-flex",
      alignItems: "center",
      cursor: "pointer",
      "&:hover": {
        opacity: 0.7,
      },
    }}
    {...props}
  >
    <IconArrow css={{ marginRight: 10, [maxMQ.xsm]: { width: 18, height: 18, marginRight: 8 } }} />
    {children}
  </Text>
);

export default ArrowedButton;
