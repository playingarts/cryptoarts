import { FC, memo } from "react";
import Grid from "../../../components/Grid";
import Layout from "../../../components/Layout";
import Button from "../../Button";
import Line from "../../Line";
import Link from "../../Link";
import StatBlock from "../../StatBlock";
import Text from "../../Text";
import { mockEmptyCard } from "../../../mocks/card";
import Card from "../../Card";

const GamePromo: FC = () => (
  <Layout
    css={(theme) => ({
      background: theme.colors.page_bg_dark,
      color: theme.colors.text_title_light,
      gridColumn: "1 / -1",
      position: "relative",
      // backgroundImage:
      //   "url(https://s3.amazonaws.com/img.playingarts.com/www/static/game_background.jpg?3)",
      backgroundColor: theme.colors.dark_gray,
      backgroundSize: "2000px",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPositionX: "center",
      overflow: "clip",
      backgroundPositionY: "center",

      [theme.maxMQ.md]: {
        backgroundSize: "1900px",
        backgroundPositionX: "-380px",
        [theme.mq.sm]: {
          paddingTop: theme.spacing(10),
          paddingBottom: theme.spacing(10),
          paddingRight: theme.spacing(19.5),
          // transform: "scaleX(-1)",
        },
      },
      [theme.maxMQ.sm]: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        backgroundAttachment: "inherit",
      },
      [theme.mq.md]: {
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(15),
        paddingLeft: theme.spacing(10.5),
        paddingRight: theme.spacing(10.5),
      },
      [theme.maxMQ.xsm]: {
        backgroundSize: "900px",
        backgroundPositionX: "-370px",
        backgroundPositionY: "-140px",
        paddingTop: theme.spacing(17),
        paddingBottom: theme.spacing(0),
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
            gridColumn: "2 / 7",
          },
          [theme.mq.md]: {
            padding: "0",
            gridColumn: "1 / 6",
          },
          [theme.maxMQ.sm]: {
            gridColumn: "1 / 5",
            padding: "50px 20px",
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
            },
          ]}
        >
          Go head to head with opponents in turn-based playing card battle!
        </Text>
        <Line
          palette="dark"
          spacing={0}
          css={(theme) => ({
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            [theme.maxMQ.sm]: {
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(2),
            },
          })}
        />
        <Button
          css={(theme) => ({
            background: theme.colors.eth,
            color: theme.colors.page_bg_dark,
            animation: "gradient 5s ease infinite",
            backgroundSize: "400% 100%",
          })}
          href="https://play2.playingarts.com/"
          component={Link}
        >
          Play now
        </Button>
      </StatBlock>
      <div
        css={(theme) => [
          {
            position: "absolute",
            height: "300vh",
            [theme.maxMQ.xsm]: {
              top: -60,
              left: 78,
            },
            [theme.mq.xsm]: {
              left: "60%",
              top: "-100vh",
              [theme.maxMQ.sm]: {
                left: "65%",
              },
            },
            [theme.mq.md]: {
              left: "51%",
            },
            zIndex: -1,
            right: 0,
          },
        ]}
      >
        <div
          css={(theme) => [
            {
              [theme.mq.xsm]: {
                transformOrigin: "center",
                transform: "scale(0.5)",
                position: "absolute",
                inset: 0,
              },
            },
          ]}
        >
          <div
            css={(theme) => [
              {
                [theme.mq.xsm]: {
                  transformOrigin: "center",
                  transform: "scale(2)",
                  position: "sticky",
                  top: 0,
                },
              },
            ]}
          >
            <div
              css={(theme) => ({
                transformOrigin: "top left",
                transform: "skew(19deg, -11.5deg) ",
                gap: 10,
                position: "relative",
                display: "grid",
                [theme.mq.xsm]: {
                  top: 0,
                  left: -7,
                  "--width": `${theme.spacing(23)}px !important`,
                  "--height": `${theme.spacing(29.6)}px !important`,
                },
                [theme.maxMQ.xsm]: {
                  gap: 5,
                  "--width": `${theme.spacing(10.5)}px !important`,
                  "--height": `${theme.spacing(13)}px !important`,
                },
                gridTemplateColumns: "auto auto auto",
                width: "fit-content",
              })}
            >
              <div
                css={(theme) => [
                  {
                    position: "relative",
                    borderWidth: 4,

                    borderRadius: theme.spacing(1.8),
                    [theme.maxMQ.xsm]: {
                      borderWidth: 2,
                      borderRadius: theme.spacing(1),
                    },
                    borderStyle: "solid",
                    borderColor: theme.colors.green,
                  },
                ]}
              >
                <Card
                  noInfo={true}
                  customSize={true}
                  card={{
                    ...mockEmptyCard,
                    img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/9-c-y6x3v47U.jpg",
                  }}
                />
                <img
                  src="https://i.seadn.io/gae/Jp1VMHkSAJr4xg7tUYYFdPy5gNXDMEZjMEZBIYFhKuWlbNZrR3wmud5UQPVdtTxK1nxdsVryH7hCwHmNEpOhih7sk-H3UhfRTSkE5w?auto=format&dpr=1&w=1000"
                  css={(theme) => [
                    {
                      transform: "skew(-19deg, 11.5deg) translateX(55%)",
                      backgroundSize: "contain",
                      position: "absolute",
                      top: 170,
                      left: -70,
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      border: "4px solid " + theme.colors.green,
                      background: theme.colors.green,
                      [theme.maxMQ.xsm]: {
                        top: 75,
                        left: -35,
                        width: 32,
                        height: 32,
                        borderWidth: 2,
                      },
                    },
                  ]}
                />
              </div>

              <div
                css={(theme) => [
                  {
                    borderWidth: 4,

                    borderRadius: theme.spacing(1.8),
                    [theme.maxMQ.xsm]: {
                      borderWidth: 2,
                      borderRadius: theme.spacing(1),
                    },
                    borderStyle: "solid",
                    borderColor: theme.colors.cadillac_pink,
                  },
                ]}
              >
                <Card
                  noInfo={true}
                  customSize={true}
                  card={{
                    ...mockEmptyCard,
                    img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/j-s-3NE4b2t4.jpg",
                  }}
                />
              </div>

              <div
                css={(theme) => [
                  {
                    borderRadius: theme.spacing(1.8),
                    [theme.maxMQ.xsm]: {
                      borderRadius: theme.spacing(1),
                    },

                    borderStyle: "dashed",
                    borderColor: "grey",
                    borderWidth: 2,
                  },
                ]}
              >
                <Card
                  noInfo={true}
                  customSize={true}
                  card={{
                    ...mockEmptyCard,
                    background: "transparent",
                  }}
                />
              </div>
              <div
                css={(theme) => [
                  {
                    position: "absolute",
                    transform: "rotate(4deg)",
                    zIndex: -1,
                    left: 0,
                    bottom: 0,
                    borderWidth: 4,

                    borderRadius: theme.spacing(1.8),
                    [theme.maxMQ.xsm]: {
                      borderWidth: 2,
                      borderRadius: theme.spacing(1),
                    },
                    borderStyle: "solid",
                    borderColor: theme.colors.darkTurqoise,
                  },
                ]}
              >
                <Card
                  noInfo={true}
                  customSize={true}
                  card={{
                    ...mockEmptyCard,
                    img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-d-6Z3H92Kv.jpg",
                  }}
                />
              </div>
              <div
                css={(theme) => [
                  {
                    borderWidth: 4,

                    borderRadius: theme.spacing(1.8),
                    [theme.maxMQ.xsm]: {
                      borderWidth: 2,
                      borderRadius: theme.spacing(1),
                    },
                    borderStyle: "solid",
                    borderColor: theme.colors.cadillac_pink,
                    position: "relative",
                  },
                ]}
              >
                <Card
                  noInfo={true}
                  customSize={true}
                  card={{
                    ...mockEmptyCard,
                    img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/8-d-6Z3H92Kv.jpg",
                  }}
                />
                <img
                  src="https://i.seadn.io/gcs/files/7698f508dcb916208e253c7d677dfa9e.png?auto=format&dpr=1&w=1000"
                  css={(theme) => [
                    {
                      transform: "skew(-19deg, 11.5deg) translateX(55%)",
                      backgroundSize: "contain",
                      position: "absolute",
                      top: 170,
                      left: -70,
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      border: "4px solid " + theme.colors.cadillac_pink,
                      background: theme.colors.cadillac_pink,
                      [theme.maxMQ.xsm]: {
                        top: 75,
                        left: -35,
                        width: 32,
                        height: 32,
                        borderWidth: 2,
                      },
                    },
                  ]}
                />
              </div>
              <div
                css={(theme) => [
                  {
                    borderRadius: theme.spacing(1.8),
                    [theme.maxMQ.xsm]: {
                      borderRadius: theme.spacing(1),
                    },

                    borderStyle: "dashed",
                    borderColor: "grey",
                    borderWidth: 2,
                  },
                ]}
              >
                <Card
                  noInfo={true}
                  customSize={true}
                  card={{
                    ...mockEmptyCard,
                    background: "transparent",
                  }}
                />
              </div>
              <div
                css={(theme) => [
                  {
                    borderWidth: 4,

                    borderRadius: theme.spacing(1.8),
                    [theme.maxMQ.xsm]: {
                      borderWidth: 2,
                      borderRadius: theme.spacing(1),
                    },
                    borderStyle: "solid",
                    borderColor: theme.colors.darkTurqoise,
                  },
                ]}
              >
                <Card
                  noInfo={true}
                  customSize={true}
                  card={{
                    ...mockEmptyCard,
                    img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/5-d-2Yb48c3D.jpg",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          css={(theme) => [
            {
              [theme.mq.xsm]: {
                transformOrigin: "center",
                transform: "scale(0.6)",
                position: "absolute",
                inset: 0,
              },
            },
          ]}
        >
          <div
            css={(theme) => [
              {
                [theme.mq.xsm]: {
                  transformOrigin: "center",
                  transform: "scale(1.6)",
                  position: "sticky",
                  top: 0,
                },
              },
            ]}
          >
            <div
              css={(theme) => [
                {
                  position: "absolute",
                  transformOrigin: "center",
                  // transform: "scale(0.5)",
                  transform: "skew(19deg, -11.5deg)",
                  [theme.mq.xsm]: {
                    left: 250,
                    // top: 83,
                    // left: "67%",
                    // top: theme.spacing(-33),
                    "--width": `${theme.spacing(24.5)}px !important`,
                    "--height": `${theme.spacing(32)}px !important`,
                  },
                  [theme.maxMQ.xsm]: {
                    left: 125,
                    top: 60,
                    "--width": `${theme.spacing(11.5)}px !important`,
                    "--height": `${theme.spacing(15)}px !important`,
                  },
                },
              ]}
            >
              <div
                css={{
                  position: "relative",
                }}
              >
                <div
                  css={(theme) => [
                    {
                      borderWidth: 4,

                      borderRadius: theme.spacing(1.8),
                      filter: "drop-shadow(-30px 40px 0px #00000044)",
                      [theme.maxMQ.xsm]: {
                        filter: "drop-shadow(-20px 20px 0px #00000044)",
                        borderWidth: 2,
                        borderRadius: theme.spacing(1),
                      },
                      borderStyle: "solid",
                      borderColor: theme.colors.orangeRed,
                    },
                  ]}
                >
                  <Card
                    css={[
                      {
                        video: {
                          objectFit: "fill",
                        },
                      },
                    ]}
                    noInfo={true}
                    customSize={true}
                    animated={true}
                    card={{
                      ...mockEmptyCard,
                      img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-d-Mk33LV47.jpg",

                      video:
                        "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-d-Mk33LV47.mp4",
                      background: "black",
                    }}
                  />
                </div>
                <img
                  src="https://i.seadn.io/gcs/files/736151734c6d7edff4086a76676de927.png?auto=format&dpr=1&w=1000"
                  css={(theme) => [
                    {
                      transform: "skew(-19deg, 11.5deg) translateX(55%)",
                      backgroundSize: "contain",
                      position: "absolute",
                      top: 170,
                      right: 0,
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      border: "4px solid " + theme.colors.orangeRed,
                      background: theme.colors.orangeRed,
                      [theme.maxMQ.xsm]: {
                        top: 75,
                        right: 0,
                        width: 32,
                        height: 32,
                        borderWidth: 2,
                      },
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  </Layout>
);

export default memo(GamePromo);
