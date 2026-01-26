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
import LazySection from "../../LazySection";

// Lazy-load below-fold components
const CardList = dynamic(() => import("./CardList"), { ssr: false });
const TheProduct = dynamic(() => import("./TheProduct"), { ssr: false });
const PACE = dynamic(() => import("./PACE"), { ssr: false });
const Gallery = dynamic(() => import("./Gallery"), { ssr: false });
const AugmentedReality = dynamic(() => import("../Home/AugmentedReality"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("../Home/Testimonials"), { ssr: false });
const FAQ = dynamic(() => import("../../Footer/Faq"), { ssr: false });
const Footer = dynamic(() => import("../../Footer"), { ssr: false });
const Newsletter = dynamic(() => import("../../Newsletter"), { ssr: false });

/** Renders PACE section for decks with NFT stats */
const DeckPACE: FC<{ deckId?: string }> = ({ deckId }) => {
  const config = getDeckConfig(deckId);
  if (!config.showPACE) return null;
  return (
    <LazySection id="pace" rootMargin="300px" minHeight={800}>
      <PACE />
    </LazySection>
  );
};

/** Renders AR section for decks with AR feature */
const DeckAR: FC<{ deckId?: string }> = ({ deckId }) => {
  const config = getDeckConfig(deckId);
  if (!config.hasAR) return null;
  return (
    <LazySection id="ar" rootMargin="300px" minHeight={500}>
      <AugmentedReality />
    </LazySection>
  );
};

/** Renders Gallery section for decks with gallery */
const DeckGallery: FC<{ deckId?: string }> = ({ deckId }) => {
  const config = getDeckConfig(deckId);
  if (!config.showGallery) return null;
  return (
    <LazySection id="gallery" rootMargin="300px" minHeight={800}>
      <Gallery />
    </LazySection>
  );
};

/** Renders Reviews section for decks with testimonials */
const DeckReviews: FC<{ deckId?: string }> = ({ deckId }) => {
  const config = getDeckConfig(deckId);
  if (!config.showTestimonials) return null;
  return (
    <LazySection id="reviews" rootMargin="300px" minHeight={600}>
      <Testimonials deckSlug={deckId} />
    </LazySection>
  );
};

/** Renders FAQ section */
const DeckFAQ: FC<{ deckId?: string }> = ({ deckId }) => {
  return (
    <LazySection id="faq" rootMargin="300px" minHeight={600}>
      <FAQ deckSlug={deckId} />
    </LazySection>
  );
};

/** Renders newsletter section */
const DeckNewsletter: FC = () => {
  return (
    <LazySection id="newsletter" rootMargin="300px" minHeight={200}>
      <Newsletter />
    </LazySection>
  );
};

/** Renders actual footer (links, copyright, etc.) */
const DeckFooter: FC = () => {
  return (
    <LazySection rootMargin="300px" minHeight={400}>
      <Footer />
    </LazySection>
  );
};

const DeckHeader: FC<{ deckId?: string }> = ({ deckId }) => {
  const config = getDeckConfig(deckId);

  return (
    <Header
      links={[
        "About",
        "Cards",
        "Product",
        ...config.sections.filter((s) => s !== "About"),
      ]}
    />
  );
};

interface DeckProps extends HTMLAttributes<HTMLElement> {
  heroCards?: HeroCardProps[];
}

const Deck: FC<DeckProps> = ({ heroCards, ...props }) => {
  const {
    query: { deckId },
  } = useRouter();
  const deckSlug = typeof deckId === "string" ? deckId : undefined;

  return (
    <FutureChapterProvider>
      {heroCards && heroCards.length > 0 && <HeroPreload heroCards={heroCards} />}
      <DeckHeader deckId={deckSlug} />
      <Hero heroCards={heroCards} />

      {/* Cards section */}
      <LazySection id="cards" rootMargin="300px" minHeight={1200}>
        <CardList />
      </LazySection>

      {/* Product section */}
      <LazySection id="product" rootMargin="300px" minHeight={600}>
        <TheProduct />
      </LazySection>

      {/* Conditional sections based on deck config */}
      <DeckPACE deckId={deckSlug} />
      <DeckAR deckId={deckSlug} />
      <DeckGallery deckId={deckSlug} />

      {/* Reviews section - conditional based on deck config */}
      <DeckReviews deckId={deckSlug} />

      {/* FAQ section */}
      <DeckFAQ deckId={deckSlug} />

      {/* Newsletter section */}
      <DeckNewsletter />

      {/* Footer (links, copyright, etc.) */}
      <DeckFooter />
    </FutureChapterProvider>
  );
};

// Named export for App Router (without withApollo wrapper)
export { Deck };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Deck, { ssr: false });
