import { gql } from "@apollo/client";
import { Listing } from "../../models";

export { Listing };

export const getListings = async ({
  addresses,
  tokenIds,
}: GQL.QueryListingsArgs) => {
  return addresses && tokenIds
    ? await Listing.find({
        "protocol_data.parameters.offer.token": { $in: addresses },
        "protocol_data.parameters.offer.identifierOrCriteria": {
          $in: tokenIds,
        },
      }).lean()
    : await Listing.find().lean();
};

export const resolvers: GQL.Resolvers = {
  Query: {
    listings: async (_, args) => await getListings(args),
  },
};

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
