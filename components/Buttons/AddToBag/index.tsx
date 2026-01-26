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
      /** Product status - if "soldout" or "soon", button won't be rendered */
      status?: string;
    }
> = ({ productId, onViewBag, status, size = "small", ...props }) => {
  const { bag, addItem } = useBag();

  // Don't render for products not on sale
  if (status === "soldout" || status === "soon") {
    return null;
  }

  if (bag && bag[productId] >= 0) {
    if (onViewBag) {
      return (
        <Button color="accent" size={size} onClick={onViewBag} {...props}>
          View bag
        </Button>
      );
    }
    return (
      <Link href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/bag"} css={{ display: "flex", alignItems: "center" }}>
        <Button color="accent" size={size} {...props}>
          View bag
        </Button>
      </Link>
    );
  }

  return (
    <Button
      color="accent"
      size={size}
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
