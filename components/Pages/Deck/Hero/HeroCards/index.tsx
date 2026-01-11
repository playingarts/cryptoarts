import { FC, HTMLAttributes, useMemo, useState, useEffect } from "react";
import { useCardsForDeck } from "../../../../../hooks/card";
import { useDecks } from "../../../../../hooks/deck";
import { useRouter } from "next/router";
import Card from "../../../../Card";
import { usePalette } from "../../DeckPaletteContext";

type SlideState = "visible" | "sliding-out" | "sliding-in";

const CardSkeleton: FC<{ left: number; rotate: string; palette: "dark" | "light" }> = ({ left, rotate, palette }) => (
  <div
    css={{
      width: 329,
      height: 463,
      position: "absolute",
      top: -37.59,
      borderRadius: 20,
      left,
      rotate,
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

  // Get deck from cached decks to get _id
  const { decks } = useDecks({ skip: !deckId });
  const deck = useMemo(() => decks?.find((d) => d.slug === deckId), [decks, deckId]);

  // Use CardsForDeckQuery which is already in SSR cache
  const { cards, loading } = useCardsForDeck({
    variables: { deck: deck?._id },
    skip: !deck?._id,
  });

  // Pick 2 random cards from cached cards (seeded by deckId for consistency)
  const heroCards = useMemo(() => {
    if (!cards || cards.length < 2) return [];
    // Simple deterministic selection based on deckId to avoid flicker
    const seed = deckId ? deckId.toString().split("").reduce((a, b) => a + b.charCodeAt(0), 0) : 0;
    const idx1 = seed % cards.length;
    const idx2 = (seed + Math.floor(cards.length / 2)) % cards.length;
    return [cards[idx1], cards[idx2 === idx1 ? (idx2 + 1) % cards.length : idx2]];
  }, [cards, deckId]);

  // Track current deck to detect changes
  const [currentDeckId, setCurrentDeckId] = useState(deckId);
  const [slideState, setSlideState] = useState<SlideState>("visible");
  const [displayedCards, setDisplayedCards] = useState<GQL.Card[]>([]);

  // Show skeleton when loading OR when deck changed and we don't have new cards yet
  const deckChanged = deckId !== currentDeckId;
  const showSkeleton = loading || (deckChanged && heroCards.length === 0) || displayedCards.length === 0;

  // Handle deck change and card updates
  useEffect(() => {
    // Deck changed - reset state
    if (deckId !== currentDeckId) {
      setCurrentDeckId(deckId as string);
      setDisplayedCards([]); // Clear to show skeleton
      setSlideState("visible");
      return;
    }

    // New cards ready for current deck
    if (heroCards.length > 0 && displayedCards.length === 0) {
      // Initial load or after deck change - set cards with fan animation
      setSlideState("sliding-in");
      setDisplayedCards(heroCards);
      setTimeout(() => setSlideState("visible"), 50);
    } else if (heroCards.length > 0 && heroCards[0]?._id !== displayedCards[0]?._id) {
      // Cards changed within same deck - animate transition
      setSlideState("sliding-out");
      const timer = setTimeout(() => {
        setDisplayedCards(heroCards);
        setSlideState("sliding-in");
        setTimeout(() => setSlideState("visible"), 50);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [deckId, currentDeckId, heroCards, displayedCards]);

  // Fan effect: cards pivot from bottom center like being dealt from a deck
  // Cards start stacked (0deg rotation) and fan out to their final rotations
  const getLeftCardStyles = () => {
    switch (slideState) {
      case "sliding-out":
      case "sliding-in":
        // Closed position - cards stacked, no rotation, moved to center
        return { rotate: "0deg", left: 185 }; // Center position
      case "visible":
      default:
        // Fanned out position
        return { rotate: "-10deg", left: 95 };
    }
  };

  const getRightCardStyles = () => {
    switch (slideState) {
      case "sliding-out":
      case "sliding-in":
        // Closed position - cards stacked, no rotation, moved to center
        return { rotate: "0deg", left: 185 }; // Center position
      case "visible":
      default:
        // Fanned out position
        return { rotate: "10deg", left: 275 };
    }
  };

  return (
    <div
      css={[
        {
          gridColumn: "span 6",
          position: "relative",
          "> *": {
            width: 329,
            height: 463,
            position: "absolute",
            top: -37.59,
            borderRadius: 20,
          },
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
          {/* Right card - fans out from center to right */}
          {displayedCards[1] && (
            <Card
              animated
              noArtist
              noFavorite
              size="hero"
              card={displayedCards[1]}
              css={(theme) => [
                {
                  transformOrigin: "bottom center",
                  transition: slideState === "sliding-in"
                    ? "none"
                    : "rotate 0.4s ease-out, left 0.4s ease-out",
                },
              ]}
              style={getRightCardStyles()}
            />
          )}
          {/* Left card - fans out from center to left */}
          {displayedCards[0] && (
            <Card
              animated
              noArtist
              noFavorite
              size="hero"
              card={displayedCards[0]}
              css={(theme) => [
                {
                  transformOrigin: "bottom center",
                  transition: slideState === "sliding-in"
                    ? "none"
                    : "rotate 0.4s ease-out, left 0.4s ease-out",
                },
              ]}
              style={getLeftCardStyles()}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HeroCards;
