import { FC, useState, useEffect, useRef, useCallback, useMemo } from "react";
import Card from "../../../../Card";

// Flip transition duration in ms
const FLIP_DURATION = 450;
const FLIP_DURATION_MANUAL = 225; // Faster for click interactions
// Min/max interval between flips
const MIN_INTERVAL = 3000;
const MAX_INTERVAL = 10000;

// Card dimensions (match Card component's hero size)
const CARD_DIMENSIONS = {
  width: 340,
  height: 478,
} as const;

/** Convert standard img URL to hi-res version for hero size */
const toHiResUrl = (imgUrl: string): string => {
  if (imgUrl.includes("-big-hd/")) return imgUrl;
  return imgUrl.replace("-big/", "-big-hd/");
};

/**
 * Module-level cache of preloaded hi-res image URLs.
 * Prevents memory accumulation from creating new Image() objects for already-loaded URLs.
 * Persists across component instances for the session lifetime.
 * Limited to MAX_CACHE_SIZE to prevent unbounded growth in long sessions.
 */
const MAX_CACHE_SIZE = 100;
const loadedImageCache = new Set<string>();

/**
 * Map of URLs currently being loaded to their pending promises.
 * Prevents duplicate network requests when multiple components/flips
 * try to preload the same image simultaneously.
 */
const pendingLoads = new Map<string, Promise<void>>();

/** Add URL to cache, evicting oldest entry if at capacity */
const addToCache = (url: string) => {
  // Skip if already cached to avoid unnecessary eviction
  if (loadedImageCache.has(url)) return;

  if (loadedImageCache.size >= MAX_CACHE_SIZE) {
    // Evict oldest entry (first item in Set iteration order)
    const firstKey = loadedImageCache.values().next().value;
    if (firstKey) loadedImageCache.delete(firstKey);
  }
  loadedImageCache.add(url);
};

/** Preload a single image, returns promise that resolves when loaded */
const preloadImage = (imgUrl: string): Promise<void> => {
  const hiResUrl = toHiResUrl(imgUrl);

  // Skip if already loaded
  if (loadedImageCache.has(hiResUrl)) {
    return Promise.resolve();
  }

  // Return existing promise if already loading (prevents duplicate requests)
  if (pendingLoads.has(hiResUrl)) {
    return pendingLoads.get(hiResUrl)!;
  }

  const loadPromise = new Promise<void>((resolve) => {
    const img = new Image();
    img.src = hiResUrl; // Set src first to avoid race condition

    // Check if already in browser cache (sync path)
    if (img.complete && img.naturalWidth > 0) {
      addToCache(hiResUrl);
      pendingLoads.delete(hiResUrl);
      resolve();
      return;
    }

    // Async path - image needs to load
    img.onload = () => {
      addToCache(hiResUrl);
      pendingLoads.delete(hiResUrl);
      resolve();
    };
    img.onerror = () => {
      pendingLoads.delete(hiResUrl);
      resolve(); // Don't block on errors
    };
  });

  pendingLoads.set(hiResUrl, loadPromise);
  return loadPromise;
};

interface FlippingHeroCardProps {
  /** All cards for the deck to cycle through */
  cards: GQL.Card[];
  /** Initial card to display */
  initialCard: GQL.Card;
  /** Whether flipping is paused (e.g., user scrolled away) */
  isPaused?: boolean;
}

const FlippingHeroCard: FC<FlippingHeroCardProps> = ({
  cards,
  initialCard,
  isPaused = false,
}) => {
  // All hooks must be called unconditionally (React rules of hooks)
  // Initialize back card to a different card than front
  const initialBackCard = cards.length > 1
    ? cards.find((c) => c._id !== initialCard._id) || cards[1]
    : initialCard;

  // Use state for cards so component re-renders when they change (needed for video animated prop)
  const [frontCard, setFrontCard] = useState(initialCard);
  const [backCard, setBackCard] = useState(initialBackCard);
  // Also keep refs for use in callbacks that need current values without re-creating
  const frontCardRef = useRef(initialCard);
  const backCardRef = useRef(initialBackCard);
  const rotationRef = useRef(0);

  // Track shown indices - reset when all have been shown
  const initialIndex = cards.findIndex((c) => c._id === initialCard._id);
  const initialBackIndex = cards.findIndex((c) => c._id === initialBackCard._id);
  const shownIndicesRef = useRef<Set<number>>(new Set([
    initialIndex >= 0 ? initialIndex : 0,
    initialBackIndex >= 0 ? initialBackIndex : 1
  ]));

  // Only rotation triggers re-render
  const [rotation, setRotation] = useState(0);
  // Scale for bounce effect on click
  const [scale, setScale] = useState(1);
  // Current flip duration (faster for manual clicks)
  const [flipDuration, setFlipDuration] = useState(FLIP_DURATION);

  // Internal pause states
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);

  // Ref for intersection observer
  const containerRef = useRef<HTMLDivElement>(null);

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Combined pause state (also paused when no cards to flip)
  const shouldPause = useMemo(
    () => isHovered || !isTabVisible || isPaused || !isInView || cards.length <= 1,
    [isHovered, isTabVisible, isPaused, isInView, cards.length]
  );
  const isPausedRef = useRef(shouldPause);
  isPausedRef.current = shouldPause;

  // Listen for viewport visibility with Intersection Observer
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMountedRef.current) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Listen for tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isMountedRef.current) {
        setIsTabVisible(!document.hidden);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const getRandomInterval = useCallback(
    () => MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL),
    []
  );

  const getNextIndex = useCallback((currentFrontCard: GQL.Card, currentBackCard: GQL.Card) => {
    // If all cards have been shown, reset the tracking
    if (shownIndicesRef.current.size >= cards.length) {
      // Keep only the current index so we don't repeat immediately
      const currentIdx = Math.floor((rotationRef.current / 180) % 2) === 0
        ? cards.findIndex((c) => c._id === currentFrontCard._id)
        : cards.findIndex((c) => c._id === currentBackCard._id);
      shownIndicesRef.current = new Set([currentIdx >= 0 ? currentIdx : 0]);
    }

    // Get available indices (not yet shown)
    const availableIndices: number[] = [];
    for (let i = 0; i < cards.length; i++) {
      if (!shownIndicesRef.current.has(i)) {
        availableIndices.push(i);
      }
    }

    // Safety check - fallback to first card if no indices available
    if (availableIndices.length === 0) {
      return 0;
    }

    // Pick a random one from available
    const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    shownIndicesRef.current.add(newIndex);

    return newIndex;
  }, [cards]);

  // Track if a flip is in progress to prevent double-clicks
  const isFlippingRef = useRef(false);

  const flip = useCallback(async (isManual = false) => {
    if (cards.length <= 1) return;

    // Prevent overlapping flips
    if (isFlippingRef.current) return;
    isFlippingRef.current = true;

    // Get the next card index using refs for current values
    const newIndex = getNextIndex(frontCardRef.current, backCardRef.current);
    const nextCard = cards[newIndex];

    // Safety check - should never happen since we check cards.length > 1 above
    if (!nextCard) {
      isFlippingRef.current = false;
      return;
    }

    // Preload the next card image BEFORE flipping
    await preloadImage(nextCard.img);

    // Check if component unmounted during preload
    // For manual flips, skip the pause check (user initiated)
    if (!isMountedRef.current || (!isManual && isPausedRef.current)) {
      isFlippingRef.current = false;
      return;
    }

    const isShowingFront = (rotationRef.current / 180) % 2 === 0;

    // Set the back face with the preloaded card (update both ref and state)
    if (isShowingFront) {
      backCardRef.current = nextCard;
      setBackCard(nextCard);
    } else {
      frontCardRef.current = nextCard;
      setFrontCard(nextCard);
    }

    // Set duration based on manual vs auto flip
    const duration = isManual ? FLIP_DURATION_MANUAL : FLIP_DURATION;
    setFlipDuration(duration);

    // Use requestAnimationFrame to ensure DOM has updated before rotating
    requestAnimationFrame(() => {
      rotationRef.current += 180;
      setRotation(rotationRef.current);
      // Allow next flip after animation completes
      setTimeout(() => {
        isFlippingRef.current = false;
      }, duration);
    });
  }, [getNextIndex, cards]);

  // Click handler for manual flip with bounce effect
  const handleClick = useCallback(() => {
    if (cards.length <= 1) return; // No flipping if only one card
    // Trigger bounce animation
    setScale(1.05);
    setTimeout(() => setScale(1), 150);
    flip(true);
  }, [flip, cards.length]);

  // Animation loop
  useEffect(() => {
    if (cards.length <= 1) return;

    let timeoutId: NodeJS.Timeout;
    let isActive = true;

    const scheduleNextFlip = () => {
      if (!isActive) return;

      const interval = getRandomInterval();
      timeoutId = setTimeout(async () => {
        if (!isActive) return;

        if (!isPausedRef.current) {
          await flip();
        }
        // Check isActive again after await to prevent scheduling after unmount
        if (isActive) {
          scheduleNextFlip();
        }
      }, interval);
    };

    // Initial random delay before first flip
    const initialDelay = getRandomInterval();
    timeoutId = setTimeout(async () => {
      if (!isActive) return;

      if (!isPausedRef.current) {
        await flip();
      }
      // Check isActive again after await to prevent scheduling after unmount
      if (isActive) {
        scheduleNextFlip();
      }
    }, initialDelay);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [cards.length, flip, getRandomInterval]);

  // Empty or single card - render static card without flip capability
  if (cards.length === 0) {
    return (
      <div css={{ width: CARD_DIMENSIONS.width, height: CARD_DIMENSIONS.height }}>
        <Card card={initialCard} size="hero" noArtist noFavorite interactive={false} animated={!!initialCard.video} priority />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      css={{
        perspective: "1000px",
        width: CARD_DIMENSIONS.width,
        height: CARD_DIMENSIONS.height,
        cursor: "pointer",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        style={{
          transition: `transform ${flipDuration}ms ease-in-out`,
          transform: `rotateY(${rotation}deg) scale(${scale})`,
        }}
      >
        {/* Front face */}
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Card
            card={frontCard}
            size="hero"
            noArtist
            noFavorite
            interactive={false}
            animated={!!frontCard.video}
            priority
          />
        </div>
        {/* Back face */}
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card
            card={backCard}
            size="hero"
            noArtist
            noFavorite
            interactive={false}
            animated={!!backCard.video}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default FlippingHeroCard;
