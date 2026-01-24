import { gql } from "@apollo/client";
import GraphQLJSON from "graphql-type-json";
import { Deck, type MongoDeck } from "../../models";
import { deckService, productService } from "../../services";

export { Deck, type MongoDeck };

// Re-export service methods for backward compatibility
export const getDecks = () => deckService.getDecks();
export const getDeck = (options: Pick<GQL.Deck, "slug"> | Pick<GQL.Deck, "_id">) =>
  "slug" in options
    ? deckService.getDeckBySlug(options.slug)
    : deckService.getDeckById(options._id);

export const resolvers: GQL.Resolvers = {
  JSON: GraphQLJSON,
  Deck: {
    properties: ({ properties }) => deckService.getDeckProperties(properties),
    product: ({ _id }) => productService.getProduct({ deck: _id }),
  },
  Query: {
    decks: () => deckService.getDecks(),
    deck: (_, { slug }) => deckService.getDeckBySlug(slug),
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
