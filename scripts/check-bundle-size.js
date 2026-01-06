#!/usr/bin/env node
/**
 * Bundle size budget enforcement script
 * Parses Next.js build output and checks against size budgets
 *
 * Usage: node scripts/check-bundle-size.js
 * Set BUNDLE_BUDGET_WARN and BUNDLE_BUDGET_FAIL env vars to customize thresholds
 */

const fs = require("fs");
const path = require("path");

// Default budgets (in kB) - these are for the unique JS per route, not total
// Current baseline: ~395kB max, set thresholds to prevent regression
const WARN_THRESHOLD = parseInt(process.env.BUNDLE_BUDGET_WARN || "400", 10);
const FAIL_THRESHOLD = parseInt(process.env.BUNDLE_BUDGET_FAIL || "500", 10);

// Shared chunks that are loaded on every page (framework, main, etc.)
const SHARED_CHUNKS = ["framework", "main", "webpack", "polyfills"];

const NEXT_DIR = path.join(process.cwd(), ".next");
const BUILD_MANIFEST_PATH = path.join(NEXT_DIR, "build-manifest.json");
const STATIC_DIR = path.join(NEXT_DIR, "static");

/**
 * Get file size in kB
 */
function getFileSizeKB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size / 1024;
  } catch {
    return 0;
  }
}

/**
 * Find a chunk file by partial name
 */
function findChunkFile(chunkPath) {
  const fullPath = path.join(NEXT_DIR, chunkPath);
  if (fs.existsSync(fullPath)) {
    return fullPath;
  }
  return null;
}

/**
 * Check if a chunk is a shared chunk (loaded on all pages)
 */
function isSharedChunk(chunkPath) {
  return SHARED_CHUNKS.some((shared) => chunkPath.includes(shared));
}

/**
 * Calculate total size of chunks for a route
 */
function calculateRouteSize(chunks) {
  let totalSize = 0;
  let uniqueSize = 0;

  for (const chunk of chunks) {
    const filePath = findChunkFile(chunk);
    if (filePath) {
      const size = getFileSizeKB(filePath);
      totalSize += size;
      if (!isSharedChunk(chunk)) {
        uniqueSize += size;
      }
    }
  }

  return { totalSize, uniqueSize };
}

/**
 * Format size with color indicator
 */
function formatSize(sizeKB, threshold = WARN_THRESHOLD) {
  const formatted = sizeKB.toFixed(1).padStart(7) + " kB";
  if (sizeKB > FAIL_THRESHOLD) return `❌ ${formatted}`;
  if (sizeKB > threshold) return `⚠️  ${formatted}`;
  return `✅ ${formatted}`;
}

function checkBudgets() {
  console.log("📊 Bundle Size Budget Check\n");
  console.log(`   Warning threshold: ${WARN_THRESHOLD} kB (unique JS)`);
  console.log(`   Failure threshold: ${FAIL_THRESHOLD} kB (unique JS)\n`);

  // Check if build manifest exists
  if (!fs.existsSync(BUILD_MANIFEST_PATH)) {
    console.log("⚠️  Build manifest not found. Run 'yarn build' first.\n");
    process.exit(0);
  }

  const manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, "utf8"));
  const pages = manifest.pages || {};

  // Skip internal pages
  const routesToCheck = Object.keys(pages).filter(
    (route) => !route.startsWith("/_")
  );

  let hasWarnings = false;
  let hasFailures = false;

  console.log("Route                          Unique JS    Total JS");
  console.log("─".repeat(55));

  // Calculate sizes for each route
  const results = [];
  for (const route of routesToCheck) {
    const chunks = pages[route];
    const { totalSize, uniqueSize } = calculateRouteSize(chunks);
    results.push({ route, uniqueSize, totalSize });

    if (uniqueSize > FAIL_THRESHOLD) hasFailures = true;
    else if (uniqueSize > WARN_THRESHOLD) hasWarnings = true;
  }

  // Sort by unique size descending
  results.sort((a, b) => b.uniqueSize - a.uniqueSize);

  for (const { route, uniqueSize, totalSize } of results) {
    const routeDisplay = route.padEnd(30);
    const uniqueDisplay = formatSize(uniqueSize);
    const totalDisplay = totalSize.toFixed(1).padStart(7) + " kB";
    console.log(`${routeDisplay} ${uniqueDisplay}  ${totalDisplay}`);
  }

  // Calculate shared bundle size
  const appChunks = pages["/_app"] || [];
  let sharedSize = 0;
  for (const chunk of appChunks) {
    if (isSharedChunk(chunk)) {
      const filePath = findChunkFile(chunk);
      if (filePath) {
        sharedSize += getFileSizeKB(filePath);
      }
    }
  }

  console.log("─".repeat(55));
  console.log(`Shared chunks (framework/main): ${sharedSize.toFixed(1)} kB`);
  console.log("");

  // Summary
  if (hasFailures) {
    console.log("❌ FAILED: Some routes exceed the failure threshold!");
    console.log("   Consider code-splitting or reducing dependencies.\n");
    process.exit(1);
  } else if (hasWarnings) {
    console.log("⚠️  WARNING: Some routes exceed the warning threshold");
    console.log("   Monitor these routes as they approach the limit.\n");
    process.exit(0);
  } else {
    console.log("✅ PASSED: All routes within budget\n");
    process.exit(0);
  }
}

checkBudgets();
