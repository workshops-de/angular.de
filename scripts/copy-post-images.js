#!/usr/bin/env node

/**
 * Script to copy post images from content/posts to public/artikel
 * This ensures images are accessible at the expected URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASTRO_ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ASTRO_ROOT, 'src/content/posts');
const PUBLIC_DIR = path.join(ASTRO_ROOT, 'public/artikel');

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy images from post directories to public/artikel
function copyPostImages() {
  console.log('Copying post images to public folder...\n');

  if (!fs.existsSync(POSTS_DIR)) {
    console.log('No posts directory found. Run `npm run migrate` first.');
    return;
  }

  const postDirs = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory());

  let imageCount = 0;

  for (const postDir of postDirs) {
    const postPath = path.join(POSTS_DIR, postDir.name);

    // Extract slug from folder name (remove date prefix)
    const slug = postDir.name.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const destPath = path.join(PUBLIC_DIR, slug);

    // Get all files in the post directory
    const files = fs.readdirSync(postPath);

    // Filter for image files
    const imageFiles = files.filter(f =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)
    );

    if (imageFiles.length > 0) {
      ensureDir(destPath);

      for (const img of imageFiles) {
        fs.copyFileSync(
          path.join(postPath, img),
          path.join(destPath, img)
        );
        imageCount++;
      }
    }
  }

  console.log(`✅ Copied ${imageCount} images to public/artikel/`);
}

copyPostImages();
