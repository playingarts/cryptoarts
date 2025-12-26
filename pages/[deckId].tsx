/* eslint-disable @typescript-eslint/no-require-imports */
export { default } from "../new/Pages/Deck/";

import { initApolloClient } from "../source/apollo";
import { GetServerSideProps } from "next";
import { connect } from "../source/mongoose";
import { DecksQuery } from "../hooks/deck";
import { CardsQuery, HeroCardsQuery } from "../hooks/card";
import { LosersQuery } from "../hooks/loser";
import { NormalizedCacheObject } from "@apollo/client";

export const getServerSideProps: GetServerSideProps<
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
    },
  };
};
