import { GetStaticPaths, GetStaticProps } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { connect } from "../../source/mongoose";
import { initApolloClient } from "../../source/apollo";
import { DecksQuery } from "../../hooks/deck";
import { CardsQuery } from "../../hooks/card";
import { LosersQuery } from "../../hooks/loser";
import { podcastsQuery } from "../../hooks/podcast";

export { default } from "@/components/Pages/CardPage";

/**
 * Artist card paths are generated on-demand with fallback: 'blocking'.
 * Pre-generating all deck/artist combinations would be expensive.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

/**
 * Static generation with ISR - revalidate every 60 seconds.
 * Artist card data changes infrequently.
 */
export const getStaticProps: GetStaticProps<
  { cache?: NormalizedCacheObject },
  { deckId: string; artistSlug: string }
> = async (context) => {
  await connect();

  const { deckId } = context.params!;
  const { artistSlug } = context.params!;

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
      revalidate: 60,
    };
  }

  const {
    data: { cards },
  } = (await client.query({
    query: CardsQuery,
    variables: { deck: deck._id },
  })) as { data: { cards: GQL.Card[] } };

  const {
    data: { losers },
  } = (await client.query({
    query: LosersQuery,
    variables: { deck: deck._id },
  })) as { data: { losers: GQL.Loser[] } };

  const card = [...cards, ...losers].find(
    (card) => card.artist.slug === artistSlug
  );

  if (!card) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  await client.query({
    query: podcastsQuery,
    variables: {
      limit: 1,
      shuffle: true,
      name: card.artist.name,
    },
  });

  return {
    props: {
      cache: client.cache.extract() as NormalizedCacheObject,
    },
    // Revalidate every 60 seconds for fresh data with cached performance
    revalidate: 60,
  };
};
