import Head from "next/head";
import { FC } from "react";
import { HeroCardProps } from "../../../pages/[deckId]";

interface HeroPreloadProps {
  heroCards: HeroCardProps[];
}

/**
 * Preloads hero card images via <link rel="preload"> tags.
 * Images will be in browser cache when HeroCards renders.
 */
export const HeroPreload: FC<HeroPreloadProps> = ({ heroCards }) => {
  if (!heroCards.length) return null;

  return (
    <Head>
      {heroCards.map((card, index) => (
        <link
          key={card._id}
          rel="preload"
          as="image"
          href={card.img}
          // First image gets highest priority
          {...(index === 0 && { fetchPriority: "high" as const })}
        />
      ))}
    </Head>
  );
};

export default HeroPreload;
