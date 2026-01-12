"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, Fragment, HTMLAttributes } from "react";
import { withApollo } from "../../../source/apollo";
import Header from "../../Header";
import Hero from "./Hero";
import { getDeckConfig } from "../../../source/deckConfig";
import { HeroPreload } from "./HeroPreload";
import { HeroCardProps } from "../../../pages/[deckId]";

// Lazy-load below-fold components
const CardList = dynamic(() => import("./CardList"), { ssr: true });
const TheProduct = dynamic(() => import("./TheProduct"), { ssr: true });
const PACE = dynamic(() => import("./PACE"), { ssr: true });
const Gallery = dynamic(() => import("./Gallery"), { ssr: true });
const AugmentedReality = dynamic(() => import("../Home/AugmentedReality"), {
  ssr: true,
});
const Footer = dynamic(() => import("../../Footer"), { ssr: true });

const CryptoSections = () => {
  const {
    query: { deckId },
  } = useRouter();
  const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);
  return !config.showGallery ? (
    <Fragment>
      <PACE />
      <AugmentedReality />
    </Fragment>
  ) : null;
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
  <>
    {heroCards && heroCards.length > 0 && <HeroPreload heroCards={heroCards} />}
    <DeckHeader />
    <Hero heroCards={heroCards} />
    <CardList />
    <TheProduct />
    <CryptoSections />
    <DeckGallery />
    <Footer />
  </>
);

// Named export for App Router (without withApollo wrapper)
export { Deck };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Deck, { ssr: false });
