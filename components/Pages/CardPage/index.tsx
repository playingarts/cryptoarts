"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../Header";
import Footer from "../../Footer";
import Hero from "./Hero";
import LazySection from "../../LazySection";
import MoreSkeleton from "./More/MoreSkeleton";
import { withApollo } from "../../../source/apollo";
import { SSRCardProps } from "../../../pages/[deckId]/[artistSlug]";
import { CardPageProvider } from "./CardPageContext";
import { getNavigationCard, clearNavigationCard } from "./navigationCardStore";
import { getDeckConfig } from "../../../source/deckConfig";

// Code-split below-fold components (SSR disabled for lazy loading)
const More = dynamic(() => import("./More"), { ssr: false });
const CardGallery = dynamic(() => import("./Gallery"), { ssr: false });
const Testimonials = dynamic(() => import("../Home/Testimonials"), { ssr: false });
const FAQ = dynamic(() => import("../../Footer/NewFAQ"), { ssr: false });
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

/** Header with card page navigation links */
const CardPageHeader: FC<{ deckId?: string }> = ({ deckId }) => {
  // Card page has its own navigation: Card, Artist, Gallery, Related, Reviews, FAQ
  return <Header links={["Card", "Artist", "Gallery", "Related", "Reviews", "FAQ"]} />;
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
  const router = useRouter();
  const { deckId } = router.query;

  // Get navigation card for instant display during fallback
  // This runs synchronously on mount, before router query is populated
  const [navCard, setNavCard] = useState<SSRCardProps | null>(() => {
    return getNavigationCard();
  });

  // During fallback (router.isFallback = true), query params are empty
  // Use navigation card's deck slug until router query is ready
  const isFallback = router.isFallback;
  const effectiveDeckId = typeof deckId === "string" ? deckId : navCard?.deck.slug;
  const dark = useDarkPalette(effectiveDeckId);

  // Priority: ssrCard (from getStaticProps) > navCard (from navigation) > undefined
  // During fallback, ssrCard is undefined, so we show navCard
  const effectiveSsrCard = ssrCard || navCard || undefined;

  // Clear navigation card once we have ssrCard (prevents stale data on next navigation)
  useEffect(() => {
    if (ssrCard && navCard) {
      clearNavigationCard();
      setNavCard(null);
    }
  }, [ssrCard, navCard]);

  // Show loading state only if we're in fallback AND have no navigation card
  if (isFallback && !navCard) {
    return (
      <CardPageProvider>
        <CardPageHeader deckId={effectiveDeckId} />
        <Hero ssrCard={undefined} />
      </CardPageProvider>
    );
  }

  // Preload hero card image for faster LCP
  const heroImageUrl = effectiveSsrCard?.img;

  // JSON-LD structured data for SEO
  const structuredData = effectiveSsrCard ? {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": `Playing Card by ${effectiveSsrCard.artist.name}`,
    "creator": {
      "@type": "Person",
      "name": effectiveSsrCard.artist.name,
      ...(effectiveSsrCard.artist.country && { "nationality": effectiveSsrCard.artist.country }),
    },
    "image": effectiveSsrCard.img,
    ...(effectiveSsrCard.info && { "description": effectiveSsrCard.info }),
    "artform": "Playing Card Design",
    "isPartOf": {
      "@type": "CreativeWorkSeries",
      "name": "Playing Arts",
    },
  } : null;

  return (
    <CardPageProvider>
      <Head>
        {heroImageUrl && (
          <link
            rel="preload"
            as="image"
            href={heroImageUrl}
            fetchPriority="high"
          />
        )}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
      </Head>
      <CardPageHeader deckId={effectiveDeckId} />
      <div id="card">
        <Hero ssrCard={effectiveSsrCard} />
      </div>

      {/* Gallery section - lazy load on scroll */}
      <div id="gallery">
        <LazySection rootMargin="300px" minHeight={600}>
          <CardGallery />
        </LazySection>
      </div>

      {/* Related cards from deck - lazy load on scroll */}
      <div id="related">
        <LazySection
          rootMargin="300px"
          minHeight={600}
          skeleton={<MoreSkeleton dark={dark} />}
        >
          <More />
        </LazySection>
      </div>

      {/* AR section - lazy load on scroll (if deck has AR) */}
      <LazySection rootMargin="300px" minHeight={0}>
        <CardPageAR deckId={effectiveDeckId} />
      </LazySection>

      {/* Reviews section - lazy load on scroll */}
      <div id="reviews">
        <LazySection rootMargin="300px" minHeight={400}>
          <Testimonials deckSlug={effectiveDeckId} />
        </LazySection>
      </div>

      {/* FAQ section - lazy load on scroll */}
      <div id="faq">
        <LazySection rootMargin="300px" minHeight={600}>
          <FAQ />
        </LazySection>
      </div>

      {/* Footer - lazy load last (onlyFooter to skip duplicate Reviews/FAQ) */}
      <LazySection rootMargin="100px" minHeight={400}>
        <Footer onlyFooter />
      </LazySection>
    </CardPageProvider>
  );
};

// Named export for App Router (without withApollo wrapper)
export { CardPage };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(CardPage, { ssr: false });
