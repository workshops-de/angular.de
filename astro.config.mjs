import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

// Site URL - keep in sync with src/config/site.ts
const SITE_URL = "https://angular.de";

// Shiki transformer to add language label
const codeBlockEnhancer = {
  pre(node) {
    // Add data-lang attribute for language label (shown via CSS ::before)
    node.properties["data-lang"] = this.options.lang || "";
  },
};

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
      transformers: [codeBlockEnhancer],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  // Output static files for Firebase hosting
  output: "static",
  build: {
    format: "directory",
  },
  // Redirects
  redirects: {
    "/discord": "https://workshops.de/join-discord",
  },
});
