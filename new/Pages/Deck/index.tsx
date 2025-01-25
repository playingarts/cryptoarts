import { FC, HTMLAttributes } from "react";
import Header from "../../Header";
import Hero from "./Hero";
import CardList from "./CardList";
import TheProduct from "./TheProduct";
import Gallery from "./Gallery";
import Footer from "../../Footer";
import { withApollo } from "../../../source/apollo";

const Deck: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header />
    <Hero />
    <CardList />
    <TheProduct />
    <Gallery />
    <Footer />
  </>
);

export default withApollo(Deck);
