import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    dailyCard: Card!
  }
`;
