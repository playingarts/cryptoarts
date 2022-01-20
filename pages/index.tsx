import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import { css } from "@emotion/react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { withApollo } from "../source/apollo";
import CardsBlock from "../components/CardsBlock";
import Plus from "../components/Icons/Plus";
import BlockTitle from "../components/BlockTitle";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Header
        css={(theme) => ({
          position: "fixed",
          left: theme.spacing(1),
          right: theme.spacing(1),
          top: theme.spacing(1),
          zIndex: 100,

          "@media (min-width: 1440px)": {
            maxWidth: theme.spacing(142),
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "100%",
          },
        })}
      />

      <Layout
        css={(theme) => ({
          background: theme.colors.dark_gray,
          paddingTop: theme.spacing(22),
        })}
      >
        <Hero
          title="Collective Art Project"
          text="For creative people who are into graphic design, illustration, playing
          cards and sometimes magic."
          css={(theme) => ({
            padding: "85px 200px",
            width: "75%",
            color: theme.colors.text_title_light,
          })}
        />
        <BlockTitle
          css={(theme) => ({
            color: theme.colors.text_title_light,
          })}
          buttonProps={{
            children: (
              <span
                css={(theme) => ({
                  background: theme.colors.gradient,
                  backgroundClip: "text",
                  color: "transparent",
                })}
              >
                metamask
              </span>
            ),
            Icon: Plus,
            css: (theme) => ({
              background: theme.colors.dark_gray,
              color: "#58CDFF",
            }),
          }}
          titleText="Cards"
          subTitleText="Hover the card to see animation. Click to read the story behind the artwork."
        />
      </Layout>
      <CardsBlock cards={[]} />
      <Layout
        css={css`
          height: 3000px;
        `}
      >
        <Link href="/about">ABOUT</Link>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
