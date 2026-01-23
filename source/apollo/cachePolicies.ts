/**
 * Apollo Cache Policies
 *
 * Type policies for Apollo InMemoryCache.
 * These define how entities are identified and how queries are resolved from cache.
 *
 * Entity Key Fields:
 * - Deck: identified by slug (unique deck identifier like "crypto")
 * - Card: identified by _id (MongoDB ObjectId)
 * - Artist: identified by slug (unique artist identifier)
 *
 * Query Read Policies:
 * - products: Returns cached product references when all requested IDs exist in cache
 * - card: Resolves card by ID directly, or by artist slug + deck slug from cached data
 * - cards: Filters cached cards by edition when both edition and deck are provided
 * - deck: Reads deck from cache by slug using DeckDataFragment
 */

import { gql, Reference, TypePolicies } from "@apollo/client";
import { CardsQuery } from "../../hooks/card";
import { DeckDataFragment, DeckQuery } from "../../hooks/deck";

/**
 * Field policy for nullable fields.
 * Returns null by default if field hasn't been fetched, preventing
 * Apollo from treating missing fields as cache misses.
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
  Product: {
    keyFields: ["_id"],
    fields: {
      price: nullable(),
    },
  },
  /**
   * Opensea data is identified by id (deck ID).
   * This data can change frequently, so we don't apply aggressive caching.
   */
  Opensea: {
    keyFields: ["id"],
  },
  /**
   * Holders data doesn't have a unique ID, so we use false to prevent normalization.
   * This means holders data is stored inline within the parent query.
   */
  Holders: {
    keyFields: false,
  },
  /**
   * OwnedAssets are user-specific and identified by their identifier.
   */
  OwnedAsset: {
    keyFields: ["identifier"],
  },
  Query: {
    fields: {
      /**
       * Products cache policy: Returns cached references when ALL requested
       * product IDs exist in cache, avoiding network request on back-navigation.
       */
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
      /**
       * Card cache policy: Resolves cards from cache in two ways:
       * 1. By _id: Direct reference lookup
       * 2. By slug + deckSlug: Finds card in cached deck's cards by artist slug
       * This enables instant navigation without refetch when cards are already loaded.
       */
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
      /**
       * Cards cache policy: When filtering by edition, returns filtered
       * cards from cache instead of making a new request.
       */
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
      /**
       * CardsByIds cache policy: Resolves cards from normalized cache by IDs.
       * If all requested cards exist in cache (from deck/card page visits),
       * returns them instantly without network request.
       */
      cardsByIds: {
        read: (refs, { args, toReference, cache }) => {
          if (!args || !args.ids || args.ids.length === 0) {
            return refs;
          }

          const ids: string[] = args.ids;
          const cachedCards: (GQL.Card | null)[] = [];

          for (const id of ids) {
            const reference = toReference({
              __typename: "Card",
              _id: id,
            });

            if (!reference) {
              // Card not in cache, fall back to network
              return refs;
            }

            // Read the card from cache - check if it has the required fields
            const card = cache.readFragment<GQL.Card>({
              id: reference.__ref,
              fragment: gql`
                fragment CardByIdFragment on Card {
                  _id
                  img
                  video
                  edition
                  artist {
                    name
                    slug
                    country
                  }
                }
              `,
            });

            if (!card) {
              // Card exists but missing required fields, fall back to network
              return refs;
            }

            cachedCards.push(card);
          }

          // All cards found in cache with required fields
          return cachedCards;
        },
      },
      /**
       * Deck cache policy: Resolves deck from cache by slug
       * using DeckDataFragment to verify complete data.
       */
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
