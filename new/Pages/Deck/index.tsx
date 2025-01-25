import { FC, HTMLAttributes } from "react";
import Header from "../../Header";
import Hero from "../../DeckPage/Hero";
import CardList from "../../DeckPage/CardList";
import TheProduct from "../../DeckPage/TheProduct";

const Deck: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header />
    <Hero />
    <CardList />
    <TheProduct />
  </>
);

export default Deck;
