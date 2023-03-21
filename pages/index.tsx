import { NextPage } from "next";
import Button from "../components/Button";
import Grid from "../components/Grid";
import Discord from "../components/Icons/Discord";
import Twitter from "../components/Icons/Twitter";
import Layout from "../components/Layout";
import Line from "../components/Line";
import Link from "../components/Link";
import { useSize } from "../components/SizeProvider";
import StatBlock from "../components/StatBlock";
import Text from "../components/Text";
import BrowseCollection from "../components/_composed/BrowseCollection";
import ComposedCardOfTheDay from "../components/_composed/CardOfTheDay";
import ComposedMain from "../components/_composed/ComposedMain";
import ComposedMainHero from "../components/_composed/ComposedMainHero";
import GamePromo from "../components/_composed/GamePromo";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import Podcast from "../components/_composed/Podcast";
import { withApollo } from "../source/apollo";
import { socialLinks } from "../source/consts";
import { breakpoints } from "../source/enums";

const Home: NextPage = () => {
  const { width } = useSize();

  return (
    <ComposedGlobalLayout extended={true} scrollArrow="block-about">
      <div
        css={(theme) => [
          {
            position: "absolute",
            height: theme.spacing(300),
            overflowX: "hidden",
            width: "100%",
            top: 0,
            left: 0,
          },
        ]}
      >
        {/* Home cards block start  */}
        <ComposedMainHero
          css={(theme) => [
            {
              zIndex: 3,
              position: "relative",
              width: "max-content",
              transform: "rotate(-15deg)",
              top: theme.spacing(-31),
              left: "0",
              [theme.maxMQ.sm]: {
                "--width": `${theme.spacing(14)}px !important`,
                "--height": `${theme.spacing(19.6)}px !important`,
              },
              [theme.mq.xsm]: {
                left: "47%",
              },
              [theme.mq.sm]: {
                left: "67%",
                top: theme.spacing(-33),
                "--width": `${theme.spacing(25)}px !important`,
                "--height": `${theme.spacing(35)}px !important`,
              },
              [theme.mq.md]: {
                left: "57%",
              },
            },
          ]}
        />
        {/* Home cards block end  */}
      </div>
      {/* <Layout
        css={(theme) => ({
          // background: theme.colors.dark_gray,
          color: theme.colors.dark_gray,
          overflow: "hidden",
          paddingTop: theme.spacing(26),
          paddingBottom: theme.spacing(6.5),
          // backgroundImage:
          //   "url(https://s3.amazonaws.com/img.playingarts.com/www/static/home_bg.jpg)",
          // backgroundSize: "cover",
          background: theme.colors.page_bg_light,
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(34),
            // paddingTop: theme.spacing(22.8),
            paddingBottom: theme.spacing(4),
          },
        })}
      > */}
      <ComposedMain
        title="Collective Art Project"
        subtitle="For creative people who are into illustrations, playing cards, NFTs and sometimes magic."
        css={(theme) => [
          {
            color: theme.colors.dark_gray,
            background: theme.colors.page_bg_light,
          },
        ]}
      >
        <Button
          component={Link}
          href={{
            query: {
              scrollIntoView: "[data-id='block-about']",
              scrollIntoViewBehavior: "smooth",
            },
          }}
          css={(theme) => ({
            background: theme.colors.text_title_dark,
            color: theme.colors.white,
            width: "fit-content",
            [theme.mq.sm]: {
              marginTop: theme.spacing(1),
              transition: theme.transitions.fast("opacity"),
              "&:hover": {
                opacity: 0.8,
              },
            },
          })}
        >
          Learn more
        </Button>
      </ComposedMain>

      {/* About Block */}

      <Layout
        css={(theme) => ({
          background: theme.colors.page_bg_light_gray,
          paddingTop: theme.spacing(12),
          paddingBottom: theme.spacing(12),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            position: "relative",
          },
        })}
        data-id="block-about"
      >
        <Grid short={false}>
          <Text
            component="h2"
            css={{
              margin: 0,
              gridColumn: "1 / -1",
            }}
          >
            About
          </Text>
          <div
            css={(theme) => [
              {
                margin: 0,
                gridColumn: "span 8",

                [theme.maxMQ.md]: {
                  margin: 0,
                  gridColumn: "span 7",
                },
                [theme.maxMQ.sm]: {
                  margin: 0,
                  gridColumn: "span 5",
                },
                [theme.maxMQ.xsm]: {
                  margin: 0,
                  gridColumn: "span 6",
                },
              },
            ]}
          >
            <Text
              variant="body3"
              css={{
                marginTop: 15,
              }}
            >
              Playing Arts is a global art initiative that brings together
              renowned artists from around the world to showcase their artistic
              styles and unique perspectives through the medium of playing
              cards. The result is a diverse and captivating collection of
              artwork that celebrates the endless possibilities that can be
              explored through the simple form of a playing card.
            </Text>
            <div
              css={(theme) => [
                {
                  marginTop: theme.spacing(5),
                  display: "flex",
                  flexWrap: "wrap",
                  gap: theme.spacing(4.5),
                  [theme.mq.sm]: {
                    gap: theme.spacing(3),
                  },
                },
              ]}
            >
              {[
                { title: "11", subtitle: "years" },
                { title: "08", subtitle: "editions" },
                { title: "1109", subtitle: "artists" },
              ].map(({ title, subtitle }) => (
                <div
                  key={title}
                  css={(theme) => [
                    {
                      display: "flex",
                      height: theme.spacing(5),
                      [theme.mq.sm]: {
                        width: theme.spacing(18),
                        height: theme.spacing(7),
                      },
                    },
                  ]}
                >
                  {width >= breakpoints.xsm && (
                    <Line
                      vertical={true}
                      spacing={0}
                      css={(theme) => ({
                        marginLeft: 0,
                        marginRight: theme.spacing(2),
                      })}
                    />
                  )}

                  <div>
                    <Text
                      component="h3"
                      css={(theme) => [
                        { margin: 0, color: theme.colors.text_title_dark },
                      ]}
                    >
                      {title}
                    </Text>
                    <Text
                      component="h6"
                      css={(theme) => [
                        { margin: 0, color: theme.colors.text_subtitle_dark },
                      ]}
                    >
                      {subtitle}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </Layout>

      {/* Browse Collection Block */}

      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(12),
          paddingBottom: theme.spacing(5),
          background: theme.colors.text_title_light,
          [theme.maxMQ.sm]: {
            background: theme.colors.white,
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(5),
          },
          [theme.maxMQ.xsm]: {
            paddingBottom: theme.spacing(1),
          },
        })}
        notTruncatable={true}
      >
        <div
          css={[
            {
              overflow: "hidden",
            },
          ]}
        >
          <Grid short={true}>
            <Text
              component="h3"
              css={(theme) => [
                {
                  margin: 0,
                  gridColumn: "1 / 6",
                  display: "flex",
                  flexWrap: "wrap",
                  [theme.maxMQ.sm]: {
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(2),
                  },
                },
              ]}
            >
              Browse Collection
            </Text>
            <Line
              spacing={3}
              css={(theme) => [
                {
                  [theme.mq.sm]: {
                    gridColumn: "1 / -1",
                    width: "100%",
                  },
                },
              ]}
            />
          </Grid>
          <BrowseCollection
            css={(theme) => ({
              marginTop: theme.spacing(1),
            })}
          />
        </div>
      </Layout>

      <Grid
        css={(theme) => ({
          background: theme.colors.white,
        })}
      >
        <Line
          spacing={0}
          css={(theme) => [
            {
              color: "#666",
              gridColumn: "span 12",
              marginLeft: theme.spacing(1.5),
              marginRight: theme.spacing(1.5),
              [theme.maxMQ.sm]: {
                gridColumn: "span 6",
                marginLeft: theme.spacing(1.5),
                marginRight: theme.spacing(1.5),
              },
              [theme.maxMQ.md]: {
                gridColumn: "span 9",
              },
            },
          ]}
        />
      </Grid>

      {/* Game promo Block */}

      <GamePromo />

      {/* Card of the day Block */}

      <Layout
        css={(theme) => ({
          background: theme.colors.white,
        })}
      >
        <Grid>
          <ComposedCardOfTheDay
            css={(theme) => ({
              gridColumn: "span 12",
              background: theme.colors.page_bg_light_gray,
              color: theme.colors.text_title_dark,
              marginTop: theme.spacing(5),
              borderRadius: theme.spacing(2),

              [theme.maxMQ.md]: {
                gridColumn: "span 9",
              },

              [theme.maxMQ.sm]: {
                borderRadius: theme.spacing(2),
                marginTop: theme.spacing(2.5),
                marginBottom: theme.spacing(2.5),
              },
            })}
          />
        </Grid>
      </Layout>

      {/* Podcast & socials Block */}

      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(3),
          background: theme.colors.white,
        })}
      >
        <Grid
          css={(theme) => ({
            alignItems: "flex-start",
            gap: theme.spacing(3),
            [theme.maxMQ.sm]: {
              gap: theme.spacing(1),
            },
          })}
        >
          <Podcast title="PODCAST" />
          <StatBlock
            css={(theme) => ({
              background: "#5865F2",
              color: theme.colors.text_title_light,
              position: "relative",
              overflow: "hidden",
              gridColumn: "span 3",

              [theme.mq.md]: {
                gridColumn: "span 3",
              },

              [theme.maxMQ.md]: {
                gridColumn: "span 4",
              },

              [theme.maxMQ.sm]: {
                gridColumn: "span 9",
              },
            })}
          >
            <Discord
              css={{
                "& stop:first-child": {
                  stopColor: "currentColor",
                  stopOpacity: 0.5,
                },
                "& stop:last-child": {
                  stopColor: "#5865F2",
                },
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translate(50%, -50%)",
                height: "80%",
                width: "100%",
                fill: "url(#gradient)",
                opacity: 0.5,
              }}
            />
            <div
              css={(theme) => ({
                position: "relative",
                [theme.maxMQ.sm]: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              })}
            >
              <Text
                component={width >= breakpoints.sm ? "h4" : "h3"}
                css={(theme) => ({
                  margin: 0,
                  [theme.maxMQ.sm]: {
                    paddingTop: 7,
                  },
                })}
              >
                Discord
              </Text>
              {width >= breakpoints.sm && (
                <Text
                  css={{
                    marginTop: 10,
                  }}
                >
                  Join our community
                </Text>
              )}
              {socialLinks.discord && (
                <Button
                  Icon={Discord}
                  css={{ marginTop: 0, color: "#5865F2" }}
                  component={Link}
                  href={socialLinks.discord}
                  target="_blank"
                >
                  Join
                </Button>
              )}
            </div>
          </StatBlock>
          <StatBlock
            css={(theme) => ({
              background: "#489BE9",
              color: theme.colors.text_title_light,
              position: "relative",
              overflow: "hidden",
              gridColumn: "span 3",

              [theme.mq.md]: {
                gridColumn: "span 3",
              },

              [theme.maxMQ.md]: {
                gridColumn: "span 4",
              },

              [theme.maxMQ.sm]: {
                gridColumn: "span 9",
              },
            })}
          >
            <Twitter
              css={{
                "& stop:first-child": {
                  stopColor: "currentColor",
                  stopOpacity: 0.5,
                },
                "& stop:last-child": {
                  stopColor: "#489BE9",
                },
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translate(50%, -50%)",
                height: "80%",
                width: "100%",
                fill: "url(#gradient)",
                opacity: 0.5,
              }}
            />
            <div
              css={(theme) => ({
                position: "relative",
                [theme.maxMQ.sm]: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              })}
            >
              <Text
                component={width >= breakpoints.sm ? "h4" : "h3"}
                css={(theme) => ({
                  margin: 0,
                  [theme.maxMQ.sm]: {
                    paddingTop: 7,
                  },
                })}
              >
                Twitter
              </Text>
              {width >= breakpoints.sm && (
                <Text
                  css={{
                    marginTop: 10,
                  }}
                >
                  Latest breaking news
                </Text>
              )}
              {socialLinks.twitter && (
                <Button
                  Icon={Twitter}
                  css={{ color: "#489BE9" }}
                  component={Link}
                  href={socialLinks.twitter}
                  target="_blank"
                >
                  Follow
                </Button>
              )}
            </div>
          </StatBlock>
        </Grid>
      </Layout>
    </ComposedGlobalLayout>
  );
};

export default withApollo(Home);
