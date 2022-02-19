/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { NextComponentType, NextPage, NextPageContext } from "next";

interface Context {
  apolloState: object;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

let cachedApolloClient: Context["apolloClient"] | undefined;

export const withApollo = (PageComponent: NextPage, { ssr = true } = {}) => {
  const WithApollo: NextComponentType<
    NextPageContext & Context,
    any,
    Context
  > = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

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
            const { getDataFromTree } = await import("@apollo/react-ssr");

            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // console.error("Error while running `getDataFromTree`", error);
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

const initApolloClient = (initialState?: object, config?: object) => {
  if (typeof window === "undefined") {
    return createApolloClient(initialState, config);
  }

  if (!cachedApolloClient) {
    cachedApolloClient = createApolloClient(initialState);
  }

  return cachedApolloClient;
};

const createApolloClient = (initialState = {}, config?: object) => {
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache({
    typePolicies: {
      Deck: {
        keyFields: ["slug"],
      },
      Query: {
        fields: {
          deck: {
            read: (_, { args, toReference }) =>
              toReference({
                __typename: "Deck",
                slug: args && args.slug,
              }),
          },
        },
      },
    },
  }).restore(initialState);

  return new ApolloClient({
    cache,
    link: createIsomorphLink(config),
    ssrMode,
  });
};

const createIsomorphLink = (config = {}) => {
  if (typeof window === "undefined") {
    return new (require("apollo-link-schema").SchemaLink)(config);
  } else {
    return ApolloLink.from([
      new HttpLink({
        uri: "/api/v1/graphql",
        credentials: "same-origin",
      }),
    ]);
  }
};
