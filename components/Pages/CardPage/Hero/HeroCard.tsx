"use client";

import { FC, useState, useEffect } from "react";
import FlippableCard from "../../../Card/FlippableCard";
import { SSRCardProps } from "../../../../pages/[deckId]/[artistSlug]";
import Shimmer from "./Shimmer";

/** Type guard to check if card has all required GQL.Card fields */
const isFullCard = (card: SSRCardProps | GQL.Card): card is GQL.Card => {
  return "__typename" in card || "suitRank" in card;
};

interface HeroCardProps {
  card?: SSRCardProps | GQL.Card;
  backsideCard?: GQL.Card | null;
  dark?: boolean;
}

/** Card skeleton - matches FlippableCard dimensions (cardSizesHover.big) */
const HeroCardSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <div
    css={(theme) => ({
      width: 370,
      height: 520,
      margin: "auto",
      position: "relative",
      [theme.maxMQ.xsm]: {
        width: "100%",
        maxWidth: 280,
        height: "auto",
        aspectRatio: "0.7076923076923077",
      },
    })}
  >
    <Shimmer
      width="100%"
      height="100%"
      borderRadius={16}
      dark={dark}
    />
  </div>
);

/**
 * P0: Hero card image - displays instantly from ssrCard.
 * Shows skeleton until card data is available.
 * Animates with slideDown effect matching the Pop window.
 * Flips 360° once when user starts scrolling.
 */
const HeroCard: FC<HeroCardProps> = ({ card, backsideCard, dark }) => {
  const [flipTrigger, setFlipTrigger] = useState(0);

  // Flip card once when user starts scrolling
  useEffect(() => {
    let hasFlipped = false;

    const handleScroll = () => {
      if (!hasFlipped && window.scrollY > 50) {
        hasFlipped = true;
        setFlipTrigger((prev) => prev + 1);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!card) {
    return <HeroCardSkeleton dark={dark} />;
  }

  return (
    <div
      css={{
        animation: "slideDown 0.4s ease-out",
        "@keyframes slideDown": {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <FlippableCard
        noArtist
        size="big"
        card={isFullCard(card) ? card : (card as unknown as GQL.Card)}
        backsideCard={backsideCard}
        autoPlayVideo={!!card.video}
        priority
        flipTrigger={flipTrigger}
        css={{ margin: "auto" }}
      />
    </div>
  );
};

export default HeroCard;
export { HeroCardSkeleton };
