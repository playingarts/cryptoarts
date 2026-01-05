/**
 * Nft Model
 *
 * Represents an NFT from OpenSea.
 */

import { model, Model, models, Schema } from "mongoose";

const nftSchema = new Schema<GQL.Nft, Model<GQL.Nft>, GQL.Nft>({
  identifier: String,
  contract: String,
  token_standard: String,
  name: String,
  description: String,
  traits: [
    {
      trait_type: String,
      value: String,
    },
  ],
  owners: [
    {
      address: String,
      quantity: String,
    },
  ],
});

export const Nft = (models.Nft as Model<GQL.Nft>) || model("Nft", nftSchema);
