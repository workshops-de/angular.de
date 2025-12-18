#!/usr/bin/env node

/**
 * Fetches course data (including reviews) from workshops.de API
 * Equivalent to Jekyll plugin: fetch_course_reviews.rb
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

async function fetchCourse() {
  // Skip in local development if env var is set
  if (process.env.SKIP_API_FETCH === 'true') {
    console.log('⏭️  Skipping course fetch (SKIP_API_FETCH=true)');
    return;
  }

  console.log('📥 Fetching course...');

  try {
    const response = await fetch('https://workshops.de/api/course/4');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();

    // Write to data directory
    const filePath = path.join(DATA_DIR, 'course.json');
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`  ✓ course.json`);

  } catch (error) {
    console.error(`  ✗ course.json: ${error.message}`);
  }

  console.log('✅ Fetching course...done\n');
}

fetchCourse().catch(console.error);



