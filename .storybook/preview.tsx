// import type { Preview } from "@storybook/react";

// const preview: Preview = {
//   parameters: {
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i,
//       },
//     },
//   },
// };

// export default preview;
import { Preview } from "@storybook/react";

import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@emotion/react";
// import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";
import { theme } from "../pages/_app";
import { Links } from "../pages/_document";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import React from "react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswLoader } from "msw-storybook-addon";

// const OriginalNextImage = NextImage.default;

// Object.defineProperty(NextImage, "default", {
//   configurable: true,
//   value: (props) => <OriginalNextImage {...props} unoptimized />,
// });

initialize({});

const preview: Preview = {
  // actions: { argTypesRegex: "^on[A-Z].*" },
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextRouter: {
      Provider: RouterContext.Provider,
    },
    apolloClient: {
      MockedProvider,
    },
    layout: "fullscreen",
    viewPort: { viewports: INITIAL_VIEWPORTS, defaultViewport: "laptop" },
    backgrounds: {
      values: [{ name: "Figma", value: "#DCDCDC" }],
      default: "Figma",
    },
  },
};
export default preview;

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Links />
      <Story />
    </ThemeProvider>
  ),
];
