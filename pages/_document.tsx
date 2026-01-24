import { Global, css } from "@emotion/react";
import { Head, Html, Main, NextScript } from "next/document";
import { Fragment } from "react";
import { theme } from "./_app";
import { fontVariables } from "../styles/fonts";

export const Links = () => (
  <Fragment>
    <Global
      styles={{
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        h7: theme.typography.h7,
        body: {
          background: theme.colors.page_bg_light_gray,
          fontFamily: "var(--font-work-sans), Work Sans, sans-serif",
          "@keyframes gradient": {
            "0%": {
              backgroundPosition: "0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%",
            },
            "100%": {
              backgroundPosition: "0% 50%",
            },
          },
        },
        svg: {
          verticalAlign: "middle",
        },
        button: {
          cursor: "pointer",
        },
        input: {
          color: "inherit",
          background: "none",
          border: 0,
        },
        ":root": {
          "--buttonSmallWidth": `${theme.spacing(3.8)}px`,
          "--buttonSmallHeight": `${theme.spacing(3.8)}px`,

          "--newButtonHeight": `${theme.spacing(4.2)}px`,
          "--newButtonWidth": `${theme.spacing(4.2)}px`,
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
          [theme.mq.sm]: {
            "--buttonHeight": `${theme.spacing(5)}px`,
            "--buttonWidth": `${theme.spacing(5)}px`,
          },
          ".shader-web-background-fallback": {
            background: "white",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          },
        },
        html: {
          lineHeight: 0,
          scrollBehavior: "smooth",
        },
        "[id]": {
          scrollMarginTop: "60px",
        },
      }}
    />
    <meta name="theme-color" content="#fff" />
    {/* Alliance font - explicit @font-face for Safari compatibility */}
    <Global
      styles={css`
        @font-face {
          font-family: "Alliance No.2";
          src: url("/AllianceRegular.woff2") format("woff2");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
          descent-override: 15%;
        }
        @font-face {
          font-family: "Alliance No.2";
          src: url("/AllianceMedium.woff2") format("woff2");
          font-weight: 500;
          font-style: normal;
          font-display: swap;
          descent-override: 15%;
        }
        @font-face {
          font-family: "Alliance No.2";
          src: url("/AllianceBold.woff2") format("woff2");
          font-weight: 600;
          font-style: normal;
          font-display: swap;
          descent-override: 15%;
        }
      `}
    />
  </Fragment>
);

const Document = () => (
  <Html lang="en" className={fontVariables}>
    <Head>
      <Links />
      <link
        rel="icon"
        href="https://s3.amazonaws.com/img.playingarts.com/www/static/favicon.png"
        sizes="any"
      />
    </Head>

    <body>
      <Main />
      <div id="menuportal"></div>
      <NextScript />
    </body>
  </Html>
);

export default Document;
