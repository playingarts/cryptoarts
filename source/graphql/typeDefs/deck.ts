import { gql } from "@apollo/client";

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
