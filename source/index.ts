import express from "express";
import next from "next";
import redirector from "redirect-https";
import { Content } from "./graphql/schemas/content";
import { expressLogger } from "./logger";
import { connect } from "./mongoose";
// import isMobile from "is-mobile";

const { PORT = "3000" } = process.env;
const app = next({ dev: process.env.NODE_ENV === "development" });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(connect)
  .then(async () => {
    await Content.deleteMany({ key: "queue" });
  })
  .then(() => {
    const server = express();

    server.use(expressLogger);

    if (process.env.NODE_ENV !== "development") {
      server.use(redirector({ trustProxy: true }));
    }

    server.get("/en/*", (req, res) =>
      res.redirect(301, req.url.replace(/^\/en/, ""))
    );

    // server.use("*", (req, res, next) => {
    //   if (!req.originalUrl.startsWith("/api/") && isMobile({ ua: req })) {
    //     return res.redirect("https://www.playingarts.com/en" + req.originalUrl);
    //   }

    //   next();
    // });

    server.all("*", (req, res) => handler(req, res));
    server.listen(PORT);
  });
