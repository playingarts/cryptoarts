import { FC } from "react";
import Card from "../../Card";
import { useFlippingCard } from "./useFlippingCard";
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  FLIP_TRANSITION_DURATION,
  FRONT_ROTATION,
} from "./constants";

type FlippingCardProps = {
  cards: GQL.Card[];
  isPaused?: boolean;
  onCardClick?: (card: GQL.Card) => void;
};

const FlippingCard: FC<FlippingCardProps> = ({
  cards,
  isPaused = false,
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
    isPaused,
  });

  const handleClick = () => {
    if (currentCard && onCardClick) {
      onCardClick(currentCard);
    }
  };

  if (!frontCard || !backCard) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      css={{
        perspective: "1000px",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        position: "absolute",
        transform: "translate(-50%,-70%)",
        top: 0,
        left: 0,
        rotate: FRONT_ROTATION,
        transformOrigin: "left",
        zIndex: 2,
        cursor: "pointer",
      }}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
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
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Card
            noArtist
            noFavorite
            animated
            interactive={false}
            card={frontCard}
            css={{ width: "100%", height: "100%" }}
          />
        </div>
        {/* Back face */}
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card
            noArtist
            noFavorite
            animated
            interactive={false}
            card={backCard}
            css={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
