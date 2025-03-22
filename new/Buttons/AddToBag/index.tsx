import { FC, HTMLAttributes } from "react";
import Button, { Props } from "../Button";
import Plus from "../../Icons/Plus";
import { useBag } from "../../Contexts/bag";
import Link from "../../Link";

const AddToBag: FC<
  HTMLAttributes<HTMLElement> &
    Props & {
      productId: string;
    }
> = ({ productId, ...props }) => {
  const { bag, addItem } = useBag();

  if (bag && bag[productId] >= 0) {
    return (
      <Link href={"/new/bag"}>
        <Button color="accent" size="small" {...props}>
          View bag
        </Button>
      </Link>
    );
  }

  return (
    <Button
      color="accent"
      size="small"
      css={[
        {
          paddingLeft: 7,
        },
      ]}
      onClick={() => addItem(productId)}
      {...props}
    >
      <Plus css={[{ marginRight: 7 }]} /> Add to bag
    </Button>
  );
};

export default AddToBag;
