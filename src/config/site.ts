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

  // Branding - colors defined in src/styles/global.css @theme
  // Usage: text-primary, bg-primary-500, border-accent-200, etc.
  branding: {
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
      {
        name: "AI-Automation-Engineers.de",
        href: "https://ai-automation-engineers.de",
      },
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
        title: {
          de: "Angular & TypeScript",
          en: "Angular & TypeScript",
        },
        subtitle: {
          de: "Grundlagen-Intensivkurs",
          en: "Fundamentals Intensive Course",
        },
        description: {
          de: "Grundlagen-Intensivkurs für den Einstieg in Angular und TypeScript. Perfekt für Einsteiger:innen.",
          en: "Fundamentals intensive course for getting started with Angular and TypeScript. Perfect for beginners.",
        },
        duration: {
          de: "3 Tage",
          en: "3 Days",
        },
        format: {
          de: "Vor Ort oder Remote",
          en: "On-Site or Remote",
        },
        icon: "/assets/img/workshops/logo-angular-typescript-schulung.svg",
        url: "/seminare-schulungen-kurse/angular-typescript",
        level: "beginner",
      },
      {
        id: "angular-advanced",
        title: {
          de: "Angular Advanced",
          en: "Angular Advanced",
        },
        subtitle: {
          de: "Fortgeschrittene Konzepte",
          en: "Advanced Concepts",
        },
        description: {
          de: "Fortgeschrittene Konzepte für erfahrene Entwickler:innen. RxJS, Testing, Performance und Architektur.",
          en: "Advanced concepts for experienced developers. RxJS, Testing, Performance and Architecture.",
        },
        duration: {
          de: "3 Tage",
          en: "3 Days",
        },
        format: {
          de: "Vor Ort oder Remote",
          en: "On-Site or Remote",
        },
        icon: "/assets/img/workshops/logo-angular-advanced.svg",
        url: "/seminare-schulungen-kurse/angular-advanced",
        level: "advanced",
      },
      {
        id: "modern-angular",
        title: {
          de: "Modern Angular - 2025 Edition",
          en: "Modern Angular - 2025 Edition",
        },
        subtitle: {
          de: "Neueste Features",
          en: "Latest Features",
        },
        description: {
          de: "Für erfahrene Angular-Entwickler:innen. Lerne Signals, Control Flow, SSR und die neuesten Features.",
          en: "For experienced Angular developers. Learn Signals, Control Flow, SSR and the latest features.",
        },
        duration: {
          de: "2 Tage",
          en: "2 Days",
        },
        format: {
          de: "Vor Ort oder Remote",
          en: "On-Site or Remote",
        },
        icon: "/assets/img/workshops/logo-angular-enterprise-applications.svg",
        url: "/seminare-schulungen-kurse/modern-angular",
        level: "advanced",
      },
      {
        id: "angular-ai",
        title: {
          de: "Angular & AI Engineering",
          en: "Angular & AI Engineering",
        },
        subtitle: {
          de: "KI-gestützte Entwicklung",
          en: "AI-Powered Development",
        },
        description: {
          de: "Moderne Angular-Entwicklung mit KI-Tools. Lerne AI-unterstützte Entwicklung und Agentic Engineering.",
          en: "Modern Angular development with AI tools. Learn AI-assisted development and Agentic Engineering.",
        },
        duration: {
          de: "2 Tage",
          en: "2 Days",
        },
        format: {
          de: "Vor Ort oder Remote",
          en: "On-Site or Remote",
        },
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

// Helper to get localized courses
export type Lang = "de" | "en";

export function getLocalizedCourses(lang: Lang = "de") {
  return siteConfig.training.courses.map((course) => ({
    ...course,
    title: course.title[lang],
    subtitle: course.subtitle[lang],
    description: course.description[lang],
    duration: course.duration[lang],
    format: course.format[lang],
  }));
}
