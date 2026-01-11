import { FC, forwardRef, HTMLAttributes, useMemo, useRef } from "react";
import { useCardsForDeck } from "../../../../../hooks/card";
import { useRouter } from "next/router";
import Card from "../../../../Card";
import { usePalette } from "../../DeckPaletteContext";

const CardSkeleton: FC<{ left: number; rotate: string; palette: "dark" | "light" }> = ({ left, rotate, palette }) => (
  <div
    css={{
      width: 330,
      height: 464,
      position: "absolute",
      top: -38,
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

  // Pick 2 random cards from the deck on each page load
  const heroCards = useMemo(() => {
    if (!cards || cards.length < 2) return [];
    const idx1 = Math.floor(Math.random() * cards.length);
    let idx2 = Math.floor(Math.random() * cards.length);
    if (idx2 === idx1) idx2 = (idx2 + 1) % cards.length;
    return [cards[idx1], cards[idx2]];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards?.length, deckId]);

  // Track previous deck for animation
  const prevDeckRef = useRef(deckId);
  const isDeckChange = prevDeckRef.current !== deckId;
  if (isDeckChange) {
    prevDeckRef.current = deckId;
  }

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
          <CardSkeleton left={275} rotate="10deg" palette={palette} />
          <CardSkeleton left={95} rotate="-10deg" palette={palette} />
        </>
      ) : (
        <>
          {/* Right card */}
          <Card
            animated
            noArtist
            noFavorite
            size="hero"
            card={heroCards[1]}
            css={{
              position: "absolute",
              top: -45,
              transformOrigin: "bottom center",
              zIndex: 1,
              "&:hover": { zIndex: 10 },
            }}
            style={{ rotate: "10deg", left: 275 }}
          />
          {/* Left card */}
          <Card
            animated
            noArtist
            noFavorite
            size="hero"
            card={heroCards[0]}
            css={{
              position: "absolute",
              top: -45,
              transformOrigin: "bottom center",
              zIndex: 2,
              "&:hover": { zIndex: 10 },
            }}
            style={{ rotate: "-10deg", left: 95 }}
          />
        </>
      )}
    </div>
  );
});

HeroCards.displayName = "HeroCards";

export default HeroCards;
