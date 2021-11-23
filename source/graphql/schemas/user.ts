import { gql } from "@apollo/client";

export const resolvers: GQL.Resolvers = {
  Query: {
    user: async (_, __, { req }) => {
      console.log("!!!!", !!req);
      return (req as any).user;
    },
  },
};

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
