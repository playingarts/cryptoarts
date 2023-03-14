import { NormalizedCacheObject } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { CardsQuery } from "../../hooks/card";
import { DecksQuery } from "../../hooks/deck";
import { LosersQuery } from "../../hooks/loser";
import { podcastsQuery } from "../../hooks/podcast";
import { initApolloClient } from "../../source/apollo";
import { getCards } from "../../source/graphql/schemas/card";
import { getDecks } from "../../source/graphql/schemas/deck";
import { connectToDB } from "../../source/mongoose";
import Page from "../[deckId]";

interface Params extends NextParsedUrlQuery {
  deckId: string;
  artistId: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  await connectToDB();
  require("../../source/graphql/schemas/artist");
  const decks = await getDecks();

  const paths: { params: { deckId: string; artistId: string } }[] = [];

  for (const deck of decks) {
    const { _id, slug } = deck;

    const cards: GQL.Card[] = await getCards({ deck: _id });

    cards.map((card) =>
      paths.push({
        params: { deckId: slug, artistId: card.artist.slug },
      })
    );
  }

  return {
    paths,
    fallback: "blocking",
    // fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { cache: NormalizedCacheObject },
  { deckId: string; artistId: string }
> = async (context) => {
  const { deckId } = context.params!;
  const { artistId } = context.params!;

  const client = initApolloClient(undefined, {
    schema: (await require("../../source/graphql/schema")).schema,
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
    throw new Error("No deck");
  }

  const {
    data: { cards },
  } = (await client.query({
    query: CardsQuery,
    variables: { deck: deck._id },
  })) as { data: { cards: GQL.Card[] } };

  await client.query({
    query: LosersQuery,
    variables: { deck: deck._id },
  });

  await client.query({
    query: podcastsQuery,
    variables: {
      limit: 1,
      shuffle: true,
      name: cards.find((card) => card.artist.slug === artistId)!.artist.name,
    },
  });

  return {
    props: { cache: client.cache.extract() },
  };
};

export default Page;
