import { GetStaticProps } from "next";
import { connect } from "../source/mongoose";
import { initApolloClient } from "../source/apollo";
import { ProductsQuery } from "../hooks/product";

export { default } from "@/components/Pages/Bag";

export const getStaticProps: GetStaticProps = async () => {
  await connect();

  // Import schema for SSR
  const { schema } = await import("../source/graphql/schema");
  const apolloClient = initApolloClient(undefined, { schema });

  try {
    // Prefetch all products during SSR (bag items will be filtered on client)
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
    // Revalidate every hour - bag contents are client-side (localStorage)
    revalidate: 3600,
  };
};
