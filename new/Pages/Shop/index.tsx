import { FC, HTMLAttributes } from "react";
import { withApollo } from "../../../source/apollo";
import Hero from "./Hero";
import Header from "../../Header";
import Collection from "./Collection";
import Footer from "../../Footer";

const Shop: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header />
    <Hero />
    <Collection />
    <Footer />
  </>
);

export default withApollo(Shop);
