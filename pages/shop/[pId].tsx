import { GetServerSideProps } from "next";
import { connect } from "../../source/mongoose";
import { Product } from "../../source/graphql/schemas/product";
import { initApolloClient } from "../../source/apollo";
import { ProductsQuery } from "../../hooks/product";

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

    // Return 404 for bundles or non-existent products
    if (!product || product.type === "bundle") {
      return {
        notFound: true,
      };
    }

    // Import schema for SSR
    const { schema } = await import("../../source/graphql/schema");
    const apolloClient = initApolloClient(undefined, { schema });

    try {
      // Prefetch all products during SSR (needed for navigation arrows)
      await apolloClient.query({
        query: ProductsQuery,
      });
    } catch (error) {
      console.error("Failed to prefetch products:", error);
    }

    // Preload hero image
    if (product.image2) {
      context.res.setHeader(
        "Link",
        `<${product.image2}>; rel=preload; as=image`
      );
    }

    return {
      props: {
        cache: apolloClient.cache.extract(),
      },
    };
  }

  return {
    props: {},
  };
};
