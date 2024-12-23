---
title: "E2E Tests für Angular mit Cypress und TypeScript in unter 60 Minuten bereit für Continuous Integration"
description: "Cypress ist ein Framework zum Schreiben von E2E Tests. Wir werden unsere ersten E2E Tests schreiben und sie zur Ausführung auf CircleCI vorbereiten."
author: "David Würfel"
published_at: 2020-03-30 10:15:01.000000Z
header_source: https://unsplash.com/photos/MPWwkkqDVG0
categories: "cypress testing typescript"
---

> Der folgende Artikel möchte zeigen, wie ihr *End-to-End Testing* für *Angular* mit *Cypress* und *TypeScript* aufsetzt. Wir werden erste E2E Tests schreiben und sie zur Ausführung auf *CircleCI* als Continunous Integration System vorbereiten, sodass sie mit jedem Push auf euer Repository ausgeführt werden.

# Bevor wir starten: Was ist ein E2E Test?
> End-to-End *(kurz E2E)* Testing ist eine Art des Software Testings, welches nicht nur das Software-System an sich validiert, sondern auch dessen Zusammenspiel mit externen Schnittstellen und deren Intergation. E2E Tests schreibt man, um vollständige Szenarien durchzuspielen, die einem Produktivsystem entsprechen.

*Quelle (frei übersetzt): https://www.guru99.com/end-to-end-testing.html*

# Überblick
- [Bevor wir starten: Was ist ein E2E Test?](#bevor-wir-starten-was-ist-ein-e2e-test)
- [Überblick](#überblick)
- [Was ist Cypress](#was-ist-cypress)
- [Vorbedingungen](#vorbedingungen)
- [Cypress aufsetzen](#cypress-aufsetzen)
- [Erste Tests](#erste-tests)
  - [Nutzerverhalten testen](#nutzerverhalten-testen)
- [Continuous Integration aufsetzen](#continuous-integration-aufsetzen)
  - [Circle CI](#circle-ci)
- [Fazit](#fazit)
    - [Quellen und Hinweise](#quellen-und-hinweise)

Früher habe ich in der Frontend Entwicklung mit [.NET und WPF von Microsoft](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/?view=netdesktop-9.0) gearbeitet und erinnere mich noch gut an die Zeiten, in denen wir kostenintensive Frameworks zum Schreiben von End-to-End Tests für unsere Projekte evaluiert haben. Nach vielen Wochen, sogar Monaten der Evaluation, der Entwicklung von speziellem *Glue-Code* oder einer eigenen Test-Infrastruktur auf Basis existierender Werkzeuge, hatten wir es endlich geschafft, unsere E2E Tests zum Laufen zu bekommen. Leider waren sie ziemlich brüchig und sind oft fehlgeschlagen. Wir mussten händische Anpassungen machen oder hatten Probleme mit unzuverlässigen Test-Runnern in unserer Continuous Integration Pipeline.

Ein paar Jahre später mit [Angular](https://angular.dev/) und [Protractor](https://www.protractortest.org/#/) als voreingestelltem E2E Testing-Framework sind die Tests weiterhin basierend auf sogenannten [Page Objects](https://www.protractortest.org/#/page-objects) und dem [Selenium Web Driver](https://www.selenium.dev/). Unzuverlässig sind sie immer noch. Keine teuren, kommerziellen Frameworks oder maßgeschneiderte Infrastruktur war mehr notwendig. Aber hat es Spaß gemacht E2E Tests zu schreiben? Nein.

Mittlerweile sind wir aber im Jahr 2020 angekommen und die Zeit zum Aufstieg neuer Helden ist angebrochen. 🚀

# Was ist Cypress<a name="cypress"></a>
[Cypress](https://cypress.io) verspricht *schnelles, einfaches und zuverlässiges Testing für Alles, was im Browser läuft*. Es basiert nicht auf dem Selenium Web Driver, der Netzwerk Verbindungen nutzt, um mit dem Browser zu interagieren. Stattdessen ist Cypress ein Test Runner, der *im Inneren* eures Browsers neben der Web Applikation läuft und darum direkten Zugriff auf diese hat.

Ohne an dieser Stelle auf alle Details einzugehen, ist dadurch Cypress nicht nur schneller und zuverlässiger, es ebnet auch den Weg für viele weitere interessante Eigenschaften wie beispielsweise
* Debugging mit Zeitreisefunktion
* Einfaches Aufzeichnen von Videos und Screenshots des Testlaufs
* Automatisierte Wartemechanismen

Zusätzlich zu all diesen Besonderheiten hat Cypress eine *Developer Experience* (*DX*), die kaum zu toppen ist. Habt ihr jemals eine [Fehlermeldung](https://www.cypress.io/blog/2017/07/26/good-error-messages/) gesehen, die euch genau sagt, was ihr falsch gemacht habt, euch aufzeigt, welche Abhängigkeiten hinzugefügt werden müssen und euch darüber hinaus noch zu einer verständliche Dokumentation leitet, die das Problem im Detail beschreibt? So fühlt sich Cypress an: Es ist gemacht von Entwicklern für Entwickler.

<img src="/shared/assets/img/placeholder-image.svg" alt="Cypress Fehlermeldung auf dem Build-Server, die genau sagt, wie der Fehler zu beheben sei" class="lazy" data-src="02-ci-error.png" data-srcset="02-ci-error.png"
 />

Gleich werden wir Cypress für ein frisches, mit der CLI erstelltes Angular Projekt installieren. Wir werden ein paar E2E Test schreiben und sie am Ende von einem automatisierten Build-System laufen lassen. Die Gesamtheit dieser Schritte sollte nicht länger als 60 Minuten in Anspruch nehmen. Wir werden versuchen, die Schritte so kurz wie möglich zu halten und existierende Werkzeuge wie [Angular Schematics](https://v17.angular.io/guide/schematics), Bibliotheken oder bekannte Vorlagen zu unserem Vorteil einzusetzen.

# Vorbedingungen<a name="pre"></a>
Diese Anleitung setzt voraus, dass wir bereits mit einem standardmäßigen Angular 9 Projekt arbeiten. Falls dies noch nicht der Fall ist, können wir ein neues mit der [Angular CLI](https://v17.angular.io/cli/new) erstellen. Wenn wir die CLI nicht global installiert haben, können wir uns den [`npx`](https://www.npmjs.com/package/npx) Befehl zu Nutze machen, der die CLI temporär installiert:

```sh
npx @angular/cli new <app-name>
```

# Cypress aufsetzen<a name="setup"></a>
Um Cypress zusammen mit TypeScript so schnell wie möglich aufzusetzen, nutzen wir die vom [Cypress-Team](https://www.npmjs.com/package/@cypress/schematic) entwickelte Schematic.

Im Wurzelverzeichnis des Angular Projekts öffnen wir das Terminal und geben folgenden Befehl ein:

```sh
ng add @cypress/schematic
```

Falls die CLI nicht global installiert ist, könnte es sein, dass der `ng` Befehl nicht direkt verfügbar ist. Wir können den Aufruf des lokalen `ng` aus der `package.json` erzwingen:

```sh
# Falls 'ng' allein nicht gefunden werden konnte
npm run ng -- add @cypress/schematic
```

Wir können ohne Bedenken Protractor entfernen, weil es vollständig ersetzt wird. Während der Installation werden ein paar Binardateien heruntergeladen, da der Cypress Test-Runner eine in [Electron](https://www.electronjs.org/) gepackte Oberfläche ist.

Bei der Installation wurden zwei nützliche npm Skripte hinzugefügt, die das Arbeiten mit Cypress komfortabler machen: Eins, um die E2E Tests mit, das andere, um die Tests ohne die Benutzeroberfläche auszuführen.

```json
    // package.json Skripte

    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
```

Würde man eines dieser Skripte alleinstehend laufen lassen, würde der Test zunächst fehlschlagen, weil er versuchen würde auf *http://localhost:4200* zu navigieren, wo aktuell noch nichts bereitgestellt wird. Um das zu beheben, können wir ein zweites Konsolenfenster öffnen und unsere Angular Applikation vorher mit `npm start` bereitstellen.

Glücklicherweise passt die vorherige Schematic den `e2e` Befehl so an, dass dies für uns automatisch von einem sogenannten [CLI Builder](https://v17.angular.io/guide/cli-builder) durchgeführt wird. Mit folgendem Befehl liefern wir die Anwendung aus und lassen den Test dagegen laufen:

```sh
npm run e2e
```

Cypress erkennt, dass es zum ersten Mal ausgeführt wird. Es verifiziert seine Installation und fügt ein paar grundlegende Beispieldateien hinzu. Nachdem die Oberfläche startet, können wir bereits einen Test sehen, der für uns erstellt wurde.

<img src="/shared/assets/img/placeholder-image.svg" alt="Cypress Oberfläche nach cypress:open oder e2e" class="lazy" data-src="03-cy-open.png" data-srcset="03-cy-open.png"
 />

Der Test wird ausgeführt, sobald wir ihn auswählen. Initial wird er fehlschlagen, weil wir tatsächlich noch nichts wirklich testen. Das werden wir nun beheben.

<img src="/shared/assets/img/placeholder-image.svg" alt="Fehlschlagender Test, der aktuell noch nicht implementiert ist" class="lazy" data-src="04-cy-test.png" data-srcset="04-cy-test.png"
 />

# Erste Tests<a name="tests"></a>
Wie von den Cypress [Best Practices](https://docs.cypress.io/guides/references/best-practices.html) vorgeschlagen, setzen wir als ersten Schritt die [globale Basis-URL](https://docs.cypress.io/guides/references/best-practices.html#Setting-a-global-baseUrl), sodass wir diese Adresse nicht bei jeder Testausführung duplizieren müssen. Dazu fügen wir die folgende Konfiguration der Datei `cypress.json` hinzu:

```json
// cypress.json
{
  "baseUrl": "http://localhost:4200"
}
```

Danach schreiben wir unseren ersten [*Smoke Test*](https://de.wikipedia.org/wiki/Smoke_testing), der nur prüft, ob der standardmäßige Titel der Applikation auf der Angular Startseite gesetzt ist. Dazu ändern wir den Inhalt von `spec.ts` auf folgenden:

```ts
// spec.ts
it('smoke test', () => {
  cy.visit('/');
  cy.contains('cypress-e2e-testing-angular app is running!');
});
```

Der Test startet, indem er zu unserer Basis-URL navigiert und nach einem beliebigem Element sucht, dass den Text *cypress-e2e-testing-angular app is running!* enthält.

## Nutzerverhalten testen
Obwohl dieser Test bereits funktioniert, möchten wir nun etwas interaktivere schreiben. Weil E2E Tests von Natur aus langsamer sind als Unit Tests, ist es völlig in Ordnung solche zu schreiben, die einen gesamten Ablauf eines Benutzerverhaltens bezogen auf eine Funktionalität modellieren.

Nun wollten wir bespielsweise prüfen, ob die Eigenschaften der eben erwähnten Startseite gültig sind: Unsere Seite sollte ihren Titel anzeigen und darunter im Konselenfenster den Text `ng generate`. Klickt der Nutzer dann auf den *Angular Material* Button, wollen wir sicherstellen, dass das richtige Kommando `ng add` in der Konsolenansicht darunter erscheint.

Wir ersetzen den Inhalt unserer Testdatei mit folgendem Inhalt:

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

Unsere Testreihe haben wir etwas umgestellt, indem wir einen `describe` Block hinzugefügt haben, um alle Tests zu gruppieren, die sich auf unsere Startseite beziehen. Da wir in jedem Test die Basis-URL besuchen, haben wir dies in den `beforeEach` Aufruf verschoben. Zu guter Letzt kombinieren wir unseren existierenden Smoke Test mit dem Test für die Konsolenfenster-Ansicht der Startseite.

Es ist wichtig zu wissen, dass man die Ergebnisse der Cypress Anfragen nicht in Variablen zwischenspeichert, sondern stattdessen [Closures](https://docs.cypress.io/guides/references/best-practices.html#Assigning-Return-Values) verwenden sollte. Darüber hinaus wählen wir aktuell unsere Element über CSS Klassen oder sogar Textinhalt aus, was sehr brüchig sein kann. Hier wird empfohlen `data-` Attribute zur [Auswahl von Elementen](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements) zu nutzen.

Cypress hat eine Menge toller Funktionalitäten und Möglichkeiten. Wir können hier nicht alle von ihnen behandeln, da unser Fokus darauf liegt, einen ersten Startpunkt zu geben. Die sehr gute, offizielle Dokumentation liefert alle Informationen, wie man [mit verschiedenen Elementen interagiert](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Actionability).

Lassen wir unsere Testreihe nochmal laufen, sollten wir sehen, wie sich Cypress durch jedes Szenario durchklickt. Unsere 3 Prüfungen sollten diesmal gelingen. ✔✔✔

<img src="/shared/assets/img/placeholder-image.svg" alt="Unsere erste Cypress Testreihe erfolgreich laufen lassen" class="lazy" data-src="05-cy-workflow.gif" data-srcset="05-cy-workflow.gif"
 />

# Continuous Integration aufsetzen<a name="ci"></a>
Aktuell laufen unsere Tests nur lokal, daher möchten wir als Nächstes eine kleine CI ([Continuous Integration](https://de.wikipedia.org/wiki/Kontinuierliche_Integration)) Pipeline aufsetzen. Ein guter Weg sich darauf vorzubereiten, ist es, ein paar npm Skripte anzulegen und diese zu kombinieren, sodass das Build-System ein einziges Skript als Einstiegspunkt aufrufen kann. Wenn wir diese Methode verfolgen, können wir auch die CI Schritte vor dem Push auf den Server zuvor lokal ausprobieren. Weiterhin sind diese Skripte recht unabhängig von einem tatsächlich verwendeten Build-System.

Auf dem CI-Server müssen wir den Webserver im Hintergrund starten und darauf warten, dass unsere Anwendung gebaut wird, was etwas dauern kann. Danach muss der Cypress Test-Runner gestartet werden, durch alle Tests gehen und nach Abschluss der Tests den Server herunterfahren. Praktischerweise gibt es dafür das Hilfsmittel namens *start-server-and-test*, wie in der [Cypress Dokumentation]((https://docs.cypress.io/guides/guides/continuous-integration.html#Solutions)) beschrieben.

```sh
npm install --save-dev start-server-and-test
```

Nachdem es installiert ist, können wir den Angular *serve* Befehl nutzen, der über `npm start` aufgerufen wird und ihn mit dem `cy:run` Kommando verbinden, der die Tests ohne Start einer Benutzeroberfläche ausführt.

```json
   // package.json Skripte
  "start": "ng serve",
  "cy:run": "cypress run",
  "e2e:ci": "start-server-and-test start http://localhost:4200 cy:run"
```

Selbstverständlich könnte man auch einen Produktiv-Build nutzen oder vorher einen Build ausführen und die Applikation über einen beliebigen Http-Server ausliefern. Allerdings möchten wir es hier kurz halten und überlassen diese Verbesserung dem Leser.

## Circle CI
Für unser Beispiel nutzen wir [CircleCI](https://circleci.com/), weil es sich gut mit GitHub integriert, weit verbreitet ist und eine freie Nutzung erlaubt. Die letztliche Wahl eines CI-Systems wie [Jenkins](https://jenkins.io/) oder [GitLab](https://about.gitlab.com/)(mit dem ich die meiste Erfahrung gesammelt habe) ist euch selbst überlassen. Nachdem wir uns bei CircleCI angemeldet und unseren GitHub Account verbunden haben, können wir ein Repository auswählen und ein neues Projekt über das CircleCI-Dashboard erstellen.

Um die Pipeline zu konfigurieren, könnten wir durch Auswahl einer Vorlage die `config.yml` selbst schreiben und sie auf unsere Bedürfnisse hin anpassen, um schlussendlich unser E2E Skript aufzurufen. Erfreulicherweise bringt Cypress bereits eine [fertig nutzbare Konfiguration](https://github.com/cypress-io/circleci-orb) (als sogenannten [Orb](https://circleci.com/developer/orbs)) für CircleCI mit, welche bereits die Installation von Abhängigkeiten, Caching und mehr beinhaltet. Bevor wir diese allerdings nutzen können, müssen wir erst für CircleCI über die *Organisation Settings* die [Drittanbieter Runner aktivieren](https://github.com/cypress-io/circleci-orb#how-to-enable):

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

Die Pipeline hat nur eine Aufgabe: Führe alle E2E Tests aus. Der aktuelle Git-Branch wird ausgecheckt, alle Abhängigkeiten inklusive Caching installiert, der Applikations-Server wird gestartet und die Tests werden ausgeführt. Zusätzlich werden standardmäßig Videos des Testdurchlaufs und Screenshots (im Falle von fehlschlagenden Tests) aufgezeichnet und am Ende als CircleCI Artefakte zur späteren Analyse hochgeladen.*

<img src="/shared/assets/img/placeholder-image.svg" alt="CircleCI Dashboard" class="lazy" data-src="06-circleci.png" data-srcset="06-circleci.png">

<iframe class="" width="100%" height="315" src="https://www.youtube-nocookie.com/embed/w3BVGdNIhFg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Fazit<a name="summary"></a>
Die Schritte in dieser Anleitung sind sehr minimal gehalten. Ihr könntet euer existierendes Angular Projekt nutzen, ihr könnt die Konfiguration der Cypress Testreihen ändern oder deutlich mehr und aussagekräftigere Tests schreiben. Darüber hinaus könnte es euch nützen, npm Skripte für unterschiedliche Szenarien oder Umgebungen zu schreiben und natürlich die gesamte Build-Pipeline mit automatischen Codeprüfungen, Unit Tests, dem Bauprozess an sich oder der Auslieferung eurer Anwendung zu erweitern. Dennoch sollte dies ein erster Schritt sein, der zeigt, wie schnell ihr automatisierte End-to-End Tests heutzutage aufsetzen könnt.

Wartet, bis ihr eure ersten echten Cypress Tests für eure Anwendung schreibt. Ihr werdet Spaß haben!

<img src="/shared/assets/img/placeholder-image.svg" alt="Animiertes Bild, das eine überwältigte Person zeigt" class="lazy center" data-src="08-mind-blown.gif" data-srcset="08-mind-blown.gif"
 />

Ich hoffe, ihr konntet etwas nützliches aus dem Artikel ziehen. Bei Fragen oder Anmerkungen, lasst es mich wissen. Rückmeldung ist immer sehr willkommen!

Der Quellcode für diese Anleitung ist auf GitHub zu finden:
[https://github.com/MrCube42/cypress-e2e-testing-angular](https://github.com/MrCube42/cypress-e2e-testing-angular)

### Quellen und Hinweise<a name="references"></a>
Für andere CI-System könnte man unser vorher definiertes npm Skript nutzen. Jedoch müssten wir uns dann um all die zusätzlichen Hilfsmittel selbst kümmern. Falls ihr bereits eine weit entwickelte Pipeline habt, könnte es ein einfacherer Weg sein, nur dieses eine Skript zu integrieren.

- [Englischer Originalartikel von David](https://dev.to/angular/ci-ready-e2e-tests-for-angular-with-cypress-and-typescript-in-under-60-minutes-4f30)
- [Offizielle Angular Dokumentation](https://v17.angular.io/docs)
- [Briebug Cypress Schematic](https://github.com/briebug/cypress-schematic)
- [Offizielle Cypress Dokumentation](https://docs.cypress.io)
- [CircleCI](https://circleci.com/)
