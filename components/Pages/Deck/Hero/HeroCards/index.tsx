import { FC, forwardRef, HTMLAttributes, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { usePalette } from "../../DeckPaletteContext";
import { useHeroCardsContext } from "../../HeroCardsContext";
import Card from "../../../../Card";
import { HeroCardProps } from "../../../../../pages/[deckId]";

// Card position constants
const CARD_POSITIONS = {
  left: { left: 95, rotate: "-10deg", zIndex: 2 },
  right: { left: 275, rotate: "10deg", zIndex: 1 },
} as const;

const CARD_TOP = -100;

/** Wrapper component for positioned cards */
const CardWrapper: FC<{
  position: "left" | "right";
  children: React.ReactNode;
  fadeIn?: boolean;
}> = ({ position, children, fadeIn }) => {
  const pos = CARD_POSITIONS[position];
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
          animation: "cardFadeIn 0.4s ease-out forwards",
          "@keyframes cardFadeIn": {
            "0%": { opacity: 0, transform: "translateY(10px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
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
              ? "linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)"
              : "linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite linear",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          "@keyframes shimmer": {
            "0%": { backgroundPosition: "200% 0" },
            "100%": { backgroundPosition: "-200% 0" },
          },
        }}
      />
    </div>
  </CardWrapper>
);

interface HeroCardsProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  heroCards?: HeroCardProps[];
}

// Track if initial SSR cards have been consumed (persists across HeroCards remounts)
let ssrCardsConsumed = false;

const HeroCards = forwardRef<HTMLDivElement, HeroCardsProps>(
  ({ sticky = true, heroCards: ssrHeroCards, ...props }, ref) => {
    const { palette } = usePalette();
    const router = useRouter();
    const deckId = router.query.deckId as string | undefined;
    const { fetchCardsForDeck } = useHeroCardsContext();

    // Track which deck we've fetched cards for (client-side navigation only)
    const fetchedForDeckRef = useRef<string | null>(null);

    // State for cards fetched during client-side navigation
    const [fetchedCards, setFetchedCards] = useState<HeroCardProps[] | undefined>(undefined);

    // Track if fetch failed (for retry logic)
    const [fetchFailed, setFetchFailed] = useState(false);

    // SSR cards are only valid on FIRST mount (initial page load/hydration)
    // After that, always fetch fresh random cards for variety
    const ssrCardsMatchDeck = ssrHeroCards &&
      ssrHeroCards.length >= 2 &&
      ssrHeroCards[0].deckSlug === deckId;
    const ssrCardsAreValid = ssrCardsMatchDeck && !ssrCardsConsumed;

    // Mark SSR cards as consumed after first use
    if (ssrCardsAreValid) {
      ssrCardsConsumed = true;
    }

    // Effect to fetch cards during client-side navigation (when SSR data is stale/unavailable)
    useEffect(() => {
      if (!deckId) return;

      // If we have valid SSR data for this deck, no need to fetch
      if (ssrCardsAreValid) {
        // Reset fetched cards when SSR data is available (fresh page load)
        if (fetchedCards) setFetchedCards(undefined);
        if (fetchFailed) setFetchFailed(false);
        fetchedForDeckRef.current = null;
        return;
      }

      // Already fetched for this deck (and didn't fail)
      if (fetchedForDeckRef.current === deckId && !fetchFailed) return;

      // Fetch cards for client-side navigation
      const targetDeckId = deckId;
      fetchedForDeckRef.current = deckId;
      setFetchFailed(false);

      fetchCardsForDeck(deckId).then((cards) => {
        // Only update if still on the same deck
        if (fetchedForDeckRef.current === targetDeckId) {
          if (cards && cards.length >= 2) {
            setFetchedCards(cards);
            setFetchFailed(false);
          } else {
            // Fetch returned no valid cards - mark as failed for potential retry
            setFetchFailed(true);
            console.warn(`[HeroCards] No valid cards received for ${targetDeckId}`);
          }
        }
      });
    }, [deckId, ssrCardsAreValid, fetchCardsForDeck, fetchedCards, fetchFailed]);

    // Auto-retry after delay if fetch failed
    useEffect(() => {
      if (!fetchFailed || !deckId) return;

      const timer = setTimeout(() => {
        // Reset ref to trigger new fetch
        fetchedForDeckRef.current = null;
        setFetchFailed(false);
      }, 5000); // Retry after 5 seconds to avoid rate limiting

      return () => clearTimeout(timer);
    }, [fetchFailed, deckId]);

    // Use SSR cards if valid, otherwise use fetched cards (shows placeholder if neither)
    const heroCards = ssrCardsAreValid ? ssrHeroCards : fetchedCards;
    const hasCards = heroCards && heroCards.length >= 2;
    // Only animate fade-in for fetched cards (not SSR - those should show immediately)
    const shouldFadeIn = hasCards && !ssrCardsAreValid;

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
        {hasCards ? (
          <>
            {/* Right card (back) */}
            <CardWrapper position="right" fadeIn={shouldFadeIn}>
              <Card
                card={heroCards[1] as unknown as GQL.Card}
                size="hero"
                noArtist
                noFavorite
                interactive={false}
                priority
              />
            </CardWrapper>
            {/* Left card (front) */}
            <CardWrapper position="left" fadeIn={shouldFadeIn}>
              <Card
                card={heroCards[0] as unknown as GQL.Card}
                size="hero"
                noArtist
                noFavorite
                interactive={false}
                priority
              />
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
