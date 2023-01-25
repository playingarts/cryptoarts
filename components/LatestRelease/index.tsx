import { useMetaMask } from "metamask-react";
import { FC } from "react";
import { breakpoints } from "../../source/enums";
import Ether from "../Icons/Ether";
import MetamaskButton from "../MetamaskButton";
import { useSize } from "../SizeProvider";
import StatBlock, { Props as StatBlockProps } from "../StatBlock";
import Text from "../Text";

// interface Props extends Omit<StatBlockProps, "title" | "action"> {
//   productId: string;
// }

const LatestRelease: FC<Omit<StatBlockProps, "title" | "action">> = ({
  ...props
}) => {
  const { status } = useMetaMask();

  const { width } = useSize();

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
          backgroundSize: "100% cover",
          // paddingBottom: theme.spacing(27.7),
        },
        [theme.maxMQ.xsm]: {
          backgroundPositionX: "center",
          backgroundPositionY: "bottom",
          backgroundSize: "150%",
        },
      })}
      // {...(status === "connected" && {
      //   action: (
      //     <AddToBagButton
      //       Icon={Bag}
      //       productId={productId}
      //       css={(theme) => [{ [theme.maxMQ.sm]: { display: "none" } }]}
      //     />
      //   ),
      // })}
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
        <div
          css={{
            flexGrow: 1,
          }}
        >
          <Text
            component="h2"
            css={(theme) => [
              {
                margin: 0,
                [theme.mq.sm]: {
                  [theme.maxMQ.md]: {
                    fontSize: 45,
                  },
                },
              },
            ]}
          >
            Crypto Edition
          </Text>
          <Text
            variant="body2"
            css={(theme) => ({
              opacity: 0.5,
              marginTop: theme.spacing(1),
              [theme.mq.sm]: {
                marginBottom: theme.spacing(13.5),
              },
              // [theme.maxMQ.sm]: {
              //   display: "none",
              // },
            })}
          >
            This deck is only available for Playing Arts Crypto Edition (PACE)
            NFT holders.
          </Text>
          {width >= breakpoints.sm && status !== "connected" && (
            <MetamaskButton
              textColor="white"
              backgroundColor="orange"
              notConnected="Connect"
              unavailable="Install"
              noIcon={width < breakpoints.sm}
              css={(theme) => [
                {
                  background: theme.colors.eth,
                  color: theme.colors.page_bg_dark,
                  animation: "gradient 5s ease infinite",
                  backgroundSize: "400% 100%",
                }, 
                {
                  [theme.maxMQ.sm]: { width: "100%", justifyContent: "center" },
                },
              ]}
            >
              <span>connect wallet</span>
            </MetamaskButton>
          )}
        </div>
        {/* {status === "connected" && (
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
          </div>
        )} */}
      </div>

      <Ether
        css={(theme) => ({
          color: theme.colors.white,
          height: theme.spacing(33.9),
          width: theme.spacing(20),
          right: theme.spacing(2.5),
          top: -theme.spacing(10),
          [theme.mq.md]: {
            right: -theme.spacing(-4),
          },
          [theme.maxMQ.xsm]: {
            right: -theme.spacing(5),
          },
          position: "absolute",
        })}
      />
    </StatBlock>
  );
};

export default LatestRelease;
