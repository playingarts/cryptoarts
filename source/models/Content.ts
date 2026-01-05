/**
 * Content Model
 *
 * Generic key-value store for application content.
 * Used for things like daily card selection.
 */

import { model, Model, models, Schema } from "mongoose";

export interface MongoContent {
  key: string;
  data: Record<string, unknown>;
}

const contentSchema = new Schema<MongoContent, Model<MongoContent>, MongoContent>({
  key: String,
  data: { type: Object, default: {} },
});

export const Content =
  (models.Content as Model<MongoContent>) || model("Content", contentSchema);
