import { gql } from "@apollo/client";
import { Schema, model, models, Model } from "mongoose";
import GraphQLJSON from "graphql-type-json";

const schema = new Schema<GQL.Deck, Model<GQL.Deck>, GQL.Deck>({
  title: String,
  short: String,
  slug: String,
  info: String,
  image: String,
  description: { type: String, default: null },
  properties: { type: Object, default: {} },
  openseaCollection: { type: String, default: null },
  openseaContract: { type: String, default: null },
  cardBackground: { type: String, default: null },
});

export const Deck = (models.Deck as Model<GQL.Deck>) || model("Deck", schema);

const getDecks = async () => Deck.find();

export const getDeck = async (
  options: Pick<GQL.Deck, "slug"> | Pick<GQL.Deck, "_id">
) => (await Deck.findOne(options)) || undefined;

export const resolvers: GQL.Resolvers = {
  JSON: GraphQLJSON,
  Deck: {
    properties: ({ properties }) => properties || {},
  },
  Query: {
    decks: getDecks,
    deck: (_, { slug }) => getDeck({ slug }),
  },
};

export const typeDefs = gql`
  scalar JSON

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
    openseaCollection: String
    openseaContract: String
    cardBackground: String
    image: String
    properties: JSON!
    description: String
  }
`;
