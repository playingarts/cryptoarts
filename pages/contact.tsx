import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Grid from "../components/Grid";
import Layout from "../components/Layout";
import Line from "../components/Line";
import Text from "../components/Text";
import ComposedFaq from "../components/_composed/Faq";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import { withApollo } from "../source/apollo";

const Page: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact - Playing Arts</title>
      </Head>
      <ComposedGlobalLayout>
        <Layout
          css={(theme) => [
            {
              paddingTop: theme.spacing(25),
              paddingBottom: theme.spacing(10),
              background: theme.colors.page_bg_light,
              borderRadius: `0 0 ${theme.spacing(5)}px ${theme.spacing(5)}px`,

              [theme.maxMQ.sm]: {
                paddingTop: theme.spacing(17.5),
                paddingBottom: theme.spacing(5),
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
                borderRadius: `0 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
              },
            },
          ]}
          notTruncatable={true}
        >
          <Grid short={true}>
            <div css={{ gridColumn: "1 / -1" }}>
              <Text component="h2" css={{ margin: 0 }}>
                Contact
              </Text>
              <Line
                spacing={2}
                css={(theme) => [
                  {
                    [theme.maxMQ.sm]: {
                      marginBottom: theme.spacing(1),
                      marginTop: theme.spacing(1),
                    },
                  },
                ]}
              />
            </div>
            <div
              css={(theme) => [
                {
                  gridColumn: "span 8",

                  [theme.maxMQ.sm]: {
                    gridColumn: "span 6",
                  },
                },
              ]}
            >
              <Text variant="body3">
                You got questions concerning your order or a general matter?
                <br />
                Please reach out to us: info@playingarts.com
              </Text>
            </div>
            <div
              css={(theme) => [
                {
                  gridColumn: "span 3",

                  [theme.maxMQ.sm]: {
                    gridColumn: "span 6",
                  },
                },
              ]}
            >
              <Text
                component="h5"
                css={(theme) => [
                  {
                    color: theme.colors.text_subtitle_dark,
                    marginBottom: "0px",
                  },
                ]}
              >
                Company
              </Text>
              <Text
                variant="body2"
                css={(theme) => [
                  {
                    color: theme.colors.text_subtitle_dark,
                  },
                ]}
              >
                Digital Abstracts, S.L.
                <br />
                VAT No. B66760802
                <br />
                C/Alaba 60, 08005
                <br />
                Barcelona, Spain
              </Text>
            </div>
            <div
              css={(theme) => [
                {
                  gridColumn: "span 3",

                  [theme.maxMQ.sm]: {
                    gridColumn: "span 6",
                  },
                },
              ]}
            >
              <Text
                component="h5"
                css={(theme) => [
                  {
                    color: theme.colors.text_subtitle_dark,
                    marginBottom: "0px",
                  },
                ]}
              >
                Returns
              </Text>
              <Text
                variant="body2"
                css={(theme) => [
                  {
                    color: theme.colors.text_subtitle_dark,
                  },
                ]}
              >
                Digital Abstracts, S.L.
                <br />
                AK-42, LV-1063
                <br />
                Riga, Latvia
              </Text>
            </div>
          </Grid>
        </Layout>
        <Layout
          css={(theme) => ({
            background: theme.colors.page_bg_light_gray,
            [theme.mq.sm]: {
              zIndex: 1,
              borderRadius: "0px 0px 50px 50px",
            },
          })}
        >
          <Grid short={true}>
            <ComposedFaq
              css={(theme) => ({
                [theme.maxMQ.sm]: {
                  marginTop: theme.spacing(5),
                  marginBottom: theme.spacing(2),
                },
                marginTop: theme.spacing(10),
                marginBottom: theme.spacing(10),
                gridColumn: "1 / -1",
              })}
            />
          </Grid>
        </Layout>
      </ComposedGlobalLayout>
    </Fragment>
  );
};

export default withApollo(Page);
