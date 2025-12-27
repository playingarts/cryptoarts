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
import { getDeckConfig } from "../../../source/deckConfig";

const CryptoSections = () => {
  const {
    query: { deckId },
  } = useRouter();
  const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);
  return !config.showGallery ? (
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
  const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);
  return config.showGallery ? <Gallery /> : null;
};

const DeckHeader = () => {
  const {
    query: { deckId },
  } = useRouter();
  const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);

  return (
    <Header
      links={[
        ...["Cards", "Product"],
        ...config.sections,
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
    <CryptoSections />
    <DeckGallery />
    <Footer />
  </>
);

export default withApollo(Deck, { ssr: false });
