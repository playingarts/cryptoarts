import React, { Fragment } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import "modern-normalize/modern-normalize.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Component {...pageProps} />
    </Fragment>
  );
};

export default App;
