"use client";

import { FC } from "react";
import Head from "next/head";
import Grid from "../../Grid";
import Header from "../../Header";
import Footer from "../../Footer";
import Newsletter from "../../Newsletter";
import Text from "../../Text";

const ReviewsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Reviews - Playing Arts</title>
      </Head>
      <Header links={[]} pageTitle="Reviews" />
      <Grid
        css={(theme) => ({
          background: theme.colors.soft_gray,
          paddingTop: theme.spacing(20),
          paddingBottom: 120,
        })}
      >
        <div css={{ gridColumn: "1 / -1" }}>
          <Text
            typography="newh1"
            css={(theme) => ({
              color: theme.colors.dark_gray,
              marginBottom: theme.spacing(4),
            })}
          >
            Reviews
          </Text>
          <div
            css={(theme) => ({
              height: 1,
              background: theme.colors.black10,
              marginBottom: theme.spacing(4),
            })}
          />
        </div>

        <div css={{ gridColumn: "span 12" }}>
          <Text typography="newParagraph">
            Coming soon
          </Text>
        </div>
      </Grid>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ReviewsPage;
