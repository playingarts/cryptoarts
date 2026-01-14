import { FC, HTMLAttributes, useState, useCallback, memo, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ArrowButton from "../../../../Buttons/ArrowButton";
import NavButton from "../../../../Buttons/NavButton";
import Card from "../../../../Card";
import Label from "../../../../Label";
import { useLoadCollectionCards } from "../../../../../hooks/card";
import {
  CARD_PREVIEW_TOP,
  CARD_PREVIEW_GAP,
  LABELS_PADDING,
  LABELS_GAP,
  FOOTER_PADDING,
} from "../constants";

// Number of cards to preload ahead
const PRELOAD_AHEAD = 3;
// Batch size for fetching new random cards
const FETCH_BATCH_SIZE = 6;

// Card skeleton dimensions (nano size)
const CARD_SKELETON_WIDTH = 184;
const CARD_SKELETON_HEIGHT = 260;
const CARD_SKELETON_RADIUS = 10;

// Helper to preload an image
const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

// Card skeleton component
const CardSkeleton: FC<{ palette: "light" | "dark" }> = ({ palette }) => (
  <div
    css={{
      width: CARD_SKELETON_WIDTH,
      height: CARD_SKELETON_HEIGHT,
      borderRadius: CARD_SKELETON_RADIUS,
      background:
        palette === "dark"
          ? "linear-gradient(45deg, #2d2d2d 0%, #3d3d3d 50%, #2d2d2d 100%)"
          : "linear-gradient(45deg, #e8e8e8 0%, #f5f5f5 50%, #e8e8e8 100%)",
      backgroundSize: "200% 200%",
      animation: "shimmer 1.5s ease-in-out infinite",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "200% 0%" },
        "100%": { backgroundPosition: "-200% 0%" },
      },
    }}
  />
);

interface CollectionItemProps extends HTMLAttributes<HTMLElement> {
  product?: GQL.Product;
  paletteOnHover?: "light" | "dark";
  onCardClick?: (deckSlug: string, artistSlug: string, cardImg: string) => void;
  /** Priority loading for above-fold items */
  priority?: boolean;
  /** Current deck slug - if matches product deck, "View" just closes instead of navigating */
  currentDeckSlug?: string;
  /** Called when clicking "View" on current deck (to close menu) */
  onClose?: () => void;
}

// Minimal card type for our buffer
type BufferCard = Pick<GQL.Card, "_id" | "img"> & { artist: Pick<GQL.Artist, "slug"> };

const CollectionItem: FC<CollectionItemProps> = memo(({
  product,
  paletteOnHover = "light",
  onCardClick,
  priority = false,
  currentDeckSlug,
  onClose,
  ...props
}) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [deckImageLoaded, setDeckImageLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(priority); // Priority items start visible
  const containerRef = useRef<HTMLDivElement>(null);
  const prefetchedRef = useRef(false);

  // Card buffer - accumulates cards as user navigates
  const [cardBuffer, setCardBuffer] = useState<BufferCard[]>([]);
  const [readyIndices, setReadyIndices] = useState<Set<number>>(new Set()); // Images that are loaded
  const preloadedIndicesRef = useRef<Set<number>>(new Set());
  const isFetchingRef = useRef(false);
  const seenCardIdsRef = useRef<Set<string>>(new Set());

  // Lazy load cards
  const { loadCollectionCards } = useLoadCollectionCards();
  const hasInitializedRef = useRef(false);
  const currentDeckIdRef = useRef<string | undefined>(undefined);

  // Reset state when product/deck changes
  useEffect(() => {
    const newDeckId = product?.deck?._id;
    if (currentDeckIdRef.current && currentDeckIdRef.current !== newDeckId) {
      // Deck changed - reset all card state
      setCardIndex(0);
      setCardBuffer([]);
      setReadyIndices(new Set());
      preloadedIndicesRef.current = new Set();
      seenCardIdsRef.current = new Set();
      hasInitializedRef.current = false;
      setDeckImageLoaded(false);
    }
    currentDeckIdRef.current = newDeckId;
  }, [product?.deck?._id]);

  // IntersectionObserver for lazy loading deck images
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" } // Start loading 100px before entering viewport
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Fetch initial random cards - immediately for priority items, or when deck image loads
  useEffect(() => {
    // For priority items, start fetching immediately (menu scenario)
    // For non-priority items, wait for deck image to load first
    const shouldFetch = priority ? isInViewport : deckImageLoaded;

    if (shouldFetch && !hasInitializedRef.current && product?.deck?._id) {
      hasInitializedRef.current = true;

      const fetchInitialCards = async () => {
        isFetchingRef.current = true;
        try {
          const result = await loadCollectionCards({
            variables: {
              deck: product.deck?._id,
              limit: FETCH_BATCH_SIZE,
              shuffle: true,
            },
          });

          if (result.data?.cards) {
            const cards = result.data.cards as BufferCard[];
            cards.forEach((card) => seenCardIdsRef.current.add(card._id));
            setCardBuffer(cards);
          }
        } finally {
          isFetchingRef.current = false;
        }
      };

      // For priority items, fetch immediately; otherwise use idle callback
      if (priority) {
        fetchInitialCards();
      } else if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(() => fetchInitialCards(), { timeout: 2000 });
      } else {
        // Fallback for Safari - use setTimeout with small delay
        setTimeout(fetchInitialCards, 100);
      }
    }
  }, [deckImageLoaded, isInViewport, priority, product?.deck?._id, loadCollectionCards]);

  // Preload first 3 card images when buffer is initialized (non-blocking)
  useEffect(() => {
    if (cardBuffer.length === 0) return;

    const preloadInitial = async () => {
      for (let i = 0; i < Math.min(PRELOAD_AHEAD, cardBuffer.length); i++) {
        if (!preloadedIndicesRef.current.has(i) && cardBuffer[i]?.img) {
          await preloadImage(cardBuffer[i].img);
          preloadedIndicesRef.current.add(i);
          setReadyIndices((prev) => new Set(prev).add(i));
        }
      }
    };

    // Use requestIdleCallback for non-blocking preload
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => preloadInitial(), { timeout: 3000 });
    } else {
      setTimeout(preloadInitial, 200);
    }
  }, [cardBuffer]);

  // Fetch more cards when needed (rolling preload)
  const fetchMoreCards = useCallback(async () => {
    if (isFetchingRef.current || !product?.deck?._id) return;

    isFetchingRef.current = true;

    try {
      const result = await loadCollectionCards({
        variables: {
          deck: product.deck._id,
          limit: FETCH_BATCH_SIZE,
          shuffle: true,
        },
      });

      if (result.data?.cards) {
        const newCards = result.data.cards.filter(
          (card) => !seenCardIdsRef.current.has(card._id)
        ) as BufferCard[];

        if (newCards.length > 0) {
          newCards.forEach((card) => seenCardIdsRef.current.add(card._id));
          setCardBuffer((prev) => [...prev, ...newCards]);
        }
      }
    } finally {
      isFetchingRef.current = false;
    }
  }, [product?.deck?._id, loadCollectionCards]);

  // Preload next cards and fetch more if needed
  useEffect(() => {
    if (cardBuffer.length === 0) return;

    const preloadAhead = async () => {
      // Preload next PRELOAD_AHEAD cards from current index
      for (let i = 1; i <= PRELOAD_AHEAD; i++) {
        const targetIndex = cardIndex + i;
        if (targetIndex < cardBuffer.length && !preloadedIndicesRef.current.has(targetIndex)) {
          if (cardBuffer[targetIndex]?.img) {
            await preloadImage(cardBuffer[targetIndex].img);
            preloadedIndicesRef.current.add(targetIndex);
            setReadyIndices((prev) => new Set(prev).add(targetIndex));
          }
        }
      }

      // Fetch more cards if we're running low
      const cardsAhead = cardBuffer.length - cardIndex - 1;
      if (cardsAhead < PRELOAD_AHEAD && !isFetchingRef.current) {
        fetchMoreCards();
      }
    };

    preloadAhead();
  }, [cardIndex, cardBuffer, fetchMoreCards]);

  const handleDeckImageLoad = useCallback(() => {
    setDeckImageLoaded(true);
  }, []);

  // Memoized event handlers with prefetching
  const handleMouseEnter = useCallback(() => {
    setHover(true);
    // Prefetch deck page on hover for instant navigation
    if (!prefetchedRef.current && product?.deck?.slug) {
      prefetchedRef.current = true;
      const deckPath = `${process.env.NEXT_PUBLIC_BASELINK || ""}/${product.deck.slug}`;
      router.prefetch(deckPath);
    }
  }, [product?.deck?.slug, router]);
  const handleMouseLeave = useCallback(() => setHover(false), []);

  const handlePrevCard = useCallback(() => {
    setCardIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextCard = useCallback(() => {
    setCardIndex((prev) => (prev < cardBuffer.length - 1 ? prev + 1 : prev));
  }, [cardBuffer.length]);

  const handleCardClick = useCallback(() => {
    const currentCard = cardBuffer[cardIndex];
    if (product?.deck?.slug && currentCard?.artist?.slug && currentCard?.img) {
      onCardClick?.(product.deck.slug, currentCard.artist.slug, currentCard.img);
    }
  }, [cardIndex, cardBuffer, product?.deck?.slug, onCardClick]);

  const currentPalette = hover && paletteOnHover === "dark" ? "dark" : "light";

  const currentCard = cardBuffer[cardIndex];
  const isCurrentCardReady = readyIndices.has(cardIndex);
  const canGoPrev = cardIndex > 0;
  const canGoNext = cardIndex < cardBuffer.length - 1 || !isFetchingRef.current;

  return (
    <div
      ref={containerRef}
      css={(theme) => [
        {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: theme.transitions.fast("background"),
          // GPU acceleration for smooth animations
          willChange: hover ? "background" : "auto",
          // Skip rendering for off-screen items
          contentVisibility: "auto",
          containIntrinsicSize: "auto 450px", // Match ITEM_HEIGHT
          "> *": {
            transition: theme.transitions.fast("opacity"),
          },
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        },
        hover &&
          paletteOnHover === "dark" && {
            background: theme.colors.black,
          },
      ]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {product && (
        <>
          <div
            css={{
              padding: LABELS_PADDING,
              display: "flex",
              gap: LABELS_GAP,
            }}
            style={{ opacity: hover ? 1 : 0 }}
          >
            {product.deck?.labels?.map((label) => (
              <Label
                css={(theme) => [
                  paletteOnHover === "dark" && {
                    background: theme.colors.white_gray,
                    color: "white",
                  },
                ]}
                key={`${label}-${product._id}`}
              >
                {label}
              </Label>
            ))}
          </div>

          <div
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: CARD_PREVIEW_GAP,
              position: "absolute",
              top: CARD_PREVIEW_TOP,
              left: "50%",
              transform: "translateX(-50%)",
            }}
            style={{ opacity: hover ? 1 : 0 }}
          >
            <NavButton
              palette={currentPalette}
              css={{ rotate: "180deg", opacity: canGoPrev ? 1 : 0.3 }}
              onClick={canGoPrev ? handlePrevCard : undefined}
            />
            {currentCard && isCurrentCardReady ? (
              <Card
                noArtist
                noFavorite
                size="nano"
                card={currentCard as GQL.Card}
                onClick={handleCardClick}
                palette={currentPalette}
              />
            ) : (
              <CardSkeleton palette={currentPalette} />
            )}
            <NavButton
              palette={currentPalette}
              css={{ opacity: canGoNext ? 1 : 0.3 }}
              onClick={canGoNext ? handleNextCard : undefined}
            />
          </div>

          <div
            css={{
              padding: FOOTER_PADDING,
              display: "flex",
              justifyContent: "space-between",
            }}
            style={{ opacity: hover ? 1 : 0 }}
          >
            <ArrowButton
              href={currentDeckSlug === product.deck?.slug ? undefined : `${process.env.NEXT_PUBLIC_BASELINK || ""}/${product.deck?.slug}`}
              onClick={onClose}
              css={(theme) => [
                hover &&
                  paletteOnHover === "dark" && {
                    color: theme.colors.white75,
                  },
              ]}
              noColor
              base
              size="small"
            >
              View {product.title}
            </ArrowButton>
            <ArrowButton
              href={`${process.env.NEXT_PUBLIC_BASELINK || ""}/shop/${product.short?.toLowerCase().replace(/\s/g, "")}`}
              noColor
              base
              size="small"
              css={(theme) => [
                hover &&
                  paletteOnHover === "dark" && {
                    color: theme.colors.white75,
                  },
              ]}
            >
              Shop
            </ArrowButton>
          </div>
        </>
      )}
      {product?.deck && isInViewport && (
        <img
          src={product.image}
          alt={`${product.title} deck`}
          loading={priority ? "eager" : "lazy"}
          {...(priority && { fetchPriority: "high" as const })}
          onLoad={handleDeckImageLoad}
          css={(theme) => ({
            position: "absolute",
            left: 0,
            top: 0,
            objectFit: "contain",
            height: "100%",
            width: "100%",
            pointerEvents: "none",
            // GPU acceleration for opacity transition
            willChange: "opacity",
            // Only transition when fading in, instant fade out on hover
            transition: hover ? "none" : theme.transitions.slow("opacity"),
          })}
          style={{ opacity: hover ? 0 : deckImageLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
});

CollectionItem.displayName = "CollectionItem";

export default CollectionItem;
