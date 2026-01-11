import { FC, forwardRef, HTMLAttributes, useMemo, useState, useEffect } from "react";
import { useCardsForDeck } from "../../../../../hooks/card";
import { useRouter } from "next/router";
import Card from "../../../../Card";
import { usePalette } from "../../DeckPaletteContext";

// Card position constants to avoid magic numbers
const CARD_POSITIONS = {
  left: { left: 95, rotate: "-10deg", zIndex: 2 },
  right: { left: 275, rotate: "10deg", zIndex: 1 },
} as const;

const SKELETON_TOP = -38;
const CARD_TOP = -45;

const CardSkeleton: FC<{ left: number; rotate: string; palette: "dark" | "light" }> = ({ left, rotate, palette }) => (
  <div
    css={{
      width: 330,
      height: 464,
      position: "absolute",
      top: SKELETON_TOP,
      borderRadius: 15,
      left,
      rotate,
      transformOrigin: "bottom center",
      background: palette === "dark"
        ? "linear-gradient(90deg, #2d2d2d 0%, #3d3d3d 50%, #2d2d2d 100%)"
        : "linear-gradient(90deg, #e8e8e8 0%, #f5f5f5 50%, #e8e8e8 100%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s ease-in-out infinite",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "200% 0%" },
        "100%": { backgroundPosition: "-200% 0%" },
      },
    }}
  />
);

interface HeroCardsProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean;
}

const HeroCards = forwardRef<HTMLDivElement, HeroCardsProps>(({ sticky = true, ...props }, ref) => {
  const { query: { deckId } } = useRouter();
  const { palette } = usePalette();

  // Use deck slug directly - backend resolves slug to ID
  // SSR pre-caches with same slug key for instant load
  const { cards } = useCardsForDeck({
    variables: { deck: deckId as string },
    skip: !deckId,
  });

  // Store random indices per deck (client-side only for true randomness on each refresh)
  const [randomIndices, setRandomIndices] = useState<{ [key: string]: [number, number] }>({});

  // Generate random indices on client-side when cards load
  // Note: randomIndices intentionally omitted from deps to avoid infinite loop
  useEffect(() => {
    if (!cards || cards.length < 2 || !deckId) return;

    setRandomIndices(prev => {
      // Only generate if we don't have indices for this deck yet
      if (prev[deckId as string]) return prev;

      const idx1 = Math.floor(Math.random() * cards.length);
      // Guaranteed different index in single operation
      const idx2 = (idx1 + 1 + Math.floor(Math.random() * (cards.length - 1))) % cards.length;

      return {
        ...prev,
        [deckId as string]: [idx1, idx2]
      };
    });
  }, [cards, deckId]);

  // Get hero cards from random indices
  const heroCards = useMemo(() => {
    if (!cards || cards.length < 2 || !deckId) return [];
    const indices = randomIndices[deckId as string];
    if (!indices) return []; // Show skeleton until client picks cards
    return [cards[indices[0]], cards[indices[1]]];
  }, [cards, deckId, randomIndices]);

  const showSkeleton = heroCards.length === 0;

  return (
    <div
      ref={ref}
      css={[
        {
          gridColumn: "span 6",
          alignSelf: "start",
          marginBottom: 30,
          top: 100,
          willChange: "transform",
        },
        sticky && {
          position: "sticky",
        },
      ]}
    >
      {showSkeleton ? (
        <>
          <CardSkeleton left={CARD_POSITIONS.right.left} rotate={CARD_POSITIONS.right.rotate} palette={palette} />
          <CardSkeleton left={CARD_POSITIONS.left.left} rotate={CARD_POSITIONS.left.rotate} palette={palette} />
        </>
      ) : (
        <>
          {/* Right card */}
          <Card
            animated
            noArtist
            noFavorite
            size="hero"
            priority
            card={heroCards[1]}
            css={{
              position: "absolute",
              top: CARD_TOP,
              transformOrigin: "bottom center",
              zIndex: CARD_POSITIONS.right.zIndex,
              "&:hover": { zIndex: 10 },
            }}
            style={{ rotate: CARD_POSITIONS.right.rotate, left: CARD_POSITIONS.right.left }}
          />
          {/* Left card */}
          <Card
            animated
            noArtist
            noFavorite
            size="hero"
            priority
            card={heroCards[0]}
            css={{
              position: "absolute",
              top: CARD_TOP,
              transformOrigin: "bottom center",
              zIndex: CARD_POSITIONS.left.zIndex,
              "&:hover": { zIndex: 10 },
            }}
            style={{ rotate: CARD_POSITIONS.left.rotate, left: CARD_POSITIONS.left.left }}
          />
        </>
      )}
    </div>
  );
});

HeroCards.displayName = "HeroCards";

export default HeroCards;
