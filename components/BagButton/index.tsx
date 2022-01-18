import { FC } from "react";
import { useBag } from "../../hooks/bag";
import Button, { Props as ButtonProps } from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";

interface Props extends ButtonProps {}

const BagButton: FC<Props> = (props) => {
  const { bag } = useBag();

  return (
    <Button {...props} component={Link} href="/checkout" Icon={Bag}>
      Bag – {bag.length}
    </Button>
  );
};

export default BagButton;
