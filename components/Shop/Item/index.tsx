import { css } from "@emotion/react";
import { FC, HTMLAttributes, useState } from "react";
import Button, { Props as ButtonProps } from "../../Button";
import Bag from "../../Icons/Bag";
import StatBlock from "../../StatBlock";
import Text from "../../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  image: string;
  image2: string;
  price: number;
  short: string;
  ButtonProps: ButtonProps;
}

const ShopItem: FC<Props> = ({
  image,
  image2,
  price,
  short,
  ButtonProps,
  ...props
}) => {
  const [hovered, hover] = useState(false);
  const onMouseEnter = () => hover(true);
  const onMouseLeave = () => hover(false);
  const backgroundCss = css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "50% 50% no-repeat",
    backgroundSize: "contain",
  });

  return (
    <StatBlock
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      css={{
        overflow: "hidden",
        position: "relative",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <div
        css={(theme) => [
          backgroundCss,
          { transition: theme.transitions.fast("opacity") },
        ]}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        css={(theme) => [
          backgroundCss,
          { transition: theme.transitions.fast("opacity") },
        ]}
        style={{ backgroundImage: `url(${image2})`, opacity: +hovered }}
      />

      <div
        css={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: "100%",
          transition: theme.transitions.fast("opacity"),
          position: "relative",
        })}
        style={{
          opacity: +hovered,
        }}
      >
        <div>
          <Text component="h3" css={{ margin: 0 }}>
            {short}
          </Text>
          <Text variant="body2" css={{ opacity: 0.5, margin: 0 }}>
            {price.toLocaleString(undefined, {
              style: "currency",
              currency: "EUR",
            })}
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
