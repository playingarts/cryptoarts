import { Location } from "graphql";
import mongoose from "mongoose";
import { GetStaticProps } from "next";
import { getDeckSlugsWithoutDB } from "../../../dump/_decks";
import { CardsQuery } from "../../../hooks/card";
import { DecksQuery } from "../../../hooks/deck";
import { LosersQuery } from "../../../hooks/loser";
import { podcastsQuery } from "../../../hooks/podcast";
import { Cache, initApolloClient } from "../../../source/apollo";
import Page from "../../[deckId]";

export const getStaticPaths = async () => {
  const decks = await getDeckSlugsWithoutDB();

  return {
    paths: (
      await Promise.all(
        decks.map(async (deckId) => {
          const cards: GQL.Card[] = [
            ...(await require(`../../../dump/deck-${deckId}`)).cards,
            ...(await require(`../../../dump/losers`)).cards.filter(
              ({ deck }: { deck: string }) => deck === deckId
            ),
          ];

          return cards.map(({ artist }) => ({
            params: { deckId, artistId: artist },
          }));
        })
      )
    ).flat(),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { cache?: Cache },
  { deckId: string; artistId: string }
> = async (context) => {
  if (mongoose.connection.readyState !== 1) {
    return { props: {}, revalidate: 1 };
  }

  const { deckId } = context.params!;
  const { artistId } = context.params!;

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
    (card) => card.artist.slug === artistId
  );

  if (!card) {
    return {
      notFound: true,
    };
  }

  const podcasts = (
    await client.query({
      query: podcastsQuery,
      variables: {
        limit: 1,
        shuffle: true,
        name: card.artist.name,
      },
    })
  ).data.podcasts;

  return {
    props: {
      cache: [
        {
          query: (DecksQuery.loc as Location).source.body,
          data: { decks },
        },
        {
          query: (CardsQuery.loc as Location).source.body,
          variables: { deck: deck._id },
          data: { cards },
        },
        {
          query: (LosersQuery.loc as Location).source.body,
          variables: { deck: deck._id },
          data: { losers },
        },
        {
          query: (podcastsQuery.loc as Location).source.body,
          variables: {
            limit: 1,
            shuffle: true,
            name: card.artist.name,
          },
          data: { podcasts },
        },
      ],
    },
  };
};

export default Page;
