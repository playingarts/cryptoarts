export { default } from "@/components/Pages/Deck/";

import { initApolloClient } from "../source/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import { connect } from "../source/mongoose";
import { DecksNavQuery, DeckQuery } from "../hooks/deck";
import { CardsForDeckQuery, HeroCardsQuery } from "../hooks/card";
import { LosersQuery } from "../hooks/loser";
import { NormalizedCacheObject } from "@apollo/client";
import { schema } from "../source/graphql/schema";

/**
 * Generate static paths for all deck slugs.
 * Uses fallback: 'blocking' to handle new decks at runtime.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  await connect();

  const client = initApolloClient(undefined, { schema });

  // Use lightweight nav query for paths (only need slugs)
  const decks = (
    (await client.query({ query: DecksNavQuery })) as {
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

  const client = initApolloClient(undefined, { schema });

  // Fetch single deck by slug (not all decks)
  const { data: { deck } = { deck: undefined } } = (await client.query({
    query: DeckQuery,
    variables: { slug: deckId },
  })) as { data: { deck: GQL.Deck | undefined } };

  if (!deck) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  // Fetch navigation data (lightweight - only slugs)
  await client.query({ query: DecksNavQuery });

  await client.query({
    query: CardsForDeckQuery,
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
