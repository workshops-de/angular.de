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
  title: 'Angular.DE',
  titleShort: 'Angular',
  titleSuffix: '.DE',
  description: 'Deine deutsche Community zum Angular Framework',
  topic: 'Angular',
  url: 'https://angular.de',
  language: 'de',

  // Branding colors (Tailwind classes)
  branding: {
    primaryColor: 'purple', // Used for gradients, buttons, etc.
    accentColor: 'pink',
    // Hero icon background gradient
    heroGradient: 'from-primary to-pink-500',
  },

  // Social media
  twitter_username: 'angular_de',
  github_username: 'workshops-de',
  linkedin_url: 'https://www.linkedin.com/company/workshops.de',
  discord_invite: 'https://discord.gg/angular-de',

  // Analytics & Tracking
  gtm_property: 'GTM-T5VPDDK',
  utm_source: 'angular_de',

  // URLs
  repository_url: 'https://github.com/workshops-de/angular.de',

  // Features
  og_generator_enabled: true,

  // Navigation
  navigation: {
    banner: {
      enabled: true,
      message: 'Wir bieten Schulungen an! Von Anfänger bis Experte - inklusive Agentic AI Coding!',
      href: 'https://workshops.de/schulungsthemen/angular?utm_source=angular_de&utm_campaign=generic_training&utm_medium=portal&utm_content=banner',
    },
    // Main navigation items
    items: [
      { href: '/artikel/', label: 'Artikel', pattern: '/artikel' },
      { href: '/artikel/angular-tutorial-deutsch/', label: 'Tutorial', pattern: '/artikel/angular-tutorial-deutsch/' },
      { href: '/schulungen/angular-intensiv/', label: 'Schulung', pattern: '/schulungen' },
      { href: 'https://ng-de.org?utm_source=angular_de&utm_campaign=conference2025&utm_medium=portal&utm_content=navigation', label: 'NG-DE Konferenz', pattern: '/ng-de-konferenz', external: true },
    ] as NavItem[],
  },

  // Footer
  footer: {
    copyright: 'Symetics GmbH',
    communities: [
      { name: 'ReactJS.DE', href: 'https://reactjs.de' },
      { name: 'VueJS.DE', href: 'https://vuejs.de' },
      { name: 'CloudNative.EU', href: 'https://cloudnative.eu' },
      { name: 'Workshops.DE', href: 'https://workshops.de' },
      { name: 'NG-DE Konferenz', href: 'https://ng-de.org' },
    ] as CommunityLink[],
  },

  // Training/Schulungen
  training: {
    mainCourse: 'angular-intensiv',
    provider: 'Workshops.DE',
    providerUrl: 'https://workshops.de',
    // All available courses
    courses: [
      {
        id: 'angular-typescript',
        title: 'Angular & TypeScript',
        subtitle: 'Grundlagen-Intensivkurs',
        description: 'Grundlagen-Intensivkurs für den Einstieg in Angular und TypeScript. Perfekt für Einsteiger:innen.',
        duration: '3 Tage',
        format: 'Vor Ort oder Remote',
        icon: '/assets/img/workshops/logo-angular-typescript-schulung.svg',
        url: '/seminare-schulungen-kurse/angular-typescript',
        level: 'beginner',
      },
      {
        id: 'angular-advanced',
        title: 'Angular Advanced',
        subtitle: 'Fortgeschrittene Konzepte',
        description: 'Fortgeschrittene Konzepte für erfahrene Entwickler:innen. RxJS, Testing, Performance und Architektur.',
        duration: '3 Tage',
        format: 'Vor Ort oder Remote',
        icon: '/assets/img/workshops/logo-angular-advanced.svg',
        url: '/seminare-schulungen-kurse/angular-advanced',
        level: 'advanced',
      },
      {
        id: 'modern-angular',
        title: 'Modern Angular - 2025 Edition',
        subtitle: 'Neueste Features',
        description: 'Für erfahrene Angular-Entwickler:innen. Lerne Signals, Control Flow, SSR und die neuesten Features.',
        duration: '2 Tage',
        format: 'Vor Ort oder Remote',
        icon: '/assets/img/workshops/logo-angular-enterprise-applications.svg',
        url: '/seminare-schulungen-kurse/modern-angular',
        level: 'advanced',
      },
      {
        id: 'angular-ai',
        title: 'Angular & AI Engineering',
        subtitle: 'KI-gestützte Entwicklung',
        description: 'Moderne Angular-Entwicklung mit KI-Tools. Lerne AI-unterstützte Entwicklung und Agentic Engineering.',
        duration: '2 Tage',
        format: 'Vor Ort oder Remote',
        icon: '/assets/img/workshops/angular-agentic-ai-engineering.svg',
        url: '/seminare-schulungen-kurse/angular-ai-engineering',
        level: 'advanced',
      },
    ],
  },

  // Conference (if applicable)
  conference: {
    name: 'NG-DE',
    url: 'https://ng-de.org',
    year: 2025,
  },
};

// Type for the site config
export type SiteConfig = typeof siteConfig;

// Helper to build UTM URLs
export function buildUtmUrl(
  baseUrl: string,
  campaign: string,
  medium: string = 'portal',
  content: string = ''
): string {
  const params = new URLSearchParams({
    utm_source: siteConfig.utm_source,
    utm_campaign: campaign,
    utm_medium: medium,
  });

  if (content) {
    params.set('utm_content', content);
  }

  return `${baseUrl}?${params.toString()}`;
}

// Helper to add UTM params to community links
export function getCommunityLinks() {
  return siteConfig.footer.communities.map(community => ({
    ...community,
    href: buildUtmUrl(community.href, 'crossmarketing_permanent', 'portal', 'footer_nav'),
  }));
}
