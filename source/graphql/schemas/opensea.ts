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
import { Nft, OpenseaCache } from "../../models";

export { Nft };

// Cache duration: 1 hour for quick stats, holders are updated less frequently
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

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
    sales_count: ({ sales_count }) => sales_count,
    average_price: ({ average_price }) => average_price,
    last_sale: ({ last_sale }) => last_sale,
    updatedAt: ({ updatedAt }) => updatedAt,
  },
  LastSale: {
    price: ({ price }) => price,
    symbol: ({ symbol }) => symbol,
    seller: ({ seller }) => seller,
    buyer: ({ buyer }) => buyer,
    nft_name: ({ nft_name }) => nft_name,
    nft_image: ({ nft_image }) => nft_image,
    timestamp: ({ timestamp }) => timestamp,
  },
  Query: {
    opensea: async (_, { deck, slug }): Promise<GQL.Opensea> => {
      if (!deck && !slug) {
        throw new GraphQLError("Either deck or slug must be provided");
      }

      const collectionName = "cryptoedition";

      // Helper to return cached data
      const returnCached = (cached: import("../../models/OpenseaCache").IOpenseaCache) => ({
        volume: cached.volume,
        floor_price: cached.floor_price,
        num_owners: String(cached.num_owners),
        total_supply: String(cached.total_supply),
        on_sale: String(cached.on_sale),
        sales_count: cached.sales_count,
        average_price: cached.average_price,
        last_sale: cached.last_sale,
        updatedAt: cached.updatedAt?.toISOString(),
        id: collectionName,
      });

      // Check for cached data first
      const cached = await OpenseaCache.findOne({ collection: collectionName });
      const now = new Date();
      const cacheAge = cached ? now.getTime() - cached.updatedAt.getTime() : Infinity;

      // Return cached data if fresh enough
      if (cached && cacheAge < CACHE_TTL_MS) {
        return returnCached(cached);
      }

      // Try to fetch fresh data from OpenSea, fall back to cache on error
      try {
        const contract = await getContract({ name: collectionName });
        const [stats, collection, onSaleCount, lastSaleEvent] = await Promise.all([
          openSeaClient.getCollectionStats(contract.name),
          openSeaClient.getCollection(contract.name),
          openSeaClient.getUniqueListingsCount(contract.name),
          openSeaClient.getLastSale(contract.name),
        ]);

        // Format last sale data
        const last_sale = lastSaleEvent ? {
          price: Number(lastSaleEvent.payment.quantity) / Math.pow(10, lastSaleEvent.payment.decimals),
          symbol: lastSaleEvent.payment.symbol,
          seller: lastSaleEvent.seller,
          buyer: lastSaleEvent.buyer,
          nft_name: lastSaleEvent.nft.name,
          nft_image: lastSaleEvent.nft.display_image_url || lastSaleEvent.nft.image_url,
          timestamp: lastSaleEvent.event_timestamp,
        } : undefined;

        // Update cache (upsert)
        await OpenseaCache.findOneAndUpdate(
          { collection: collectionName },
          {
            collection: collectionName,
            updatedAt: now,
            volume: stats.total.volume,
            floor_price: stats.total.floor_price,
            num_owners: stats.total.num_owners,
            total_supply: Number(collection.total_supply),
            on_sale: onSaleCount,
            sales_count: stats.total.sales,
            average_price: stats.total.average_price,
            last_sale,
          },
          { upsert: true, new: true }
        );

        return {
          volume: stats.total.volume,
          floor_price: stats.total.floor_price,
          num_owners: String(stats.total.num_owners),
          total_supply: collection.total_supply,
          on_sale: String(onSaleCount),
          sales_count: stats.total.sales,
          average_price: stats.total.average_price,
          last_sale,
          updatedAt: now.toISOString(),
          id: contract.name,
        };
      } catch {
        // OpenSea API failed - return stale cached data if available
        if (cached) {
          return returnCached(cached);
        }
        throw new GraphQLError("OpenSea API unavailable and no cached data");
      }
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
    holders: async (_, { deck, slug }) => {
      const collectionName = "cryptoedition";

      // Check for cached holder data
      const cached = await OpenseaCache.findOne({ collection: collectionName });

      // Return cached holders if available
      if (cached?.holders) {
        return cached.holders;
      }

      // Fall back to live calculation (expensive - should be run by scheduled job)
      return slug
        ? await getHolders((await getDeck({ slug: slug as string }))._id)
        : deck
        ? await getHolders(deck)
        : undefined;
    },
    leaderboard: async (_, { slug }) => {
      const collectionName = "cryptoedition";

      // Check for cached leaderboard data
      const cached = await OpenseaCache.findOne({ collection: collectionName }).lean();

      // Only use cache if leaderboard has actual data
      if (cached?.leaderboard?.topHolders?.length) {
        return cached.leaderboard;
      }

      // Try to calculate live, fall back to any existing cache on error
      try {
        const contract = await getContract({ name: collectionName });

        // Top holders by NFT count
        const topHoldersAgg = await Nft.aggregate([
          { $match: { contract: contract.address } },
          { $unwind: "$owners" },
          { $group: { _id: "$owners.address", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]);

        // Active traders: most transactions (from OpenSea events)
        let activeTraders: Array<{ address: string; count: number }> = [];
        try {
          const events = await openSeaClient.getCollectionEvents(contract.name, { limit: 50 });
          const traderCounts: Record<string, number> = {};
          for (const event of events.asset_events || []) {
            if (event.buyer) traderCounts[event.buyer] = (traderCounts[event.buyer] || 0) + 1;
            if (event.seller) traderCounts[event.seller] = (traderCounts[event.seller] || 0) + 1;
          }
          activeTraders = Object.entries(traderCounts)
            .map(([address, count]) => ({ address, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
        } catch {
          // OpenSea events API may fail, continue with empty active traders
        }

        // Rare holders: jokers and backsides
        const rareHoldersAgg = await Nft.aggregate([
          { $match: { contract: contract.address } },
          { $unwind: "$owners" },
          { $unwind: "$traits" },
          {
            $match: {
              $or: [
                { "traits.trait_type": "Suit", "traits.value": { $in: ["Joker", "Red", "Black"] } },
                { "traits.trait_type": "Color", "traits.value": { $in: ["Red", "Black"] } },
              ],
            },
          },
          { $group: { _id: "$owners.address", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]);

        // Helper to enrich entries with profile data
        const enrichWithProfile = async (entries: Array<{ address: string; count: number }>) => {
          return Promise.all(
            entries.map(async (entry) => {
              const account = await openSeaClient.getAccount(entry.address);
              return {
                address: entry.address,
                count: entry.count,
                username: account?.username || undefined,
                profileImage: account?.profile_image_url || undefined,
              };
            })
          );
        };

        const [topHolders, enrichedTraders, rareHolders] = await Promise.all([
          enrichWithProfile(topHoldersAgg.map((h) => ({ address: h._id, count: h.count }))),
          enrichWithProfile(activeTraders),
          enrichWithProfile(rareHoldersAgg.map((h) => ({ address: h._id, count: h.count }))),
        ]);

        const leaderboard = {
          topHolders,
          activeTraders: enrichedTraders,
          rareHolders,
        };

        // Save to cache for future requests
        await OpenseaCache.findOneAndUpdate(
          { collection: collectionName },
          { leaderboard },
          { upsert: true }
        );

        return leaderboard;
      } catch {
        // On error, return any existing cached leaderboard (even if incomplete)
        if (cached?.leaderboard) {
          return cached.leaderboard;
        }
        // Return empty leaderboard as last resort
        return { topHolders: [], activeTraders: [], rareHolders: [] };
      }
    },
  },
};

export const typeDefs = gql`
  scalar JSON

  type Query {
    ownedAssets(deck: ID!, address: String!, signature: String!): [Nft]!
    opensea(deck: ID, slug: String): Opensea!
    holders(deck: ID, slug: String): Holders
    leaderboard(slug: String): Leaderboard
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

  type LastSale {
    price: Float!
    symbol: String!
    seller: String!
    buyer: String!
    nft_name: String!
    nft_image: String!
    timestamp: Int!
  }

  type Opensea {
    id: ID!
    volume: Float!
    floor_price: Float!
    num_owners: String!
    total_supply: String!
    on_sale: String!
    sales_count: Int
    average_price: Float
    last_sale: LastSale
    updatedAt: String
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

  type LeaderboardEntry {
    address: String!
    count: Int!
    username: String
    profileImage: String
  }

  type Leaderboard {
    topHolders: [LeaderboardEntry!]!
    activeTraders: [LeaderboardEntry!]!
    rareHolders: [LeaderboardEntry!]!
  }
`;
