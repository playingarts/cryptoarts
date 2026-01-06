/**
 * OpenSea GraphQL Schema
 *
 * Handles OpenSea-related queries for NFT collections.
 * Business logic is delegated to OpenSeaService.
 */

import { gql } from "@apollo/client";
import { GraphQLError } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { openSeaService } from "../../services";
import { openSeaClient } from "../../lib/OpenSeaClient";
import { getCardByTraits } from "./card";
import { getContract, getContracts } from "./contract";
import { getListings } from "./listing";
import { getDeck } from "./deck";
import { Nft } from "../../models";

export { Nft };

// Re-export service methods for backward compatibility
export const getAssets = openSeaService.getAssets;
export const signatureValid = openSeaService.signatureValid.bind(openSeaService);

// Legacy export for queue processing (used internally)
export const getAssetsRaw = openSeaService.processAssetQueue.bind(openSeaService);

/**
 * Associate card data with an NFT asset
 */
export const setCard =
  (contractId: string) => async (asset: GQL.Nft & { on_sale: boolean }) => {
    return openSeaService.setCardOnAsset(
      asset,
      async ({ address }) => getContract({ address }),
      getCardByTraits
    );
  };

/**
 * Get holder statistics for a deck
 */
const getHolders = async (deck: string) => {
  return openSeaService.calculateHolders(getContract, deck);
};

export const resolvers: GQL.Resolvers = {
  JSON: GraphQLJSON,
  Opensea: {
    id: ({ id }) => id,
    volume: ({ volume }) => volume,
    num_owners: ({ num_owners }) => num_owners,
    floor_price: ({ floor_price }) => floor_price,
    total_supply: ({ total_supply }) => total_supply,
    on_sale: ({ on_sale }) => on_sale,
  },
  Query: {
    opensea: async (_, { deck, slug }): Promise<GQL.Opensea> => {
      if (!deck && !slug) {
        throw new GraphQLError("Either deck or slug must be provided");
      }

      const contract = deck
        ? await getContract({ deck })
        : await getContract({
            deck: (await getDeck({ slug: slug as string }))._id,
          });

      // Use OpenSeaClient for API calls
      const [stats, collection, listings] = await Promise.all([
        openSeaClient.getCollectionStats(contract.name),
        openSeaClient.getCollection(contract.name),
        getListings({}),
      ]);

      return {
        volume: stats.total.volume,
        floor_price: stats.total.floor_price,
        num_owners: String(stats.total.num_owners),
        total_supply: collection.total_supply,
        on_sale: String(listings.length),
        id: contract.name,
      };
    },
    ownedAssets: async (_, { deck, address, signature }) => {
      if (!signatureValid(address, signature)) {
        throw new GraphQLError("Failed to verify the account.");
      }

      const contracts = await getContracts({ deck });

      if (!contracts) {
        return [];
      }

      const assets = (
        (await Promise.all(
          contracts.map(
            async (contract) => await getAssets(contract.address, contract.name)
          )
        )) as GQL.Nft[][]
      ).flat();

      return assets.filter(
        (asset) =>
          asset.owners &&
          asset.owners.findIndex(
            (owner) => owner.address.toLowerCase() === address.toLowerCase()
          ) !== -1
      );
    },
    holders: async (_, { deck, slug }) =>
      slug
        ? await getHolders((await getDeck({ slug: slug as string }))._id)
        : deck
        ? await getHolders(deck)
        : undefined,
  },
};

export const typeDefs = gql`
  scalar JSON

  type Query {
    ownedAssets(deck: ID!, address: String!, signature: String!): [Nft]!
    opensea(deck: ID, slug: String): Opensea!
    holders(deck: ID, slug: String): Holders
  }

  type Nft {
    identifier: String!
    contract: String!
    token_standard: String!
    name: String!
    description: String!
    traits: [Trait!]
    owners: [Owner!]!
  }

  type OpenseaContract {
    address: String!
  }

  type Trait {
    trait_type: String!
    value: String!
  }

  type Owner {
    address: String!
    quantity: String!
  }

  type Opensea {
    id: ID!
    volume: Float!
    floor_price: Float!
    num_owners: String!
    total_supply: String!
    on_sale: String!
  }

  type Holders {
    fullDecks: [String!]!
    fullDecksWithJokers: [String!]!
    spades: [String!]!
    diamonds: [String!]!
    hearts: [String!]!
    clubs: [String!]!
    jokers: [String!]!
  }
`;
