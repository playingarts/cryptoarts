"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  useMemo,
} from "react";

const ROTATION_INTERVAL = 10000; // 10 seconds
const BUFFER_SIZE = 3; // Always keep 3 cards preloaded

type HomeCard = {
  _id: string;
  img: string;
  cardBackground: string;
};

type PreloadedCard = HomeCard & {
  imageLoaded: boolean;
};

type HeroCarouselState = {
  // Current card being displayed
  currentCard: HomeCard | null;
  // Progress from 0 to 1 for the current rotation
  progress: number;
  // Whether rotation is paused
  isPaused: boolean;
  // Quote index (cycles through 0-4)
  quoteIndex: number;
};

type HeroCarouselActions = {
  // Advance to next card
  advance: () => void;
  // Pause rotation (hover, tab hidden)
  pause: () => void;
  // Resume rotation
  resume: () => void;
  // Set hover state
  setHovering: (hovering: boolean) => void;
  // Signal that hero section is ready
  onReady: () => void;
};

type HeroCarouselContextValue = HeroCarouselState & HeroCarouselActions;

const HeroCarouselContext = createContext<HeroCarouselContextValue | null>(null);

export const useHeroCarousel = () => {
  const context = useContext(HeroCarouselContext);
  if (!context) {
    throw new Error("useHeroCarousel must be used within HeroCarouselProvider");
  }
  return context;
};

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Preload an image and return a promise
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

type HeroCarouselProviderProps = {
  children: ReactNode;
  initialCards?: HomeCard[];
  onHeroReady?: () => void;
};

export const HeroCarouselProvider = ({
  children,
  initialCards = [],
  onHeroReady,
}: HeroCarouselProviderProps) => {
  // Buffer of preloaded cards (sliding window)
  const [buffer, setBuffer] = useState<PreloadedCard[]>(() =>
    initialCards.map((card, i) => ({
      ...card,
      imageLoaded: i === 0, // First card is assumed loaded (SSR)
    }))
  );

  // Current index within the buffer
  const [currentIndex, setCurrentIndex] = useState(0);

  // Progress for the current rotation (0 to 1)
  const [progress, setProgress] = useState(0);

  // Pause states
  const [isHovering, setIsHovering] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Quote index (cycles through available quotes)
  const [quoteIndex, setQuoteIndex] = useState(0);
  const QUOTE_COUNT = 3; // Number of quotes available

  // Ready state
  const readyCalledRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Refs for animation frame
  const lastTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Fetch state for loading more cards
  const [isFetching, setIsFetching] = useState(false);
  const fetchedIdsRef = useRef<Set<string>>(new Set(initialCards.map((c) => c._id)));

  // Computed pause state
  const isPaused = isHovering || isTabHidden || reducedMotion;

  // Current card
  const currentCard = buffer[currentIndex] || null;

  // Check if next card is ready
  const isNextReady = useMemo(() => {
    const nextIndex = (currentIndex + 1) % buffer.length;
    return buffer[nextIndex]?.imageLoaded ?? false;
  }, [buffer, currentIndex]);

  // Fetch more cards from the server
  const fetchMoreCards = useCallback(async () => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetch("/api/v1/home-cards?count=3");
      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }

      const newCards: HomeCard[] = await response.json();

      // Filter out cards we already have
      const uniqueNewCards = newCards.filter(
        (card) => !fetchedIdsRef.current.has(card._id)
      );

      if (uniqueNewCards.length > 0) {
        // Add to fetched IDs
        uniqueNewCards.forEach((card) => fetchedIdsRef.current.add(card._id));

        // Add to buffer as not-yet-loaded
        setBuffer((prev) => [
          ...prev,
          ...uniqueNewCards.map((card) => ({ ...card, imageLoaded: false })),
        ]);

        // Start preloading images
        uniqueNewCards.forEach((card) => {
          preloadImage(card.img)
            .then(() => {
              setBuffer((prev) =>
                prev.map((c) =>
                  c._id === card._id ? { ...c, imageLoaded: true } : c
                )
              );
            })
            .catch(() => {
              // On failure, still mark as "loaded" to avoid blocking
              // (shows placeholder or broken image instead of freezing)
              setBuffer((prev) =>
                prev.map((c) =>
                  c._id === card._id ? { ...c, imageLoaded: true } : c
                )
              );
            });
        });
      }
    } catch (error) {
      // Graceful failure - carousel continues with existing cards
      console.warn("Failed to fetch more cards:", error);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching]);

  // Advance to next card
  const advance = useCallback(() => {
    setBuffer((prevBuffer) => {
      const nextIndex = currentIndex + 1;

      // If next card exists and is loaded, advance
      if (nextIndex < prevBuffer.length && prevBuffer[nextIndex]?.imageLoaded) {
        setCurrentIndex(nextIndex);
        setQuoteIndex((prev) => (prev + 1) % QUOTE_COUNT);
        setProgress(0);

        // Trim buffer: keep only current and future cards (max BUFFER_SIZE)
        if (nextIndex > 0) {
          return prevBuffer.slice(nextIndex);
        }
      }

      return prevBuffer;
    });

    // Reset current index after buffer trim
    setCurrentIndex(0);
  }, [currentIndex]);

  // Pause/resume controls
  const pause = useCallback(() => setIsHovering(true), []);
  const resume = useCallback(() => setIsHovering(false), []);
  const setHovering = useCallback((hovering: boolean) => setIsHovering(hovering), []);

  // Signal ready
  const onReady = useCallback(() => {
    if (!readyCalledRef.current) {
      readyCalledRef.current = true;
      setIsReady(true);
      onHeroReady?.();
    }
  }, [onHeroReady]);

  // Preload initial cards' images (except first which is SSR)
  useEffect(() => {
    if (initialCards.length > 1) {
      initialCards.slice(1).forEach((card) => {
        preloadImage(card.img)
          .then(() => {
            setBuffer((prev) =>
              prev.map((c) =>
                c._id === card._id ? { ...c, imageLoaded: true } : c
              )
            );
          })
          .catch(() => {
            // Mark as loaded anyway to avoid blocking
            setBuffer((prev) =>
              prev.map((c) =>
                c._id === card._id ? { ...c, imageLoaded: true } : c
              )
            );
          });
      });
    }

    // Signal ready once first card is available
    if (initialCards.length > 0) {
      onReady();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally run only on mount with initial values

  // Check reduced motion preference
  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: { matches: boolean }) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (isNextReady) {
          advance();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advance, isNextReady]);

  // Auto-rotation timer with progress
  useEffect(() => {
    if (isPaused || !isReady || reducedMotion) {
      lastTimeRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const tick = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;
      const newProgress = Math.min(elapsed / ROTATION_INTERVAL, 1);

      setProgress(newProgress);

      if (newProgress >= 1 && isNextReady) {
        advance();
        lastTimeRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, isReady, reducedMotion, advance, isNextReady]);

  // Fetch more cards when buffer is running low
  useEffect(() => {
    const remainingCards = buffer.length - currentIndex;
    if (remainingCards <= BUFFER_SIZE && !isFetching) {
      fetchMoreCards();
    }
  }, [buffer.length, currentIndex, isFetching, fetchMoreCards]);

  const value: HeroCarouselContextValue = {
    currentCard,
    progress,
    isPaused,
    quoteIndex,
    advance,
    pause,
    resume,
    setHovering,
    onReady,
  };

  return (
    <HeroCarouselContext.Provider value={value}>
      {children}
    </HeroCarouselContext.Provider>
  );
};
