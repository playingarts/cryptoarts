import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    deal(hash: String!, deckId: String!, signature: String!): Deal
  }

  type Deal {
    _id: ID!
    code: String!
    hash: String
    decks: Int
    deck: Deck
    claimed: Boolean
  }
`;
