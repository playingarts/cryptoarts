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

const CARD_TOP = -38;

/** Wrapper component for positioned cards */
const CardWrapper: FC<{
  position: "left" | "right";
  children: React.ReactNode;
}> = ({ position, children }) => {
  const pos = CARD_POSITIONS[position];
  return (
    <div
      css={{
        position: "absolute",
        top: CARD_TOP,
        left: pos.left,
        rotate: pos.rotate,
        zIndex: pos.zIndex,
        transformOrigin: "bottom center",
      }}
    >
      {children}
    </div>
  );
};

/** Fallback placeholder when no cards are available */
const CardPlaceholder: FC<{
  left: number;
  rotate: string;
  zIndex: number;
  palette: "dark" | "light";
}> = ({ left, rotate, zIndex, palette }) => (
  <div
    css={(theme) => ({
      width: 330,
      height: 464,
      position: "absolute",
      top: CARD_TOP,
      borderRadius: 15,
      left,
      rotate,
      zIndex,
      transformOrigin: "bottom center",
      background: palette === "dark" ? theme.colors.black : theme.colors.white,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    })}
  />
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

    // Track which deck we've fetched cards for (client-side navigation only)
    const fetchedForDeckRef = useRef<string | null>(null);

    // State for cards fetched during client-side navigation
    const [fetchedCards, setFetchedCards] = useState<HeroCardProps[] | undefined>(undefined);

    // Displayed cards - keeps showing last valid cards until new ones are ready
    const [displayedCards, setDisplayedCards] = useState<HeroCardProps[] | undefined>(
      ssrHeroCards && ssrHeroCards.length >= 2 ? ssrHeroCards : undefined
    );

    // Check if SSR cards are valid for current deck by checking the deckSlug on the cards
    const ssrCardsAreValid = ssrHeroCards &&
      ssrHeroCards.length >= 2 &&
      ssrHeroCards[0].deckSlug === deckId;

    // Effect to fetch cards during client-side navigation (when SSR data is stale/unavailable)
    useEffect(() => {
      if (!deckId) return;

      // If we have valid SSR data for this deck, use it directly
      if (ssrCardsAreValid) {
        // Update displayed cards immediately with SSR data
        setDisplayedCards(ssrHeroCards);
        // Reset fetched cards when SSR data is available (fresh page load)
        if (fetchedCards) setFetchedCards(undefined);
        fetchedForDeckRef.current = null;
        return;
      }

      // Already fetched for this deck
      if (fetchedForDeckRef.current === deckId) return;

      // Fetch cards for client-side navigation
      const targetDeckId = deckId;
      fetchedForDeckRef.current = deckId;

      fetchCardsForDeck(deckId).then((cards) => {
        // Only update if still on the same deck
        if (cards && cards.length >= 2 && fetchedForDeckRef.current === targetDeckId) {
          setFetchedCards(cards);
          setDisplayedCards(cards); // Update displayed cards when fetch completes
        }
      });
    }, [deckId, ssrCardsAreValid, ssrHeroCards, fetchCardsForDeck, fetchedCards]);

    // Use displayed cards (keeps last valid cards visible during loading)
    const heroCards = displayedCards;
    const hasCards = heroCards && heroCards.length >= 2;

    return (
      <div
        ref={ref}
        css={[
          {
            gridColumn: "span 6",
            alignSelf: "start",
            marginBottom: 90,
            top: 100,
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
            <CardWrapper position="right">
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
            <CardWrapper position="left">
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
            {/* Fallback placeholders */}
            <CardPlaceholder
              left={CARD_POSITIONS.right.left}
              rotate={CARD_POSITIONS.right.rotate}
              zIndex={CARD_POSITIONS.right.zIndex}
              palette={palette}
            />
            <CardPlaceholder
              left={CARD_POSITIONS.left.left}
              rotate={CARD_POSITIONS.left.rotate}
              zIndex={CARD_POSITIONS.left.zIndex}
              palette={palette}
            />
          </>
        )}
      </div>
    );
  }
);

HeroCards.displayName = "HeroCards";

export default HeroCards;
