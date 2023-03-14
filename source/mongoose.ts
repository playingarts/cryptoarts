import { writeFileSync } from "fs";
import mongoose from "mongoose";

const {
  MONGOURL = "mongodb://127.0.0.1",
  MONGODB,
  MONGOCERT = "",
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
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: MONGODB,
      ...(isDevelopment
        ? {
            tlsAllowInvalidCertificates: true,
          }
        : {
            authSource: "admin",
            sslValidate: true,
            ssl: true,
            tlsCAFile,
          }),
    }
  );

  mongoose.set("useFindAndModify", false);
  mongoose.set("returnOriginal", false);
};

export const connectToDB = async () => {
  try {
    await connect();
  } catch {
    setTimeout(async () => {
      console.log({
        "Mongoose connection state": mongoose.connection.readyState,
      });
    }, 10000);

    await connectToDB();
  }
};
