import { gql } from "@apollo/client";
import { model, Model, models, Schema } from "mongoose";

const schema = new Schema<GQL.Listing, Model<GQL.Listing>, GQL.Listing>({
  price: {
    current: {
      value: String,
    },
  },
  protocol_data: {
    parameters: {
      offer: [
        {
          token: String,
          identifierOrCriteria: String,
        },
      ],
    },
  },
});

export const Listing =
  (models.Listing as Model<GQL.Listing>) || model("Listing", schema);

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
