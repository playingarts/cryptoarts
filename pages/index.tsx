import { NextPage } from "next";
import Button from "../components/Button";
import Grid from "../components/Grid";
import Layout from "../components/Layout";
import Line from "../components/Line";
import Link from "../components/Link";
import { useSize } from "../components/SizeProvider";
import Text from "../components/Text";
import BrowseCollection from "../components/_composed/BrowseCollection";
import ComposedCardOfTheDay from "../components/_composed/CardOfTheDay";
import ComposedMain from "../components/_composed/ComposedMain";
import ComposedMainHero from "../components/_composed/ComposedMainHero";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import PodcastAndSocials from "../components/_composed/PodcastAndSocials";
import { RandomCardsQueryWithoutDeck } from "../hooks/card";
import { DecksQuery } from "../hooks/deck";
import { initApolloClient, withApollo } from "../source/apollo";
import { breakpoints } from "../source/enums";
import { connect } from "../source/mongoose";
import BlockTitle from "../components/BlockTitle";

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
        subtitle={
          <>
            For those who are into Art,
            <br /> Playing Cards, and sometimes Magic.
          </>
        }
        css={(theme) => [
          {
            color: theme.colors.dark_gray,
            background: theme.colors.page_bg_light,
          },
        ]}
      >
        <Button
          component={Link}
          shallow={true}
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
              Playing Arts brings together artists from around the world,
              transforming traditional playing cards into a diverse gallery of
              creative expression.
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
            <BlockTitle
              title="Discover the collection"
              subTitleText="Every deck features 55 playing cards—55 unique artworks, each created by a different artist."
              css={[{ gridColumn: "1/-1" }]}
            />
            {/* <Text
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
              Discover the collection
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
            /> */}
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

      {/* Game promo Block

      <GamePromo /> */}

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
      <PodcastAndSocials
        css={(theme) => [
          {
            background: theme.colors.white,
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
          },
        ]}
      />
    </ComposedGlobalLayout>
  );
};

export const getStaticProps = async () => {
  await connect();

  const client = initApolloClient(undefined, {
    schema: (await require("../source/graphql/schema")).schema,
  });

  await client.query({
    query: DecksQuery,
  });

  await client.query({
    query: RandomCardsQueryWithoutDeck,
  });

  return {
    props: {
      cache: client.cache.extract(),
    },
  };
};

export default withApollo(Home, { ssr: false });
