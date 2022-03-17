import { gql } from "@apollo/client";
import { Schema, model, models, Model } from "mongoose";
import { getCards, getCard } from "./card";

export interface MongoContent {
  key: string;
  data: Record<string, any>;
}

const schema = new Schema<MongoContent, Model<MongoContent>, MongoContent>({
  key: String,
  data: { type: Object, default: {} },
});

export const Content =
  (models.Content as Model<MongoContent>) || model("Content", schema);

const getDailyCard = async () => {
  const content = await Content.findOne({ key: "dailyCard" });
  const { date, cardId } = (content ? content.data : {}) as {
    date: number;
    cardId: string;
  };

  if (
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
