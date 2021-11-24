import { Fragment } from "react";
import { ThemeProvider, Theme } from "@emotion/react";
import Head from "next/head";
import { AppProps } from "next/app";
import "modern-normalize/modern-normalize.css";

export const theme: Theme = {
  colors: {
    gray: "rgba(234, 234, 234, 0.5)",
    darkGray: "#181818",
    eth: "linear-gradient(90deg, #58CDFF 0%, #C77BFF 100%)",
    whiteish: "rgba(255, 255, 255, 0.7)",
    dimWhite: "rgba(255, 255, 255, 0.3)",
  },
  fonts: {
    aldrichFont: '"Aldrich", sans-serif',
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
