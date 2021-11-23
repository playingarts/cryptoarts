import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    card(id: ID!): Card
  }

  type Card {
    id: ID!
    img: String
    video: String
    artist: String
    info: String
    deck: String
    suit: String
    value: String
    opensea: String
  }
`;
