---
title: "I18n in AngularJS Anwendungen einfach gemacht"
description: Lerne, wie du mit ng-translate deine Anwendung mehrsprachig machst.
author: "Pascal Precht"
slug: "angularjs-i18n-ng-translate"
published_at: 2013-06-13 00:00:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-i18n-ng-translate.jpg"
---

Internationalisierung (I18n) in Apps ist heutzutage ein Muss. Ob auf dem Desktop, im Web oder auf mobilen Endgeräten, Apps sollten dem Nutzer die Möglichkeit geben die Sprache des UIs auswählbar zu machen. Auch AngularJS bietet uns ein [Internationalisierungs- und Lokalisierungs-Feature](http://docs.angularjs.org/guide/i18n) in sämtlichen Filterkomponenten. Da sich der Support aktuell aber nur auf Datums-, Zahlen-, und Währungsformatierungen beschränkt, sind die Möglichkeiten zum Internationalisieren vollständiger App-Inhalte schnell ausgereizt.
Also was tun, wenn die Anforderungen über das I18n-Feature der Filterkomponenten hinausgehen? Hier kommt nun [angular-translate](https://github.com/angular-translate/angular-translate) ins Spiel.

<!--more-->

*angular-translate* ist ein AngularJS-Modul, das von [Pascal Precht](https://github.com/PascalPrecht) aktiv entwickelt wird und mit dem mehrsprachigen AngularJS-Anwendungen auch aus der Content-Sicht nichts mehr im Wege steht. angular-translate bietet für diesen Zweck viele Features, die uns das Leben leichter machen. Dazu gehört das asynchrone Nachladen von Übersetzungsdateien oder das automatische Merken der vom Benutzer ausgewählten Sprache. Dieser Artikel zeigt, wie einfach es ist mit angular-translate eine AngularJS-Applikation in mehreren Sprachen anzubieten.

## Installation

Am einfachsten lässt sich angular-translate mit dem von Twitter entwickelten [Package-Manager Bower](http://bower.io) installieren. Bower bietet dazu ein simples Command Line Interface, mit dem es möglich ist, Front-End Pakete zu registrieren, zu suchen, zu installieren und zu aktualisieren.

Um also angular-translate mit Bower zu installieren, reicht die Ausführung des folgenden Befehls im Hauptverzeichnis des Projekts, in dem das Modul eingepflegt werden soll:

```shell
$ bower install angular-translate --save
```


Anschließend befindet sich das Modul in einem Ordner unterhalb des Projektes. Der Name des Ordners ist davon abhängig wie Bower auf der lokalen Maschine konfiguriert ist. Seit Version `0.9.0` installiert Bower sämtliche Pakete in einen `bower_components` Ordner. Dies lässt sich ändern, in dem man innerhalb des Projektes eine Datei `.bowerrc` erstellt, die beispielsweise folgenden Inhalt hat:

```json
{
  "directory": "bower_components"
}
```


Neben der Installation mit Bower gibt es auch die Möglichkeit das [Git-Repository](http://git-scm.com) von angular-translate zu klonen und anschließend das Modul manuell zu bauen. Weitere Informationen zum Installieren von angular-translate gibt es in der [Installationsanleitung](http://angular-translate.github.io/docs/#/guide/00_installation).

angular-translate ist nun in unserem Projekt verfügbar und muss nur noch in unserer `index.html` eingebunden werden. Dadurch dass das Modul abhängig von AngularJS ist, muss die Einbindung **nach** der Einbindung von AngularJS geschehen.

```html
<script src="pfad/zu/angular.js"></script>
<script src="pfad/zu/angular-translate.js"></script>
```


Nachdem angular-translate eingebunden wurde, muss es nur noch als Abhängigkeit in unserer Anwendung deklariert werden.

```javascript
angular.module('app', ['pascalprecht.translate']);
```


## Sprachen registrieren

Da angular-translate als Abhängigkeit der Applikation deklariert wurde, stehen nun sämtliche Komponenten per [Dependency Injection](http://docs.angularjs.org/guide/di) zur Verfügung. So auch der `$translateProvider`, mit dem sich der `$translate` Service konfigurieren lässt. Um innerhalb der Anwendung nun eine Sprache zu registrieren, nutzen wir die `translations(...)` Methode des `$translateProvider`. Sie erwartet einen einen Sprachschlüssel und einen JavaScript Hash (Objekt), der eine Übersetzungstabelle darstellt. Jeder Schlüssel in der Tabelle entspricht einer sogenannten **Translation ID**, während der Wert die konkrete Übersetzung ist. Die Translation IDs können wir entsprechend der JavaScript-Regeln für Schlüsselbezeichner frei wählen.

Gehen wir also von folgender Übersetzungstabelle für Deutsch aus:

```javascript
{
  APP_HEADLINE:  'Großartige AngularJS App',
  NAV_HOME:      'Zur Startseite',
  NAV_ABOUT:     'Über',
  APP_TEXT:      'Irgendein Text über eine großartige AngularJS App.'
}
```


Diese Tabelle kann nun über den `$translateProvider` für die Sprache `’de’` registriert werden. (Hinweis für Upgrader: Seit Version 2 ist die Angabe des Sprachschlüssels obligatorisch!)

```javascript
angular.module('app').config(function ($translateProvider) {
  $translateProvider.translations(‘de’, {
    APP_HEADLINE:  'Großartige AngularJS App',
    NAV_HOME:      'Zur Startseite',
    NAV_ABOUT:     'Über',
    APP_TEXT:      'Irgendein Text über eine großartige AngularJS App.'
  });

  // Nicht vergessen: die Standardsprache
  $translateProvider.preferredLanguage(‘de’);
});
```

Wie man im Beispiel sieht, sollte man auch immer eine Standardsprache definieren, damit angular-translate auch weiß, welche Sprache gerade aktiv ist.

Es gibt seit Version 2 auch die Möglichkeit, die Sprache über den Browser automatisch zu ermitteln ([Language Negotation](http://angular-translate.github.io/docs/#/guide/09_language-negotiation)).

```javascript
$translateProvider.determinePreferredLanguage();
```

Damit werden automatisch Sprachschlüssel nach dem Muster `de_DE`, `en_US`, etc. in den Übersetzungstabellen gesucht.

Des Weiteren ist es ebenfalls möglich, Übersetzungstabellen mit Namensräumen zu übergeben. Diese löst angular-translate dann entsprechend auf. Der Vorteil bei der Verwendung von Namensräumen liegt darin, dass Übersetzungstabellen nach Anwendungsgebieten strukturiert werden können. So ist selbst eine große Anzahl an Übersetzungen leicht zu warten. [Ein Beispiel dazu gibt es in der Dokumentation](http://angular-translate.github.io/docs/#/guide/02_getting-started).

## Filter und Direktive

Nachdem die Anwendung nun über eine Übersetzungstabelle in Kenntnis gesetzt wurde, können die Filter- oder die Direktivenkomponente verwendet werden, um die Translation IDs in der Views zu übersetzen.

Eine View könnte also wie folgt aussehen:

```html
...
<body ng-app="app">
  <header>
    <h1>{{ 'APP_HEADLINE' | translate }}</h1>
  </header>
  <nav>
    <ul>
      <li>{{ 'NAV_HOME' | translate }}</li>
      <li>{{ 'NAV_ABOUT' | translate }}</li>
    </ul>
  </nav>
  <p>{{ 'APP_TEXT' | translate }}</p>
</body>
...
```


In manchen Fällen ist die Verwendung des Filters eher unpassend. Da kommt dann die Direktive zum Einsatz. Das obige Beispiel sähe also mit der Verwendung der Direktive wie folgt aus:

```html
...
<body ng-app="app">
  <header>
    <h1 translate="APP_HEADLINE"></h1>
  </header>
  <nav>
    <ul>
      <li translate="NAV_HOME"></li>
      <li translate="NAV_ABOUT"></li>
    </ul>
  </nav>
  <p translate="APP_TEXT"></p>
</body>
...
```


Sowohl die Filterkomponente als auch die Direktive unterstützen das Evaluieren übergebener Interpolationsausdrücke.

Nehmen wir die  Übersetzungstabelle

```javascript
{ "GREETING": "Hallo, mein Name ist {{name}}" }
```

und das Template

```html
<p translate="GREETING" translate-value-name="Pascal"></p>
```html

so erhalten wir in folgendes (gekürztes) HTML-Resultat:

```html
<p>Hallo, mein Name ist Pascal</p>
```

Ausführliche Beispiele dazu gibt es [in der API-Dokumentation](http://angular-translate.github.io/docs/#/guide/06_variable-replacement).

## Service

Falls man Übersetzungen außerhalb eines Templates (also einem Filter oder einer Direktive) benötigt, so kann auch der `$translate` Service direkt verwendet werden. Die einfachste Verwendung sieht dabei wie folgt aus (Beispiel in einem Controller):

```javascript
angular.module(‘app’).controller(‘MyCtrl’, function ($scope, $translate) {

  $scope.showBox = function () {
    $translate(‘APP_TEXT’).then(function (text) {
      alert(text);
    });
  };

});
```

Es mag zunächst etwas umständlich sein, dass auch “simple” Übersetzungen nur über Promises erreichbar sind. Dies ist allerdings technisch begründet: Alle Übersetzungen durchlaufen intern einen komplexen, asychronen Protess, etwa der [Fallback-Sprache](http://angular-translate.github.io/docs/#/guide/08_fallback-languages) oder weiteren noch zu ladenen Sprachdateien. Daher ist ein sychroner Zugriff und gleichzeitig eine korrekte Übersetzung nicht möglich.

Seit Version 2.1 ist es außerdem möglich, direkt einen ganzen Satz [via Service übersetzen zu lassen](http://angular-translate.github.io/docs/#/guide/03_using-translate-service#using-$translate-service_multiple-translation-ids).

## Mehrsprachigkeit

Die Applikation macht bisher nichts weiter als Platzhalter mit ihren konkreten Werten zu ersetzen. Wirklich interessant und sinnvoll wird die Verwendung von angular-translate aber erst unter der Berücksichtung von Mehrsprachigkeit. Die Übersetzungstabelle aus dem ersten Beispiel könnte in englischer Sprache also wie folgt aussehen:

```javascript
{
  APP_HEADLINE:  'Awesome AngularJS App',
  NAV_HOME:      'Start',
  NAV_ABOUT:     'About',
  APP_TEXT:      'Some text about the awesome AngularJS app.'
}
```


Auch diese zweite Übersetzungstabelle fügen wir in der Konfigutationsphase des `$translate` Services hinzu. Allerdings muss jetzt eine anderer Schlüssel verwendet werden, nämlich zu welcher Sprache diese Übersetzungstabelle gehört, damit angular-translate diese entsprechend identifizieren kann.

Um beide Sprachen zu registrieren, wird der bestehende Code somit folgendermaßen erweitert:

```javascript
angular.module('app').config(function ($translateProvider) {
  // deutsche Sprache
  $translateProvider.translations('de_DE', {
    APP_HEADLINE:  'Großartige AngularJS App',
    NAV_HOME:      'Zur Startseite',
    NAV_ABOUT:     'Über',
    APP_TEXT:      'Irgendein Text über eine großartige AngularJS App.'
  });

  // englische Sprache
  $translateProvider.translations('en_US', {
    APP_HEADLINE:  'Awesome AngularJS App',
    NAV_HOME:      'Start',
    NAV_ABOUT:     'About',
    APP_TEXT:      'Some text about the awesome AngularJS app.'
  });

  $translateProvider.preferredLanguage(‘de_DE’);
});
```


Nun gibt es zwei Sprachen in unserer Applikation. Über die Methode `preferredLanguage(...)`, wird angular-translate mitgeteilt, dass `’de_DE’` die bevorzugte, registrierte Sprache sein soll.

Großartig! Unsere Anwendung unterstützt nun zwei Sprachen. Es bleibt aber die Frage, wie der Benutzer zwischen den unterstützten Sprachen wechseln kann.

## Die Sprache zur Laufzeit wechseln

Wir sollten also nun auch eine Möglichkeit schaffen, um die Sprache zur Laufzeit wechseln zu können. Ein weiterer Teil des angular-translate Moduls ist der `$translate`-Service, der Schnittstellen anbietet, um zum Einen Konfigurationen auszulesen und zum Anderen die Sprache zur Laufzeit zu ändern. Für Letzteres verwendet wir einfach die Methode `use(...)`, welche den Sprachschlüssel der Sprache erwartet, zu der zur Laufzeit gewechselt werden soll.

Folglich ist es sehr einfach einen Controller zu implementieren, der sich um den Wechsel der Sprache kümmert.

```javascript
angular.module('app').controller('LangCtrl', function ($scope, $translate) {

  $scope.changeLang = function (key) {
    $translate.use(key).then(function (key) {
      console.log("Sprache zu " + key + " gewechselt.");
    }, function (key) {
      console.log("Irgendwas lief schief.");
    });
  };
});
```


Im Scope des `LangCtrl` gibt es eine Funktion `changeLang(...)`, die einen Sprachschlüssel erwartet und diesen an `use(...)` weiter delegiert. Des Weiteren ist unschwer zu erkennen, dass `use(...)` ein [Promise](http://docs.angularjs.org/api/ng.$q) zurückgibt. Das ermöglicht uns auf diese asynchrone Operation wie gewohnt zu reagieren.

Wir vervollständigen das Beispiel, indem wir innerhalb der View deklarieren, für welchen Teil des DOMs unser `LangCtrl` verantwortlich sein soll.

```html
...
<body ng-app="app">
  <header>
    <h1>{{ 'APP_HEADLINE' | translate }}</h1>

    <ul ng-controller="LangCtrl">
      <li><a href="" ng-click="changeLang('en_US')">Englisch</a></li>
      <li><a href="" ng-click="changeLang('de_DE')">German</li>
    </ul>

  </header>
  <nav>
    <ul>
      <li>{{ 'NAV_HOME' | translate }}</li>
      <li>{{ 'NAV_ABOUT' | translate }}</li>
    </ul>
  </nav>
  <p>{{ 'APP_TEXT' | translate }}</p>
</body>
...
```


Der Benutzer unserer Applikation ist nun in der Lage die Sprache zur Laufzeit zu wechseln. In einem gewöhnlichen Anwendungsfall ist es wünschenswert, dass sich die Anwendung die gewählte Sprache merkt. Auch dieses Feature wird von angular-translate unterstützt. Die Einzelheiten dazu können in dem entsprechenden [Teil der Dokumentation](http://angular-translate.github.io/docs/#/guide/07_multi-language) nachgelesen werden.

## Übersetzungen asynchron nachladen

Vor allem bei großen Übersetzungstabellen und vielen Sprachen ist es wünschenswert die Daten und Logiken, die nicht initial gebraucht werden, asynchron nachzuladen, um so die Performance der Applikation zu verbessern. Auch für dieses Problem bietet angular-translate eine Lösung. Für das Modul existieren [einige Extensions](http://angular-translate.github.io/docs/#/guide/12_asynchronous-loading), die als Add-On dazu installiert werden können. So gibt es für das asynchrone Nachladen von Übersetzungsdateien zwei Extensions, die je nach Anwendungsfall zum Einsatz kommen können.

In unserem Beispiel verwenden wir den [static-files-loader](https://github.com/angular-translate/bower-angular-translate-loader-static-files). Dieser kann genau wie angular-translate mithilfe von Bower installiert werden. Dazu führen wir folgenden Befehl auf der Kommandozeile aus:

```shell
$ bower install angular-translate-loader-static-files --save
```

Und wieder binden wir die Ressource entsprechend in unserer `index.html` ein:

```html
<script src="pfad/zu/angular.js"></script>
<script src="pfad/zu/angular-translate.js"></script>
<script src="pfad/zu/angular-translate-loader-static-files.js"></script>
```


Der static-files-loader ermöglicht das asynchrone Nachladen von Übersetzungsdateien, indem ein bestimmtes Muster eingehalten wird. Was genau bedeutet das? Zunächst muss dem `$translateProvider` mitgeteilt werden, das Übersetzungsdaten nicht etwa per `translations(...)` registriert, sondern mit dem static-files-loader asynchron nachgeladen werden sollen. Dazu bietet der `$translateProvider` die Methode `useStaticFilesLoader()` an, die während der Konfigurationsphase zum Einsatz kommt. Die Methode erwartet ein Konfigurationsobjekt, welches das Muster der Namen der Übersetzungsdateien beschreibt. Der Name einer Übersetzungsdatei setzt sich wie folgt zusammen:

```javascript
[:prefix]{{langKey}}[:suffix]
```


Wenn wir also unsere Übersetzungstabellen in Übersetzungsdateien transferieren und deren Namen `lang-en_US.json` und `lang-de_DE.json` lauten, würde das Konfigurationsobjekt folgendermaßen aussehen.

```javascript
angular.module('app').config(function ($translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: 'lang-',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('de_DE');
});
```


Selbstverständlich muss dem `$translateProvider` wieder mitgeteilt werden, welche Sprache initial verwendet werden soll. Was passiert nun im Hintergrund? angular-translate weiß, das es den static-files-loader zum Nachladen der Übersetzungdateien nutzen und die Sprache mit dem Schlüssel `de_DE` inital verwenden soll. Da zum Start der App aber noch keine Übersetzungstabelle vorhanden ist, lädt angular-translate diese so schnell wie möglich automatisch nach.

Es ist auch möglich einen asynchronen Loader in Kombination mit der Registrierung einer Übersetzungstabelle zu verwenden. So könnte man die initale Sprache direkt vorhalten, während alle anderen Sprachen zur Laufzeit auf Anfrage nachgeladen werden.

```javascript
angular.module('app').config(function ($translateProvider) {
  // deutsche Sprache
  $translateProvider.translations('de_DE', {
    APP_HEADLINE:  'Großartige AngularJS App',
    NAV_HOME:      'Zur Startseite',
    NAV_ABOUT:     'Über',
    APP_TEXT:      'Irgendein Text über eine großartige AngularJS App.'
  });

  $translateProvider.useStaticFilesLoader({
    prefix: 'lang-',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('de_DE');
});
```


In diesem Fall ist die Übersetzungstabelle für die deutsche Sprache bereits vorhanden. angular-translate muss also keine Daten asynchron nachladen. Möchten wir nun die Sprache zur Laufzeit wechseln, wird sich die `use(…)`-Methode des `$translate`-Services um das asynchrone Nachladen der Übersetzungsdaten kümmern.

## Was gibt es noch?

Neben den Extensions zum asynchronen Nachladen von Übersetzungsdaten gibt es auch Extensions für eine mögliche Fehlerbehandlung und das Merken der vom Benutzer zuletzt gewählten Sprache. In der [offiziellen Dokumentation gibt es eine Liste aller Extensions](http://angular-translate.github.io/docs/#/guide/12_asynchronous-loading), die für angular-translate existieren.

Des Weiteren gibt es eine [ausführliche API Dokumentation](http://angular-translate.github.io/docs/#/api), in der sämtliche Features und Funktionen nachgelesen werden können. angular-translate wird aktiv auf GitHub weiterentwickelt und wartet auf **Eure** Hilfe und Verbesserungsvorschläge!
