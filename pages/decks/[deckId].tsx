import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import { useDeck } from "../../hooks/deck";
import Layout from "../../components/Layout";
import { withApollo } from "../../source/apollo";
import { useCards } from "../../hooks/card";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import CardsBlock from "../../components/CardsBlock";
import CardNav from "../../components/CardNav";
import Footer from "../../components/Footer";
import Box from "../../components/Box";
import DeckBlock from "../../components/DeckBlock";
import BlockTitle from "../../components/BlockTitle";
import Bag from "../../components/Icons/Bag";

const Home: NextPage = () => {
  const {
    query: { cardId, deckId },
  } = useRouter();
  const { deck } = useDeck({ variables: { slug: deckId } });
  const { cards, loading } = useCards({
    variables: {
      deck: deck ? deck._id : "",
    },
  });

  if (loading || !cards) {
    return null;
  }

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

      {cardId && (
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
      )}
      {!cardId && (
        <Layout
          css={{
            paddingTop: 500,
          }}
        />
      )}

      <Layout>
        <CardsBlock cards={cards} />
      </Layout>

      <Layout
        css={{
          background: "#dfdfdf",
        }}
      >
        <Box padding={2}>
          <BlockTitle
            titleText="Deck"
            subTitleText="Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!"
            buttonProps={{
              Icon: Bag,
              children: "Buy now",
              css: (theme) => ({
                background: theme.colors.darkGray,
                color: theme.colors.text_title_light,
              }),
            }}
          />
          <DeckBlock
            css={(theme) => ({
              marginTop: theme.spacing(14),
            })}
            properties={{
              size: "Poker, 88.9 × 63.5mm",
              material: "Bicycle® paper with Air-cushion finish",
              inside: "52 Playing cards + 2 Jokers + Info card",
            }}
          />
        </Box>
      </Layout>

      <Layout>
        <Box
          css={(theme) => ({
            background: "#dfdfdf",
            marginBottom: theme.spacing(1),
          })}
        >
          <Footer />
        </Box>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
