/**
 * Card Resolvers
 *
 * Thin resolvers that delegate to CardService.
 */

import { cardService } from "../../services";
import { getContracts } from "../schemas/contract";
import { getAssets } from "../schemas/opensea";
import { getListings } from "../schemas/listing";

export const resolvers: GQL.Resolvers = {
  Card: {
    background: async ({ background, deck }) =>
      cardService.getCardBackground(background, deck),
    price: async (card: GQL.Card) => {
      if (!card.suit || !card.deck) {
        return;
      }

      const contracts = await getContracts({ deck: card.deck._id });
      if (contracts.length === 0) {
        return;
      }

      const assets = (await Promise.all(
        contracts.map(
          async (contract) => await getAssets(contract.address, contract.name)
        )
      )) as GQL.Nft[][];

      if (!assets) {
        return;
      }

      const matchingNfts = cardService.filterNftsByCardTraits(
        assets.flat(),
        card
      );

      const listings = await getListings({
        addresses: contracts.map((contract) => contract.address.toLowerCase()),
        tokenIds: matchingNfts.map((nft) => nft.identifier),
      });

      return cardService.calculatePriceFromListings(listings);
    },
  },
  Query: {
    cards: async (_, args) => {
      const { deckSlug, ...rest } = args;
      return cardService.getCards({ ...rest, deck: args.deck || deckSlug });
    },
    card: async (_, args) => cardService.getCard(args),
    cardByImg: (_, { img }) => cardService.getCardByImg({ img }),
    cardsByIds: (_, { ids }) => cardService.getCardsByIds(ids),
    cardsByPaths: (_, { paths }) => cardService.getCardsByPaths(paths),
    randomCards: (_, args) => cardService.getCards(args),
    heroCards: (_, { slug }) => cardService.getHeroCards(slug || ""),
    homeCards: () => cardService.getHomeCards(),
  },
  Mutation: {
    updateCardPhotos: async (_, { cardId, mainPhoto, additionalPhotos }) => {
      return cardService.updateCardPhotos(cardId, mainPhoto, additionalPhotos);
    },
  },
};
