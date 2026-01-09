import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../source/mongoose";
import { cardService } from "../../../../source/services/CardService";
import { rateLimiters } from "../../../../lib/rateLimitChecker";

// Use standard rate limiter (30 req/min)
const rateLimiter = rateLimiters.standard;

/**
 * Home cards endpoint for carousel
 *
 * GET /api/v1/home-cards?count=3
 * Returns random cards with cardBackground for the hero carousel
 */
export async function GET(request: NextRequest) {
  // Check rate limit
  const rateLimitResponse = rateLimiter.check(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    await connect();

    const { searchParams } = new URL(request.url);
    // Allow fetching all cards (up to 500) for the full deck
    const count = Math.min(parseInt(searchParams.get("count") || "3", 10), 500);

    const homeCards = await cardService.getHomeCards(count);

    // Serialize for JSON response
    const serializedCards = homeCards.map((card) => ({
      _id: card._id.toString(),
      img: card.img,
      cardBackground: card.cardBackground,
      deck: card.deck ? { slug: (card.deck as GQL.Deck).slug } : undefined,
    }));

    return NextResponse.json(serializedCards, {
      headers: {
        // Cache for 1 minute, revalidate in background
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Failed to fetch home cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  }
}
