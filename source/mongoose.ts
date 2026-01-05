import mongoose from "mongoose";

const { MONGOURL = "mongodb://127.0.0.1", MONGODB } = process.env;
const isDevelopment = process.env.NODE_ENV === "development";

// Cache connection for serverless environments (Vercel)
let cached = (global as typeof globalThis & { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose;

if (!cached) {
  cached = (global as typeof globalThis & { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  // Return cached connection if available
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const connectionUrl = process.env.MONGOLOCAL === "true"
      ? "mongodb://127.0.0.1:27017"
      : MONGOURL;

    cached!.promise = mongoose.connect(connectionUrl, {
      dbName: MONGODB,
      ...(isDevelopment
        ? { tlsAllowInvalidCertificates: true }
        : {}),
    }).then((mongoose) => {
      mongoose.set("returnOriginal", false);
      return mongoose;
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
};
