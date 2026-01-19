import { connect } from "../source/mongoose";
import { initApolloClient } from "../source/apollo";
import { ProductsQuery } from "../hooks/product";

export { default } from "@/components/Pages/Shop";

export const getServerSideProps = async () => {
  await connect();

  // Import schema for SSR
  const { schema } = await import("../source/graphql/schema");
  const apolloClient = initApolloClient(undefined, { schema });

  try {
    // Prefetch all products during SSR
    await apolloClient.query({
      query: ProductsQuery,
    });
  } catch (error) {
    console.error("Failed to prefetch products:", error);
    // Don't block page render on error
  }

  return {
    props: {
      cache: apolloClient.cache.extract(),
    },
  };
};
