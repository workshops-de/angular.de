#!/usr/bin/env node

/**
 * Script to convert old lazy-loading image patterns to native lazy loading.
 *
 * Converts:
 * <img src="/shared/assets/img/placeholder-image.svg" class="lazy img-fluid" data-src="image.webp" data-srcset="image.webp">
 *
 * To:
 * <img src="image.webp" srcset="image.webp" class="img-fluid" loading="lazy">
 */

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

function findMarkdownFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function fixLazyImages() {
  const files = findMarkdownFiles(CONTENT_DIR);

  let totalFixed = 0;
  let filesModified = 0;

  for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Pattern to match lazy-loaded images
    const imgRegex = /<img\s+([^>]*?)>/gi;

    content = content.replace(imgRegex, (match, attributes) => {
      // Check if this is a lazy-loaded image
      if (!attributes.includes('data-src=')) {
        return match; // Not a lazy image, skip
      }

      let newAttributes = attributes;

      // Extract data-src value and use it as src
      const dataSrcMatch = attributes.match(/data-src="([^"]+)"/);
      if (dataSrcMatch) {
        const realSrc = dataSrcMatch[1];

        // Replace placeholder src with real src, or any existing src
        if (newAttributes.includes('src="')) {
          newAttributes = newAttributes.replace(/src="[^"]*"/, `src="${realSrc}"`);
        } else {
          // Add src if not present
          newAttributes = `src="${realSrc}" ` + newAttributes;
        }

        // Remove data-src
        newAttributes = newAttributes.replace(/\s*data-src="[^"]*"/, '');
      }

      // Extract data-srcset and convert to srcset
      const dataSrcsetMatch = attributes.match(/data-srcset="([^"]+)"/);
      if (dataSrcsetMatch) {
        const srcsetValue = dataSrcsetMatch[1];
        // Add srcset if not already present
        if (!newAttributes.includes('srcset=')) {
          // Insert srcset after src
          newAttributes = newAttributes.replace(/(src="[^"]+")/, `$1 srcset="${srcsetValue}"`);
        }
        // Remove data-srcset
        newAttributes = newAttributes.replace(/\s*data-srcset="[^"]*"/, '');
      }

      // Remove 'lazy' from class attribute
      newAttributes = newAttributes.replace(/class="([^"]*)"/g, (m, classValue) => {
        const newClass = classValue
          .split(/\s+/)
          .filter(c => c !== 'lazy')
          .join(' ')
          .trim();
        return newClass ? `class="${newClass}"` : '';
      });

      // Clean up empty class attributes
      newAttributes = newAttributes.replace(/\s*class=""\s*/g, ' ');

      // Add loading="lazy" if not present
      if (!newAttributes.includes('loading=')) {
        newAttributes = newAttributes.trim() + ' loading="lazy"';
      }

      // Clean up extra spaces
      newAttributes = newAttributes.replace(/\s+/g, ' ').trim();

      totalFixed++;
      return `<img ${newAttributes}>`;
    });

    // Write back if changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      const relativePath = path.relative(CONTENT_DIR, filePath);
      filesModified++;
      console.log(`✓ Fixed: ${relativePath}`);
    }
  }

  console.log(`\n✅ Done! Fixed ${totalFixed} images in ${filesModified} files.`);
}

fixLazyImages();
