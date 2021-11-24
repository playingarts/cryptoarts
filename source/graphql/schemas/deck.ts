import { gql } from "@apollo/client";
import { Schema, model, models, Model } from "mongoose";

const schema = new Schema<GQL.Deck, Model<GQL.Deck>, GQL.Deck>({
  title: String,
  slug: String,
  info: String,
});

const Deck = (models.Deck as Model<GQL.Deck>) || model("Deck", schema);

const getDecks = async () => Deck.find();

export const resolvers: GQL.Resolvers = {
  Query: {
    decks: getDecks,
  },
};

export const typeDefs = gql`
  type Query {
    decks: [Deck!]!
  }

  type Deck {
    _id: ID!
    title: String!
    info: String!
    slug: String!
  }
`;
