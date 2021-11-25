import { Fragment } from "react";
import { ThemeProvider, Theme } from "@emotion/react";
import Head from "next/head";
import { AppProps } from "next/app";
import "modern-normalize/modern-normalize.css";

export const breakpoints: Record<string, number> = {
  mobile: 0,
  sm: 1124,
  md: 1340,
  lg: 1754,
  xl: 2070,
};

const gutter = (scale: number) => {
  return `${scale * 105}px`;
};

const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media only screen and (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });

export const theme: Theme = {
  transitions: {
    fast: "0.25s",
  },
  colors: {
    gray: "rgba(234, 234, 234, 0.5)",
    darkGray: "#181818",
    eth: "linear-gradient(90deg, #58CDFF 0%, #C77BFF 100%)",
    ethButton:
      "linear-gradient(90.19deg, #82A7F8 14%, #A6FBF6 50.04%, #CDB0FF 86.07%)",
    whiteish: "rgba(255, 255, 255, 0.7)",
    dimWhite: "rgba(255, 255, 255, 0.3)",
  },
  fonts: {
    aldrichFont: '"Aldrich", sans-serif',
  },
  mq: mq,
  gutter: gutter,
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
