/**
 * i18n Utility Functions for angular.de
 */

import { ui, defaultLang, showDefaultLang, routes, type Lang } from "./ui";

/**
 * Get the language from a URL
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/**
 * Get translations for a specific language
 */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Get a translated path for a specific language
 */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: Lang = lang): string {
    // Remove leading slash and split
    const pathParts = path.replace(/^\//, "").split("/");

    // Translate each part if translation exists
    const translatedParts = pathParts.map((part) => {
      if (l !== defaultLang && routes[l] && part in routes[l]) {
        return routes[l][part as keyof (typeof routes)[typeof l]];
      }
      return part;
    });

    const translatedPath = "/" + translatedParts.join("/");

    // Add language prefix if needed
    if (!showDefaultLang && l === defaultLang) {
      return translatedPath;
    }
    return `/${l}${translatedPath}`;
  };
}

/**
 * Get the route key from a translated URL
 */
export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = url.pathname;
  const parts = pathname.split("/").filter(Boolean);

  // Remove language prefix if present
  const lang = getLangFromUrl(url);
  if (lang !== defaultLang && parts[0] === lang) {
    parts.shift();
  }

  const path = parts[0];
  if (!path) return undefined;

  // If we're on a non-default language, reverse lookup the route
  if (lang !== defaultLang && routes[lang]) {
    const routeEntries = Object.entries(routes[lang]);
    const found = routeEntries.find(([, translated]) => translated === path);
    if (found) return found[0];
  }

  return path;
}

/**
 * Get alternate language URLs for the current page (for hreflang tags)
 */
export function getAlternateUrls(
  url: URL,
  siteUrl: string,
  currentSlug?: string,
  translationSlug?: string
): { lang: Lang; url: string }[] {
  const currentLang = getLangFromUrl(url);
  const route = getRouteFromUrl(url);
  const restOfPath = url.pathname
    .split("/")
    .filter(Boolean)
    .slice(currentLang !== defaultLang ? 2 : 1)
    .join("/");

  return (Object.keys(ui) as Lang[]).map((lang) => {
    // If we have slugs and we're on an article page, use them
    if (currentSlug && translationSlug && route === "artikel") {
      if (lang === "de") {
        // Use currentSlug if we're on a German page, translationSlug if we're on English
        const slug = currentLang === "de" ? currentSlug : translationSlug;
        return {
          lang,
          url: `${siteUrl}/artikel/${slug}/`,
        };
      } else {
        // Use currentSlug if we're on an English page, translationSlug if we're on German
        const slug = currentLang === "en" ? currentSlug : translationSlug;
        return {
          lang,
          url: `${siteUrl}/en/articles/${slug}/`,
        };
      }
    }

    // Default behavior for non-article pages or articles without translations
    const translatePath = useTranslatedPath(lang);
    const basePath = route ? translatePath(`/${route}/`) : translatePath("/");
    const fullPath = restOfPath ? `${basePath}${restOfPath}` : basePath;
    return {
      lang,
      url: `${siteUrl}${fullPath}`.replace(/\/$/, "") + "/",
    };
  });
}

/**
 * Check if we're on a specific language
 */
export function isLang(url: URL, lang: Lang): boolean {
  return getLangFromUrl(url) === lang;
}

