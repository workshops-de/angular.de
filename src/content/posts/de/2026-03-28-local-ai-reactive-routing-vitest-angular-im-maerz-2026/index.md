---
title: "Local AI, Reactive Routing & Vitest: Angular im März 2026"
description: "Das Angular Team bringt Local AI-Integration, reaktives Routing und die Karma-zu-Vitest-Migration. Was Angular-Entwickler jetzt wissen müssen."
author: "Robin Böhm"
published_at: 2026-03-28T10:00:00.000Z
header_image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
categories: angular typescript frontend development tools
---

# Local AI, Reactive Routing & Vitest: Das Angular Blog-Update im Überblick
**TL;DR:** Das Angular-Team hat einen umfangreichen Blog-Post veröffentlicht, der drei wichtige Entwicklungen zusammenfasst: die Integration von Local AI in den Angular-Entwicklungsworkflow, neue Reactive Routing Features sowie die lang erwartete Migration vom veralteten Karma-Test-Runner zu Vitest. Für Angular-Entwickler gibt es einiges zu tun.
Das Angular-Ökosystem entwickelt sich im Jahr 2026 in einem beeindruckenden Tempo weiter. Der neueste offizielle Blog-Post aus dem Angular-Team bündelt gleich drei bedeutende Themen, die sowohl den täglichen Entwicklungsalltag als auch die strategische Ausrichtung von Angular-Projekten beeinflussen. Wir schauen uns an, was hinter den Schlagzeilen steckt.
## Die wichtigsten Punkte
- 📅 **Verfügbarkeit**: Features sind aktuell in Angular verfügbar (Stand März 2026)
- 🎯 **Zielgruppe**: Angular-Entwickler aller Erfahrungsstufen, besonders Teams mit bestehenden Projekten
- 💡 **Kernthemen**: Local AI-Tooling, reaktives Routing via Signals/RxJS, Vitest als neuer Standard-Test-Runner
- 🔧 **Tech-Stack**: Angular CLI, Vitest, RxJS, Angular Signals, Model Context Protocol (MCP)
## 1. Local AI: KI direkt im Angular-Entwicklungsworkflow
Das Angular-Team treibt die Integration von KI-Tools in den Entwicklungsprozess aktiv voran – und geht dabei über einfache Code-Completion hinaus. Im Fokus stehen folgende Ansätze:
### Angular CLI MCP Server
Das Angular-Team hat einen **Model Context Protocol (MCP) Server** für den Angular CLI veröffentlicht. Dieser erlaubt es KI-Assistenten (z. B. GitHub Copilot, Claude, Cursor), direkt mit dem Angular CLI zu interagieren und so agentische Workflows zu ermöglichen. Das bedeutet: KI kann nicht nur Code vorschlagen, sondern aktiv `ng generate`-Befehle ausführen, Migrationen anstoßen und Scaffolding übernehmen.
### Offizielle LLM-Prompts für Angular-Best-Practices
Angular stellt unter `angular.dev/ai/develop-with-ai` offizielle System-Prompts bereit, die in KI-Tools eingebunden werden können. Das Ziel: KI-generierter Code soll von Anfang an modernen Angular-Standards entsprechen – Signals, funktionale Guards, Standalone Components und die 2025er Style Guide-Vorgaben inklusive.
### Local RAG Engine
Für Teams, die intern arbeiten oder keine Cloud-KI einsetzen wollen, gibt es Unterstützung für lokale RAG-Engines (Retrieval-Augmented Generation). Diese können auf offizielle Angular-Codebeispiele und Best-Practice-Dokumentationen zugreifen, ohne externe APIs zu nutzen.
**Für Angular-Entwickler bedeutet das**: KI ist kein optionales Gimmick mehr – das Angular-Team baut es aktiv in den offiziellen Tooling-Stack ein. Es lohnt sich, die MCP-Integration und die offiziellen Prompts auszuprobieren.
## 2. Reactive Routing: Signals und funktionale APIs als neuer Standard
Das Routing in Angular wird reaktiver. Die Entwicklungen der letzten Monate konsolidieren sich zu einem klaren Trend: **Funktionale Guards, Resolver und Interceptors** sind nun der empfohlene Default im Angular CLI.
### Was hat sich konkret geändert?
- **Funktionale Guards & Resolver** (`canActivate`, `resolve`) werden standardmäßig als Funktionen generiert, nicht mehr als Klassen. Das macht sie tree-shakable und leichter testbar.
- **Router-Integration mit Signals**: Über `toSignal()` lassen sich Router-Events und aktivierte Route-Daten reaktiv in Komponenten einbinden – ohne manuelles Unsubscribe.
- **RxJS bleibt zentral** für asynchrone Flows, wird aber durch Signals für synchronen State ergänzt.
### Was bedeutet das für bestehende Projekte?
Bestehende klassenbasierte Guards und Resolver funktionieren weiterhin – es gibt **keine Breaking Changes**. Angular empfiehlt jedoch, neue Features mit den funktionalen APIs zu entwickeln und bei Migrations-Aufwand den Angular CLI Schematic-Support zu nutzen.
## 3. Vitest Migration: Karma ist Geschichte
Das ist die Nachricht, auf die viele Angular-Entwickler gewartet haben: **Karma wird durch Vitest ersetzt** – und das Angular-Team macht diesen Schritt nun offiziell.
### Warum Vitest?
- **Geschwindigkeit**: Vitest nutzt Vite unter der Haube und ist signifikant schneller als Karma, besonders bei großen Test-Suites.
- **Moderner DX**: Hot Module Replacement für Tests, parallele Test-Ausführung, native ESM-Unterstützung.
- **Ecosystem-Alignment**: Das gesamte Angular-Tooling bewegt sich in Richtung Vite-basierter Build-Tools – Vitest ist die logische Konsequenz.
- **Karma ist deprecated**: Der Karma-Test-Runner wird seit längerem nicht mehr aktiv weiterentwickelt. Der Wechsel war überfällig.
### Wie läuft die Migration ab?
Das Angular-Team stellt eine **offizielle Migration Schematic** bereit:
```bash
ng generate @angular/core:karma-to-vitest
```
Der CLI-Update-Prozess bietet interaktive Schritte zur Vitest-Migration an. Bestehende Karma-Konfigurationen werden soweit möglich automatisch migriert.
⚠️ **Hinweis**: Projekts mit stark angepassten Karma-Konfigurationen oder Browser-spezifischen Tests sollten die Migration sorgfältig prüfen. Die offizielle Dokumentation unter `angular.dev` enthält einen detaillierten Migration Guide.
### Was bleibt gleich?
Die **Jasmine-Syntax** für Tests bleibt vorerst kompatibel – Vitest unterstützt Jasmine-ähnliche APIs, sodass bestehende Tests nicht komplett umgeschrieben werden müssen.
## Was das für Angular-Teams bedeutet
Diese drei Updates zusammengenommen zeigen die strategische Richtung des Angular-Teams: **schnelleres Tooling, reaktivere APIs und KI-gestützte Entwicklung** als erste Klasse.
Für Enterprise-Teams gilt:
1. **Vitest-Migration einplanen** – lieber früh als spät, bevor Karma-Support vollständig entfällt
2. **MCP-Server evaluieren** – besonders wenn das Team bereits AI-Assistenten nutzt
3. **Neue Router-Features nutzen** – funktionale Guards sind einfacher zu testen und zu warten
## Praktische Nächste Schritte
1. 📖 **Originalen Blog-Post lesen**: [blog.angular.dev](https://blog.angular.dev/local-ai-reactive-routing-and-the-vitest-migration-bdddad0cfa96)
2. 🔧 **Vitest-Migration anstoßen**: `ng generate @angular/core:karma-to-vitest` und den Anweisungen folgen (Hinweis: Vorab müssen Vitest und eine DOM-Library wie jsdom installiert werden)
3. 🤖 **Angular MCP Server einrichten**: Dokumentation unter [angular.dev/ai/develop-with-ai](https://angular.dev/ai/develop-with-ai)
4. 🧪 **Test-Suite prüfen**: Karma-Konfigurationen inventarisieren, bevor die Migration startet