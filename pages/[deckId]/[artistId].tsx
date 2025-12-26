/* eslint-disable @typescript-eslint/no-require-imports */

import { NormalizedCacheObject } from "@apollo/client";
import { GetServerSideProps } from "next";
import { CardsQuery } from "../../hooks/card";
import { DecksQuery } from "../../hooks/deck";
import { LosersQuery } from "../../hooks/loser";
import { podcastsQuery } from "../../hooks/podcast";
import { initApolloClient } from "../../source/apollo";
import Page from "../[deckId]";
import { connect } from "../../source/mongoose";

export const getServerSideProps: GetServerSideProps<
  { cache?: NormalizedCacheObject },
  { deckId: string; artistId: string }
> = async (context) => {
  await connect();

  const { deckId } = context.params!;
  const { artistId } = context.params!;

  const client = initApolloClient(undefined, {
    schema: (await require("../../source/graphql/schema")).schema,
  });

  const decks = (
    (await client.query({ query: DecksQuery })) as {
      data: { decks: GQL.Deck[] };
    }
  ).data.decks;

  const deck = decks.find((deck) => deck.slug === deckId);

  if (!deck || deck.slug === "future-ii") {
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
    (card) => card.artist.slug === artistId
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

export default Page;
