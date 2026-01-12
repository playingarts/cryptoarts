import { createContext, useContext, useRef, useCallback, ReactNode, FC } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { HeroCardsLiteQuery } from "../../../hooks/card";
import { HeroCardProps } from "../../../pages/[deckId]";

interface HeroCardsContextValue {
  /** Fetch hero cards for a deck. Returns cards directly. Uses prefetched data if available. */
  fetchCardsForDeck: (slug: string) => Promise<HeroCardProps[] | undefined>;
  /** Prefetch hero cards for a deck in background (for hover optimization) */
  prefetchHeroCards: (slug: string) => void;
}

const HeroCardsContext = createContext<HeroCardsContextValue | null>(null);

export const HeroCardsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Store prefetched cards by deck slug
  const prefetchedCardsRef = useRef<Map<string, HeroCardProps[]>>(new Map());
  // Track in-flight fetch promises
  const fetchPromisesRef = useRef<Map<string, Promise<HeroCardProps[] | undefined>>>(new Map());

  const [queryHeroCards] = useLazyQuery<Pick<GQL.Query, "heroCards">>(HeroCardsLiteQuery, {
    fetchPolicy: "network-only",
  });

  // Internal fetch function
  const doFetch = useCallback(
    async (slug: string): Promise<HeroCardProps[] | undefined> => {
      try {
        const result = await queryHeroCards({ variables: { slug } });
        const cards = result.data?.heroCards;

        if (cards && cards.length >= 2) {
          const heroCards = cards.map((card) => ({
            _id: card._id,
            img: card.img.replace("-big-hd/", "-big/"),
            video: card.video,
            artist: card.artist,
            deckSlug: slug, // Include deck slug for validation
          })) as HeroCardProps[];

          // Prefetch images
          heroCards.forEach((card) => {
            const img = new Image();
            img.src = card.img;
          });

          return heroCards;
        }
      } catch {
        // Silently fail
      }
      return undefined;
    },
    [queryHeroCards]
  );

  // Prefetch in background (for hover)
  const prefetchHeroCards = useCallback(
    (slug: string) => {
      // Already have data or fetching
      if (prefetchedCardsRef.current.has(slug) || fetchPromisesRef.current.has(slug)) {
        return;
      }

      const promise = doFetch(slug).then((cards) => {
        if (cards) {
          prefetchedCardsRef.current.set(slug, cards);
        }
        fetchPromisesRef.current.delete(slug);
        return cards;
      });

      fetchPromisesRef.current.set(slug, promise);
    },
    [doFetch]
  );

  // Get cards for a deck - uses prefetched if available, otherwise fetches
  const fetchCardsForDeck = useCallback(
    async (slug: string): Promise<HeroCardProps[] | undefined> => {
      // Check prefetched data first
      const prefetched = prefetchedCardsRef.current.get(slug);
      if (prefetched) {
        // Clear so next visit gets fresh cards
        prefetchedCardsRef.current.delete(slug);
        return prefetched;
      }

      // Check if fetch already in progress
      const existingPromise = fetchPromisesRef.current.get(slug);
      if (existingPromise) {
        const cards = await existingPromise;
        // Clear prefetched data if it was stored
        prefetchedCardsRef.current.delete(slug);
        return cards;
      }

      // Start new fetch
      const promise = doFetch(slug);
      fetchPromisesRef.current.set(slug, promise);

      const cards = await promise;
      fetchPromisesRef.current.delete(slug);
      return cards;
    },
    [doFetch]
  );

  return (
    <HeroCardsContext.Provider value={{ fetchCardsForDeck, prefetchHeroCards }}>
      {children}
    </HeroCardsContext.Provider>
  );
};

export const useHeroCardsContext = () => {
  const context = useContext(HeroCardsContext);
  if (!context) {
    throw new Error("useHeroCardsContext must be used within HeroCardsProvider");
  }
  return context;
};
