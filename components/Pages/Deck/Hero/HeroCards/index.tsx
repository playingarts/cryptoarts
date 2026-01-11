import { FC, HTMLAttributes, useMemo, useRef } from "react";
import { useCardsForDeck } from "../../../../../hooks/card";
import { useRouter } from "next/router";
import Card from "../../../../Card";
import { usePalette } from "../../DeckPaletteContext";

// Glance effect wrapper - adds periodic shine animation
const GlanceWrapper: FC<{
  delay: number;
  left: number;
  rotate: string;
  zIndex: number;
  children: React.ReactNode;
}> = ({ delay, left, rotate, zIndex, children }) => (
  <div
    css={{
      width: 340,
      height: 478,
      position: "absolute",
      top: -45,
      overflow: "visible",
      transformOrigin: "bottom center",
      transition: "z-index 0s",
      "&:hover": { zIndex: 10 },
    }}
    style={{ left, rotate, zIndex }}
  >
    {children}
    {/* Glance effect overlay - clipped to card image bounds */}
    <div
      css={{
        position: "absolute",
        // Card image is 330x464 centered in 340x478 hover container
        // Offset to match card image position
        top: 7,
        left: 5,
        width: 330,
        height: 464,
        borderRadius: 15,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 5,
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 35%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 65%, transparent 80%)",
          transform: "translateX(-150%)",
          animation: `glance 2s ease-in-out ${delay}s forwards`,
        },
        "@keyframes glance": {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" },
        },
      }}
    />
  </div>
);

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

const HeroCards: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
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
      css={[
        {
          gridColumn: "span 6",
          position: "relative",
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
          <GlanceWrapper delay={0.4} left={275} rotate="10deg" zIndex={1}>
            <Card
              animated
              noArtist
              noFavorite
              size="hero"
              card={heroCards[1]}
            />
          </GlanceWrapper>
          {/* Left card */}
          <GlanceWrapper delay={0} left={95} rotate="-10deg" zIndex={2}>
            <Card
              animated
              noArtist
              noFavorite
              size="hero"
              card={heroCards[0]}
            />
          </GlanceWrapper>
        </>
      )}
    </div>
  );
};

export default HeroCards;
