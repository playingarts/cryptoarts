import { GetStaticPaths } from "next";
import { connect } from "../../../source/mongoose";
import { products } from "../../../dump/products";

export { default } from "../../../new/Pages/ProductPage";

export const getStaticProps = async () => {
  await connect();
  return {
    // returns the default 404 page with a status code of 404 in production
    props: {
      notFound: process.env.SHOW_NEW !== "true",
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: products.map((product) => ({
      params: { pId: product.short.toLowerCase().split(" ").join("") },
    })),
    fallback: "blocking",
  };
};
