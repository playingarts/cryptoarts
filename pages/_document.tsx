import { Fragment } from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { Global } from "@emotion/react";
import { theme } from "./_app";

const Links = () => (
  <Fragment>
    <Global
      styles={{
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        body: {
          background: "#e5e5e5",
          fontFamily: "Work Sans, sans-serif",
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
      }}
    />
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
