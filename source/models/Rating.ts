/**
 * Rating Model
 *
 * Represents a customer review/rating.
 */

import { model, Model, models, Schema } from "mongoose";

const ratingSchema = new Schema<GQL.Rating, Model<GQL.Rating>, GQL.Rating>({
  who: String,
  review: String,
  title: String,
});

export const Rating =
  (models.Rating as Model<GQL.Rating>) || model("Rating", ratingSchema);
