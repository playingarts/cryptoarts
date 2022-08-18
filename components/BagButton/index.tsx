import { FC } from "react";
import { useBag } from "../../hooks/bag";
import { breakpoints } from "../../source/enums";
import Button, { Props as ButtonProps } from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";
import { useSize } from "../SizeProvider";

const BagButton: FC<ButtonProps> = (props) => {
  const { bag } = useBag();

  const { width } = useSize();

  return (
    <Button
      {...props}
      component={Link}
      href="/bag"
      Icon={Bag}
      css={(theme) => [
        {
          [theme.maxMQ.sm]: {
            paddingRight: theme.spacing(1.5),
            paddingLeft: theme.spacing(1.1),
          },
        },
      ]}
    >
      {width >= breakpoints.sm && "Bag – "}
      {Object.values(bag).reduce((a, b) => a + b, 0)}
    </Button>
  );
};

export default BagButton;
