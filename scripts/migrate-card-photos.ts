/**
 * Migration script: Upload card photos to S3 and update MongoDB
 *
 * Reads photos from public/images/photos/{deck_folder}/
 * Resizes to 800x800, uploads to S3, updates card.mainPhoto
 *
 * Run: npx ts-node --transpile-only scripts/migrate-card-photos.ts
 */

import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { MongoClient, ObjectId } from "mongodb";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Configuration
const PHOTOS_DIR = path.join(process.cwd(), "public/images/photos");
const S3_BUCKET = process.env.AWS_S3_BUCKET || "img.playingarts.com";
const S3_FOLDER = "card-photos";
const IMAGE_SIZE = 800;
const IMAGE_QUALITY = 80;

// Folder to deck slug mapping
const FOLDER_TO_DECK: Record<string, string> = {
  edition_zero: "zero",
  edition_one: "one",
  edition_two: "two",
  edition_three: "three",
  edition_special: "special",
  edition_future_1: "future",
  edition_future_2: "future-ii",
};

// Value mapping (filename char to database value)
const VALUE_MAP: Record<string, string> = {
  "a": "ace",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
  "j": "jack",
  "q": "queen",
  "k": "king",
  "joker": "joker",
};

// Suit mapping (filename char to database suit)
const SUIT_MAP: Record<string, string> = {
  "h": "hearts",
  "d": "diamonds",
  "c": "clubs",
  "s": "spades",
};

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Joker filename to suit mapping (joker.jpg -> black, joker2.jpg -> red, joker3.jpg -> blue, joker-2.jpg -> red)
const JOKER_SUIT_MAP: Record<string, string> = {
  "joker": "black",
  "joker1": "black",
  "joker-1": "black",
  "joker2": "red",
  "joker-2": "red",
  "joker3": "blue",
  "joker-3": "blue",
};

/**
 * Normalize filename - replace Cyrillic lookalikes with Latin chars
 */
function normalizeFilename(filename: string): string {
  // Replace Cyrillic с (U+0441) with Latin c (U+0063)
  // Replace Cyrillic а (U+0430) with Latin a (U+0061)
  // etc.
  return filename
    .replace(/с/g, "c")  // Cyrillic с -> Latin c
    .replace(/а/g, "a")  // Cyrillic а -> Latin a
    .replace(/е/g, "e")  // Cyrillic е -> Latin e
    .replace(/о/g, "o")  // Cyrillic о -> Latin o
    .replace(/р/g, "p")  // Cyrillic р -> Latin p
    .replace(/х/g, "x"); // Cyrillic х -> Latin x
}

/**
 * Parse filename to extract value and suit
 * Examples: "8h.jpg" -> { value: "8", suit: "hearts" }
 *           "js.jpg" -> { value: "j", suit: "spades" }
 *           "10c.jpg" -> { value: "10", suit: "clubs" }
 *           "2c2.jpg" -> { value: "2", suit: "clubs" } (ignore suffix)
 *           "joker.jpg" -> { value: "joker", suit: "black" }
 *           "joker2.jpg" -> { value: "joker", suit: "red" }
 */
function parseFilename(filename: string): { value: string; suit: string } | null {
  // Remove extension and normalize
  const name = normalizeFilename(filename.replace(/\.(jpg|jpeg|png|webp)$/i, "").toLowerCase());

  // Handle back designs - cards with value "backside" and suit ""
  if (name.startsWith("back")) {
    // back.jpg, back-1.jpg, back-2.jpg -> backside card
    return { value: "backside", suit: "" };
  }

  // Handle joker - jokers have suit "black", "red", or "blue" in DB
  if (name.startsWith("joker")) {
    const jokerSuit = JOKER_SUIT_MAP[name] || "black";
    return { value: "joker", suit: jokerSuit };
  }

  // Match pattern: value (1-2 chars) + suit (1 char) + optional suffix
  const match = name.match(/^(10|[2-9]|[ajqk])([hdcs])(\d)?$/);
  if (!match) {
    return null;
  }

  const [, valueChar, suitChar] = match;
  const value = VALUE_MAP[valueChar];
  const suit = SUIT_MAP[suitChar];

  if (!value || !suit) {
    return null;
  }

  return { value, suit };
}

/**
 * Convert value to full word for S3 filename
 */
function valueToWord(value: string): string {
  const words: Record<string, string> = {
    "a": "ace",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "10": "ten",
    "j": "jack",
    "q": "queen",
    "k": "king",
    "joker": "joker",
  };
  return words[value] || value;
}

/**
 * Process and upload a single image
 */
async function processImage(
  filePath: string,
  deckSlug: string,
  value: string,
  suit: string
): Promise<Buffer> {
  // Read and process image with sharp
  const image = sharp(filePath);
  const metadata = await image.metadata();

  // Calculate crop to make square (center crop)
  const size = Math.min(metadata.width || IMAGE_SIZE, metadata.height || IMAGE_SIZE);
  const left = Math.floor(((metadata.width || size) - size) / 2);
  const top = Math.floor(((metadata.height || size) - size) / 2);

  // Crop to square, resize, convert to JPEG
  const processed = await image
    .extract({ left, top, width: size, height: size })
    .resize(IMAGE_SIZE, IMAGE_SIZE)
    .jpeg({ quality: IMAGE_QUALITY })
    .toBuffer();

  return processed;
}

/**
 * Upload image to S3
 */
async function uploadToS3(
  buffer: Buffer,
  deckSlug: string,
  value: string,
  suit: string
): Promise<string> {
  const filename = `${valueToWord(value)}-${suit}.jpg`;
  const key = `${S3_FOLDER}/${deckSlug}/${filename}`;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: "image/jpeg",
  });

  await s3Client.send(command);

  return `https://s3.amazonaws.com/${S3_BUCKET}/${key}`;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log("Starting card photos migration...\n");

  // Connect to MongoDB
  const mongoUrl = process.env.MONGOURL;
  const dbName = process.env.MONGODB;

  if (!mongoUrl || !dbName) {
    throw new Error("Missing MONGOURL or MONGODB environment variables");
  }

  const client = new MongoClient(mongoUrl);
  await client.connect();
  console.log("Connected to MongoDB\n");

  const db = client.db(dbName);
  const cardsCollection = db.collection("cards");
  const decksCollection = db.collection("decks");

  // Get all deck IDs
  const decks = await decksCollection.find({}).toArray();
  const deckSlugToId: Record<string, ObjectId> = {};
  for (const deck of decks) {
    deckSlugToId[deck.slug] = deck._id;
  }

  // Stats
  let processed = 0;
  let uploaded = 0;
  let skipped = 0;
  let errors = 0;

  // Process each folder
  const folders = fs.readdirSync(PHOTOS_DIR).filter(f =>
    fs.statSync(path.join(PHOTOS_DIR, f)).isDirectory()
  );

  for (const folder of folders) {
    const deckSlug = FOLDER_TO_DECK[folder];
    if (!deckSlug) {
      console.log(`Skipping unknown folder: ${folder}`);
      continue;
    }

    const deckId = deckSlugToId[deckSlug];
    if (!deckId) {
      console.log(`Deck not found in DB: ${deckSlug}`);
      continue;
    }

    console.log(`\nProcessing ${folder} -> ${deckSlug}...`);

    const folderPath = path.join(PHOTOS_DIR, folder);
    const files = fs.readdirSync(folderPath).filter(f =>
      /\.(jpg|jpeg|png|webp)$/i.test(f)
    );

    for (const file of files) {
      processed++;
      const filePath = path.join(folderPath, file);

      // Parse filename
      const parsed = parseFilename(file);
      if (!parsed) {
        console.log(`  Skipping unrecognized file: ${file}`);
        skipped++;
        continue;
      }

      const { value, suit } = parsed;

      // Find card in database
      const card = await cardsCollection.findOne({
        deck: deckId,
        value: value,
        suit: suit,
      });

      if (!card) {
        console.log(`  Card not found: ${deckSlug} ${value} of ${suit} (${file})`);
        skipped++;
        continue;
      }

      try {
        // Process image
        const buffer = await processImage(filePath, deckSlug, value, suit);

        // Upload to S3
        const url = await uploadToS3(buffer, deckSlug, value, suit);

        // Update card in database
        await cardsCollection.updateOne(
          { _id: card._id },
          { $set: { mainPhoto: url } }
        );

        console.log(`  Uploaded: ${value} of ${suit} -> ${url}`);
        uploaded++;
      } catch (err) {
        console.error(`  Error processing ${file}:`, err);
        errors++;
      }
    }
  }

  // Close connection
  await client.close();

  // Print summary
  console.log("\n=== Migration Complete ===");
  console.log(`Processed: ${processed}`);
  console.log(`Uploaded:  ${uploaded}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Errors:    ${errors}`);
}

// Run migration
migrate().catch(console.error);
