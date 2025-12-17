import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Site URL - keep in sync with src/config/site.ts
const SITE_URL = 'https://angular.de';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  // Output static files for Firebase hosting
  output: 'static',
  build: {
    format: 'directory'
  },
  // Redirects
  redirects: {
    '/discord': 'https://workshops.de/join-discord',
  }
});
