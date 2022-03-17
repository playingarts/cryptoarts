import mongoose from "mongoose";

const {
  MONGOURL = "127.0.0.1",
  MONGODB,
  MONGOUSER,
  MONGOPASS,
  MONGOCERT,
} = process.env;

export const connect = async () => {
  await mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGODB,
    user: MONGOUSER,
    pass: MONGOPASS,
    ...(MONGOCERT
      ? {
          sslValidate: true,
          ssl: true,
          sslCA: [MONGOCERT],
        }
      : {}),
  });

  mongoose.set("useFindAndModify", false);
  mongoose.set("returnOriginal", false);
};
