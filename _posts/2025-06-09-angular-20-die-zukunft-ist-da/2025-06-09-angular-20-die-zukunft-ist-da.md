---
title: "Angular 20 - Die Zukunft ist da"
description: "Angular 20 bringt Standalone Components als Standard, Template Literals, Zoneless Change Detection und viele weitere revolutionäre Features für moderne Webentwicklung."
author: "Robin Böhm"
published_at: 2025-06-10 09:00:00.000000Z
header_source:
header_image: header.jpg
categories: "angular release update"
---

Es ist soweit: Angular v20 wurde veröffentlicht!

Mit Angular 20 erreicht die Angular Renaissance einen neuen Höhepunkt. Diese Version markiert einen bedeutenden Wendepunkt in der Geschichte des Frameworks: **Standalone Components sind jetzt der Standard**, Zoneless Change Detection hat Developer Preview erreicht, und moderne Template-Features wie Template Literals revolutionieren die Art, wie wir Angular-Anwendungen entwickeln.

Das Angular-Team hat nach den experimentellen Features der letzten Versionen nun den Fokus darauf gelegt, das Framework grundlegend zu modernisieren und für die Zukunft zu rüsten. Wie Minko Gechev vom Angular-Team es ausdrückt:

> "Angular 20 represents our vision of modern web development - simpler, faster, and more intuitive than ever before."

Diese Version ist mehr als nur ein Update - sie ist eine Neuausrichtung hin zu einem Framework, das die Komplexität reduziert und gleichzeitig die Leistung maximiert. NgModules gehören der Vergangenheit an, Zone.js wird optional, und die Developer Experience erreicht ein neues Niveau.

## Die Highlights von Angular 20

- **Standalone Components als Standard**: NgModules sind nicht mehr erforderlich, Standalone ist der neue Default
- **Zoneless Change Detection in Developer Preview**: Bessere Performance ohne Zone.js-Overhead
- **Template Literals**: Moderne Template-Syntax für intuitivere String-Verarbeitung
- **Experimentelle Vitest-Unterstützung**: Schnellere und modernere Test-Infrastruktur
- **Verbesserte TypeScript-Integration**: Bessere Type-Checking in Templates und Host-Bindings
- **Stabilisierte Signal APIs**: Alle reaktiven Primitives sind jetzt production-ready

Das Ganze könnt ihr euch zusammen mit unserem Team anschauen! Hier ist das Video zum Angular 20 Release:

<iframe class="" width="100%" height="315" src="https://www.youtube-nocookie.com/embed/FcDamOe1qxA?rel=0" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Standalone Components sind jetzt Standard

Die größte Veränderung in Angular 20 ist der Wechsel zu Standalone Components als Standard. NgModules sind nicht mehr erforderlich und werden nur noch für Legacy-Unterstützung bereitgestellt. Diese Änderung vereinfacht die Angular-Architektur erheblich und macht den Einstieg für neue Entwickler deutlich einfacher.

### Was bedeutet das konkret?

Bei der Erstellung einer neuen Angular-Anwendung mit `ng new` generiert die CLI automatisch Standalone Components:

```typescript
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // standalone: true ist jetzt der Standard!
})
export class AppComponent {
  title = 'meine-app';
}
```

### Migration bestehender Anwendungen

Das Angular-Team hat einen automatisierten Migrationspfad bereitgestellt. Beim Update auf v20 via `ng update` wird automatisch:

- `standalone: true` aus bestehenden Standalone Components entfernt (da es jetzt Standard ist)
- `standalone: false` zu NgModule-basierten Components hinzugefügt
- Imports entsprechend angepasst

### Vorteile der neuen Architektur

- **Weniger Boilerplate**: Keine NgModule-Deklarationen mehr erforderlich
- **Bessere Tree-Shaking**: Nur verwendete Dependencies werden gebündelt
- **Einfachere Tests**: Direkter Import von Components ohne TestBed-Setup
- **Intuitivere Lernkurve**: Weniger Konzepte für Einsteiger

## Zoneless Change Detection in Developer Preview

Nach dem experimentellen Status in Angular 18 und 19 hat Zoneless Change Detection nun Developer Preview erreicht. Diese Technologie befreit Angular von der Abhängigkeit zu Zone.js und bringt signifikante Performance-Verbesserungen.

### Wie aktiviere ich Zoneless?

Zoneless ist jetzt einfacher denn je zu aktivieren. Bei neuen Projekten fragt die CLI direkt danach:

```bash
$ ng new meine-app
? Would you like to use zoneless change detection? Yes
```

Für bestehende Projekte:

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(), // Neuer Provider-Name
    // weitere Providers...
  ]
});
```

### Performance-Verbesserungen

Erste Benchmarks zeigen beeindruckende Ergebnisse:
- **40-50% bessere LCP (Largest Contentful Paint)**
- **Kleinere Bundle-Größe** durch Wegfall von Zone.js
- **Saubere Stack Traces** ohne Zone.js-Pollution
- **Bessere Interoperabilität** mit anderen Frameworks

### Best Practices für Zoneless

Mit Zoneless werden Angular Signals noch wichtiger:

```typescript
@Component({
  template: `
    <h1>{{ title() }}</h1>
    <button (click)="updateTitle()">Update</button>
  `
})
export class MyComponent {
  title = signal('Hallo Angular 20');

  updateTitle() {
    // Signals triggern automatisch Change Detection
    this.title.set('Zoneless funktioniert!');
  }
}
```

## Template Literals revolutionieren Templates

Angular 20 führt native Unterstützung für Template Literals in Angular-Templates ein. Diese lang ersehnte Funktion macht String-Verarbeitung in Templates deutlich intuitiver und näher an Standard-JavaScript.

### Neue Möglichkeiten mit Template Literals

```html
<!-- Einfache String-Interpolation -->
<h1>{{ `Willkommen ${userName()}, heute ist ${getCurrentDay()}!` }}</h1>

<!-- Mit Pipes kombinieren -->
<p>{{ `Hallo ${name()}` | uppercase }}</p>

<!-- Dynamische CSS-Klassen -->
<div class="{{ `user-type-${userType()} status-${status()}` }}">
  Benutzer-Info
</div>

<!-- Komplexe Ausdrücke -->
<span>{{ `Du hast ${messageCount()} ${messageCount() === 1 ? 'Nachricht' : 'Nachrichten'}` }}</span>
```

### Exponentiation und moderne Operatoren

Angular 20 unterstützt jetzt auch moderne JavaScript-Operatoren direkt in Templates:

```html
<!-- Exponentiation Operator -->
<p>2 hoch 8 = {{ 2 ** 8 }}</p>

<!-- In-Operator für Type Narrowing -->
@if ('email' in user) {
  <p>Email: {{ user.email }}</p>
}

<!-- Void Operator -->
<button (click)="void trackEvent('click')">Click me</button>
```

## Modernisierte Test-Infrastruktur mit Vitest

Mit der Deprecation von Karma führt Angular 20 experimentelle Unterstützung für Vitest ein - einen modernen, schnellen Test-Runner, der die Zukunft des Testens in Angular darstellt.

### Vitest aktivieren

```bash
# Für neue Projekte
ng new meine-app --test-runner=vitest

# Für bestehende Projekte
ng add @angular/vitest
```

### Warum Vitest?

- **10x schneller** als Karma in den meisten Szenarien
- **Native ESM-Unterstützung** ohne Konfigurationsaufwand
- **Hot Module Reload** für Tests
- **TypeScript out-of-the-box**
- **Kompatibel** mit bestehenden Jasmine-Tests

### Beispiel-Test mit Vitest

```typescript
import { describe, it, expect } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent] // Standalone Component!
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should update username signal', () => {
    component.username.set('John Doe');
    expect(component.username()).toBe('John Doe');
  });
});
```

## Verbesserte TypeScript-Integration

Angular 20 bringt eine deutlich verbesserte Integration mit TypeScript, die besonders bei der Template-Entwicklung spürbar wird.

### Enhanced Template Type-Checking

Host-Bindings und Template-Ausdrücke werden jetzt vollständig typisiert:

```typescript
@Component({
  template: `<div [class.active]="isActive()">Content</div>`,
  host: {
    '[class.disabled]': 'disabled()', // Jetzt typisiert!
    '(click)': 'handleClick($event)' // Event-Type wird geprüft!
  }
})
export class MyComponent {
  isActive = signal(false);
  disabled = signal(false);

  handleClick(event: MouseEvent) { // TypeScript erkennt den korrekten Typ
    console.log('Clicked:', event.target);
  }
}
```

### Bessere Diagnostics

Der Angular Compiler bietet jetzt erweiterte Diagnostics:

```html
<!-- Compiler warnt vor falschem Nullish Coalescing -->
{{ user?.name || undefined ?? 'Default' }} <!-- Warnung: Gemischte Operatoren -->
{{ (user?.name || undefined) ?? 'Default' }} <!-- Korrekt -->

<!-- Warnung bei nicht-invokierten Track-Funktionen -->
@for (item of items; track trackById) { } <!-- Warnung -->
@for (item of items; track trackById(item)) { } <!-- Korrekt -->
```

## Stabilisierte Signal APIs

Mit Angular 20 sind alle fundamentalen Signal APIs offiziell stabil und production-ready:

### Alle Signal Primitives sind stabil

```typescript
import { signal, computed, effect } from '@angular/core';

@Component({
  template: `
    <h1>{{ fullName() }}</h1>
    <input [value]="firstName()" (input)="firstName.set($event.target.value)">
  `
})
export class UserComponent {
  firstName = signal('John');
  lastName = signal('Doe');

  // Computed Signal
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  constructor() {
    // Effect für Side Effects
    effect(() => {
      console.log('Name changed:', this.fullName());
    });
  }
}
```

### afterRender APIs umbenannt

```typescript
import { afterEveryRender, afterNextRender } from '@angular/core';

@Component({...})
export class MyComponent {
  constructor() {
    // Neuer Name für bessere Klarstellung
    afterEveryRender(() => {
      console.log('Nach jedem Render');
    });

    afterNextRender(() => {
      console.log('Nach dem nächsten Render');
    });
  }
}
```

## Incremental Hydration wird stabil

Nach dem Developer Preview in Angular 19 ist Incremental Hydration nun stabil und bereit für den produktiven Einsatz.

### Wie funktioniert Incremental Hydration?

```html
<!-- Components werden nur bei Bedarf hydratisiert -->
@defer (on viewport) {
  <heavy-component />
} @placeholder {
  <div>Loading...</div>
}

@defer (on interaction) {
  <interactive-widget />
} @placeholder {
  <static-preview />
}
```

### Performance-Gewinne

Erste Messungen zeigen:
- **40-50% bessere LCP-Werte**
- **Reduzierte Initial Bundle Size**
- **Bessere Time to Interactive (TTI)**
- **Optimierte Server-Ressourcen-Nutzung**

## Route-Level Render Modes sind stabil

Angular 20 stabilisiert auch die Route-Level Render Modes, die granulare Kontrolle über das Rendering verschiedener Routen ermöglichen:

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { renderMode: 'prerender' } // Statisch generiert
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { renderMode: 'ssr' } // Server-Side Rendering
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { renderMode: 'client' } // Client-Side Rendering
  }
];
```

## Breaking Changes und Migration

### Node.js und TypeScript Anforderungen

Angular 20 erhöht die Mindestanforderungen:
- **Node.js**: `^20.11.1` || `^22.11.0` || `^24.0.0`
- **TypeScript**: `>=5.8.0 <5.9.0`
- **RxJS**: `^6.5.3` || `^7.4.0`

### Migration bestehender Anwendungen

Der Migrationsprozess ist größtenteils automatisiert:

```bash
ng update @angular/core @angular/cli
```

Die Migration:
- Entfernt `standalone: true` aus bestehenden Standalone Components
- Fügt `standalone: false` zu NgModule Components hinzu
- Aktualisiert Provider-Namen (z.B. `provideZonelessChangeDetection`)
- Migriert deprecated APIs

### Entfernte Features

- **ng-reflect-* Attribute**: Standardmäßig in Development entfernt
- **InjectFlags Enum**: Vollständig entfernt
- **HammerJS Support**: Deprecated (Entfernung in v21 geplant)

## Ausblick: Was kommt nach Angular 20?

### Signal Forms (Angular 21+)

```typescript
// Vorschau auf Signal Forms
const userForm = signalForm({
  name: signalControl('', [required]),
  email: signalControl('', [required, email]),
  age: signalControl(0, [min(18)])
});

// Reactive Validierung
effect(() => {
  if (userForm.valid()) {
    console.log('Form ist gültig:', userForm.value());
  }
});
```

### Selectorless Components

```typescript
// Zukunftsvision: Direkter Import ohne Selektoren
import { MyComponent } from './my-component';

@Component({
  template: `
    <MyComponent [data]="myData" />
  `
})
export class AppComponent {}
```

## Community und Ökosystem

Die Angular Community ist lebendiger denn je! Angular 20 wird auf wichtigen Konferenzen weltweit präsentiert:

- **[NG-DE Conference](https://ng-de.org/)** - November 5-7, 2025 in Berlin
- **[ng-conf](https://ng-conf.org/)** - Die größte Angular-Konferenz
- **[Angular Belgrade](https://angularbelgrade.org/)** - Europäische Angular-Community
- **[NGPoland](https://ng-poland.pl/)** - Polens Angular-Gathering

## Fazit: Angular 20 - Ein Meilenstein der Moderne

Angular 20 markiert einen historischen Wendepunkt. Mit Standalone Components als Standard, der Reife der Zoneless Change Detection und modernen Template-Features positioniert sich Angular als das führende Framework für moderne Webentwicklung.

### Die wichtigsten Errungenschaften:

- **Vereinfachte Architektur**: Keine NgModules mehr erforderlich
- **Bessere Performance**: Zoneless bringt messbare Verbesserungen
- **Moderne Developer Experience**: Template Literals und TypeScript-Integration
- **Zukunftssicherheit**: Stabile APIs und klare Roadmap
- **Community-Momentum**: Lebendiges Ökosystem und starke Adoption

### Unsere Einschätzung

Angular 20 ist mehr als nur ein Release - es ist die Verwirklichung der Vision einer modernen, performanten und entwicklerfreundlichen Plattform. Das Framework hat sich von seinen komplexen Anfängen zu einem eleganten, intuitiven Tool entwickelt, das sowohl für Einsteiger als auch für Enterprise-Anwendungen optimal geeignet ist.

Die strategische Entscheidung, bewährte Konzepte zu stabilisieren und gleichzeitig mutige Schritte in Richtung Zukunft zu gehen, zeigt die Reife des Angular-Teams. Mit Features wie Zoneless Change Detection und Standalone Components als Standard setzt Angular neue Maßstäbe in der Frontend-Entwicklung.

**Die Angular Renaissance hat mit Version 20 ihren Höhepunkt erreicht - und das ist erst der Anfang einer noch spannenderen Zukunft.**

Welche Features von Angular 20 freuen euch am meisten? Teilt eure Gedanken in den Kommentaren oder diskutiert mit uns auf [Twitter](https://twitter.com/angular_de)!