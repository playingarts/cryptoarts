import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";
import { requireAdmin, isNextResponse } from "../../../../lib/auth";

// Configure route to accept larger file uploads (up to 50MB)
export const config = {
  api: {
    bodyParser: false,
  },
};

// For App Router, we need to export runtime config
export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds timeout for processing large images

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET = process.env.AWS_S3_BUCKET || "img.playingarts.com";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Image processing settings
const OUTPUT_SIZE = 800; // 800x800 pixels
const OUTPUT_QUALITY = 80; // JPEG quality

/**
 * GET /api/v1/upload - Get presigned URL for direct S3 upload
 * Requires admin authentication
 * Query params:
 *   - cardId: Card ID for organizing uploads
 *   - filename: Original filename
 *   - contentType: MIME type
 *   - photoType: "main" | "additional"
 */
export async function GET(request: NextRequest) {
  // Check admin authentication
  const authResult = await requireAdmin(request);
  if (isNextResponse(authResult)) {
    return authResult;
  }

  const searchParams = request.nextUrl.searchParams;
  const cardId = searchParams.get("cardId");
  const filename = searchParams.get("filename");
  const contentType = searchParams.get("contentType");
  const photoType = searchParams.get("photoType") || "additional";

  if (!cardId || !filename || !contentType) {
    return NextResponse.json(
      { error: "Missing required parameters: cardId, filename, contentType" },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json(
      { error: `Invalid content type. Allowed: ${ALLOWED_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  // Generate unique filename with timestamp
  const timestamp = Date.now();
  const key = `card-photos/${cardId}/${photoType}-${timestamp}.jpg`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: "image/jpeg", // Always JPEG after processing
  });

  try {
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    });

    // The final URL where the image will be accessible
    const imageUrl = `https://s3.amazonaws.com/${BUCKET}/${key}`;

    return NextResponse.json({
      presignedUrl,
      imageUrl,
      key,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/upload - Direct upload with server-side processing
 * Requires admin authentication
 * Automatically crops to center square and resizes to 800x800
 * Body: FormData with file
 */
export async function POST(request: NextRequest) {
  // Check admin authentication
  const authResult = await requireAdmin(request);
  if (isNextResponse(authResult)) {
    return authResult;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const cardId = formData.get("cardId") as string | null;
    const photoType = (formData.get("photoType") as string) || "additional";

    if (!file || !cardId) {
      return NextResponse.json(
        { error: "Missing file or cardId" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 10MB" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const inputBuffer = Buffer.from(await file.arrayBuffer());

    // Process image with Sharp:
    // 1. Auto-crop to center square
    // 2. Resize to 800x800
    // 3. Convert to JPEG with quality 80
    const processedBuffer = await sharp(inputBuffer)
      .resize(OUTPUT_SIZE, OUTPUT_SIZE, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: OUTPUT_QUALITY })
      .toBuffer();

    // Generate unique filename (always .jpg after processing)
    const timestamp = Date.now();
    const key = `card-photos/${cardId}/${photoType}-${timestamp}.jpg`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: processedBuffer,
      ContentType: "image/jpeg",
    });

    await s3Client.send(command);

    const imageUrl = `https://s3.amazonaws.com/${BUCKET}/${key}`;

    return NextResponse.json({
      success: true,
      imageUrl,
      key,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
