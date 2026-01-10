/**
 * UptimeCheck Model
 *
 * Stores health check results for service monitoring.
 * Uses TTL index to auto-delete records older than 30 days.
 */

import { model, Model, models, Schema } from "mongoose";

export type ServiceStatus = "up" | "down" | "degraded";

export type ServiceName =
  | "website"
  | "mongodb"
  | "graphql"
  | "opensea"
  | "mailerlite"
  | "redis"
  | "crazyaces";

export interface IUptimeCheck {
  service: ServiceName;
  status: ServiceStatus;
  latency: number; // milliseconds
  message?: string;
  timestamp: Date;
}

const uptimeCheckSchema = new Schema<IUptimeCheck, Model<IUptimeCheck>, IUptimeCheck>(
  {
    service: {
      type: String,
      required: true,
      enum: ["website", "mongodb", "graphql", "opensea", "mailerlite", "redis", "crazyaces"],
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["up", "down", "degraded"],
    },
    latency: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      default: null,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
  },
  {
    // Compound index for efficient queries by service and time
    timestamps: false,
  }
);

// TTL index: auto-delete records older than 30 days
uptimeCheckSchema.index({ timestamp: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

// Compound index for querying latest status per service
uptimeCheckSchema.index({ service: 1, timestamp: -1 });

export const UptimeCheck =
  (models.UptimeCheck as Model<IUptimeCheck>) ||
  model("UptimeCheck", uptimeCheckSchema);
