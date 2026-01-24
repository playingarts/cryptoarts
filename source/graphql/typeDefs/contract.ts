import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    contract(name: String, address: String, deck: ID): Contract
  }

  type Contract {
    name: String!
    address: String!
    deck: Deck!
  }
`;
