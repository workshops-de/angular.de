#!/usr/bin/env node

/**
 * Downloads gravatar images for all users
 * Equivalent to Ruby script: gravatar_download.rb
 */

import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const USERS_DIR = path.join(process.cwd(), 'src/data/users');
const GRAVATARS_DIR = path.join(process.cwd(), 'public/assets/img/gravatars');

async function downloadGravatar(gravatarUid, size, forceDownload = false) {
  const url = `https://www.gravatar.com/avatar/${gravatarUid}?s=${size}&d=mp`;
  const filePath = path.join(GRAVATARS_DIR, `${gravatarUid}-${size}x${size}.jpg`);

  // Skip if file already exists (unless force download)
  if (!forceDownload && fs.existsSync(filePath)) {
    return { status: 'skipped', size };
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Ensure directory exists
    fs.mkdirSync(GRAVATARS_DIR, { recursive: true });

    // Write file
    const fileStream = fs.createWriteStream(filePath);
    await pipeline(Readable.fromWeb(response.body), fileStream);

    return { status: 'downloaded', size };
  } catch (error) {
    return { status: 'error', size, error: error.message };
  }
}

async function fetchGravatars() {
  // Skip in local development if env var is set
  if (process.env.SKIP_API_FETCH === 'true') {
    console.log('⏭️  Skipping gravatar fetch (SKIP_API_FETCH=true)');
    return;
  }

  // Force download when running directly (npm run fetch:gravatars)
  // Skip existing files when running as part of prebuild
  const forceDownload = process.env.PREBUILD !== 'true';

  console.log(`📥 Downloading gravatars...${forceDownload ? ' (force refresh)' : ''}`);

  // Check if users directory exists
  if (!fs.existsSync(USERS_DIR)) {
    console.log('  ⚠️  No users directory found at', USERS_DIR);
    console.log('✅ Downloading gravatars...done\n');
    return;
  }

  const userFiles = fs.readdirSync(USERS_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

  let downloaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of userFiles) {
    const filePath = path.join(USERS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Simple YAML parsing for gravatar_uid
    const gravatarMatch = content.match(/gravatar_uid:\s*["']?([a-f0-9]+)["']?/i);
    const isTeam = content.includes('team: true') || content.includes('team:true');
    const isTrainer = content.includes('trainer: true') || content.includes('trainer:true');

    if (gravatarMatch) {
      const gravatarUid = gravatarMatch[1];
      const sizes = [64, 160];

      // Team members and trainers get larger images
      if (isTeam || isTrainer) {
        sizes.push(300);
      }

      for (const size of sizes) {
        const result = await downloadGravatar(gravatarUid, size, forceDownload);
        if (result.status === 'downloaded') {
          downloaded++;
          console.log(`  ✓ ${gravatarUid}-${size}x${size}.jpg`);
        } else if (result.status === 'skipped') {
          skipped++;
        } else {
          errors++;
          console.error(`  ✗ ${gravatarUid}-${size}x${size}.jpg: ${result.error}`);
        }
      }
    }
  }

  console.log(`✅ Downloading gravatars...done (${downloaded} downloaded, ${skipped} skipped, ${errors} errors)\n`);
}

fetchGravatars().catch(console.error);

