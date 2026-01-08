"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { withApollo } from "../../../source/apollo";
import Header from "../../Header";
import Hero from "../Home/Hero";
import Story from "../Home/Story";
import Footer from "../../Footer";
import { HeroCarouselProvider } from "../../../contexts/heroCarouselContext";

// Lazy-load below-fold components for better initial page load
const Collection = dynamic(() => import("../Home/Collection"), {
  ssr: true,
});
const Gallery = dynamic(() => import("../Home/Gallery"), {
  ssr: true,
});
const AugmentedReality = dynamic(() => import("../Home/AugmentedReality"), {
  ssr: true,
});
const Podcast = dynamic(() => import("../Home/Podcast"), {
  ssr: true,
});

type HomeCard = {
  _id: string;
  img: string;
  cardBackground: string;
};

type Props = {
  homeCards?: HomeCard[];
};

const Home = ({ homeCards }: Props) => {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <HeroCarouselProvider
      initialCards={homeCards}
      onHeroReady={() => setHeroReady(true)}
    >
      <Header
        links={["About", "Collection", "Gallery", "AR", "Reviews", "Podcast"]}
      />
      <Hero />
      {heroReady && (
        <>
          <Story id="about" />
          <Collection id="collection" />
          <Gallery id="gallery" />
          <AugmentedReality id="ar" />
          <Footer>
            <Podcast id="podcast" />
          </Footer>
        </>
      )}
    </HeroCarouselProvider>
  );
};

// Named export for App Router (without withApollo wrapper)
export { Home };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Home, { ssr: false });
