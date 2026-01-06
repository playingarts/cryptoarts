import { Preview } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { Global, ThemeProvider } from "@emotion/react";
import { theme } from "../pages/_app";
import { Links } from "../pages/_document";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import React, { Fragment } from "react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswLoader } from "msw-storybook-addon";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { Defer20220824Handler } from "@apollo/client/incremental";
import { LocalState } from "@apollo/client/local-state";
import { ApolloProvider } from "@apollo/client/react";
import { handlers } from "./StoryGraphqlHandlers";
import SizeProvider from "../new/SizeProvider";
import { DeckPaletteProvider } from "../new/Pages/Deck/DeckPaletteContext";

const mockedClient = new ApolloClient({
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

  link: new HttpLink({
    uri: "api/v1/graphql"
  }),

  /*
  Inserted by Apollo Client 3->4 migration codemod.
  If you are not using the `@client` directive in your application,
  you can safely remove this option.
  */
  localState: new LocalState({}),

  /*
  Inserted by Apollo Client 3->4 migration codemod.
  If you are not using the `@defer` directive in your application,
  you can safely remove this option.
  */
  incrementalHandler: new Defer20220824Handler()
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

/*
Start: Inserted by Apollo Client 3->4 migration codemod.
Copy the contents of this block into a `.d.ts` file in your project to enable correct response types in your custom links.
If you do not use the `@defer` directive in your application, you can safely remove this block.
*/


import "@apollo/client";
import { Defer20220824Handler } from "@apollo/client/incremental";

declare module "@apollo/client" {
  export interface TypeOverrides extends Defer20220824Handler.TypeOverrides {}
}

/*
End: Inserted by Apollo Client 3->4 migration codemod.
*/

