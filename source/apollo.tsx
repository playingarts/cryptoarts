/**
 * Apollo Client Configuration
 *
 * Sets up Apollo Client for both SSR and client-side rendering.
 * Cache policies are defined in ./apollo/cachePolicies.ts
 */

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
    Context & { cache?: NormalizedCacheObject } & Record<string, unknown>
  > = ({ apolloClient, apolloState, cache, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    if (cache) {
      // Merge new cache with existing instead of replacing
      const existingCache = client.cache.extract() as NormalizedCacheObject;
      client.cache.restore(Object.assign({}, existingCache, cache));
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...(pageProps as Record<string, unknown>)} />
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

      // Dynamically import schema only on server to avoid bundling server-only code
      let apolloConfig = {};
      if (typeof window === "undefined") {
        const { schema } = await import("../source/graphql/schema");
        apolloConfig = { context: ctx, schema };
      }

      const apolloClient = (ctx.apolloClient = initApolloClient(
        undefined,
        apolloConfig
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
 * On client, merges new initialState into existing cache to preserve previously loaded data.
 */
export const initApolloClient = (initialState?: object, config?: object) => {
  if (typeof window === "undefined") {
    return createApolloClient(initialState, config);
  }
  if (!cachedApolloClient) {
    cachedApolloClient = createApolloClient(initialState);
  } else if (initialState) {
    // Merge new state into existing cache without overwriting
    const existingCache = cachedApolloClient.cache.extract() as NormalizedCacheObject;
    const newState = initialState as NormalizedCacheObject;
    cachedApolloClient.cache.restore(Object.assign({}, existingCache, newState));
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
    defaultOptions: {
      watchQuery: {
        // Use cache first - only fetch from network if not in cache
        fetchPolicy: "cache-first",
      },
      query: {
        fetchPolicy: "cache-first",
      },
    },
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


