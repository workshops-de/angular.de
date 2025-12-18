# Angular.DE - Astro Migration

This is the Astro-based version of Angular.DE, migrated from Jekyll.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Migrate content from Jekyll (run once)
npm run migrate

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── public/              # Static assets
│   ├── assets/          # Images, fonts, etc.
│   └── shared/          # Shared assets
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Content collections
│   │   ├── posts/       # Blog posts (markdown)
│   │   ├── books/       # Book chapters
│   │   └── users/       # Author profiles (YAML)
│   ├── data/            # JSON data files
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   ├── styles/          # Global styles (SCSS)
│   └── utils/           # Utility functions
├── scripts/             # Build scripts
├── astro.config.mjs     # Astro configuration
├── firebase.json        # Firebase hosting config
└── package.json
```

## 🔄 Migration from Jekyll

The migration script (`npm run migrate`) handles:

1. **Blog Posts**: Copies from `_posts/` to `src/content/posts/`
2. **User Data**: Copies from `_data/users/` to `src/content/users/`
3. **Static Assets**: Copies from `assets/` and `shared/` to `public/`
4. **Data Files**: Copies JSON data to `src/data/`

### Manual Steps After Migration

1. Review frontmatter in migrated posts
2. Update any Jekyll-specific syntax (Liquid → Astro)
3. Check image paths and references
4. Test all pages and features

## ✨ Features

- **Content Collections**: Type-safe content with Zod schemas
- **SCSS + Bootstrap**: Familiar styling with Bootstrap 5
- **SEO Optimized**: Meta tags, sitemap, RSS feed
- **Fast Builds**: Static site generation with Astro
- **API Integration**: Build-time data fetching from workshops.de API

## 🛠️ Key Differences from Jekyll

| Feature | Jekyll | Astro |
|---------|--------|-------|
| Templating | Liquid | Astro/JSX |
| Content | Markdown + YAML | Content Collections |
| Plugins | Ruby gems | npm packages |
| Data | `_data/*.json` | `src/data/` + imports |
| Build | `bundle exec jekyll build` | `npm run build` |

## 📝 Content Management

### Adding a New Post

Create a new directory in `src/content/posts/`:

```
src/content/posts/2024-01-15-my-new-post/
├── index.md
└── header.jpg
```

Frontmatter example:

```yaml
---
title: "My New Post"
description: "A brief description"
author: "Robin Böhm"
published_at: 2024-01-15T10:00:00.000Z
categories: "angular tutorial"
header_image: "header.jpg"
---
```

### Adding a New Author

Create a YAML file in `src/content/users/`:

```yaml
# src/content/users/New Author.yaml
permalink: newauthor
name: New Author
gravatar_uid: abc123
github: newauthor
twitter: newauthor
city: Berlin
team: false
bio: >
  Author bio here.
```

## 🚢 Deployment

### Firebase Hosting

```bash
# Build the site
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Environment Variables

For local development without API calls:

```bash
JEKYLL_ENV=local npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
