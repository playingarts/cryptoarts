export { default } from "@/components/Pages/Deck/";

import { initApolloClient } from "../source/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import { connect } from "../source/mongoose";
import { DecksNavQuery, DecksQuery } from "../hooks/deck";
import { CardsForDeckQuery } from "../hooks/card";
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

  // Fetch ALL decks with full text data (title, description, etc.) - lightweight
  const { data: { decks } = { decks: [] } } = (await client.query({
    query: DecksQuery,
  })) as { data: { decks: GQL.Deck[] } };

  const deck = decks.find((d) => d.slug === deckId);

  if (!deck) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  // Fetch nav query for compatibility
  await client.query({ query: DecksNavQuery });

  // Only fetch cards for CURRENT deck during SSR
  // Adjacent decks will be prefetched client-side after initial render
  await client.query({
    query: CardsForDeckQuery,
    variables: { deck: deck._id },
  });

  await client.query({
    query: LosersQuery,
    variables: { deck: deck._id },
  });

  return {
    props: {
      cache: client.cache.extract() as NormalizedCacheObject,
    },
    // Revalidate every 60 seconds for fresh data with cached performance
    revalidate: 60,
  };
};
