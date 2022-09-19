import { NextPage } from "next";
import { Fragment } from "react";
import BlockTitle from "../components/BlockTitle";
import Grid from "../components/Grid";
import Layout from "../components/Layout";
import { useSize } from "../components/SizeProvider";
import Text from "../components/Text";
import ComposedFaq from "../components/_composed/Faq";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import { withApollo } from "../source/apollo";
import { breakpoints } from "../source/enums";

const Page: NextPage = () => {
  const { width } = useSize();

  const action = (
    <div
      css={(theme) => [
        {
          color: theme.colors.text_subtitle_dark,
          width: "100%",
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(5),
          },
        },
      ]}
    >
      <Text component="h5" css={{ margin: 0 }}>
        Company
      </Text>
      <Text
        variant="label"
        css={(theme) => [
          {
            margin: 0,
            marginTop: theme.spacing(1),
            lineHeight: 1.5,
            [theme.mq.sm]: { lineHeight: 1.5 },
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
  );

  return (
    <ComposedGlobalLayout>
      <Layout
        css={(theme) => [
          {
            paddingTop: theme.spacing(25),
            paddingBottom: theme.spacing(10),
            background: theme.colors.page_bg_light,
            [theme.maxMQ.sm]: {
              paddingTop: theme.spacing(17.5),
              paddingBottom: theme.spacing(5),
            },
          },
        ]}
        notTruncatable={true}
      >
        <BlockTitle
          noLine={true}
          alwaysSubtitle={true}
          title="Contact Us"
          subTitleText={
            <Fragment>
              You got questions concerning your order or a general matter?
              <br />
              Please reach out to us on the following email address.
              info@playingarts.com
              <br />
              <br />
              Check out some of our Frequently Asked Questions below this page
              for a quicker response time.
            </Fragment>
          }
          action={action}
        >
          {width < breakpoints.sm && action}
        </BlockTitle>
      </Layout>
      <Layout
        data-id="block-faq"
        css={(theme) => ({
          background: theme.colors.white,
          paddingTop: theme.spacing(10),
          paddingBottom: theme.spacing(10),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
          },
        })}
      >
        <Grid short={true}>
          <ComposedFaq
            title="Frequently Asked Questions"
            css={{ gridColumn: "1 / -1" }}
          />
        </Grid>
      </Layout>
    </ComposedGlobalLayout>
  );
};

export default withApollo(Page);
