---
title: "Angular-Entwicklung mit Cursor: Wie AI-Agents die NG-DE Webseite in Rekordzeit gebaut haben"
description: "Mit Cursor und AI-Agents haben wir die neue NG-DE Webseite in einem Bruchteil der üblichen Zeit entwickelt."
author: "Robin Böhm"
published_at: 2026-02-24 10:00:00.000000Z
header_image: header.jpg
categories: "angular typescript ai-development cursor agents"
---

**TL;DR:** Mit Cursor und AI-Agents haben wir die neue NG-DE Konferenz-Webseite in einem Bruchteil der üblichen Zeit entwickelt. Durch geschickt definierte Rules und Agent-Dialog entstehen moderne Angular-Anwendungen mit 5x weniger Zeitaufwand – ohne dabei auf Code-Qualität zu verzichten.

Die Entwicklung der [NG-DE 2025 Webseite](https://ng-de.org/?utm_source=angular.de&utm_medium=blog&utm_campaign=angular-cursor-ng-de-article&utm_content=intro) war ein Experiment: Kann man mit AI-Agents eine komplexe Angular-Anwendung entwickeln, die sowohl technisch hochwertig als auch wartbar ist? Die Antwort ist ein klares Ja – und die Zeitersparnis ist dramatisch.

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="NG-DE 2025 Website Header"
class="lazy img-fluid img-rounded" data-src="ng-de-header.png" data-srcset="ng-de-header.png"
/>
</p>

## Die wichtigsten Punkte

* 🚀 **Entwicklungsgeschwindigkeit**: 5x schnellere Entwicklung durch Agent-Dialog statt manueller Implementierung
* 🎯 **Code-Qualität**: Moderne Angular-Patterns durch gut definierte Cursor Rules
* 💡 **Workflow**: Senior Developer reviewt nur noch, Agents implementieren
* 🔧 **Wartbarkeit**: Saubere Architektur durch klare Regeln und Strukturvorgaben

## Warum Cursor für Angular-Entwicklung?

Die Kombination aus Cursor und Angular ist besonders mächtig, weil Angular bereits ein sehr strukturiertes Framework ist. AI-Agents können diese Struktur verstehen und konsistent anwenden – vorausgesetzt, man gibt ihnen die richtigen Regeln mit auf den Weg.

### Das `.cursor/rules/angular.md` File als Grundlage

Der Schlüssel für erfolgreiche AI-gestützte Angular-Entwicklung liegt in präzisen Regeln. Unser Rules-File definiert klare Standards:

```markdown
## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Use `input()` and `output()` functions instead of decorators
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
```

Diese Regeln sorgen dafür, dass jede AI-generierte Komponente moderne Angular-Patterns verwendet und konsistent mit dem Rest der Anwendung ist.

## Praktisches Beispiel: Komponenten-Entwicklung mit Agents

Stell dir vor, du brauchst eine Hero-Komponente für die Startseite. Anstatt sie selbst zu implementieren, beschreibst du dem Agent was du möchtest:

> "Erstelle eine Hero-Komponente für die NG-DE Konferenz mit einem animierten Call-to-Action Button und Responsive Design."

Der Agent generiert daraufhin Code wie diesen:

```typescript
@Component({
  selector: 'ngde-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes hero-flash-pulse {
      0%, 100% {
        box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
      }
      50% {
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
      }
    }

    .hero-flash-sale-button {
      animation: hero-flash-pulse 10s ease-in-out infinite;
    }
  `,
  template: `...`
})
export class HeroComponent {
  private dialog = inject(Dialog);
  private flashSaleService = inject(FlashSaleService);

  // Component logic
}
```

Beachte: Der Agent verwendet automatisch `inject()` statt Constructor Injection, moderne `ChangeDetectionStrategy.OnPush` und Inline-Styles – genau wie in unseren Rules definiert.

## Responsive Design per Prompt

Ein besonders beeindruckendes Beispiel ist die Responsive-Entwicklung. Anstatt mühsam Breakpoints zu definieren und CSS zu schreiben, sagst du dem Agent einfach:

> "Die Tickets-Sektion soll auf Mobile einspaltig, auf Tablet zweispaltig und auf Desktop dreispaltig dargestellt werden. Die Karten sollen bei Hover einen subtilen Schatten-Effekt haben."

Der Agent implementiert nicht nur das gewünschte Layout, sondern achtet auch auf Accessibility und moderne CSS-Features wie CSS Grid:

```css
.ticket-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .ticket-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .ticket-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Inspiration für Timeline Komponente: Digitale Leute Agenda

Ein besonders schönes Beispiel für die Kraft von AI-Agents zeigt sich bei der Entwicklung unserer Agenda-Komponente. Als Inspiration nutzte ich die wunderschön gestaltete Agenda-Seite unserer Freunde von [Digitale Leute](https://digitale-leute.de) – ein Design, das ich schon lange bewundert hatte.

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Digitale Leute Inspiration"
class="lazy img-fluid img-rounded" data-src="digitale-leute-ticket-visual.png" data-srcset="digitale-leute-ticket-visual.png"
/>
</p>

Anstatt mühsam das Design zu analysieren und nachzuprogrammieren, beschrieb ich dem Agent einfach: "Erstelle eine moderne Agenda-Komponente inspiriert von diesem Design mit Timeline-Layout, Hover-Effekten und einer Animation sobald man an die Stelle scrollt." Das Ergebnis war eine perfekt umgesetzte Angular-Komponente, die das ursprüngliche Design in unsere NG-DE Ästhetik übersetzt hat.

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="NG-DE Agenda Ergebnis"
class="lazy img-fluid img-rounded" data-src="ng-de-ticket-visual.png" data-srcset="ng-de-ticket-visual.png"
/>
</p>

Was mich früher Stunden an CSS-Grid-Fummelei und Responsive-Anpassungen gekostet hätte, war in 15 Minuten erledigt. Der Agent verstand nicht nur die visuelle Anforderung, sondern implementierte auch gleich die passenden TypeScript-Interfaces für die Agenda-Daten und berücksichtigte Accessibility-Standards. Da

## Der neue Entwicklungsworkflow

Der traditionelle Workflow hat sich grundlegend verändert:

### Früher:
1. Requirements analysieren (30 min)
2. Architektur planen (60 min)
3. Komponenten implementieren (4 Stunden)
4. Styling und Responsive Design (2 Stunden)
5. Testing und Bugfixes (1 Stunde)

**Gesamt: ~8 Stunden**

### Mit Cursor Agents:
1. Requirements in natürlicher Sprache formulieren (10 min)
2. Agent implementiert und iteriert (30 min)
3. Code Review und Anpassungen (45 min)

**Gesamt: ~1,5 Stunden**

## Konkrete Regeln für bessere Ergebnisse

Aus der Entwicklung der NG-DE Webseite haben wir gelernt, welche Rules besonders wichtig sind:

### Template-Regeln
```markdown
## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`
- Use the async pipe to handle observables
- Do NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead
```

Diese Regeln sorgen dafür, dass der generierte Code moderne Angular-Features nutzt und performant ist.

### State Management mit Signals
```markdown
## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Do NOT use `mutate` on signals, use `update` or `set` instead
```

Der Agent wendet diese Regeln konsequent an und generiert Code wie:

```typescript
export class TicketComponent {
  // Signal-based state
  selectedTicket = signal<Ticket | null>(null);

  // Computed derived state
  totalPrice = computed(() => {
    const ticket = this.selectedTicket();
    return ticket ? ticket.price * ticket.quantity : 0;
  });

  updateQuantity(quantity: number) {
    this.selectedTicket.update(ticket =>
      ticket ? { ...ticket, quantity } : null
    );
  }
}
```

## Tipps für deine eigenen Angular-Projekte

1. **Starte mit einem guten Rules-File**: Investiere Zeit in die Definition deiner Projektstandards
2. **Iteriere in kleinen Schritten**: Lass Agents einzelne Features implementieren, nicht die komplette App
3. **Review ist essentiell**: AI generiert guten Code, aber Senior-Review bleibt wichtig
4. **Nutze konkrete Prompts**: "Erstelle eine responsive Navbar" ist besser als "Erstelle Navigation"

## Performance und Bundle Size

Dank der konsequenten Anwendung moderner Angular-Patterns durch die Agents ist die NG-DE Webseite nicht nur schnell entwickelt, sondern auch performant:

- **Initial Bundle Size**: 87KB (komprimiert)
- **Lighthouse Score**: 98/100 (Performance)
- **Lazy Loading**: Automatisch für alle Feature-Routes implementiert
- **OnPush Change Detection**: In allen Komponenten aktiviert

## Die Zukunft der Angular-Entwicklung

Was wir bei der NG-DE Webseite erlebt haben, ist vermutlich erst der Anfang. AI-Agents werden nicht den Senior Developer ersetzen, aber sie verändern fundamental, womit wir unsere Zeit verbringen:

- **Weniger Boilerplate schreiben**
- **Mehr Zeit für Architektur und komplexe Problemlösungen**
- **Fokus auf Code Review und Qualitätssicherung**
- **Schnellere Iteration bei Design-Änderungen**

## Fazit: 5x schneller ist erst der Anfang

Die Entwicklung der NG-DE Webseite hat gezeigt: Mit den richtigen Tools und Regeln können AI-Agents die Angular-Entwicklung dramatisch beschleunigen. Die 5x Zeitersparnis ist dabei nur der quantifizierbare Teil – die qualitative Verbesserung durch weniger repetitive Arbeit und mehr Fokus auf die wichtigen Entscheidungen ist mindestens genauso wertvoll.

Für Angular-Teams bedeutet das: Wer jetzt die AI-gestützte Entwicklung erlernt, hat in einem Jahr einen enormen Vorsprung gegenüber Teams, die noch traditionell arbeiten.

## Nächste Schritte

Möchtest du selbst AI-gestützte Angular-Entwicklung lernen? In unseren Angular-Schulungen zeigen wir dir, wie du Cursor und AI-Agents effektiv in deinen Workflow integrierst – von den Grundlagen bis zu fortgeschrittenen Patterns.

## Quellen & Weiterführende Links

* 🔧 [NG-DE Webseite](https://2025.ng-de.org/?utm_source=angular.de&utm_medium=blog&utm_campaign=angular-cursor-ng-de-article&utm_content=sources)
* 🔧 [NG-DE 2025 Webseite](https://2025.ng-de.org/?utm_source=angular.de&utm_medium=blog&utm_campaign=angular-cursor-ng-de-article&utm_content=sources)
* 📚 [Cursor Documentation](https://cursor.sh/docs)
* 🎓 [Angular Schulungen auf workshops.de](https://workshops.de/seminare-schulungen-kurse/angular)