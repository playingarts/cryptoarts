import { gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";

const schema = new Schema<GQL.Card, Model<GQL.Card>, GQL.Card>({
  img: String,
  deck: { type: Types.ObjectId, ref: "Deck" },
});

export const Card = (models.Card as Model<GQL.Card>) || model("Card", schema);

const getDeckCards = async (deck?: string) => Card.find({ deck });

export const resolvers: GQL.Resolvers = {
  Query: {
    cards: async (_, { deck }) => getDeckCards(deck),
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
    artist: String!
    info: String
    deck: String
    suit: String
    value: String
    opensea: String
  }
`;
