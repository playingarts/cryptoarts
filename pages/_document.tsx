import { Global } from "@emotion/react";
import { Head, Html, Main, NextScript } from "next/document";
import { Fragment } from "react";
import { theme } from "./_app";

export const Links = () => (
  <Fragment>
    <Global
      styles={{
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        h7: theme.typography.h7,
        body: {
          // background: theme.colors.page_bg_light,
          background: theme.colors.white,
          fontFamily: "Work Sans, sans-serif",
          "@keyframes gradient": {
            "0%": {
              backgroundPosition: "0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%",
            },
            "100%": {
              backgroundPosition: "0% 50%",
            },
          },
        },
        svg: {
          verticalAlign: "top",
        },
        button: {
          cursor: "pointer",
        },
        input: {
          color: "inherit",
          background: "none",
          border: 0,
        },
        // width: theme.spacing(size === "small" ? 3.8 : 4.2),
        // height: theme.spacing(size === "small" ? 3.8 : 4.2),
        // [theme.mq.sm]: {
        //   width: theme.spacing(size === "small" ? 3.8 : 5),
        //   height: theme.spacing(size === "small" ? 3.8 : 5),
        // },
        ":root": {
          "--buttonSmallWidth": `${theme.spacing(3.8)}px`,
          "--buttonSmallHeight": `${theme.spacing(3.8)}px`,
          [theme.maxMQ.sm]: {
            "--buttonHeight": `${theme.spacing(4.2)}px`,
            "--buttonWidth": `${theme.spacing(4.2)}px`,
          },
          [theme.mq.sm]: {
            "--buttonHeight": `${theme.spacing(5)}px`,
            "--buttonWidth": `${theme.spacing(5)}px`,
          },
          ".shader-web-background-fallback": {
            background: "white",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          },
        },
      }}
    />
    <meta name="theme-color" content="#fff" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Aldrich&family=Work+Sans:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </Fragment>
);

const Document = () => (
  <Html lang="en">
    <Head>
      <Links />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
