import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";
import { remarkWorkshopHint } from "./src/plugins/remark-workshop-hint.mjs";
import { parse } from "yaml";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

// Site URL - keep in sync with src/config/site.ts
const SITE_URL = "https://angular.de";

// Build list of valid team member permalinks (team members, trainers, or authors)
function getValidTeamPermalinks() {
  const usersDir = "./src/content/users";
  const postsDirs = ["./src/content/posts/de", "./src/content/posts/en"];

  // Read all users
  const userFiles = readdirSync(usersDir).filter((f) => f.endsWith(".yaml"));
  const users = userFiles.map((file) => {
    const content = readFileSync(join(usersDir, file), "utf-8");
    return parse(content);
  });

  // Get all authors from posts (both German and English)
  const authors = new Set();
  for (const postsDir of postsDirs) {
    try {
      const postFolders = readdirSync(postsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
      for (const folder of postFolders) {
        const indexPath = join(postsDir, folder, "index.md");
        try {
          const content = readFileSync(indexPath, "utf-8");
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = parse(frontmatterMatch[1]);
            if (frontmatter.author) authors.add(frontmatter.author);
            if (frontmatter.co_author) authors.add(frontmatter.co_author);
          }
        } catch {}
      }
    } catch {}
  }

  // Filter users: must be team member, trainer, or author
  const validUsers = users.filter(
    (user) =>
      // user.team === true || user.trainer === true || authors.has(user.name)
      user.team === true || authors.has(user.name)
  );

  // Return permalinks
  return validUsers.map(
    (user) => user.permalink || user.name.toLowerCase().replace(/\s+/g, "-")
  );
}

const validTeamPermalinks = getValidTeamPermalinks();

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
  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude category pages (noindex)
        if (page.includes("/kategorie/")) return false;
        // Exclude pagination pages (page 1 duplicates main page)
        if (page.includes("/seite/")) return false;
        // Exclude team member pages if not team, trainer, or author
        const teamMatch = page.match(/\/team\/([^/]+)\/?$/);
        if (teamMatch) {
          const permalink = teamMatch[1];
          return validTeamPermalinks.includes(permalink);
        }
        return true;
      },
    }),
    pagefind(),
  ],
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkWorkshopHint],
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
    "/discord/": "https://workshops.de/join-discord",
    "/sitemap.xml": "/sitemap-index.xml",
  },
});
