import { FC, HTMLAttributes } from "react";
import { withApollo } from "../../../source/apollo";
import Hero from "./Hero";
import Header from "../../Header";

const Shop: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header />
    <Hero />
  </>
);

export default withApollo(Shop);
