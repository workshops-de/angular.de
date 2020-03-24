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

If you were to run one of these scripts standalone, the test would fail because it tries to route to *http://localhost:4200* where nothing is served at the moment. In order to fix this, we need to open a second terminal and serve our Angular application beforehand with `npm start`.

Luckily the schematic adjusted the `e2e` command so that this is done for you automatically by the [CLI builder](https://angular.io/guide/cli-builder). You can serve the application and start the e2e test by using the following command:

```sh
npm run e2e
```

Cypress will detect that we launched it for the first time. It verifies its installation and adds some initial example files. After the UI has opened up, we can see a test that has already been created for us.

![Cypress UI after cy:open](https://dev-to-uploads.s3.amazonaws.com/i/2byc31bumuz3hoozi28h.PNG)

Selecting the test will run it. Initially the test will fail because we didn't actually test something properly. We will fix this now.

![Failing test that is not implemented yet](https://dev-to-uploads.s3.amazonaws.com/i/qi6455u49slch9bq2gor.png)

# Writing Some Tests<a name="tests"></a>
As a very first step, as proposed by the Cypress [best practices](https://docs.cypress.io/guides/references/best-practices.html), we set our [global baseUrl](https://docs.cypress.io/guides/references/best-practices.html#Setting-a-global-baseUrl), so that we don't have to duplicate this on every test execution. Add the following to the configuration `cypress.json`:

```json
// cypress.json
{
  "baseUrl": "http://localhost:4200"
}
```

After that, we write our very first [*smoke test*](https://en.wikipedia.org/wiki/Smoke_testing_(software)) that only checks whether the default app title is set on the Angular starting page. Therefore, change the content of the `spec.ts` to the following content:

```ts
// spec.ts
it('smoke test', () => {
  cy.visit('/');
  cy.contains('cypress-e2e-testing-angular app is running!');
});
```

The tests starts by routing to our *baseUrl* and proceeds by querying any element that contains the text *cypress-e2e-testing-angular app is running!*.

## Testing User Flows

This test should already work, but let's write some more interactive ones. As e2e are inherently slower than unit tests, it is totally fine to have e2e tests that model the entire user flow for a feature.

For example, we want to check whether some characteristics of the starting page are valid: Our page should contain the title and the `ng generate` text in the terminal by default, but when the users clicks the *Angular Material* button, we want to ensure that the proper `ng add` command is displayed in the terminal view below.

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

We refactored our test suite by adding a `describe` block to capture all tests that run when the starting page is loaded. As we visit the *baseUrl* every time, we moved this into the `beforeEach` call. Lastly we combined the basic smoke tests with the test for the terminal view on the starting page.

It is important to know that you should not store Cypress' query results in variables, but instead work with [closures](https://docs.cypress.io/guides/references/best-practices.html#Assigning-Return-Values). Moreover, we selected elements by CSS classes and text content, which may be too brittle. It is recommended to use `data-` attributes for [selecting elements](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements).

Cypress has a lot of great features and possibilities. We won't cover all of them because our goal is to focus on the very first starting point. The official documentation is really good and covers everything on how to [interact with elements](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Actionability).

If you rerun this test suite, you should see the UI clicking through each scenario and all three tests should pass this time. ✔✔✔

![Running our first Cypress test suite succefully](https://dev-to-uploads.s3.amazonaws.com/i/2hkws56oi8xyusxu6t4r.gif)

# Setting up Continuous Integration<a name="ci"></a>
Now that our tests run locally, let's kick of a small CI ([continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)) pipeline. A good way to prepare for this, is to create npm scripts and combine them so that the build system can use a single script as entry point. By following this method, you can try the CI steps locally before pushing online. Moreover npm scripts are rather independent from any actual build system.

On CI, we need to start our server in the background and wait for it to bundle our application, which might take a while. Then we need to start the Cypress test runner, go through the tests and shut down the server when the tests finish. Luckily we can do this all with a single utility called *start-server-and-test* as described in the [Cypress docs](https://docs.cypress.io/guides/guides/continuous-integration.html#Solutions):

```sh
npm install --save-dev start-server-and-test
```

After this is installed, we use the Angular *serve* which is currently behind `npm start` and combine it with the headless `cy:run` command:

```json
   // package.json scripts
  "start": "ng serve",
  "cy:run": "cypress run",
  "e2e:ci": "start-server-and-test start http://localhost:4200 cy:run"
```

You could surely use a production build or build beforehand and serve the app using any http server. For sake of conciseness, I will leave these improvements up for you.

## Circle CI
For our example, we choose [CircleCI](https://circleci.com/) because it integrates very well with GitHub, is commonly used there and has a free plan. You may use any other CI system like [Jenkins](https://jenkins.io/) or [GitLab](https://about.gitlab.com/) (which I have the most experience with). After signing into CircleCI and connecting to our GitHub account, you can select the repository and create a new project via their dashboard.

In order to configure the pipeline, you could write a `config.yml` by selecting a template and adjusting it to your needs and eventually running the e2e script. Fortunately Cypress has a [ready to use configurations](https://github.com/cypress-io/circleci-orb) (called [Orbs](https://github.com/cypress-io/circleci-orb/blob/master/docs/examples.md)) for CircleCI which already include the installation of dependencies, caching and so on. Before we can use it, we must visit the *Organisation Settings* to [enable third party runners](https://github.com/cypress-io/circleci-orb#how-to-enable).

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

The pipeline only has one job: Run all e2e tests. It checks out the current branch, installs all dependencies including caching, starts the application server and runs our tests. Additionally, videos (recorded by default) and screenshots (in case tests are failing) are uploaded as CircleCI artifacts for further inspection.*

![CircleCI Dashboard](https://dev-to-uploads.s3.amazonaws.com/i/77rim7ftwubsef1pzn32.PNG)

{% youtube w3BVGdNIhFg %}

# Conclusion<a name="summary"></a>
The steps in this guide are rather minimal. You may use your existing Angular project, may change the configuration of your Cypress test suites and write a lot of more meaningful tests. Moreover, you may define npm scripts for different scenarios and environments and of course your entire build pipeline may be extended with linting, unit testing, building and even deploying your application. Nevertheless, this should be a first step which shows how quick automated end-to-end tests can be set up in nowadays.

Wait till you write real Cypress tests for your application. You will have fun!

![Mind blown gif](https://media.giphy.com/media/Um3ljJl8jrnHy/giphy.gif)

I hope that you will also find some value in this article. If you have any questions or remarks, just let me know. Your feedback is very welcome!

You can find the sources for this guide on GitHub:
{% github https://github.com/MrCube42/cypress-e2e-testing-angular %}

### References<a name="references"></a>
*For other CI systems we could use our previously defined npm script. However we need to take care of all the additional work by ourselves. If you already have an existing sophisticated pipeline it could be easier to integrate just the script.

- [Official Angular documentation](https://angular.io/docs)
- [Briebug Cypress schematic](https://github.com/briebug/cypress-schematic)
- [Official Cypress documentation](https://docs.cypress.i)
- [CircleCI](https://circleci.com/)