import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Aldrich&display=swap"
          rel="stylesheet"
        />
        {/* <style global>{`
          body {
            font-family: Aldrich, sans-serif !important;
          }
        `}</style> */}
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
