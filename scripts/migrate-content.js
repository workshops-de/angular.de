#!/usr/bin/env node

/**
 * Migration script to copy content from Jekyll to Astro
 *
 * This script:
 * 1. Copies blog posts from _posts to src/content/posts
 * 2. Copies user data from _data/users to src/content/users
 * 3. Copies static assets to public folder
 * 4. Transforms Jekyll frontmatter to Astro format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Jekyll project location - adjust this path as needed
const JEKYLL_ROOT = path.join(__dirname, '../../angular.de');
const ASTRO_ROOT = path.join(__dirname, '..');

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy directory recursively
function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Transform Jekyll frontmatter to Astro format
function transformFrontmatter(content, _postSlug) {
  // Extract frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return content;

  let frontmatter = fmMatch[1];
  let body = content.slice(fmMatch[0].length);

  // Transform date format if needed
  frontmatter = frontmatter.replace(
    /published_at:\s*["']?(\d{4}-\d{2}-\d{2})[T\s](\d{2}:\d{2}:\d{2}).*["']?/,
    'published_at: $1T$2.000Z'
  );

  // Ensure header_image is relative or absolute
  if (!frontmatter.includes('header_image:')) {
    frontmatter += '\nheader_image: "header.jpg"';
  }

  return `---\n${frontmatter}\n---${body}`;
}

// Migrate blog posts
function migratePosts() {
  console.log('Migrating blog posts...');

  const postsDir = path.join(JEKYLL_ROOT, '_posts');
  const destDir = path.join(ASTRO_ROOT, 'src/content/posts');

  ensureDir(destDir);

  if (!fs.existsSync(postsDir)) {
    console.log(`  No posts directory found at ${postsDir}, skipping...`);
    return;
  }

  const postDirs = fs.readdirSync(postsDir, { withFileTypes: true })
    .filter(d => d.isDirectory());

  let count = 0;
  for (const postDir of postDirs) {
    const postPath = path.join(postsDir, postDir.name);
    const destPath = path.join(destDir, postDir.name);

    // Find the markdown file
    const files = fs.readdirSync(postPath);
    const mdFile = files.find(f => f.endsWith('.md'));

    if (mdFile) {
      ensureDir(destPath);

      // Copy and transform the markdown file
      const content = fs.readFileSync(path.join(postPath, mdFile), 'utf-8');
      const transformed = transformFrontmatter(content, postDir.name);

      // Use index.md for Astro content collections
      fs.writeFileSync(path.join(destPath, 'index.md'), transformed);

      // Copy other files (images, etc.)
      for (const file of files) {
        if (file !== mdFile) {
          fs.copyFileSync(
            path.join(postPath, file),
            path.join(destPath, file)
          );
        }
      }

      count++;
    }
  }

  console.log(`  Migrated ${count} posts`);
}

// Migrate user data
function migrateUsers() {
  console.log('Migrating users...');

  const usersDir = path.join(JEKYLL_ROOT, '_data/users');
  const destDir = path.join(ASTRO_ROOT, 'src/content/users');

  ensureDir(destDir);

  if (!fs.existsSync(usersDir)) {
    console.log(`  No users directory found at ${usersDir}, skipping...`);
    return;
  }

  const userFiles = fs.readdirSync(usersDir)
    .filter(f => f.endsWith('.yaml') && f !== 'TEMPLATE.yaml');

  let count = 0;
  for (const file of userFiles) {
    fs.copyFileSync(
      path.join(usersDir, file),
      path.join(destDir, file)
    );
    count++;
  }

  console.log(`  Migrated ${count} users`);
}

// Migrate static assets
function migrateAssets() {
  console.log('Migrating static assets...');

  // Copy assets/img
  const imgSrc = path.join(JEKYLL_ROOT, 'assets/img');
  const imgDest = path.join(ASTRO_ROOT, 'public/assets/img');

  if (fs.existsSync(imgSrc)) {
    copyDir(imgSrc, imgDest);
    console.log('  Copied assets/img');
  } else {
    console.log(`  No assets/img directory found at ${imgSrc}`);
  }

  // Copy shared assets
  const sharedSrc = path.join(JEKYLL_ROOT, 'shared/assets');
  const sharedDest = path.join(ASTRO_ROOT, 'public/shared/assets');

  if (fs.existsSync(sharedSrc)) {
    copyDir(sharedSrc, sharedDest);
    console.log('  Copied shared/assets');
  } else {
    console.log(`  No shared/assets directory found at ${sharedSrc}`);
  }
}

// Migrate data files
function migrateData() {
  console.log('Migrating data files...');

  const dataDir = path.join(JEKYLL_ROOT, '_data');
  const destDir = path.join(ASTRO_ROOT, 'src/data');

  ensureDir(destDir);

  // Copy JSON files
  const jsonFiles = ['course.json', 'trainers.json'];
  for (const file of jsonFiles) {
    const srcPath = path.join(dataDir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(destDir, file));
      console.log(`  Copied ${file}`);
    }
  }

  // Copy events and trainers directories
  const subDirs = ['events', 'related_events', 'course_trainers'];
  for (const dir of subDirs) {
    const srcPath = path.join(dataDir, dir);
    if (fs.existsSync(srcPath)) {
      copyDir(srcPath, path.join(destDir, dir));
      console.log(`  Copied ${dir}/`);
    }
  }
}

// Main migration function
async function migrate() {
  console.log('Starting migration from Jekyll to Astro...\n');
  console.log(`Jekyll root: ${JEKYLL_ROOT}`);
  console.log(`Astro root: ${ASTRO_ROOT}\n`);

  // Check if Jekyll root exists
  if (!fs.existsSync(JEKYLL_ROOT)) {
    console.error(`Error: Jekyll project not found at ${JEKYLL_ROOT}`);
    console.error('Please update the JEKYLL_ROOT path in this script.');
    process.exit(1);
  }

  try {
    migratePosts();
    migrateUsers();
    migrateAssets();
    migrateData();

    console.log('\n✅ Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Review the migrated content in src/content/');
    console.log('2. Run `npm run dev` to test the site');
    console.log('3. Fix any remaining issues');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
