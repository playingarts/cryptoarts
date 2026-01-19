import { GetServerSideProps } from "next";
import { connect } from "../../source/mongoose";
import { Product } from "../../source/graphql/schemas/product";

export { default } from "@/components/Pages/ProductPage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connect();

  const { pId } = context.params || {};

  if (typeof pId === "string") {
    // Find product by short name (lowercased, no spaces)
    const products = await Product.find({ hidden: { $ne: true } });
    const product = products.find(
      (p) => p.short.toLowerCase().replace(/\s/g, "") === pId
    );

    // Return 404 for bundles
    if (product?.type === "bundle") {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {},
  };
};
