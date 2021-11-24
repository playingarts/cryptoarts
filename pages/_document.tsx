import { Fragment } from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { Global } from "@emotion/react";

export const Links = () => (
  <Fragment>
    <Global
      styles={{
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
