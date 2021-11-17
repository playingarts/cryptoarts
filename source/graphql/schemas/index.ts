import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    id: ID!
    name: String!
    username: String!
    picture: String!
    isAdmin: Boolean
  }
`;
