/**
 * Podcast Model
 *
 * Represents a podcast episode featuring an artist.
 */

import { Schema, model, models, Model } from "mongoose";

const podcastSchema = new Schema<GQL.Podcast, Model<GQL.Podcast>, GQL.Podcast>({
  image: String,
  youtube: String,
  apple: String,
  spotify: String,
  episode: Number,
  name: String,
  podcastName: String,
  desc: String,
  time: String,
});

export const Podcast =
  (models.Podcast as Model<GQL.Podcast>) || model("Podcast", podcastSchema);
