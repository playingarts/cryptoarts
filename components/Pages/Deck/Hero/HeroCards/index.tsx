import { FC, forwardRef, HTMLAttributes, useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { usePalette } from "../../DeckPaletteContext";
import { useHeroCardsContext } from "../../HeroCardsContext";
import Card from "../../../../Card";
import { HeroCardProps } from "../../../../../pages/[deckId]";

/** Check if images are already in browser cache and preload if not */
const waitForImages = (cards: HeroCardProps[]): Promise<void> => {
  return new Promise((resolve) => {
    let loadedCount = 0;
    const totalImages = Math.min(cards.length, 2);

    // Quick timeout - if prefetch worked, images should load very fast from cache
    const timeout = setTimeout(() => resolve(), 500);

    const onLoad = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        clearTimeout(timeout);
        resolve();
      }
    };

    cards.slice(0, 2).forEach((card) => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = card.img;
      // If already in browser cache, complete will be true immediately
      if (img.complete && img.naturalWidth > 0) {
        onLoad();
      }
    });
  });
};

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
  fadeIn?: boolean;
}> = ({ position, children, fadeIn }) => {
  const pos = CARD_POSITIONS[position];
  // Stagger right card slightly for a nicer reveal effect
  const delay = position === "right" ? "0.1s" : "0s";
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
        fadeIn && {
          opacity: 0,
          animation: `cardFadeIn 0.5s ease-out ${delay} forwards`,
          "@keyframes cardFadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px) scale(0.95)" },
            "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
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
    <div css={{ width: 340, height: 478, position: "relative" }}>
      <div
        css={{
          width: 330,
          height: 464,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 15,
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
    const deckId = router.query.deckId as string | undefined;
    const { fetchCardsForDeck } = useHeroCardsContext();

    // Track the deck we're currently displaying cards for
    const [displayedDeckId, setDisplayedDeckId] = useState<string | undefined>(undefined);
    // Cards for the displayed deck
    const [displayedCards, setDisplayedCards] = useState<HeroCardProps[] | undefined>(undefined);
    // Track if we're fetching for a new deck
    const [isFetching, setIsFetching] = useState(false);
    // Track if images are ready
    const [imagesReady, setImagesReady] = useState(false);
    // Track fetch failures for retry UI
    const [fetchFailed, setFetchFailed] = useState(false);
    // Request ID to ensure only latest request updates state
    const requestIdRef = useRef(0);

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
      setDisplayedCards(undefined);
      setDisplayedDeckId(undefined);
    }, [deckId]);

    // Effect: Handle deck changes reactively
    useEffect(() => {
      if (!deckId) return;

      // If we already have valid displayed cards for this deck, do nothing
      if (displayedDeckId === deckId && displayedCards && displayedCards[0]?.deckSlug === deckId) {
        return;
      }

      // If SSR cards are valid for this deck, use them immediately
      if (ssrCardsValid && ssrHeroCards) {
        setDisplayedDeckId(deckId);
        setDisplayedCards(ssrHeroCards);
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
      if (displayedCards && displayedCards[0]?.deckSlug !== deckId) {
        setDisplayedCards(undefined);
        setImagesReady(false);
      }

      // Safety timeout - only for truly stuck requests (network issues)
      // GraphQL can take 2-7+ seconds on cold start, so this is generous
      const timeoutId = setTimeout(() => {
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
            // Wait for images to load before showing
            await waitForImages(cards);

            // Re-check after async wait
            if (requestIdRef.current !== currentRequestId) {
              return; // Stale after image wait
            }

            setDisplayedDeckId(targetDeck);
            setDisplayedCards(cards);
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
            clearTimeout(timeoutId);
            setIsFetching(false);
          }
        });

      return () => {
        clearTimeout(timeoutId);
      };
    }, [deckId, ssrCardsValid, ssrHeroCards, displayedDeckId, displayedCards, fetchCardsForDeck]);

    // Determine what to show
    const cardsMatchCurrentDeck = displayedCards && displayedCards[0]?.deckSlug === deckId;
    const showCards = cardsMatchCurrentDeck && imagesReady;
    // Fade in only when transitioning from skeleton to cards (not on initial SSR load)
    const shouldFadeIn = showCards && !ssrCardsValid;
    // Show retry UI when fetch failed and not currently fetching
    const showRetry = fetchFailed && !isFetching && !showCards;

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
            {/* Right card (back) - interactive for 3D tilt effect on hover */}
            <CardWrapper position="right" fadeIn={shouldFadeIn}>
              <Card
                card={displayedCards[1] as unknown as GQL.Card}
                size="hero"
                noArtist
                noFavorite
                interactive
                priority
              />
            </CardWrapper>
            {/* Left card (front) - interactive for 3D tilt effect on hover */}
            <CardWrapper position="left" fadeIn={shouldFadeIn}>
              <Card
                card={displayedCards[0] as unknown as GQL.Card}
                size="hero"
                noArtist
                noFavorite
                interactive
                priority
              />
            </CardWrapper>
          </>
        ) : showRetry ? (
          <>
            {/* Retry UI - styled like skeleton but with retry button */}
            <CardWrapper position="right">
              <div css={{ width: 340, height: 478, position: "relative" }}>
                <div
                  css={{
                    width: 330,
                    height: 464,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: 15,
                    background: palette === "dark" ? "#1a1a1a" : "#e8e8e8",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                />
              </div>
            </CardWrapper>
            <CardWrapper position="left">
              <div css={{ width: 340, height: 478, position: "relative" }}>
                <div
                  css={{
                    width: 330,
                    height: 464,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: 15,
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
