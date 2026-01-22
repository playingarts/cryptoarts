/**
 * Refresh OpenSea Cache Script
 *
 * Updates cached OpenSea statistics including holder data.
 * Should be run periodically (daily/weekly) via cron or manually.
 *
 * Usage:
 *   npx tsx scripts/refresh-opensea-cache.ts              # Quick refresh (stats only)
 *   npx tsx scripts/refresh-opensea-cache.ts --full       # Full refresh including holder calculation
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient } from "mongodb";

const MONGO_URL = process.env.MONGOURL!;
const MONGO_DB = process.env.MONGODB || "playingarts";
const OPENSEA_KEY = process.env.OPENSEA_KEY!;

const OPENSEA_BASE_URL = "https://api.opensea.io/api/v2";
const COLLECTION_NAME = "cryptoedition";
const CONTRACT_ADDRESS = "0xc22616e971a670e72f35570337e562c3e515fbfe";

// Rate limiting config
const RATE_LIMIT_DELAY = 250; // ms between requests
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds on 429

interface OpenSeaStats {
  total: {
    volume: number;
    sales: number;
    num_owners: number;
    floor_price: number;
    average_price: number;
  };
}

interface OpenSeaCollection {
  total_supply: string;
}

interface OpenSeaSaleEvent {
  payment: {
    quantity: string;
    decimals: number;
    symbol: string;
  };
  seller: string;
  buyer: string;
  nft: {
    name: string;
    image_url: string;
    display_image_url: string;
  };
  event_timestamp: number;
}

interface OpenSeaNft {
  identifier: string;
  traits?: Array<{ trait_type: string; value: string }>;
  owners?: Array<{ address: string; quantity: string }>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchOpenSeaWithRetry<T>(
  endpoint: string,
  attempt = 0
): Promise<T> {
  const response = await fetch(`${OPENSEA_BASE_URL}${endpoint}`, {
    headers: {
      accept: "application/json",
      "X-API-KEY": OPENSEA_KEY,
    },
  });

  if (response.status === 429) {
    if (attempt >= MAX_RETRIES) {
      throw new Error(`OpenSea API rate limited after ${MAX_RETRIES} retries`);
    }
    console.log(`  Rate limited, waiting ${RETRY_DELAY / 1000}s (attempt ${attempt + 1}/${MAX_RETRIES})...`);
    await delay(RETRY_DELAY * (attempt + 1)); // Exponential backoff
    return fetchOpenSeaWithRetry<T>(endpoint, attempt + 1);
  }

  if (!response.ok) {
    throw new Error(`OpenSea API error: ${response.status}`);
  }

  return response.json();
}

async function getCollectionStats(): Promise<OpenSeaStats> {
  return fetchOpenSeaWithRetry(`/collections/${COLLECTION_NAME}/stats`);
}

async function getCollection(): Promise<OpenSeaCollection> {
  return fetchOpenSeaWithRetry(`/collections/${COLLECTION_NAME}`);
}

async function getLastSale(): Promise<OpenSeaSaleEvent | null> {
  const response = await fetchOpenSeaWithRetry<{ asset_events: OpenSeaSaleEvent[] }>(
    `/events/collection/${COLLECTION_NAME}?event_type=sale&limit=1`
  );
  return response.asset_events[0] || null;
}

interface OpenSeaListing {
  price: { current: { value: string } };
  protocol_data: {
    parameters: {
      offer: Array<{ identifierOrCriteria: string }>;
    };
  };
}

async function getUniqueListingsCount(): Promise<number> {
  const uniqueTokenIds = new Set<string>();
  let nextCursor: string | undefined;

  do {
    const params = new URLSearchParams({ limit: "100" });
    if (nextCursor) params.append("next", nextCursor);

    const response = await fetchOpenSeaWithRetry<{ listings: OpenSeaListing[]; next?: string }>(
      `/listings/collection/${COLLECTION_NAME}/best?${params}`
    );

    for (const listing of response.listings) {
      const tokenId = listing.protocol_data?.parameters?.offer?.[0]?.identifierOrCriteria;
      if (tokenId) {
        uniqueTokenIds.add(tokenId);
      }
    }

    nextCursor = response.next;
    await delay(RATE_LIMIT_DELAY);
  } while (nextCursor);

  return uniqueTokenIds.size;
}

async function getAllNftsWithOwners(
  onProgress?: (count: number, total: number) => void
): Promise<OpenSeaNft[]> {
  const allNfts: OpenSeaNft[] = [];
  let nextCursor: string | undefined;
  let totalFetched = 0;

  console.log("Fetching all NFTs from OpenSea (this may take a while)...");

  // First, get the list of all NFT identifiers
  const nftIds: string[] = [];
  do {
    const params = new URLSearchParams({ limit: "200" });
    if (nextCursor) params.append("next", nextCursor);

    const response = await fetchOpenSeaWithRetry<{ nfts: OpenSeaNft[]; next?: string }>(
      `/collection/${COLLECTION_NAME}/nfts?${params}`
    );

    nftIds.push(...response.nfts.map((n) => n.identifier));
    nextCursor = response.next;
    console.log(`  Found ${nftIds.length} NFTs...`);
    await delay(RATE_LIMIT_DELAY);
  } while (nextCursor);

  console.log(`\nFetching owner data for ${nftIds.length} NFTs...`);

  // Then fetch each NFT's details with owner info
  for (const identifier of nftIds) {
    const fullNft = await fetchOpenSeaWithRetry<{ nft: OpenSeaNft }>(
      `/chain/ethereum/contract/${CONTRACT_ADDRESS}/nfts/${identifier}`
    );
    allNfts.push(fullNft.nft);
    totalFetched++;

    if (onProgress) {
      onProgress(totalFetched, nftIds.length);
    }

    // Rate limiting delay
    await delay(RATE_LIMIT_DELAY);
  }

  return allNfts;
}

type CardSuit = "spades" | "hearts" | "clubs" | "diamonds" | "black" | "red";

function calculateHolders(nfts: OpenSeaNft[]) {
  // Build holders map: address -> cards owned
  const holders: Record<string, Array<{ suit: CardSuit; value: string }>> = {};

  for (const nft of nfts) {
    if (!nft.owners || !nft.traits) continue;

    const suitTrait = nft.traits.find(
      (t) => t.trait_type === "Suit" || t.trait_type === "Color"
    );
    const valueTrait = nft.traits.find((t) => t.trait_type === "Value");

    if (!suitTrait || !valueTrait) continue;

    const suit = suitTrait.value.toLowerCase() as CardSuit;
    const value = valueTrait.value;

    for (const owner of nft.owners) {
      if (!holders[owner.address]) {
        holders[owner.address] = [];
      }
      holders[owner.address].push({ suit, value });
    }
  }

  // Calculate suit collectors (people with 13+ cards of a suit)
  const suits: Record<CardSuit, string[]> = {
    spades: [],
    hearts: [],
    clubs: [],
    diamonds: [],
    black: [],
    red: [],
  };

  for (const [address, cards] of Object.entries(holders)) {
    const suitCounts: Record<string, number> = {};
    for (const card of cards) {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    }

    for (const [suit, count] of Object.entries(suitCounts)) {
      if (count >= 13 && suit in suits) {
        suits[suit as CardSuit].push(address);
      }
    }
  }

  // Calculate full deck holders (52+ unique cards)
  const fullDecks: string[] = [];
  const fullDecksWithJokers: string[] = [];

  for (const [address, cards] of Object.entries(holders)) {
    const uniqueCards = new Set(cards.map((c) => `${c.suit}-${c.value}`));
    if (uniqueCards.size >= 52) {
      fullDecks.push(address);
    }
    if (uniqueCards.size >= 54) {
      fullDecksWithJokers.push(address);
    }
  }

  // Jokers = people who have both black and red jokers
  const jokers = suits.black.filter((addr) => suits.red.includes(addr));

  return {
    fullDecks,
    fullDecksWithJokers,
    spades: suits.spades,
    hearts: suits.hearts,
    clubs: suits.clubs,
    diamonds: suits.diamonds,
    jokers,
  };
}

async function refreshCache(fullRefresh: boolean) {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGO_URL);
  await client.connect();

  const db = client.db(MONGO_DB);
  const cacheCollection = db.collection("openseacaches");

  try {
    console.log("Fetching OpenSea stats...");

    // Fetch basic stats (always)
    const [stats, collection, lastSaleEvent, onSaleCount] = await Promise.all([
      getCollectionStats(),
      getCollection(),
      getLastSale(),
      getUniqueListingsCount(),
    ]);

    console.log(`  Volume: ${stats.total.volume.toFixed(2)} ETH`);
    console.log(`  Floor: ${stats.total.floor_price.toFixed(4)} ETH`);
    console.log(`  Owners: ${stats.total.num_owners}`);
    console.log(`  Total Supply: ${collection.total_supply}`);
    console.log(`  Sales: ${stats.total.sales}`);
    console.log(`  On Sale: ${onSaleCount}`);

    // Format last sale
    const last_sale = lastSaleEvent
      ? {
          price:
            Number(lastSaleEvent.payment.quantity) /
            Math.pow(10, lastSaleEvent.payment.decimals),
          symbol: lastSaleEvent.payment.symbol,
          seller: lastSaleEvent.seller,
          buyer: lastSaleEvent.buyer,
          nft_name: lastSaleEvent.nft.name,
          nft_image:
            lastSaleEvent.nft.display_image_url || lastSaleEvent.nft.image_url,
          timestamp: lastSaleEvent.event_timestamp,
        }
      : undefined;

    if (lastSaleEvent) {
      console.log(`  Last sale: ${last_sale?.price.toFixed(4)} ${last_sale?.symbol}`);
    }

    // Prepare update document
    const updateDoc: Record<string, unknown> = {
      collection: COLLECTION_NAME,
      updatedAt: new Date(),
      volume: stats.total.volume,
      floor_price: stats.total.floor_price,
      num_owners: stats.total.num_owners,
      total_supply: Number(collection.total_supply),
      on_sale: onSaleCount,
      sales_count: stats.total.sales,
      average_price: stats.total.average_price,
      last_sale,
    };

    // Full refresh: calculate holder statistics
    if (fullRefresh) {
      console.log("\nCalculating holder statistics (full refresh)...");
      const startTime = Date.now();

      const nfts = await getAllNftsWithOwners((count, total) => {
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        const rate = count / elapsed || 1;
        const remaining = Math.round((total - count) / rate);
        process.stdout.write(
          `\r  Progress: ${count}/${total} NFTs (${elapsed}s elapsed, ~${remaining}s remaining)   `
        );
      });

      console.log(`\n  Total NFTs with owner data: ${nfts.length}`);

      const holders = calculateHolders(nfts);
      console.log(`  Full decks (52 cards): ${holders.fullDecks.length}`);
      console.log(`  Full decks + jokers (54 cards): ${holders.fullDecksWithJokers.length}`);
      console.log(`  Spades collectors (13+): ${holders.spades.length}`);
      console.log(`  Hearts collectors (13+): ${holders.hearts.length}`);
      console.log(`  Clubs collectors (13+): ${holders.clubs.length}`);
      console.log(`  Diamonds collectors (13+): ${holders.diamonds.length}`);
      console.log(`  Jokers holders (both): ${holders.jokers.length}`);

      updateDoc.holders = holders;
      updateDoc.holdersUpdatedAt = new Date();
    }

    // Upsert cache
    await cacheCollection.updateOne(
      { collection: COLLECTION_NAME },
      { $set: updateDoc },
      { upsert: true }
    );

    console.log("\nCache updated successfully!");
  } finally {
    await client.close();
  }
}

// Main
const isFullRefresh = process.argv.includes("--full");
console.log(`\n=== OpenSea Cache Refresh (${isFullRefresh ? "FULL" : "Quick"}) ===\n`);

refreshCache(isFullRefresh)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
