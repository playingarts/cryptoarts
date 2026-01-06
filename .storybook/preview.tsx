import { Preview } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import { Global, ThemeProvider } from "@emotion/react";
import { theme } from "../pages/_app";
import { Links } from "../pages/_document";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import React, { Fragment } from "react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswLoader } from "msw-storybook-addon";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { handlers } from "./StoryGraphqlHandlers";
import SizeProvider from "../new/SizeProvider";
import { DeckPaletteProvider } from "../new/Pages/Deck/DeckPaletteContext";

const mockedClient = new ApolloClient({
  uri: "api/v1/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

initialize({});

const preview: Preview = {
  // actions: { argTypesRegex: "^on[A-Z].*" },
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers,
    },

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
    <SizeProvider>
      <ThemeProvider theme={theme}>
        <DeckPaletteProvider>
          <ApolloProvider client={mockedClient}>
            <Links />
            <Global
              styles={{
                body: {
                  fontFamily: "'Alliance No.2'",
                },
              }}
            />
            <Story />
            <div id="menuportal"></div>
          </ApolloProvider>
        </DeckPaletteProvider>
      </ThemeProvider>
    </SizeProvider>
  ),
];
