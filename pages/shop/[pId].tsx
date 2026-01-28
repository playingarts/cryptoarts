import { GetStaticProps, GetStaticPaths } from "next";
import { connect } from "../../source/mongoose";
import { Product } from "../../source/graphql/schemas/product";
import { initApolloClient } from "../../source/apollo";
import { ProductsQuery } from "../../hooks/product";

export { default } from "@/components/Pages/ProductPage";

export const getStaticPaths: GetStaticPaths = async () => {
  await connect();

  // Get all non-hidden, non-bundle products for static generation
  const products = await Product.find({ hidden: { $ne: true }, type: { $ne: "bundle" } });

  const paths = products.map((product) => ({
    params: { pId: product.slug || product.short.toLowerCase().replace(/\s/g, "") },
  }));

  return {
    paths,
    // Return 404 for unknown products
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  await connect();

  const { pId } = context.params || {};

  if (typeof pId === "string") {
    // Find product by short name (lowercased, no spaces)
    const products = await Product.find({ hidden: { $ne: true } });
    const product = products.find(
      (p) => (p.slug || p.short.toLowerCase().replace(/\s/g, "")) === pId
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

    return {
      props: {
        cache: apolloClient.cache.extract(),
      },
      // Revalidate every hour for fresh product data with caching
      revalidate: 3600,
    };
  }

  return {
    notFound: true,
  };
};
