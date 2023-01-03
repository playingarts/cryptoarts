import { NextPage } from "next";
import BlockTitle from "../components/BlockTitle";
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
        <ComposedMainHero
          css={(theme) => [
            {
              zIndex: 3,
              position: "relative",
              width: "max-content",
              transform: "rotate(-15deg)",
              top: theme.spacing(-30),
              left: "20%",
              [theme.maxMQ.sm]: {
                "--width": `${theme.spacing(14)}px !important`,
                "--height": `${theme.spacing(19.6)}px !important`,
              },
              [theme.mq.xsm]: {
                left: "57%",
              },
              [theme.mq.sm]: {
                left: "67%",
                top: theme.spacing(-35),
                "--width": `${theme.spacing(25)}px !important`,
                "--height": `${theme.spacing(35)}px !important`,
              },
              [theme.mq.md]:{
                left: "57%",

              }
            },
          ]}
        />
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
      {/* <Grid>
          <div css={{ gridColumn: "span 6" }}>
            <Text component="h1" css={{ margin: 0 }}>
              Collective Art Project
            </Text>
            <Text variant="body3" css={{ margin: 0 }}>
              For creative people who are into illustrations, playing cards,
              NFTs and sometimes magic.
            </Text>
          </div>
        </Grid> */}
      {/* </Layout> */}

      <Layout
        css={(theme) => ({
          background: theme.colors.page_bg_light_gray,
          paddingTop: theme.spacing(14),
          paddingBottom: theme.spacing(12),
          [theme.maxMQ.sm]: {
            paddingBottom: theme.spacing(6),
            paddingTop: theme.spacing(6),
            position: "relative",
          },
        })}
        data-id="block-about"
      >
        <Grid short={true}>
          <Text component="h2" css={{ margin: 0, gridColumn: "1 / -1" }}>
            About
          </Text>
          <div css={{ margin: 0, gridColumn: "span 7" }}>
            <Text variant="body3">
              Playing Arts is a global art initiative that brings together renowned artists from around the world to showcase their unique perspectives and artistic styles through the medium of playing cards. The result is a diverse and captivating collection of artwork that celebrates the endless possibilities that can be explored through the simple form of a playing card.
            </Text>
            <div
              css={(theme) => [
                {
                  marginTop: theme.spacing(5),
                  display: "flex",
                  flexWrap: "wrap",
                  gap: theme.spacing(3),
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
                  <Line
                    vertical={true}
                    spacing={0}
                    css={(theme) => [
                      { margin: 0, marginRight: theme.spacing(2) },
                    ]}
                  />
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

      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(10),
          paddingBottom: theme.spacing(10),
          background: theme.colors.text_title_light,
          [theme.maxMQ.sm]: {
            background: theme.colors.white,
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
          },
        })}
        notTruncatable={true}
      >
        <div
          css={[
            {
              overflow: "hidden",

              // margin: "0 auto",
              // maxWidth: theme.spacing(34),
              // width: "100%",
            },
          ]}
        >
          <BlockTitle variant="h3" title="Browse Collection" />
          <BrowseCollection
            css={(theme) => ({
              marginTop: theme.spacing(2),
            })}
          />
        </div>
      </Layout>

      <ComposedCardOfTheDay
        css={(theme) => ({
          background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, #111111 100%)`,
          color: theme.colors.page_bg_light,
        })}
      />
      
      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
          background: theme.colors.white,
        })}
      >
        <Grid
          css={(theme) => ({
            alignItems: "flex-start",
            gap: theme.spacing(3),
            [theme.maxMQ.md]: {
              gap: theme.spacing(2),
              [theme.mq.sm]: {
                gridTemplateColumns: `repeat(6, ${theme.spacing(7.5)}px)`,
              },
            },
          })}
        >
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
          <Podcast title="PODCAST" />
          <StatBlock
            css={(theme) => ({
              background: "#5865F2",
              color: theme.colors.text_title_light,
              position: "relative",
              overflow: "hidden",
              gridColumn: "-1/ 1",
              [theme.mq.sm]: {
                gridColumn: "span 3",
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
                css={{ margin: 0 }}
              >
                Discord
              </Text>
              {width >= breakpoints.sm && (
                <Text
                  css={{
                    marginTop: 10,
                  }}
                >
                  Join the conversation
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
              gridColumn: "-1/ 1",
              [theme.mq.sm]: {
                gridColumn: "span 3",
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
                css={{ margin: 0 }}
              >
                Twitter
              </Text>
              {width >= breakpoints.sm && (
                <Text
                  css={{
                    marginTop: 10,
                  }}
                >
                  Follow our latest news
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
