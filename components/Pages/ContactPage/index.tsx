"use client";

import { FC } from "react";
import Head from "next/head";
import Grid from "../../Grid";
import Header from "../../Header";
import Footer from "../../Footer";
import Newsletter from "../../Newsletter";
import Text from "../../Text";

const ContactPage: FC = () => {
  return (
    <>
      <Head>
        <title>Contact - Playing Arts</title>
      </Head>
      <Header links={[]} pageTitle="Contact" />
      <Grid
        css={(theme) => ({
          background: theme.colors.soft_gray,
          paddingTop: theme.spacing(20),
          paddingBottom: 120,
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
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
            Contact
          </Text>
          <div
            css={(theme) => ({
              height: 1,
              background: theme.colors.black10,
              marginBottom: theme.spacing(4),
            })}
          />
        </div>

        <div
          css={(theme) => ({
            gridColumn: "span 12",
            [theme.maxMQ.sm]: { /* Mobile styles - to be implemented */ },
          })}
        >
          <Text typography="newParagraph">
            You got questions concerning your order or a general matter?
            <br />
            Please reach out to us:{" "}
            <a
              href="mailto:info@playingarts.com"
              css={(theme) => ({ color: theme.colors.accent })}
            >
              info@playingarts.com
            </a>
          </Text>
        </div>
      </Grid>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ContactPage;
