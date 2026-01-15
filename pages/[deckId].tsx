export { default } from "@/components/Pages/Deck/";

import { initApolloClient } from "../source/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import { connect } from "../source/mongoose";
import { DecksNavQuery, DecksQuery } from "../hooks/deck";
import { CardsForDeckQuery, HeroCardsLiteQuery } from "../hooks/card";
import { LosersQuery } from "../hooks/loser";
import { NormalizedCacheObject } from "@apollo/client";
import { schema } from "../source/graphql/schema";

/** Lightweight hero card type for SSR props */
export interface HeroCardProps {
  _id: string;
  img: string;
  video?: string;
  artist: {
    name: string;
    slug: string;
  };
  /** Deck slug this card belongs to - used to validate cards during client-side navigation */
  deckSlug?: string;
}

/**
 * Generate static paths for all deck slugs.
 * Uses fallback: true for instant navigation - page renders immediately
 * with skeleton UI while getStaticProps runs in the background.
 *
 * Previously used fallback: "blocking" which caused navigation delay
 * because it waited for getStaticProps to complete before showing the page.
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
    fallback: true,
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
    heroCards?: HeroCardProps[];
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
  // Use deck slug instead of _id for cache consistency with client-side queries
  await client.query({
    query: CardsForDeckQuery,
    variables: { deck: deck.slug },
  });

  await client.query({
    query: LosersQuery,
    variables: { deck: deck._id },
  });

  // Fetch 2 random hero cards for this deck (uses MongoDB $sample)
  const heroCardsResult = await client.query<Pick<GQL.Query, "heroCards">>({
    query: HeroCardsLiteQuery,
    variables: { slug: deck.slug },
  });
  const heroCards = (heroCardsResult.data?.heroCards || []).map(
    (card: GQL.Card) => ({
      _id: card._id,
      img: card.img, // Keep hi-res for hero cards
      video: card.video,
      artist: card.artist,
      deckSlug: deck.slug, // Include deck slug for validation during client-side navigation
    })
  ) as HeroCardProps[];

  return {
    props: {
      cache: client.cache.extract() as NormalizedCacheObject,
      heroCards,
    },
    // Revalidate every 60 seconds for fresh data with cached performance
    revalidate: 60,
  };
};
