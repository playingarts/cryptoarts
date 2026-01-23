/**
 * User Model
 *
 * Represents an admin or editor user who can log in via magic link.
 */

import { model, Model, models, Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  role: "admin" | "editor";
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "admin",
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast email lookups
userSchema.index({ email: 1 });

export const User =
  (models.User as Model<IUser>) || model<IUser>("User", userSchema);
