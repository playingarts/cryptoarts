import { Fragment } from "react";
import { ThemeProvider, Theme } from "@emotion/react";
import Head from "next/head";
import { AppProps } from "next/app";
import "modern-normalize/modern-normalize.css";

export const theme: Theme = {
  colors: {
    gray: "rgba(234, 234, 234, 0.5)",
  },
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
