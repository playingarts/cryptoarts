/**
 * Listing Model
 *
 * Represents an NFT listing on OpenSea.
 */

import { model, Model, models, Schema } from "mongoose";

const listingSchema = new Schema<GQL.Listing, Model<GQL.Listing>, GQL.Listing>({
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
  (models.Listing as Model<GQL.Listing>) || model("Listing", listingSchema);
