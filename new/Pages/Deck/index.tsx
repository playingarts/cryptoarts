import { FC, HTMLAttributes } from "react";
import Header from "../../Header";
import Hero from "../../DeckPage/Hero";
import CardList from "../../DeckPage/CardList";

const Deck: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header />
    <Hero />
    <CardList />
  </>
);

export default Deck;
