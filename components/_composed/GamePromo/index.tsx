import { FC } from "react";
import { useOwnedAssets } from "../../../hooks/opensea";
import Button from "../../Button";
import Link from "../../Link";
import StatBlock from "../../StatBlock";
import Text from "../../Text";

const GamePromo: FC = () => {
  const ownedAssets = useOwnedAssets("crypto");

  return ownedAssets.length !== 0 ? (
    <StatBlock
      lessTitleMarginMobile={true}
      css={(theme) => ({
        background: theme.colors.page_bg_dark,
        color: theme.colors.text_title_light,
        // gridColumn: "span 6",
        gridColumn: "1 / -1",
        position: "relative",
        backgroundImage:
          "url(https://s3.amazonaws.com/img.playingarts.com/www/static/cards_bg.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
        [theme.maxMQ.md]: {
          [theme.mq.sm]: {
            // backgroundPositionY: "100%",
            paddingRight: theme.spacing(19.5),
            // transform: "scaleX(-1)",
            backgroundPositionX: theme.spacing(20),
          },
        },
        [theme.maxMQ.sm]: {
          paddingTop: theme.spacing(19.5),
          backgroundSize: "57% auto",
        },
        [theme.maxMQ.xsm]: {
          backgroundSize: "auto 210px",
        },
        [theme.mq.md]: {
          paddingTop: theme.spacing(7.7),
          paddingBottom: theme.spacing(7.7),
          paddingLeft: theme.spacing(10.5),
          paddingRight: theme.spacing(10.5),
        },
      })}
      title="GAME"
    >
      <Text component="h2" css={{ margin: 0 }}>
        Card Battle{" "}
        <span
          css={(theme) => [
            {
              border: "1px solid currentColor",
              borderRadius: 30,
              padding: `${theme.spacing(0.2)}px ${theme.spacing(1)}px`,
              verticalAlign: "middle",
              letterSpacing: 0,
              textTransform: "capitalize",
              fontWeight: 500,
              fontSize: 14,
              fontFamily: "Work Sans, sans-serif",
              [theme.maxMQ.sm]: {
                fontSize: 12,
                lineHeight: 1.5,
              },
            },
          ]}
        >
          Beta
        </span>
      </Text>
      <Text
        variant="body2"
        css={(theme) => [
          {
            margin: 0,
            color: theme.colors.text_subtitle_light,
            marginTop: theme.spacing(1),
            maxWidth: theme.spacing(49.5),
          },
        ]}
      >
        Go head to head with opponents in turn-based playing card battle!
      </Text>
      <Button
        css={(theme) => [{ marginTop: theme.spacing(2) }]}
        href="https://play2.playingarts.com/"
        component={Link}
      >
        Play now
      </Button>
    </StatBlock>
  ) : null;
};

export default GamePromo;
