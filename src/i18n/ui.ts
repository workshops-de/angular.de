/**
 * UI translations and route mappings for angular.de
 */

// Available languages
export const languages = {
  de: "Deutsch",
  en: "English",
};

export const defaultLang = "de" as const;
export const showDefaultLang = false; // Don't show /de/ in URLs

export type Lang = keyof typeof languages;

// UI string translations
export const ui = {
  de: {
    // Navigation
    "nav.articles": "Artikel",
    "nav.tutorial": "Tutorial",
    "nav.training": "Schulung",
    "nav.conference": "NG-DE Konferenz",
    "nav.meetups": "Meetups",
    "nav.team": "Team",
    "nav.search": "Suche",

    // Footer
    "footer.navigation": "Navigation",
    "footer.tutorials": "Tutorials",
    "footer.meetups": "Meetups",
    "footer.team": "Team",
    "footer.communities": "Communities",
    "footer.followUs": "Folge uns",
    "footer.poweredBy": "Powered by",
    "footer.imprint": "Impressum",
    "footer.privacy": "Datenschutz",

    // Newsletter
    "newsletter.title": "Newsletter",
    "newsletter.description":
      "Bleibe auf dem Laufenden mit den neuesten Angular News, Tutorials und Schulungsangeboten.",
    "newsletter.subscribe": "Newsletter abonnieren",

    // 404 Page
    "404.title": "Seite nicht gefunden",
    "404.description":
      "Die gesuchte Seite existiert leider nicht oder wurde verschoben.",
    "404.backToHome": "Zur Startseite",
    "404.browseArticles": "Zu den Artikeln",

    // Search
    "search.title": "Suche",
    "search.placeholder": "Artikel durchsuchen...",
    "search.noResults": "Keine Ergebnisse gefunden",

    // Articles
    "articles.title": "Angular Artikel",
    "articles.latest": "Neueste Artikel",
    "articles.readMore": "Artikel lesen",
    "articles.minutesRead": "min Lesezeit",

    // Training
    "training.title": "Angular Schulungen",
    "training.description":
      "Intensive Schulungen für Angular-Entwickler:innen. Von Grundlagen bis zu fortgeschrittenen Themen.",
    "training.bookNow": "Jetzt buchen",
    "training.learnMore": "Mehr erfahren",
    "training.duration": "Dauer",
    "training.format": "Format",
    "training.level": "Level",
    "training.beginner": "Anfänger",
    "training.intermediate": "Fortgeschritten",
    "training.advanced": "Experte",

    // Common
    "common.poweredBy": "Powered by",
    "common.readMore": "Weiterlesen",
    "common.learnMore": "Mehr erfahren",
  },
  en: {
    // Navigation
    "nav.articles": "Articles",
    "nav.tutorial": "Tutorial",
    "nav.training": "Training",
    "nav.conference": "NG-DE Conference",
    "nav.meetups": "Meetups",
    "nav.team": "Team",
    "nav.search": "Search",

    // Footer
    "footer.navigation": "Navigation",
    "footer.tutorials": "Tutorials",
    "footer.meetups": "Meetups",
    "footer.team": "Team",
    "footer.communities": "Communities",
    "footer.followUs": "Follow us",
    "footer.poweredBy": "Powered by",
    "footer.imprint": "Imprint",
    "footer.privacy": "Privacy Policy",

    // Newsletter
    "newsletter.title": "Newsletter",
    "newsletter.description":
      "Stay up to date with the latest Angular news, tutorials and training offers.",
    "newsletter.subscribe": "Subscribe to Newsletter",

    // 404 Page
    "404.title": "Page not found",
    "404.description":
      "The page you're looking for doesn't exist or has been moved.",
    "404.backToHome": "Back to Home",
    "404.browseArticles": "Browse Articles",

    // Search
    "search.title": "Search",
    "search.placeholder": "Search articles...",
    "search.noResults": "No results found",

    // Articles
    "articles.title": "Angular Articles",
    "articles.latest": "Latest Articles",
    "articles.readMore": "Read Article",
    "articles.minutesRead": "min read",

    // Training
    "training.title": "Angular Training",
    "training.description":
      "Intensive training for Angular developers. From basics to advanced topics.",
    "training.bookNow": "Book Now",
    "training.learnMore": "Learn More",
    "training.duration": "Duration",
    "training.format": "Format",
    "training.level": "Level",
    "training.beginner": "Beginner",
    "training.intermediate": "Intermediate",
    "training.advanced": "Advanced",

    // Common
    "common.poweredBy": "Powered by",
    "common.readMore": "Read More",
    "common.learnMore": "Learn More",
  },
} as const;

// Route translations (for translating URL paths)
export const routes = {
  en: {
    artikel: "articles",
    schulungen: "training",
    suche: "search",
    meetups: "meetups",
    team: "team",
    tutorials: "tutorials",
    impressum: "imprint",
    datenschutz: "privacy",
  },
} as const;

