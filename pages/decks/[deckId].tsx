import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import { useDeck } from "../../hooks/deck";
import { css } from "@emotion/react";
import Layout from "../../components/Layout";
import { withApollo } from "../../source/apollo";
import Menu from "../../components/Menu";
import { useCards } from "../../hooks/card";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const {
    query: { deckId },
  } = useRouter();
  const { deck } = useDeck({ variables: { slug: deckId } });
  const { cards } = useCards({
    variables: {
      deck: deck ? deck._id : "",
    },
  });

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
      ></Layout>
      <Layout
        css={css`
          height: 3000px;
        `}
      >
        {JSON.stringify(cards)}
        <Link href="/about">ABOUT</Link>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
