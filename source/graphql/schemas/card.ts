import { gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";

type MongoCard = Omit<GQL.Card, "artist" | "deck"> & {
  artist?: string;
  deck?: string;
};

const schema = new Schema<MongoCard, Model<MongoCard>, MongoCard>({
  img: String,
  artist: { type: Types.ObjectId, ref: "Artist" },
  deck: { type: Types.ObjectId, ref: "Deck" },
});

export const Card = (models.Card as Model<MongoCard>) || model("Card", schema);

const getDeckCards = (deck?: string) => Card.find({ deck });

export const resolvers: GQL.Resolvers = {
  Query: {
    cards: (_, { deck }) => {
      return (getDeckCards(deck).populate([
        "artist",
        "deck",
      ]) as unknown) as Promise<GQL.Card[]>;
    },
  },
};

export const typeDefs = gql`
  type Query {
    cards(deck: ID): [Card!]!
    card(id: ID!): Card
  }

  type Card {
    _id: ID!
    img: String!
    video: String
    artist: Artist!
    info: String
    deck: Deck!
    suit: String
    value: String
    opensea: String
  }
`;
