import { connect } from "../source/mongoose";
import { cardService } from "../source/services/CardService";
import Home from "@/components/Pages/Home";

export default Home;

export const getServerSideProps = async () => {
  await connect();

  // Fetch home cards server-side for instant hero rendering
  const homeCards = await cardService.getHomeCards(3);

  // Serialize for Next.js (remove Mongoose internals)
  const serializedCards = homeCards.map((card) => ({
    _id: card._id.toString(),
    img: card.img,
    cardBackground: card.cardBackground,
  }));

  return {
    props: {
      homeCards: serializedCards,
    },
  };
};
