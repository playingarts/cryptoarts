/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  gql,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Reference,
} from "@apollo/client";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { CardsQuery } from "../hooks/card";
import { DeckDataFragment, DeckQuery, DecksQuery } from "../hooks/deck";

interface Context {
  apolloState: object;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

let cachedApolloClient: Context["apolloClient"] | undefined;

export const withApollo = (PageComponent: NextPage, { ssr = true } = {}) => {
  const WithApollo: NextComponentType<
    NextPageContext & Context,
    any,
    Context & { cache?: NormalizedCacheObject }
  > = ({ apolloClient, apolloState, cache, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    if (cache) {
      client.restore(cache);
    }
    // if (cache) {
    //   console.log({ cache });

    //   for (const query of cache) {
    //     client.cache.writeQuery({
    //       ...query,
    //       query: gql`
    //         ${query.query}
    //       `,
    //     });
    //   }
    // }

    // pageProps.decks &&
    //   pageProps.decks.map((deck) => {
    //     client.writeFragment({
    //       fragment: DeckDataFragment,
    //       variables: { slug: deck.slug },
    //       data: { ...deck, __typename: "Deck" },
    //     });
    //     client.writeQuery({
    //       query: DeckQuery,
    //       // id: deck.slug,
    //       variables: { slug: deck.slug },
    //       data: { deck: { ...deck, __typename: "Deck" } },
    //     });
    //   });

    return (
      <ApolloProvider client={client}>
        <PageComponent
          {...{
            ...pageProps,
          }}
        />
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

export const initApolloClient = (initialState?: object, config?: object) => {
  if (typeof window === "undefined") {
    return createApolloClient(initialState, config);
  }
  if (!cachedApolloClient) {
    cachedApolloClient = createApolloClient(initialState);
  }

  return cachedApolloClient;
};

function nullable() {
  // Create a generic field policy that allows any field to be null by default:
  return {
    read(existing = null) {
      return existing;
    },
  };
}

export const createApolloClient = (initialState = {}, config?: object) => {
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache({
    typePolicies: {
      Deck: {
        keyFields: ["slug"],
        fields: {
          openseaCollection: nullable(),
          editions: nullable(),
          product: nullable(),
        },
      },
      Card: {
        keyFields: ["_id"],
        fields: {
          erc1155: nullable(),
        },
      },
      Artist: {
        keyFields: ["slug"],
        fields: {
          podcast: nullable(),
          social: nullable(),
        },
      },
      Query: {
        fields: {
          // decks: {
          //   merge: (existing = [], incoming = [], { cache }) => {
          //     incoming.map((ref) => {
          //       const fragment = cache.readFragment({
          //         fragment: DeckDataFragment,
          //         id: ref.__ref,
          //       });

          //       fragment &&
          //         cache.writeQuery({
          //           query: DeckQuery,
          //           data: { deck: fragment },
          //           variables: { slug: fragment.slug },
          //         });
          //     });

          //     return [...existing, ...incoming];
          //   },
          // },
          loser: {
            read: (_, { args, toReference }) =>
              toReference({
                __typename: "Loser",
                img: args && args.img,
              }),
          },
          products: {
            read: (refs, { args, toReference, cache }) => {
              const references: Reference[] | undefined =
                args &&
                args.ids &&
                args.ids.map((id: string) => {
                  return toReference({
                    __typename: "Product",
                    _id: id,
                  });
                });

              const fragments =
                references &&
                references.filter(
                  (reference) =>
                    cache.readFragment({
                      id: reference.__ref,
                      fragment: gql`
                        fragment MyProduct on Products {
                          _id
                        }
                      `,
                    }) !== null
                );

              return fragments && references.length === fragments.length
                ? references
                : refs;
            },
          },
          card: {
            read: (refs, { args, toReference, cache }) => {
              if (!args || !(args.id || (args.slug && args.deckSlug))) {
                return refs;
              }

              const id: string = args.id;
              const slug: string = args.slug;
              const deckSlug: string = args.deckSlug;

              if (id) {
                return toReference({
                  __typename: "Card",
                  _id: args.id,
                });
              }

              const cachedDeck = cache.readQuery({
                query: DeckQuery,
                variables: { slug: deckSlug },
              });

              if (!cachedDeck) {
                return refs;
              }

              const cachedCards = cache.readQuery({
                query: CardsQuery,
                variables: {
                  deck: (cachedDeck as { deck: GQL.Deck }).deck._id,
                },
              });

              if (!cachedCards) {
                return refs;
              }

              const card = (cachedCards as { cards: GQL.Card[] }).cards.find(
                (card) => card.artist && card.artist.slug === slug
              );

              return card;

              // return args && args.id
              //   ? toReference({
              //       __typename: "Card",
              //       ...(args && args.id && { _id: args.id }),
              //       slug: args && args.slug,
              //       deck: { slug: args && args.deckSlug },
              //     })
              //   : refs},
            },
          },
          cards: {
            read: (refs, { args, cache }) => {
              if (!args || !args.edition || !args.deck) {
                return refs;
              }

              const edition: string = args.edition;
              const deck: string = args.deck;

              const cachedCards = cache.readQuery({
                query: CardsQuery,
                variables: { deck: deck },
              });

              if (!cachedCards) {
                return refs;
              }

              return (cachedCards as { cards: GQL.Card[] }).cards.filter(
                (card) => card.edition === edition
              );
            },
          },
          deck: {
            read: (refs, { args, toReference, cache }) => {
              const slug: string | undefined = args && args.slug;

              if (!slug) {
                return refs;
              }

              const reference: Reference | undefined = toReference({
                __typename: "Deck",
                slug,
              });

              const fragment =
                reference &&
                cache.readFragment({
                  id: reference.__ref,
                  variables: {
                    slug,
                  },
                  fragment: DeckDataFragment,
                });

              return fragment && reference ? fragment : refs;
            },
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
