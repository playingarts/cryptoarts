/* eslint-disable @typescript-eslint/no-require-imports */
import { GetServerSideProps } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { connect } from "../../../source/mongoose";
import { initApolloClient } from "../../../source/apollo";
import { DecksQuery } from "../../../hooks/deck";
import { CardsQuery } from "../../../hooks/card";
import { LosersQuery } from "../../../hooks/loser";
import { podcastsQuery } from "../../../hooks/podcast";

export { default } from "../../../new/Pages/CardPage";

export const getServerSideProps: GetServerSideProps<
  { cache?: NormalizedCacheObject },
  { deckId: string; artistSlug: string }
> = async (context) => {
  await connect();

  const { deckId } = context.params!;
  const { artistSlug } = context.params!;

  const client = initApolloClient(undefined, {
    schema: (await require("../../../source/graphql/schema")).schema,
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
      cache: client.cache.extract(),
      ...(deck.slug === "crypto" && { revalidate: 60 }),
    },
  };
};
