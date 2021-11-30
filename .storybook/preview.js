import { ThemeProvider } from "@emotion/react";
import { theme } from "../pages/_app";
import { Links } from "../pages/_document";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { MockedProvider } from "@apollo/client/testing";

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
