/**
 * Artist Model
 *
 * Represents an artist who created card artwork.
 */

import { model, Model, models, Schema } from "mongoose";

const artistSchema = new Schema<GQL.Artist, Model<GQL.Artist>, GQL.Artist>({
  name: String,
  info: String,
  userpic: String,
  website: String,
  shop: String,
  country: String,
  slug: String,
  podcast: {
    type: {
      image: String,
      youtube: String,
      apple: String,
      spotify: String,
      episode: Number,
    },
    default: undefined,
  },
  social: {
    instagram: String,
    facebook: String,
    twitter: String,
    behance: String,
    dribbble: String,
    foundation: String,
    superrare: String,
    makersplace: String,
    knownorigin: String,
    rarible: String,
    niftygateway: String,
    showtime: String,
  },
});

export const Artist =
  (models.Artist as Model<GQL.Artist>) || model("Artist", artistSchema);
