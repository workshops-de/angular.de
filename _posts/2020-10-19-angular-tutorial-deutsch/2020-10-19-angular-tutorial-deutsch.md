---
title: "Angular-Tutorial für Einsteiger"
description: "Tutorial zu Angular, dem JavaScript-Framework. Wir gehen mit euch Schritt für Schritt die Konzepte des Frameworks anhand eines Beispiels durch."
author: "Robin Böhm"
published_at: 2020-10-19 08:00:00.000000Z
categories: "tutorial angular"
tutorial_page_order: "1"
---

## Einführung

Dieses Tutorial erklärt euch die Grundlagen des Frameworks Angular. Wir behandeln hierbei Angular in der Version 2 und höher. Bewusst wird hierbei aber die Versionsnummer weggelassen, da das Framework nun semantische Versionierung benutzt. Kurz gesagt: Es ist einfach Angular.

Diese Einführung ist für Anfänger gedacht, die gerade mit Angular beginnen. Das Beispiel orientiert sich an den ersten Aufgaben unserer Workshop-Inhalte der [Angular Intensiv Schulung](https://workshops.de/seminare-schulungen-kurse/angular-typescript).

Unsere Didaktik behandelt dabei die Motivation, die Theorie und dann den Praxis-Teil. Ihr könnt hierbei alle Aufgaben selber programmieren und über unseren Workshops.DE Classroom Hilfestellungen und Musterlösungen für die Aufgaben erhalten.

<img src="/shared/assets/img/placeholder-image.svg" alt="Beispiel für Aufgaben zum Tutorial in unserem Classroom  auf Workshops.de" class="lazy img-fluid img-rounded" data-src="classroom-example.png" data-srcset="classroom-example.png"
/>

### Was wirst du in diesem Tutorial lernen?

Dieses Tutorial zeigt dir die grundlegenden Bestandteile einer Angular-Anwendung anhand eines praktischen Beispiels, welches du selber implementieren oder mit fertigen Musterlösungen nutzen und verändern kannst.

Wir werden hierbei folgende Themen behandeln:

- Was ist Angular?
- Unterschiede zu React und Vue
- Installation von Angular
- Komponenten
- Expressions und Schleifen
- Event- & Property-Binding
- Services
- Dependency-Injection
- Anbinden einer Rest-API

Wir werden hierbei die Motivation und den theoretischen Background kurz einleiten, uns jedoch primär auf praktische Beispiele konzentrieren. Wir werden eine kleine Anwendung bauen, welche uns eine Liste von Daten von einer REST-API ausliest und diese anzeigt.

<p class="text-center">
<img
style="max-width:40%"
src="/shared/assets/img/placeholder-image.svg" alt="Beispielansicht unserer Anwendung die in diesem Tutorial gemeinsam gebaut wird. Eine Liste an Büchern welche von einem Server geladen wird."
class="lazy img-fluid img-rounded" data-src="preview-bookmonkey-app.png" data-srcset="preview-bookmonkey-app.png"
/>
</p>

<div class="alert alert-success">Dieser Artikel und unser Portal ist open-source. Wenn ihr Vorschläge zur Verbesserung des Artikels habt, fühlt euch jederzeit herzlich willkommen, euch über unser <a href="https://github.com/workshops-de/angular.de" target="_blank">GitHub Repo</a> zu beteiligen. Wir freuen uns über jeden Input! </div>

## Was ist Angular?

Angular ist ein sehr erfolgreiches, clientseitiges JavaScript-Web-Framework zur Erstellung von Single-Page-Webanwendungen. Es reiht sich neben den anderen großen Frameworks für Single Page Applications ein. Wobei das nicht ganz stimmt, da Angular sich mittlerweile sogar eher zur Plattform weiterentwickelt hat. Es beinhaltet neben der reinen "API" zur Anwendungsentwicklung mittlerweile auch Entwicklungs-Werkzeuge, Generatoren und mitgelieferte Architektur-Konzepte und stellt somit eine Ready-to-Rock Lösung um Enterprise-Anwendungen zu entwickeln dar. Es reiht sich neben den beiden anderen erfolgreichen Frontend Frameworks [React](https://reactjs.de) und [VueJS](https://vuejs.de) ein.

### Unterschiede zu VueJS und React

Alle drei Bibliotheken, beziehungsweise Frameworks, haben ihre Daseinsberechtigung, Stärken und Schwächen. Je nach Use-Case sollte hier entschieden werden, welche der Alternativen die beste Basis für das aktuelle Projekt liefert.

**Angular** zielt hierbei ganz klar auf die professionelle Entwicklung von Enterprise Software ab. Durch klare Vorgaben in der Struktur und den Einsatz von Generatoren können langfristig wartbare und skalierbare Softwarelösungen erstellt werden. Konzepte wie Dependency Injection und ein Fokus auf TDD sind seit der ersten Stunde von Angular im Core verankert. Durch die klare Struktur von Projekten ist hierbei explizit die Skalierbarkeit von neuen Entwickler:innen hervorzuheben. Durch dieses massive Grundgerüst wirkt Angular auf den ersten Blick oft etwas schwergewichtig - überzeugt jedoch in Production durch systematische Optimierungen und Erweiterbarkeit.

**ReactJS** zielt hierbei eher auf einen sehr minimalen Layer auf Komponenten-Ebene ab und ermöglicht/erfordert das Konzipieren einer eigenen Architektur von Grund auf. Das bietet sehr flexible Möglichkeiten, um für individuelle Problemstellungen sehr explizite Lösungen zu bauen. Es gibt eine Auswahl an verschiedensten Modulen für die verschiedenen Anforderungen. Der Aufwand der Integration und Pflege ist hier höher als in Angular, allerdings ist das Projekt dadurch oftmals auch simpler und sehr leichtgewichtig.

**VueJS** bedient die Anforderungen zwischen diesen beiden Frameworks. Indem das Framework auf einen Generator und klare Strukturen setzt, begünstigt es ebenfalls die Skalierung von Projekt-Teams. Allerdings versucht VueJS gleichzeitig sehr leichtgewichtig zu bleiben und möglichst wenig "Framework-Magic" einzubringen. Es ist also die simple, aber strukturierte Mittellösung.

Dies ist meine persönliche Einschätzung und ich habe bereits sehr gut mit allen diesen Frameworks gearbeitet. Es kommt individuell auf die Problemstellung und das Team an. Falls ihr gerade neu im Bereich Web seid, kann ich euch auch sehr unseren [Moderne Webentwicklung und Frontend-Architekur Kurs](https://workshops.de/seminare-schulungen-kurse/frontend-architektur) empfehlen, welcher euch einen Überblick über die moderne Webentwicklung von heute aufzeigt.

### Motivation

Angular selbst hat die Ursprünge in 2009, im "wilden Westen" der Webanwendungsentwicklung. Seitdem ist viel passiert - keine Angst, ich werde jetzt hier keine Geschichtsstunde starten. Es geht eher um diesen Punkt: Wie konnte sich Angular in der wilden Welt von JavaScript Frameworks, in der gefühlt jeden Tag 10 neue Frameworks erscheinen, trotzdem als eines der erfolgreichsten Frameworks beweisen?
Dies lässt sich wahrscheinlich am einfachsten mit der Mission von Angular beschreiben:

- Apps that users ❤️ to use.
- Apps that developers ❤️ to build.
- A community where everyone feels welcome.

Durch diese Mission ist ein wunderbares Ökosystem mit einer wahnsinnig tollen Community entstanden.
Dabei ist aber der Fokus auf Qualität und Enterprise ebenfalls klar zu spüren.
Google selbst nutzt nach eigenen Angaben Angular in über 1600 Projekten.
(Google Teams nutzen übrigens AUCH React und VueJS für Projekte, wo dieser Stack besser passt).

In 2016 hat sich das Angular-Team für einen kompletten Rewrite in TypeScript entschieden.
Damals wurde die Entscheidung größtenteils negativ wahrgenommen und von anderen Framework-Benutzern zerrissen.

<img
src="/shared/assets/img/placeholder-image.svg" alt="Angular Historie - Ein Zeitstrahl, welcher sich 2016 in zwei Zweige aufgeteilt hat. AngularJS und Angular."
class="lazy img-fluid img-rounded" data-src="angular-history.png" data-srcset="angular-history.png"
/>

Heute sehen wir die Weitsicht dieser Entscheidungen, da mittlerweile viele andere Frameworks ebenfalls auf TypeScript setzen. Um Breaking Changes einfacher kommunizieren zu können, hat sich das Team ebenfalls für einen fixen Release-Plan entschieden. So können Projektteams Budgets für Updates bereits im Voraus einplanen und werden nicht von Breaking-Changes in einem Release "überrascht".

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Der Angular Release Cycle. Major Release alle 6 Monate. 1-3 Monate Minor Releases. Patch Release jede Woche." data-src="release-cycle.png" data-srcset="release-cycle.png"
/>

<hr>
<div class="workshop-hint text-center">
 <div class="h3">Angular noch schneller lernen?</div>
 <div class="row mb-2">
   <div class="col-xs-12 col-md-6">
     <p> Wir bieten auch <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angular_de&utm_campaign=tutorial&utm_medium=link&utm_content=text-article-top">Angular und TypeScript Schulungen</a>        an um dich möglichst effektiv in das Thema Angular zu begleiten. Im Kurs kannst Du die Fragen stellen, die Du nur
       schlecht googlen kannst, z.B. “Besserer Weg, um meine Applikation zu strukturieren”. Wir können sie Dir beantworten.
     </p>
     <p class="text-center">
       <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angular_de&utm_campaign=tutorial&utm_medium=button&utm_content=text-article-top">
         <button class="btn btn-danger">Zur Angular Intesiv Schulung</button>
       </a>
     </p>
   </div>
   <div class="col-xs-12 col-md-6">
     <img
     class="lazy img-fluid img-rounded"
     src="/shared/assets/img/placeholder-image.svg" alt="Teilnehmer:innen in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung" data-src="workshops-attendees.png" data-srcset="workshops-attendees.png"
     />
   </div>
 </div>
</div>
<hr>

### Die Angular Plattform

Das Ökosystem von Angular ist sehr groß. Die Basis bildet hierbei das Core-Framework. Hier sind die fundamentalen Konzepte implementiert, die für moderne Webanwendungen essenziell sind. Zwei weitere Core-Konzepte, die jedoch separat nutzbar sind, sind die Angular-CLI und die Verwaltung von Komponenten. Diese bilden die Kernfunktionalitäten, welche in fast jeder Anwendung benötigt werden. Weitere Module lassen sich _optional einbinden_, falls ihr diese benötigt:

- Routing - Routing für Single Page Applications
- forms - Formulare und Validierung
- i18n - Mehrsprachige Anwendungen
- Animations - Animationen für Transitionen
- PWA - Offline Fähigkeiten
- HTTP - HTTP, Rest und GraphQL Kommunikation
- und viele mehr

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Angular Platform Overview. Viele verschiedene Blöcke mit Modulen wie Forms, OWA, HTTP, I81n, Language Services, Router, Animcations  Cli, Components und dem Core Framework selber." data-src="angular-platform-overview.png" data-srcset="angular-platform-overview.png"
/>

In diesem Tutorial werden wir uns primär um das Framework, die Angular CLI und Komponenten kümmern.

## Vorbereitung & Installation

Beginnen wir nun mit der Installation von NodeJS.
NodeJS ist die sogenannte "JavaScript Runtime" und dafür zuständig, Programme auf unserem Rechner auszuführen, welche in der Sprache JavaScript geschrieben sind, wie z.B. das Command-Line-Interface von Angular, welches wir gleich nutzen werden.

Ihr könnt NodeJS über folgenden Link herunterladen und installieren: [https://nodejs.org/download/](https://nodejs.org/download/)

Mit NodeJS wird ebenfalls das Kommandozeilenwerkzeug `npm` installiert, welches uns ermöglicht, weitere NodeJS Pakete auf unserem Rechner zu installieren.

<div class="alert alert-info">Hinweis: Falls ihr spezielle Proxy Einstellungen benötigt, könnt ihr diese in der <a href="https://docs.npmjs.com/misc/config#https-proxy" target="_blank">NPM Dokumentation für HTTPS Proxies</a> nachlesen.</div>

Nachdem ihr die Installation erfolgreich abgeschlossen habt, könnt ihr nun über euren Terminal folgenden Befehl ausführen:

npm i -g @angular/cli bookmonkey-api

Dieser Befehl installiert die `Angular-CLI` global auf eurem Rechner und ermöglicht euch somit nach der Installation mit dem Kommandozeilenwerkzeug `ng` zu arbeiten. Als zweites Paket wird das Paket `bookmonkey-api` installiert, welches uns als simulierter Backend-Server in unserem Beispiel dient.

## Generieren der Angular App

Die Angular-CLI wird genutzt, um neue Strukturen innerhalb unserer Anwendungen zu generieren, anstatt wie oft in Projekten die Basis-Strukturen zu kopieren und über potenzielle Fehler bei der Umbenennung zu stolpern. Es ist ein mächtiges Werkzeug, welches euch mit `ng --help` einen ausführlichen Hilfetext anbietet.

Um unsere erste Anwendung zu generieren, verwenden wir den `new` command, welcher als Argument den Namen eurer Anwendung entgegennimmt. Hierbei werdet ihr gefragt, ob ihr das `Routing Module` installieren wollt: Nein. Weiterhin, welches Stylesheet Format ihr nutzen wollt: Hierbei wählt ihr bitte SCSS.

```bash
$ ng new angular-de-tutorial --strict false

? Do you want to enforce stricter type checking and stricter bundle budgets in the workspace?
  This setting helps improve maintainability and catch bugs ahead of time.
  For more information, see https://angular.io/strict
  No
? Would you like to add Angular routing?
  No
? Which stylesheet format would you like to use?
  SCSS
```

> In diesem Tutorial verzichten wir auf den Strict Mode von Angular und TypeScript, damit wir vollen Fokus auf die Angular Features legen können.

Wenn du die Angular CLI später verwendest um Code zu erzeugen, oder das Projekt auszuführen, stellt die CLI die Frage, ob du deine Nutzungsdaten anonymisiert zur Verfügung stellen möchtest, um die Angular CLI zu verbessern.

```bash
? Would you like to share anonymous usage data about this project with the Angular Team at
Google under Google’s Privacy Policy at https://policies.google.com/privacy? For more
details and how to change this setting, see http://angular.io/analytics. Yes|No
```

Nun werden automatisch die Projektstrukturen für euch angelegt. Dies inkludiert eine Startseite, eine Komponente, die ersten End2End Tests, Linter-Regeln, GitIgnore-Regeln und eine TypeScript Konfiguration.

```bash
CREATE angular-de-tutorial/angular.json (3809 bytes)
CREATE angular-de-tutorial/package.json (1209 bytes)
CREATE angular-de-tutorial/README.md (1026 bytes)
CREATE angular-de-tutorial/.editorconfig (274 bytes)
CREATE angular-de-tutorial/.gitignore (631 bytes)
CREATE angular-de-tutorial/tsconfig.json (737 bytes)
CREATE angular-de-tutorial/tslint.json (3185 bytes)
CREATE angular-de-tutorial/.browserslistrc (703 bytes)
...
CREATE angular-de-tutorial/src/app/app.module.ts (314 bytes)
CREATE angular-de-tutorial/src/app/app.component.scss (0 bytes)
CREATE angular-de-tutorial/src/app/app.component.html (25725 bytes)
CREATE angular-de-tutorial/src/app/app.component.spec.ts (979 bytes)
CREATE angular-de-tutorial/src/app/app.component.ts (224 bytes)
...
CREATE angular-de-tutorial/e2e/protractor.conf.js (904 bytes)
CREATE angular-de-tutorial/e2e/tsconfig.json (274 bytes)
CREATE angular-de-tutorial/e2e/src/app.e2e-spec.ts (670 bytes)
CREATE angular-de-tutorial/e2e/src/app.po.ts (274 bytes)
```

Nach dem Generieren werden ebenfalls notwendige Pakete via `npm` installiert. Dies kann durchaus einige Minuten dauern. Ist die Installation abgeschlossen, könnt ihr die Entwicklungsumgebung starten.

```bash
$ cd angular-de-tutorial
$ ng serve

Angular Live Development Server is listening on localhost:4200
```

Eure Basisanwendung ist nun generiert und kann im Browser unter http://localhost:4200 aufgerufen werden. Ihr solltet ein ähnliches Bild wie folgendes sehen:

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Die Webansicht von ng serve nach dem generieren der Angular Anwedung." data-src="first-ng-serve.png" data-srcset="first-ng-serve.png"
/>

## Komponenten und Services

In Angular gibt es zwei primäre Bestandteile des Frameworks, mit welchen wir uns zuerst auseinandersetzen.

**Komponenten** sind Anzeigeelemente. Sie werden als eigene HTML-Elemente definiert. Abhängig der definierten Anzeige-Logik und den aktuellen Daten stellen diese Elemente den Zustand der Anwendung dar.

**Services** sind unabhängig von der Anzeige eurer Anwendung. Sie definieren Daten, Logik und Algorithmen der Anwendung. Sie sind modular und wiederverwendbar.

### Komponenten

Angular Komponenten sind die sogenannten "building blocks" jeder Anwendung. Die verschiedenen logischen Bausteine einer Anwendung werden also in Komponenten aufgeteilt. Jeder dieser Komponenten übernimmt dabei eine bestimmte Funktion und wird als eigenes HTML-Element definiert.

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Beispiel ToDo App, welche die Anwendung in verschiedene logische Bausteine unterteilt wie Title, ItemList und Items." data-src="basic-todo-component-annotated.png" data-srcset="basic-todo-component-annotated.png"
/>

```html
<todo-title>ToDo App</todo-title>
<todo-list>
  <todo-item state="checked">Prepare Workshop</todo-item>
  <todo-item>Hold the Workshop</todo-item>
</todo-list>
```

<div class="alert alert-info">Hinweis: Diese Darstellung ist noch nicht 100% korrekt und dient in vereinfachter Form der schrittweisen Erklärung. 🙂</div>

Wie ihr in diesem kleinen Beispiel einer ToDo-Liste seht, gibt es für die verschiedenen Bereiche eigene Elemente, die in diesem Fall mit dem Prefix `todo-` eingeleitet werden. Wie ihr gut an der `todo-list` erkennt, ist es möglich und auch absolut üblich, eigene Komponenten ineinander zu verschachteln. Ziel ist es, immer wiederverwendbare und wartbare Elemente zu bauen. Was hierbei die richtige Komponentengröße ist, werdet ihr in euren Projekten selber entscheiden müssen und mit wachsender Erfahrung ein immer besseres Gefühl dafür bekommen. Bei Unsicherheit könnt ihr euch aber auch jederzeit in unserem [Discord](https://workshops.de/discord) bei uns melden.

### Services

Für Daten und Logik, die nicht zwingend nur an eine Komponente gekoppelt sind, werden in Angular Services genutzt. Ein Service ist eine Klasse, welche Attribute und Methoden definiert, die von Komponenten und anderen Services genutzt werden können.

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Beispiel der Beziehung von Angular Komponenten und Services." data-src="angular-component-service-simple-example.png" data-srcset="angular-component-service-simple-example.png"
/>

```typescript
export class TodoService {
  data = [
    {
      title: "Prepare Workshop",
      state: "checked",
    },
    {
      title: "Hold the Workshop",
    },
  ];
}
```

Die eigentlichen Daten werden also aus einem Service referenziert, denn gegebenenfalls werden auf Basis der aktuellen To-dos auch noch andere Komponenten angezeigt, wie z.B. eine Komponente, welche die aktuell offenen To-dos zählt.

Als erste Übersicht soll dies an dieser Stelle reichen. Wir werden uns später Services noch einmal genauer ansehen.

## Die erste Komponente

Wenn wir uns nun die Komponenten-Definition anschauen, kommen wir das erste Mal mit [TypeScript](https://www.typescriptlang.org/) in Berührung. TypeScript ist eine Erweiterung von JavaScript, welche uns die Möglichkeit bietet, die Daten unserer Anwendung explizit zu typisieren. Weiterhin führt diese Meta-Sprache auch Features ein, die es in JavaScript (noch) nicht gibt, wie `Decorators`. TypeScript "transpiled" unseren geschriebenen Quellcode, sodass der Browser nachher wieder ganz normales JavaScript sieht und interpretieren kann. Es ist also ein Feature, welches uns als Entwickler:innen die tägliche Arbeit angenehmer macht.

> **Klassen** wurden in ES2015 eingeführt, um Konzepte wie Vererbung und Konstruktoren nicht mehr über Prototypen abbilden zu müssen. Diese können nun über eine einfache und saubere Syntax erstellt werden.

> **Decorator** sind strukturierte Metadaten einer Klasse. Ihr kennt diese vielleicht aus anderen Programmiersprachen wie z.B. Java. Das eigentliche fachliche Verhalten der Komponente bilden wir innerhalb der Klasse mit Methoden ab.

Eine Komponenten-Definition besteht primär aus folgenden Bestandteilen:

- Einem **Component-Decorator**, welcher die Komponente innerhalb von Angular bekannt macht.
- Einer **Selektor**, welcher das HTML-Element beschreibt, welches wir erzeugen.
- Einem **HTML-Template**, welches die Darstellung unserer Komponente definiert.
- Einer **Klasse**, welche das Interface und die Anzeige-Logik der Komponente beschreibt.

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Beispiel einer Item-Komponenten-Definition der eben gezeigten ToDo App" data-src="info-box-with-expression.png" data-srcset="info-box-with-expression.png"
/>

Unsere erste Komponente wird eine statische Infobox sein. Um diese zu generieren, nutzen wir wieder die Angular-CLI.
Ihr könnt hierzu einen neuen Terminal öffnen oder den laufenden `ng serve` kurzzeitig stoppen.
Der Serve-Prozess erkennt aber automatisch Veränderungen innerhalb eures Quellcodes und kompiliert die jeweils aktuelle Version ihrer Anwendung in wenigen Sekunden.
Ich würde euch also empfehlen, ein zweites Terminal zu öffnen und folgenden Befehl zu benutzen:

```bash
$ ng generate component info-box
CREATE src/app/info-box/info-box.component.scss (0 bytes)
CREATE src/app/info-box/info-box.component.html (23 bytes)
CREATE src/app/info-box/info-box.component.spec.ts (636 bytes)
CREATE src/app/info-box/info-box.component.ts (277 bytes)
UPDATE src/app/app.module.ts (0 bytes)
```

Die für uns aktuell relevanten Dateien sind zur Zeit die `info-box.component.ts` und unser Template `info-box.component.html`. Schauen wir uns zunächst einmal unsere Klasse an.

```typescript
@Component({
  selector: "app-info-box",
  templateUrl: "./info-box.component.html",
  styleUrls: ["./info-box.component.scss"],
})
export class InfoBoxComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
```

Hier sehen wir wie erwartet eine Komponente. Unser Selektor hat den automatischen Prefix `app-` bekommen. Somit ist unsere neue Komponente nun unter dem HTML-Tag `<app-info-box></app-info-box>` nutzbar. Der Einstiegspunkt unserer kompletten Anwendung ist ebenfalls eine Komponente mit dem Namen `AppComponent`.
Um unsere frisch generierte Komponente anzuzeigen, müssen wir diese in dem Template unserer Anwendung aufrufen. Hierzu geht ihr in die Datei `app.component.html`, löscht dort den kompletten derzeitigen Inhalt und fügt eure Komponente via HTML-Tag ein.

```html
<app-info-box></app-info-box>
```

Wenn ihr nun eure Anwendung wieder im Browser öffnet, solltet ihr die Ausgabe `info-box works!` sehen.
Ihr könnt an dieser Stelle gerne mit eurem Template in `info-box.component.html` etwas herumspielen und auch mehrere dieser Info-Boxen erzeugen, indem ihr den HTML-Tag in eurem App-Template einfach kopiert.
Ein historischer Moment – nehmt euch ein paar Sekunden Zeit, um eure erste eigene Komponente zu bewundern. 😉

## Expressions

Eine Komponente mit statischen Inhalten ist natürlich nur sehr begrenzt in einer Anwendung nutzbar.
Um variable Daten anzuzeigen, nutzt Angular sogenannte Expressions in den Templates.
Diese werden mit doppelten geschweiften Klammern eingeleitet und auch wieder geschlossen.

{{ expression }}

Eine Expression wird von Angular dynamisch auf Basis der aktuellen Properties eurer Klasse ausgewertet.
Führen wir also ein neues Property `text` ein und füllen dieses mit einem String, können wir diesen in unserem Template ausgeben.

```typescript
class InfoBoxComponent implements OnInit {
  text = "Additional Info-Text on our Info Box! 🎊";

  constructor() {}

  ngOnInit() {}
}
```

```html
<p>info-box works!</p>
<p>{{text}}</p>
```

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Ausgabe der Info-Box Komponente mit unserem dynamischen Expression Text" data-src="info-box-with-expression.png" data-srcset="info-box-with-expression.png"
/>

Sollte sich die Property `text` ändern, z. B. durch externe Events, wird diese automatisch von Angular aktualisiert. Dieses Konzept nennt sich `Data-Binding`.

## Property- & Event-Bindings

Andere Komponenten können über sogenannte Property- und Event-Bindings eingebunden werden.
Angular verbindet sich hierbei mit den Eigenschaften und Events der nativen HTML-Elemente.
Somit ist auch das Benutzen von anderen Elementen aus Frameworks wie ReactJS oder VueJS einfach möglich.

Um auf eine Properties von Elementen zuzugreifen, nutzen wir die eckigen Klammern innerhalb unseres HTML Templates. Möchten wir also z.B. die [HTMLElement.hidden Property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden) einer Komponente beeinflussen, können wir das wie folgt erreichen:

```html
<p [hidden]="'true'">{{text}}</p>
```

Hier wird die Eigenschaft `hidden` des Elements auf `'true'` gesetzt und somit das Element ausgeblendet.
Um diese Eigenschaft dynamisch zu ändern, haben wir die Möglichkeit, in unserer Klasse selbst eine neue Property einzuführen und diese per `Property-Binding` an die Property des p-Elements zu binden.
Hierzu setzen wir statt dem string `'true'` den Namen des Attributes in unserer Klasse auf das Binding:

```typescript
class InfoBoxComponent implements OnInit {
  text = "Additional Info-Text on our Info Box! 🎊";
  hidden = true;

  constructor() {}

  ngOnInit() {}
}
```

```html
<p>info-box works!</p>
<p [hidden]="hidden">{{text}}</p>
```

Um die Komponente nun durch User-Interaktion zu ändern, haben wir die Möglichkeit, auf sogenannte `Events` zu hören und hierfür ebenfalls ein `Event-Binding` zu definieren.
Event-Bindings werden in Angular über Runde Klammern definiert, welche den Namen des Events enthalten.
Wenn wir nun also auf das [click Event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) eines HTML-Elements hören wollen, können wir das wie folgt erreichen.

```html
<button (click)="someFunction()">Button Text</button>
```

Innerhalb dieser Definition haben wir nun die Möglichkeit, ein sogenanntes `Template-Statement` zu definieren. Dies kann sowohl eine `Template-Expression` sein, die z. B. direkt Änderungen an Attributen eurer Klasse als auch eine Referenz auf eine Methode in eurer Klasse macht.
Um es einfach zu halten, nutzen wir in diesem Fall erstmal eine `Template-Expression`, welche den Wert von `hidden` jeweils negiert. Also aus `true` wird `false` und andersherum.

```html
<p>info-box works!</p>
<button (click)="hidden=!hidden">Toggle</button>
<p [hidden]="hidden">{{text}}</p>
```

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Animation der Basis Show and Hide Infobox" data-src="info-box-toggle.gif" data-srcset="info-box-toggle.gif"
/>

Wir können natürlich auch jedes andere Event, wie z. B. `keyup` benutzen. Mit diesem sehr simplen Mechanismus können wir generisch alle Arten von Komponenten benutzen und mit ihnen interagieren. Dies ist unabhängig davon, ob sie in Angular oder einem anderen Framework geschrieben sind.

## Schleifen mit \*ngFor

Ein weiteres Core-Feature ist wie in jedem Framework die Ausgabe von listenartigen Datenstrukturen.
Hierfür gibt es in Angular die Direktive `*ngFor`.

> Direktiven sind HTML Attribute, welche an DOM-Elementen genutzt werden können.
> Hierbei können wir zwischen `Attribute Directives` und `Structural directives` unterscheiden.
> Attribute Directives verändern oder beeinflussen das Verhalten eines Elements, an dem sie angehangen werden, wie z. B. `ngStyle` zum Setzen von CSS-Styles auf Basis von Daten.
> Structural directives erzeugen oder entfernen DOM-Elemente, wie z.B. `ngIf` oder `ngFor`.
> Strukturelle Direktiven werden mit dem Prefix `*` gekennzeichnet.

Die Direktive ist angelehnt an eine For-Schleife, iteriert über eine listenartige Struktur und erzeugt für jedes Element eine Kopie des DOM-Elements, auf das es angewandt wird.

```html
<!-- book-list.component.html -->

<ul>
  <li *ngFor="let book of books">
    <span>{{book.title}}</span> - <small>{{book.subtitle}}</small>
  </li>
</ul>
```

Hierbei wird eine sogenannte `Looping Variable`, in unserem Beispiel `book` und eine Liste, in unserem `books` definiert. Die Variable Buch enthält somit jeweils den Wert des aktuellen Listeneintrags.

Um `*ngFor` auszuprobieren, erzeugen wir eine neue Komponente mit der Angular CLI.
Dazu führen wir den command `ng generate component book-list` aus.
Damit die Komponente im Browser angezeigt wird, fügen wir das Tag `<app-book-list></app-book-list>` in das Template der `app.component.html` ein.
Wenn wir also in der `BookListComponent` (siehe _book-list.component.ts_) eine Variable `books` mit einer Liste von Büchern definieren, erhalten wir hierfür 3 DOM-Elemente.

```typescript
books = [
  {
    title: "Book #1",
    subtitle: "Subtitle #1",
  },
  {
    title: "Book #2",
    subtitle: "Subtitle #2",
  },
  {
    title: "Book #3",
    subtitle: "Subtitle #3",
  },
];
```

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Die liste der statischen Bücher in HTML ausgeben" data-src="static-list-of-books.png" data-srcset="static-list-of-books.png"
/>

<hr>
<div class="workshop-hint text-center">
 <div class="h3">Angular noch schneller lernen?</div>
 <div class="row mb-2">
   <div class="col-xs-12 col-md-6">
     <p> Wir bieten auch <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angular_de&utm_campaign=tutorial&utm_medium=link&utm_content=text-article-mid">Angular und TypeScript Schulungen</a>        an um dich möglichst effektiv in das Thema Angular zu begleiten. Im Kurs kannst Du die Fragen stellen, die Du nur
       schlecht googlen kannst, z.B. “Besserer Weg, um meine Applikation zu strukturieren”. Wir können sie Dir beantworten.
     </p>
     <p class="text-center">
       <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angular_de&utm_campaign=tutorial&utm_medium=button&utm_content=text-article-mid">
         <button class="btn btn-danger">Zur Angular Intesiv Schulung</button>
       </a>
     </p>
   </div>
   <div class="col-xs-12 col-md-6">
     <img
     class="lazy img-fluid img-rounded"
     src="/shared/assets/img/placeholder-image.svg" alt="Teilnehmer:innen in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung" data-src="workshops-attendees.png" data-srcset="workshops-attendees.png"
     />
   </div>
 </div>
</div>
<hr>

## Der erste Service

Wer genau aufgepasst hat, dem ist aufgefallen, dass die Daten in einer Angular Anwendung nicht in die Komponente gehören.
Wir vermischen hier die Anzeige-Logik mit der Verwaltung unserer Daten.
Nehmen wir also ein kurzes Refactoring unserer Anwendung vor und extrahieren die Daten in einen separaten Service.

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Animation der Extraktion der Daten von der Komponente in einen Service." data-src="extract-service.gif" data-srcset="extract-service.gif"
/>

Ein Service sollte sich immer um eine explizite Aufgabe kümmern und dementsprechend auch benannt werden.
In unserem Fall wollen wie die Daten von Büchern verwalten.
Wir nennen unseren Service also `BookDataService`.
Um diesen zu generieren, können wir wie gewohnt die Angular-CLI benutzen.

```bash
$ ng generate service book-data
```

```typescript
export class BookDataService {
  books = [
    {
      title: "Book #1 from Service",
      subtitle: "Subtitle #1",
    },
    {
      title: "Book #2 from Service",
      subtitle: "Subtitle #2",
    },
    {
      title: "Book #3 from Service",
      subtitle: "Subtitle #3",
    },
  ];

  constructor() {}

  getBooks() {
    return this.books;
  }
}
```

Somit haben wir die Daten aus unserer Komponente gezogen.
Die Frage ist jetzt nur: Wie bekomme ich die Daten nun wieder in meine Komponente verbunden?
An dieser Stelle kommt der Begriff `Dependency Injection` ins Spiel.

### Dependency Injection

Unter `Dependency Injection` versteht man ein Design-Pattern, welches ebenfalls `Inversion of Control` genannt wird. Hierbei geht es darum, dass die erforderliche Abhängigkeit (Dependency) nicht von der aufrufenden Stelle selbst erzeugt wird, sondern diese Komponente die Kontrolle abgibt und lediglich definiert, welche Abhängigkeiten bestehen.

In unserem kleinen Beispiel erstellt also die `BookListComponent` nicht unseren Service, sondern gibt dem Angular Framework lediglich Bescheid, dass sie einen `BookDataService` benötigt, um zu funktionieren.

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Angular DI erklärt indem die Komponente mit dem Injektor einen Dialog über ihre Bedürfnisse führt" data-src="di-explained-dialog.gif" data-srcset="di-explained-dialog.gif"
/>

<div class="alert alert-info">Hinweis: Dies ist eine sehr vereinfachte Darstellung von Dependency Injection in Angular, um das Grundkonzept zu verstehen. </div>

Innerhalb des Angular Frameworks werden die verschiedenen Services von dem sogenannten `Injector` verwaltet.
Dieser gibt der aufrufenden Stelle eine Referenz auf den angefragten Service, sofern dieser definiert ist.

Die Definition der Abhängigkeit wird hierbei über den Konstruktor abgebildet. In dem Beispiel unserer `BookListComponent` definieren wir die Abhängigkeit auf `BookDataService` und binden diese an das Feld `bookData` unserer Komponente.

<div class="alert alert-info">Hinweis: Wir benutzen hier die Typisierung von TypeScript, indem wir `: BookDataService` nach unserer Variablen schreiben. Dies bedeutet, dass die Variable `bookData` den Typ `BookDataService` hat und essenziell für den Dependency Injection Mechanismus ist. An den anderen Stellen dieses Tutorials haben wir die Typisierung nicht benutzt, um die Komplexität des Tutorials möglichst klein zu halten.</div>

Innerhalb des Konstruktors rufen wir dann die `getBooks()` Methode des Services auf und beschaffen uns unsere Daten.

```typescript
export class BookListComponent {
  books = [];

  constructor(private bookData: BookDataService) {
    this.books = this.bookData.getBooks();
  }
}
```

Meist importiert deine IDE den `BookDataService` automatisch.
Sollte dies nicht der Fall sein, kannst du dies selbst vornehmen und folgenden import an den Anfang der `book-list.component.ts` schreiben.

```typescript
import { BookDataService } from "../book-data.service";
```

## Daten via Rest-API nachladen

Die aktuelle Version hat uns die Konzepte von Angular Stück für Stück näher erklärt. In der Realität werden Daten jedoch meist von einem Server asynchron nachgeladen.

Wir laden diese Daten von einer Beispiel-API, welche ihr mit folgendem Befehl starten könnt:

```bash
$ npx bookmonkey-api
JSON Server is running on port 4730
```

Unter folgender URL könnt ihr euch nun die Daten ansehen, welche vom Server ausgegeben werden: <a href="http://localhost:4730/books" target="_blank">http://localhost:4730/books</a>

Im nächsten Schritt wollen wir diese Daten aus unserem `BookDataService` heraus abrufen. Dazu benötigen wir den sogenannten `HttpClient` Service. Dieser bietet uns eine sehr einfache API, um verschiedene Operationen auf eine HTTP-Schnittstelle auszuführen.

Der Service ist Teil eines separaten Modules und muss explizit eingebunden werden. Wir erreichen dies, indem wir in der Datei `app.module.ts` das `HttpClientModule` importieren und im Array `imports` angeben.

```typescript
// ...
import {HttpClientModule} from '@angular/common/http';

@NgModule({
 declarations: [
   AppComponent,
   InfoBoxComponent,
   BookListComponent
 ],
 imports: [
   BrowserModule,
   HttpClientModule
 ],
// ...
```

Ist dies erledigt, kennt unser `Injector` auch einen Service vom Typ `HttpClient`, welchen wir nun über den Konstruktor unseres `BookDataService` einbinden können.

```typescript
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BookDataService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get("http://localhost:4730/books");
  }
}
```

Der Service bietet uns die Methode `.get(url:string)`, welcher wir den API-Endpoint für unsere Abfrage angeben können. Wir nutzen hier die Adresse des lokal gestarteten JSON-Servers.

### Umgang mit Asynchronität

<div class="alert alert-info">Hinweis: Wir gehen in diesem Tutorial davon aus, dass Asynchronität in JavaScript bereits bekannt ist. Es gibt dazu eine sehr gute Einführung in den <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous" target="_blank">Mozilla Web Docs über Asynchronous JavaScript</a>. </div>

Der Rückgabewert der get-Methode des HTTP-Services liefert ein [Observable](https://angular.io/guide/observables-in-angular) zurück. Dies ist eine Datenstruktur, welche uns den Umgang mit asynchronen Daten erleichtert. Angular nutzt dafür die [RxJS Observables](https://rxjs.dev/guide/observable).

Es hat sich als guter Stil etabliert, Variablen und Felder, welche asynchrone Datenstrukturen halten, mit einem `$` postfix zu kennzeichnen. Es hat rein funktional keinen Einfluss, hilft jedoch beim langfristigen Zurechtfinden und der Wartung eurer Anwendung.

```typescript
export class BookListComponent {
  books$: Observable<Object>;

  constructor(private bookData: BookDataService) {
    this.books$ = this.bookData.getBooks();
  }
}
```

Meist importiert deine IDE den `Observable` automatisch.
Sollte dies nicht der Fall sein, kannst du dies selbst vornehmen und folgenden import an den Anfang der `book-list.component.ts` schreiben.

```typescript
import { Observable } from "rxjs";
```

Der Aufruf innerhalb unserer Komponente ändert sich also im Grunde nicht. Die Auswertung innerhalb unseres HTML-Templates muss jedoch etwas angepasst werden. Mithilfe einer sogenannten `async` Pipe können wir der `*ngFor` Direktive den Umgang mit der asynchronen Datenstruktur ermöglichen.

```html
<ul>
  <li *ngFor="let book of books$ | async">
    <span>{{book.title}}</span> - <small>{{book.subtitle}}</small>
  </li>
</ul>
```

Die `async` Pipe in Verbindung mit `*ngFor` registriert sich auf asynchrone Updates der `books$` Variable. Durch diese Anpassung unseres Templates können wir nun auch die Daten von unseren JSON-Server wie folgt anzeigen:

<img
class="lazy img-fluid img-rounded"
src="/shared/assets/img/placeholder-image.svg" alt="Die Ausgabe der Liste von Büchern aus dem HTTP-Backend" data-src="http-list-of-books.png" data-srcset="http-list-of-books.png"
/>

## Fazit

Angular ist in vielerlei Hinsicht sehr opinionated (meinungsstark). Dies bedeutet, dass viele Entscheidungen über Architektur und Rendering dem/der Entwickler:in bereits abgenommen werden. Dies hat natürlich den Vorteil, dass sich das Projektteam zu 100% auf die Umsetzung von Features konzentrieren kann und nicht die grundlegende Architektur eigenständig aufbauen muss.

Durch die sehr einheitliche Struktur von Angular Anwendungen lassen sich in Angular ausgebildete Entwickler:innen sehr schnell in das Projekt integrieren, da Angular Anwendungen stets einer gewissen Struktur folgen. Dies macht die Skalierung von Entwickler:innen-Zeit auf dem Projekt deutlich einfacher als mit Individuallösungen der Architektur in anderen Frameworks.

Generell ist es für langlebige Enterprise Projekte sicherlich eine gute Option. Andere Frameworks wie React und VueJS sollten aber ebenfalls in Betracht gezogen werden, um objektiv die beste Entscheidung für die aktuellen Herausforderungen zu treffen.

Wenn Ihr euch weiter mit uns und anderen austauschen wollt, kommt in unseren [Discord Chat](/discord) mit über 2000 wunderbaren anderen Menschen! Zusammen lernt es sich besser! :)

<hr>
<div class="workshop-hint text-center">
 <div class="h3">Hat dir das Tutorial geholfen?</div>
 <div class="row mb-2">
   <div class="col-xs-12 col-md-6">
     <p> Wir bieten auch <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angular_de&utm_campaign=tutorial&utm_medium=link&utm_content=text-buttom">Angular und TypeScript Schulungen</a>        an um dich möglichst effektiv in das Thema Angular zu begleiten. Im Kurs kannst Du die Fragen stellen, die Du nur
       schlecht googlen kannst, z.B. “Besserer Weg, um meine Applikation zu strukturieren”. Wir können sie Dir beantworten.
     </p>
     <p class="text-center">
       <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angular_de&utm_campaign=tutorial&utm_medium=button&utm_content=text-buttom">
         <button class="btn btn-danger">Zur Angular Intesiv Schulung</button>
       </a>
     </p>
   </div>
   <div class="col-xs-12 col-md-6">
     <img
     class="lazy img-fluid img-rounded"
     src="/shared/assets/img/placeholder-image.svg" alt="Teilnehmer:innen in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung" data-src="workshops-attendees.png" data-srcset="workshops-attendees.png"
     />
   </div>
 </div>
</div>
<hr>
