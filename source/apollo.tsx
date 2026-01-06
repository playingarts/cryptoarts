/**
 * Apollo Client Configuration
 *
 * Sets up Apollo Client for both SSR and client-side rendering.
 * Cache policies are defined in ./apollo/cachePolicies.ts
 */

/* eslint-disable @typescript-eslint/no-var-requires */
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { typePolicies } from "./apollo/cachePolicies";

interface Context {
  apolloState: object;
  apolloClient: ApolloClient;
}

let cachedApolloClient: Context["apolloClient"] | undefined;

/**
 * Higher-order component that wraps a page with Apollo Provider.
 * Handles SSR data fetching when enabled.
 */
export const withApollo = (PageComponent: NextPage, { ssr = true } = {}) => {
  const WithApollo: NextComponentType<
    NextPageContext & Context,
    unknown,
    Context & { cache?: NormalizedCacheObject }
  > = ({ apolloClient, apolloState, cache, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    if (cache) {
      client.restore(cache);
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV === "development") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx;
      const apolloClient = (ctx.apolloClient = initApolloClient(
        undefined,
        typeof window === "undefined"
          ? {
              context: ctx,
              schema: require("../source/graphql/schema").schema,
            }
          : {}
      ));
      let pageProps = {};

      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      if (typeof window === "undefined") {
        if (ctx.res && ctx.res.writableEnded) {
          return pageProps;
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import("@apollo/client/react/ssr");
            await getDataFromTree(
              <AppTree pageProps={{ ...pageProps, apolloClient }} />
            );
          } catch {
            // SSR data fetching errors are handled gracefully
          }
        }
      }

      return {
        ...pageProps,
        apolloState: apolloClient.cache.extract(),
      };
    };
  }

  return WithApollo;
};

/**
 * Initialize Apollo Client, reusing cached instance on client side.
 */
export const initApolloClient = (initialState?: object, config?: object) => {
  if (typeof window === "undefined") {
    return createApolloClient(initialState, config);
  }
  if (!cachedApolloClient) {
    cachedApolloClient = createApolloClient(initialState);
  }
  return cachedApolloClient;
};

/**
 * Create a new Apollo Client instance with InMemoryCache.
 */
export const createApolloClient = (initialState = {}, config?: object) => {
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache({ typePolicies }).restore(initialState);

  return new ApolloClient({
    cache,
    link: createIsomorphLink(config),
    ssrMode,
  });
};

/**
 * Create appropriate Apollo Link based on environment.
 * - Server: SchemaLink for direct schema execution
 * - Client: HttpLink for API requests
 */
const createIsomorphLink = (config = {}) => {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    return new SchemaLink(config);
  }
  return ApolloLink.from([
    new HttpLink({
      uri: "/api/v1/graphql",
      credentials: "same-origin",
    }),
  ]);
};


