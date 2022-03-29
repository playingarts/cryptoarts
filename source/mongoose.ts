import mongoose from "mongoose";

const {
  MONGOURL = "mongodb://127.0.0.1",
  MONGODB,
  MONGOUSER,
  MONGOPASS,
  MONGOCERT = "",
} = process.env;

export const connect = async () => {
  await mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: MONGOUSER,
    pass: MONGOPASS,
    dbName: MONGODB,
    ...(process.env.NODE_ENV === "development"
      ? {
          tlsAllowInvalidCertificates: true,
        }
      : {
          sslValidate: true,
          ssl: true,
          sslCA: [MONGOCERT],
        }),
  });

  mongoose.set("useFindAndModify", false);
  mongoose.set("returnOriginal", false);
};
