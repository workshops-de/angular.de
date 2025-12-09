#!/usr/bin/env node

/**
 * Script to fix the "/ loading" issue in img tags
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

function fixImgSlash() {
  const files = findMarkdownFiles(CONTENT_DIR);

  let totalFixed = 0;
  let filesModified = 0;

  for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Fix "/ loading" to "loading"
    content = content.replace(/\s*\/\s*loading="lazy">/g, ' loading="lazy">');

    // Also fix any remaining self-closing slash issues
    content = content.replace(/<img\s+([^>]*?)\s*\/\s*>/g, '<img $1>');

    // Write back if changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      const relativePath = path.relative(CONTENT_DIR, filePath);
      const matches = (originalContent.match(/\/\s*loading="lazy">/g) || []).length;
      totalFixed += matches;
      filesModified++;
      console.log(`✓ Fixed: ${relativePath} (${matches} images)`);
    }
  }

  console.log(`\n✅ Done! Fixed ${totalFixed} images in ${filesModified} files.`);
}

fixImgSlash();




