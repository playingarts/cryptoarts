import { FC, useState, useCallback } from "react";
import { Interpolation, Theme } from "@emotion/react";
import Card, { CardProps } from "./index";
import { cardSizesHover } from "./sizes";

// Flip transition duration in ms
const FLIP_DURATION = 450;

interface FlippableCardProps extends Omit<CardProps, "card"> {
  /** The front card to display */
  card: GQL.Card;
  /** The backside card for this deck */
  backsideCard?: GQL.Card | null;
  /** External CSS styles to merge */
  css?: Interpolation<Theme>;
}

/**
 * Card component that flips to show backside on click.
 * Flips back when clicked again or when mouse leaves.
 * Animation style matches FlippingHeroCard from deck page exactly.
 */
const FlippableCard: FC<FlippableCardProps> = ({
  card,
  backsideCard,
  size = "big",
  // Extract props that should not be passed to DOM elements
  autoPlayVideo,
  animated,
  priority,
  noArtist,
  noLink,
  css: externalCss,
  ...props
}) => {
  // Scale for bounce effect on click (matches deck hero card behavior)
  const [scale, setScale] = useState(1);

  // Get dimensions for this card size (matches FlippingHeroCard's CARD_DIMENSIONS)
  const dimensions = cardSizesHover[size] || cardSizesHover.big;

  // Track rotation angle to always add 360 on each click
  const [rotation, setRotation] = useState(0);

  const handleClick = useCallback(() => {
    if (!backsideCard) return;
    // Trigger bounce animation (same as FlippingHeroCard)
    setScale(1.05);
    setTimeout(() => setScale(1), 150);
    // Add 360 degrees to current rotation
    setRotation((prev) => prev + 360);
  }, [backsideCard]);

  // Always render the same structure to prevent re-mount flashes
  // when backsideCard loads asynchronously
  return (
    <div
      css={[
        {
          width: dimensions.width,
          margin: "0 auto",
        },
        externalCss,
      ]}
    >
      <div
        css={{
          perspective: "1000px",
          width: dimensions.width,
          height: dimensions.height,
          cursor: backsideCard ? "pointer" : "default",
        }}
        onClick={handleClick}
      >
        <div
          css={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
          }}
          style={{
            transition: `transform ${FLIP_DURATION}ms ease-in-out`,
            transform: `rotateY(${rotation}deg) scale(${scale})`,
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
              card={card}
              size={size}
              noArtist={noArtist}
              noLink={noLink}
              animated={animated}
              autoPlayVideo={autoPlayVideo}
              priority={priority}
              interactive={false}
            />
          </div>
          {/* Back face - only render if backsideCard exists */}
          {backsideCard && (
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
              <Card card={backsideCard} size={size} noArtist noLink interactive={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
