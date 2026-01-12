import { FC, forwardRef, HTMLAttributes, useEffect, useState } from "react";
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
const RETRY_DELAY_MS = 5000;

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

    // State for cards fetched during client-side navigation
    const [fetchedCards, setFetchedCards] = useState<HeroCardProps[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    // Track when images are ready to display (for smooth skeleton → card transition)
    const [imagesReady, setImagesReady] = useState(false);

    // SSR cards are valid if they exist and match the current deck
    const canUseSSRCards = !!(
      ssrHeroCards &&
      ssrHeroCards.length >= 2 &&
      ssrHeroCards[0].deckSlug === deckId
    );

    // Simple effect: fetch cards on mount if SSR cards don't match
    // Component remounts on each deck change due to key={deckId} in parent
    useEffect(() => {
      // If SSR cards are valid, no need to fetch
      if (canUseSSRCards || !deckId) {
        return;
      }

      let cancelled = false;
      setIsLoading(true);
      setHasFailed(false);
      setImagesReady(false);

      fetchCardsForDeck(deckId)
        .then(async (cards) => {
          if (cancelled) return;

          if (cards && cards.length >= 2) {
            // Wait for images to load before showing cards
            await waitForImages(cards);
            if (cancelled) return;
            setFetchedCards(cards);
            setImagesReady(true);
          } else {
            setHasFailed(true);
          }
        })
        .catch(() => {
          if (cancelled) return;
          setHasFailed(true);
        })
        .finally(() => {
          if (!cancelled) {
            setIsLoading(false);
          }
        });

      return () => {
        cancelled = true;
      };
    }, [deckId, canUseSSRCards, fetchCardsForDeck]);

    // Auto-retry after delay if fetch failed
    useEffect(() => {
      if (!hasFailed || !deckId || canUseSSRCards) return;

      const timer = setTimeout(() => {
        setHasFailed(false);
        setIsLoading(true);

        fetchCardsForDeck(deckId)
          .then(async (cards) => {
            if (cards && cards.length >= 2) {
              await waitForImages(cards);
              setFetchedCards(cards);
              setImagesReady(true);
              setHasFailed(false);
            } else {
              setHasFailed(true);
            }
          })
          .catch(() => {
            setHasFailed(true);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, RETRY_DELAY_MS);

      return () => clearTimeout(timer);
    }, [hasFailed, deckId, canUseSSRCards, fetchCardsForDeck]);

    // Use SSR cards if valid, otherwise use fetched cards
    const heroCards = canUseSSRCards ? ssrHeroCards : fetchedCards;
    // Show cards when: SSR cards are valid OR (we have fetched cards AND images are ready)
    const showCards = canUseSSRCards || (heroCards && heroCards.length >= 2 && imagesReady);
    // Only animate fade-in for fetched cards (not SSR - those should show immediately)
    const shouldFadeIn = showCards && !canUseSSRCards;

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
        {showCards && heroCards ? (
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
