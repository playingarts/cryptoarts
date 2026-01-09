import Card from "../../../../Card";
import { useSize } from "../../../../SizeProvider";
import { breakpoints } from "../../../../../source/enums";
import { FC, useMemo, useState, useEffect, useRef } from "react";
import { useHeroCarousel, HomeCard as HomeCardType } from "../../../../../contexts/heroCarouselContext";
import { cardSizesHover } from "../../../../Card/sizes";

// Generate random rotation between 3-15 degrees with random direction
const generateRandomRotation = (): number => {
  const min = 3;
  const max = 15;
  const angle = min + Math.random() * (max - min);
  return Math.random() > 0.5 ? angle : -angle;
};

// Get the stack position (0=top, 1=middle, 2=bottom) for a card
const getStackPosition = (cardId: string, cards: HomeCardType[]): number => {
  const index = cards.findIndex(c => c._id === cardId);
  return index === -1 ? -1 : index;
};

const HeroCard: FC = () => {
  const { width } = useSize();
  const { visibleCards, departingCard, setHovering, advance } = useHeroCarousel();

  // Track if departing card should be in "exiting" state (for animation)
  const [isExiting, setIsExiting] = useState(false);

  // Store random rotations for each card by ID
  const rotationsRef = useRef<Record<string, number>>({});

  // Generate rotations for cards that don't have one yet
  visibleCards.forEach((card) => {
    if (!(card._id in rotationsRef.current)) {
      rotationsRef.current[card._id] = generateRandomRotation();
    }
  });

  // Clean up rotations for cards no longer in the visible set
  const visibleIds = new Set(visibleCards.map(c => c._id));
  Object.keys(rotationsRef.current).forEach(id => {
    if (!visibleIds.has(id)) {
      delete rotationsRef.current[id];
    }
  });

  // Trigger exit animation when departing card appears
  useEffect(() => {
    if (departingCard) {
      // Start with initial state, then trigger exit animation on next frame
      setIsExiting(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsExiting(true);
        });
      });
    }
  }, [departingCard]);

  // Take exactly 3 cards (or less if not available)
  const cardsToShow = useMemo(() => visibleCards.slice(0, 3), [visibleCards]);

  if (cardsToShow.length === 0) {
    return null;
  }

  const cardSize = width >= breakpoints.sm ? "big" : "nano";
  const containerWidth = cardSizesHover[cardSize].width;
  const containerHeight = cardSizesHover[cardSize].height;

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={advance}
      css={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        cursor: "pointer",
      }}
    >
      {/* Render cards with their ID as key so they animate when moving positions */}
      {cardsToShow.map((card) => {
        const stackPosition = getStackPosition(card._id, cardsToShow);
        const isTopCard = stackPosition === 0;
        // Top card is always straight (0°), others use their random rotation
        const rotation = isTopCard ? 0 : (rotationsRef.current[card._id] ?? 0);
        const cardForDisplay = card as unknown as GQL.Card;

        return (
          <div
            key={card._id}
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.5s ease-out, z-index 0s",
            }}
            style={{
              transform: `rotate(${rotation}deg)`,
              zIndex: 3 - stackPosition,
            }}
          >
            <Card
              size={cardSize}
              noArtist
              interactive={isTopCard}
              priority={isTopCard}
              card={cardForDisplay}
            />
          </div>
        );
      })}
      {/* Departing card with exit animation */}
      {departingCard && (
        <div
          key={`departing-${departingCard._id}`}
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            pointerEvents: "none",
            zIndex: 10,
          }}
          style={{
            transform: isExiting ? "rotate(15deg) translateX(50%) translateY(-20%)" : "rotate(0deg)",
            opacity: isExiting ? 0 : 1,
          }}
        >
          <Card
            size={cardSize}
            noArtist
            noFavorite
            interactive={false}
            card={departingCard as unknown as GQL.Card}
          />
        </div>
      )}
    </div>
  );
};

export default HeroCard;
