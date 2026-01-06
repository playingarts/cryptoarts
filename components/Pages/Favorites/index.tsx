import { FC, HTMLAttributes } from "react";
import Header from "../../Header";
import Hero from "./Hero";
import Footer from "../../Footer";
import { withApollo } from "../../../source/apollo";
import Cards from "./Cards";

const Favorites: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <>
      <Header />
      <Hero />
      <Cards />
      <Footer onlyFooter />
    </>
  );
};

export default withApollo(Favorites, { ssr: false });
