/**
 * Cron OpenSea Cache Refresh API
 *
 * Refreshes cached OpenSea statistics daily.
 * Called by Vercel Cron at 6 AM UTC.
 *
 * GET /api/cron/opensea-refresh
 */

import { NextResponse } from "next/server";
import { openSeaClient } from "../../../../source/lib/OpenSeaClient";
import { OpenseaCache } from "../../../../source/models";
import { connect } from "../../../../source/mongoose";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Allow up to 60 seconds

const COLLECTION_NAME = "cryptoedition";

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

  try {
    await connect();

    // Fetch fresh data from OpenSea
    const [stats, collection, lastSaleEvent, listings] = await Promise.all([
      openSeaClient.getCollectionStats(COLLECTION_NAME),
      openSeaClient.getCollection(COLLECTION_NAME),
      openSeaClient.getLastSale(COLLECTION_NAME),
      openSeaClient.getAllCollectionListings(COLLECTION_NAME),
    ]);

    // Format last sale data
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

    // Count unique NFTs listed (not total listings which may have duplicates)
    const uniqueTokenIds = new Set(
      listings.map((l) => l.protocol_data.parameters.offer[0]?.identifierOrCriteria)
    );
    const onSaleCount = uniqueTokenIds.size;

    // Update cache
    await OpenseaCache.findOneAndUpdate(
      { collection: COLLECTION_NAME },
      {
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
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        stats: {
          volume: stats.total.volume,
          floor_price: stats.total.floor_price,
          num_owners: stats.total.num_owners,
          total_supply: collection.total_supply,
          sales_count: stats.total.sales,
          on_sale: onSaleCount,
        },
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[Cron OpenSea Refresh] Error:", error);

    return NextResponse.json(
      {
        error: "OpenSea refresh failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}
