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
  return process.env.SHOW_NEW !== "true" ? null : (
    <>
      <Header />
      <Hero />
      <Story />
      <Collection />
      <Gallery />
      <AugmentedReality />
      <Footer>
        <Podcast />
      </Footer>
    </>
  );
};

export default withApollo(Home);
