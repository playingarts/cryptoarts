import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    ratings(title: String, deckSlug: String, shuffle: Boolean, limit: Int): [Rating!]!
  }

  type Rating {
    _id: ID!
    who: String!
    review: String!
    title: String!
    deckSlugs: [String!]
  }
`;
