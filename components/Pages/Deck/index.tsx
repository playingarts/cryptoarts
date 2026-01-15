"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";
import { withApollo } from "../../../source/apollo";
import Header from "../../Header";
import Hero from "./Hero";
import { getDeckConfig } from "../../../source/deckConfig";
import { HeroPreload } from "./HeroPreload";
import { HeroCardProps } from "../../../pages/[deckId]";
import { FutureChapterProvider } from "./FutureChapterContext";

// Lazy-load below-fold components
const CardList = dynamic(() => import("./CardList"), { ssr: true });
const TheProduct = dynamic(() => import("./TheProduct"), { ssr: true });
const PACE = dynamic(() => import("./PACE"), { ssr: true });
const Gallery = dynamic(() => import("./Gallery"), { ssr: true });
const AugmentedReality = dynamic(() => import("../Home/AugmentedReality"), {
  ssr: true,
});
const Footer = dynamic(() => import("../../Footer"), { ssr: true });

/** Renders PACE section for decks with NFT stats */
const DeckPACE = () => {
  const {
    query: { deckId },
  } = useRouter();
  const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);

  if (!config.showPACE) return null;
  return <PACE />;
};

/** Renders AR section for decks with AR feature */
const DeckAR = () => {
  const {
    query: { deckId },
  } = useRouter();
  const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);

  if (!config.hasAR) return null;
  return <AugmentedReality />;
};

const DeckGallery = () => {
  const {
    query: { deckId },
  } = useRouter();
  const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);
  return config.showGallery ? <Gallery /> : null;
};

const DeckHeader = () => {
  const {
    query: { deckId },
  } = useRouter();
  const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);

  return (
    <Header
      links={[
        ...["Cards", "Product"],
        ...config.sections,
      ]}
    />
  );
};

interface DeckProps extends HTMLAttributes<HTMLElement> {
  heroCards?: HeroCardProps[];
}

const Deck: FC<DeckProps> = ({ heroCards, ...props }) => (
  <FutureChapterProvider>
    {heroCards && heroCards.length > 0 && <HeroPreload heroCards={heroCards} />}
    <DeckHeader />
    <Hero heroCards={heroCards} />
    <CardList />
    <TheProduct />
    <DeckPACE />
    <DeckAR />
    <DeckGallery />
    <Footer />
  </FutureChapterProvider>
);

// Named export for App Router (without withApollo wrapper)
export { Deck };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Deck, { ssr: false });
