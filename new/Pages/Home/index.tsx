import { withApollo } from "../../../source/apollo";
import Header from "../../Header";
import AugmentedReality from "../../Home/AugmentedReality";
import Collection from "../../Home/Collection";
import Gallery from "../../Home/Gallery";
import Hero from "../../Home/Hero";
import Story from "../../Home/Story";
import Testimonials from "../../Home/Testimonials";

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
    </>
  );
};

export default withApollo(Home);
