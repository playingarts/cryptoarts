import { gql } from "@apollo/client";
import { Content, type MongoContent } from "../../models";
import { getCard, getCards } from "./card";

export { Content, type MongoContent };

const getDailyCard = async () => {
  const content = await Content.findOne({ key: "dailyCard" });

  const { date, cardId } = (content ? content.data : {}) as {
    date: number;
    cardId: string;
  };

  if (
    process.env.NODE_ENV === "development" ||
    !cardId ||
    !date ||
    new Date(date).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)
  ) {
    const newCard = await getCards({ limit: 1, shuffle: true }).then(
      (cards) => cards[0]
    );

    await Content.findOneAndUpdate(
      { key: "dailyCard" },
      {
        key: "dailyCard",
        data: {
          date: Date.now(),
          cardId: newCard._id,
        },
      },
      { upsert: true }
    );
    console.log(
      "New daily card: " +
        newCard.value +
        " " +
        newCard.suit +
        " " +
        newCard.deck.slug
    );

    return newCard;
  }

  return getCard({ id: cardId });
};

export const resolvers: GQL.Resolvers = {
  Query: {
    dailyCard: getDailyCard,
  },
};

export const typeDefs = gql`
  type Query {
    dailyCard: Card!
  }
`;
