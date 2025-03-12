import { FC, HTMLAttributes } from "react";
import { withApollo } from "../../../source/apollo";
import Hero from "./Hero";
import Header from "../../Header";
import Collection from "./Collection";
import Footer from "../../Footer";
import Trust from "./Trust";
import AugmentedReality from "../Home/AugmentedReality";
import Bundles from "./Bundles";
import Button from "../../Buttons/Button";
import ArrowButton from "../../Buttons/ArrowButton";
import Text from "../../Text";

const BagButton = () => {
  return <ArrowButton css={[{ marginLeft: "auto" }]}>Bag</ArrowButton>;
};

const Shop: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header
      customCTA={<BagButton />}
      customMiddle={
        <Text
          typography="paragraphSmall"
          css={[
            {
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              paddingRight: 19,
            },
          ]}
        >
          Free shipping for orders over $50!
        </Text>
      }
    />
    <Hero />
    <Collection />
    <Trust />
    <Bundles />
    <AugmentedReality />
    <Footer />
  </>
);

export default withApollo(Shop);
