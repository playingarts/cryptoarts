/**
 * Product Model
 *
 * Represents a purchasable product (deck, bundle, sheet).
 */

import { model, Model, models, Schema, Types } from "mongoose";

export type MongoProduct = Omit<GQL.Product, "deck" | "decks"> & {
  deck?: string;
  decks?: string[];
};

const productSchema = new Schema<GQL.Product, Model<GQL.Product>, GQL.Product>({
  title: String,
  price: {
    eur: Number,
    usd: Number,
  },
  fullPrice: {
    type: {
      eur: Number,
      usd: Number,
    },
    default: null,
  },
  status: String,
  type: {
    type: String,
    enum: ["deck", "bundle", "sheet", "gaga"],
    required: true,
  },
  image: String,
  image2: String,
  photos: { type: [String], default: [] },
  cardGalleryPhotos: { type: [String], default: [] },
  description: { type: String, default: null },
  info: String,
  short: String,
  deck: { type: Types.ObjectId, ref: "Deck" },
  decks: {
    type: [{ type: Types.ObjectId, ref: "Product" }],
    default: null,
  },
  labels: { type: Object, default: null },
});

export const Product =
  (models.Product as Model<MongoProduct>) || model("Product", productSchema);
