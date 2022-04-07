import { FC } from "react";
import { useBag } from "../../hooks/bag";
import Button, { Props as ButtonProps } from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";

const BagButton: FC<ButtonProps> = (props) => {
  const { bag } = useBag();

  return (
    <Button {...props} component={Link} href="/bag" Icon={Bag}>
      Bag – {Object.values(bag).reduce((a, b) => a + b, 0)}
    </Button>
  );
};

export default BagButton;
