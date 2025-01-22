import { FC, HTMLAttributes } from "react";
import Header from "../../Header";
import Hero from "../../DeckPage/Hero";

const Deck: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header />
    <Hero />
  </>
);

export default Deck;
