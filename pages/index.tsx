import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import { useDecks } from "../hooks/deck";
import { css } from "@emotion/react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { withApollo } from "../source/apollo";
import Menu from "../components/Menu";

const Home: NextPage = () => {
  const { decks } = useDecks();

  console.log("user", decks);

  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>
      <Menu
        currentdeck={{ id: 6 }}
        decks={[
          {
            deck: "zero",
            id: 0,
          },
          {
            deck: "one",
            id: 1,
          },
          {
            deck: "two",
            id: 2,
          },
          {
            deck: "three",
            id: 3,
          },
          {
            deck: "special",
            id: 4,
          },
          {
            deck: "future",
            id: 5,
          },
          {
            deck: "crypto",
            id: 6,
          },
        ]}
        css={{ position: "fixed" }}
      />

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
      </Layout>
      <Layout
        css={css`
          height: 3000px;
        `}
      >
        {JSON.stringify(decks)}
        <Link href="/about">ABOUT</Link>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
