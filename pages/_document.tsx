import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { Global } from "@emotion/react";

const Document = () => (
  <Html lang="en">
    <Head>
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
        href="https://fonts.googleapis.com/css2?family=Aldrich&family=Work+Sans&display=swap"
        rel="stylesheet"
      />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;

// Document.getInitialProps = async (ctx) => {
//   const page = await ctx.renderPage();
//   const { css, ids } = await renderStatic(page.html);
//   const initialProps = await Document.getInitialProps(ctx);

//   console.log("!!!!!!");

//   return {
//     ...initialProps,
//     styles: (
//       <Fragment>
//         {initialProps.styles}
//         <style
//           data-emotion={`css ${ids.join(" ")}`}
//           dangerouslySetInnerHTML={{ __html: css }}
//         />
//       </Fragment>
//     ),
//   };
// };
