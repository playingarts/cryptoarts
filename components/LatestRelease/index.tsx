import { useMetaMask } from "metamask-react";
import { FC } from "react";
import AddToBagButton from "../AddToBagButton";
import Bag from "../Icons/Bag";
import Ether from "../Icons/Ether";
import StatBlock, { Props as StatBlockProps } from "../StatBlock";
import Text from "../Text";

interface Props extends Omit<StatBlockProps, "title" | "action"> {
  productId: string;
}

const LatestRelease: FC<Props> = ({ productId, ...props }) => {
  const { status } = useMetaMask();

  return (
    <StatBlock
      {...props}
      css={(theme) => ({
        background: `#000 url(https://s3.amazonaws.com/img.playingarts.com/www/shop/crypto_bg.png) bottom right no-repeat`,
        [theme.mq.sm]: {
          [theme.maxMQ.md]: {
            backgroundPositionX: theme.spacing(17),
          },
        },
        backgroundSize: `${theme.spacing(74)}px ${theme.spacing(33)}px`,
        color: theme.colors.text_title_light,
        position: "relative",
        overflow: "hidden",
        [theme.maxMQ.sm]: {
          backgroundPositionX: theme.spacing(-18),
          backgroundSize: "175%",
          paddingBottom: theme.spacing(27.7),
        },
      })}
      {...(status === "connected" && {
        action: (
          <AddToBagButton
            Icon={Bag}
            productId={productId}
            css={(theme) => [{ [theme.maxMQ.sm]: { display: "none" } }]}
          />
        ),
      })}
      title="LATEST RELEASE"
    >
      <div
        css={(theme) => ({
          [theme.mq.sm]: {
            width: theme.spacing(45.5),
          },
          display: "flex",
          flexDirection: "column",
          height: "100%",
        })}
      >
        <div css={{ flexGrow: 1 }}>
          <Text component="h2" css={{ margin: 0 }}>
            Crypto Edition is here. Finally.
          </Text>
          <Text
            variant="body2"
            css={(theme) => ({
              opacity: 0.5,
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(5.8),
              [theme.maxMQ.sm]: {
                display: "none",
              },
            })}
          >
            This deck is only available for Crypto Edition (PACE) NFT holders.
          </Text>
        </div>
        <div
          css={(theme) => [
            {
              gap: theme.spacing(2),
              display: "flex",
              alignItems: "center",
              marginTop: theme.spacing(2),
            },
          ]}
        >
          <AddToBagButton
            Icon={Bag}
            productId={productId}
            css={(theme) => [
              {
                [theme.mq.sm]: { display: "none" },
                width: "max-content",
              },
            ]}
          >
            Add
          </AddToBagButton>
          {/* <Text
          variant="body4"
          css={{
            display: "inline",
            width: "min-content",
            opacity: 0.5,
            margin: 0,
          }}
        >
          €{price}
        </Text> */}
        </div>
      </div>

      <Ether
        css={(theme) => ({
          color: theme.colors.white,
          height: theme.spacing(40.3),
          width: theme.spacing(23.8),
          right: theme.spacing(2.5),
          top: -theme.spacing(12),
          [theme.maxMQ.md]: {
            right: -theme.spacing(5.8),
          },
          position: "absolute",
        })}
      />
    </StatBlock>
  );
};

export default LatestRelease;
