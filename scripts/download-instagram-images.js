const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INSTAGRAM_POSTS = [
  { id: "BP5WlUwhw43", username: "further_up" },
  { id: "CyjJrvTo4k_", username: "_cardastrophy_" },
  { id: "CsgobM2NqxQ", username: "_cardastrophy_" },
  { id: "CsDwfVBoJXA", username: "toma_designstudio" },
  { id: "CWScMYEs6yc", username: "nobrandonboard" },
  { id: "CIQoqzcDWfI", username: "mzkvisuals" },
  { id: "CG2qqPDAP8J", username: "martin.grohs" },
  { id: "CEuK910pOSc", username: "rubenireland" },
  { id: "BlriozVlgWv", username: "life_of_magician" },
  { id: "BxTg508nlNC", username: "giffari_erwa" },
  { id: "BwXfyCcBqet", username: "vzayycardistry" },
  { id: "Bv4Rbw7h2vf", username: "madaboutcards" },
  { id: "BqC_fujgl6H", username: "cardistry_repostoficial" },
  { id: "BXs2L-_DpSh", username: "playingcardart" },
  { id: "BUvIjtwheqL", username: "mrlemonademx" },
  { id: "BUrk8jIAkQt", username: "dnyivn" },
  { id: "DD7SyiSvZ9C", username: "chambertincards" },
];

const OUTPUT_DIR = path.join(__dirname, '../public/images/instagram');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Download using curl (more reliable for Instagram CDN)
function downloadWithCurl(url, filepath) {
  try {
    execSync(`curl -L -s -o "${filepath}" "${url}"`, { timeout: 30000 });
    return true;
  } catch (err) {
    console.error(`  curl error: ${err.message}`);
    return false;
  }
}

// Fetch the Instagram page and extract image URL using simple regex
async function getImageUrl(postId) {
  return new Promise((resolve) => {
    const url = `https://www.instagram.com/p/${postId}/embed/`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Try to find image URL in the embed page
        const match = data.match(/"display_url":"([^"]+)"/);
        if (match) {
          // Unescape the URL
          const imageUrl = match[1].replace(/\\u0026/g, '&');
          resolve(imageUrl);
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  console.log('Starting Instagram image download...\n');

  for (const post of INSTAGRAM_POSTS) {
    const filepath = path.join(OUTPUT_DIR, `${post.id}.jpg`);

    // Skip if already downloaded
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath);
      if (stats.size > 1000) {
        console.log(`✓ ${post.id}.jpg already exists (${Math.round(stats.size/1024)}kb)`);
        continue;
      }
    }

    console.log(`Fetching: ${post.id}...`);
    const imageUrl = await getImageUrl(post.id);

    if (imageUrl) {
      const success = downloadWithCurl(imageUrl, filepath);
      if (success && fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        console.log(`  ✓ Downloaded ${post.id}.jpg (${Math.round(stats.size/1024)}kb)`);
      } else {
        console.log(`  ✗ Failed to download ${post.id}`);
      }
    } else {
      console.log(`  ✗ No image URL found for ${post.id}`);
    }

    // Small delay
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\nDone!');
}

main().catch(console.error);
