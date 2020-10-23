---
title: "Angular-Tutorial für Einsteiger"
description: "Tutorial zu Angular, dem JavaScript-Framework. Wir gehen mit euch Schritt für Schritt die Konzepte des Frameworks anhand eines Beispiels durch."
author: "Robin Böhm"
published_at: 2020-10-19 08:00:00.000000Z
categories: "tutorial angular"
tutorial_page_order: '1'
---

## Einführung

Dieses Tutorial erklärt euch die Grundlagen des Frameworks Angular. Wir behandeln hierbei Angular in der Version 2 und höher. Bewusst wird hierbei aber die Versionsnummer weggelassen, da das Framework nun semantische Versionierung benutzt. Kurz gesagt: Es ist einfach Angular.
Es ist  nicht erforderlich das AngularJS(Angular 1) Tutorial vorher durchzuarbeiten. Diese Einführung ist für Anfänger gedacht, die gerade mit Angular beginnen. Das Beispiel orientiert sich an den ersten Aufgaben unserer Workshop-Inhalten der [Angular Intensiv Schulung](https://workshops.de/seminare-schulungen-kurse/angular-typescript).

Unsere Didaktik behandelt dabei die Motivation, die Theorie und dann den Praxis-Teil. Ihr könnt hierbei alle Aufgaben selber Programmieren und über unseren Workshops.DE Classroom Hilfestsellungen und Musterlösungen für die Aufgaben erhalten.

<img class="img-fluid img-rounded" src="classroom-example.png" alt="Beispiel für Aufgaben zum Tutorial in unserem Classroom  auf Workshops.de">

Den Quellcode für das Tutorial findet ihr in unsererem GitHub-Repository: <a href="https://github.com/angularjs-de/angular2-tutorial" title="Tutorial Quellcode" target="_blank"><strong>Tutorial Quellcode</strong></a>

### Was ist Angular?
Angular ist ein sehr erfolgreiches clientseitiges JavaScript-Webframework zur Erstellung von Single-Page-Webanwendungen. Es reiht sich neben den anderen großen Frameworks für Single Page Applications ein. Wobei das nicht ganz stimmt, da Angular sich mittlerweile sogar eher zur Platform weiterentwickelt hat. Es beinhaltet neben der reinen "API" um Anwendungen zu entwicklen mittlerweile auch Entwicklungs-Werkzeuge, Generatoren und mitgelieferte Architektur-Konzepte. Eine Ready-to-Rock Lösung um Enterprise-Anwendungen zu entwickeln. Es reiht sich ein neben den beiden anderen erfolgreichen Frontend Frameworks [React](https://reactjs.de) und [VueJS](https://vuejs.de).


### Unterschiede zu Vue und React
Alle drei Bibliotheken bzw Frameworks haben ihre Daseinsberechtigung, Stärken und Schwächen. Je nach Use-Case sollte hier entschieden werden, welche der Alternativen die beste Basis für das aktuelle Projekt liefert.

**Angular** zielt hierbei ganz klar auf die professionelle Entwicklung von Enterprise Software. Durch klare Vorgaben in Struktur und den Einsatz von Generatoren können langfristig wartbare und skalierbare Softwarelösungen erstellt werden. Konzepte wie Dependency Injection und ein Fokus auf TDD sind seit der ersten Stunde von Angular im Core verankert. Durch die klare Struktur von Projekten ist hierbei explizit die Skalierbarkeit von neuen Entwickler:innen hervorzuheben. Durch dieses Massive Grundgerüst wirkt Angular auf den ersten Blick oft etwas schwergewichtig - überzeugt jedoch in Production durch systematische Optimierungen und Erweiterbarkeit.

**ReactJS** zielt hierbei eher auf einen sehr minimalen Layer auf Komponenten-Ebene und ermöglicht/erfordert das Konzipieren einer eigenen Architektur vom Grund auf. Dies bietet sehr flexible Möglichkeiten für individuelle Problemstellungen sehr explizite Lösungen zu bauen. Es gibt eine Auswahl an verschiedensten Modulen für die verschiedene Anforderungen. Der Aufwand der Integration und Pflege ist hier höher als in Angular, allerdings ist das Projekt dadurch oftmals auch simpler und sehr leichtgewichtig.

**VueJS** bedient die Anforderungen zwischen diesen beiden Frameworks. Indem das Framework auf einen Generator und klare Strukturen setzt begünstigt es ebenfalls die Skalierung von Projekt-Teams. Allerdings versucht Vue gleichzeitig sehr leichtgewichtig zu bleiben und möglicht wenig "Framework-Magic" einzubringen. Es ist also die simple aber strukturiere Mittellösung.

Dies ist meine persöhnliche Einschätzung und ich habe bereits sehr gut mit allen dieser Frameworks gearbeitet. Es kommt individuell auf die Problemstellung und das Team an. Falls ihr gerade Neu im Bereich Web seid kann ich euch auch sehr unseren [Moderne Webentwicklung und Frontend-Architekur Kurs](https://workshops.de/seminare-schulungen-kurse/frontend-architektur) empfehlen, welcher euch einen Überblick in die moderne Webentwicklung von heute aufzeigt.


### Motivation
Angular selbst hat die Ursprünge in 2009, im "wilden Westen" der Webanwendungsentwicklung. Seitdem ist viel passiert - keine Angst, ich werde jetzt hier keine Geschichtsstunde starten. Es geht eher um den Punkt: In der wilden Welt von JavaScript Frameworks wo gefühlt jeden Tag 10 neue Frameworks raus kommmen ... wie konnte sich Angular sich auch seit über 10 Jahren noch als eines der erfolgreichsten Frameworks beweisen?
Dies lässt sich wahrscheinlich am einfachsten mit der Mission von Angular beschreiben:

* Apps that users ❤️ to use.
* Apps that developers ❤️ to build.
* A community where everyone feels welcome.

Durch diese Mission ist ein wunderbares Ökosystem mit einer wahnsinnig tollen Community entstanden.
Neben diesen ist aber der Fokus auf Qualität und Enterprise ebenfalls klar zu spüren.
Google selber selbst nutzt nach eigenen Angaben Angular in über 1600 Projekten ein.
(Google Teams nutzen übrigens AUCH React und VueJS für Projekte wo dieser Stack besser passt).

In 2016 hat sich das Angular-Team für ein kompletten Rewrite in TypeScript entschieden.
Damals wurde die Entscheidung größtenteils negativ wahrgenommen und von anderen Framework Benutzern zerrissen.

<img class="img-fluid img-rounded" src="angular-history.png" alt="Angular Historie - Ein Zeitstrahl welcher sich 2016 in zwei Zweige aufteilt. AngularJS und Angular">


Heute sehen wir die Weitsicht dieser Entscheidungen, da mittlerweile viele andere Frameworks ebenfalls auf TypeScript setzen. Um Breaking Changes einfacher kommunizieren zu können hat sich das Team ebenfalls für ein fixen Relase Plan entschieden. So können Projekt-Teams Budgets für Updates bereits im Vorraus einplanen und werden nicht von Breaking-Changes in einem Release "überrascht".

<img class="img-fluid img-rounded" src="release-cycle.png" alt="Der Angular Release Cycle">

### Die Angular Platform

Das Ökosystem von Angular ist sehr groß. Die Basis bildet hierbei das Core-Framework. Hier sind die fundamentalen Konzepte implementiert die für moderne Web-Anwendungen essentiell sind. Zwei weitere Core-Konzepe die jedoch als separant nutzbar sind ist die Angular-CLI und das die Verwaltung von Komponenten. Diese bilden die Kernfunktionalitäten ab welche in fast jeder Anwendung benötigt werden. Weitere Module lassen sich *optional einbinden* falls ihr diese benötigt:

* Routing - Routing für Single Page Applications
* forms - Formulare und Validierung
* i18n - Mehrsprachige Anwendungen
* Animations - Animationen für Transitionen
* PWA - Offline Fähigkeiten
* HTTP - HTTP, Rest und GraphQL Kommunikation
* und viele mehr

<img class="img-fluid img-rounded" src="angular-platform-overview.png" alt="Angular Plarform Overview">

In diesem Tutorial werden wir uns primär um das Framework, die Angular CLI und Komponenten kümmern.

## Vorbereitung & Installation
<div class="alert alert-success">👨‍💻👩‍💻Classroom Task: <a href="#" target="_blank">Install Chrome, Node & IDE</a></div>

Beginnen wir nun mit der Installation von NodeJS.
NodeJS ist die sogenannte "JavaScript Runtime" und dafür zuständig Programme auf unserem Rechner auszuführen welche in der Sprache JavaScript geschrieben sind wie z.B. das Command-Line-Interface von Angular welches wir gleich nutzen werden.

Ihr könnt NodeJS über folgenden Link herrunterladen und installieren: [https://nodejs.org/download/](https://nodejs.org/download/)

Mit NodeJS wird ebenfalls das Kommandozeilenwerkzeug `npm` installiert, welches uns ermöglicht weitere NodeJS Pakete auf unserem Rechner zu installieren.

<div class="alert alert-info">Hinweis: Falls ihr spezielle Proxy Einstellungen benötigt könnt ihr diese in der <a href="https://docs.npmjs.com/misc/config#https-proxy" target="_blank">NPM Dokumentation für HTTPS Proxies</a> nachlesen.</div>

Nachdem ihr die Installation erfolgreich abgeschlossen habt, könnt ihr nun über euren Terminal folgenden Befehl ausführen:

    npm i -g @angular/cli bookmonkey-api

Dieser Befehl installiert die `Angular-CLI` global auf eurem Rechner und ermöglicht euch somit nach der Installation mit dem Kommandozeilenwerkzeug `ng` zu arbeien. Als zweites Paket wird das Paket `bookmonkey-api` installiert, welches uns als simulierter Backend-Server in unserem Beispiel dient.

## Generieren der Angular App

<div class="alert alert-success">👨‍💻👩‍💻Classroom Task: <a href="#" target="_blank">Create a new project</a></div>

Die Angular-CLI wird genutzt um neue Strukturen innerhalb unser Anwendungen zu generieren, anstatt wie oft in Projekten die Basis-Strukturen zu kopieren und über potentielle Fehler bei der Umbenennung zu stolpern. Es ist ein mächtiges Werkzeug welches euch mit `ng  --help` eine ausführlichen Hilfetext anbietet.

Um unsere erste Anwendung zu generieren verwenden wir den `new` command welcher als Argument den Namen eurer Anwendung entgegennimmt. Hierbei werdet ihr gefragt ob ihr das `Routing Module` installieren wollt: Ja. Weiterhin welches Stylesheet Format ihr nutzen wollt: Hierbei wählt ihr bitte SCSS.

```bash
$ ng new angular-de-tutorial

? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? SCSS
```

Nun werden automatisch die Projektstrukturen für euch angelegt. Dies inkludiert eine Startseite, eine Komponente, die ersten End2End Tests, Linter-Regeln, GitIgnore-Regeln und eine TypeScript Konfigiration.

```bash
CREATE angular-de-tutorial/angular.json (3671 bytes)
CREATE angular-de-tutorial/package.json (1296 bytes)
CREATE angular-de-tutorial/README.md (1034 bytes)
CREATE angular-de-tutorial/tsconfig.json (543 bytes)
CREATE angular-de-tutorial/tslint.json (1953 bytes)
...
CREATE angular-de-tutorial/e2e/tsconfig.json (214 bytes)
CREATE angular-de-tutorial/e2e/src/app.e2e-spec.ts (652 bytes)
CREATE angular-de-tutorial/e2e/src/app.po.ts (301 bytes)
```

Nach dem Generieren werden ebenfalls notwendige Pakete via `npm` installiert. Dies kann durchaus einige Minuten dauern. Ist die Installation abgeschlossen könnt ihr die Entwicklungsumgebung starten.

Anschliessend können wir die Entwicklungsumgebung starten, wir müssen und mit der Console im Order der soeben Generierten App befinden.

```bash
$ cd angular-de-tutorial
$ ng serve

Angular Live Development Server is listening on localhost:4200
```

Eure Basisanwendung ist nun generiert und kann im Browser under http://localhost:4200 aufgerufen werden. Ihr solltet ein ähnliches Bild wie folgendes sehen:

<img class="img-fluid img-rounded" src="first-ng-serve.png" alt="Website View of first NG Serve after generating the applicatin">


## Überblick

* Basis-Komponente, Klassen und Decorators(ähnlich Annotationen)
* Property- und Event-Binding
* Zwei-Wege-Datenbindung
* Expressions
* Direktiven und Komponenten
* Schleifen mit ngFor
* Pipes(Filter)
* Services
* HTTP
* Observables
* Component-Lifecycle + [extra Artikel](/artikel/angular-2-component-lifecycle/)
* Interfaces
* [Routing mit Angular](/artikel/angular-routing-tutorial-deutsch/)

<div class="alert alert-info">Hinweis: Das Tutorial orientiert sich stark am <a href="https://angular.io/docs/ts/latest/guide/style-guide.html" target="_blank">Style-Guide</a> für Angular Anwendungen.</div>

## Bootstrap unser Anwendung

Die Beispiele in diesem Tutorial haben wir in TypeScript geschrieben. Da viele Entwickler mit ES2015 und TypeScript nicht vertraut sind, werden wir zu neuen Funktionalitäten eine kurze Erklärung einstreuen. Ihr könnt auch eure AngularJS 1 Anwendung mit diesem Stack schreiben und euer Projekt somit sehr nah an Angular anlehnen. Dies macht eine potentielle Portierung so sehr viel angenehmer. Die ersten Vorteile von diesem Stack sehen wir bereits in unser initialen [Index-Datei](https://github.com/angularjs-de/angular2-tutorial/blob/master/02-bootstrap/src/index.html). Anstatt riesigen Listen von `<script src="...">`, wie wir sie heutzutage in fast jeder Single-Page-Application(SPA) sehen, kümmert sich unser Build-Prozess selber um die nötigen Imports.

Weiter brauchen wir noch ein Einstiegspunkt unserer Anwendung. In Angular 1.X haben wir dies immer mit der [ng-app Direktive](/artikel/angularjs-tutorial-deutsch/#ng-app---der-anfang-jeder-angularjs-applikation) gelöst. Nun definieren wir ein Angular Modul indem wir eine (meist leere) Klasse um den `@NgModule`-Decorator erweitern.

> **Klassen** wurden in ES2015 eingeführt, um Konzepte wie unter anderem Vererbung und Konstruktoren nicht mehr über Prototypen abbilden zu müssen. Diese können nun über eine einfache und saubere Syntax erstellt werden.

> **Decorator** sind strukturierte Meta-Daten einer Klasse. Ihr kennt diese vielleicht aus anderen Programmiersprachen wie z.B. Java. Das eigentliche fachliche Verhalten der Komponente bilden wir innerhalb der Klasse mit Methoden ab. Somit haben wir das Model und die Anzeige-Logik der Komponente sehr sauber getrennt.

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In diesem Modul definieren wir potentielle Abhängigkeiten zu anderen Modulen und die Haupt-Komponente unserer Anwendung die `AppComponent`. Angular lehnt sich deutlich mehr an die offiziellen Web-Components an und wird zu diesen kompatibel sein. Deshalb liegt es auf der Hand, dass wir einfach ein neues HTML-Element einführen welches unsere Anwendung an dieser Stelle für uns generiert. In unserem Fall unsere Pizza-Anwendung.

```html
<pizza-root>Lädt...</pizza-root>
```

Unsere PizzaApp-Komponente übernimmt die komplette Komposition der Anwendung. Die Basis von diesem Element ist unsere PizzaApp Klasse.

```typescript
class PizzaApp {
}
```

Unsere Komponente soll im ersten Schritt nichts weiter tun als einen `<h1>`-Tag zu erzeugen. Hierzu erweitern wir die Klasse `AppComponent` mit dem `@Component`-Decorator. Diese müssen wir jedoch erst mit einem [Import-Statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) laden. Dies ist ebenfalls eine ES2015 Erweiterung welche es uns nun endlich die Modularisierung auf Sprachebene ermöglicht.

```typescript
import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  template : `<h1>
      Willkommen zum
      Angular2 Tutorial von
      Angular.DE
    </h1>`
})
```


Um unser Template zu definieren können wir die Eigenschaft `template`nutzen. Hierzu benutzen wir ein weiteres ES2015 Feature mit dem Namen `Template Strings`.

> **Template-Strings** ermöglichen es uns sehr einfach mehrzeilige HTML-Templates innerhalb von JavaScript zu definieren. Es ist sogar möglich innerhalb dieser Strings Expressions zu verwenden, welche im aktuellen Kontext interpoliert werden. Für Weitere Informationen zu diesem Thema findet ihr z.B. auf der MDN Platform unter dem Kapitel [Template Strings Referenz](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings).

Es es natürlich auch in Angular Möglich `templateUrl` zu benutzen, um eine HTML Datei für das Template anzugeben. Aufgrund der besseren Lesbarkeit innerhalb von diesem Artikel haben wir uns aber dafür entschieden die kompletten Komponenten in einer Datei zusammen zu fassen.

Als nächsten müssen wir die Meta-Daten der eigentlichen Komponente definieren. Hierbei können wir über die Eigenschaft `selector` mit Hilfe einer CSS-Selektor-Regel definieren, wann unsere Komponente angewendet werden soll.

```typescript
import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'pizza-root',
  template : `<h1>
      Willkommen zum
      Angular2 Tutorial von
      Angular.DE
    </h1>`
})
export class AppComponent {
}
```

Nun haben wir unsere [minimale Komponente](https://github.com/angularjs-de/angular2-tutorial/blob/master/02-bootstrap/src/app/app.component.ts) bereits fast komplett fertig definiert. Was uns jetzt noch fehlt ist eine kleine Helper-Funktion die Angular uns mitliefert: Die `bootstrap` Funktion. Mit Hilfe dieser Funktion stoßen wir die Initialisierung des Modules an.

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/';

platformBrowserDynamic().bootstrapModule(AppModule);
```


[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/02-bootstrap/src/app/app.component.ts) app.component.ts<br>
[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/02-bootstrap/src/main.ts) main.ts

Nach dem Angular Style-Guide sollte das Starten der Anwendung in einer extra Datei geschehen. Diese trägt in der Regel den Namen `main.ts`. Aus diesem Grund ist auch der obige Quellcode in diese Dateien aufgeteilt.

<div class="alert alert-warning">Beachte: In der Regel besteht eine Anwendung nicht nur aus einer Komponente, sondern aus komplexeren Logiken. In diesen Fällen bietet es sich an das Starten (bootstrap) der Anwendung in eine eigene Datei mit dem Namen <i>main.ts</i> auszulagern!</div>

Nachdem wir unsere Basis-Komponente nun erfolgreich eingebunden haben, werfen wir einmal ein Blick auf die Features die uns das Angular Framework mitbringt.

## Property- und Event-Binding
Angular bietet uns viel generische Möglichkeiten um auf Events zu reagieren oder Eigenschaften an einem Element dynamisch zu definieren. Mussten wir in Angular 1 noch für jedes Event eine extra Direktive definieren, wie z.B. `ng-click`, `ng-doubleclick`, `ng-mouseover` usw., können wir dies nun generisch mit Hilfe der Runden klammern lösen.

Da sich Angular hierbei direkt an die nativen Events der DOM-Elemente hängt, können wir auch ohne Probleme Standart-Elemente, Polymer, WebComponents oder auch Komponenten von anderen Frameworks wie z.B. ReactJS miteinander kombinieren. Das selbe gilt natürlich auch für die `Property-Bindings`, welche sich auf die Eigenschaften eines Elements beziehen. War es bei AngularJS 1 noch so, dass wir diese in einem JavaScript Scope halten mussten und schwer nach externen Komponenten (nativ oder andere Frameworks) kommunizieren konnten, können wir nun auch auf den Browser-DOM-Objekten unsere Daten manipulieren und mit anderen Komponenten austauschen.

So können wir mit `[style.background-color]` auf die Hintergrundfarbe eines Elements Einfluss nehmen. Diesen Wert können wir sowohl statisch als auch über dynamisch Variablen setzen. Um auf `input-Events` zu reagieren, können wir hierbei einen Listener direkt mit einer Expression erstellen.
Wir bekommen hierbei eine Referenz auf das native Event an die Hand.

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'pizza-root',
  template: `
    <input
      type="text"
      (keyup)="onKeyUp()"
      (input)="color=$event.target.value"
      [style.background-color]="color"
      >`
})
export class AppComponent {
  public color: string;
  onKeyUp() {
    console.log('keyup: ' + this.color)
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/03a-event-property-bindings/src/app/app.component.ts) für die Verwendung von Property- und Eventbinding

Wir können natürlich auch jedes andere Event wie keyup benutzen und die Methode onKeyUp an dieses Event binden. Mit diesem sehr simplen Mechanismus können wir generisch alle Arten von Komponenten benutzen und mit ihnen interagieren. Dies ist das unabhängig davon, ob sie in Angular oder einem anderem Framework geschrieben sind.

> Die Syntax `[()]` (also eckige UND runde Klammern) ist einfach nur ein Indikator, dass diese Direktive die übergebene Eigenschaft liest und ebenso schreibt. Wir werden diese im nächsten Kapitel innerhalb der Form-Direktiven verwenden. Eselsbrücken zum Merken sind `banana in a box` oder für die Fußball-Begeisterten: `Das Runde muss in das Eckige` :)

## Zwei-Wege-Datenbindung

<strike>
Möchten wir nun mit Formularen arbeiten und dort auf die bereits definierten Direktiven des Frameworks zurück greifen, haben wir die Möglichkeit diese zu importieren.
Mit Hilfe der Eigenschaft *directives* an unser `@ComponentAnnotation` unser Komponente zur Verfügung zu stellen. Wir benutzen hierbei das Sub-Modul `FORM_DIRECTIVES`, welches uns den einzelnen Import aller Form-Direktiven deutlich vereinfacht.
</strike>

Dies ist seit der Einführung von `@NgModules` nicht mehr notwendig und wird hier über den Import des `FormsModule` in unserem [AppModule](https://github.com/angularjs-de/angular2-tutorial/blob/master/03b-two-way-data-binding/src/app/app.module.ts#L14) sehr vereinfacht. Mit dem import von FormsMoule sind alle dort exportierten Direktiven direkt verfügbar.

```typescript
import {Component} from 'angular2/core';

@Component({
  selector: 'pizza-root',
  template : `
    <h1>
        Angular2 Tutorial von
        Angular.DE</h1>
        <input
            type="text"
            [(ngModel)]="search" >
      <p>
          Du suchst gerade nach:
          {{search}}
      </p>`
})
export class AppComponent {
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/03b-two-way-data-binding/src/app/app.component.ts) zur Nutzung von ngModel

Unser *template* erweitern wir um ein kleines Formular, in dem wir eine Input-Box mit einer kleinen Ausgabe verbinden. *Wichtig* hierbei ist, dass die Direktive `ngModel` sowohl mit runden als auch den eckigen Klammern angegeben wird. Der Hintergrund ist, dass wir hierbei die Variable search sowohl lesen als auch schreiben wollen.

## Expressions

Expressions sind viel mächtiger, als sie im ersten Moment erscheinen. Expressions erlauben uns sowohl einfache Variablen auszugeben, als auch komplexere Ausdrücke zu bilden.

```html
{{search.toUpperCase() + "!"}}
{{1 + 2 + 3}}
```

In diesem Fall wird z.B. der Inhalt von search immer direkt in Großbuchstaben umgewandelt und ein Ausrufezeichen angehängt.

Ein eleganter Anwendungsfall ist die Nutzung des ternären Operators. So kann eine abhängige Ausgabe ohne die Nutzung von *ngIf oder DOM-Manipulation geregelt werden.

```html
{{search.length === 3 ? "ausgebucht" : "noch frei"}}
```

Ein anderes Beispiel ist der logische ODER-Operator.

```html
{{search.length || 0}}
```

Es sollte jedoch trotzdem beachtet werden, dass komplexe Logik nichts im Template zu suchen hat! Wir nutzen dies hier nur um die Möglichkeiten darzustellen.

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/04-expressions/src/app/app.component.ts) zu einfachen Anwendungen von Expressions

## Direktiven und Komponenten in Angular

Mit der Einführung von Direktiven im Jahr 2009 war AngularJS eines der ersten Frameworks, die den Gedanken eigener HTML-Elemente (Direktiven) so weit gedacht und sehr gut umgesetzt haben.
Das Angular Framework führt nun dazu noch den `Begriff der Components` ein. Unter Komponenten versteht man Elemente, welche einen eigenen Sub-Dom-Tree aufbauen. Hierbei können wir optional entschieden, ob wir hierfür einen echten Shadow-DOM aufbauen wollen.

> Wenn Ihr eure AngularJS 1 Anwendung heute schon näher an die Component Architektur anlehnen wollt und so für eine Migration näher an Angular Code zu sein, solltet Ihr euch meinen Artikel über den [AngularJS Component-Helper](/artikel/angularjs-component-helper/) ansehen.


Grundsächlich kann man die HTML-Erweiterungen in Angular in drei Kategorien aufteilen:

* Components - komplett eigene DOM-Elemente mit eigenem Template
* Strukturelle Template Direktiven - verändern den DOM, d.h. fügen Elemente hinzu oder entfernen sie, z.B. ngIf, ngSwitch und ngFor
* Attribut-Direktiven - verändern nur das Aussehen oder Verhalten von DOM-Elementen, z.B. ngStyle und ngClass

### Components
Das Herzstück einer Angular-Anwendung. Eine Komponente verknüpft ein Template mit einer JavaScript-Klasse über ein eigenes Element.

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'pizza-root',
  template: `
    Inhalt der Komponente
  `
})
export class AppComponent {
  // Logic here
}
```

Die Eigenschaft `selector` stellt den zur Komponente gehörenden HTML-Tag als CSS-Selektorregel dar. Dieser muss in den HTML-Quelltext eingebunden werden, um die Komponente auszuführen.

```html
<body>
  <div class="container">
    <pizza-root>
    </pizza-root>
  </div>
</body>
```

### Strukturelle Template Direktiven
Wie schon erklärt sollten strukturelle Direktiven immer dann verwendet werden, wenn der DOM verändert wird, sprich Elemente hinzugefügt oder entfernt werden sollen. Ein Beispiel dafür ist die `ngIf-Direktive`.

```html
<button (click)="isVisible = !isVisible">anzeigen | verstecken</button>
<div *ngIf="isVisible">Wir sind Ihr Pizza-Dienstleister!</div>
```

Die Variable `isVisible` wird als Boolean-Wert interpretiert. Falls diese auf `true` bzw `truthy` steht, wird der div-Knoten in den DOM eingehangen, andernfalls entfernt.

Wie wir bereits gelernt haben, gibt es Event- und Property-Bindings in Angular. Ihre Anwendung kann durch die Verwendung von Klammern - `()` und `[]` - gesteuert werden. Im Falle einer strukturellen Direktive nutzen wir hierbei das `*-Symbol`.

#### Das * Symbol in Angular

Das Asterisk-Zeichen stellt die Kurzschreibweise einer strukturellen Direktive dar. Sie stellt auch automatisch das Data-Binding her.

```html
<pizza-list-item *ngFor="let pizza of menu"></pizza-list-item>
```

Strukturelle Direktiven würden im erweiterten Syntax den eigenen Quellcode sehr aufblähen. Das template-Tag gibt an, dass nachfolgend ein Angular-Template folgt, welches über die Bedingung entfernt oder hinzugefügt wird.

Intern wandelt Angular jedoch immer die Kurzschreibweise in die ausführliche um!

### Attribut-Direktive
Wie der Name schon sagt, werden diese Direktiven als Attribut an ein DOM-Element geschrieben und können dessen Aussehen und/oder Verhalten verändern. Als einfaches Beispiel setzen wir die Schriftfarbe eines Elementes via einer Attribut-Direktive.

```html
<div [style.color]="'red'">Wir sind Ihr Pizza-Dienstleister!</div>
```

**Tip**: Die eingebaute Direktive `ngStyle` sollte erst benutzt werden, wenn mehrere Style-Attribute gesetzt werden. Unser Beispiel würde jedoch mit ngStyle, wie folgt aussehen.

```html
<div [ngStyle]="{'color': 'red'}">Wir sind Ihr Pizza-Dienstleister!</div>
```

#### Eigene Attribut-Direktive
Als kleines Beispiel schreiben wir nun für das Ändern der Schriftfarbe eine eigene Direktive.

```typescript
import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[redFont]'
})
export class RedFontDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    // el.nativeElement.style.color = 'red';
    renderer.setElementStyle(el.nativeElement, 'color', 'red');
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/05-directives/src/app/shared/red-font.directive.ts) zur Definition einer eigenen Direktive

Eine Direktive wird über den Decorator `@Directive` definiert. Als wichtigste Meta-Daten muss wieder ein selector angegeben werden, damit unsere Direktive überhaupt ausgeführt wird. Im Unterscheid zur @Component wird der Selektor in [] geschrieben, wodurch ein Attribut-Name definiert wird. Im Beispiel werden zwei wichtige Bestandteile für die Arbeit mit Direktiven der Angular-Bibliothek genutzt.

<div class="alert alert-warning">Beachte: Lege wiederverwendbare Bestandteile in *shared*-Ordner ab. Über eine *index.ts* kannst du alle im Ordner enthaltene Funktionalitäten gebündelt anderen Anwendungsteilen freigeben. Dieses Verfahren nennt sich **barrels** und ist im Style-Guide verankert.</div>

* ElementRef - erlaubt Zugriff auf das verbundene DOM-Element
* Renderer - Framework zum performanten Ändern von DOM-Elementen

> Es ist natürlich möglich das DOM-Element direkt selbst zu ändern. Das kann jedoch in vielen Situationen auf Kosten der Anwendungs-Performance passieren. Der Renderer ermöglicht beispielsweise das Rendern an Web-Worker auszulagern.

### Benutzen von Komponenten und Direktiven

Damit eine Direktive oder Komponente überhaupt in einem Teil unser Anwendung genutzt werden kann, muss diese dem entsprechenden Modul, indem sie benutzt werden soll, bekannt gemacht werden. Hierzu importieren wir die Direktive via `import` und übergeben über die Eigenschaft `declarations` ein Array von Direktiven-Definitionen. Somit kann eine klare Abgrenzung geschaffen werden, welche Direktive wo benutzt werden kann und auch Naming-Kollisionen vermieden oder geschickt als Konfiguration genutzt werden.

```typescript
import { RedFontDirective } from './shared/red-font.directive';

@NgModule({
  declarations: [
    AppComponent,
    RedFontDirective
  ],
  // ...
})
export class AppModule { }
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/05-directives/src/app/app.module.ts#L12) für die Verwendung von Direktiven in einem Modul

Am Ende packen wir die Direktive - mit Hilfe des festgelegten Attributsnamen - an einen DOM-Knoten mit Text. Voila!

## Schleifen mit NgFor

Wie bereits erfahren, existiert in Angular natürlich eine Direktive, die das Wiederholen von DOM-Elementen erlaubt. Im Gegensatz zu AngularJS 1 heißt diese nicht `ngRepeat`, sondern `ngFor`. Als strukturelle Direktive wird diese an einen bestehenden DOM-Knoten, wie folgt gebunden.

```html
<div *ngFor="let number of [1, 5, 34, 47]">
  Aktuelle Zahl ist: {{number}}
</div>
```

Das *-Symbol gibt an, dass es sich um eine strukturelle Direktive handelt. Das aktuelle Element der Schleife wird auf eine neue lokale Variable `number` geschrieben. Die Definition einer Variable wird über das #-Symbol ausgezeichnet. Die Liste an Elementen kann dabei natürlich auch aus einer Variable kommen.

Ebenso, wie in AngularJS, kann auch in der zweiten Version des Frameworks auf den aktuellen Index der Schleife zugegriffen werden. Dazu erweitern wir unsere Quellcode ein wenig.

```html
<div *ngFor="let number of [1, 5, 34, 47]; let currentIndex=index">
  Aktuelle Zahl ist: {{number}} ({{currentIndex}})
</div>
```

Nach der Angabe der Liste kann der aktuelle Index auf eine eigene Variable geschrieben werden, um auf sie zugreifen zu können.

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/06-loops/src/app/app.component.ts) einer Schleife im Template

## Pipes (ehemals Filter)

In der neuen Angular-Version heißen Filter nun `Pipes`. Sie erlauben das Transformieren von Daten in Expressions. Pipe bedeutet im Deutschen Rohr bzw. Leitung. Viele kennen die Pipe als Operator aus der Unix-Shell, um Ausgabewerte zur weiteren Verarbeitung, Filterung oder Transformationen weiterzuleiten. Dabei können mehrere so genannter Pipes hintereinander ausgeführt werden. Wobei die Ausgabe einer Pipe die Eingabe der nächsten darstellt. In diesem Sinne trifft die neue Bezeichnung viel besser auf die eigentliche Funktionalität zu.

Wie in AngularJS, gibt es auch in der Version 2 schon ein paar vordefinierte Pipes, z.B. `CurrencyPipe` zur Währungsformatierung und `DatePipe` zur Datumsformatierung.

Als Beispiel wird eine Zahl im Template mit Hilfe der `CurrencyPipe` formatiert.

```html
<span>{{10.99 | currency}}</span>
```

Pipes erhalten als Eingabe den Wert vor dem `|-Symbol` und können eine Liste von weiteren Parametern entgegennehmen. Die `CurrencyPipe` kann dadurch den zu formatierenden Wert in verschiedenen Währungen, mit oder ohne Währungssymbol transformieren. Das Beispiel formatiert die Zahl nun als Euro und zeigt statt des Währungskürzels das €-Symbol.

```html
<span>{{10.99 | currency:'EUR':true}}</span>
```

### Eigene Pipes

Die Erstellung einer eigenen Pipe ist denkbar einfach. Ähnlich wie andere Bestandteile einer Angular Anwendung existiert dazu ein eigener Decorator `@Pipe`. Die eigene Pipe implementiert dann ein Interface mit dem Namen `PipeTransform`. Wer aus der objektorientierten Programmierung kommt, weiß dass ein Interface eine definierte Schnittstelle ist. Diese definiert welche Methoden eine Klasse, welche dieses Interface implementiert, implementieren muss. Im Falle einer Pipe ist das die `transform-Methode`.

Diese Pipe mit dem Namen *addTwo* addiert zur Eingabe die Zahl 2.

```typescript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'addTwo'})
export class AddTwoPipe implements PipeTransform {
  transform(number:number) : any {
    return number + 2;
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/07-pipes/src/app/shared/add-two.pipe.ts) zur Defintion eigener Pipes.

Um unsere Pipe benutzen zu können, müssen wir diese wieder unserem Modul hinzufügen. Also die entsprechende Klasse importieren und bei `declrations` anfügen.

```typescript
import { AddTwoPipe } from './shared/add-two.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RedFontDirective,
    AddTwoPipe
  ],
  // ...
})
export class AppModule { }
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/07-pipes/src/app/app.module.ts#L12) zur Nutzung von Pipes.

Einer Pipe können jeweils mit `:` getrennt weitere Parameter übergeben werden. Diese müssen dann in der transform-Funktion angegeben werden.

## Services

Eine einfache Möglichkeit wiederverwendbare Programmteile auszulagern oder Daten zwischen Komponenten auszutauschen sind Services. Dabei sind Services nichts weiter als Klassen, die als Abhängigkeit in anderen Komponenten injiziert werden können. Dabei werden zwei Arten unterschieden.

* Globale Services - eine Instanz für alle Komponenten
* Lokale Service - neue Instanz für jede Komponente

Somit können wir, ähnlich wie in AngularJS, Logik in plain JavaScript schreiben und an Komponenten weitergeben. Hiermit können wir unsere Implementierungen der Business-Logik später auch in anderen Frameworks wiederverwenden oder aber auch unsere Services als AngularJS sehr einfach in die Angular Welt bringen.

Damit die Typ-Informationen des Constructors, welche wir gleich für die Injection von anderen Services benötigen, beim der Kompilierung nicht verloren gehen, können wir mit dem Decorator `@Injectable` die Generierung dieser Metadaten erzwingen. Somit können wir auch später in der ES5 Version sicherstelle, dass wir den HTTP-Service anhand des Typs korrekt einbinden können.

```typescript
import {Injectable} from '@angular/core';

@Injectable()
export class PizzaService {
  getPizza() {
    return [{
      "id": 1,
      "name": "Pizza Vegetaria",
      "price": 5.99
    }, {
      "id": 2,
      "name": "Pizza Salami",
      "price": 10.99
    }, {
      "id": 3,
      "name": "Pizza Thunfisch",
      "price": 7.99
    }, {
      "id": 4,
      "name": "Aktueller Flyer",
      "price": 0
    }]
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/08-services/src/app/shared/pizza.service.ts) zur Defintion eines Services

Als nächstes kann der Service in einer Komponente importiert und genutzt werden. Danach werden Abhängigkeiten von Services über die `providers`-Eigenschaft von `@Component` bekannt gemacht. Jetzt kann der Service in die Klasse über die `Dependency-Injection` geladen werden.

```typescript
import {Component} from '@angular/core';

import {PizzaService} from './shared/index';

@Component({
  selector: 'pizza-root',
  providers: [PizzaService],
  template: `
    <span>Anzahl an Pizzen: {{pizzas.length}}</span>
  `
})
export class AppComponent {
  public pizzas = [];

  constructor(private pizzaService: PizzaService) {
    this.pizzas = this.pizzaService.getPizza();
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/08-services/src/app/app.component.ts) für das Importieren und Injecten eines Services

Durch die Angabe des Services als Provider der Component, wird beim Erstellen der Komponente eine neue Instanz des Services erzeugt. Diese ist auch nur für diese Komponente und ihre Kind-Komponenten, welche diesen Service gegebenenfalls auch benutzen, verfügbar.

Soll ein Service global - sprich anwendungsweit - verfügbar sein, kann dieser in unserem Hauptmodul der Anwendung geladen und verfügbar gemacht werden.

```typescript
import { PizzaService } from './shared/pizza.service';

@NgModule({
  // ..
  providers: [PizzaService],
  // ...
})
export class AppModule { }
```

<div class="alert alert-info">Hinweis: In Angular sollte die Nutzung eines Prefixes, wie *_*, zum Visualisieren einer privaten Funktion oder Variable vermieden werden.</div>


## HTTP in Angular

Ein wichtiger Bestandteil von Web-Anwendungen ist die Kommunikation mit Schnittstellen. Typischerweise basieren diese Schnittstellen auf dem HTTP-Protokoll. Für diesen Zweck existiert ein `HTTP-Service` innerhalb des Angular-HTTP Modules. Dieses können wir von `@angular/http` importieren unserem AppModule hinzufügen.

```typescript
import { HttpModule } from '@angular/http';

@NgModule({
  // ...
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ]
  // ...
})
export class AppModule { }
```


[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/09-http/src/app/app.module.ts#L16) für das benutzen des HttpModule.

Für die Kommunikation mit einer Schnittstelle sollte ein eigener Service angelegt werden. Aus diesem Grund wandeln wir nun unseren Pizza-Service so ab, dass er die Angebots-Daten aus einer JSON-Datei abfragt. Diese wird über eine GET-Anfrage abgerufen. Die dann in das JSON-Format umgewandelt, um damit in der Anwendung umgehen zu können.

```typescript
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // add map function to observable

@Injectable()
export class PizzaService {
  constructor(private http: Http) {
  }

  getPizza() {
    return this.http.get('assets/pizza.json')
      .map((res: Response) => res.json());
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/09-http/src/app/shared/pizza.service.ts) für das Senden von Http-Anfragen

Zuerst wird der Http-Service von Angular importiert und dann über die Dependency-Injection dem Service bereitgestellt. Die Funktion `getPizza()` kann dann innerhalb einer Komponente aufgerufen werden, um die Daten abzurufen. Ein Request läuft asynchron, daher liefert der Http-Service ein so genanntes Observable zurück, welches über die RxJS-Bibliothek erzeugt wird.


### Observables in Angular
Ein Observable ist mit [JavaScript-Promises](/buecher/angularjs-buch/angularjs-promises/) vergleichbar. Ist der Programmcode des Observable abgeschlossen, wird allen Abonnenten Bescheid gegeben. Auf diesen Observables basiert auch das Event-System von Angular (Stichwort EventEmitter).

Um ein Observable zu abonnieren, muss dessen subscribe-Funktion aufgerufen werden. Als Callback erhält diese eine Funktion, welche wiederum als Parameter geänderte oder neue Daten erhält. In unserem Fall sind das, die Pizzen aus der JSON-Datei.

```typescript
import {Component} from '@angular/core';
import {PizzaService} from './shared/index';

@Component({
  selector: 'pizza-root',
  template: `
    <span>Anzahl an Pizzen: {{pizzas.length}}</span>
  `
})
export class AppComponent {
  public pizzas = <Object>[];

  constructor(private pizzaService: PizzaService) {
    this.loadData();
  }

  loadData() {
    this.pizzaService
      .getPizza()
      .subscribe((pizzas: Array<Object>) => this.pizzas = pizzas);
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/09-http/src/app/app.component.ts#L18-L20) zur Nutzung von Observables

Wenn du mehr über das Thema erfahren möchtest schau dir doch mal diesen Artikel an:
[Angular - Asynchronität von Callbacks zu Observables](/artikel/angular2-observables/).


## Component Lifecycle

Eine Komponente in Angular durchläuft verschiedene Zustände während der Ausführung. Diese werden auch Lebenszyklen genannt. Über die `Lifecycle-Hooks` können wir hier an verschiedenen Stellen eingreifen. Folgende Funktionen können dazu genutzt werden:

* ngOnInit - Komponente wird Initialisiert (nach erstem ngOnChanges → Eigenschaften initialisiert)
* ngOnDestroy - bevor Komponente zerstört wird
* ngDoCheck - eigene Änderungserkennung
* ngOnChanges(changes) - Änderungen in Bindings wurden erkannt
* ngAfterContentInit - Inhalt wurde initialisiert
* ngAfterContentChecked - jedes Mal, wenn Inhalt überprüft wurde
* ngAfterViewInit - Views wurden initialisiert
* ngAfterViewChecked - jedes Mal, wenn Views überprüft wurden

Unser Beispiel zur Verwendung des Http-Services wird nun so erweitert, dass die Pizzen nicht direkt im Konstruktor der AppComponent abgerufen werden, sondern erst wenn die Komponente initialisiert wurde.

```typescript
import {Component, OnInit} from '@angular/core';
import {PizzaService} from './shared/index';

@Component({
  selector: 'pizza-root',
  template: `
    <span>Anzahl an Pizzen: {{pizzas.length}}</span>
  `
})
export class AppComponent implements OnInit {
  public pizzas = <Object>[];

  constructor(private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.pizzaService
      .getPizza()
      .subscribe((pizzas: Array<Object>) => this.pizzas = pizzas);
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/10-component-lifecycle/src/app/app.component.ts) zur Implementierung eines Lifecycle-Hooks

Für jeden Hook existiert ein Interface, welches die Komponentenklasse implementieren sollte. Der Name der Hook-Funktion setzt sich dann aus *ng* und *Interface-Name* zusammen.


Wenn Ihr weitere Informationen zu [LifeCycles in Angular2](/artikel/angular-2-component-lifecycle/) wollt, haben wir hierzu auch einen ganzen Artikel für euch.

## Interfaces

*Interfaces* ist sicher vielen bereits ein Begriff. Wollt ihr in einer Java-Anwendung sicher gehen, dass eine Klasse bestimmte Eigenschaften besitzt und Funktionen impementiert, dann definiert ihr vorher ein *Interface*. Ihr könnt Interfaces aber auch zur einfachen Definition von eigenen Datenstrukturen nutzen. In unserem Fall wäre ein Pizza-Interface recht hilfreich, um den Rückgabewert unseres HTTP-Requests zu typisieren.

Ein Interface wird dazu meist in einer eigenen Datei über das Schlüsselwort *interface* definiert.

```typescript
export interface Pizza {
  id: number;
  name: string;
  price: number;
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/11-interfaces/src/app/shared/pizza.ts) zur Definition eines Interfaces

Nach dem gleichen Prinzip können auch Funktionendefintionen angegeben werden. Es besteht auch optionale Bestandteile eines Interface zu definieren. Dazu hängt ihr an den Namen/Schlüssel einfach ein `?` an.

Über das vordefinierte Wort `implements` könnt ihr in einer Klassen-Definition ein oder mehrere Interfaces angeben, die hier implementiert werden **müssen**.

```typescript
import {Component} from '@angular/core';
import {Pizza, PizzaService} from './shared/index';

@Component({
  selector: 'pizza-root',
  template: `
    <span>Anzahl an Pizzen: {{pizzas?.length || 0}}</span>
  `
})
export class AppComponent {
  public pizzas: Pizza[];

  constructor(private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.pizzaService
      .getPizza()
      .subscribe((pizzas: Pizza[]) => this.pizzas = pizzas);
  }
}
```

[Code](https://github.com/angularjs-de/angular2-tutorial/blob/master/11-interfaces/src/app/app.component.ts) zur Nutzung von Interfaces

Durch Interfaces legt ihr nur die Struktur fest. Wollt ihr gleichzeitig eine sinnvolle Belegung von Standardwerten, könnt ihr auch ganz normale Klassen dazu nehmen.

## Fazit

Mit Angular ist vieles neu und bekannte Dinge funktionieren doch ein wenig anders. Dennoch lohnt sich bereits ein genauerer Blick auf die neue Version des Single-Page-Application Frameworks. Viel Spaß beim Lernen von Angular.


Wenn Ihr euch weiter mit uns und anderen Austauschen wollt, kommt in unseren [Slack Chat](/slack)!

<hr>
<div class="workshop-hint text-center">
  <div class="h3">Hat dir das Tutorial geholfen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p> Wir bieten auch <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angular.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-buttom">Angular und TypeScript Schulungen</a>        an um dich möglichst effektiv in das Thema Angular zu begleiten. Im Kurs kannst Du die Fragen stellen, die Du nur
        schlecht googlen kannst, z.B. “Besserer Weg, um meine Applikation zu strukturieren”. Wir können sie Dir beantworten.
      </p>
      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angular.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-buttom">
          <button class="btn btn-danger">Jetzt weiter lernen</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="workshops-attendees.png" alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>
