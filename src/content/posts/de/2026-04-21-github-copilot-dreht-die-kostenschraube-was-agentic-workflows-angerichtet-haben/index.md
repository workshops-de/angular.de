---
title: "GitHub Copilot dreht die Kostenschraube: Was agentic Workflows angerichtet haben"
description: "GitHub Copilot dreht die Kostenschraube: Was agentic Workflows angerichtet haben"
author: "Robin Böhm"
published_at: 2026-04-21T10:00:00.000Z
header_image: header.jpg
categories: angular typescript frontend development tools
---

**TL;DR:** GitHub pausiert ab sofort neue Anmeldungen für Copilot Pro, Pro+ und Student – und verschärft session- sowie wochenbasierte Nutzungslimits. Der Auslöser: agentic Workflows lassen die Token-Kosten explodieren, sodass einzelne Anfragen bereits den kompletten Plan-Preis übersteigen können.

Am 20. April 2026 veröffentlichte GitHub VP of Product Joe Binder eine ungewöhnlich offene Ankündigung: Die Individual Plans für GitHub Copilot werden eingefroren und restriktiver gestaltet. Hintergrund ist kein technisches Versagen, sondern ein Kostenstrukturproblem, das GitHub selbst einräumt: Agentic Workflows – also lang laufende, parallelisierte Sessions mit Agents und Subagents – verbrauchen ein Vielfaches der ursprünglich kalkulierten Ressourcen. Das Ergebnis: "a handful of requests" können laut GitHub bereits den kompletten monatlichen Plan-Preis an Compute-Kosten verursachen.

## Was ist neu?

GitHub zieht drei konkrete Maßnahmen durch: Erstens werden neue Anmeldungen für Copilot Pro, Pro+ und Student **sofort pausiert** – bestehende Abonnenten sind davon zunächst nicht betroffen. Zweitens werden die Usage-Limits verschärft; Pro+ bietet dabei laut GitHub mehr als das **5-fache** der Limits gegenüber Pro. Drittens sind **Opus-Modelle** ab sofort nicht mehr in Pro-Plänen verfügbar. Opus 4.7 bleibt Pro+-exklusiv, während Opus 4.5 und 4.6 laut einem separaten Changelog-Eintrag auch aus Pro+ entfernt werden.

Das Limit-System selbst besteht aus zwei Ebenen: Session-Limits schützen gegen kurzfristige Lastspitzen, Weekly-Limits (7-Tage-Fenster) deckeln den Gesamt-Token-Verbrauch – unabhängig von verbleibenden Premium Requests. Wer das Weekly-Limit trifft, kann zwar weiter mit Auto-Modellauswahl arbeiten, verliert aber die manuelle Modellwahl bis zur wöchentlichen Periode-Rücksetzung. Neu: VS Code und Copilot CLI zeigen ab sofort Warnungen an, sobald man sich dem Limit nähert (z.B. "You've used over 75% of your weekly usage limit").

## Was bedeutet das für KI-Automation-Engineers?

Das verändert konkret, wie Workflows mit GitHub Copilot geplant werden müssen: Wer heute parallele Agentic-Sessions, `/fleet`-Kommandos oder lang laufende Multi-Step-Agents produktiv einsetzt, wird früher als erwartet gegen ein Limit laufen – und der Schmerz steigt proportional zur Modell-Multiplikator-Größe. Wer Opus-Modelle in Pro nutzte, muss auf Pro+ upgraden oder auf kleinere Modelle ausweichen. Für Teams, die Copilot in CI/CD-Pipelines oder autonome Coding-Agents (z.B. über n8n, Make oder direkten API-Aufruf) eingebunden haben, ist eine Audit der Token-Verbräuche jetzt keine Option mehr, sondern Pflicht. GitHub hat zwar für bestehende Nutzer eine Rückerstattungs-Option bis zum 20. Mai 2026 angekündigt – das ist aber eher ein Sicherheitsnetz als eine Lösung.

## Quellen & Weiterführende Links

- 📰 [Original-Ankündigung: Changes to GitHub Copilot Individual plans](https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/)
- 📚 [GitHub Changelog: Claude Opus 4.7 is generally available](https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/)
- 🎓 **Workshops & Kurse** (verifiziert via workshops.de API):
  - [KI Software Engineer: Modul 2 - Evals, Multi-Agentic-Workflows](https://workshops.de/seminare/ki-dev-modul-2) — direkt relevant für das Verständnis und Optimierung von agentic Workflows
  - [n8n: Modul 2 - Multi-Agent-Systeme & MCPs](https://workshops.de/seminare/n8n-multi-agent-systeme-mcp-server) — für alle, die Copilot in automatisierte Pipelines integrieren