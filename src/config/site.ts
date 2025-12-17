/**
 * Site configuration - equivalent to Jekyll's _config.yml
 *
 * This config makes the project reusable as a template for:
 * - Angular.DE
 * - ReactJS.DE
 * - VueJS.DE
 */

// Navigation item type
interface NavItem {
  href: string;
  label: string;
  pattern: string;
  external?: boolean;
}

// Community link type
interface CommunityLink {
  name: string;
  href: string;
}

export const siteConfig = {
  // Basic site info
  title: "Angular.DE",
  titleShort: "Angular",
  titleSuffix: ".DE",
  description: "Deine deutsche Community zum Angular Framework",
  topic: "Angular",
  url: "https://angular.de",
  language: "de",

  // Branding colors
  //
  // Full color scales are defined in src/styles/global.css @theme
  // Usage examples:
  //   text-primary, text-primary-500, text-primary-600
  //   bg-primary-100, bg-primary/10
  //   border-accent-200, text-accent-700
  //
  branding: {
    // Primary color
    primary: "#8514f5",
    primaryDark: "#6b21a8",
    primaryLight: "#a855f7",

    // Primary color scale (for reference, defined in global.css)
    primaryScale: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#8514f5", // Base Angular purple
      700: "#7c3aed",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764",
    },

    // Accent color (Pink - matching angular.dev)
    accent: "#ec4899",

    // Accent color scale (for reference, defined in global.css)
    accentScale: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899", // Base pink
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843",
      950: "#500724",
    },

    // RGB values for gradients
    primaryRgb: "133, 20, 245", // #8514f5
    primaryDarkRgb: "107, 33, 168", // #6b21a8
    accentRgb: "236, 72, 153", // #ec4899

    // Hero gradients (light mode)
    heroGradientLight:
      "radial-gradient(at 20% 30%, rgba(133, 20, 245, 0.08) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(236, 72, 153, 0.1) 0px, transparent 50%), radial-gradient(at 40% 80%, rgba(133, 20, 245, 0.06) 0px, transparent 50%), radial-gradient(at 90% 70%, rgba(236, 72, 153, 0.05) 0px, transparent 50%), linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",

    // Hero gradients (dark mode)
    heroGradientDark:
      "radial-gradient(at 20% 30%, rgba(133, 20, 245, 0.15) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(236, 72, 153, 0.12) 0px, transparent 50%), radial-gradient(at 40% 80%, rgba(133, 20, 245, 0.1) 0px, transparent 50%)",
  },

  // Social media
  twitter_username: "angular_de",
  github_username: "workshops-de",
  linkedin_url: "https://www.linkedin.com/company/workshops.de",
  discord_invite: "https://workshops.de/join-discord",

  // Analytics & Tracking
  gtm_property: "GTM-T5VPDDK",
  utm_source: "angular_de",

  // URLs
  repository_url: "https://github.com/workshops-de/angular.de",

  // Features
  og_generator_enabled: true,

  // Navigation
  navigation: {
    banner: {
      enabled: true,
      message:
        "Wir bieten Schulungen an! Von Anfänger bis Experte - inklusive Agentic AI Coding!",
      href: "https://workshops.de/schulungsthemen/angular?utm_source=angular_de&utm_campaign=generic_training&utm_medium=portal&utm_content=banner",
    },
    // Main navigation items
    items: [
      { href: "/artikel/", label: "Artikel", pattern: "/artikel" },
      {
        href: "/artikel/angular-tutorial-deutsch/",
        label: "Tutorial",
        pattern: "/artikel/angular-tutorial-deutsch/",
      },
      {
        href: "/schulungen/angular-intensiv/",
        label: "Schulung",
        pattern: "/schulungen",
      },
      {
        href: "https://ng-de.org?utm_source=angular_de&utm_campaign=conference2025&utm_medium=portal&utm_content=navigation",
        label: "NG-DE Konferenz",
        pattern: "/ng-de-konferenz",
        external: true,
      },
    ] as NavItem[],
  },

  // Footer
  footer: {
    copyright: "Symetics GmbH",
    communities: [
      { name: "ReactJS.DE", href: "https://reactjs.de" },
      { name: "VueJS.DE", href: "https://vuejs.de" },
      { name: "CloudNative.EU", href: "https://cloudnative.eu" },
      { name: "Workshops.DE", href: "https://workshops.de" },
      { name: "NG-DE Konferenz", href: "https://ng-de.org" },
    ] as CommunityLink[],
  },

  // Training/Schulungen
  training: {
    mainCourse: "angular-intensiv",
    provider: "Workshops.DE",
    providerUrl: "https://workshops.de",
    // All available courses
    courses: [
      {
        id: "angular-typescript",
        title: "Angular & TypeScript",
        subtitle: "Grundlagen-Intensivkurs",
        description:
          "Grundlagen-Intensivkurs für den Einstieg in Angular und TypeScript. Perfekt für Einsteiger:innen.",
        duration: "3 Tage",
        format: "Vor Ort oder Remote",
        icon: "/assets/img/workshops/logo-angular-typescript-schulung.svg",
        url: "/seminare-schulungen-kurse/angular-typescript",
        level: "beginner",
      },
      {
        id: "angular-advanced",
        title: "Angular Advanced",
        subtitle: "Fortgeschrittene Konzepte",
        description:
          "Fortgeschrittene Konzepte für erfahrene Entwickler:innen. RxJS, Testing, Performance und Architektur.",
        duration: "3 Tage",
        format: "Vor Ort oder Remote",
        icon: "/assets/img/workshops/logo-angular-advanced.svg",
        url: "/seminare-schulungen-kurse/angular-advanced",
        level: "advanced",
      },
      {
        id: "modern-angular",
        title: "Modern Angular - 2025 Edition",
        subtitle: "Neueste Features",
        description:
          "Für erfahrene Angular-Entwickler:innen. Lerne Signals, Control Flow, SSR und die neuesten Features.",
        duration: "2 Tage",
        format: "Vor Ort oder Remote",
        icon: "/assets/img/workshops/logo-angular-enterprise-applications.svg",
        url: "/seminare-schulungen-kurse/modern-angular",
        level: "advanced",
      },
      {
        id: "angular-ai",
        title: "Angular & AI Engineering",
        subtitle: "KI-gestützte Entwicklung",
        description:
          "Moderne Angular-Entwicklung mit KI-Tools. Lerne AI-unterstützte Entwicklung und Agentic Engineering.",
        duration: "2 Tage",
        format: "Vor Ort oder Remote",
        icon: "/assets/img/workshops/angular-agentic-ai-engineering.svg",
        url: "/seminare-schulungen-kurse/angular-ai-engineering",
        level: "advanced",
      },
    ],
  },

  // Conference (if applicable)
  conference: {
    name: "NG-DE",
    url: "https://ng-de.org",
    year: 2025,
  },
};

// Type for the site config
export type SiteConfig = typeof siteConfig;

// Helper to build UTM URLs
export function buildUtmUrl(
  baseUrl: string,
  campaign: string,
  medium: string = "portal",
  content: string = ""
): string {
  const params = new URLSearchParams({
    utm_source: siteConfig.utm_source,
    utm_campaign: campaign,
    utm_medium: medium,
  });

  if (content) {
    params.set("utm_content", content);
  }

  return `${baseUrl}?${params.toString()}`;
}

// Helper to add UTM params to community links
export function getCommunityLinks() {
  return siteConfig.footer.communities.map((community) => ({
    ...community,
    href: buildUtmUrl(
      community.href,
      "crossmarketing_permanent",
      "portal",
      "footer_nav"
    ),
  }));
}
