import { withApollo } from "../../../source/apollo";
import FAQ from "../../NewFAQ";
import Header from "../../Header";
import AugmentedReality from "../../Home/AugmentedReality";
import Collection from "../../Home/Collection";
import Gallery from "../../Home/Gallery";
import Hero from "../../Home/Hero";
import Podcast from "../../Home/Podcast";
import Story from "../../Home/Story";
import Testimonials from "../../Home/Testimonials";
import Footer from "../../Footer";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Header />
      <Hero />
      <Story />
      <Collection />
      <Gallery />
      <AugmentedReality />
      <Testimonials />
      <Podcast />
      <FAQ />
      <Footer />
    </>
  );
};

export default withApollo(Home);
