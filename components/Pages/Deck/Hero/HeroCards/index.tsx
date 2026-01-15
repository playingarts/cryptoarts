import { FC, forwardRef, HTMLAttributes, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { usePalette } from "../../DeckPaletteContext";
import { useHeroCardsContext } from "../../HeroCardsContext";
import FlippingHeroCard from "./FlippingHeroCard";
import { HeroCardProps } from "../../../../../pages/[deckId]";
import { useCardsForDeck } from "../../../../../hooks/card";
import { useDeck } from "../../../../../hooks/deck";

/** Convert standard img URL to hi-res version (matches Card component logic for hero size) */
const toHiResUrl = (imgUrl: string): string => {
  // If it's already hi-res or doesn't have the -big/ pattern, return as-is
  if (imgUrl.includes("-big-hd/")) return imgUrl;
  // Convert -big/ to -big-hd/
  return imgUrl.replace("-big/", "-big-hd/");
};

/**
 * Check if images are already in browser cache and preload if not.
 * Uses a 500ms timeout as a safety net - prefetched images should load near-instantly.
 * Returns abort function that stops network requests and prevents state updates.
 */
const waitForImages = (cards: HeroCardProps[]): { promise: Promise<void>; abort: () => void } => {
  let aborted = false;
  const images: HTMLImageElement[] = [];

  const promise = new Promise<void>((resolve) => {
    let loadedCount = 0;
    const totalImages = Math.min(cards.length, 2);

    // Quick timeout - if prefetch worked, images should load very fast from cache
    const timeout = setTimeout(() => {
      if (!aborted) resolve();
    }, 500);

    const onLoad = () => {
      if (aborted) return;
      loadedCount++;
      if (loadedCount >= totalImages) {
        clearTimeout(timeout);
        resolve();
      }
    };

    cards.slice(0, 2).forEach((card) => {
      const img = new Image();
      images.push(img); // Track for abort cleanup
      img.onload = onLoad;
      // Intentional: treat errors same as success - graceful degradation
      // We don't want to block the UI if an image fails to load
      img.onerror = onLoad;
      // Use hi-res URL to match what Card component will actually render
      img.src = toHiResUrl(card.img);
      // If already in browser cache, complete will be true immediately
      if (img.complete && img.naturalWidth > 0) {
        onLoad();
      }
    });
  });

  return {
    promise,
    abort: () => {
      aborted = true;
      // Actually stop network requests by clearing handlers and src
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = ""; // Stops the network request
      });
      images.length = 0; // Clear array to allow GC
    },
  };
};

// Card dimension constants (match Card component's hero size)
const CARD_DIMENSIONS = {
  outer: { width: 340, height: 478 },
  inner: { width: 330, height: 464 },
  borderRadius: 15,
} as const;

// Card position constants
const CARD_POSITIONS = {
  left: { left: 95, rotate: "-10deg", zIndex: 2 },
  right: { left: 275, rotate: "10deg", zIndex: 1 },
} as const;

const CARD_TOP = -90;

/** Wrapper component for positioned cards */
const CardWrapper: FC<{
  position: "left" | "right";
  children: React.ReactNode;
  animate?: boolean;
}> = ({ position, children, animate }) => {
  const pos = CARD_POSITIONS[position];
  // Stagger cards: left card first, right card after 0.15s
  const delay = position === "left" ? "0s" : "0.15s";
  return (
    <div
      css={[
        {
          position: "absolute",
          top: CARD_TOP,
          left: pos.left,
          rotate: pos.rotate,
          zIndex: pos.zIndex,
          transformOrigin: "bottom center",
        },
        animate && {
          opacity: 0,
          animation: `cardDropIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay} forwards`,
          "@keyframes cardDropIn": {
            "0%": {
              opacity: 0,
              transform: "translateY(-80px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        },
      ]}
    >
      {children}
    </div>
  );
};

/** Skeleton placeholder with shimmer animation */
const CardPlaceholder: FC<{
  position: "left" | "right";
  palette: "dark" | "light";
}> = ({ position, palette }) => (
  <CardWrapper position={position}>
    {/* Match Card component's outer container structure */}
    <div css={{ width: CARD_DIMENSIONS.outer.width, height: CARD_DIMENSIONS.outer.height, position: "relative" }}>
      <div
        css={{
          width: CARD_DIMENSIONS.inner.width,
          height: CARD_DIMENSIONS.inner.height,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: CARD_DIMENSIONS.borderRadius,
          overflow: "hidden",
          background:
            palette === "dark"
              ? "linear-gradient(90deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%)"
              : "linear-gradient(90deg, #d0d0d0 0%, #e8e8e8 50%, #d0d0d0 100%)",
          backgroundSize: "200% 100%",
          animation: "heroCardShimmer 1.5s infinite linear",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          "@keyframes heroCardShimmer": {
            "0%": { backgroundPosition: "200% 0" },
            "100%": { backgroundPosition: "-200% 0" },
          },
        }}
      />
    </div>
  </CardWrapper>
);

// Safety timeout - only trigger after a very long wait (network truly stuck)
// GraphQL can take 2-7+ seconds on cold start, so this must be generous
const FETCH_TIMEOUT_MS = 15000;

interface HeroCardsProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  heroCards?: HeroCardProps[];
}

const HeroCards = forwardRef<HTMLDivElement, HeroCardsProps>(
  ({ sticky = true, heroCards: ssrHeroCards, ...props }, ref) => {
    const { palette } = usePalette();
    const router = useRouter();
    const routerDeckId = router.query.deckId as string | undefined;

    // During fallback (router.isFallback = true), router.query is empty
    // Parse deckId from pathname to enable data fetching immediately
    const pathDeckId = useMemo(() => {
      if (typeof window === "undefined") return undefined;
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      return pathParts.length >= 1 ? pathParts[0] : undefined;
    }, [router.asPath]); // Re-compute when route changes

    // Use router query when available, fallback to pathname parsing
    const deckId = routerDeckId || pathDeckId;

    const { fetchCardsForDeck } = useHeroCardsContext();

    // Fetch deck to get _id for cards query
    const { deck } = useDeck({
      variables: { slug: deckId },
      skip: !deckId,
    });

    // Fetch all cards for the deck (for flipping animation)
    const { cards: allDeckCards } = useCardsForDeck(
      deck ? { variables: { deck: deck._id } } : { skip: true }
    );

    // Combined display state to ensure atomic updates (prevents race conditions)
    const [displayState, setDisplayState] = useState<{
      deckId: string | undefined;
      cards: HeroCardProps[] | undefined;
    }>({ deckId: undefined, cards: undefined });
    // Track if we're fetching for a new deck
    const [isFetching, setIsFetching] = useState(false);
    // Track if images are ready
    const [imagesReady, setImagesReady] = useState(false);
    // Track fetch failures for retry UI
    const [fetchFailed, setFetchFailed] = useState(false);
    // Request ID to ensure only latest request updates state
    const requestIdRef = useRef(0);
    // Ref to track timeout for cleanup
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    // Ref to track abort function for waitForImages
    const waitAbortRef = useRef<(() => void) | null>(null);
    // Ref to track displayState in effect without causing re-runs
    const displayStateRef = useRef(displayState);
    displayStateRef.current = displayState;

    // Check if SSR cards are valid for current deck
    const ssrCardsValid = !!(
      ssrHeroCards &&
      ssrHeroCards.length >= 2 &&
      ssrHeroCards[0].deckSlug === deckId
    );

    // Retry handler for failed fetches
    const handleRetry = useCallback(() => {
      if (!deckId) return;
      setFetchFailed(false);
      // Increment requestId to trigger a new fetch
      requestIdRef.current++;
      // Force re-run of effect by clearing state
      setDisplayState({ deckId: undefined, cards: undefined });
    }, [deckId]);

    // Effect: Handle deck changes reactively
    useEffect(() => {
      if (!deckId) return;

      // Use ref to read display state without it being a dependency
      const currentState = displayStateRef.current;

      // If we already have valid displayed cards for this deck, do nothing
      if (currentState.deckId === deckId && currentState.cards && currentState.cards[0]?.deckSlug === deckId) {
        return;
      }

      // If SSR cards are valid for this deck, use them immediately
      if (ssrCardsValid && ssrHeroCards) {
        setDisplayState({ deckId, cards: ssrHeroCards });
        setImagesReady(true);
        setIsFetching(false);
        setFetchFailed(false);
        return;
      }

      // Start fetching for new deck
      const currentRequestId = ++requestIdRef.current;
      const targetDeck = deckId; // Capture for closure

      setIsFetching(true);
      setFetchFailed(false);

      // Clear displayed cards if they're for a different deck
      if (currentState.cards && currentState.cards[0]?.deckSlug !== deckId) {
        setDisplayState({ deckId: undefined, cards: undefined });
        setImagesReady(false);
      }

      // Abort any pending waitForImages
      if (waitAbortRef.current) {
        waitAbortRef.current();
        waitAbortRef.current = null;
      }

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Safety timeout - only for truly stuck requests (network issues)
      // GraphQL can take 2-7+ seconds on cold start, so this is generous
      timeoutRef.current = setTimeout(() => {
        if (requestIdRef.current === currentRequestId) {
          setIsFetching(false);
          setFetchFailed(true);
        }
      }, FETCH_TIMEOUT_MS);

      fetchCardsForDeck(targetDeck)
        .then(async (cards) => {
          // Check if this request is still the latest
          if (requestIdRef.current !== currentRequestId) {
            return; // Stale request, ignore
          }

          if (cards && cards.length >= 2) {
            // Wait for images to load before showing (with abort support)
            const { promise, abort } = waitForImages(cards);
            waitAbortRef.current = abort;
            await promise;

            // Re-check after async wait
            if (requestIdRef.current !== currentRequestId) {
              return; // Stale after image wait
            }

            // Atomically update both deckId and cards together
            setDisplayState({ deckId: targetDeck, cards });
            setImagesReady(true);
            setFetchFailed(false);
          } else {
            // No valid cards - mark as failed for retry
            if (requestIdRef.current === currentRequestId) {
              setFetchFailed(true);
            }
          }
        })
        .catch((error) => {
          // Only mark as failed for real errors, not aborts from navigation
          // AbortErrors are expected during rapid navigation and should NOT trigger Retry
          const isAbortError = error?.name === 'AbortError' || error?.code === 'ECONNRESET' || error?.message?.includes('aborted');
          if (requestIdRef.current === currentRequestId && !isAbortError) {
            setFetchFailed(true);
          }
        })
        .finally(() => {
          // Always clear fetching state for the current request
          if (requestIdRef.current === currentRequestId) {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            setIsFetching(false);
          }
        });

      return () => {
        // Abort waitForImages on cleanup
        if (waitAbortRef.current) {
          waitAbortRef.current();
          waitAbortRef.current = null;
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, [deckId, ssrCardsValid, ssrHeroCards, fetchCardsForDeck]);

    // Extract cards from combined state for rendering
    const displayedCards = displayState.cards;

    // Determine what to show
    // Require at least 2 cards for the hero display (left and right)
    const cardsMatchCurrentDeck = displayedCards && displayedCards.length >= 2 && displayedCards[0]?.deckSlug === deckId;
    const showCards = cardsMatchCurrentDeck && imagesReady;
    // Show retry UI when fetch failed and not currently fetching
    const showRetry = fetchFailed && !isFetching && !showCards;

    // Use allDeckCards when available, otherwise use displayedCards (cast to GQL.Card)
    // This ensures we always render FlippingHeroCard (not switch from Card to FlippingHeroCard)
    // which prevents the visual flash on load
    const cardsForFlipping = allDeckCards && allDeckCards.length > 2
      ? allDeckCards
      : displayedCards?.map(c => c as unknown as GQL.Card) ?? [];

    // Animation key: changes whenever displayedCards changes to re-trigger animation
    // Uses first card's _id to ensure animation plays on each new set of cards
    const animationKey = displayedCards?.[0]?._id ?? "none";

    return (
      <div
        ref={ref}
        css={[
          {
            gridColumn: "span 6",
            alignSelf: "start",
            marginBottom: 30,
            top: 160,
            willChange: "transform",
          },
          sticky && {
            position: "sticky",
          },
        ]}
        {...props}
      >
        {showCards && displayedCards ? (
          <>
            {/* Left card (front) - animates first */}
            {/* Always use FlippingHeroCard to prevent flash when allDeckCards loads */}
            <CardWrapper key={`left-${animationKey}`} position="left" animate>
              <FlippingHeroCard
                cards={cardsForFlipping}
                initialCard={displayedCards[0] as unknown as GQL.Card}
                animated
              />
            </CardWrapper>
            {/* Right card (back) - animates after 0.15s delay */}
            <CardWrapper key={`right-${animationKey}`} position="right" animate>
              <FlippingHeroCard
                cards={cardsForFlipping}
                initialCard={displayedCards[1] as unknown as GQL.Card}
              />
            </CardWrapper>
          </>
        ) : showRetry ? (
          <>
            {/* Retry UI - styled like skeleton but with retry button */}
            <CardWrapper position="right">
              <div css={{ width: CARD_DIMENSIONS.outer.width, height: CARD_DIMENSIONS.outer.height, position: "relative" }}>
                <div
                  css={{
                    width: CARD_DIMENSIONS.inner.width,
                    height: CARD_DIMENSIONS.inner.height,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: CARD_DIMENSIONS.borderRadius,
                    background: palette === "dark" ? "#1a1a1a" : "#e8e8e8",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                />
              </div>
            </CardWrapper>
            <CardWrapper position="left">
              <div css={{ width: CARD_DIMENSIONS.outer.width, height: CARD_DIMENSIONS.outer.height, position: "relative" }}>
                <div
                  css={{
                    width: CARD_DIMENSIONS.inner.width,
                    height: CARD_DIMENSIONS.inner.height,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: CARD_DIMENSIONS.borderRadius,
                    background: palette === "dark" ? "#1a1a1a" : "#e8e8e8",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={handleRetry}
                    css={{
                      padding: "12px 24px",
                      borderRadius: 8,
                      border: "none",
                      background: palette === "dark" ? "#333" : "#fff",
                      color: palette === "dark" ? "#fff" : "#333",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      "&:hover": {
                        background: palette === "dark" ? "#444" : "#f5f5f5",
                      },
                    }}
                  >
                    Retry
                  </button>
                </div>
              </div>
            </CardWrapper>
          </>
        ) : (
          <>
            {/* Skeleton placeholders */}
            <CardPlaceholder position="right" palette={palette} />
            <CardPlaceholder position="left" palette={palette} />
          </>
        )}
      </div>
    );
  }
);

HeroCards.displayName = "HeroCards";

export default HeroCards;
