// External links filter - adds rel="noopener noreferrer" and target="_blank" to external links

const WHITELIST = [
  'angular.de',
  'vuejs.de',
  'reactjs.de',
  'workshops.de',
  'webdave.de',
  'ng-de.org',
  'conf.vuejs.de'
];

export function processExternalLinks(html: string): string {
  // Simple regex-based approach to find and modify external links
  return html.replace(
    /<a\s+([^>]*href=["']https?:\/\/[^"']+["'][^>]*)>/gi,
    (match, attributes) => {
      // Check if it's an internal link (whitelisted)
      const hrefMatch = attributes.match(/href=["']([^"']+)["']/);
      if (hrefMatch) {
        const href = hrefMatch[1];
        const isWhitelisted = WHITELIST.some(domain => href.includes(domain));

        // Skip if already has rel attribute
        if (attributes.includes('rel=')) {
          return match;
        }

        // Add target="_blank" if not present
        let newAttributes = attributes;
        if (!attributes.includes('target=')) {
          newAttributes += ' target="_blank"';
        }

        // Add rel attribute (skip nofollow for whitelisted domains)
        if (!isWhitelisted) {
          newAttributes += ' rel="noopener noreferrer"';
        }

        return `<a ${newAttributes}>`;
      }

      return match;
    }
  );
}

// Astro component helper
export function extlinks(content: string): string {
  return processExternalLinks(content);
}

