/**
 * Apollo Cache Policies
 *
 * Type policies for Apollo InMemoryCache.
 * These define how entities are identified and how queries are resolved from cache.
 */

import { gql, Reference, TypePolicies } from "@apollo/client";
import { CardsQuery } from "../../hooks/card";
import { DeckDataFragment, DeckQuery } from "../../hooks/deck";

/**
 * Field policy for nullable fields.
 * Returns null by default if field hasn't been fetched.
 */
function nullable() {
  return {
    read(existing = null) {
      return existing;
    },
  };
}

export const typePolicies: TypePolicies = {
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

          let cachedCards = cache.readQuery({
            query: CardsQuery,
            variables: {
              deck: (cachedDeck as { deck: GQL.Deck }).deck._id,
            },
          });

          if (!cachedCards) {
            cachedCards = cache.readQuery({
              query: CardsQuery,
              variables: {
                deck: (cachedDeck as { deck: GQL.Deck }).deck.slug,
              },
            });
            if (!cachedCards) {
              return refs;
            }
          }

          const card = (cachedCards as { cards: GQL.Card[] }).cards.find(
            (card) => card.artist && card.artist.slug === slug
          );

          return card;
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
              variables: { slug },
              fragment: DeckDataFragment,
            });

          return fragment && reference ? fragment : refs;
        },
      },
    },
  },
};
