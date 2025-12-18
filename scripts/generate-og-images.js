import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

// Register fonts
const fontPath = path.join(
  rootDir,
  "public/shared/assets/fonts/Source_Sans_Pro"
);
registerFont(path.join(fontPath, "SourceSansPro-Regular.ttf"), {
  family: "SourceSansPro",
  weight: "400",
});
registerFont(path.join(fontPath, "SourceSansPro-Bold.ttf"), {
  family: "SourceSansPro",
  weight: "700",
});

// Configuration
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OUTPUT_DIR = path.join(rootDir, "public/og");
const POSTS_DIR = path.join(rootDir, "src/content/posts");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Check if a string is an external URL
 */
function isExternalUrl(url) {
  return url && (url.startsWith("http://") || url.startsWith("https://"));
}

/**
 * Generate an OG image for a post
 * Design matches the original Jekyll opengraph.js
 */
async function generateOGImage({
  title,
  author,
  date,
  backgroundImage,
  outputPath,
}) {
  const canvas = createCanvas(OG_WIDTH, OG_HEIGHT);
  const ctx = canvas.getContext("2d");

  // Load and draw background
  let bgImage;
  try {
    if (backgroundImage) {
      if (isExternalUrl(backgroundImage)) {
        // Load from external URL
        bgImage = await loadImage(backgroundImage);
      } else if (fs.existsSync(backgroundImage)) {
        // Load from local file
        bgImage = await loadImage(backgroundImage);
      }
    }

    if (!bgImage) {
      // Create fallback background (dark blue like original)
      ctx.fillStyle = "#2c3e50";
      ctx.fillRect(0, 0, OG_WIDTH, OG_HEIGHT);
    }
  } catch (error) {
    console.warn(
      `Could not load background image: ${backgroundImage}`,
      error.message
    );
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(0, 0, OG_WIDTH, OG_HEIGHT);
  }

  if (bgImage) {
    // Scale to fill (same as original)
    const scale = Math.max(
      OG_WIDTH / bgImage.width,
      OG_HEIGHT / bgImage.height
    );
    const x = OG_WIDTH / 2 - (bgImage.width / 2) * scale;
    const y = OG_HEIGHT / 2 - (bgImage.height / 2) * scale;
    ctx.drawImage(bgImage, x, y, bgImage.width * scale, bgImage.height * scale);
  }

  // Add gradient overlay (same as original: 0.2 top, 0.6 bottom)
  const gradient = ctx.createLinearGradient(0, 0, 0, OG_HEIGHT);
  gradient.addColorStop(0, "rgba(0,0,0,0.2)");
  gradient.addColorStop(1, "rgba(0,0,0,0.6)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, OG_WIDTH, OG_HEIGHT);

  ctx.textBaseline = "top";

  // Draw title with shadow (90px like original)
  ctx.font = "700 90px SourceSansPro";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  wrapText(ctx, title, 80, 130, 1100, 100);

  // Draw date (30px like original)
  ctx.font = "700 30px SourceSansPro";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(date, 80, 80);

  // Draw author at bottom (40px at y=555 like original)
  ctx.textBaseline = "bottom";
  ctx.font = "700 40px SourceSansPro";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(author, 80, 555);

  // Reset shadow for logo
  ctx.shadowColor = "transparent";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;

  // Load and draw logo (position 820, 490 with width 300 like original)
  try {
    const logoPath = path.join(
      rootDir,
      "public/assets/img/logo-with-poweredby-white.png"
    );
    if (fs.existsSync(logoPath)) {
      const logo = await loadImage(logoPath);
      const logoWidth = 300;
      const logoHeight = (logoWidth * logo.height) / logo.width;
      ctx.drawImage(logo, 820, 490, logoWidth, logoHeight);
    }
  } catch (error) {
    console.warn("Could not load logo");
  }

  // Save the image
  const buffer = canvas.toBuffer("image/jpeg", { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Generated: ${path.basename(outputPath)}`);
}

/**
 * Wrap text to fit within maxWidth (same as original Jekyll script)
 */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const lang = date.toLocaleDateString ? "de-DE" : "en-US";
  return date.toLocaleDateString(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get all posts from content directory
 */
function getAllPosts() {
  const posts = [];

  if (!fs.existsSync(POSTS_DIR)) {
    console.warn(`Posts directory not found: ${POSTS_DIR}`);
    return posts;
  }

  // Read both 'de' and 'en' subdirectories
  const langDirs = ["de", "en"];

  for (const langDir of langDirs) {
    const langPath = path.join(POSTS_DIR, langDir);
    if (!fs.existsSync(langPath)) continue;

    const entries = fs.readdirSync(langPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const indexPath = path.join(langPath, entry.name, "index.md");
        if (fs.existsSync(indexPath)) {
          const content = fs.readFileSync(indexPath, "utf-8");
          const { data } = matter(content);

          // Remove date prefix from slug (e.g., "2020-09-01-article-name" -> "article-name")
          const slug = entry.name.replace(/^\d{4}-\d{2}-\d{2}-/, "");

          posts.push({
            slug,
            folderName: entry.name,
            language: data.language || langDir,
            title: data.title || "Untitled",
            author: data.author || "Angular.DE Team",
            date: data.published_at ? formatDate(data.published_at) : "",
            headerImage: data.header_image,
            postDir: path.join(langPath, entry.name),
          });
        }
      }
    }
  }

  return posts;
}

/**
 * Main function to generate all OG images
 */
async function generateAllOGImages() {
  console.log("🖼️  Generating OpenGraph images...\n");

  const posts = getAllPosts();
  console.log(`Found ${posts.length} posts\n`);

  let generated = 0;
  let skipped = 0;

  for (const post of posts) {
    const outputPath = path.join(OUTPUT_DIR, `${post.slug}.jpg`);

    // Skip if already exists (unless FORCE_REGENERATE is set)
    if (fs.existsSync(outputPath) && !process.env.FORCE_REGENERATE) {
      skipped++;
      continue;
    }

    // Find background image
    let backgroundImage = null;
    if (post.headerImage) {
      if (isExternalUrl(post.headerImage)) {
        // Use external URL directly
        backgroundImage = post.headerImage;
      } else {
        // Search for local file
        const possiblePaths = [
          path.join(post.postDir, post.headerImage),
          path.join(rootDir, "public", post.headerImage),
          path.join(rootDir, "public/assets/img", post.headerImage),
        ];

        for (const p of possiblePaths) {
          if (fs.existsSync(p)) {
            backgroundImage = p;
            break;
          }
        }
      }
    }

    try {
      await generateOGImage({
        title: post.title,
        author: post.author,
        date: post.date,
        backgroundImage,
        outputPath,
      });
      generated++;
    } catch (error) {
      console.error(
        `✗ Failed to generate OG image for ${post.slug}:`,
        error.message
      );
    }
  }

  console.log(`\n✅ Generated: ${generated} | Skipped (existing): ${skipped}`);
}

// Run if called directly
generateAllOGImages().catch(console.error);

export { generateOGImage, generateAllOGImages };
