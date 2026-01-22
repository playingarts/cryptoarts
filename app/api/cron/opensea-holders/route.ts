/**
 * Cron OpenSea Holders Calculation API
 *
 * Calculates holder statistics (full decks, suit collectors) weekly.
 * This is a long-running task that fetches all NFTs from OpenSea.
 * Called by Vercel Cron on Sundays at 6 AM UTC.
 *
 * GET /api/cron/opensea-holders
 */

import { NextResponse } from "next/server";
import { openSeaClient, OpenSeaNft } from "../../../../source/lib/OpenSeaClient";
import { OpenseaCache } from "../../../../source/models";
import { connect } from "../../../../source/mongoose";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes (Vercel Pro limit)

const COLLECTION_NAME = "cryptoedition";
const CONTRACT_ADDRESS = "0xc22616e971a670e72f35570337e562c3e515fbfe";

type CardSuit = "spades" | "hearts" | "clubs" | "diamonds" | "black" | "red";

/**
 * Calculate holder statistics from NFT ownership data
 */
function calculateHolders(nfts: OpenSeaNft[]) {
  // Build holders map: address -> cards owned
  const holders: Record<string, Array<{ suit: CardSuit; value: string }>> = {};

  for (const nft of nfts) {
    if (!nft.owners || !nft.traits) {
      continue;
    }

    const suitTrait = nft.traits.find(
      (t) => t.trait_type === "Suit" || t.trait_type === "Color"
    );
    const valueTrait = nft.traits.find((t) => t.trait_type === "Value");

    if (!suitTrait || !valueTrait) {
      continue;
    }

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

export async function GET(request: Request) {
  // Verify cron secret in production
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  let nftCount = 0;

  try {
    await connect();

    // Fetch all NFTs with owner data (this is the expensive part)
    const nfts = await openSeaClient.getAllCollectionNftsWithOwners(
      COLLECTION_NAME,
      CONTRACT_ADDRESS,
      (count) => {
        nftCount = count;
      }
    );

    // Calculate holder statistics
    const holders = calculateHolders(nfts);

    // Update cache with holder data
    await OpenseaCache.findOneAndUpdate(
      { collection: COLLECTION_NAME },
      {
        $set: {
          holders,
          holdersUpdatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        nftsProcessed: nfts.length,
        holders: {
          fullDecks: holders.fullDecks.length,
          fullDecksWithJokers: holders.fullDecksWithJokers.length,
          spades: holders.spades.length,
          hearts: holders.hearts.length,
          clubs: holders.clubs.length,
          diamonds: holders.diamonds.length,
          jokers: holders.jokers.length,
        },
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[Cron OpenSea Holders] Error:", error);

    return NextResponse.json(
      {
        error: "Holder calculation failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        nftsProcessed: nftCount,
      },
      { status: 500 }
    );
  }
}
