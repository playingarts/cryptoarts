import { gql } from "@apollo/client";
import { Card, Loser, Deck, type MongoCard } from "../../models";
import { cardService } from "../../services";
import { getContracts } from "./contract";
import { getDeck } from "./deck";
import { getAssets } from "./opensea";
import { getListings } from "./listing";

// Re-export for backward compatibility
export { Card, Loser, type MongoCard };

// Re-export service methods for backward compatibility with other schemas
export const getCards = cardService.getCards.bind(cardService);
export const getCard = cardService.getCard.bind(cardService);
export const getCardByImg = cardService.getCardByImg.bind(cardService);
export const getCardByTraits = cardService.getCardByTraits.bind(cardService);

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
      // If deckSlug is provided but deck is not, use deckSlug as deck (service resolves it)
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

export const typeDefs = gql`
  type Query {
    cards(
      withoutDeck: [ID!]
      deck: ID
      deckSlug: String
      shuffle: Boolean
      limit: Int
      losers: Boolean
      edition: String
    ): [Card!]!
    randomCards(shuffle: Boolean, limit: Int): [Card!]!
    card(id: ID, slug: String, deckSlug: String): Card
    cardByImg(img: ID!): Card
    cardsByIds(ids: [ID!]!): [Card!]!
    cardsByPaths(paths: [String!]!): [Card!]!
    heroCards(deck: ID, slug: String): [Card!]!
    homeCards: [Card!]!
  }

  type Mutation {
    updateCardPhotos(
      cardId: ID!
      mainPhoto: String
      additionalPhotos: [String!]
    ): Card
  }

  type Card {
    _id: ID!
    img: String!
    video: String
    artist: Artist!
    info: String
    deck: Deck!
    suit: String!
    value: String!
    background: String
    price: Float
    erc1155: ERC1155
    reversible: Boolean
    edition: String
    animator: Artist
    cardBackground: String
    mainPhoto: String
    additionalPhotos: [String!]
  }

  type ERC1155 {
    contractAddress: String!
    token_id: String!
  }
`;
