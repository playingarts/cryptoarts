import express from "express";
import next from "next";
import redirector from "redirect-https";
import { expressLogger } from "./logger";
import { connect } from "./mongoose";

const { PORT = "3000" } = process.env;
const app = next({ dev: process.env.NODE_ENV === "development" });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(connect)
  .then(() => {
    const server = express();

    server.use(expressLogger);

    if (process.env.NODE_ENV !== "development") {
      server.use(redirector({ trustProxy: true }));
    }

    server.all("*", (req, res) => handle(req, res));
    server.listen(PORT);
  });
