import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    products(ids: [ID!]): [Product!]!
    convertEurToUsd(eur: Float!): Float
  }

  type Currencies {
    eur: Float!
    usd: Float!
  }

  type Product {
    _id: ID!
    deck: Deck
    decks: [Product!]
    labels: [String!]
    title: String!
    price: Currencies!
    fullPrice: Currencies
    status: String!
    type: String!
    image: String!
    image2: String!
    photos: [String!]
    cardGalleryPhotos: [String!]
    info: String
    description: String
    short: String!
  }

  type Mutation {
    updateProductPhotos(productId: ID!, photos: [String!]!): Product
    updateProductCardGalleryPhotos(productId: ID!, cardGalleryPhotos: [String!]!): Product
  }
`;
