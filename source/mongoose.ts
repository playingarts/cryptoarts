import mongoose from "mongoose";
import { writeFileSync } from "fs";

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
  await mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGODB,
    ...(isDevelopment
      ? {
          tlsAllowInvalidCertificates: true,
        }
      : {
          sslValidate: true,
          ssl: true,
          tlsCAFile,
        }),
  });

  mongoose.set("useFindAndModify", false);
  mongoose.set("returnOriginal", false);
};
