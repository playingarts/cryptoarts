import { FC, HTMLAttributes } from "react";
import Button, { Props } from "../Button";
import Plus from "../../Icons/Plus";
import { useBag } from "../../Contexts/bag";
import Link from "../../Link";

const AddToBag: FC<
  HTMLAttributes<HTMLElement> &
    Props & {
      productId: string;
      onViewBag?: () => void;
    }
> = ({ productId, onViewBag, ...props }) => {
  const { bag, addItem } = useBag();

  if (bag && bag[productId] >= 0) {
    if (onViewBag) {
      return (
        <Button color="accent" size="small" onClick={onViewBag} {...props}>
          View bag
        </Button>
      );
    }
    return (
      <Link href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/bag"} css={{ display: "flex", alignItems: "center" }}>
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
          paddingLeft: 10,
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
