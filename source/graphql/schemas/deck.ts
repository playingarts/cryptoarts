import { gql } from "@apollo/client";
import { Schema, model, models, Model } from "mongoose";

export type MongoDeck = Omit<GQL.Deck, "">;

const schema = new Schema<GQL.Deck, Model<GQL.Deck>, GQL.Deck>({
  title: String,
  slug: String,
  info: String,
});

export const Deck = (models.Deck as Model<GQL.Deck>) || model("Deck", schema);

const getDecks = async () => Deck.find();

const getDeck = async (options: Pick<GQL.Deck, "slug">) =>
  (await Deck.findOne(options)) || undefined;

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
    _id: ID!
    title: String!
    info: String!
    slug: String!
  }
`;
