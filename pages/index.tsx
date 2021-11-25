import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import { css } from "@emotion/react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { withApollo } from "../source/apollo";
import Menu from "../components/Menu";
import Plus from "../components/Icons/Plus";
import BlockTitle from "../components/BlockTitle";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Menu currentdeck={{ id: 6 }} css={{ position: "fixed" }} />

      <Layout
        css={css`
          background: #000;
          padding-top: 220px;
        `}
      >
        <Hero
          title="Collective Art Project"
          text="For creative people who are into graphic design, illustration, playing
          cards and sometimes magic."
          style={{ padding: "85px 200px", width: "75%", color: "#fff" }}
        />
        <BlockTitle
          css={{
            color: "#FFF",
          }}
          buttonProps={{
            text: "metamask",
            Icon: Plus,
            textProps: {
              css: (theme) => ({
                background: theme.colors.ethButton,
                backgroundClip: "text",
                color: "transparent",
              }),
            },
            css: (theme) => ({
              background: theme.colors.darkGray,
            }),
          }}
          titleText="Cards"
          subTitleText="Hover the card to see animation. Click to read the story behind the artwork."
        />
      </Layout>
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
