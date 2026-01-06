"use client";

import { withApollo } from "../../../source/apollo";
import Header from "../../Header";
import AugmentedReality from "../Home/AugmentedReality";
import Collection from "../Home/Collection";
import Gallery from "../Home/Gallery";
import Hero from "../Home/Hero";
import Podcast from "../Home/Podcast";
import Story from "../Home/Story";
import Footer from "../../Footer";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Header
        links={["About", "Collection", "Gallery", "AR", "Reviews", "Podcast"]}
      />
      <Hero />
      <Story id="about" />
      <Collection id="collection" />
      <Gallery id="gallery" />
      <AugmentedReality id="ar" />
      <Footer>
        <Podcast id="podcast" />
      </Footer>
    </>
  );
};

// Named export for App Router (without withApollo wrapper)
export { Home };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Home, { ssr: false });
