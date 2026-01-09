"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import type { HomeCard } from "../types/homeCard";

export { HomeCard };

const ROTATION_INTERVAL_MS = 5000;
const PROGRESS_UPDATE_MS = 50;

type HeroCarouselState = {
  visibleCards: HomeCard[];
  currentCard: HomeCard | null;
  departingCard: HomeCard | null;
  quoteIndex: number;
  progress: number;
  isPaused: boolean;
};

type HeroCarouselActions = {
  setHovering: (hovering: boolean) => void;
  onReady: () => void;
  advance: () => void;
};

type HeroCarouselContextValue = HeroCarouselState & HeroCarouselActions;

export const HeroCarouselContext = createContext<HeroCarouselContextValue | null>(null);

export const useHeroCarousel = () => {
  const context = useContext(HeroCarouselContext);
  if (!context) {
    throw new Error("useHeroCarousel must be used within HeroCarouselProvider");
  }
  return context;
};

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

type HeroCarouselProviderProps = {
  children: ReactNode;
  initialCards?: HomeCard[];
  onHeroReady?: () => void;
  quoteCount?: number;
};

export const HeroCarouselProvider = ({
  children,
  initialCards = [],
  onHeroReady,
  quoteCount = 3,
}: HeroCarouselProviderProps) => {
  // The deck of cards (shuffled on init and when cycling through)
  const [deck, setDeck] = useState<HomeCard[]>(() => shuffleArray(initialCards));
  // Current position in the deck (0 = top of deck)
  const [deckPosition, setDeckPosition] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [departingCard, setDepartingCard] = useState<HomeCard | null>(null);

  const readyCalledRef = useRef(false);
  const progressRef = useRef(0);

  // Get 3 visible cards starting from current deck position
  // Wrap around to the beginning if needed
  const getVisibleCards = useCallback((): HomeCard[] => {
    if (deck.length === 0) {
      return [];
    }

    const cards: HomeCard[] = [];
    for (let i = 0; i < Math.min(3, deck.length); i++) {
      const index = (deckPosition + i) % deck.length;
      cards.push(deck[index]);
    }
    return cards;
  }, [deck, deckPosition]);

  const visibleCards = getVisibleCards();
  const currentCard = visibleCards[0] || null;

  const setHovering = useCallback((hovering: boolean) => {
    setIsPaused(hovering);
  }, []);

  const onReady = useCallback(() => {
    if (!readyCalledRef.current) {
      readyCalledRef.current = true;
      onHeroReady?.();
    }
  }, [onHeroReady]);

  // Advance to next card in the deck
  const advance = useCallback(() => {
    // Set current card as departing before advancing
    if (currentCard) {
      setDepartingCard(currentCard);
      // Clear departing card after animation completes
      setTimeout(() => {
        setDepartingCard(null);
      }, 300);
    }

    // Move to next position, wrapping around
    setDeckPosition((prev) => {
      const nextPosition = (prev + 1) % deck.length;
      // Reshuffle when we complete a full cycle (back to position 0)
      if (nextPosition === 0 && deck.length > 0) {
        setDeck((currentDeck) => shuffleArray(currentDeck));
      }
      return nextPosition;
    });

    setQuoteIndex((prev) => (prev + 1) % quoteCount);
    setProgress(0);
    progressRef.current = 0;
  }, [quoteCount, currentCard, deck.length]);

  // Progress timer
  useEffect(() => {
    if (isPaused || !currentCard) {
      return;
    }

    const interval = setInterval(() => {
      progressRef.current += (PROGRESS_UPDATE_MS / ROTATION_INTERVAL_MS) * 100;

      if (progressRef.current >= 100) {
        advance();
      } else {
        setProgress(progressRef.current);
      }
    }, PROGRESS_UPDATE_MS);

    return () => clearInterval(interval);
  }, [isPaused, currentCard, advance]);

  // Signal ready once first card is available
  useEffect(() => {
    if (initialCards.length > 0) {
      onReady();
    }
  }, [initialCards.length, onReady]);

  const value: HeroCarouselContextValue = {
    visibleCards,
    currentCard,
    departingCard,
    quoteIndex,
    progress,
    isPaused,
    setHovering,
    onReady,
    advance,
  };

  return (
    <HeroCarouselContext.Provider value={value}>
      {children}
    </HeroCarouselContext.Provider>
  );
};
