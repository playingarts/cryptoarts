/**
 * Check Artist Links Script
 *
 * Validates all artist links (website, social, NFT platforms) and removes dead ones.
 *
 * Usage:
 *   npx tsx scripts/check-artist-links.ts          # Dry run - just report
 *   npx tsx scripts/check-artist-links.ts --fix    # Actually remove dead links
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient, ObjectId } from "mongodb";

const MONGO_URL = process.env.MONGOURL!;
const MONGO_DB = process.env.MONGODB || "playingarts";

// Rate limiting
const CONCURRENT_REQUESTS = 5; // Reduced to be less aggressive
const DELAY_BETWEEN_BATCHES = 2000; // ms - increased delay

// User agent to avoid bot detection
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

// HTTP status codes that DEFINITIVELY indicate a dead link
// We're being conservative - only mark as dead when we're CERTAIN
const DEFINITE_DEAD_STATUS_CODES = [404, 410, 451]; // Not Found, Gone, Unavailable for Legal Reasons
// These are NOT dead: 403 (forbidden - often bot blocking), 401 (auth required), 500-599 (server issues)

interface DeadLink {
  artistId: ObjectId;
  artistName: string;
  field: string;
  url: string;
  reason: string;
}

interface UncertainLink {
  artistId: ObjectId;
  artistName: string;
  field: string;
  url: string;
  reason: string;
}

interface Artist {
  _id: ObjectId;
  name: string;
  slug: string;
  website?: string;
  shop?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    behance?: string;
    dribbble?: string;
    foundation?: string;
    superrare?: string;
    makersplace?: string;
    knownorigin?: string;
    rarible?: string;
    niftygateway?: string;
    showtime?: string;
  };
}

// Platform-specific dead page indicators
const DEAD_PAGE_INDICATORS: Record<string, string[]> = {
  instagram: [
    "Sorry, this page isn't available",
    "Profile isn't available",
    "The link you followed may be broken",
    "this page may have been removed",
  ],
  twitter: [
    "This account doesn't exist",
    "Account suspended",
    "This account has been suspended",
    "Hmm...this page doesn't exist",
    "Something went wrong. Try reloading",
  ],
  facebook: [
    "This content isn't available",
    "The link you followed may be broken",
    "Page Not Found",
    "This page isn't available",
  ],
  behance: [
    "Page not found",
    "The page you were looking for doesn't exist",
    "404",
  ],
  dribbble: [
    "Page not found",
    "That page doesn't exist",
    "404 error",
  ],
  foundation: [
    "Page not found",
    "This page could not be found",
  ],
  superrare: [
    "Page not found",
    "404",
  ],
  generic: [
    "404",
    "Page not found",
    "Not Found",
    "This site can't be reached",
    "Server not found",
  ],
};

/**
 * Check if a URL is dead - CONSERVATIVE approach
 * Only returns dead=true when we're highly confident the link is actually dead
 */
async function checkUrl(url: string, platform: string): Promise<{ dead: boolean; reason: string; uncertain?: boolean }> {
  try {
    // Ensure URL has protocol
    let fullUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      fullUrl = "https://" + url;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout (increased)

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // ONLY mark as dead for definite dead status codes
    if (DEFINITE_DEAD_STATUS_CODES.includes(response.status)) {
      return { dead: true, reason: `HTTP ${response.status}` };
    }

    // For 403, 401, 5xx - site exists but may be blocking bots, DON'T mark as dead
    if (response.status >= 400) {
      return { dead: false, reason: `HTTP ${response.status} - site exists but may block bots`, uncertain: true };
    }

    // Check page content for platform-specific indicators (social media soft 404s)
    // Only check for social media platforms where we know the indicators are reliable
    if (["instagram", "twitter", "facebook"].includes(platform)) {
      const html = await response.text();
      const indicators = DEAD_PAGE_INDICATORS[platform];

      if (indicators) {
        for (const indicator of indicators) {
          if (html.toLowerCase().includes(indicator.toLowerCase())) {
            return { dead: true, reason: `Page content: "${indicator}"` };
          }
        }
      }
    }

    return { dead: false, reason: "OK" };
  } catch (error: any) {
    // DNS lookup failed - domain doesn't exist - DEFINITE dead
    if (error.cause?.code === "ENOTFOUND" || error.message?.includes("ENOTFOUND")) {
      return { dead: true, reason: "DNS lookup failed - domain does not exist" };
    }

    // Connection refused - server not accepting connections - DEFINITE dead
    if (error.cause?.code === "ECONNREFUSED" || error.message?.includes("ECONNREFUSED")) {
      return { dead: true, reason: "Connection refused - server not running" };
    }

    // Timeout - could be slow site, DON'T mark as dead
    if (error.cause?.code === "ETIMEDOUT" || error.name === "AbortError") {
      return { dead: false, reason: "Timeout - site may be slow", uncertain: true };
    }

    // SSL certificate issues - site has problems but exists
    if (error.cause?.code === "CERT_HAS_EXPIRED" || error.message?.includes("certificate")) {
      return { dead: false, reason: "SSL certificate issue", uncertain: true };
    }

    // For other errors, DON'T mark as dead - we're not certain
    return { dead: false, reason: error.message || "Unknown error", uncertain: true };
  }
}

/**
 * Detect platform from URL
 */
function detectPlatform(url: string): string {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("instagram.com")) return "instagram";
  if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return "twitter";
  if (lowerUrl.includes("facebook.com") || lowerUrl.includes("fb.com")) return "facebook";
  if (lowerUrl.includes("behance.net")) return "behance";
  if (lowerUrl.includes("dribbble.com")) return "dribbble";
  if (lowerUrl.includes("foundation.app")) return "foundation";
  if (lowerUrl.includes("superrare.com")) return "superrare";
  return "generic";
}

/**
 * Process a batch of URLs
 */
async function processBatch(
  batch: { artist: Artist; field: string; url: string }[]
): Promise<{ dead: DeadLink[]; uncertain: UncertainLink[] }> {
  const dead: DeadLink[] = [];
  const uncertain: UncertainLink[] = [];

  const results = await Promise.all(
    batch.map(async ({ artist, field, url }) => {
      const platform = detectPlatform(url);
      const result = await checkUrl(url, platform);

      return {
        artist,
        field,
        url,
        result,
      };
    })
  );

  for (const { artist, field, url, result } of results) {
    if (result.dead) {
      dead.push({
        artistId: artist._id,
        artistName: artist.name,
        field,
        url,
        reason: result.reason,
      });
    } else if (result.uncertain) {
      uncertain.push({
        artistId: artist._id,
        artistName: artist.name,
        field,
        url,
        reason: result.reason,
      });
    }
  }

  return { dead, uncertain };
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const shouldFix = args.includes("--fix");

  console.log("🔗 Artist Link Checker");
  console.log("======================\n");
  console.log(`Mode: ${shouldFix ? "FIX (will remove dead links)" : "DRY RUN (report only)"}\n`);

  // Connect to MongoDB
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected to MongoDB\n");

  const db = client.db(MONGO_DB);
  const artistsCollection = db.collection<Artist>("artists");

  // Get all artists with any links
  const artists = await artistsCollection.find({
    $or: [
      { website: { $exists: true, $ne: "" } },
      { shop: { $exists: true, $ne: "" } },
      { "social.instagram": { $exists: true, $ne: "" } },
      { "social.facebook": { $exists: true, $ne: "" } },
      { "social.twitter": { $exists: true, $ne: "" } },
      { "social.behance": { $exists: true, $ne: "" } },
      { "social.dribbble": { $exists: true, $ne: "" } },
      { "social.foundation": { $exists: true, $ne: "" } },
      { "social.superrare": { $exists: true, $ne: "" } },
      { "social.makersplace": { $exists: true, $ne: "" } },
      { "social.knownorigin": { $exists: true, $ne: "" } },
      { "social.rarible": { $exists: true, $ne: "" } },
      { "social.niftygateway": { $exists: true, $ne: "" } },
      { "social.showtime": { $exists: true, $ne: "" } },
    ],
  }).toArray();

  console.log(`Found ${artists.length} artists with links\n`);

  // Build list of all URLs to check
  const urlsToCheck: { artist: Artist; field: string; url: string }[] = [];

  for (const artist of artists) {
    if (artist.website) {
      urlsToCheck.push({ artist, field: "website", url: artist.website });
    }
    if (artist.shop) {
      urlsToCheck.push({ artist, field: "shop", url: artist.shop });
    }
    if (artist.social) {
      const socialFields = [
        "instagram", "facebook", "twitter", "behance", "dribbble",
        "foundation", "superrare", "makersplace", "knownorigin",
        "rarible", "niftygateway", "showtime"
      ] as const;

      for (const field of socialFields) {
        const url = artist.social[field];
        if (url) {
          urlsToCheck.push({ artist, field: `social.${field}`, url });
        }
      }
    }
  }

  console.log(`Total links to check: ${urlsToCheck.length}\n`);
  console.log("Checking links (this may take a while)...\n");

  // Process in batches
  const deadLinks: DeadLink[] = [];
  const uncertainLinks: UncertainLink[] = [];
  let processed = 0;

  for (let i = 0; i < urlsToCheck.length; i += CONCURRENT_REQUESTS) {
    const batch = urlsToCheck.slice(i, i + CONCURRENT_REQUESTS);
    const { dead, uncertain } = await processBatch(batch);
    deadLinks.push(...dead);
    uncertainLinks.push(...uncertain);

    processed += batch.length;
    const percent = Math.round((processed / urlsToCheck.length) * 100);
    process.stdout.write(`\rProgress: ${processed}/${urlsToCheck.length} (${percent}%) - Dead: ${deadLinks.length}, Uncertain: ${uncertainLinks.length}`);

    // Rate limiting
    if (i + CONCURRENT_REQUESTS < urlsToCheck.length) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }

  console.log("\n\n");

  // Report results
  console.log("=".repeat(60));
  console.log("RESULTS");
  console.log("=".repeat(60));

  if (deadLinks.length === 0) {
    console.log("\n✅ No definitely dead links found!");
  } else {
    console.log(`\n❌ DEFINITELY DEAD LINKS: ${deadLinks.length}`);
    console.log("(These are safe to remove - domain doesn't exist or returns 404/410)\n");

    // Group by platform
    const byPlatform: Record<string, DeadLink[]> = {};
    for (const link of deadLinks) {
      const platform = link.field.replace("social.", "");
      if (!byPlatform[platform]) byPlatform[platform] = [];
      byPlatform[platform].push(link);
    }

    for (const [platform, links] of Object.entries(byPlatform)) {
      console.log(`\n--- ${platform.toUpperCase()} (${links.length}) ---`);
      for (const link of links) {
        console.log(`  ${link.artistName}: ${link.url}`);
        console.log(`    Reason: ${link.reason}`);
      }
    }

    // Fix if requested
    if (shouldFix) {
      console.log("\n\nRemoving dead links from database...\n");

      for (const link of deadLinks) {
        await artistsCollection.updateOne(
          { _id: link.artistId },
          { $unset: { [link.field]: "" } }
        );

        console.log(`  Removed ${link.field} from ${link.artistName}`);
      }

      console.log(`\n✅ Removed ${deadLinks.length} dead links from database`);
    } else {
      console.log("\n\nRun with --fix to remove these links from the database");
    }
  }

  // Report uncertain links (for manual review)
  if (uncertainLinks.length > 0) {
    console.log("\n" + "=".repeat(60));
    console.log(`⚠️  UNCERTAIN LINKS: ${uncertainLinks.length}`);
    console.log("(These need manual verification - may be bot blocking, slow, or have SSL issues)\n");

    // Group by reason
    const byReason: Record<string, UncertainLink[]> = {};
    for (const link of uncertainLinks) {
      const reason = link.reason.split(" - ")[0]; // Get first part of reason
      if (!byReason[reason]) byReason[reason] = [];
      byReason[reason].push(link);
    }

    for (const [reason, links] of Object.entries(byReason)) {
      console.log(`\n--- ${reason} (${links.length}) ---`);
      // Only show first 10 of each type
      const sample = links.slice(0, 10);
      for (const link of sample) {
        console.log(`  ${link.artistName}: ${link.url}`);
      }
      if (links.length > 10) {
        console.log(`  ... and ${links.length - 10} more`);
      }
    }
  }

  await client.close();
  console.log("\nDone!");
}

main().catch(console.error);
