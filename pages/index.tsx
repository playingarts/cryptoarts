import { connect } from "../source/mongoose";
import { cardService } from "../source/services/CardService";
import Home from "@/components/Pages/Home";

export default Home;

export const getStaticProps = async () => {
  await connect();

  // Fetch all home cards server-side for the full deck carousel
  // Cards will cycle through without repeating until all have been shown
  const homeCards = await cardService.getHomeCards(500);

  // Serialize for Next.js (remove Mongoose internals)
  const serializedCards = homeCards.map((card) => ({
    _id: card._id.toString(),
    img: card.img,
    cardBackground: card.cardBackground,
    deck: card.deck ? { slug: (card.deck as GQL.Deck).slug } : undefined,
    artist: card.artist ? { slug: card.artist.slug } : undefined,
  }));

  return {
    props: {
      homeCards: serializedCards,
    },
    // Revalidate every 60 seconds for fresh data with cached performance
    revalidate: 60,
  };
};
