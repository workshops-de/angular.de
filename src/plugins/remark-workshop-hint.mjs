// src/plugins/remark-workshop-hint.mjs
import { visit } from "unist-util-visit";

// Inline CTA definitions
const ctas = {
  "training-top": {
    title: {
      de: "Keine Lust zu lesen?",
      en: "Don't feel like reading?",
    },
    description: {
      de: 'Nicht jeder lernt am besten aus Büchern und Artikeln. Lernen darf interaktiv sein und Spaß machen. Wir bieten dir auch Angular Intensiv-Schulungen an, um dich möglichst effektiv in das Thema Angular zu begleiten. Im Kurs kannst du die Fragen stellen, die du nur schlecht googeln kannst, z.B. "Besserer Weg, um meine Applikation zu strukturieren?". Wir können sie dir beantworten.',
      en: 'Not everyone learns best from books and articles. Learning can be interactive and fun. We also offer Angular Intensive Training to guide you as effectively as possible into the topic of Angular. In the course, you can ask the questions that are hard to google, e.g., "Better way to structure my application?". We can answer them for you.',
    },
    features: {
      de: [
        "Öffentliche Termine verfügbar",
        "Vor Ort, als auch Remote",
        "Deutsch/Englisch möglich",
      ],
      en: [
        "Public dates available",
        "On-site or remote",
        "German/English possible",
      ],
    },
    buttonText: {
      de: "Mehr Informationen zur Angular-Schulung",
      en: "More information about Angular Training",
    },
    buttonUrl:
      "https://workshops.de/seminare-schulungen-kurse/angular-modul-1?utm_source=angular_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-top",
    image: "/assets/img/schulungen/shared/attendees.jpg",
    imageAlt: {
      de: "Teilnehmer:innen in der Veranstaltung Angular-Intensiv-Workshop",
      en: "Participants in the Angular Intensive Workshop event",
    },
  },
  "training-bottom": {
    title: {
      de: "Hat dir das Tutorial geholfen?",
      en: "Did this tutorial help you?",
    },
    description: {
      de: 'Wir bieten auch Angular-Intensiv-Schulungen an, um dich möglichst effektiv in das Thema Angular zu begleiten. Im Kurs kannst du die Fragen stellen, die du nur schlecht googeln kannst, z.B. "Besserer Weg, um meine Applikation zu strukturieren?". Wir können sie dir beantworten.',
      en: 'We also offer Angular Intensive Training to guide you as effectively as possible into the topic of Angular. In the course, you can ask the questions that are hard to google, e.g., "Better way to structure my application?". We can answer them for you.',
    },
    features: {
      de: [
        "Öffentliche Termine verfügbar",
        "Vor Ort, als auch Remote",
        "Deutsch/Englisch möglich",
      ],
      en: [
        "Public dates available",
        "On-site or remote",
        "German/English possible",
      ],
    },
    buttonText: {
      de: "Jetzt weiter lernen",
      en: "Continue learning now",
    },
    buttonUrl:
      "https://workshops.de/seminare-schulungen-kurse/angular-modul-1?utm_source=angular_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-bottom",
    image: "/assets/img/schulungen/shared/attendees.jpg",
    imageAlt: {
      de: "Teilnehmer:innen der Veranstaltung Angular-Intensiv-Workshop",
      en: "Participants of the Angular Intensive Workshop event",
    },
  },
};

/**
 * Remark plugin to transform [[cta:id]] shortcodes into styled CTAs
 */
export function remarkWorkshopHint() {
  return (tree, file) => {
    // Determine language from file path once
    let lang = "de";
    if (file?.history && file.history.length > 0) {
      const filePath = file.history[0];
      lang = filePath.includes("/en/") ? "en" : "de";
    }

    visit(tree, "paragraph", (node) => {
      // Look for text nodes containing CTA shortcode
      if (
        node.children &&
        node.children.length === 1 &&
        node.children[0].type === "text"
      ) {
        const text = node.children[0].value;
        const match = text.match(/^\[\[cta:([a-z-]+)\]\]$/);

        if (match) {
          const ctaId = match[1];
          const cta = ctas[ctaId];

          if (!cta) {
            console.warn(`CTA with ID "${ctaId}" not found.`);
            return;
          }

          const featuresHtml =
            cta.features && cta.features[lang]
              ? `<ul class="text-gray-700 dark:text-gray-300 mb-4 space-y-1 list-none pl-0">${cta.features[lang].map((f) => `<li class="flex items-center gap-2"><span>✔</span> ${f}</li>`).join("")}</ul>`
              : "";

          const html = `<div class="workshop-hint my-8 p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border-2 border-primary-200 dark:border-primary-800 shadow-sm">
  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-0 mt-0">💡 ${cta.title[lang]}</h3>
  <div class="flex flex-col gap-6${cta.image ? " md:flex-row md:items-center" : ""}">
    <div class="flex-1">
      <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">${cta.description[lang]}</p>
      ${featuresHtml}
      <a href="${cta.buttonUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-primary !text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md">
        ${cta.buttonText[lang]}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </div>
    ${cta.image ? `<div class="flex-shrink-0 md:w-1/3"><img src="${cta.image}" alt="${cta.imageAlt[lang]}" class="rounded-lg shadow-md w-full" loading="lazy" /></div>` : ""}
  </div>
</div>`;

          // Replace the paragraph node with HTML
          node.type = "html";
          node.value = html;
          delete node.children;
        }
      }
    });
  };
}
