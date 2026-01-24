/**
 * Listing Resolvers
 */

import { Listing } from "../../models";

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
