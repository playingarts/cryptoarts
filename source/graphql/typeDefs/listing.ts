import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    listings(addresses: [String], tokenIds: [String!]): [Listing]!
  }

  type Listing {
    price: Price!
    protocol_data: ProtocolData!
  }

  type ProtocolData {
    parameters: Parameters!
  }

  type Parameters {
    offer: [Offer!]!
  }

  type Offer {
    token: String!
    identifierOrCriteria: String!
  }

  type Price {
    current: Current!
  }

  type Current {
    value: String!
  }
`;
