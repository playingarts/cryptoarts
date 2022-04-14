import { FC } from "react";
import AddToBagButton from "../AddToBagButton";
import Bag from "../Icons/Bag";
import Eth from "../Icons/Eth";
import StatBlock, { Props as StatBlockProps } from "../StatBlock";
import Text from "../Text";

interface Props
  extends Omit<StatBlockProps, "title" | "action">,
    Pick<GQL.Product, "price"> {
  productId: string;
}

const LatestRelease: FC<Props> = ({ productId, price, ...props }) => (
  <StatBlock
    {...props}
    css={(theme) => ({
      background: `#000 url(https://s3.amazonaws.com/img.playingarts.com/www/shop/crypto_bg.png) bottom right no-repeat`,
      backgroundSize: "85%",
      color: theme.colors.text_title_light,
      position: "relative",
    })}
    action={<AddToBagButton Icon={Bag} productId={productId} />}
    title="LATEST RELEASE"
  >
    <div
      css={{
        width: "55%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div css={{ flexGrow: 1 }}>
        <Text component="h2" css={{ margin: 0 }}>
          Crypto Edition
        </Text>
        <Text variant="body2" css={{ opacity: 0.5 }}>
          Deck of playing cards featuring works of 55 leading digital artists.
        </Text>
      </div>

      <Text
        variant="body2"
        css={{
          opacity: 0.5,
          margin: 0,
        }}
      >
        €{price}
      </Text>
    </div>

    <Eth
      css={(theme) => ({
        opacity: 0.05,
        height: theme.spacing(40),
        width: theme.spacing(24),
        right: theme.spacing(2.5),
        top: -theme.spacing(12),
        position: "absolute",
      })}
    />
  </StatBlock>
);

export default LatestRelease;
