import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { NextPage } from "next";
import { withApollo } from "../source/apollo";
import { useDecks2 } from "../hooks/deck";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { css } from "@emotion/react";

const Home: NextPage = () => {
  const { decks } = useDecks2();

  console.log("user222", decks);

  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Header
        palette="dark"
        css={css`
          position: fixed;
          left: 10px;
          right: 10px;
          top: 10px;
          z-index: 1;

          @media (min-width: 1440px) {
            max-width: 1420px;
            left: 50%;
            transform: translate(-50%, 0);
            width: 100%;
          }
        `}
      />

      <Layout>
        {JSON.stringify(decks)}
        <Link href="/">HOME</Link>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
