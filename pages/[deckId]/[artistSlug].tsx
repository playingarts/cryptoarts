import { GetStaticPaths, GetStaticProps } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { connect } from "../../source/mongoose";
import { initApolloClient } from "../../source/apollo";
import { DecksQuery } from "../../hooks/deck";
import { CardsQuery, CardQuery } from "../../hooks/card";
import { LosersQuery } from "../../hooks/loser";
import { podcastsQuery } from "../../hooks/podcast";
import { schema } from "../../source/graphql/schema";

export { default } from "@/components/Pages/CardPage";

/** SSR card props for instant display before Apollo cache hydrates */
export interface SSRCardProps {
  _id: string;
  img: string;
  video: string | null;
  info: string | null;
  background: string | null;
  cardBackground: string | null;
  edition: string | null;
  deck: {
    slug: string;
  };
  artist: {
    name: string;
    slug: string;
    country: string | null;
    userpic: string | null;
    info: string | null;
    social: Record<string, string | null> | null;
  };
}

/**
 * Artist card paths are generated on-demand with fallback: true.
 * This enables instant navigation - page renders immediately with
 * data from navigation store while getStaticProps runs in background.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

/**
 * Static generation with ISR - revalidate every 60 seconds.
 * Artist card data changes infrequently.
 */
export const getStaticProps: GetStaticProps<
  { cache?: NormalizedCacheObject; ssrCard?: SSRCardProps },
  { deckId: string; artistSlug: string }
> = async (context) => {
  // Guard params - can be undefined in edge cases
  const { deckId, artistSlug } = context.params ?? {};

  if (!deckId || !artistSlug) {
    return { notFound: true };
  }

  try {
    await connect();

    const client = initApolloClient(undefined, { schema });

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

    // Fetch cards and losers in parallel for better performance
    const [cardsResult, losersResult] = await Promise.all([
      client.query({
        query: CardsQuery,
        variables: { deck: deck._id },
      }) as Promise<{ data: { cards: GQL.Card[] } }>,
      client.query({
        query: LosersQuery,
        variables: { deck: deck._id },
      }) as Promise<{ data: { losers: GQL.Loser[] } }>,
    ]);

    const cards = cardsResult.data.cards;
    const losers = losersResult.data.losers;

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

    // Pre-fetch individual card for Hero component's useCard hook
    await client.query({
      query: CardQuery,
      variables: { slug: artistSlug, deckSlug: deckId },
    });

    // Extract SSR card props for instant display (use nullish coalescing for safety)
    const ssrCard: SSRCardProps = {
      _id: card._id ?? "",
      img: card.img ?? "",
      video: card.video ?? null,
      info: card.info ?? null,
      background: card.background ?? null,
      cardBackground: "cardBackground" in card ? (card as GQL.Card).cardBackground ?? null : null,
      edition: "edition" in card ? (card as GQL.Card).edition ?? null : null,
      deck: {
        slug: deckId,
      },
      artist: {
        name: card.artist.name ?? "",
        slug: card.artist.slug,
        country: card.artist.country ?? null,
        userpic: card.artist.userpic ?? null,
        info: card.artist.info ?? null,
        social: card.artist.social as Record<string, string | null> ?? null,
      },
    };

    return {
      props: {
        cache: client.cache.extract() as NormalizedCacheObject,
        ssrCard,
      },
      // Revalidate every 60 seconds for fresh data with cached performance
      revalidate: 60,
    };
  } catch (error) {
    console.error(`Failed to generate card page: ${deckId}/${artistSlug}`, error);
    return {
      notFound: true,
      revalidate: 10, // Retry sooner on error
    };
  }
};
