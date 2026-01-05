/**
 * Contract Model
 *
 * Represents an NFT smart contract associated with a deck.
 */

import { model, Model, models, Schema, Types } from "mongoose";

export type MongoContract = Omit<GQL.Contract, "deck"> & {
  deck?: string;
};

const contractSchema = new Schema<MongoContract, Model<MongoContract>, MongoContract>({
  name: String,
  address: String,
  deck: { type: Types.ObjectId, ref: "Deck" },
});

export const Contract =
  (models.Contract as Model<MongoContract>) || model("Contract", contractSchema);
