"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
import { useRouter } from "next/router";
import Header from "../../Header";
import Footer from "../../Footer";
import Hero from "./Hero";
import LazySection from "../../LazySection";
import MoreSkeleton from "./More/MoreSkeleton";
import { withApollo } from "../../../source/apollo";
import { SSRCardProps } from "../../../pages/[deckId]/[artistSlug]";
import { getDeckConfig } from "../../../source/deckConfig";

// Code-split below-fold components (SSR disabled for lazy loading)
const More = dynamic(() => import("./More"), { ssr: false });
const AugmentedReality = dynamic(() => import("../Home/AugmentedReality"), {
  ssr: false,
});

/** Determine if current deck uses dark palette */
const useDarkPalette = (deckId?: string) => deckId === "crypto";

/** AR section shown only for decks with AR feature */
const CardPageAR: FC<{ deckId?: string }> = ({ deckId }) => {
  const config = getDeckConfig(deckId);
  if (!config.hasAR) return null;
  return <AugmentedReality />;
};

interface CardPageProps {
  ssrCard?: SSRCardProps;
}

/**
 * Card page with progressive loading:
 * 1. Header + Hero (P0-P3) load immediately
 * 2. More section lazy loads on scroll
 * 3. AR section lazy loads on scroll (if applicable)
 * 4. Footer lazy loads last
 */
const CardPage: FC<CardPageProps> = ({ ssrCard }) => {
  const { query: { deckId } } = useRouter();
  const dark = useDarkPalette(typeof deckId === "string" ? deckId : undefined);

  return (
    <>
      <Header />
      <Hero ssrCard={ssrCard} />

      {/* P4: More from deck - lazy load on scroll */}
      <LazySection
        rootMargin="300px"
        minHeight={600}
        skeleton={<MoreSkeleton dark={dark} />}
      >
        <More />
      </LazySection>

      {/* P5: AR section - lazy load on scroll */}
      <LazySection rootMargin="200px" minHeight={0}>
        <CardPageAR deckId={typeof deckId === "string" ? deckId : undefined} />
      </LazySection>

      {/* P6: Footer - lazy load last */}
      <LazySection rootMargin="100px" minHeight={400}>
        <Footer />
      </LazySection>
    </>
  );
};

// Named export for App Router (without withApollo wrapper)
export { CardPage };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(CardPage, { ssr: false });
