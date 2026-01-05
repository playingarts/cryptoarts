/**
 * Card Model
 *
 * Represents a playing card in a deck.
 * Also exports Loser model which uses the same schema.
 */

import { model, Model, models, Schema, Types } from "mongoose";

export type MongoCard = Omit<GQL.Card, "artist" | "deck" | "animator"> & {
  artist?: string;
  animator?: string;
  deck?: string;
};

const cardSchema = new Schema<MongoCard, Model<MongoCard>, MongoCard>({
  img: String,
  video: String,
  info: String,
  value: String,
  background: { type: String, default: null },
  suit: String,
  edition: String,
  erc1155: {
    type: {
      contractAddress: String,
      token_id: String,
    },
    default: null,
  },
  artist: { type: Types.ObjectId, ref: "Artist" },
  animator: { type: Types.ObjectId, ref: "Artist" },
  deck: { type: Types.ObjectId, ref: "Deck" },
  reversible: Boolean,
  cardBackground: { type: String, default: null },
});

export const Card = (models.Card as Model<MongoCard>) || model("Card", cardSchema);

/**
 * Loser model - uses same schema as Card
 * Represents "loser" cards in the art contest
 */
export const Loser =
  (models.Loser as Model<MongoCard>) || model("Loser", cardSchema);
