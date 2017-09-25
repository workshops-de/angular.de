---
title: "Angular E2E Tests mit Protractor und Sauce Labs"
description: "Einführung in E2E Tests mit Protractor und Sauce Labs - Die universelle Fernbedienung für Browser. Hier findest du eine Schritt für Schritt Anleitung."
author: "Martin Wiesmüller"
slug: "angular-e2e-protractor-test-saucelabs"
published_at: 2017-01-12 08:00:00.000000Z
categories: "angular angular2 angular4 testing testen"
header_image: "/artikel/header_images/angular-e2e-protractor-test-saucelabs.jpg"
---

Die innovative Entwicklung der Web Welt bietet inzwischen eine ganze Menge an Möglichkeiten, testgetriebene Entwicklungen durchzuführen. Neben den Komponententests mittels [Karma](https://karma-runner.github.io) und [PhantomJs](http://phantomjs.org/), nehmen wir heute End2End Tests mit Hilfe von [Protractor](http://www.protractortest.org/#/) genauer unter die Lupe. Um anschließend eine Testabdeckung über verschiedene Browser und deren Versionen zu erreichen, wollen wir das ganze zusammen mit dem Cloud Dienst von [SauceLabs](https://saucelabs.com/) realiseren.

## Warum E2E Tests? Vor- und Nachteile

Natürlich bestehen sowohl Vor- als auch Nachteile. Daher bedarf es die richtige Balance zwischen Unit- und den E2E-Tests zu finden, um eine Web-Applikation sinnvoll testen zu können. Im Gegensatz zu den Unit-Tests kann bei den E2E Tests die komplette Applikation in den Browser geladen und getestet werden. Dies stellt natürlich schon einen großen Vorteil dieser Testmethode dar. Allerdings kann auch jede Weiterentwicklung am Quellcode eine umfangreiche Änderung der End to End Test-Suites nach sich ziehen. Folglich kann dies bedeuten, dass zwischen der Entwicklung der Tests und der Funktionalitäten einer Applikation sehr viel Zeit liegen kann. Bei der Informationsbeschaffung für diesen Artikel habe ich auch von Fällen gehört, bei welchen die kompletten Entwicklungen einer Applikation zum Erliegen kamen, weil die E2E Tests die Veröffentlichung einer Version verhindert haben.

Zudem habe ich von Projekten gehört, bei welchen die Abteilungen für die Entwicklung der E2E- und Unit Tests größer waren als die der Applikation selbst. An dieser Stelle kommt natürlich schnell die Frage auf, wie hier noch "testgetrieben" entwickelt werden kann. Ebenso stellt man dann das Testen an sich in Frage. Daher nochmal ein paar Vor- und Nachteile gegenüber gestellt:

### Vorteile

* Echter Integrationstest der final auszuliefernden Software
* Kommunikation zwischen Front- und Backend wird mit-getestet
* Wie sieht der User meine Applikation?
* Testen aller Funktionalitäten direkt vom Nutzer-Device(Browser) aus
* Cross-Browser Testing

### Nachteile

* Entwicklung der E2E Tests sehr zeitintensiv
* Eine Änderung innerhalb der Applikation kann eine aufwendige Änderung der Test-Suites nach sich ziehen
* Je nach Größe der Applikation oder des Projektes ist personeller Aufwand erforderlich
* Kosten bei Cross-Browser Testing (Sauce Labs)


Trotz der mitunter gerechtfertigten Nachteile, sehe ich die Anwendung von E2E Tests als unabdingbar. Gerade bei der Entwicklung der E2E Tests in Richtung der verschiedenen Browser stellt man oft fest, dass die Browser doch nicht alle gleich ticken. Und das nicht nur zwischen den unterschiedlichen Typen, sondern auch zwischen den Versionen eines Browser. Solche unterschiedlichen Verhaltensweisen, welche auch ganz schnell zu gravierenden Bugs führen können, stellt man oft nur bei der Entwicklung solcher E2E Tests fest.

Aber diese Tests als notwendiges Übel anzusehen ist nicht richtig. Man muss nur die richtige Balance zwischen Unit- und E2E Tests halten, sowie die richtige Tiefe der E2E Tests definieren. Folglich die sinnvolle Gestaltung der Tests. Ebenso kann diese Testmethode die Unit-Tests keinesfalls ersetzen. Die Durchführung der E2E Tests sind als "zusätzlich" zu betrachten.

### Protractor.Js

[Protractor](http://www.protractortest.org/#/) ist ein Testframework, welches speziell für Angular Apps entwickelt wurde. Die Entwicklung basiert auf Node und knüpft an [WebDriverJs](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) von Selenium an. Dieses Framework stellt den Mittelpunkt der Schnittstelle zwischen euren Tests und den Browser dar.

Die Version 4 von [Protractor](http://www.protractortest.org/#/) ist lauffähig auf Node Version > 4\. In dieser Version werden sowohl Angular Apps größer 1.1.4 unterstützt, als auch alle Angular 2 Apps. Allerdings wird hier das Testen auf Bindings und Models nicht unterstützt.

Nähere und die aktuellsten Informationen findet Ihr auf der Github Page von [Protractor](http://www.protractortest.org/#/).

### Sauce Labs

Um sich das Thema Cross-Browser Testing deutlich zu vereinfachen, bietet [SauceLabs](https://saucelabs.com/) für die E2E Tests hier eine spitzen Integrationsmöglichkeit für Protractor. [SauceLabs](https://saucelabs.com/) bietet einen Selenium Dienst in der Cloud an, mit welchem alle aktuellsten Browser und Versionen von Protractor angesprochen werden können. Die zu testenden Browser werden in Protractor definiert und beim Starten der Tests an den Seleniumdienst von [SauceLabs](https://saucelabs.com/) übergeben.

![Protractor-Angular-Test-Sauce Labs](medium_Artikel-Martin-Wiesmu-ller-E2E-Testing-Angular-Protractor.png?v=63651354226)

Dieser Dienst erstellt eine virtuelle Maschine mit der genannten Browserversion und führt darin die definierten Test-Suites durch. Darüber hinaus werden die Tests von [SauceLabs](https://saucelabs.com/) aufgezeichnet, sowie Screenshots erstellt. Diese können hinterher sehr bequem innerhalb der UI von SauceLabs angesehen werden. Dies vereinfacht das Debugging bei der Suche von Fehlern deutlich. Hat man sich zusätzlich eine Deployment-Pipe innerhalb seiner Architektur aufgesetzt, kann man mit dem Ergebnis dieser Tests ein Deployment durchführen oder auch verhindern.

## Testprojekt

Nachdem ich euch nun mit Vor- und Nachteilen und sehr viel Theorie bombardiert habe, wollen wir nun mal loslegen und ein Projekt anlegen. Wenn Ihr bereits eine Angular App habt, könnt ihr auch direkt in dieser starten. Viele Templates beinhalten auch schon die Grundkonfiguration von Protractor.

Als erstes müsst Ihr Protractor global sowie die notwendigen Dependencies installieren:

```shell
npm install -g protractor
npm i --save-dev --save-exact request moment protractor-jasmine2-screenshot-reporter jasmine-spec-reporter`
```

Einmal werden nun zwei Command-Line Tools installiert. Protractor selbst und der Webdriver Manager. Ruft am besten mal `protractor --version` auf, um zu sehen, ob das Framework sauber installiert wurde. Zudem werden Module für den Report installiert.

Anschließend updaten wir den installierten Webdrivermanager und starten diesen:

```shell
webdriver-manager update
webdriver-manager start`
```

### Protractor konfigurieren

Nun kommen wir zur Konfiguration von Protractor. Hierzu wird die Datei `protractor.conf.js` benötigt. In dieser Datei definiert ihr die komplette Konfiguration von Protractor. Dies kann ein sehr aufwendiger Prozess sein bzw. kann ein Prozess sein, der über die komplette Entwicklung des Projekts lebt. In dieser Konfiguration werden unter anderem Test-Suites, Browser sowie Reporter definiert. Ich persönlich versuche aber immer die "Wiederverwendbarkeit" von Konfigurationen zu ermöglichen. Daher lege ich drei Dateien in einem separaten Folder (protractor) im Projekt an:

* `browserlist.json`
Datei zur Definition welche Browser getestet werden sollen. (Lokal und über Saucelabs)
* `testsuites.json`
Datei zur Definition der Test-Suites
* `protractor.conf.js`
Datei zur allgemeinen Konfiguration von Protractor


Diese drei Dateien wollen wir uns nun mal im Detail ansehen. Wobei es sich streng genommen nur um eine Datei handelt. Nämlich die `protractor.conf.js`. Wie aber bereits geschrieben, versuche ich solche Konfigurationsfiles auf Wiederverwendbarkeit zu schreiben. Daher handelt es sich bei den zwei JSON Files nur um Objekte, welche am Ende in der Konfigurationsdatei von Protractor required werden.

#### BROWSERLIST.JSON

In diesem JSON werden die zu testenden Browser definiert. Das Objekt hat insgesamt zwei Keys. Einmal `saucelab` und einmal `local`. Wie es die Namen schon sagen, werden hier die Browser definiert, welche lokal und auf SauceLabs getestet werden sollen:

 ```json
{
  "saucelab": [
    {
      "browserName": "chrome",
      "platform": "Windows 10",
      "version": "54",
      "name": "Google Chrome",
      "shardTestFiles": true,
      "maxInstances": 2
    },
    {
      "browserName": "firefox",
      "platform": "Windows 7",
      "version": "46.0",
      "name": "Mozilla Firefox",
      "shardTestFiles": true,
      "maxInstances": 2
    },
    {
      "browserName": "internet explorer",
      "platform": "Windows 10",
      "version": "11.103",
      "name": "Internet Explorer",
      "shardTestFiles": true,
      "maxInstances": 2
    }
  ],
  "local": [
    {
      "browserName": "chrome"
    }
  ]
}
```

Die genaue Definition für die Konfiguration der SauceLab Browser findet ihr im SauceLabs [Platform Configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/). Zudem möchte ich euch dennoch die Keys kurz erklären:

*   `browserName` (string)
Der Name des Browsers, welcher verwendet werden soll.
*   `platform` (string)
Definiert das Betriebssystem, auf welchem der Browser gestartet werden soll
*   `version` (string)
Gibt die Version des Browsers an, welcher in der virtuellen Instanz installiert werden soll
*   `name` (string)
Frei definierbarer Name der Testinstanz
*   `shardTestFiles` (boolean)
Gibt an, ob die Instanz mit anderen Tests geteilt werden darf
*   `maxInstances` (number)
Definiert die maximale Anzahl an Instanzen für diesen Browser

Wenn Ihr euch das Objekt anseht, erkennt Ihr das hier auf SauceLabs die Browser Chrome, Firefox und Internet Explorer getestet werden sollen. Lokal wird nur Chrome getestet. Dieses Objekt könnte man auch direkt in die Konfigurationsdatei von Protractor mit einsetzen. Allerdings würde dies die Datei sehr lange und folglich unübersichtlich machen. Daher habe ich dieses JSON aus der protractor.conf.js gelöst und in ein separtes File geschoben. Dieses File wird in der Konfiguration dann als Variable required.

#### TESTSUITES.JSON

Das Objekt in diesem File wurde von mir genauso wie die `browserlist.json` aus der `protractor.conf.js` heraus getrennt, um eine klarere Struktur zu erhalten. In diesem File werden die einzelnen Test-Suites definiert:

```json
{
  "template": [ "../src/app/template/**/*e2e-spec.js" ],
  "home": [ "../src/app/pages/home/**/*e2e-spec.js" ],
  "site1": [ "../src/app/pages/site1/**/*e2e-spec.js" ]
}
```

Als Key wird der Name der Suite definiert. Das dazugehörige Array definiert die Dateien mit den Testfällen. Die Aufteilung der Tests in Suiten ist nicht zwingend erforderlich. Man kann theoretisch auch alle Testfiles ohne Suites angeben. Allerdings nimmt man sich hiermit einen großen Vorteil:

Wenn ich die Testfälle in Suiten aufteile, habe ich anschließend auch die Möglichkeit, Suiten einzeln zu testen. Andernfalls kann ich nur alle Tests auf einmal starten. Und da die E2E Tests mitunter auch sehr viel Zeit in Anspruch nehmen können, ist es sehr hilfreich, nur einzelne Suiten aufzurufen.

#### PROTRACTOR.CONF.JS

Hier mal eine Protractor Konfigurationsdatei, welche das Testing lokal, sowie auch über SauceLabs unterstüzt. Als Testframework verwende ich hier [Jasmine](https://jasmine.github.io/). Zudem habe ich einen Testreporter mit integriert, welcher Screenshots erstellt und diese zusammen mit dem Test-Report lokal ablegt.

Dieses File wollen wir uns mal Stück für Stück ansehen:

```javascript
'use strict';

const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const ENV = process.env;
const pkg = require('../package.json');
const browserslist = require('./browserslist.json');
const testsuites = require('./testsuites.json');
const q = require('q');
const request = require('request');
const moment = require('moment');
const time = moment().format('DD.MM.YYYY');

const reporter = new HtmlScreenshotReporter({
    dest: 'coverage/screenshots',
    filename: 'my-report.html'
});

// Setup the position of the tests. local / saucelab
let baseUrl = 'http://127.0.0.1:8080/';
let caps = browserslist['local'];
let sauceUser;
let sauceKey;

if (ENV.saucetest) {
    sauceUser = 'UserName';
    sauceKey = 'SauceLabKey';
    baseUrl = 'http://your.url.com';
    caps = browserslist['saucelab'];
}

exports.config = {
    sauceUser,
    sauceKey,
    baseUrl,
    suites: testsuites,

    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 120000,
      isVerbose : true,
      includeStackTrace : true
    },

    framework: 'jasmine2',
    useAllAngular2AppRoots: true,

    // Setup Capabilities
    getMultiCapabilities: () => {
      const deferred = q.defer();
      const multiCaps = caps;

      for (var i = 0; i < multiCaps.length; i++) {
        multiCaps[i].name = pkg.name;
        multiCaps[i].tags = [ pkg.version ]
      }

      deferred.resolve(multiCaps);
      return deferred.promise;
    },

    // Setup the report before any tests start
     beforeLaunch: () => {
      return new Promise((resolve) => {
        reporter.beforeLaunch(resolve);
      });
     },

     // Assign the test reporter to each running instance
     onPrepare: () => {
       const SpecReporter = require('jasmine-spec-reporter');

       jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: true }));
       jasmine.getEnv().addReporter(reporter);
     },

     // Close the report after all tests finish
     afterLaunch: (exitCode) => {
      return new Promise((resolve) => {
        reporter.afterLaunch(resolve.bind(this, exitCode));
      });
     },

     // Lifecycle when test-suite is complete
     onComplete: (state) => {
       browser.getSession().then((session) => {
           return browser.getProcessedConfig().then((config) => {
             let local;

              if(ENV.localrun) {
                local = 'Local run: ';
              }

             if (ENV.saucetest) {
               console.log('.... Sending Pass-Status to Sauce Labs ....');

               request({ url: 'https://saucelabs.com/rest/v1/' + sauceUser + '/jobs/' + session.getId(), method: 'PUT', json: true, auth: { user: sauceUser, pass: sauceKey }, body: { passed: state, build: local + pkg.name + ' - ' + time }}, (err) => {
                 if (err) {
                   return console.log(err);
                 }

                 console.log('--- Pass-Status is send sucessfully ---');
               });
             }

             console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + config.capabilities.name);
             return browser.get
           });
       });
     }
}
```

Im oberen Teil laden wir die externen Module, sowie die zwei bereits genannten JSON Files für die Browser- und der Testsuites Definitionen. Als externe Module werden hier folgende Dependencies geladen:

*   [protractor-jasmine2-screenshot-reporter](https://www.npmjs.com/package/protractor-jasmine2-screenshot-reporter)
Das ist der Jasmine Reporter welcher die Screenshots während der Tests durchführt. Dieses Modul wird anschließend direkt mit der Variable `reporter` konfiguriert. Mit dem Key `dest` wird die Destination für die Screenshots, und mit dem Key `filename` der Pfad für den globalen Report angegeben.

*   [request](https://www.npmjs.com/package/request)
Dieses Modul benötigen wir für die Rückmeldung der Testergebnisse an SauceLabs. Siehe hierzu den Punkt "Automatischer Build und Browsermatrix" weiter unten.

*   [moment](http://momentjs.com/)
Das Modul MomentJS benötigen wir zur Bestimmung des Timestamps im Build. Siehe ebenfalls weiter unten.

Wie bereits genannt, wird mit dieser Konfiguration von Protractor lokale, sowie auch die Tests über SauceLabs definiert. Gesteuert wird das Ganze über die Belegung der Umgebunsvariable `saucetest`. Setzt man diese auf "true" wird der Test nicht lokal, sondern auf SauceLabs in der Cloud durchgeführt. Hierfür werden die Variablen `baseUrl, caps, sauceUser, sauceKey` benannt. Während ohne Umgebungsvariable die `baseUrl` und die `caps` die lokalen Einstellungen abrufen, werden bei der Aktiverung der Umgebungsvariable die Einstellungen für SauceLabs verwendet.

### SauceLabs aktivieren

Um SauceLabs verwenden zu können, muss ein Account angelegt werden. Innerhalb der SauceLabs Verwaltung kann man sich dann die notwendige sauceUser-ID sowie den Key für die Protractor Einstellung generieren lassen. Diese kann man dann in der Variable `sauceUser` und `sauceKey` innerhalb der protractor.conf.js hinterlegen.

> Tipp: SauceLabs bietet die Möglichkeit, zu seinem Account sogenannte Sub-Accounts anzulegen. Dies macht dann vor allem Sinn, wenn man mehrere Applikationen hat, welche man testen möchte. Hier ist es dann empfehlenswert, pro Applikation einen eigenen Account anzulegen. Über diese einzelnen Accounts lässt sich anschließend auch eine Browsermatrix, welche die Browserunterstützung anzeigt, sowie eine Test-Badge erstellen.

Nun aber zurück zur unserer Konfigurationsdatei. Nachdem Ihr die Keys für SauceLabs eingesetzt habt, kommen wir nun direkt in die Config von Protractor. Als erstes seht ihr die Keys, welche wir direkt im Vorfeld bereits benannt haben und über die Umgebungsvariable steuern können. Im nächsten Key `jasmineNodeOpts` wird die Einstellung von Jasmine definiert. Hier gibt es unterschiedliche Ansätze Jasmine zu konfigurieren. Die kompletten Konfigurationsmöglichkeiten von Jasmine findet Ihr [auf der Jasmine Page](https://jasmine.github.io/). Das Framework für Jasmine wird auch anschließend direkt mit dem Key `framework` definiert. Aber auch hier ist man frei bei der Wahl des Frameworks.

### Protractor Lifecycles

Nun kommen wir auch schon zu den verschiedenen Lifecycles welche von Protractor bei der Durchführung der Tests durchlebt werden. Innerhalb der verschiedenen Lifecycles haben wir dann die Möglichkeit unsere Reports, Fehler oder Rückmeldungen zu steuern:

*   `getMultiCapabilities`
In diesem Lifecycle wird unsere Konfiguration der zu testenden Browser geladen.
*   `beforeLaunch`
Hier aktivieren wir unseren Jasmine Reporter, welcher die Screenshots in unseren Tests durchführt.
*   `onPrepare`
Hier aktivieren wir den Jasmine Reporter, welcher die Ergebnisse unserer Tests protokolliert.
*   `afterLaunch`
Hier wird das Protokoll des Jasmine-Tests abgeschlossen.
*   `onComplete`
Dies ist der Lifecycle, wenn der Test abgeschlossen wurde. Hier melden wir unsere Testergebnisse an den Build in SauceLabs zurück. Als Build-ID nehme ich hier den Namen aus der `package.json` sowie das aktuelle Datum. Hiermit wird dann der Build auch eindeutig.

![Protractor Sauce Labs Overview](medium_Artikel-Martin-Wiesmu-ller-E2E-Testing-Angular-SAUCELABS-BROWSERMATRIX.png?v=63651352583)

### SauceLabs Browsermatrix

Wenn wir im Lifecycle `onComplete` unsere Testergebnisse, sowie eindeutige Build-ID's zurückliefern, können wir uns von SauceLabs eine Browsermatrix erstellen lassen:

![Browsermatrix](medium_browsermatrix.png?v=63651352718)

Diese Browsermatrix kann dann beispielsweise in der Beschreibung des GitHub Repos oder auf Promotion Seiten der Applikation mit eingebunden werden. Diese Browsermatrix wird vor allem immer mit den Ergebnissen der Tests live aktualisiert. Das bedeutet, wenn z.B. die Tests bei Firefox fehlschlagen, wird dieser automatisch rot. Einbinden lässt sich die Matrix ganz einfach per Markdown:

```markdown
[![Sauce Test Status](https://saucelabs.com/buildstatus/YOUR_SAUCE_USERNAME)](https://saucelabs.com/u/YOUR_SAUCE_USERNAME)`
```

> Wichtig: Diese Browsermatrix funktioniert nur, wenn die Testergebnisse an den Build in SauceLabs zurück geliefert werden. Aus diesem Grund wird in meiner `protractor.conf.js` im Lifecycle `onComplete` ein Request an die SauceLabs Rest API abgesetzt, welcher die Session-ID sowie die Ergebnisse zurück meldet. Anhand dieses Ergebnisses wird von SauceLabs diese Matrix erstellt. Mehr hierzu findet Ihr im [Wiki von SauceLabs](https://wiki.saucelabs.com/display/DOCS/Using+Status+Badges+and+the+Browser+Matrix+Widget+to+Monitor+Test+Results)

### Meine ersten Tests

Bei dieser Konfiguration stehen drei globale Variablen zur Verfügung:

*   `browser`
Zur Steuerung von Aktionen innerhalb vom Browser
*   `element`
Zur Lokalisierung von Elementen im DOM
*   `protractor`
Zur Steuerung von Protractor innerhalb eines Tests

Ein einfaches Beispiel:

```typescript
describe('My first Angular 2 Application...', () => {
  beforeAll(() => browser.get('http://my.page.com'));

  it('... have the title "What a nice day"', () => {
    expect(browser.getTitle()).toEqual('What a nice day');
  });

  it('... have an inputfield', () => {
    let inputfield = element(by.tagName('input'));

    expect(inputfield.isPresent()).toBe(true);
  });
});`
```

In dieser Suite sind zwei Tests enthalten. Allerdings öffnen wir die Page `http://my.page.com` zuerst im beforeAll Hook. Da es sich hier um eine Aktion im Browser handelt, verwenden wir hierzu die Variable `browser`. Die Variable `browser` verwenden wir auch im ersten Test. Denn wir möchten den Titel vom Browser prüfen. Also rufen wir folglich die variable `browser` mit der Funktion `getTitle()` auf und prüfen über `expect` und `toEqual` den richtigen Inhalt.

> Tipp: Unter [http://www.protractortest.org/#/api](http://www.protractortest.org/#/api) findet Ihr die komplette API Beschreibung von Protractor.

Im zweiten Test hingegen prüfen wir, ob die Seite ein Inputfield enthält. Folglich benutzen wir das Element mit dem Locator `tagName` und suchen nach `input`. Mit der Elementerweiterung `isPresent()` wird mir ein boolean zurückgeliefert, mit welchem ich abprüfen kann, ob das Element existent ist oder nicht.

Wenn meine Tests dann fertig sind, kann ich Protractor ganz einfach mit

```shell
protractor protractor.conf.js
```

lokal mit Chrome starten. Wenn ich wie bereits o.g. meine Tests in unterschiedliche Suiten aufteile, kann ich diese separat aufrufen mit:

```shell
protractor protractor.conf.js --suite mySuite`
```

Hier werden nur die Testfälle welche sich innerhalb der Suite mit dem Name `mySuite` befinden aufgerufen.

Wenn dann lokal die Tests alle sauber durchlaufen, kann ich die Tests gegen verschiedene Browser auf SauceLabs laufen lassen. Wie bereits genannt, wird dies über die Umgebungsvariable "saucetest" geregelt. Folglich muss ich Protractor nun wie folgt aufrufen:

```shell
saucetest=true protractor protractor.conf.js
```

> Tipp: Nutzt das Skripting von Npm innerhalb der `package.json`. Über dieses Skripting lässt sich die notwendige Umgebungsvariable einfach steuern, indem ich einfach zwei Aufrufe per NPM erstelle. Zum Beispiel mit dem Befehl `npm run e2e-sauce` werden alle Tests auf SauceLabs ausgeführt und mit `npm run e2e` nur lokal.

## Fazit

Aufgrund der Breite dieses Spektrums, konnte ich mit diesem Artikel nur an der Oberfläche dieser Thematik schwimmen. Ebenso muss man sich mit diesem Thema intensiv beschäftigen, um die Vor- aber auch die Nachteile kennen zu lernen. Zudem muss man erst seine Erfahrungen sammeln, bis man seine eigene Konfiguration der Frameworks ausgefeilt hat. Dies gilt auch für die Entwicklung der Tests. Glaubt mir.. Bis bei mir die ersten Tests wirklich stabil über die verschiedenen Browsern gelaufen sind, ist eine Menge Zeit vergangen. Aber jetzt im Nachhinein muss ich feststellen, dass sich die investierte Zeit gelohnt hat.

Wenn man ausgeklügelt die Unit-Tests und die E2E Tests über SauceLabs kombiniert, bekommt man sehr viel Sicherheit und Produktqualität. SauceLabs kostet zwar Geld, eine Reklamation aufgrund eines Bugs kostet unter Umständen aber noch mehr. Alleine die Möglichkeit, auf SauceLabs sich mal schnell einen Browser nach Wahl in einer virtuellen Maschine manuell starten zu können, ist Gold wert. Daher kann ich dieses Trio Protractor, Jasmine und SauceLabs nur empfehlen. Das ganze dann noch kombiniert, in einer ausgeklügelten Deployment-Pipe mithilfe von [CircleCI](https://circleci.com/) per Nightly Build gibt dem Ganzen dann noch die Krönung.
