import { gql } from "@apollo/client";
import GraphQLJSON from "graphql-type-json";
import { Deck, type MongoDeck } from "../../models";
import { getProduct } from "./product";

export { Deck, type MongoDeck };

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
