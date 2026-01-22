/**
 * OpenSea Cache Model
 *
 * Stores cached OpenSea statistics to avoid expensive API calls.
 * Updated periodically via a scheduled job.
 */

import { model, Model, models, Schema } from "mongoose";

export interface IOpenseaCache {
  collection: string; // e.g., "cryptoedition"
  updatedAt: Date;

  // Collection stats (from OpenSea API)
  volume: number;
  floor_price: number;
  num_owners: number;
  total_supply: number;
  on_sale: number;
  sales_count: number;
  average_price: number;

  // Last sale info
  last_sale?: {
    price: number;
    symbol: string;
    seller: string;
    buyer: string;
    nft_name: string;
    nft_image: string;
    timestamp: number;
  };

  // Holder statistics (calculated from NFT ownership)
  holders?: {
    fullDecks: string[];
    fullDecksWithJokers: string[];
    spades: string[];
    hearts: string[];
    clubs: string[];
    diamonds: string[];
    jokers: string[];
  };
}

const openseaCacheSchema = new Schema<IOpenseaCache, Model<IOpenseaCache>, IOpenseaCache>({
  collection: { type: String, required: true, unique: true, index: true },
  updatedAt: { type: Date, default: Date.now },

  volume: Number,
  floor_price: Number,
  num_owners: Number,
  total_supply: Number,
  on_sale: Number,
  sales_count: Number,
  average_price: Number,

  last_sale: {
    price: Number,
    symbol: String,
    seller: String,
    buyer: String,
    nft_name: String,
    nft_image: String,
    timestamp: Number,
  },

  holders: {
    fullDecks: [String],
    fullDecksWithJokers: [String],
    spades: [String],
    hearts: [String],
    clubs: [String],
    diamonds: [String],
    jokers: [String],
  },
});

export const OpenseaCache = (models.OpenseaCache as Model<IOpenseaCache>) || model("OpenseaCache", openseaCacheSchema);
