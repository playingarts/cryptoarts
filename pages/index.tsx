import { connect } from "../source/mongoose";
import { cardService } from "../source/services/CardService";
import { initApolloClient } from "../source/apollo";
import { DecksQuery } from "../hooks/deck";
import { RandomCardsQueryWithoutDeck } from "../hooks/card";
import Home from "@/components/Pages/Home";

export default Home;

export const getStaticProps = async () => {
  await connect();

  // Initialize Apollo client with schema for SSR
  const { schema } = await import("../source/graphql/schema");
  const apolloClient = initApolloClient(undefined, { schema });

  // Pre-fetch queries in parallel like main site does
  // This populates the Apollo cache which gets shipped to client
  const [, , homeCards] = await Promise.all([
    apolloClient.query({ query: DecksQuery }),
    apolloClient.query({ query: RandomCardsQueryWithoutDeck, variables: { limit: 100 } }),
    cardService.getHomeCards(500),
  ]);

  // Serialize homeCards for Next.js (remove Mongoose internals)
  const serializedCards = homeCards.map((card) => ({
    _id: card._id.toString(),
    img: card.img,
    cardBackground: card.cardBackground,
    deck: card.deck ? { slug: (card.deck as GQL.Deck).slug } : undefined,
    artist: card.artist
      ? {
          slug: card.artist.slug,
          name: card.artist.name,
          country: card.artist.country,
        }
      : undefined,
  }));

  return {
    props: {
      homeCards: serializedCards,
      // Ship Apollo cache to client for instant hydration
      cache: apolloClient.cache.extract(),
    },
    // Revalidate every hour for better edge caching (was 60s)
    revalidate: 3600,
  };
};
