/**
 * Deck Model
 *
 * Represents a deck of playing cards (e.g., "zero", "one", "crypto").
 */

import { model, Model, models, Schema, Types } from "mongoose";

export type MongoDeck = Omit<GQL.Deck, "previewCards"> & {
  previewCards?: string[];
};

const deckSchema = new Schema<MongoDeck, Model<MongoDeck>, MongoDeck>({
  title: String,
  short: String,
  slug: String,
  info: String,
  image: String,
  intro: String,
  previewCards: {
    type: [{ type: Types.ObjectId, ref: "Card" }],
    default: null,
  },
  backgroundImage: { type: String, default: null },
  description: { type: String, default: null },
  openseaCollection: { type: Object, default: null },
  properties: { type: Object, default: {} },
  editions: { type: Object, default: null },
  cardBackground: { type: String, default: null },
  labels: { type: Object, default: null },
});

export const Deck = (models.Deck as Model<MongoDeck>) || model("Deck", deckSchema);
