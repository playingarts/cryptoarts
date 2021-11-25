import { Fragment } from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { Global } from "@emotion/react";
import { theme } from "./_app";

export const Links = () => (
  <Fragment>
    <Global
      styles={{
        "h1, h2,h5": {
          fontFamily: theme.fonts.aldrichFont,
          fontWeight: 400,
          letterSpacing: "-0.05em",
          margin: 0,
        },
        h1: {
          fontSize: 100,
          lineHeight: "98px",
        },
        h2: {
          fontSize: 60,
          lineHeight: "65px",
        },
        h5: {
          fontSize: "25px",
          lineHeight: "30px",
          textTransform: "uppercase",
        },
        body: {
          background: "#e5e5e5",
          fontFamily: "Work Sans, sans-serif",
        },
      }}
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Aldrich&family=Work+Sans:wght@400;600&display=swap"
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
