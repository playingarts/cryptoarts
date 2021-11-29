import { Card } from "../source/graphql/schemas/card";
import { Deck } from "../source/graphql/schemas/deck";
import { connect } from "../source/mongoose";

const dump = async () => {
  await connect();

  const slug = "crypto";
  const currentDeck = await Deck.findOne({ slug });

  if (currentDeck) {
    await Deck.deleteMany({ slug });
    await Card.deleteMany({ deck: currentDeck._id });
  }

  const deck = {
    title: "Crypto Edition",
    slug,
    info: "",
  };

  await Deck.create(deck);
};

export default dump;
