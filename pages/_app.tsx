import { Theme, ThemeProvider } from "@emotion/react";
import {
  CSSInterpolation,
  CSSPropertiesWithMultiValues,
} from "@emotion/serialize";
import { MetaMaskProvider } from "metamask-react";
import "modern-normalize/modern-normalize.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Fragment, useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import SizeProvider from "../components/SizeProvider";
import { SignatureProvider } from "../contexts/SignatureContext";
import { ViewedProvider } from "../contexts/viewedContext";
import { breakpoints } from "../source/enums";

type transitionProperty =
  | string
  | keyof CSSPropertiesWithMultiValues
  | (keyof CSSPropertiesWithMultiValues)[]
  | string[];

declare module "@emotion/react" {
  export interface Theme {
    spanColumns: (columns: number) => string;
    transitions: {
      fast: (property: transitionProperty) => string;
      normal: (property: transitionProperty) => string;
      slow: (property: transitionProperty) => string;
    };
    colors: {
      cadillac_pink: "#E289C2";
      eggshell_blue: "#C9FFF7";
      svggray: "#C4C4C4";
      charcoal_gray: "#404040";
      lavender_blue: "#8582F9";
      light_cyan: "#A6FCF7";
      joker: "#FFB0B0";
      crypto: "#510EAC";
      white: "#FFFFFF";
      page_bg_light_gray: "#f5f5f5";
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
      gradient_three: "linear-gradient(90deg, #7142D6 0%, #2FBACE 100%)";
      diamonds: "#CDB0FF";
      clubs: "#98F3FF";
      hearts: "#7BD4FF";
      spades: "#82A7F8";
      eth: "linear-gradient(90.19deg, #8482F8 14%, #A6FBF6 86.07%)";
      orange: "#F89D35";
      green: "#05CE78";
      red: "#C4161C";
      lavender: "#8582F9";
      black: "#000000";
      brightGray: "#EFEFEF";
      decks: {
        zero: {
          header: "#CBDA75";
          palette: "light";
          background: "#181818";
          textColor: "rgba(255, 255, 255, 0.9)";
          nav: {
            button: {
              background: "rgba(255, 255, 255, 0.9)";
              color: "#0A0A0A";
              hoverColor: "#FFFFFF";
            };
            color: "rgba(255, 255, 255, 0.7)";
            hoverColor: "#FFFFFF";
          };
        };
        one: {
          header: "#DCACA2";
          palette: "light";
          background: "#E9E4E0";
          textColor: "#0A0A0A";
          nav: {
            button: {
              color: "rgba(255, 255, 255, 0.9)";
              background: "#0A0A0A";
              hoverColor: "#0A0A0ACC";
            };
            color: "rgba(10, 10, 10, 0.5)";
            hoverColor: "#181818";
          };
        };
        two: {
          header: "#B3A2DC";
          palette: "light";
          background: "#E7E0E9";
          textColor: "#0A0A0A";
          nav: {
            button: {
              color: "rgba(255, 255, 255, 0.9)";
              background: "#0A0A0A";
              hoverColor: "#0A0A0ACC";
            };
            color: "rgba(10, 10, 10, 0.5)";
            hoverColor: "#181818";
          };
        };
        three: {
          header: "#A2C4DC";
          palette: "light";
          background: "#E0E6E9";
          textColor: "#0A0A0A";
          nav: {
            button: {
              color: "rgba(255, 255, 255, 0.9)";
              background: "#0A0A0A";
              hoverColor: "#0A0A0ACC";
            };
            color: "rgba(10, 10, 10, 0.5)";
            hoverColor: "#181818";
          };
        };
        special: {
          header: "#181818";
          palette: "dark";
          background: "#E0E6E9";
          textColor: "#0A0A0A";
          nav: {
            button: {
              background: "rgba(255, 255, 255, 0.9)";
              color: "#0A0A0A";
              hoverColor: "#FFFFFF";
            };
            color: "rgba(10, 10, 10, 0.5)";
            hoverColor: "#181818";
          };
        };
        future: {
          header: "#A6D4B7";
          palette: "light";
          background: "#181818";
          textColor: "rgba(255, 255, 255, 0.9)";
          nav: {
            button: {
              background: "#FFFDBF";
              color: "#0A0A0A";
              hoverColor: "#FFFFFF";
            };
            color: "#FFFDBF";
            hoverColor: "#FFFFFF";
          };
        };
        crypto: {
          header: "#E289C2";
          palette: "light";
          background: "#181818";
          textColor: "rgba(255, 255, 255, 0.9)";
          nav: {
            button: {
              background: "#C9FFF7";
              color: "#0A0A0A";
              hoverColor: "#FFFFFF";
            };
            color: "#C9FFF7";
            hoverColor: "#FFFFFF";
          };
        };
      };
    };
    mq: breakpointsObjectType;
    maxMQ: breakpointsObjectType;
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
      body4: CSSInterpolation;
      label: CSSInterpolation;
    };
    spacing: (size: number) => number;
  }
}

type breakpointsObjectType = { [index in keyof typeof breakpoints]: string };

const mq = (Object.keys(breakpoints) as Array<keyof typeof breakpoints>)
  .filter((value) => isNaN(Number(value)) !== false)
  .reduce(
    (prev, key) => ({
      ...prev,
      [key]: `@media only screen and (min-width: ${breakpoints[key]}px)`,
    }),
    {} as breakpointsObjectType
  );

const maxMQ = (Object.keys(breakpoints) as Array<keyof typeof breakpoints>)
  .filter((value) => isNaN(Number(value)) !== false)
  .reduce(
    (prev, key) => ({
      ...prev,
      [key]: `@media only screen and (max-width: ${breakpoints[key] - 1}px)`,
    }),
    {} as breakpointsObjectType
  );

export const theme: Theme = {
  spanColumns: (columns: number) =>
    "calc(var(--columnWidth) * " +
    columns +
    " + " +
    (columns - 1) +
    " * " +
    30 +
    "px)",
  transitions: {
    fast: (attrs) =>
      typeof attrs === "object"
        ? attrs.map((attr) => `${attr} 0.25s ease`).join(", ")
        : `${attrs} 0.25s ease`,
    normal: (attrs) =>
      typeof attrs === "string"
        ? `${attrs} 0.4s ease`
        : attrs.map((attr) => `${attr} 0.4s ease`).join(", "),
    slow: (attrs) =>
      typeof attrs === "string"
        ? `${attrs} 0.55s ease`
        : attrs.map((attr) => `${attr} 0.55s ease`).join(", "),
  },
  colors: {
    cadillac_pink: "#E289C2",
    eggshell_blue: "#C9FFF7",
    lavender_blue: "#8582F9",
    light_cyan: "#A6FCF7",
    charcoal_gray: "#404040",
    joker: "#FFB0B0",
    crypto: "#510EAC",
    white: "#FFFFFF",
    page_bg_light_gray: "#f5f5f5",
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
    gradient_three: "linear-gradient(90deg, #7142D6 0%, #2FBACE 100%)",
    diamonds: "#CDB0FF",
    clubs: "#98F3FF",
    hearts: "#7BD4FF",
    spades: "#82A7F8",
    eth: "linear-gradient(90.19deg, #8482F8 14%, #A6FBF6 86.07%)",
    orange: "#F89D35",
    green: "#05CE78",
    red: "#C4161C",
    lavender: "#8582F9",
    black: "#000000",
    brightGray: "#EFEFEF",
    svggray: "#C4C4C4",
    decks: {
      zero: {
        header: "#CBDA75",
        palette: "light",
        background: "#181818",
        textColor: "rgba(255, 255, 255, 0.9)",
        nav: {
          button: {
            background: "rgba(255, 255, 255, 0.9)",
            color: "#0A0A0A",
            hoverColor: "#FFFFFF",
          },
          color: "rgba(255, 255, 255, 0.7)",
          hoverColor: "#FFFFFF",
        },
      },
      one: {
        header: "#DCACA2",
        palette: "light",
        background: "#E9E4E0",
        textColor: "#0A0A0A",
        nav: {
          button: {
            color: "rgba(255, 255, 255, 0.9)",
            background: "#0A0A0A",
            hoverColor: "#0A0A0ACC",
          },
          color: "rgba(10, 10, 10, 0.5)",
          hoverColor: "#181818",
        },
      },
      two: {
        header: "#B3A2DC",
        palette: "light",
        background: "#E7E0E9",
        textColor: "#0A0A0A",
        nav: {
          button: {
            color: "rgba(255, 255, 255, 0.9)",
            background: "#0A0A0A",
            hoverColor: "#0A0A0ACC",
          },
          color: "rgba(10, 10, 10, 0.5)",
          hoverColor: "#181818",
        },
      },
      three: {
        header: "#A2C4DC",
        palette: "light",
        background: "#E0E6E9",
        textColor: "#0A0A0A",
        nav: {
          button: {
            color: "rgba(255, 255, 255, 0.9)",
            background: "#0A0A0A",
            hoverColor: "#0A0A0ACC",
          },
          color: "rgba(10, 10, 10, 0.5)",
          hoverColor: "#181818",
        },
      },
      special: {
        header: "#181818",
        palette: "dark",
        background: "#E0E6E9",
        textColor: "#0A0A0A",
        nav: {
          button: {
            background: "rgba(255, 255, 255, 0.9)",
            color: "#0A0A0A",
            hoverColor: "#FFFFFF",
          },
          color: "rgba(10, 10, 10, 0.5)",
          hoverColor: "#181818",
        },
      },
      future: {
        header: "#A6D4B7",
        palette: "light",
        background: "#181818",
        textColor: "rgba(255, 255, 255, 0.9)",
        nav: {
          button: {
            background: "#FFFDBF",
            color: "#0A0A0A",
            hoverColor: "#FFFFFF",
          },
          color: "#FFFDBF",
          hoverColor: "#FFFFFF",
        },
      },
      crypto: {
        header: "#E289C2",
        palette: "light",
        background: "#181818",
        textColor: "rgba(255, 255, 255, 0.9)",
        nav: {
          button: {
            background: "#C9FFF7",
            color: "#0A0A0A",
            hoverColor: "#FFFFFF",
          },
          color: "#C9FFF7",
          hoverColor: "#FFFFFF",
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: 55,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      lineHeight: 1.1,
      fontFamily: "Aldrich, sans-serif",
      [mq.sm]: {
        fontSize: 80,
        lineHeight: 105 / 100,
      },
      [mq.md]: {
        fontSize: 100,
        lineHeight: 105 / 100,
      },
    },
    h2: {
      fontSize: 40,
      lineHeight: 1.2,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      fontFamily: "Aldrich, sans-serif",
      [mq.sm]: {
        fontSize: 60,
        lineHeight: 65 / 60,
      },
    },
    h3: {
      fontSize: 30,
      lineHeight: 1,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      fontFamily: "Aldrich, sans-serif",
      [mq.sm]: {
        fontSize: 45,
        lineHeight: 50 / 45,
      },
    },
    h4: {
      fontSize: 20,
      lineHeight: 1,
      fontWeight: 400,
      letterSpacing: "-0.05em",
      fontFamily: "Aldrich, sans-serif",
      [mq.sm]: {
        fontSize: 35,
        lineHeight: 40 / 35,
      },
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
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 30 / 16,
      fontFamily: "Aldrich, sans-serif",
      textTransform: "uppercase",
      [mq.sm]: {
        fontSize: 18,
        lineHeight: 30 / 18,
      },
    },
    h7: {
      fontSize: 13,
      lineHeight: 30 / 13,
      fontWeight: 400,
      fontFamily: "Aldrich, sans-serif",
      textTransform: "uppercase",
      [mq.sm]: {
        fontSize: 15,
        lineHeight: 30 / 15,
      },
    },
    body0: {
      fontSize: 12,
      lineHeight: 1.5,
      [mq.sm]: {
        fontSize: 14,
        // lineHeight: 18 / 14,
      },
    },
    body: {
      fontSize: 18,
      lineHeight: 27 / 18,
    },
    body2: {
      fontSize: 16,
      lineHeight: 24 / 16,
      [mq.sm]: {
        fontSize: 20,
        lineHeight: 33 / 22,
      },
    },
    body3: {
      fontSize: 18,
      lineHeight: 30 / 20,
      [mq.sm]: {
        fontSize: 22,
        lineHeight: 1.5,
      },
      [mq.md]: {
        fontSize: 26,
        lineHeight: 1.5,
      },
    },
    body4: {
      fontSize: 20,
      lineHeight: 1.5,
      [mq.sm]: {
        fontSize: 20,
        lineHeight: 33 / 22,
      },
    },

    label: {
      fontSize: 16,
      lineHeight: 19 / 16,
      // fontWeight: 500,
      [mq.sm]: {
        fontSize: 18,
        lineHeight: 21 / 18,
      },
    },
  },
  mq,
  maxMQ,
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
        <title>Playing Arts Project</title>
        <meta
          name="description"
          content="Collective Art Project for creative people who are into illustrations, playing cards, NFTs and sometimes magic."
        />

        {/* todo: insert correct variables */}
        {/* <meta property="og:title" content="#" />
        <meta property="og:description" content="#" />
        <meta property="og:image" content="#" />
        <meta property="og:url" content="#" />
        <meta name="twitter:card" content="summary_large_image" /> */}

        {/* og:image urls
        https://s3.amazonaws.com/img.playingarts.com/www/social/og_home.png
        https://s3.amazonaws.com/img.playingarts.com/www/social/og_deck-zero.png
        https://s3.amazonaws.com/img.playingarts.com/www/social/og_deck-one.png
        https://s3.amazonaws.com/img.playingarts.com/www/social/og_deck-two.png
        https://s3.amazonaws.com/img.playingarts.com/www/social/og_deck-three.png
        https://s3.amazonaws.com/img.playingarts.com/www/social/og_deck-special.png
        https://s3.amazonaws.com/img.playingarts.com/www/social/og_deck-future.png
        https://s3.amazonaws.com/img.playingarts.com/www/social/og_deck-crypto.png
        */}
      </Head>

      <MetaMaskProvider>
        <SignatureProvider>
          <ThemeProvider theme={theme}>
            <ViewedProvider>
              <SizeProvider>
                <GoogleAnalytics trackPageViews />
                <Component {...pageProps} />
              </SizeProvider>
            </ViewedProvider>
          </ThemeProvider>
        </SignatureProvider>
      </MetaMaskProvider>
    </Fragment>
  );
};

export default App;
