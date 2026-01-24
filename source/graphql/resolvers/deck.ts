/**
 * Deck Resolvers
 *
 * Thin resolvers that delegate to DeckService.
 */

import GraphQLJSON from "graphql-type-json";
import { deckService, productService } from "../../services";

export const resolvers: GQL.Resolvers = {
  JSON: GraphQLJSON,
  Deck: {
    properties: ({ properties }) => deckService.getDeckProperties(properties),
    product: ({ _id }) => productService.getProduct({ deck: _id }),
  },
  Query: {
    decks: () => deckService.getDecks(),
    deck: (_, { slug }) => deckService.getDeckBySlug(slug),
  },
};
