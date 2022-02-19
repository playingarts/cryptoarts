import { FC } from "react";
import Button, { Props as ButtonProps } from "../../Button";
import Bag from "../../Icons/Bag";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";
import Text from "../../Text";

interface Props extends StatBlockProps {
  image: string;
  price: string | number;
  title: string;
  ButtonProps: ButtonProps;
}

const ShopItem: FC<Props> = ({
  image,
  price,
  title,
  ButtonProps,
  ...props
}) => {
  return (
    <StatBlock
      {...props}
      css={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
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
          height: "100%",
        })}
      >
        <div>
          <Text component="h3">{title}</Text>
          <Text variant="body2" css={{ opacity: 0.5, margin: 0 }}>
            {typeof price === "string" ? price : `€${price.toFixed(2)}`}
          </Text>
        </div>
        <Button {...ButtonProps} Icon={Bag}>
          Add to bag
        </Button>
      </div>
    </StatBlock>
  );
};

export default ShopItem;
