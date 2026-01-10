"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { withApollo } from "../../../source/apollo";
import Header from "../../Header";
import Hero, { HERO_QUOTE_COUNT } from "../Home/Hero";
import Story from "../Home/Story";
import Footer from "../../Footer";
import { HeroCarouselProvider, HomeCard } from "../../../contexts/heroCarouselContext";
import LazySection from "../../LazySection";
import Skeleton from "../../LazySection/Skeleton";

// Lazy-load below-fold components for better initial page load
const Collection = dynamic(() => import("../Home/Collection"), {
  ssr: false,
  loading: () => <Skeleton height={600} />,
});
const Gallery = dynamic(() => import("../Home/Gallery"), {
  ssr: false,
  loading: () => <Skeleton height={800} />,
});
const AugmentedReality = dynamic(() => import("../Home/AugmentedReality"), {
  ssr: false,
  loading: () => <Skeleton height={500} />,
});
const Podcast = dynamic(() => import("../Home/Podcast"), {
  ssr: false,
  loading: () => <Skeleton height={400} />,
});

type Props = {
  homeCards?: HomeCard[];
};

const Home = ({ homeCards }: Props) => {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <HeroCarouselProvider
      initialCards={homeCards}
      onHeroReady={() => setHeroReady(true)}
      quoteCount={HERO_QUOTE_COUNT}
    >
      <Header
        links={["About", "Collection", "Gallery", "AR", "Reviews", "Podcast"]}
      />
      <Hero />

      {/* Story loads immediately after Hero - it's directly below fold */}
      <LazySection id="about" minHeight={heroReady ? undefined : 800}>
        {heroReady && <Story />}
      </LazySection>

      {/* Collection loads when user scrolls near it */}
      <LazySection id="collection" minHeight={600}>
        {heroReady && <Collection />}
      </LazySection>

      {/* Gallery loads when approaching */}
      <LazySection id="gallery" minHeight={800}>
        {heroReady && <Gallery />}
      </LazySection>

      {/* AR section */}
      <LazySection id="ar" minHeight={500}>
        {heroReady && <AugmentedReality />}
      </LazySection>

      {/* Footer with Podcast and Reviews */}
      <LazySection id="reviews" minHeight={600}>
        {heroReady && (
          <Footer>
            <Podcast id="podcast" />
          </Footer>
        )}
      </LazySection>
    </HeroCarouselProvider>
  );
};

// Named export for App Router (without withApollo wrapper)
export { Home };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Home, { ssr: false });
