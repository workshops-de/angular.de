# AGENTS.md - Angular.DE Projekt Übersicht

## Projektkontext

**Angular.DE** ist die führende deutsche Angular-Community-Website, die von workshops.de betrieben wird. Das Projekt ist eine Astro-basierte statische Website, die Angular-Artikel, Tutorials, Schulungsangebote und Community-Inhalte auf Deutsch bereitstellt.

### Technische Basis

- **Framework**: Astro 5.x (statische Website)
- **Deployment**: Firebase Hosting via GitHub Actions
- **Content**: Markdown-basierte Artikel mit YAML Front Matter (Astro Content Collections)
- **Styling**: Tailwind CSS
- **Sprachen**: Deutsch (Standard) und Englisch

### Zielgruppe

- Deutsche Angular-Entwickler (alle Erfahrungsstufen)
- Unternehmen, die Angular-Schulungen suchen
- Angular-Community-Mitglieder
- Technische Entscheidungsträger

---

## Artikelstruktur-Richtlinien

Diese Richtlinien spiegeln den etablierten Stil der angular.de Website wider und sorgen für Konsistenz über alle Inhalte hinweg.

### YAML Front Matter (Pflichtfelder)

```yaml
---
title: "Prägnanter, beschreibender Titel (max. 60 Zeichen)"
description: "SEO-optimierte Beschreibung (max. 160 Zeichen)"
author: "Vollständiger Autorenname"
published_at: YYYY-MM-DD HH:MM:SS.000000Z
header_image: header.jpg
categories: "angular typescript [weitere-relevante-tags]"
---
```

**Obligatorische Front Matter Regeln:**

- `title`: Muss konkret und suchmaschinenoptimiert sein
- `description`: Fasst den Artikel-Nutzen in einem Satz zusammen
- `author`: Vollständiger Name des Autors (muss in `src/content/users/` existieren)
- `published_at`: Exaktes ISO-Datum mit Zeitzone
- `header_image`: Immer `header.jpg` (wird automatisch generiert)
- `categories`: Leerzeichen-getrennte Tags, immer mit "angular" beginnend

### Artikel-Aufbau (Standardstruktur)

#### 1. TL;DR Sektion (Pflicht)

```markdown
**TL;DR:** Kompakte Zusammenfassung des Artikels in 1-2 Sätzen, die den Hauptnutzen für Leser klar kommuniziert.
```

#### 2. Einleitung mit Hook

- Beginne mit einem konkreten Problem oder aktuellen Entwicklung
- Stelle klar heraus, was der Leser lernen wird
- Verweise auf praktische Beispiele oder Projekte
- Nutze rhetorische Fragen oder überraschende Fakten

#### 3. Kerninhalt-Struktur

**Hierarchische Überschriften:**

```markdown
## Hauptkapitel (H2) - Beschreibt große Themenbereiche

### Unterkapitel (H3) - Spezifische Aspekte oder Implementierungen

#### Details (H4) - Nur bei sehr technischen Abschnitten
```

**Highlights-Box (bei umfangreichen Artikeln):**

```markdown
## Die wichtigsten Punkte

- 🚀 **Kategorie**: Kurze Erklärung des Vorteils
- 🎯 **Kategorie**: Kurze Erklärung des Vorteils
- 💡 **Kategorie**: Kurze Erklärung des Vorteils
- 🔧 **Kategorie**: Kurze Erklärung des Vorteils
```

#### 4. Code-Beispiele Standards

**TypeScript/Angular Code:**

```typescript
// Immer vollständige, lauffähige Beispiele
@Component({
  selector: "app-beispiel",
  templateUrl: "./beispiel.component.html",
  styleUrls: ["./beispiel.component.scss"],
})
export class BeispielComponent {
  // Kommentare nur bei nicht-offensichtlicher Logik
  title = signal("Angular Beispiel");
}
```

**Template-Beispiele:**

```html
<!-- Moderne Angular-Syntax verwenden -->
@if (showContent()) {
<div class="content">
  <h1>{{ title() }}</h1>
</div>
} @for (item of items(); track item.id) {
<app-item [data]="item" />
}
```

**Kommandozeilen-Beispiele:**

```bash
# Immer mit Kommentaren für Kontext
npm install @angular/core@latest

# Oder mit ng CLI
ng generate component beispiel
```

#### 5. Vergleiche und Best Practices

**Gut/Schlecht-Beispiele verwenden:**

````markdown
### ❌ Nicht empfohlen

```typescript
// Veralteter oder problematischer Code
```
````

### ✅ Empfohlener Ansatz

```typescript
// Moderner, best-practice Code
```

````

#### 6. Praktische Anwendung

**Workflow-Beispiele:**
```markdown
### Früher:
1. Schritt 1 (Zeitaufwand)
2. Schritt 2 (Zeitaufwand)
3. Schritt 3 (Zeitaufwand)

**Gesamt: ~X Stunden**

### Mit [neue Technologie]:
1. Vereinfachter Schritt (Zeitaufwand)
2. Automatisierter Prozess (Zeitaufwand)

**Gesamt: ~X Stunden**
````

#### 7. Abschluss-Struktur

**Performance/Ergebnisse (wenn relevant):**

```markdown
## Ergebnisse

- **Bundle Size**: XkB (komprimiert)
- **Lighthouse Score**: X/100 (Performance)
- **Entwicklungszeit**: X% Ersparnis
```

**Call-to-Action Abschnitt:**

```markdown
## Nächste Schritte

Möchtest du [spezifische Fähigkeit] lernen? In unseren Angular-Schulungen zeigen wir dir [spezifischer Nutzen] - von den Grundlagen bis zu fortgeschrittenen Patterns.
```

**Quellen & Links (Pflicht):**

```markdown
## Quellen & Weiterführende Links

- 🔧 [Projekt-Link](URL)
- 📚 [Dokumentation](URL)
- 🎓 [Angular Schulungen auf workshops.de](https://workshops.de/seminare-schulungen-kurse/angular)
```

---

## Content-Guidelines

### Sprachstil

- **Zielgruppe**: Deutsche Angular-Entwickler (Du-Form verwenden)
- **Tonalität**: Professionell aber zugänglich, technisch aber nicht überheblich
- **Komplexität**: Von Grundlagen zu fortgeschrittenen Themen aufbauen
- **Praxisbezug**: Immer konkrete, anwendbare Beispiele

### Technische Standards

- **Angular-Version**: Immer neueste stabile Version als Standard erwähnen
- **Code-Qualität**: Nur production-ready Code-Beispiele
- **TypeScript**: Strenge Typisierung in allen Beispielen
- **Best Practices**: Moderne Angular-Patterns (Signals, Standalone Components, etc.)

### SEO und Auffindbarkeit

- **Keywords**: Angular + spezifische Technologie/Problem im Titel
- **Meta-Description**: Nutzenversprechen in der Description
- **Struktur**: Klare H2/H3-Hierarchie für bessere Indizierung
- **Internal Linking**: Verweise auf andere angular.de Artikel

### Multimediale Inhalte

- **Code-Snippets**: Syntax-Highlighting für TypeScript/HTML/CSS
- **Screenshots**: Bei UI-relevanten Themen mit klaren Markierungen
- **Videos**: YouTube-Embeds für komplexe Demonstrationen
- **Diagramme**: Nur bei Architektur-relevanten Themen

---

## Dateiorganisation

### Artikel-Struktur

```
src/content/posts/
  de/                              # Deutsche Artikel
    YYYY-MM-DD-artikel-slug/
      index.md                     # Hauptartikel
      header.jpg                   # Header-Bild
      beispiel-image.png          # Weitere Bilder im Artikel
  en/                              # Englische Artikel
    YYYY-MM-DD-artikel-slug/
      index.md
      header.jpg
```

### Autoren-Management

```
src/content/users/
  "Vollständiger Name.yaml"      # Autor-Profil mit Bio und Kontaktdaten
```

### Asset-Pfade

- **Bilder im Artikel**: Standard-Markdown `![alt text](./image.png)` mit relativem Pfad
- **Header-Bild**: `header_image: "./header.jpg"` im Frontmatter (Astro Image Optimization)

---

## Angular-spezifische Inhaltsrichtlinien

### Code-Standards

- **Standalone Components** als Standard (Angular 14+)
- **Signals** für State Management (Angular 16+)
- **Control Flow Syntax** (`@if`, `@for`) statt Direktiven (Angular 17+)
- **inject()** Function statt Constructor Injection
- **OnPush Change Detection** als Standard

### Framework-Fokus

- **Angular Core**: Routing, Components, Services, Pipes
- **Angular Ökosystem**: CLI, Material, CDK, Universal
- **Community Tools**: Nx, NgRx, Jest, Testing Library
- **Enterprise Topics**: Architektur, Performance, Deployment

### Tutorials Standards

- **Schritt-für-Schritt**: Jeder Schritt reproduzierbar
- **Versioine**: Angular-Version immer explizit nennen
- **Dependencies**: Genaue package.json Versionen
- **Environment**: Node.js/npm Versionen spezifizieren

---

## Community und Workshop-Integration

### Workshops.de Verlinkung

- Jeder Artikel sollte relevante Schulungsangebote verlinken
- Call-to-Action für Schulungen wo thematisch passend
- Verweis auf Community-Events (NG-DE Conference)

### Community-Aspekte

- **Open Source**: Beiträge zur Angular-Community erwähnen
- **Discussions**: Kommentare und Social Media Integration
- **Contributors**: Gastautoren und Community-Beiträge fördern

---

## Qualitätssicherung

### Vor Veröffentlichung prüfen

- [ ] YAML Front Matter vollständig und korrekt
- [ ] TL;DR Sektion vorhanden
- [ ] Code-Beispiele getestet und lauffähig
- [ ] Links funktional (interne und externe)
- [ ] Header-Bild vorhanden
- [ ] Autor-Profil in \_data/users/ existiert
- [ ] SEO-Title und Description optimiert
- [ ] Kategorien korrekt gesetzt
- [ ] Call-to-Action für Schulungen eingefügt

### Performance-Checks

- [ ] Bilder optimiert und mit lazy loading
- [ ] Code-Blocks mit korrekter Syntax-Hervorhebung
- [ ] Responsive Design berücksichtigt
- [ ] Interne Verlinkung zu verwandten Artikeln

---

## Fazit

Dieses AGENTS.md dient als umfassender Leitfaden für AI-Agents und menschliche Autoren, die an der angular.de Website arbeiten. Die definierten Standards sorgen für konsistente, hochwertige Inhalte, die der deutschen Angular-Community maximalen Nutzen bieten.

**Bei Unsicherheiten**: Orientiere dich an bestehenden Top-Artikeln wie "Angular 20 - Die Zukunft ist da" oder "Angular-Entwicklung mit Cursor" als Referenz für Stil und Struktur.
