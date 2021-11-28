import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import Layout from "../../../../components/Layout";
import { withApollo } from "../../../../source/apollo";
import { useRouter } from "next/router";
import Header from "../../../../components/Header";
import CardNav from "../../../../components/CardNav";

const Home: NextPage = () => {
  const {
    query: { deckId },
  } = useRouter();

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
          zIndex: 2,

          "@media (min-width: 1440px)": {
            maxWidth: theme.spacing(142),
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "100%",
          },
        })}
      />

      <CardNav
        css={{
          background: "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)",
          color: "#fff",
        }}
        prevLink="/prev"
        nextLink="/next"
        closeLink={`/decks/${deckId}`}
      >
        <Layout>
          <div style={{ height: 1500 }} />
        </Layout>
      </CardNav>
    </Fragment>
  );
};

export default withApollo(Home);
