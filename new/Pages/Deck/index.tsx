import { useRouter } from "next/router";
import { FC, Fragment, HTMLAttributes } from "react";
import { withApollo } from "../../../source/apollo";
import Footer from "../../Footer";
import Header from "../../Header";
import AugmentedReality from "../Home/AugmentedReality";
import CardList from "./CardList";
import Gallery from "./Gallery";
import Hero from "./Hero";
import PACE from "./PACE";
import TheProduct from "./TheProduct";

const OnlyCrypto = () => {
  const {
    query: { deckId },
  } = useRouter();
  return deckId === "crypto" ? (
    <Fragment>
      <PACE />
      <AugmentedReality />
    </Fragment>
  ) : null;
};

const DeckGallery = () => {
  const {
    query: { deckId },
  } = useRouter();

  return deckId !== "crypto" ? <Gallery /> : null;
};

const DeckHeader = () => {
  const {
    query: { deckId },
  } = useRouter();

  return (
    <Header
      links={[
        ...["Cards", "Product"],
        ...(deckId === "crypto" ? ["PACE", "AR"] : ["Gallery", "Reviews"]),
      ]}
    />
  );
};

const Deck: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <DeckHeader />
    <Hero />
    <CardList />
    <TheProduct />
    <OnlyCrypto />
    <DeckGallery />
    <Footer />
  </>
);

export default withApollo(Deck, { ssr: false });
