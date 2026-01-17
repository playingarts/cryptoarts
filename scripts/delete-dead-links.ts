/**
 * Delete Dead Links - Direct deletion based on dry run results
 * Runs the check once and immediately deletes confirmed dead links
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { MongoClient, ObjectId } from "mongodb";

const MONGO_URL = process.env.MONGOURL!;
const MONGO_DB = process.env.MONGODB || "playingarts";

const CONCURRENT_REQUESTS = 10; // Faster since we're just deleting
const DELAY_BETWEEN_BATCHES = 500;

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

const DEFINITE_DEAD_STATUS_CODES = [404, 410, 451];

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

const DEAD_PAGE_INDICATORS: Record<string, string[]> = {
  instagram: [
    "Sorry, this page isn't available",
    "Profile isn't available",
    "The link you followed may be broken",
  ],
  twitter: [
    "This account doesn't exist",
    "Account suspended",
    "Hmm...this page doesn't exist",
  ],
  facebook: [
    "This content isn't available",
    "Page Not Found",
  ],
};

async function checkUrl(url: string, platform: string): Promise<{ dead: boolean; reason: string }> {
  try {
    let fullUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      fullUrl = "https://" + url;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (DEFINITE_DEAD_STATUS_CODES.includes(response.status)) {
      return { dead: true, reason: `HTTP ${response.status}` };
    }

    if (response.status >= 400) {
      return { dead: false, reason: `HTTP ${response.status}` };
    }

    if (["instagram", "twitter", "facebook"].includes(platform)) {
      const html = await response.text();
      const indicators = DEAD_PAGE_INDICATORS[platform];
      if (indicators) {
        for (const indicator of indicators) {
          if (html.toLowerCase().includes(indicator.toLowerCase())) {
            return { dead: true, reason: `Content: "${indicator}"` };
          }
        }
      }
    }

    return { dead: false, reason: "OK" };
  } catch (error: any) {
    if (error.cause?.code === "ENOTFOUND" || error.message?.includes("ENOTFOUND")) {
      return { dead: true, reason: "DNS failed" };
    }
    if (error.cause?.code === "ECONNREFUSED" || error.message?.includes("ECONNREFUSED")) {
      return { dead: true, reason: "Connection refused" };
    }
    return { dead: false, reason: error.message || "Error" };
  }
}

function detectPlatform(url: string): string {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("instagram.com")) return "instagram";
  if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return "twitter";
  if (lowerUrl.includes("facebook.com")) return "facebook";
  return "generic";
}

async function main() {
  console.log("Dead Link Remover - Direct Delete Mode\n");

  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected to MongoDB\n");

  const db = client.db(MONGO_DB);
  const artistsCollection = db.collection<Artist>("artists");

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

  const urlsToCheck: { artist: Artist; field: string; url: string }[] = [];

  for (const artist of artists) {
    if (artist.website) urlsToCheck.push({ artist, field: "website", url: artist.website });
    if (artist.shop) urlsToCheck.push({ artist, field: "shop", url: artist.shop });
    if (artist.social) {
      const fields = ["instagram", "facebook", "twitter", "behance", "dribbble", "foundation", "superrare", "makersplace", "knownorigin", "rarible", "niftygateway", "showtime"] as const;
      for (const f of fields) {
        const url = artist.social[f];
        if (url) urlsToCheck.push({ artist, field: `social.${f}`, url });
      }
    }
  }

  console.log(`Checking ${urlsToCheck.length} links and deleting dead ones...\n`);

  let deleted = 0;
  let checked = 0;

  for (let i = 0; i < urlsToCheck.length; i += CONCURRENT_REQUESTS) {
    const batch = urlsToCheck.slice(i, i + CONCURRENT_REQUESTS);

    const results = await Promise.all(
      batch.map(async ({ artist, field, url }) => {
        const platform = detectPlatform(url);
        const result = await checkUrl(url, platform);
        return { artist, field, url, result };
      })
    );

    for (const { artist, field, url, result } of results) {
      if (result.dead) {
        await artistsCollection.updateOne(
          { _id: artist._id },
          { $unset: { [field]: "" } }
        );
        deleted++;
        console.log(`  Deleted ${field} from ${artist.name}: ${url} (${result.reason})`);
      }
    }

    checked += batch.length;
    process.stdout.write(`\rProgress: ${checked}/${urlsToCheck.length} - Deleted: ${deleted}`);

    if (i + CONCURRENT_REQUESTS < urlsToCheck.length) {
      await new Promise((r) => setTimeout(r, DELAY_BETWEEN_BATCHES));
    }
  }

  console.log(`\n\nDone! Deleted ${deleted} dead links.`);
  await client.close();
}

main().catch(console.error);
