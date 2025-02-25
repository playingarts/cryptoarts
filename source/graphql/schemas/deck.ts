import { gql } from "@apollo/client";
import GraphQLJSON from "graphql-type-json";
import { model, Model, models, Schema, Types } from "mongoose";
import { getProduct } from "./product";

export type MongoDeck = Omit<GQL.Deck, "previewCards"> & {
  previewCards?: string[];
};

const schema = new Schema<MongoDeck, Model<MongoDeck>, MongoDeck>({
  title: String,
  short: String,
  slug: String,
  info: String,
  image: String,
  intro: String,
  previewCards: {
    type: [{ type: Types.ObjectId, ref: "Card" }],
    default: null,
  },
  backgroundImage: { type: String, default: null },
  description: { type: String, default: null },
  openseaCollection: { type: Object, default: null },
  properties: { type: Object, default: {} },
  editions: { type: Object, default: null },
  cardBackground: { type: String, default: null },
  labels: { type: Object, default: null },
});

export const Deck = (models.Deck as Model<MongoDeck>) || model("Deck", schema);

export const getDecks = async () =>
  Deck.find().populate("previewCards") as unknown as Promise<GQL.Deck[]>;

export const getDeck = (
  options: Pick<GQL.Deck, "slug"> | Pick<GQL.Deck, "_id">
) =>
  Deck.findOne(options).populate(
    "previewCards"
  ) as unknown as Promise<GQL.Deck>;

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
    previewCards: [Card!]
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
