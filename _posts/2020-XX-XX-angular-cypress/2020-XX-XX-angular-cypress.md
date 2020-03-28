---
title: "E2E Tests für Angular mit Cypress und TypeScript in unter 60 Minuten bereit für Continuous Integration"
description: "Cypress ist ein Framework zum Schreiben von E2E Tests für Browser-Applikation. Wir werden am Beispiel von Angular erste E2E Tests mit TyeScript schreiben und sie zur Ausführung auf CircleCI als Continunous Integration System vorbereiten."
author: "David Würfel"
published_at: 2020-XX-XX- HH:MM.SS.000000Z
header_source: https://unsplash.com/photos/ XXXXXXXX-TODO!
categories: "cypress testing angular typescript circleci tutorial"
---

> Der folgende Artikel möchte dir zeigen, wie du *End-to-End Testing* für *Angular* mit *Cypress* und *TypeScript* aufsetzt. Du wirst erste E2E Tests schreiben und sie zur Ausführung auf *CircleCI* als Continunous Integration System vorbereiten, sodass sie mit jedem Push auf dein Repository ausgeführt werden.

# Bevor wir starten: Was ist ein E2E Test?
> End-to-End *(kurz E2E)* Testing ist eine Art des Software Testings, welches nicht nur das Software System an sich validiert, sondern auch dessen Zusammenspiel mit externen Schnittstellen und deren Intergation. End-to-End Tests schreibt man, um vollständige, Szenarien, die einem Produktivsystem entsprechen durchzuspielen

*Quelle (frei übersetzt): https://www.guru99.com/end-to-end-testing.html*

# Überblick
- [Was ist Cypress?](#cypress)
- [Vorbedingungen](#pre)
- [Cypress aufsetzen](#setup)
- [Erste Tests](#tests)
- [Continuous Integration aufsetzen](#ci)
- [Fazit und Referenzen](#summary)

Früher habe ich in der Frontend Entwicklung mit [Microsofs .NET und WPF](https://docs.microsoft.com/en-US/dotnet/framework/wpf/) gearbeitet und erinnere mich noch gut an die Zeiten, in denen wir kostenintensive Frameworks zum Schreiben von End-to-End Tests für unsere Projekte evaluiert haben. Nach vielen Wochen, sogar Monaten der Evaluation, der Entwicklung von speziellem *Glue-Code* oder einer eigenen Test Infrastruktur auf Basis bereits existierender Werkzeuge, hatten wir es endlich geschafft unsere E2E Tests zum Laufen zu bekommen. Leider waren sie ziemlich brüchig und sind oft fehlgeschlagen, weil wir händische Anpassungen machen musste oder Probleme hatten mit unzuverlässigen Test Runnern in unsere Continuous Integration Pipeline.

Ein paar Jahre später mit [Angular](https://angular.io/) und [Protractor](https://www.protractortest.org/#/) als voreingestelltem E2E Testing Framework sind die Tests weiterhin basierend auf sogenannten [Page Objects](https://www.protractortest.org/#/page-objects) und dem [Selenium Web Driver](https://www.selenium.dev/). Unzuverlässig sind sie immer noch. Keine teuren, kommerziellen Frameworks oder maßgeschneiderte Infrastruktur war mehr notwendig. Aber hat es Spaß gemacht E2E Tests zu schreiben? Nein.

Mittlerweile sind wir aber im Jahr 2020 angekommen und die Zeit zum Aufstieg neuer Helden ist angebrochen. 🚀

# Was ist Cypress<a name="cypress"></a>
[Cypress](https://cypress.io) verspricht *schnelles, einfaches und zuverlässiges Testing für alles was im Browser läuft*. Es basiert nicht auf dem Selenium Web Driver, der Netzwerk Verbindungen nutzt, um mit dem Browser zu interagieren. Stattdessen ist Cypress ein Test Runner, der *im Inneren* deines Browsers neben deiner Web Applikation läuft und darum direkten Zugriff auf diese hat.

Ohne an dieser Stelle auf alle Details einzugehen, ist dadurch Cypress nicht nur schneller und zuverlässiger, es ebnet den Weg für viele weitere interessante Eigenschaften wie beispielsweise
* Debugging mit Zeitreisefunktion
* Einfaches Aufzeichnen von Videos und Screenshots des Testlaufs
* Automatisierte Wartemechanismen

Zusätzlich zu all diesen Besonderheiten hat Cypress eine sogenannte Developer Experience (*DX*) die kaum zu toppen ist. Hast du jemals eine bei einem fehlgeschlagenem eine [Fehlermeldung](https://www.cypress.io/blog/2017/07/26/good-error-messages/) gesehen, die dir genau sagt, was du falsch gemacht hast, dir aufzeigt, welche Abhängigkeiten hinzugefügt werden müssen und dich darüber hinaus noch an eine verständliche Dokumentationsseite verweist, die das Problem im Detail beschreibt? So fühlt sich Cypress an: Es ist gemacht von Entwicklern für Entwickler.

<img src="/assets/img/placeholder-image.svg" alt="Cypress Fehlermeldung auf dem Build-Server, die genau sagt, wie der Fehler zu beheben sei" class="lazy center" data-src="02-cy-error.png" data-srcset="02-cy-error.png"
 />

Gleich werden wir Cypress für ein frisches, mit der CLI erstellte Angular Projekt installieren. Wir werden ein paar E2E Test schreiben und sie am Ende von einem automatisierten Build-System laufen lassen. Die Gesamtheit dieser Schritte sollten nicht länger als 60 Minuten in Anspruch nehmen. Wir werden versuchen, diese Schritte so kurz wie möglich zu halten und existierende Werkzeuge wie [Angular Schematics](https://angular.io/guide/schematics), Bibliotheken oder bekannte Vorlagen zu unserem Vorteil einsetzen.

# Vorbedingungen<a name="pre"></a>
Diese Anleitung setzt voraus, dass du bereits mit einem standardmäßigen Angular 9 Projekt arbeitest. Falls dies noch nicht der Fall ist, kannst du ein neues mit der [Angular CLI](https://angular.io/cli/new) erstellen. Wenn du die CLI nicht global installiert hast, kannst du dir den [`npx`](https://www.npmjs.com/package/npx) Befehl zur Nutze machen, der die CLI temporär installiert:

```sh
npx @angular/cli new <app-name>
```

# Cypress aufsetzen<a name="setup"></a>
Um Cypress zusammen mit TypeScript so schnell wie möglich aufzusetzen, nutzen wir eine existierende, von [BrieBug](https://www.npmjs.com/package/@briebug/cypress-schematic) entwickelte Schematic.

Im Wurzelverzeichnis deines Angular Projekts kannst du das Terminal öffnen und folgenden Befehl eingeben:

```sh
ng add @briebug/cypress-schematic --addCypressTestScripts
```

Falls die CLI nicht global installiert ist, könnte es sein, dass der `ng` Befehl nicht direkt verfügbar ist. Du kannst den Aufruf des lokalen `ng` aus der `package.json` erzwingen:

```sh
npm run ng -- add @briebug/cypress-schematic # Falls 'ng' allein nicht gefunden werden konnte
```

Wir können ohne Bedenken Protractor entfernen, weil es vollständig ersetzt wird. Während der Installation werden ein paar Binardateien heruntergeladen, da Cypress Test Runner als eine in [Electron](https://www.electronjs.org/) gepackten Oberfläche kommt.

Durch die Verwendung des Parameters `--addCypressTestScripts` werden zwei nützliche npm Skripte hinzugefügt, die das Arbeiten mit Cypress komfortabler machen: Eins, um die E2E Tests mit, das andere, um die Tests ohne die Oberfläche auszuführen.

```json
    // package.json Skripte

    "cy:run": "cypress run",
    "cy:open": "cypress open"
```

Würde man eines dieser Skripte laufen lassen, würde der Test zunächst fehlschlagen, weil er versuchen würde auf *http://localhost:4200* zu navigieren, wo aktuell noch nichts bereitgestellt wird. Um das zu beheben, können wir ein zweites Konsolenfenster öffnen und unser Angular Applikation vorher mit `npm start` bereitstellen.

Glücklicherweise passt die vorherige Schematic den `e2e` Befehl so an, dass dies für uns automatisch von einem sogenannten [CLI Builder](https://angular.io/guide/cli-builder) durchgeführt wird. Mit folgendem Befehl liefern wir die Anwendung aus und lassen den Test dagegen laufen:

```sh
npm run e2e
```

Cypress erkennt, dass es zum ersten Mal ausgeführt wird. Es verifiziert seine Installation und fügt ein paar grundlegende Beispieldateien hinzu. Nachdem die Oberfläche öffnet, können wir einen Test sehen, der bereits für uns erstellt wurde.

<img src="/assets/img/placeholder-image.svg" alt="Cypress Oberfläche nach cy:open oder e2e" class="lazy center" data-src="03-cy-open.png" data-srcset="03-cy-open.png"
 />

Wählt man diesen Test aus, so wird er ausgeführt. Initial wird er fehlschlagen, weil wir tatsächlich noch nichts vernünftiges testen. Das werden wir nun beheben.

<img src="/assets/img/placeholder-image.svg" alt="Fehlschlagender Test, der aktuell noch nicht implementiert ist" class="lazy center" data-src="04-cy-test.png" data-srcset="04-cy-test.png"
 />

# Erste Tests<a name="tests"></a>
Wie von den Cypress [Best Practices](https://docs.cypress.io/guides/references/best-practices.html) vorgeschlagen, setzen wir als ersten Schritt die [globale Basis-URL](https://docs.cypress.io/guides/references/best-practices.html#Setting-a-global-baseUrl), sodass wir diese Adresse nicht bei jeder Testausführung duplizieren müssen. Dazu fügen wir die folgende Konfiguration der Datei `cypress.json` hinzu:

```json
// cypress.json
{
  "baseUrl": "http://localhost:4200"
}
```

Danach schreiben wir unseren ersten [*Smoke Test*](https://de.wikipedia.org/wiki/Smoke_testing), der nur prüft, ob der standard Applikationstitel der Angular Startseite gesetzt ist. Dazu ändern wir den Inhalt von `spec.ts` auf folgenden:

```ts
// spec.ts
it('smoke test', () => {
  cy.visit('/');
  cy.contains('cypress-e2e-testing-angular app is running!');
});
```

Der Test startet indem er zu unserer Basis-URL navigiert und danach nach einem beliebigem Element sucht, dass den Text *cypress-e2e-testing-angular app is running!* enthält.

## Nutzerverhalten testen
Dieser Test sollte bereits funktionieren, aber wir sollten doch etwas interaktivere schreiben. Weil E2E Tests von Natur aus langsamer sind als Unit Tests, ist es völlig in Ordnung E2E Test zu schreiben, die einen gesamten Ablauf eines Benutzers bezogen auf eine Funktionalität modellieren.

Zum Beispiel wollen wir prüfen, ob die Eigenschaften der eben erwähnten Startseite gültig sind: Unsere Seite sollte ihren Titel anzeigen und darunter im Konselenfenster standardmäßig den Text `ng generate`. Klickt der Nutzer nun auf den *Angular Material* Button, wollen wir sicherstellen, dass das richtige Kommando `ng add` in der Konsolenansicht darunter erscheint.

Du kannst folgenden Inhalt deiner Testdatei hiermit ersetzen:

```ts
// spec.ts
describe('When Angular starting page is loaded', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has app title, shows proper command by default and reacts on command changes', () => {
    cy.contains('cypress-e2e-testing-angular');

    cy.contains('.terminal', 'ng generate component xyz');

    cy.contains('Angular Material').click();
    cy.contains('.terminal', 'ng add @angular/material');
  });
});
```

Wir haben unsere Testreihe etwas umgestellt, indem wir einen `describe` Block hinzugefügt haben, um alle Tests zu gruppieren, die sich auf unsere Startseite beziehen. Da wir in jedem Test die `baseUrl` besuchen, haben wir dies in den `beforeEach` Aufruf verschoben. Zu guter Letzt kombinieren wir unseren existierenden Smoke Test mit dem Test für die Konselenfenster-Ansicht auf der Startseite.

Es ist wichtig zu wissen, dass man die Ergebnisse der Cypress Anfragen nicht in Variablen zwischenspeichert, sondern stattdessen [Closures](https://docs.cypress.io/guides/references/best-practices.html#Assigning-Return-Values) verwenden sollte. Darüber hinaus wählen wir aktuell unsere Element über CSS Klassen oder sogar Textinhalt aus, was sehr brüchig sein kann. Hier wir empfohlen `data-` Attribute zur [Auswahl von Elementen](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements) zu nutzen.

Cypress hat eine Menge toller Funktionalitäten und Möglichkeiten. Wir können hier nicht alle von ihnen behandeln, da unser Fokus darauf liegt, einen ersten Startpunkt zu finden. Die offizielle Dokumentation ist allerdings sehr gute und liefert alle Informationen, wie man [mit verschiedenen Elementen interagiert](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Actionability).

Lassen wir unsere Testreihe nochmal laufen, sollten wir sehen wie er sich durch jedes Szenario durchklickt und unsere 3 Abfragen sollten diesmal gelingen. ✔✔✔

<img src="/assets/img/placeholder-image.svg" alt="Unsere erste Cypress Testreihe erfolgreich laufen lassen" class="lazy center" data-src="05-cy-workflow.gif" data-srcset="05-cy-workflow.gif"
 />

# Continuous Integration aufsetzen<a name="ci"></a>
Da unsere Tests nun local laufen, möchten wir als nächsten eine kleine CI ([Continuous Integration](https://de.wikipedia.org/wiki/Kontinuierliche_Integration)) Pipeline aufsetzen. Ein guter Weg sich darauf vorzubereiten, ist es ein paar npm Skripte anzulegen und diese zu kombinieren, sodass das Build-System ein einziges Skript als Einstiegspunkt aufrufen kann. Wenn wir diese Methode verfolgen, können wir auch die CI Schritte vor dem Push auf den Server zuvor lokal ausprobieren. Weiterhin sind diese npm Skripte eher unabhängig von einem tatsächlich verwendeten Build-System.

Auf dem CI-Server müssen wir den Webserver im Hintergrund starten und darauf warten, dass unsere Anwendung gebaut wird, was etwas dauern kann. Danach muss der Cypress Testrunner gestartet werden, durch alle Tests gehen und nach Abschluss der Tests den Server herunterfahren. Praktischerweise können wir dies mit einem einzigen Hilfsmittel namens *start-server-and-test* tun, wie es in der [Cypress Dokumentation]((https://docs.cypress.io/guides/guides/continuous-integration.html#Solutions)) beschrieben ist.

```sh
npm install --save-dev start-server-and-test
```

Nachdem dies installiert ist, können wir den Angular `serve` Befehl nutzen, der über `npm start` aufgerufen wird und ihn mit dem oberflächenlosen `cy:run` Kommando verbinden.

```json
   // package.json Skripte
  "start": "ng serve",
  "cy:run": "cypress run",
  "e2e:ci": "start-server-and-test start http://localhost:4200 cy:run"
```

Selbstverständlich könnte man auch einen Produktiv-Build nutzen oder vorher einen Build ausführen und die Applikation über einen beliebigen Http-Server ausliefern. Um es kurz zu halten, möchte ich diese Verbesserung dir überlassen.

## Circle CI
Für unser Beispiel nutzen wir [CircleCI](https://circleci.com/) weil es sich sehr gut mit GitHub integriert, sehr weit verbreitet ist und eine freie Nutzung erlaubt. Die letzliche Wahl eines anderen CI-Systems wie [Jenkins](https://jenkins.io/) oder [GitLab](https://about.gitlab.com/)(mit dem ich die meiste Erfahrung gesammelt habe) ist dir selbst überlassen. Nachdem man sich bei CircleCI angemeldet und seinen GitHub Account verbunden hat, kann man ein Repository auswählen und ein neues Projekt über das CircleCI-Dashboard erstellen.

Um die Pipeline zu konfigurieren, könnten wir durch Auswahl einer Vorlage die `config.yml` schreiben und sie auf unsere Bedürfnisse hin anpassen um schlussendlich unser E2E Skript aufzurufen. Erfreulicherweise bringt Cypress bereits eine [fertig nutzbare Konfiguration](https://github.com/cypress-io/circleci-orb) (als sogenannten [Orbs](https://github.com/cypress-io/circleci-orb/blob/master/docs/examples.md)) für CircleCI mit, weöche bereit die Installation von Abhängigkeiten, Caching und mehr beinhaltet. Bevor wir diese allerdings nutzen können, müssen wir erst über die *Organisation Settings* die [Drittanbieter Runner aktivieren](https://github.com/cypress-io/circleci-orb#how-to-enable).

```yml
# circleci/config.yml

version: 2.1
orbs:
  # This Orb includes the following:
  # - checkout current repository
  # - npm install with caching
  # - start the server
  # - wait for the server to respond
  # - run Cypress tests
  # - store videos and screenshots as artifacts on CircleCI
  cypress: cypress-io/cypress@1
workflows:
  build:
    jobs:
      - cypress/run:
          start: npm start
          wait-on: 'http://localhost:4200'
          store_artifacts: true
```

Die Pipeline hat nur eine Aufgabe: Alle E2E Tests ausführen. Der aktuelle Git-Branch wir ausgecheckt, alle Abhängigkeiten installiert inklusive Caching, der Applikations-Server wird gestartet und die Tests werden ausgeführt. Zusätzlich werden standardmäßig Videos des Testdurchlaufs aufgezeichnet und Screenshots (im Falle von fehlschlagenden Tests) und am Ende als CircleCI Artefakte zur späteren Analyse hochgeladen.*

<img src="/assets/img/placeholder-image.svg" alt="CircleCI Dashboard" class="lazy center" data-src="06-circleci.png" data-srcset="06-circleci.png"
 />

<iframe width="560" height="315" src="https://www.youtube.com/embed/w3BVGdNIhFg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Fazit<a name="summary"></a>
Die Schritte in dieser Anleitung sind sehr minimal. Du könntest dein existierendes Angular Projekt nutzen, du kannst die Konfiguration der Cypress Testreihen ändern oder deutlich mehr und aussagekräftigere Tests schreiben. Darüber hinaus könnte es dir nützen, npm Skripte für unter unterschiedliche Szenarien oder Umgebungen zu schreiben und natürlich die gesamte Build-Pipeline mit automatischen Codeprüfungen, Unit Tests, dem Bauprozess oder der Auslieferung deiner Anwendung zu erweitern. Dennoch sollte dies ein erster Schritt sein, der zeigt, wie schnell man automatisierte Ende-zu-Ende Tests heutzutage aufsetzen kann.

Warte nur, bis du deine ersten echten Cypress Tests für deine Anwendung schreibst. Du wirst Spaß haben!

<img src="/assets/img/placeholder-image.svg" alt="Animiertes Bild, das eine überwältigte Person zeigt" class="lazy center" data-src="08-mind-blown.gif" data-srcset="08-mind-blown.gif"
 />

Ich hoffe, du hast etwas nützliches aus dem Artikel ziehen können. Bei Fragen oder Anmerkungen, lass es mich wissen. Rückmeldung ist immer sehr willkommen!

Der Quellcode für diese Anleitung ist auf GitHub zu finden:
[https://github.com/MrCube42/cypress-e2e-testing-angular](https://github.com/MrCube42/cypress-e2e-testing-angular)

### Quellen und Hinweise<a name="references"></a>
* Für andere CI-System könnte man unser vorher definiertes npm Skript nutzen. Jedoch müssten wir uns dann um all die zusätzlichen Hilfsmittel selbst kümmern. Falls du bereits eine weit entwickelte Pipeline hast, könnte es ein einfachere Weg sein, nur das eine Skript zu integrieren.

- [Offizielle Angular Dokumentation](https://angular.io/docs)
- [Briebug Cypress Schematic](https://github.com/briebug/cypress-schematic)
- [Offizielle Cypress Dokumentation](https://docs.cypress.i)
- [CircleCI](https://circleci.com/)
