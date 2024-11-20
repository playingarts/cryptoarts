import { gql } from "@apollo/client";
import GraphQLJSON from "graphql-type-json";
import { model, Model, models, Schema } from "mongoose";
import { getProduct } from "./product";

const schema = new Schema<GQL.Deck, Model<GQL.Deck>, GQL.Deck>({
  title: String,
  short: String,
  slug: String,
  info: String,
  image: String,
  intro: String,
  backgroundImage: { type: String, default: null },
  description: { type: String, default: null },
  openseaCollection: { type: Object, default: null },
  properties: { type: Object, default: {} },
  editions: { type: Object, default: null },
  cardBackground: { type: String, default: null },
  labels: { type: Object, default: null },
});

export const Deck = (models.Deck as Model<GQL.Deck>) || model("Deck", schema);

export const getDecks = async () => Deck.find();

export const getDeck = async (
  options: Pick<GQL.Deck, "slug"> | Pick<GQL.Deck, "_id">
) => (await Deck.findOne(options)) || undefined;

export const resolvers: GQL.Resolvers = {
  JSON: GraphQLJSON,
  Deck: {
    properties: ({ properties }) => properties || {},
    product: ({ _id }) => getProduct({ deck: _id }),
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
    intro: String!
    slug: ID!
    openseaCollection: OpenseaCollection
    cardBackground: String
    image: String
    properties: JSON!
    description: String
    backgroundImage: String
    product: Product
    editions: [Edition!]
    labels: [String!]
  }

  type Edition {
    name: String!
    url: String!
    img: String
  }

  type OpenseaCollection {
    name: String!
    address: String!
  }
`;
