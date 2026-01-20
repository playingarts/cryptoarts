import { GetStaticProps } from "next";
import { connect } from "../source/mongoose";
import { initApolloClient } from "../source/apollo";
import { DecksQuery } from "../hooks/deck";

export { default } from "@/components/Pages/Favorites";

export const getStaticProps: GetStaticProps = async () => {
  await connect();

  // Import schema for SSR
  const { schema } = await import("../source/graphql/schema");
  const apolloClient = initApolloClient(undefined, { schema });

  try {
    // Prefetch decks for card display
    await apolloClient.query({ query: DecksQuery });
  } catch (error) {
    console.error("Failed to prefetch decks:", error);
  }

  return {
    props: {
      cache: apolloClient.cache.extract(),
    },
    // Revalidate every hour - favorites are stored client-side (localStorage)
    revalidate: 3600,
  };
};
