import { GetStaticPaths, GetStaticProps } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { connect } from "../../source/mongoose";
import { initApolloClient } from "../../source/apollo";
import { CardQuery } from "../../hooks/card";
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
    /** Full deck title for instant "Shop X" button display */
    title?: string;
  };
  artist: {
    name: string;
    slug: string;
    country: string | null;
    userpic: string | null;
    info: string | null;
    social: Record<string, string | null> | null;
  };
  /** Backside card for flip animation (passed from popup navigation) */
  backsideCard?: {
    img: string;
    video?: string | null;
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

    // Fetch ONLY the single card - decks and other cards load client-side
    const cardResult = await client.query({
      query: CardQuery,
      variables: { slug: artistSlug, deckSlug: deckId },
    }) as { data: { card: GQL.Card | null } };

    const card = cardResult.data.card;

    if (!card) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

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
