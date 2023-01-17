import { FC, memo } from "react";
import { useOwnedAssets } from "../../../hooks/opensea";
import Grid from "../../../components/Grid";
import Button from "../../Button";
import Link from "../../Link";
import StatBlock from "../../StatBlock";
import Text from "../../Text";
import Layout from "../../../components/Layout";

const GamePromo: FC = () => {
  const ownedAssets = useOwnedAssets("crypto");

  return ownedAssets ? (
    <Layout
      css={(theme) => ({
        background: theme.colors.page_bg_dark,
        color: theme.colors.text_title_light,
        gridColumn: "1 / -1",
        position: "relative",
        backgroundImage:
          "url(https://s3.amazonaws.com/img.playingarts.com/crypto/game/cards_bg.jpg)",
        backgroundSize: "2200px",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPositionX: "center",
        backgroundPositionY: "top",
        borderRadius: "0",

        [theme.maxMQ.md]: {
          [theme.mq.sm]: {
            paddingRight: theme.spacing(19.5),
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(10),
            // transform: "scaleX(-1)",
          },
        },
        [theme.maxMQ.sm]: {
          paddingTop: theme.spacing(5),
          paddingBottom: theme.spacing(5),
        },
        [theme.mq.md]: {
          paddingTop: theme.spacing(15),
          paddingBottom: theme.spacing(15),
          paddingLeft: theme.spacing(10.5),
          paddingRight: theme.spacing(10.5),
        },
        [theme.maxMQ.xsm]: {
          backgroundSize: "1200px",
          backgroundPositionX: "-300px",
          backgroundPositionY: "center",
        },
      })}
    >
      <Grid short={true}>
        <StatBlock
          // lessTitleMarginMobile={true}
          title="GAME"
          css={(theme) => ({
            [theme.maxMQ.md]: {
              padding: "30px 0",
              gridColumn: "2 / 8",
            },
            
            [theme.mq.md]: {
              padding: "0",
              gridColumn: "1 / -1",
            },
            
            [theme.maxMQ.sm]: {
              gridColumn: "1 / 4",
              padding: "50px 25px",
            },
            [theme.maxMQ.xsm]: {
              gridColumn: "1 / 7",
            },

          })}
        >
          <Text component="h2" css={{ margin: 0 }}>
            Card Battle{" "}
            <span
              css={(theme) => [
                {
                  border: "1px solid",
                  borderColor: theme.colors.text_subtitle_light,
                  color: theme.colors.text_subtitle_light,
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
            css={(theme) => [{ marginTop: theme.spacing(3) }]}
            href="https://play2.playingarts.com/"
            component={Link}
          >
            Play now
          </Button>
        </StatBlock>
      </Grid>
    </Layout>
  ) : null;
};

export default memo(GamePromo);
