import express from "express";
import next from "next";
import mongoose from "mongoose";
import redirector from "redirect-https";

const { PORT = "3000" } = process.env;
const app = next({ dev: process.env.NODE_ENV === "development" });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  // const {
  //   MONGOURL = "127.0.0.1",
  //   MONGODB,
  //   MONGOUSER,
  //   MONGOPASS,
  //   MONGOCERT,
  // } = process.env;

  // await mongoose.connect(MONGOURL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   dbName: MONGODB,
  //   user: MONGOUSER,
  //   pass: MONGOPASS,
  //   ...(MONGOCERT
  //     ? {
  //         sslValidate: true,
  //         ssl: true,
  //         sslCA: [MONGOCERT],
  //       }
  //     : {}),
  // });

  // mongoose.set("returnOriginal", false);

  // if (!dev) {
  //   server.use(redirector({ trustProxy: true }));
  // }

  server.use((req, res, next) => {
    req.user = {
      id: "idddd",
      name: "naaaame",
      username: "usernameeeeeee",
      picture: "piiiiicture",
    };

    next();
  });

  server.all("*", (req, res) => handle(req, res));
  server.listen(PORT);
});
