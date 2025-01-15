import { writeFileSync } from "fs";
import mongoose from "mongoose";

const {
  MONGOURL = "mongodb://127.0.0.1",
  MONGODB,
  MONGOCERT = "",
  DOBUILD = "",
} = process.env;
const isDevelopment = process.env.NODE_ENV === "development";
const tlsCAFile = __dirname + "/mongo-ca.pem";

if (!isDevelopment) {
  writeFileSync(tlsCAFile, MONGOCERT);
}

export const connect = async () => {
  await mongoose.connect(
    process.env.MONGOLOCAL === "true" ? "mongodb://127.0.0.1:27017" : MONGOURL,
    {
      dbName: MONGODB,
      ...(isDevelopment || DOBUILD === "true"
        ? {
            tlsAllowInvalidCertificates: true,
          }
        : {
            authSource: "admin",
            ssl: true,
            tlsCAFile,
          }),
    }
  );

  mongoose.set("returnOriginal", false);
};
