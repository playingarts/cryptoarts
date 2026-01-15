"use client";

import { FC, useMemo } from "react";
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

/** Card skeleton - matches FlippableCard dimensions */
const HeroCardSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <div
    css={{
      width: 380,
      height: 532,
      margin: "auto",
      position: "relative",
    }}
  >
    <Shimmer
      width={380}
      height={532}
      borderRadius={16}
      dark={dark}
    />
  </div>
);

/**
 * P0: Hero card image - displays instantly from ssrCard.
 * Shows skeleton until card data is available.
 * Animates with slideDown effect matching the Pop window.
 */
const HeroCard: FC<HeroCardProps> = ({ card, backsideCard, dark }) => {
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
        css={{ margin: "auto" }}
      />
    </div>
  );
};

export default HeroCard;
export { HeroCardSkeleton };
