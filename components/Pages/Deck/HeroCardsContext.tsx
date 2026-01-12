import { createContext, useContext, useRef, useCallback, ReactNode, FC } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { HeroCardsLiteQuery } from "../../../hooks/card";
import { HeroCardProps } from "../../../pages/[deckId]";

const MAX_RETRIES = 1; // Reduced to prevent rate limiting

interface HeroCardsContextValue {
  /** Fetch hero cards for a deck. Returns cards directly. Uses prefetched data if available. */
  fetchCardsForDeck: (slug: string) => Promise<HeroCardProps[] | undefined>;
  /** Prefetch hero cards for a deck in background (for hover optimization) */
  prefetchHeroCards: (slug: string) => void;
}

const HeroCardsContext = createContext<HeroCardsContextValue | null>(null);

// Cache duration in ms - cards cached for 30 seconds to prevent rapid re-fetching
const CACHE_DURATION_MS = 30000;

interface CachedCards {
  cards: HeroCardProps[];
  timestamp: number;
}

/** Preload images and resolve when loaded (or timeout) */
const preloadImagesWithCache = (cards: HeroCardProps[], imageCache: Map<string, HTMLImageElement>): Promise<void> => {
  return new Promise((resolve) => {
    let loadedCount = 0;
    const totalImages = Math.min(cards.length, 2);

    // Timeout after 5 seconds - don't block forever
    const timeout = setTimeout(() => resolve(), 5000);

    const onLoad = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        clearTimeout(timeout);
        resolve();
      }
    };

    cards.slice(0, 2).forEach((card) => {
      // Check if already cached
      if (imageCache.has(card.img)) {
        onLoad();
        return;
      }

      const img = new Image();
      img.onload = () => {
        imageCache.set(card.img, img); // Store reference to prevent GC
        onLoad();
      };
      img.onerror = onLoad; // Count errors as "loaded" to avoid hanging
      img.src = card.img;

      // If already in browser cache
      if (img.complete) {
        imageCache.set(card.img, img);
        onLoad();
      }
    });
  });
};

export const HeroCardsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Store prefetched cards by deck slug (for hover prefetch)
  const prefetchedCardsRef = useRef<Map<string, HeroCardProps[]>>(new Map());
  // Track in-flight fetch promises
  const fetchPromisesRef = useRef<Map<string, Promise<HeroCardProps[] | undefined>>>(new Map());
  // Short-lived cache to prevent rapid re-fetching during navigation
  const recentCardsRef = useRef<Map<string, CachedCards>>(new Map());
  // Keep image references to prevent garbage collection
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  const [queryHeroCards] = useLazyQuery<Pick<GQL.Query, "heroCards">>(HeroCardsLiteQuery, {
    fetchPolicy: "no-cache", // Always fetch fresh random cards (heroCards uses MongoDB $sample)
  });

  // Internal fetch function with retry logic
  const doFetch = useCallback(
    async (slug: string, retryCount = 0): Promise<HeroCardProps[] | undefined> => {
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

          // Start image preloading in background (don't block data return)
          // Component's waitForImages handles the actual display timing
          preloadImagesWithCache(heroCards, imageCacheRef.current);

          // Cache the result for short-term reuse
          recentCardsRef.current.set(slug, {
            cards: heroCards,
            timestamp: Date.now(),
          });

          return heroCards;
        }

        // No cards or fewer than 2 - retry if we haven't exhausted retries
        if (retryCount < MAX_RETRIES) {
          console.warn(`[HeroCards] No cards returned for ${slug}, retrying (${retryCount + 1}/${MAX_RETRIES})`);
          return doFetch(slug, retryCount + 1);
        }

        console.warn(`[HeroCards] Failed to fetch cards for ${slug} after ${MAX_RETRIES} retries`);
        return undefined;
      } catch (error) {
        // Retry on error
        if (retryCount < MAX_RETRIES) {
          console.warn(`[HeroCards] Error fetching ${slug}, retrying (${retryCount + 1}/${MAX_RETRIES})`, error);
          return doFetch(slug, retryCount + 1);
        }

        console.error(`[HeroCards] Failed to fetch cards for ${slug} after ${MAX_RETRIES} retries`, error);
        return undefined;
      }
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

  // Get cards for a deck - uses cached/prefetched if available, otherwise fetches
  const fetchCardsForDeck = useCallback(
    async (slug: string): Promise<HeroCardProps[] | undefined> => {
      // Check recent cache first (prevents rapid re-fetching during navigation)
      const cached = recentCardsRef.current.get(slug);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
        return cached.cards;
      }

      // Check prefetched data (from hover)
      const prefetched = prefetchedCardsRef.current.get(slug);
      if (prefetched) {
        // Clear prefetch cache but add to recent cache
        prefetchedCardsRef.current.delete(slug);
        recentCardsRef.current.set(slug, {
          cards: prefetched,
          timestamp: Date.now(),
        });
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
