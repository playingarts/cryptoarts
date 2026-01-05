/**
 * Deal Model
 *
 * Represents a discount deal for NFT holders.
 */

import { model, Model, models, Schema, Types } from "mongoose";

export type MongoDeal = Omit<GQL.Deal, "deck"> & {
  deck?: string;
};

const dealSchema = new Schema<GQL.Deal, Model<GQL.Deal>, GQL.Deal>({
  code: String,
  hash: { type: String, default: null },
  decks: Number,
  deck: { type: Types.ObjectId, ref: "Deck", default: null },
  claimed: { type: Boolean, default: false },
});

export const Deal = (models.Deal as Model<MongoDeal>) || model("Deal", dealSchema);
