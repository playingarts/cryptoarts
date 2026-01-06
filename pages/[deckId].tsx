/* eslint-disable @typescript-eslint/no-require-imports */
export { default } from "@/components/Pages/Deck/";

import { initApolloClient } from "../source/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import { connect } from "../source/mongoose";
import { DecksQuery } from "../hooks/deck";
import { CardsQuery, HeroCardsQuery } from "../hooks/card";
import { LosersQuery } from "../hooks/loser";
import { NormalizedCacheObject } from "@apollo/client";

/**
 * Generate static paths for all deck slugs.
 * Uses fallback: 'blocking' to handle new decks at runtime.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  await connect();

  const client = initApolloClient(undefined, {
    schema: (await require("../source/graphql/schema")).schema,
  });

  const decks = (
    (await client.query({ query: DecksQuery })) as {
      data: { decks: GQL.Deck[] };
    }
  ).data.decks;

  return {
    paths: decks.map((deck) => ({ params: { deckId: deck.slug } })),
    fallback: "blocking",
  };
};

/**
 * Static generation with ISR - revalidate every 60 seconds.
 * Deck and card data changes infrequently, so ISR provides
 * excellent performance while keeping content fresh.
 */
export const getStaticProps: GetStaticProps<
  {
    cache?: NormalizedCacheObject;
  },
  { deckId: string }
> = async (context) => {
  await connect();

  const { deckId } = context.params!;

  const client = initApolloClient(undefined, {
    schema: (await require("../source/graphql/schema")).schema,
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
      revalidate: 60,
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
      cache: client.cache.extract() as NormalizedCacheObject,
    },
    // Revalidate every 60 seconds for fresh data with cached performance
    revalidate: 60,
  };
};
