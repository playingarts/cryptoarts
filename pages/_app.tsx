import { Fragment, useEffect } from "react";
import { ThemeProvider, Theme } from "@emotion/react";
import Head from "next/head";
import { AppProps } from "next/app";
import "modern-normalize/modern-normalize.css";
import { CSSInterpolation } from "@emotion/serialize";
import smoothscroll from "smoothscroll-polyfill";
import { MetaMaskProvider } from "metamask-react";

declare module "@emotion/react" {
  export interface Theme {
    transitions: {
      fast: (property: string | string[]) => string;
      normal: (property: string | string[]) => string;
      slow: (property: string | string[]) => string;
    };
    colors: {
      white: "#FFFFFF";
      page_bg_light_gray: "#f2f2f2";
      page_bg_gray: "#e5e5e5";
      page_bg_dark: "#0A0A0A";
      dark_gray: "#181818";
      light_gray: "#DFDFDF";
      page_bg_light: "#EAEAEA";
      text_title_dark: "#0A0A0A";
      text_subtitle_dark: "rgba(10, 10, 10, 0.5)";
      text_title_light: "rgba(255, 255, 255, 0.9)";
      text_subtitle_light: "rgba(234, 234, 234, 0.5)";
      gradient: "linear-gradient(90deg, #58CDFF 0%, #C77BFF 100%)";
      diamonds: "#CDB0FF";
      clubs: "#98F3FF";
      hearts: "#7BD4FF";
      spades: "#82A7F8";
      eth: "linear-gradient(90.19deg, #8482F8 14%, #A6FBF6 86.07%)";
      orange: "#F89D35";
      green: "#05CE78";
      red: "#C4161C";
    };
    mq: { [index: string]: string };
    typography: {
      h1: CSSInterpolation;
      h2: CSSInterpolation;
      h3: CSSInterpolation;
      h4: CSSInterpolation;
      h5: CSSInterpolation;
      h6: CSSInterpolation;
      h7: CSSInterpolation;
      body0: CSSInterpolation;
      body: CSSInterpolation;
      body2: CSSInterpolation;
      body3: CSSInterpolation;
      label: CSSInterpolation;
    };
    spacing: (size: number) => number;
  }
}

export const breakpoints: Record<string, number> = {
  mobile: 0,
  sm: 1124,
  md: 1340,
  lg: 1754,
  xl: 2070,
};

const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media only screen and (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });

export const theme: Theme = {
  transitions: {
    fast: (attrs) =>
      typeof attrs === "string"
        ? `${attrs} 0.25s ease`
        : attrs.map((attr) => `${attr} 0.25s ease`).join(", "),
    normal: (attrs) =>
      typeof attrs === "string"
        ? `${attrs} 0.4s ease`
        : attrs.map((attr) => `${attr} 0.25s ease`).join(", "),
    slow: (attrs) =>
      typeof attrs === "string"
        ? `${attrs} 0.55s ease`
        : attrs.map((attr) => `${attr} 0.25s ease`).join(", "),
  },
  colors: {
    white: "#FFFFFF",
    page_bg_light_gray: "#f2f2f2",
    page_bg_gray: "#e5e5e5",
    page_bg_dark: "#0A0A0A",
    dark_gray: "#181818",
    light_gray: "#DFDFDF",
    page_bg_light: "#EAEAEA",
    text_title_dark: "#0A0A0A",
    text_subtitle_dark: "rgba(10, 10, 10, 0.5)",
    text_title_light: "rgba(255, 255, 255, 0.9)",
    text_subtitle_light: "rgba(234, 234, 234, 0.5)",
    gradient: "linear-gradient(90deg, #58CDFF 0%, #C77BFF 100%)",
    diamonds: "#CDB0FF",
    clubs: "#98F3FF",
    hearts: "#7BD4FF",
    spades: "#82A7F8",
    eth: "linear-gradient(90.19deg, #8482F8 14%, #A6FBF6 86.07%)",
    orange: "#F89D35",
    green: "#05CE78",
    red: "#C4161C",
  },
  typography: {
    h1: {
      fontSize: 100,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      lineHeight: 105 / 100,
      fontFamily: "Aldrich, sans-serif",
    },
    h2: {
      fontSize: 60,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      lineHeight: 65 / 60,
      fontFamily: "Aldrich, sans-serif",
    },
    h3: {
      fontSize: 45,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      lineHeight: 50 / 45,
      fontFamily: "Aldrich, sans-serif",
    },
    h4: {
      fontSize: 35,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      lineHeight: 40 / 35,
      fontFamily: "Aldrich, sans-serif",
    },
    h5: {
      fontSize: 25,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      lineHeight: 30 / 25,
      fontFamily: "Aldrich, sans-serif",
      textTransform: "uppercase",
    },
    h6: {
      fontSize: 18,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      lineHeight: 30 / 18,
      fontFamily: "Aldrich, sans-serif",
      textTransform: "uppercase",
    },
    h7: {
      fontSize: 15,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      lineHeight: 30 / 15,
      fontFamily: "Aldrich, sans-serif",
      textTransform: "uppercase",
    },
    body0: {
      fontSize: 14,
      lineHeight: 18 / 14,
    },
    body: {
      fontSize: 18,
      lineHeight: 27 / 18,
    },
    body2: {
      fontSize: 22,
      lineHeight: 33 / 22,
    },
    body3: {
      fontSize: 30,
      lineHeight: 45 / 30,
    },
    label: {
      fontSize: 18,
      lineHeight: 21 / 18,
      fontWeight: 500,
    },
  },
  mq: mq,
  spacing: (size) => size * 10,
};

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothscroll.polyfill();
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MetaMaskProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MetaMaskProvider>
    </Fragment>
  );
};

export default App;
