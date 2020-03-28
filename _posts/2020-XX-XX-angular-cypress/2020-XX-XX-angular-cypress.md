---
title: "E2E Tests für Angular mit Cypress und TypeScript in unter 60 Minuten bereit für Continuous Integration"
description: "Cypress ist ein Framework zum Schreiben von E2E Tests für Browser-Applikation. Wir werden am Beispiel von Angular erste E2E Tests mit TyeScript schreiben und sie zur Ausführung auf CircleCI als Continunous Integration System vorbereiten."
author: "David Würfel"
published_at: 2020-XX-XX- HH:MM.SS.000000Z
header_source: https://unsplash.com/photos/ XXXXXXXX-TODO!
categories: "cypress testing angular typescript circleci tutorial"
---

<!-- CI ready e2e tests for Angular with Cypress and TypeScript in under 60 minutes -->

> Der folgende Artikel möchte dir zeigen, wie du *End-to-End Testing* für *Angular* mit *Cypress* und *TypeScript* aufsetzt. Du wirst erste E2E Tests schreiben und sie zur Ausführung auf *CircleCI* als Continunous Integration System vorbereiten, sodass sie mit jedem Push auf dein Repository ausgeführt werden.

<!-- > This article aims to describe how you can set up **end-to-end testing** for **Angular** with **Cypress** including **TypeScript**. You will write your very first **e2e tests** and make them ready to run on a **CircleCI** as a continuous integration system with every update to your repository. -->

# Bevor wir starten: Was ist ein E2E Test?
> End-to-End *(kurz E2E)* Testing ist eine Art des Software Testings, welches nicht nur das Software System an sich validiert, sondern auch dessen Zusammenspiel mit externen Schnittstellen und deren Intergation. End-to-End Tests schreibt man, um vollständige, Szenarien, die einem Produktivsystem entsprechen durchzuspielen

*Quelle (frei übersetzt): https://www.guru99.com/end-to-end-testing.html*

<!-- # Before we start: What is an e2e test?<a name=e2e"></a>
> End-to-end *(short e2e)* testing  is a type of software testing that validates the software system along with its integration with external interfaces. The purpose of end-to-end test is to exercise a complete production-like scenario.

*Source: https://www.guru99.com/end-to-end-testing.html.* -->

# Überblick
- [Was ist Cypress?](#cypress)
- [Vorbedingungen](#pre)
- [Cypress aufsetzen](#setup)
- [Erste Tests](#tests)
- [Continuous Integration aufsetzen](#ci)
- [Fazit und Referenzen](#summary)

<!-- # Overview
- [What is Cypress?](#cypress)
- [Prerequisites](#pre)
- [Setting up Cypress](#setup)
- [Writing Some Tests](#tests)
- [Setting up Continuous Integration](#ci)
- [Conclusion and References](#summary) -->

Früher habe ich in der Frontend Entwicklung mit [Microsofs .NET und WPF](https://docs.microsoft.com/en-US/dotnet/framework/wpf/) gearbeitet und erinnere mich noch gut an die Zeiten, in denen wir kostenintensive Frameworks zum Schreiben von End-to-End Tests für unsere Projekte evaluiert haben. Nach vielen Wochen, sogar Monaten der Evaluation, der Entwicklung von speziellem *Glue-Code* oder einer eigenen Test Infrastruktur auf Basis bereits existierender Werkzeuge, hatten wir es endlich geschafft unsere E2E Tests zum Laufen zu bekommen. Leider waren sie ziemlich brüchig und sind oft fehlgeschlagen, weil wir händische Anpassungen machen musste oder Probleme hatten mit unzuverlässigen Test Runnern in unsere Continuous Integration Pipeline.

<!-- I have a frontend development background in [Microsoft's .NET & WPF](https://docs.microsoft.com/en-US/dotnet/framework/wpf/) and remember the times where we evaluated costly frameworks to write end-to-end tests for our projects. After a lot of evaluations and weeks, even months of custom glue code and development of test infrastructures on top of existing tools, we finally got some e2e tests running. They were brittle, often failed because of manual adjustments we had to do or problems with flaky runners in the continuous integration pipeline. -->

Ein paar Jahre später mit [Angular](https://angular.io/) und [Protractor](https://www.protractortest.org/#/) als voreingestelltem E2E Testing Framework sind die Tests weiterhin basierend auf sogenannten [Page Objects](https://www.protractortest.org/#/page-objects) und dem [Selenium Web Driver](https://www.selenium.dev/). Unzuverlässig sind sie immer noch. Keine teuren, kommerziellen Frameworks oder maßgeschneiderte Infrastruktur war mehr notwendig. Aber hat es Spaß gemacht E2E Tests zu schreiben? Nein.

Mittlerweile sind wir aber im Jahr 2020 angekommen und die Zeit zum Aufstieg neuer Helden ist angebrochen. 🚀

<!-- Some years later with [Angular](https://angular.io/) and [Protractor](https://www.protractortest.org/#/) as a default for e2e tests, we were still based on [page objects](https://www.protractortest.org/#/page-objects), [Selenium Web Driver](https://www.selenium.dev/) and the tests continued to be rather unreliable. No expensive commercial frameworks and custom infrastructure were needed. But was it fun to write e2e tests? No.

However we are in 2020 now and time has come for new heroes to arise. 🚀 -->

# Was ist Cypress<a name="cypress"></a>
[Cypress](https://cypress.io) verspricht *schnelles, einfaches und zuverlässiges Testing für alles was im Browser läuft*. Es basiert nicht auf dem Selenium Web Driver, der Netzwerk Verbindungen nutzt, um mit dem Browser zu interagieren. Stattdessen ist Cypress ein Test Runner, der *im Inneren* deines Browsers neben deiner Web Applikation läuft und darum direkten Zugriff auf diese hat.

<!-- # What is Cypress?<a name="cypress"></a>
[Cypress](https://cypress.io) promises *fast, easy and reliable testing for anything that runs in a browser*. It is not based on Selenium Web Driver which is using network connections to interact with your browser. Instead Cypress is a test runner that runs *inside* your browser next to your web application and therefore has has direct control over it. -->

Ohne an dieser Stelle auf alle Details einzugehen, ist dadurch Cypress nicht nur schneller und zuverlässiger, es ebnet den Weg für viele weitere interessante Eigenschaften wie beispielsweise
* Debugging mit Zeitreisefunktion
* Einfaches Aufzeichnen von Videos und Screenshots des Testlaufs
* Automatisierte Wartemechanismen

<!-- Without going into all the details, this not only makes Cypress faster and more reliable, it also opens the door for a lot of other interesting features like
* time travel debugging,
* easy snapshotting and recording,
* automatic waitings. -->

Zusätzlich zu all diesen Besonderheiten hat Cypress eine sogenannte Developer Experience (*DX*) die kaum zu toppen ist. Hast du jemals eine bei einem fehlgeschlagenem eine [Fehlermeldung](https://www.cypress.io/blog/2017/07/26/good-error-messages/) gesehen, die dir genau sagt, was du falsch gemacht hast, dir aufzeigt, welche Abhängigkeiten hinzugefügt werden müssen und dich darüber hinaus noch an eine verständliche Dokumentationsseite verweist, die das Problem im Detail beschreibt? So fühlt sich Cypress an: Es ist gemacht von Entwicklern für Entwickler.

<img src="/assets/img/placeholder-image.svg" alt="Cypress Fehlermeldung auf dem Build-Server, die genau sagt, wie der Fehler zu beheben sei" class="lazy center" data-src="02-cy-error.png" data-srcset="02-cy-error.png"
 />

<!-- On top of all the features, Cypress has a developer experience (*DX*) that is nearly unrivalled. Have you ever seen a [message in the error logs](https://www.cypress.io/blog/2017/07/26/good-error-messages/) of your failed build that tells you exactly what you did wrong, points you to the right dependencies to add and also links to an explanatory documentation site describing the problem? This is what Cypress feels like. It is built by developers for developers.

![Cypress error on the build server telling you how to fix it](https://dev-to-uploads.s3.amazonaws.com/i/l90rk6dmuijzkv3uvhg6.png)-->

Gleich werden wir Cypress für ein frisches, mit der CLI erstellte Angular Projekt installieren. Wir werden ein paar E2E Test schreiben und sie am Ende von einem automatisierten Build-System laufen lassen. Die Gesamtheit dieser Schritte sollten nicht länger als 60 Minuten in Anspruch nehmen. Wir werden versuchen, diese Schritte so kurz wie möglich zu halten und existierende Werkzeuge wie [Angular Schematics](https://angular.io/guide/schematics), Bibliotheken oder bekannte Vorlagen zu unserem Vorteil einsetzen.

<!-- Hereafter, we will install Cypress for a fresh Angular project created with the CLI. We'll write some e2e tests and conclude with running these by an automated build system. All these steps should not take more than 60 minutes. We try to keep the steps as short as possible, leveraging existing tools like [Angular Schematics](https://angular.io/guide/schematics), libraries and common templates. -->

# Vorbedingungen<a name="pre"></a>
Diese Anleitung setzt voraus, dass du bereits mit einem standardmäßigen Angular 9 Projekt arbeitest. Falls dies noch nicht der Fall ist, kannst du ein neues mit der [Angular CLI](https://angular.io/cli/new) erstellen. Wenn du die CLI nicht global installiert hast, kannst du dir den [`npx`](https://www.npmjs.com/package/npx) Befehl zur Nutze machen, der die CLI temporär installiert:

```sh
npx @angular/cli new <app-name>
```

<!-- # Prerequisites<a name="pre"></a>
This guide assumes that you have a standard Angular 9 app project. If not, you may create one like you would normally do with the [Angular CLI](https://angular.io/cli/new). If you don't have the CLI installed globally, you can make use of the [`npx`](https://www.npmjs.com/package/npx) command that will install it temporarily on the fly:

```sh
npx @angular/cli new <app-name>
``` -->

# Cypress aufsetzen<a name="setup"></a>
Um Cypress zusammen mit TypeScript so schnell wie möglich aufzusetzen, nutzen wir eine existierende, von [BrieBug](https://www.npmjs.com/package/@briebug/cypress-schematic) entwickelte Schematic.

<!-- # Setting up Cypress<a name="setup"></a>
In order to set up Cypress together with TypeScript as fast as possible, we make use of an existing schematic developed by [BrieBug](https://www.npmjs.com/package/@briebug/cypress-schematic). -->

Im Wurzelverzeichnis deines Angular Projekts kannst du das Terminal öffnen und folgenden Befehl eingeben:

```sh
ng add @briebug/cypress-schematic --addCypressTestScripts
```

<!-- In the root of your Angular project, you can open the terminal and enter the following command:

```sh
ng add @briebug/cypress-schematic --addCypressTestScripts
``` -->

Falls die CLI nicht global installiert ist, könnte es sein, dass der `ng` Befehl nicht direkt verfügbar ist. Du kannst den Aufruf des lokalen `ng` aus der `package.json` erzwingen:

```sh
npm run ng -- add @briebug/cypress-schematic # Falls 'ng' allein nicht gefunden werden konnte
```

<!-- If the CLI isn't installed globally, the `ng` command may not be available directly. You can enforce the use of the local `ng` from the `package.json`:

```sh
npm run ng -- add @briebug/cypress-schematic # In case 'ng' could not be found
``` -->

Wir können ohne Bedenken Protractor entfernen, weil es vollständig ersetzt wird. Während der Installation werden ein paar Binardateien heruntergeladen, da Cypress Test Runner als eine in [Electron](https://www.electronjs.org/) gepackten Oberfläche kommt.

<!-- We can safely remove Protractor because it will be completely replaced. During the installation some binaries were downloaded because Cypress comes with an [Electron](https://www.electronjs.org/)-bundled UI as an interactive test runner. -->

Durch die Verwendung des Parameters `--addCypressTestScripts` werden zwei nützliche npm Skripte hinzugefügt, die das Arbeiten mit Cypress komfortabler machen: Eins, um die E2E Tests mit, das andere, um die Tests ohne die Oberfläche auszuführen.

```json
    // package.json Skripte

    "cy:run": "cypress run",
    "cy:open": "cypress open"
```

<!-- Using the flag `--addCypressTestScripts` two handy npm scripts were added to make the work with Cypress more comfortable. One to run e2e tests headless and the other script running the tests with the Cypress UI runner:

```json
    // package.json scripts

    "cy:run": "cypress run",
    "cy:open": "cypress open"
``` -->

Würde man eines dieser Skripte laufen lassen, würde der Test zunächst fehlschlagen, weil er versuchen würde auf *http://localhost:4200* zu navigieren, wo aktuell noch nichts bereitgestellt wird. Um das zu beheben, können wir ein zweites Konsolenfenster öffnen und unser Angular Applikation vorher mit `npm start` bereitstellen.

<!-- If you were to run one of these scripts standalone, the test would fail because it tries to route to *http://localhost:4200* where nothing is served at the moment. In order to fix this, we need to open a second terminal and serve our Angular application beforehand with `npm start`. -->

Glücklicherweise passt die vorherige Schematic den `e2e` Befehl so an, dass dies für uns automatisch von einem sogenannten [CLI Builder](https://angular.io/guide/cli-builder) durchgeführt wird. Mit folgendem Befehl liefern wir die Anwendung aus und lassen den Test dagegen laufen:

```sh
npm run e2e
```

<!-- Luckily the schematic adjusted the `e2e` command so that this is done for you automatically by the [CLI builder](https://angular.io/guide/cli-builder). You can serve the application and start the e2e test by using the following command:

```sh
npm run e2e
``` -->

Cypress erkennt, dass es zum ersten Mal ausgeführt wird. Es verifiziert seine Installation und fügt ein paar grundlegende Beispieldateien hinzu. Nachdem die Oberfläche öffnet, können wir einen Test sehen, der bereits für uns erstellt wurde.

<img src="/assets/img/placeholder-image.svg" alt="Cypress Oberfläche nach cy:open oder e2e" class="lazy center" data-src="03-cy-open.png" data-srcset="03-cy-open.png"
 />

<!-- Cypress will detect that we launched it for the first time. It verifies its installation and adds some initial example files. After the UI has opened up, we can see a test that has already been created for us.

![Cypress UI after cy:open](https://dev-to-uploads.s3.amazonaws.com/i/2byc31bumuz3hoozi28h.PNG) -->

Wählt man diesen Test aus, so wird er ausgeführt. Initial wird er fehlschlagen, weil wir tatsächlich noch nichts vernünftiges testen. Das werden wir nun beheben.

<!-- Selecting the test will run it. Initially the test will fail because we didn't actually test something properly. We will fix this now. -->

<img src="/assets/img/placeholder-image.svg" alt="Fehlschlagender Test, der aktuell noch nicht implementiert ist" class="lazy center" data-src="04-cy-test.png" data-srcset="04-cy-test.png"
 />

<!-- ![Failing test that is not implemented yet](https://dev-to-uploads.s3.amazonaws.com/i/qi6455u49slch9bq2gor.png) -->

# Erste Tests<a name="tests"></a>
Wie von den Cypress [Best Practices](https://docs.cypress.io/guides/references/best-practices.html) vorgeschlagen, setzen wir als ersten Schritt die [globale Basis-URL](https://docs.cypress.io/guides/references/best-practices.html#Setting-a-global-baseUrl), sodass wir diese Adresse nicht bei jeder Testausführung duplizieren müssen. Dazu fügen wir die folgende Konfiguration der Datei `cypress.json` hinzu:

```json
// cypress.json
{
  "baseUrl": "http://localhost:4200"
}
```

<!-- # Writing Some Tests<a name="tests"></a>
As a very first step, as proposed by the Cypress [best practices](https://docs.cypress.io/guides/references/best-practices.html), we set our [global baseUrl](https://docs.cypress.io/guides/references/best-practices.html#Setting-a-global-baseUrl), so that we don't have to duplicate this on every test execution. Add the following to the configuration `cypress.json`:

```json
// cypress.json
{
  "baseUrl": "http://localhost:4200"
}
``` -->

Danach schreiben wir unseren ersten [*Smoke Test*](https://de.wikipedia.org/wiki/Smoke_testing), der nur prüft, ob der standard Applikationstitel der Angular Startseite gesetzt ist. Dazu ändern wir den Inhalt von `spec.ts` auf folgenden:

```ts
// spec.ts
it('smoke test', () => {
  cy.visit('/');
  cy.contains('cypress-e2e-testing-angular app is running!');
});
```

<!-- After that, we write our very first [*smoke test*](https://en.wikipedia.org/wiki/Smoke_testing_(software)) that only checks whether the default app title is set on the Angular starting page. Therefore, change the content of the `spec.ts` to the following content:

```ts
// spec.ts
it('smoke test', () => {
  cy.visit('/');
  cy.contains('cypress-e2e-testing-angular app is running!');
});
``` -->

Der Test startet indem er zu unserer Basis-URL navigiert und danach nach einem beliebigem Element sucht, dass den Text *cypress-e2e-testing-angular app is running!* enthält.

<!-- The test starts by routing to our *baseUrl* and proceeds by querying any element that contains the text *cypress-e2e-testing-angular app is running!*. -->

## Nutzerverhalten testen
Dieser Test sollte bereits funktionieren, aber wir sollten doch etwas interaktivere schreiben. Weil E2E Tests von Natur aus langsamer sind als Unit Tests, ist es völlig in Ordnung E2E Test zu schreiben, die einen gesamten Ablauf eines Benutzers bezogen auf eine Funktionalität modellieren.

<!-- ## Testing User Flows
This test should already work, but let's write some more interactive ones. As e2e are inherently slower than unit tests, it is totally fine to have e2e tests that model the entire user flow for a feature. -->

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

<!-- For example, we want to check whether some characteristics of the starting page are valid: Our page should contain the title and the `ng generate` text in the terminal by default, but when the users clicks the *Angular Material* button, we want to ensure that the proper `ng add` command is displayed in the terminal view below.

You may replace the content of your test file with this:

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
-->

Wir haben unsere Testreihe etwas umgestellt, indem wir einen `describe` Block hinzugefügt haben, um alle Tests zu gruppieren, die sich auf unsere Startseite beziehen. Da wir in jedem Test die `baseUrl` besuchen, haben wir dies in den `beforeEach` Aufruf verschoben. Zu guter Letzt kombinieren wir unseren existierenden Smoke Test mit dem Test für die Konselenfenster-Ansicht auf der Startseite.

<!-- We refactored our test suite by adding a `describe` block to capture all tests that run when the starting page is loaded. As we visit the *baseUrl* every time, we moved this into the `beforeEach` call. Lastly we combined the basic smoke tests with the test for the terminal view on the starting page. -->

Es ist wichtig zu wissen, dass man die Ergebnisse der Cypress Anfragen nicht in Variablen zwischenspeichert, sondern stattdessen [Closures](https://docs.cypress.io/guides/references/best-practices.html#Assigning-Return-Values) verwenden sollte. Darüber hinaus wählen wir aktuell unsere Element über CSS Klassen oder sogar Textinhalt aus, was sehr brüchig sein kann. Hier wir empfohlen `data-` Attribute zur [Auswahl von Elementen](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements) zu nutzen.

<!-- It is important to know that you should not store Cypress' query results in variables, but instead work with [closures](https://docs.cypress.io/guides/references/best-practices.html#Assigning-Return-Values). Moreover, we selected elements by CSS classes and text content, which may be too brittle. It is recommended to use `data-` attributes for [selecting elements](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements). -->

Cypress hat eine Menge toller Funktionalitäten und Möglichkeiten. Wir können hier nicht alle von ihnen behandeln, da unser Fokus darauf liegt, einen ersten Startpunkt zu finden. Die offizielle Dokumentation ist allerdings sehr gute und liefert alle Informationen, wie man [mit verschiedenen Elementen interagiert](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Actionability).

<!-- Cypress has a lot of great features and possibilities. We won't cover all of them because our goal is to focus on the very first starting point. The official documentation is really good and covers everything on how to [interact with elements](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Actionability). -->

Lassen wir unsere Testreihe nochmal laufen, sollten wir sehen wie er sich durch jedes Szenario durchklickt und unsere 3 Abfragen sollten diesmal gelingen. ✔✔✔

<img src="/assets/img/placeholder-image.svg" alt="Unsere erste Cypress Testreihe erfolgreich laufen lassen" class="lazy center" data-src="05-cy-workflow.gif" data-srcset="05-cy-workflow.gif"
 />

<!-- If you rerun this test suite, you should see the UI clicking through each scenario and all three tests should pass this time. ✔✔✔

![Running our first Cypress test suite succefully](https://dev-to-uploads.s3.amazonaws.com/i/2hkws56oi8xyusxu6t4r.gif) -->

# Continuous Integration aufsetzen<a name="ci"></a>
Da unsere Tests nun local laufen, möchten wir als nächsten eine kleine CI ([Continuous Integration](https://de.wikipedia.org/wiki/Kontinuierliche_Integration)) Pipeline aufsetzen. Ein guter Weg sich darauf vorzubereiten, ist es ein paar npm Skripte anzulegen und diese zu kombinieren, sodass das Build-System ein einziges Skript als Einstiegspunkt aufrufen kann. Wenn wir diese Methode verfolgen, können wir auch die CI Schritte vor dem Push auf den Server zuvor lokal ausprobieren. Weiterhin sind diese npm Skripte eher unabhängig von einem tatsächlich verwendeten Build-System.

<!-- # Setting up Continuous Integration<a name="ci"></a>
Now that our tests run locally, let's kick of a small CI ([continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)) pipeline. A good way to prepare for this, is to create npm scripts and combine them so that the build system can use a single script as entry point. By following this method, you can try the CI steps locally before pushing online. Moreover npm scripts are rather independent from any actual build system. -->

Auf dem CI-Server müssen wir den Webserver im Hintergrund starten und darauf warten, dass unsere Anwendung gebaut wird, was etwas dauern kann. Danach muss der Cypress Testrunner gestartet werden, durch alle Tests gehen und nach Abschluss der Tests den Server herunterfahren. Praktischerweise können wir dies mit einem einzigen Hilfsmittel namens *start-server-and-test* tun, wie es in der [Cypress Dokumentation]((https://docs.cypress.io/guides/guides/continuous-integration.html#Solutions)) beschrieben ist.

```sh
npm install --save-dev start-server-and-test
```

<!-- On CI, we need to start our server in the background and wait for it to bundle our application, which might take a while. Then we need to start the Cypress test runner, go through the tests and shut down the server when the tests finish. Luckily we can do this all with a single utility called *start-server-and-test* as described in the [Cypress docs](https://docs.cypress.io/guides/guides/continuous-integration.html#Solutions):

```sh
npm install --save-dev start-server-and-test
``` -->

Nachdem dies installiert ist, können wir den Angular `serve` Befehl nutzen, der über `npm start` aufgerufen wird und ihn mit dem oberflächenlosen `cy:run` Kommando verbinden.

```json
   // package.json Skripte
  "start": "ng serve",
  "cy:run": "cypress run",
  "e2e:ci": "start-server-and-test start http://localhost:4200 cy:run"
```

<!-- After this is installed, we use the Angular *serve* which is currently behind `npm start` and combine it with the headless `cy:run` command:

```json
   // package.json scripts
  "start": "ng serve",
  "cy:run": "cypress run",
  "e2e:ci": "start-server-and-test start http://localhost:4200 cy:run"
``` -->

Selbstverständlich könnte man auch einen Produktiv-Build nutzen oder vorher einen Build ausführen und die Applikation über einen beliebigen Http-Server ausliefern. Um es kurz zu halten, möchte ich diese Verbesserung dir überlassen.

<!-- You could surely use a production build or build beforehand and serve the app using any http server. For sake of conciseness, I will leave these improvements up for you. -->

## Circle CI
Für unser Beispiel nutzen wir [CircleCI](https://circleci.com/) weil es sich sehr gut mit GitHub integriert, sehr weit verbreitet ist und eine freie Nutzung erlaubt. Die letzliche Wahl eines anderen CI-Systems wie [Jenkins](https://jenkins.io/) oder [GitLab](https://about.gitlab.com/)(mit dem ich die meiste Erfahrung gesammelt habe) ist dir selbst überlassen. Nachdem man sich bei CircleCI angemeldet und seinen GitHub Account verbunden hat, kann man ein Repository auswählen und ein neues Projekt über das CircleCI-Dashboard erstellen.

<!-- ## Circle CI
For our example, we choose [CircleCI](https://circleci.com/) because it integrates very well with GitHub, is commonly used there and has a free plan. You may use any other CI system like [Jenkins](https://jenkins.io/) or [GitLab](https://about.gitlab.com/) (which I have the most experience with). After signing into CircleCI and connecting to our GitHub account, you can select the repository and create a new project via their dashboard. -->

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

<!-- In order to configure the pipeline, you could write a `config.yml` by selecting a template and adjusting it to your needs and eventually running the e2e script. Fortunately Cypress has a [ready to use configurations](https://github.com/cypress-io/circleci-orb) (called [Orbs](https://github.com/cypress-io/circleci-orb/blob/master/docs/examples.md)) for CircleCI which already include the installation of dependencies, caching and so on. Before we can use it, we must visit the *Organisation Settings* to [enable third party runners](https://github.com/cypress-io/circleci-orb#how-to-enable).

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
``` -->

Die Pipeline hat nur eine Aufgabe: Alle E2E Tests ausführen. Der aktuelle Git-Branch wir ausgecheckt, alle Abhängigkeiten installiert inklusive Caching, der Applikations-Server wird gestartet und die Tests werden ausgeführt. Zusätzlich werden standardmäßig Videos des Testdurchlaufs aufgezeichnet und Screenshots (im Falle von fehlschlagenden Tests) und am Ende als CircleCI Artefakte zur späteren Analyse hochgeladen.*

<img src="/assets/img/placeholder-image.svg" alt="CircleCI Dashboard" class="lazy center" data-src="06-circleci.png" data-srcset="06-circleci.png"
 />

 <iframe width="560" height="315" src="https://www.youtube.com/embed/w3BVGdNIhFg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!-- The pipeline only has one job: Run all e2e tests. It checks out the current branch, installs all dependencies including caching, starts the application server and runs our tests. Additionally, videos (recorded by default) and screenshots (in case tests are failing) are uploaded as CircleCI artifacts for further inspection.*

![CircleCI Dashboard](https://dev-to-uploads.s3.amazonaws.com/i/77rim7ftwubsef1pzn32.PNG)

{% youtube w3BVGdNIhFg %} -->

# Fazit<a name="summary"></a>
Die Schritte in dieser Anleitung sind sehr minimal. Du könntest dein existierendes Angular Projekt nutzen, du kannst die Konfiguration der Cypress Testreihen ändern oder deutlich mehr und aussagekräftigere Tests schreiben. Darüber hinaus könnte es dir nützen, npm Skripte für unter unterschiedliche Szenarien oder Umgebungen zu schreiben und natürlich die gesamte Build-Pipeline mit automatischen Codeprüfungen, Unit Tests, dem Bauprozess oder der Auslieferung deiner Anwendung zu erweitern. Dennoch sollte dies ein erster Schritt sein, der zeigt, wie schnell man automatisierte Ende-zu-Ende Tests heutzutage aufsetzen kann.

Warte nur, bis du deine ersten echten Cypress Tests für deine Anwendung schreibst. Du wirst Spaß haben!

<img src="/assets/img/placeholder-image.svg" alt="Animiertes Bild, das eine überwältigte Person zeigt" class="lazy center" data-src="08-mind-blown.gif" data-srcset="08-mind-blown.gif"
 />

Ich hoffe, du hast etwas nützliches aus dem Artikel ziehen können. Bei Fragen oder Anmerkungen, lass es mich wissen. Rückmeldung ist immer sehr willkommen!

Der Quellcode für diese Anleitung ist auf GitHub zu finden:
[https://github.com/MrCube42/cypress-e2e-testing-angular](https://github.com/MrCube42/cypress-e2e-testing-angular)

<!-- # Conclusion<a name="summary"></a>
The steps in this guide are rather minimal. You may use your existing Angular project, may change the configuration of your Cypress test suites and write a lot of more meaningful tests. Moreover, you may define npm scripts for different scenarios and environments and of course your entire build pipeline may be extended with linting, unit testing, building and even deploying your application. Nevertheless, this should be a first step which shows how quick automated end-to-end tests can be set up in nowadays.

Wait till you write real Cypress tests for your application. You will have fun!

![Mind blown gif](https://media.giphy.com/media/Um3ljJl8jrnHy/giphy.gif)

I hope that you will also find some value in this article. If you have any questions or remarks, just let me know. Your feedback is very welcome!

You can find the sources for this guide on GitHub:
{% github https://github.com/MrCube42/cypress-e2e-testing-angular %} -->

### Quellen und Hinweise<a name="references"></a>
* Für andere CI-System könnte man unser vorher definiertes npm Skript nutzen. Jedoch müssten wir uns dann um all die zusätzlichen Hilfsmittel selbst kümmern. Falls du bereits eine weit entwickelte Pipeline hast, könnte es ein einfachere Weg sein, nur das eine Skript zu integrieren.

- [Offizielle Angular Dokumentation](https://angular.io/docs)
- [Briebug Cypress Schematic](https://github.com/briebug/cypress-schematic)
- [Offizielle Cypress Dokumentation](https://docs.cypress.i)
- [CircleCI](https://circleci.com/)

<!-- ### References<a name="references"></a>
*For other CI systems we could use our previously defined npm script. However, we need to take care of all the additional work by ourselves. If you already have an existing sophisticated pipeline it could be easier to integrate just the script.

- [Official Angular documentation](https://angular.io/docs)
- [Briebug Cypress schematic](https://github.com/briebug/cypress-schematic)
- [Official Cypress documentation](https://docs.cypress.i)
- [CircleCI](https://circleci.com/) -->