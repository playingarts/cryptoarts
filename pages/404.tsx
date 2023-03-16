import { NextPage } from "next";
import Card from "../components/Card";
import Grid from "../components/Grid";
import Layout from "../components/Layout";
import Line from "../components/Line";
import Text from "../components/Text";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import { withApollo } from "../source/apollo";

const card = ({
  _id: "card01",
  video: "",
  img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/215.jpg",
  value: "",
  suit: "",
  info: "",
  deck: "",
  artist: "",
} as unknown) as GQL.Card;
const ErrorPage: NextPage = () => {
  return (
    <ComposedGlobalLayout noNav={true}>
      <Layout
        css={(theme) => ({
          background: theme.colors.page_bg_light,
          borderRadius: "0 0 50px 50px",
          paddingTop: theme.spacing(18),
          height: "100vh",
          zIndex: 1,
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(12.5),
            paddingBottom: theme.spacing(0),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
          paddingBottom: theme.spacing(4),
        })}
      >
        <Grid
          short={true}
          css={(theme) => ({
            rowGap: theme.spacing(2),
            [theme.maxMQ.sm]: { rowGap: theme.spacing(1) },
          })}
        >
          <div
            css={{
              position: "absolute",
              width: "100%",
              height: 0,
              left: 0,
            }}
          >
            <div
              css={(theme) => [
                {
                  width: "100%",
                  maxWidth: theme.spacing(142),
                  margin: "auto",
                  position: "relative",
                },
              ]}
            >
              <Card
                interactive={true}
                noInfo={true}
                card={card}
                animated={!!card.video}
                filter={true}
                css={(theme) => [
                  //   index % 2 === 0

                  {
                    zIndex: -1,
                    position: "absolute",
                    // top: theme.spacing(5),
                    transform: "rotate(15deg)",
                    [theme.maxMQ.xsm]: {
                      right: theme.spacing(4),
                      "--width": `${theme.spacing(11.4)}px !important`,
                      "--height": `${theme.spacing(16.1)}px !important`,
                    },
                    "--width": `${theme.spacing(25)}px !important`,
                    "--height": `${theme.spacing(35.2)}px !important`,
                    right: theme.spacing(7),
                    [theme.mq.sm]: {
                      right: theme.spacing(21),
                    },
                  },
                  // : {
                  //     [theme.maxMQ.md]: {
                  //       "--width": `${theme.spacing(30)}px !important`,
                  //       "--height": `${theme.spacing(42.2)}px !important`,
                  //     },
                  //     [theme.maxMQ.sm]: {
                  //       "--width": `${theme.spacing(13.6)}px !important`,
                  //       "--height": `${theme.spacing(19.1)}px !important`,
                  //     },
                  //   },
                ]}
              />
            </div>
          </div>
          <Text
            component="h2"
            css={(theme) => [
              {
                margin: 0,
                gridColumn: "1 / 6",
                display: "flex",
                flexWrap: "wrap",

                [theme.maxMQ.sm]: {
                  gridColumn: "1 / 3",
                },
              },
            ]}
          >
            404
          </Text>

          <Line
            spacing={0}
            css={(theme) => [
              {
                width: "100%",
                gridColumn: "1 / 4",
                [theme.mq.sm]: {
                  gridColumn: "1 / 5",
                },
              },
            ]}
          />
          <Text variant="body2" css={{ margin: 0, gridColumn: "1/-1" }}>
            Page not found
          </Text>
        </Grid>
      </Layout>
    </ComposedGlobalLayout>
  );
};

export default withApollo(ErrorPage, { ssr: false });
