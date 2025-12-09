#!/usr/bin/env node

/**
 * Fetches trainer data from workshops.de API
 * Equivalent to Jekyll plugin: fetch_current_trainers.rb
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

const TRAINER_ENDPOINTS = [
  { url: 'https://workshops.de/api/portal/angular-de/trainers', file: 'trainers.json' },
  { url: 'https://workshops.de/api/course/4/trainers', file: 'course_trainers/angular-intensiv.json' },
  { url: 'https://workshops.de/api/course/23/trainers', file: 'course_trainers/angular-enterprise-applications.json' },
  { url: 'https://workshops.de/api/course/29/trainers', file: 'course_trainers/nestjs.json' },
  { url: 'https://workshops.de/api/course/28/trainers', file: 'course_trainers/rxjs.json' },
  { url: 'https://workshops.de/api/course/4/trainers', file: 'course_trainers/angular-remote.json' },
  { url: 'https://workshops.de/api/course/26/trainers', file: 'course_trainers/html-css.json' },
];

async function fetchTrainers() {
  // Skip in local development if env var is set
  if (process.env.SKIP_API_FETCH === 'true') {
    console.log('⏭️  Skipping trainer fetch (SKIP_API_FETCH=true)');
    return;
  }

  console.log('📥 Fetching trainers...');

  for (const endpoint of TRAINER_ENDPOINTS) {
    try {
      const response = await fetch(endpoint.url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      const filePath = path.join(DATA_DIR, endpoint.file);

      // Ensure directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`  ✓ ${endpoint.file}`);
    } catch (error) {
      console.error(`  ✗ ${endpoint.file}: ${error.message}`);
    }
  }

  console.log('✅ Fetching trainers...done\n');
}

fetchTrainers().catch(console.error);



