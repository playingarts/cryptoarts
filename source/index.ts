import express from "express";
import next from "next";
import redirector from "redirect-https";
import { expressLogger } from "./logger";
import { connect } from "./mongoose";
import routes from "./routes";
import isMobile from "is-mobile";

const { PORT = "3000" } = process.env;
const app = next({ dev: process.env.NODE_ENV === "development" });
const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(connect)
  .then(() => {
    const server = express();

    server.use(expressLogger);

    if (process.env.NODE_ENV !== "development") {
      server.use(redirector({ trustProxy: true }));
    }

    server.get("/en/*", (req, res) =>
      res.redirect(301, req.url.replace(/^\/en/, ""))
    );

    server.use("*", (req, res, next) => {
      if (isMobile({ ua: req, tablet: true })) {
        return res.redirect("https://www.playingarts.com/en" + req.originalUrl);
      }

      next();
    });

    server.use(handler);
    server.listen(PORT);
  });
