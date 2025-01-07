import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@emotion/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";
import { theme } from "../pages/_app";
import { Links } from "../pages/_document";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Links />
      <Story />
    </ThemeProvider>
  ),
];
