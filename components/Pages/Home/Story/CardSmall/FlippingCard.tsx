import { FC } from "react";
import Card from "../../../../Card";
import type { HomeCard } from "../../../../Contexts/heroCarousel";
import { useFlippingCard } from "./useFlippingCard";
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  FLIP_TRANSITION_DURATION,
} from "../constants";

type FlippingCardProps = {
  cards: HomeCard[];
  initialIndex: number;
  minInterval?: number;
  maxInterval?: number;
  globalPaused?: boolean;
  onCardClick?: (card: HomeCard) => void;
};

const FlippingCard: FC<FlippingCardProps> = ({
  cards,
  initialIndex,
  minInterval,
  maxInterval,
  globalPaused = false,
  onCardClick,
}) => {
  const {
    frontCard,
    backCard,
    rotation,
    currentCard,
    containerRef,
    setHovered,
  } = useFlippingCard({
    cards,
    initialIndex,
    minInterval,
    maxInterval,
    isPaused: globalPaused,
  });

  const handleClick = () => {
    onCardClick?.(currentCard);
  };

  return (
    <div
      ref={containerRef}
      css={{
        perspective: "1000px",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div
        css={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: `transform ${FLIP_TRANSITION_DURATION}ms ease-in-out`,
        }}
        style={{
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {/* Front face */}
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Card
            card={{ img: frontCard.img } as unknown as GQL.Card}
            size="small"
            noArtist
            noFavorite
            interactive={false}
          />
        </div>
        {/* Back face */}
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card
            card={{ img: backCard.img } as unknown as GQL.Card}
            size="small"
            noArtist
            noFavorite
            interactive={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
