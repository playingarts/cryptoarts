import { FC } from "react";
import { useBag } from "../../hooks/bag";
import Button, { Props as ButtonProps } from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";

interface Props extends ButtonProps {
  amount?: number;
  productId: string;
}

const AddToBagButton: FC<Props> = ({
  productId,
  children,
  amount = 1,
  ...props
}) => {
  const { bag, addItem } = useBag();
  const onClick = () => addItem(productId, amount);

  if (bag[productId] >= amount) {
    return (
      <Button {...props} Icon={Bag} component={Link} href="/bag">
        View bag
      </Button>
    );
  }

  return (
    <Button {...props} Icon={Bag} onClick={onClick}>
      {children || "Add to bag"}
    </Button>
  );
};

export default AddToBagButton;
