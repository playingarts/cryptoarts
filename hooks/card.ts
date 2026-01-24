import { gql } from "@apollo/client";
import { useLazyQuery, useQuery, useApolloClient } from "@apollo/client/react";
import { useCallback, useState, useEffect } from "react";
import {
  CardFragment,
  CardBasicFragment,
  CardWithSlugsFragment,
  CardForDeckFragment,
  CardPopFragment,
  ERC1155Fragment,
} from "./fragments";

// Type aliases for query data shapes
type CardQueryData = Pick<GQL.Query, "card">;
type CardsQueryData = Pick<GQL.Query, "cards">;
type HeroCardsQueryData = Pick<GQL.Query, "heroCards">;
type DailyCardQueryData = Pick<GQL.Query, "dailyCard">;
type HomeCardsQueryData = Pick<GQL.Query, "homeCards">;
type CardsByIdsQueryData = Pick<GQL.Query, "cardsByIds">;
type CardsByPathsQueryData = Pick<GQL.Query, "cardsByPaths">;
type ProductsQueryData = Pick<GQL.Query, "products">;

// Type aliases for hook options
type CardQueryOptions = useQuery.Options<CardQueryData>;
type CardsQueryOptions = useQuery.Options<CardsQueryData>;
type HeroCardsQueryOptions = useQuery.Options<HeroCardsQueryData>;
type DailyCardQueryOptions = useQuery.Options<DailyCardQueryData>;
type HomeCardsQueryOptions = useQuery.Options<HomeCardsQueryData>;
type CardsByIdsQueryOptions = useQuery.Options<CardsByIdsQueryData>;

export const CardsQuery = gql`
  ${CardFragment}

  query Cards($deck: ID, $losers: Boolean, $edition: String) {
    cards(deck: $deck, losers: $losers, edition: $edition) {
      ...CardFragment
    }
  }
`;

/**
 * Optimized cards query for deck page listing.
 * Uses lighter fragment without full social/podcast data to reduce page size.
 * Supports optional edition filter for decks with multiple editions (e.g., Future I/II).
 * Accepts deckSlug directly to eliminate dependency on useDecks() completing first.
 */
export const CardsForDeckQuery = gql`
  ${CardForDeckFragment}

  query CardsForDeck($deck: ID, $deckSlug: String, $edition: String) {
    cards(deck: $deck, deckSlug: $deckSlug, edition: $edition) {
      ...CardForDeckFragment
    }
  }
`;

export const CardQuery = gql`
  ${CardFragment}

  query Card($id: ID, $slug: String, $deckSlug: String) {
    card(id: $id, slug: $slug, deckSlug: $deckSlug) {
      ...CardFragment
    }
  }
`;

/**
 * Lightweight card query for popup display.
 * Only fetches fields needed for popup: image, video, background, artist name/country.
 * Uses cache-first policy to read preloaded data instantly.
 */
export const CardPopQuery = gql`
  ${CardPopFragment}

  query CardPop($slug: String, $deckSlug: String) {
    card(slug: $slug, deckSlug: $deckSlug) {
      ...CardPopFragment
    }
  }
`;

/**
 * Query for favorites page - fetches only specific cards by IDs
 * Much faster than fetching all 55 cards per deck
 */
export const CardsByIdsQuery = gql`
  query CardsByIds($ids: [ID!]!) {
    cardsByIds(ids: $ids) {
      _id
      img
      video
      edition
      artist {
        name
        slug
        country
      }
      deck {
        slug
        title
      }
    }
  }
`;

export const RandomCardsQueryWithoutDeck = gql`
  query RandomCardsWithoutDeck($limit: Int) {
    cards(limit: $limit, shuffle: true, withoutDeck: ["crypto"]) {
      _id
      img
      video
      background
      deck {
        slug
      }
      artist {
        slug
      }
    }
  }
`;

export const RandomCardsQuery = gql`
  ${CardBasicFragment}

  query RandomCards($deck: ID, $limit: Int) {
    cards(deck: $deck, limit: $limit, shuffle: true) {
      ...CardBasicFragment
    }
  }
`;

export const RandomCardsWithInfoQuery = gql`
  ${CardWithSlugsFragment}

  query RandomCards($deck: ID, $limit: Int) {
    cards(deck: $deck, limit: $limit, shuffle: true) {
      ...CardWithSlugsFragment
    }
  }
`;

export const DailyCardQuery = gql`
  query DailyCard {
    dailyCard {
      _id
      img
      video
      info
      background
      artist {
        name
        slug
        country
        userpic
        info
        social {
          website
          instagram
          facebook
          twitter
          behance
          dribbble
          foundation
          superrare
          makersplace
          knownorigin
          rarible
          niftygateway
          showtime
        }
      }
      deck {
        slug
        title
        cardBackground
      }
    }
  }
`;

/**
 * Lightweight DailyCard query for Gallery section.
 * Only fetches fields actually used: name, slug, country, userpic, info, deck.slug
 * ~60% smaller payload than full DailyCardQuery.
 */
export const DailyCardLiteQuery = gql`
  query DailyCardLite {
    dailyCard {
      _id
      info
      mainPhoto
      artist {
        name
        slug
        country
        userpic
      }
      deck {
        slug
      }
    }
  }
`;

export const HeroCardsQuery = gql`
  ${ERC1155Fragment}

  query HeroCards($deck: ID, $slug: String) {
    heroCards(deck: $deck, slug: $slug) {
      _id
      img
      video
      info
      background
      value
      suit
      edition
      erc1155 {
        ...ERC1155Fragment
      }
      price
      deck {
        slug
      }
      artist {
        name
        userpic
        info
        country
        website
        slug
      }
    }
  }
`;

/**
 * Lightweight hero cards query - only fetches fields needed for Card component
 * Pre-cached during SSR for instant load
 */
export const HeroCardsLiteQuery = gql`
  query HeroCardsLite($slug: String!) {
    heroCards(slug: $slug) {
      _id
      img
      video
      artist {
        name
        slug
      }
    }
  }
`;

export const HomeCards = gql`
  query HomeCards {
    homeCards {
      _id
      img
      cardBackground
    }
  }
`;

export const useCard = (options: CardQueryOptions = {}) => {
  const { data: { card } = { card: undefined }, ...methods } =
    useQuery<CardQueryData>(CardQuery, options);

  return {
    ...methods,
    card,
  };
};

export const useCards = (options: CardsQueryOptions = {}) => {
  const { data: { cards } = { cards: undefined }, ...methods } =
    useQuery<CardsQueryData>(CardsQuery, options);

  return {
    ...methods,
    cards,
  };
};

/**
 * Use CardsForDeckQuery which is pre-cached during SSR.
 * Returns cards array for the given deck from cache.
 */
export const useCardsForDeck = (options: CardsQueryOptions = {}) => {
  const { data: { cards } = { cards: undefined }, ...methods } =
    useQuery<CardsQueryData>(CardsForDeckQuery, options);

  return {
    ...methods,
    cards,
  };
};

export const useHomeCards = (options: HomeCardsQueryOptions = {}) => {
  const { data: { homeCards: cards } = { cards: undefined }, ...methods } =
    useQuery<HomeCardsQueryData>(HomeCards, options);

  return {
    ...methods,
    cards,
  };
};

export const useLoadCards = (options: CardsQueryOptions = {}) => {
  const [loadCards, { data: { cards } = { cards: undefined }, ...methods }] =
    useLazyQuery<CardsQueryData>(CardsQuery, options);

  return {
    loadCards,
    ...methods,
    cards,
  };
};

export const useLoadHeroCards = (options: HeroCardsQueryOptions = {}) => {
  const [
    loadHeroCards,
    { data: { heroCards } = { heroCards: undefined }, ...methods },
  ] = useLazyQuery<HeroCardsQueryData>(HeroCardsQuery, options);

  return {
    loadHeroCards,
    ...methods,
    heroCards,
  };
};

export const useHeroCards = (options: HeroCardsQueryOptions = {}) => {
  const { data: { heroCards } = { heroCards: undefined }, ...methods } =
    useQuery<HeroCardsQueryData>(HeroCardsQuery, options);

  return {
    ...methods,
    heroCards,
  };
};

/**
 * Lightweight hook for hero cards - pre-cached during SSR for instant load
 */
export const useHeroCardsLite = (options: HeroCardsQueryOptions = {}) => {
  const { data: { heroCards } = { heroCards: undefined }, ...methods } =
    useQuery<HeroCardsQueryData>(HeroCardsLiteQuery, options);

  return {
    ...methods,
    heroCards,
  };
};

/**
 * Lazy load hero cards for prefetching on hover
 */
export const useLoadHeroCardsLite = (options: HeroCardsQueryOptions = {}) => {
  const [loadHeroCardsLite, { data: { heroCards } = { heroCards: undefined }, ...methods }] =
    useLazyQuery<HeroCardsQueryData>(HeroCardsLiteQuery, options);

  return {
    loadHeroCardsLite,
    ...methods,
    heroCards,
  };
};

export const useLoadCard = (options: CardQueryOptions = {}) => {
  const [loadCard, { data: { card } = { card: undefined }, ...methods }] =
    useLazyQuery<CardQueryData>(CardQuery, options);

  return { ...methods, loadCard, card };
};

export const useLoadRandomCards = (options: CardsQueryOptions = {}) => {
  const [
    loadRandomCards,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery<CardsQueryData>(RandomCardsQuery, options);

  return { loadRandomCards, ...methods, cards };
};

export const useLoadRandomCardsWithInfo = (options: CardsQueryOptions = {}) => {
  const [
    loadRandomCardsWithInfo,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery<CardsQueryData>(RandomCardsWithInfoQuery, options);

  return { loadRandomCardsWithInfo, ...methods, cards };
};
/**
 * Query for Collection section - random cards with limit for progressive loading
 */
export const CollectionCardsQuery = gql`
  query CollectionCards($deck: ID, $limit: Int, $shuffle: Boolean) {
    cards(deck: $deck, limit: $limit, shuffle: $shuffle) {
      _id
      img
      cardBackground
      artist {
        slug
        name
        country
      }
    }
  }
`;

export const useLoadCollectionCards = (options: CardsQueryOptions = {}) => {
  const [
    loadCollectionCards,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery<CardsQueryData>(CollectionCardsQuery, {
    ...options,
    fetchPolicy: "network-only", // Always fetch fresh random cards
  });

  return { loadCollectionCards, ...methods, cards };
};

export const useLoadRandomCardsWithoutDeck = (options: CardsQueryOptions = {}) => {
  const [
    loadRandomCardsWithoutDeck,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery<CardsQueryData>(
    RandomCardsQueryWithoutDeck,
    options
  );

  return { loadRandomCardsWithoutDeck, ...methods, cards };
};

export const useRandomCardsWithoutDeck = (options: CardsQueryOptions = {}) => {
  const { data: { cards } = { randomCards: undefined }, ...methods } =
    useQuery<CardsQueryData>(RandomCardsQueryWithoutDeck, options);

  return {
    ...methods,
    cards,
  };
};

export const useDailyCard = (options: DailyCardQueryOptions = {}) => {
  const { data: { dailyCard } = { dailyCard: undefined }, ...methods } =
    useQuery<DailyCardQueryData>(DailyCardQuery, options);

  return { ...methods, dailyCard };
};

/**
 * Lightweight hook for Gallery section - fetches only essential fields.
 */
export const useDailyCardLite = (options: DailyCardQueryOptions = {}) => {
  const { data: { dailyCard } = { dailyCard: undefined }, ...methods } =
    useQuery<DailyCardQueryData>(DailyCardLiteQuery, options);

  return { ...methods, dailyCard };
};

/**
 * Lightweight hook for card popup - fetches only essential fields for display.
 * Uses cache-first policy to read preloaded data instantly.
 */
export const useCardPop = (options: CardQueryOptions = {}) => {
  const { data: { card } = { card: undefined }, ...methods } =
    useQuery<CardQueryData>(CardPopQuery, {
    ...options,
    fetchPolicy: "cache-first",
  });

  return { ...methods, card };
};

/**
 * Lazy hook for preloading card popup data on hover.
 * Call loadCardPop() on mouseenter/touchstart to prefetch data.
 */
export const usePreloadCardPop = (options: CardQueryOptions = {}) => {
  const [loadCardPop, { data: { card } = { card: undefined }, ...methods }] =
    useLazyQuery<CardQueryData>(CardPopQuery, {
      ...options,
      fetchPolicy: "cache-first",
    });

  return { loadCardPop, ...methods, card };
};

/**
 * Hook to fetch cards by their IDs (optimized for favorites page)
 * Single query instead of N queries per deck
 */
export const useCardsByIds = (options: CardsByIdsQueryOptions = {}) => {
  const { data: { cardsByIds: cards } = { cardsByIds: undefined }, ...methods } =
    useQuery<CardsByIdsQueryData>(CardsByIdsQuery, options);

  return { ...methods, cards };
};

/**
 * Hook to prefetch cards for a deck on hover.
 * Warms Apollo cache so card page loads instantly.
 * Usage: call prefetch() on mouseenter before navigating to card page.
 */
export const usePrefetchCardsForDeck = () => {
  const client = useApolloClient();

  const prefetch = useCallback(
    (deckSlug: string) => {
      if (!deckSlug) {
        return;
      }

      // Fire and forget - prefetch into cache
      client.query({
        query: CardsForDeckQuery,
        variables: { deckSlug },
        fetchPolicy: "cache-first", // Use cache if available, otherwise fetch
      }).catch(() => {
        // Silently ignore prefetch errors - navigation will still work
      });
    },
    [client]
  );

  return { prefetch };
};

/**
 * Query for gallery rotating photos - fetches additionalPhotos[0] from random cards
 * Lightweight query for home page gallery slot
 */
export const GalleryPhotosQuery = gql`
  query GalleryPhotos($limit: Int) {
    cards(shuffle: true, limit: $limit) {
      _id
      additionalPhotos
    }
  }
`;

/**
 * Hook to fetch a random cardGalleryPhoto from products.
 * This is the deck-level photo used in card page gallery bottom-right slot.
 * Returns a single photo URL that changes only on page refresh.
 */
export const useRandomRightBottomPhoto = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [hasSelected, setHasSelected] = useState(false);

  const { data, ...methods } = useQuery<ProductsQueryData>(
    gql`
      query ProductGalleryPhotos {
        products {
          _id
          cardGalleryPhotos
        }
      }
    `,
    {
      fetchPolicy: "cache-first",
    }
  );

  // Select random photo only once when data arrives
  useEffect(() => {
    if (hasSelected || !data?.products) {
      return;
    }

    const productsWithPhoto = data.products.filter((p) => p.cardGalleryPhotos?.[0]);
    if (productsWithPhoto.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsWithPhoto.length);
      setSelectedPhoto(productsWithPhoto[randomIndex].cardGalleryPhotos![0]);
      setHasSelected(true);
    }
  }, [data?.products, hasSelected]);

  return { ...methods, photo: selectedPhoto };
};

/** Featured card paths for the bottom-left gallery slot */
const FEATURED_CARD_PATHS = [
  "three/burnt-toast-creative",
  "one/sara-blake",
  "one/conrad-roset",
  "one/lei-melendres",
  "one/valerie-ann-chua",
  "two/yeaaah-studio",
  "two/sara-blake",
  "two/marcelo-schultz",
  "two/alexis-marcou",
  "three/wes-art-studio",
  "three/andreas-preis",
  "three/will-scobie",
  "three/grzegorz-domaradzki",
];

/**
 * Query for featured gallery photos - fetches specific cards by paths
 */
export const FeaturedGalleryPhotosQuery = gql`
  query FeaturedGalleryPhotos($paths: [String!]!) {
    cardsByPaths(paths: $paths) {
      _id
      additionalPhotos
      deck {
        slug
      }
      artist {
        slug
      }
    }
  }
`;

export type FeaturedPhoto = {
  photo: string;
  href: string;
};

/**
 * Hook to fetch featured gallery photos for bottom-left slot on home page.
 * Returns array of { photo, href } objects for rotating display with links.
 */
export const useFeaturedGalleryPhotos = () => {
  const { data, ...methods } = useQuery<CardsByPathsQueryData>(
    FeaturedGalleryPhotosQuery,
    {
      variables: { paths: FEATURED_CARD_PATHS },
      fetchPolicy: "cache-first",
    }
  );

  // Extract additionalPhotos[0] and href from each card
  const featuredPhotos: FeaturedPhoto[] = data?.cardsByPaths
    ?.filter((card) => card.additionalPhotos?.[0])
    .map((card) => ({
      photo: card.additionalPhotos![0],
      href: `/${card.deck?.slug}/${card.artist?.slug}`,
    })) || [];

  return { ...methods, featuredPhotos };
};
