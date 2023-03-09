import { Global } from "@emotion/react";
import { Head, Html, Main, NextScript } from "next/document";
import { Fragment } from "react";
import { theme } from "./_app";

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
          fontFamily: "Work Sans, sans-serif",
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
        // width: theme.spacing(size === "small" ? 3.8 : 4.2),
        // height: theme.spacing(size === "small" ? 3.8 : 4.2),
        // [theme.mq.sm]: {
        //   width: theme.spacing(size === "small" ? 3.8 : 5),
        //   height: theme.spacing(size === "small" ? 3.8 : 5),
        // },
        ":root": {
          "--buttonSmallWidth": `${theme.spacing(3.8)}px`,
          "--buttonSmallHeight": `${theme.spacing(3.8)}px`,
          [theme.maxMQ.sm]: {
            "--buttonHeight": `${theme.spacing(4.2)}px`,
            "--buttonWidth": `${theme.spacing(4.2)}px`,
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
      }}
    />
    <meta name="theme-color" content="#fff" />
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

// class MyDocument extends Document {
//   static async getInitialProps(ctx): Promise<DocumentInitialProps> {
//     console.clear();

//     const startTime = Date.now();

//     /**
//      * Initialize and get a reference to ApolloClient, which is saved in a "global" variable.
//      * The same client instance is returned to any other call to `getApolloClient`, so _app.js gets the same authenticated client to give to ApolloProvider.
//      */
//     const apolloClient = initApolloClient();

//     /**
//      * Render the page through Apollo's `getDataFromTree` so the cache is populated.
//      * Unfortunately this renders the page twice per request... There may be a way around doing this, but I haven't quite ironed that out yet.
//      */
//     await getDataFromTree(<ctx.AppTree {...ctx.appProps} />);

//     /**
//      * Render the page as normal, but now that ApolloClient is initialized and the cache is full, each query will actually work.
//      */
//     const initialProps = await Document.getInitialProps(ctx);

//     /**
//      * Extract the cache to pass along to the client so the queries are "hydrated" and don't need to actually request the data again!
//      */
//     const apolloState = apolloClient.extract();

//     console.info(`Render Time: ${Date.now() - startTime} milliseconds.`);

//     return { ...initialProps, apolloState };
//   }

//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           <Links />
//         </Head>

//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;
