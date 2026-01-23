"use client";

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
      <Footer />
    </>
  );
};

// Named export for App Router (without withApollo wrapper)
export { Favorites };

// Default export with Apollo HOC for Pages Router backward compatibility
export default withApollo(Favorites, { ssr: false });
