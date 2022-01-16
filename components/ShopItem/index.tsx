import { FC, HTMLAttributes } from "react";
import Box from "../Box";
import Button, { Props as ButtonProps } from "../Button";
import Bag from "../Icons/Bag";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  image: string;
  price: string;
  name: string;
  ButtonProps: ButtonProps;
}

const ShopItem: FC<Props> = ({ image, price, name, ButtonProps, ...props }) => {
  return (
    <Box
      narrow={true}
      css={(theme) => ({
        "& > *": {
          transition: theme.transitions.fast("opacity"),
          opacity: 0,
        },
        "&:hover > *": {
          opacity: 1,
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        flexGrow: 1,
      })}
      {...props}
    >
      <div>
        <Text component="h3">{name}</Text>
        <Text variant="body2" css={{ opacity: 0.5, margin: 0 }}>
          {price}
        </Text>
      </div>
      <Button {...ButtonProps} Icon={Bag}>
        Add to bag
      </Button>
    </Box>
  );
};

export default ShopItem;
