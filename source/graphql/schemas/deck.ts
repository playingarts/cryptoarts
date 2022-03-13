import { gql } from "@apollo/client";
import { Schema, model, models, Model } from "mongoose";

const schema = new Schema<GQL.Deck, Model<GQL.Deck>, GQL.Deck>({
  title: String,
  short: String,
  slug: String,
  info: String,
  opensea: { type: String, default: null },
  cardBackground: { type: String, default: null },
});

export const Deck = (models.Deck as Model<GQL.Deck>) || model("Deck", schema);

const getDecks = async () => Deck.find();

export const getDeck = async (
  options: Pick<GQL.Deck, "slug"> | Pick<GQL.Deck, "_id">
) => (await Deck.findOne(options)) || undefined;

export const resolvers: GQL.Resolvers = {
  Query: {
    decks: getDecks,
    deck: (_, { slug }) => getDeck({ slug }),
  },
};

export const typeDefs = gql`
  type Query {
    decks: [Deck!]!
    deck(slug: String!): Deck
  }

  type Deck {
    _id: String!
    title: String!
    short: String!
    info: String!
    slug: ID!
    opensea: String
    cardBackground: String
  }
`;
