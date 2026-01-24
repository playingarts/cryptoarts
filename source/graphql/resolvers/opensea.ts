/**
 * OpenSea Resolvers
 *
 * Resolvers for OpenSea-related queries.
 * Business logic is delegated to OpenSeaService.
 */

import { GraphQLError } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { openSeaService } from "../../services";
import { openSeaClient } from "../../lib/OpenSeaClient";
import { getCardByTraits } from "../schemas/card";
import { getContract, getContracts } from "../schemas/contract";
import { getDeck } from "../schemas/deck";
import { Nft, OpenseaCache } from "../../models";

// Cache duration: 1 hour for quick stats
const CACHE_TTL_MS = 60 * 60 * 1000;

// Re-export for backward compatibility
export const getAssets = openSeaService.getAssets;
export const signatureValid = openSeaService.signatureValid.bind(openSeaService);

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

      const cached = await OpenseaCache.findOne({ collection: collectionName });
      const now = new Date();
      const cacheAge = cached ? now.getTime() - cached.updatedAt.getTime() : Infinity;

      if (cached && cacheAge < CACHE_TTL_MS) {
        return returnCached(cached);
      }

      try {
        const contract = await getContract({ name: collectionName });
        const [stats, collection, onSaleCount, lastSaleEvent] = await Promise.all([
          openSeaClient.getCollectionStats(contract.name),
          openSeaClient.getCollection(contract.name),
          openSeaClient.getUniqueListingsCount(contract.name),
          openSeaClient.getLastSale(contract.name),
        ]);

        const last_sale = lastSaleEvent ? {
          price: Number(lastSaleEvent.payment.quantity) / Math.pow(10, lastSaleEvent.payment.decimals),
          symbol: lastSaleEvent.payment.symbol,
          seller: lastSaleEvent.seller,
          buyer: lastSaleEvent.buyer,
          nft_name: lastSaleEvent.nft.name,
          nft_image: lastSaleEvent.nft.display_image_url || lastSaleEvent.nft.image_url,
          timestamp: lastSaleEvent.event_timestamp,
        } : undefined;

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
      const cached = await OpenseaCache.findOne({ collection: collectionName });

      if (cached?.holders) {
        return cached.holders;
      }

      if (slug) {
        const deckData = await getDeck({ slug: slug as string });
        return deckData ? await getHolders(deckData._id) : undefined;
      }

      return deck ? await getHolders(deck) : undefined;
    },
    leaderboard: async (_, { slug }) => {
      const collectionName = "cryptoedition";
      const cached = await OpenseaCache.findOne({ collection: collectionName }).lean();

      if (cached?.leaderboard?.topHolders?.length) {
        return cached.leaderboard;
      }

      try {
        const contract = await getContract({ name: collectionName });

        const topHoldersAgg = await Nft.aggregate([
          { $match: { contract: contract.address } },
          { $unwind: "$owners" },
          { $group: { _id: "$owners.address", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]);

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
          // OpenSea events API may fail
        }

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

        await OpenseaCache.findOneAndUpdate(
          { collection: collectionName },
          { leaderboard },
          { upsert: true }
        );

        return leaderboard;
      } catch {
        if (cached?.leaderboard) {
          return cached.leaderboard;
        }
        return { topHolders: [], activeTraders: [], rareHolders: [] };
      }
    },
  },
};
