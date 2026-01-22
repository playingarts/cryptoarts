"use client";

import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useRouter } from "next/router";
import { useDecks } from "../../../hooks/deck";
import { useCardsForDeck } from "../../../hooks/card";
import { sortCards } from "../../../source/utils/sortCards";
import { getNavigationCard, clearNavigationCard } from "./navigationCardStore";

interface CardNavigationData {
  currentIndex: number;
  max: number;
  prevSlug: string;
  nextSlug: string;
  cards: GQL.Card[];
}

interface CardPageContextValue {
  /** Current artist slug (from URL or local state) */
  artistSlug: string | undefined;
  /** Current deck ID */
  deckId: string | undefined;
  /** Navigate to a card instantly (shallow routing) */
  navigateToCard: (artistSlug: string) => void;
  /** Card navigation data */
  cardNavigation: CardNavigationData | null;
  /** All cards for current deck (sorted) */
  sortedCards: GQL.Card[];
  /** Current deck object */
  deck: GQL.Deck | undefined;
  /** Request navigation data to be loaded immediately (for arrows, etc.) */
  requestNavigation: () => void;
  /** Whether navigation data is still loading */
  navigationLoading: boolean;
}

const CardPageContext = createContext<CardPageContextValue | null>(null);

export const useCardPageContext = () => {
  const context = useContext(CardPageContext);
  if (!context) {
    throw new Error("useCardPageContext must be used within CardPageProvider");
  }
  return context;
};

/** Optional version that returns null if not within CardPageProvider */
export const useCardPageContextOptional = () => {
  return useContext(CardPageContext);
};

interface CardPageProviderProps {
  children: ReactNode;
  /** Edition filter for decks with multiple editions (e.g., Future I/II) */
  edition?: string | null;
}

export const CardPageProvider: FC<CardPageProviderProps> = ({ children, edition }) => {
  const router = useRouter();
  const { deckId: routerDeckId, artistSlug: routerArtistSlug } = router.query;

  // Local state for instant navigation (overrides router query)
  const [localArtistSlug, setLocalArtistSlug] = useState<string | undefined>(
    undefined
  );

  // Reset local state when router changes (e.g., full page navigation)
  useEffect(() => {
    if (typeof routerArtistSlug === "string") {
      setLocalArtistSlug(undefined);
    }
  }, [routerArtistSlug]);

  // During fallback, extract deckId and artistSlug from pathname
  // This enables queries to run immediately even before router.query is populated
  const [pathDeckId, pathArtistSlug] = useMemo(() => {
    if (typeof window === "undefined") return [undefined, undefined];
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    return pathParts.length >= 2 ? [pathParts[0], pathParts[1]] : [undefined, undefined];
  }, [router.asPath]); // Re-compute when route changes

  // Current values (local state takes precedence for instant navigation)
  // Fallback to pathname parsing during router.isFallback
  const deckId =
    typeof routerDeckId === "string" ? routerDeckId : pathDeckId;
  const artistSlug =
    localArtistSlug ||
    (typeof routerArtistSlug === "string" ? routerArtistSlug : pathArtistSlug);

  // Read navigation card from sessionStorage on mount (for instant display)
  const navCardRef = useRef<ReturnType<typeof getNavigationCard>>(null);
  if (navCardRef.current === null && typeof window !== "undefined") {
    navCardRef.current = getNavigationCard();
  }

  // Get deck from cached decks (for deck object properties like title)
  // This is optional - the cards query no longer depends on it
  const { decks } = useDecks({ fetchPolicy: "cache-first" });
  const deck = useMemo(() => {
    if (!decks || !deckId) return undefined;
    return decks.find((d) => d.slug === deckId);
  }, [decks, deckId]);

  // Defer cards fetch - only load when user needs navigation (arrows) or after 500ms
  // This makes initial card page load instant (uses navigationCardStore data)
  const [navigationNeeded, setNavigationNeeded] = useState(false);

  // Background load after delay (user might want to navigate)
  useEffect(() => {
    const timer = setTimeout(() => setNavigationNeeded(true), 500);
    return () => clearTimeout(timer);
  }, [deckId]); // Reset timer when deck changes

  // Allow immediate fetch if user needs navigation now
  const requestNavigation = useCallback(() => setNavigationNeeded(true), []);

  // Fetch all cards for deck using deckSlug directly
  // Deferred until navigationNeeded is true (500ms delay or explicit request)
  // For decks with multiple editions (e.g., Future), filter by edition
  const { cards, loading: cardsLoading } = useCardsForDeck({
    variables: { deckSlug: deckId, edition: edition || undefined },
    skip: !deckId || !navigationNeeded,
  });

  // Clear navigation card once real data arrives
  useEffect(() => {
    if (cards && cards.length > 0 && navCardRef.current) {
      clearNavigationCard();
      navCardRef.current = null;
    }
  }, [cards]);

  // Sorted cards (matches CardList and Pop order)
  const sortedCards = useMemo(() => {
    if (!cards) return [];
    return sortCards(cards);
  }, [cards]);

  // Card navigation data
  const cardNavigation = useMemo(() => {
    if (!artistSlug || sortedCards.length === 0) return null;

    const currentIndex = sortedCards.findIndex(
      (card) => card.artist?.slug === artistSlug
    );

    if (currentIndex === -1) return null;

    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : sortedCards.length - 1;
    const nextIndex =
      currentIndex < sortedCards.length - 1 ? currentIndex + 1 : 0;

    return {
      currentIndex,
      max: sortedCards.length,
      prevSlug: sortedCards[prevIndex].artist?.slug || "",
      nextSlug: sortedCards[nextIndex].artist?.slug || "",
      cards: sortedCards,
    };
  }, [artistSlug, sortedCards]);

  // Navigate to card instantly using shallow routing
  const navigateToCard = useCallback(
    (newArtistSlug: string) => {
      if (!deckId) return;

      // Update local state immediately for instant UI update
      setLocalArtistSlug(newArtistSlug);

      // Update URL without page reload (shallow routing)
      const newUrl = `/${deckId}/${newArtistSlug}`;
      window.history.pushState({ artistSlug: newArtistSlug }, "", newUrl);
    },
    [deckId]
  );

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Extract artistSlug from current URL
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      if (pathParts.length >= 2) {
        const [, newArtistSlug] = pathParts;
        setLocalArtistSlug(newArtistSlug);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const value = useMemo(
    () => ({
      artistSlug,
      deckId,
      navigateToCard,
      cardNavigation,
      sortedCards,
      deck,
      requestNavigation,
      navigationLoading: navigationNeeded && cardsLoading,
    }),
    [artistSlug, deckId, navigateToCard, cardNavigation, sortedCards, deck, requestNavigation, navigationNeeded, cardsLoading]
  );

  return (
    <CardPageContext.Provider value={value}>
      {children}
    </CardPageContext.Provider>
  );
};
