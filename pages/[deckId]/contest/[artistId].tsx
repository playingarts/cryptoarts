import { NormalizedCacheObject } from "@apollo/client";
import { GetStaticProps } from "next";
import { CardsQuery } from "../../../hooks/card";
import { DecksQuery } from "../../../hooks/deck";
import { LosersQuery } from "../../../hooks/loser";
import { podcastsQuery } from "../../../hooks/podcast";
import { initApolloClient } from "../../../source/apollo";
import { connectToDB } from "../../../source/mongoose";
import Page, { getStaticPaths as getstatic } from "../../[deckId]";

export const getStaticPaths = getstatic;

export const getStaticProps: GetStaticProps<
  { cache: NormalizedCacheObject },
  { deckId: string; artistId: string }
> = async (context) => {
  const { deckId } = context.params!;
  const { artistId } = context.params!;

  const client = initApolloClient(undefined, {
    schema: (await require("../../../source/graphql/schema")).schema,
  });

  const fetchDecks: (numb?: number) => Promise<GQL.Deck[]> = async (
    numb = 0
  ) => {
    try {
      return ((await client.query({ query: DecksQuery })) as {
        data: { decks: GQL.Deck[] };
      }).data.decks;
    } catch (error) {
      if (numb >= 5) {
        throw new Error("Can't fetch decks");
      }
      await connectToDB();

      return await fetchDecks(numb + 1);
    }
  };

  const decks = await fetchDecks();

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
    props: { cache: client.cache.extract() },
  };
};

export default Page;
