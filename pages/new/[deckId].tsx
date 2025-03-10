/* eslint-disable @typescript-eslint/no-require-imports */
export { default } from "../../new/Pages/Deck/";

// import { FC, HTMLAttributes } from "react";
// import Header from "../../new/Header";
// import Hero from "../../new/Pages/Deck/Hero";
// import CardList from "../../new/Pages/Deck/CardList";
// import TheProduct from "../../new/Pages/Deck/TheProduct";
// import Gallery from "../../new/Pages/Deck/Gallery";
// import Footer from "../../new/Footer";
import { initApolloClient } from "../../source/apollo";
import { getDeckSlugsWithoutDB } from "../../dump/_decks";
import { GetStaticPaths, GetStaticProps } from "next";
import { connect } from "../../source/mongoose";
import { DecksQuery } from "../../hooks/deck";
import { CardsQuery, HeroCardsQuery } from "../../hooks/card";
import { LosersQuery } from "../../hooks/loser";
import { NormalizedCacheObject } from "@apollo/client";

// const Deck: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
//   <>
//     <Header />
//     <Hero />
//     <CardList />
//     <TheProduct />
//     <Gallery />
//     <Footer />
//   </>
// );

export const experimental_ppr = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const decks = await getDeckSlugsWithoutDB();

  return {
    paths: decks.map((deckId) => ({ params: { deckId } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  {
    cache?: NormalizedCacheObject;
  },
  { deckId: string }
> = async (context) => {
  if (process.env.SHOW_NEW !== "true") {
    return {
      notFound: true,
    };
  }
  await connect();

  const { deckId } = context.params!;

  const client = initApolloClient(undefined, {
    schema: (await require("../../source/graphql/schema")).schema,
  });

  const decks = (
    (await client.query({ query: DecksQuery })) as {
      data: { decks: GQL.Deck[] };
    }
  ).data.decks;

  const deck = decks.find((deck) => deck.slug === deckId);

  if (!deck) {
    return {
      notFound: true,
    };
  }

  await client.query({
    query: CardsQuery,
    variables: { deck: deck._id },
  });

  await client.query({
    query: LosersQuery,
    variables: { deck: deck._id },
  });

  await client.query({
    query: HeroCardsQuery,
    variables: { deck: deck._id, slug: deck.slug },
  });

  return {
    props: {
      cache: client.cache.extract(),
      ...(deck.slug === "crypto" && { revalidate: 60 }),
    },
  };
};

// // export function getStaticProps() {
// //   return {
// //     // returns the default 404 page with a status code of 404 in production
// //     notFound: process.env.SHOW_NEW !== "true",
// //   };
// // }

// // export default Deck;
// export default withApollo(Deck, { ssr: false });
