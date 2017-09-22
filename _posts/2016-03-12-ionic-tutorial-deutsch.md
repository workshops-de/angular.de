---
title: "Ionic Framework Tutorial - hybride Apps"
description: "Unser Einführungstutorial zu Ionic erklärt euch alle wichtigen Konzepte und Bestandteile des Frameworks. Vom Erstellen des Projekts bis hin zur ersten App."
author: "Bengt Weiße"
slug: "ionic-tutorial-deutsch"
published_at: 2016-03-12 08:29:00.000000Z
categories: "tutorial ionic angularjs"
header_image: "/artikel/header_images/ionic-tutorial-deutsch.jpg"
---

Wer sich ein wenig mit AngularJS beschäftigt oder bereits beschäftigt hat, wird bzw. ist sicher schon über den Namen **Ionic** oder das [Ionic Framework](http://ionicframework.com/ "Ionic Framework") gestolpert.

Der erste Teil des Tutorials befasst sich mit folgenden Themen:

**INHALTE**

 - Was ist hybride App-Entwicklung?
 - Cordova, PhoneGap, Ionic CLI
 - App anlegen
 - Routing mit uiRouter
 - Basiselemente - ionHeader, ionContent, ionFooter
 - Navigation - ionNavView, ionView
 - Nutzung von Sidemenus
 - [Modals](/artikel/ionic-tutorial-deutsch-modals/)
 - [Popups](/artikel/ionic-tutorial-deutsch-popups/)
 - [Ionicons](/artikel/ionic-tutorial-deutsch-ionicons/)
 - [Styling mit SCSS](/artikel/ionic-tutorial-deutsch-scss/)
 - [Konfiguration mit $ionicConfigProvider](/artikel/ionic-tutorial-deutsch-configuration/)

**Voraussetzung**

Zum Verständnis des Tutorials sollten die Grundlagen von AngularJS bekannt und vor allem verstanden sein!

Alle Quelltexte findet ihr auf [GitHub](https://github.com/angularjs-de/ionic-tutorial) oder ladet euch alles als [ZIP-Archiv](https://github.com/angularjs-de/ionic-tutorial/archive/master.zip) herunter. In jedem Abschnitt ist natürlich auch eine Live-Demo verlinkt.

<hr>
<div class="workshop-hint">
    <div class="h3">Keine Lust zu Lesen?</div>
    <div class="row mb-2">
        <div class="col-xs-12 col-md-6">
            <p>
                Du willst tiefer und vor allem effektiv in das Thema Ionic einsteigen? Kein Problem! Wir bieten interative Workshops zum Thema
                <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-ionic?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-top">Ionic
                    und TypeScript</a> an.
            </p>
            <p class="">
                <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-ionic?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-top">
                    <button class="btn btn-danger">Mehr Informationen zur Schulung</button>
                </a>
            </p>

        </div>
        <div class="col-xs-12 col-md-6">
            <img class="img-fluid img-rounded"
                 src="medium_Screen-Shot-2017-03-19-at-11.52.54.png?v=63657140418"
                 alt="Teilnehmer in der Veranstaltung Ionic 2 &amp; Intensiv Workshop/Schulung">
        </div>
    </div>
</div>
<hr>

### Ionic und hybride App-Entwicklung

Hinter dem Namen Ionic verbirgt sich nicht etwa noch ein weiteres Singel-Page-Application-Framework oder eine einfache Erweiterung von AngularJS. Das Team rund um Ionic hat mit ihrem Framework mehr einen Aufsatz für AngularJS geschaffen, um damit *hybride mobile Apps* zu bauen.

Der Vorteil ist die einfache Nutzung von Webtechnologien, wie HTML5, CSS3 und JavaScript anstatt Objective-C, Swift oder Java zu erlernen. Dadurch schafft man eine gemeinsame Code-Basis für alle Plattformen.

### Cordova, PhoneGap und Ionic CLI

Den Zugriff auf native Schnittstellen oder Dienste und Komponenten des mobilen Gerätes erhält der Entwickler mit [Apache Cordova](https://cordova.apache.org/ "Cordova") oder [Adobe PhoneGap](http://phonegap.com/ "PhoneGap").
Beide Anbieter stellen ein CLI bereit, über das alle wichtigen Schritte ausgeführt werden können.

 - Projekt anlegen
 - Plattform hinzufügen/entfernen
 - Plugin hinzufügen/entfernen
 - Plugin suchen
 - Projekt bauen (finale App, z.B. als .apk-Datei)

Cordova ist OpenSource und die Basis für PhoneGap. Adobe behält sich jedoch vor eigene Änderungen an PhoneGap vorzunehmen. Dadurch konnte der Dienst [PhoneGap Build](https://build.phonegap.com/ "PhoneGap Build") entstehen mit dem Anwendungen direkt in der Cloud gebaut werden. Besonders für iOS-Apps ist der Dienst eine große Hilfe, da diese auf einem Mac kompiliert werden müssen.

Ionic soll zukünftig ein Rundum-Paket liefern. Dazu zählen bereits eigene Services, wie Push-Nachrichten oder Analytics, aber auch eine eigene App-Verwaltung, um jederzeit die eigenen Apps ausprobieren und vorzuführen können.

Damit dies überhaupt möglich ist, stellt auch Ionic ein eigenes CLI, die **Ionic CLI** - bereit, welches wiederum auf **Cordova** basiert.

Die Ionic CLI enthält dabei alle wichtigen Funktionen der Cordova CLI und erweitert diese um weitere Befehle.

### Die erste App anlegen

Es gibt im Prinzip zwei Möglichkeiten eine Ionic-App zu entwickeln.

 1. über Ionic CLI -- Nutzung der CLI Befehle und Mechanismen
 2. als normale Web-App -- eigenständige Einbindung der nötigen Bibliothek und Testen im Browser (ggfs. Nutzung von PhoneGap Build)

**Ionic CLI**
Im ersten Fall muss zuvor Cordova und danach das Ionic CLI über die nachstehende Code-Zeile installiert werden.

```shell
npm install -g ionic
```

Der folgende Befehl erstellt dann ein neues Projekt.

```shell
ionic start pizzaApp [template]
```

Jetzt finden sich die Projektdateien in einem neuen Ordner mit dem Namen *pizzaApp* wieder. Der Parameter *template* ist optional und gibt an, welches der angebotenen Starter-Templates genutzt wird.

Mögliche Templates sind:

 - `tabs` - App mit Tab-Navigation (Standard)
 - `sidemenu` - App mit einem Seitenmenü
 - `maps` - Beispiel mit Google Maps
 - `salesforce` - Kooperation zur Nutzung des Salesforce CRM
 - `blank` - ein leeres Projekt

Im `www`-Verzeichnis befinden sich jetzt die eigentlichen Anwendungsquellen, die für diese Einführung wichtig sind.

Über den Befehl

```shell
ionic serve
```

wird ein lokaler Dateiserver gestartet, sodass die Anwendung ohne Einschränkungen ausgeführt werden kann. Wird der Befehl mit dem Parameter `--lab` gestartet, erhalten wir eine parallele Ansicht der App auf iOS und Android.

```shell
ionic serve --lab
```

![Beispiel eines ionic serve --lab](02-ionic-serve-lab.png)

**Web-App**

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/02-App%20anlegen)

Eine Ionic-App kann auch genauso wie eine normale Web-App bzw. AngularJS-App entwickelt werden. So kann sich PhoneGap Build die Projektdaten direkt von GitHub laden. Danach baut der Service intern ein eigenes CLI Projekt und installiert Plugins und Plattformen je nach Konfiguration in der `config.xml`.
Im Vergleich zum CLI Projekt sind hier nur die Inhalte des `www`-Ordners und die `config.xml` relevant.
Zusätzliche Ordner und Dateien eines CLI-Projekts sind hier überflüssig.
Im Gegensatz dazu müssen die Bibliotheken AngularJS und Ionic manuell eingebunden werden.

Möglichkeiten zur Einbindung des Ionic Frameworks:

 1. Über ein CDN - [code.ionicframework.com](https://code.ionicframework.com/) für Entwicklungs- und Testphasen
 2. Bower - `bower install ionic`
 3. GitHub - Download der [Release-Quellen](https://github.com/driftyco/ionic/releases "Release-Quellen")

Allgemein besteht das Framework aus AngularJS, der AngularJS-Erweiterungen von Ionic, das Ionic Basis-Script, zusätzlichen AngularJS-Modulen (z.B. UI-Router für das erweiterte Routing) Je nach Bedarf werden nicht alle benötigt. und den Styling-Dateien (CSS, SCSS und Icon-Font). Zur Vereinfachung stellt Ionic eine zusammengefügte Datei zur Verfügung in der alle benötigten JavaScript-Dateien bereits enthalten sind.

Im einfachsten Fall sieht die Definition einer Ionic-Anwendung folgendermaßen aus.

```html
<html ng-app="pizzaApp" strict-di>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1,   maximum-scale=1, user-scalable=no, width=device-width">

    <title>Pizza-App</title>
    <!-- Load ionic sources over cdn -->
    <link href="//code.ionicframework.com/nightly/css/ionic.css" rel="stylesheet">
    <script src="//code.ionicframework.com/nightly/js/ionic.bundle.js"></script>
    <script type="text/javascript">
      angular.module('pizzaApp', ['ionic']);
    </script>
  </head>

  <body>
    <!-- HTML content of the app -->
  </body>
</html>
```

### Routing mit UI-Router

Ionic nutzt nicht den zum Core gehörenden ngRouter sondern setzt auf [UI-Router](https://github.com/angular-ui/ui-router "UI-Router"). Durch den UI-Router haben wir die Möglichkeit dynamisch mehrere View pro Route, die im UI-Router State heißen, anzusprechen und mit Inhalt zu füllen.

#### Erstellen von Zuständen
Link zum <a href="https://github.com/angularjs-de/ionic-tutorial/tree/master/03a-Routing%20(States)" target="_blank">Quellcode</a> / <a href="https://angularjs-de.github.io/ionic-tutorial/03a-Routing%20(States)/#/order" target="_blank">Demo</a>

Anstatt, wie bisher, Routen zu definieren, werden nun Zustände in der config-Phase der Anwendung erstellt. Dazu bietet der UI-Router zwei Provider.

 1. `$stateProvider` - Definieren von Zuständen
 2. `$urlRouterProvider` - Definieren von Regeln bzw. Bedingungen, wie wann navigiert wird

Unsere JavaScript-Code unserer Tutorial-App, die wir im vorherigem Abschnitt angelegt haben, wandert nun auf Grund der Übersichtlichkeit in eine eigene Datei. Hinzu kommt ein config-Block in dem wir zwei Zustände erstellen.

 1. order - Gibt alle Pizzen aus und nimmt Bestellungen entgegen
 2. about - Enthält Text über den Pizza-Service

Der config-Block sieht im einfachsten Fall wie folgt aus:

```javascript
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/order');

  $stateProvider
    .state('order', {
      url: '/order',
      templateUrl: 'app/templates/order.html',
      controller: 'OrderCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/templates/about.html'
    });
});
```

Als erstes laden wir beide Provider. Danach werden die beiden Zustände über die `state`-Methode des __`$stateProvider`__ mit einem Namen und einem Konfigurationsobjekt erstellt. Das Objekt beinhaltet die zu füllenden Views mit Angabe von Template und dem Controller sowie die zu verknüpfende URL. Mit den __`$urlRouterProvider`__ kann eine Fallback-URL angegeben werden, die genutzt wird falls ein nicht vorhandener Zustand aufgerufen wird.

Der UI-Router bringt weiterhin eigene Direktiven mit.

 - `uiView` - ersatz für `ngView`, optionale Angabe eines Namen
 - `uiSref` - ersatz für `ngHref`, Angabe eines State-Namen bzw. URL und Übergabe eines optionalen Parameter-Objektes
 - `uiSrefActive` - setzt eine CSS-Klasse, falls der unter `uiSref` angegebene Zustand aktiv ist

Der Inhalt unserer `index.html` könnte unter Verwendung der vorgestellten Direktiven, wie folgt aussehen.

```html
<body>
  <a ui-sref="order" ui-sref-active="active">Start</a>
  <a ui-sref="about" ui-sref-active="active">Über Uns</a>
  <ui-view></ui-view>
</body>
```

Unsere App hat nun ein Einhängepunkt in dem Inhalte eingefügt werden, sowie zwei Verlinkungen. Falls ein Zustand aktiv ist, wird am Element die Klasse `active` gesetzt. Werden nun noch die fehlenden Templates und der Controller angelegt, lässt sich die Anwendung fehlerfrei ausführen.

Wird der `uiView` ein Name zugewiesen:

```html
<ui-view name="content"></ui-view>
```

oder

```html
<div ui-view="content"></div>
```

Sieht eine Zustandsdefinition so aus:

```javascript
.state('order', {
  url: '/order',
  views: {
    'content@': {
      templateUrl: 'app/templates/order.html',
      controller: 'OrderCtrl'
    }
  }
})
```

Das Konfigurationsobjekt erhält den Schlüssel **`views`**. Dieser hält wieder ein Objekt aus *`uiViewName@zustandDerUiViewDefinition`* als Schlüssel und als Wert ein Objekt mit Template, Controller, usw..

### Parameter
Natürlich kann ein Zustand auch Parameter erhalten. Dazu muss einfach der Name des Parameters mit einem ':' als Prefix in die URL eingepflegt werden.

```javascript
/order/:id
```

Alternativ kann die '{}'-Schreibweise genutzt und optional sogar der Datentyp festgelegt werden. Das spart möglicherweise unnötiges Parsen der Daten.

```javascript
/order/{id:int}
```

Einen vollständigen Überblick erhaltet ihr im dazugehörigen Abschnitt des [UI-Router-Wikis](https://github.com/angular-ui/ui-router/wiki/url-routing#url-parameters).

### Abstrakte und Eltern-Zustände

Link zum <a href="https://github.com/angularjs-de/ionic-tutorial/tree/master/03b-Routing%20(Parent%2C%20Abstract)" target="_blank">Quellcode</a> / <a href="https://angularjs-de.github.io/ionic-tutorial/03b-Routing%20(Parent,%20Abstract)/#/order" target="_blank">Demo</a>

Ein weiterer Vorteil vom UI-Router ist die Möglichkeit State-Hierarchien aufzubauen. Dadurch kann beispielsweise ein Basis-Zustand definiert werden um gemeinsame Logik übersichtlich in einen eigenen Zustand auszulagern. Häufig nutzt man diese Hierarchien wenn Funktionen oder Information über mehrere States, also Routen, zur Verfügung stehen sollen. Dadurch müssen wir nicht den `$rootScope` missbrauchen oder die Funktionen in jedem Controller extra definieren.

Als Beispiel erhält unsere Anwendung nun einen Basis-Zustand, der das Basis-Template beinhaltet. Alle Kind-Zustände erhalten diesen als Eltern-Zustand.

```javascript
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
    .otherwise('/order');

  $stateProvider
    .state('base', {
      url: '/',
      views: {
          'base': {
              templateUrl: 'app/templates/base.html'
          }
      }
    })
    .state('base.order', {
      url: 'order',
      templateUrl: 'app/templates/order.html',
      controller: 'OrderCtrl'
    })
    .state('about', {
      parent: 'base',
      url: 'about',
      templateUrl: 'app/templates/about.html'
    });
});
```

Es gibt mehrere Möglichkeiten einen Eltern-Zustand zuzuweisen.

 1. **dot-Notation** - Order State erhält `base` als Elternzustand durch die Benennung in "base.order"
 2. **`parent`-Attribut** - Der `about`-State erhält `base` als Elternzustand durch seine Angabe im `parent`-Attributes

Das `base`-Template beinhaltet nun die früheren Inhalte des body-Tags. Dort haben wir nun nur noch ein `uiView`-Element, das der Basis-Zustand als Einstiegspunkt nutzt.

**Beachte:**
Die URL eines Kind-Zustandes darf den gemeinsamen Teil mit dem Eltern-Zustand bei seiner Definition nicht beinhalten. Aus diesem Grund fehlt bei den Kind-Urls der '/'.

Jetzt haben wir nur noch ein Problem. Wenn wir nämlich direkt unsere Anwendung mit '/' aufrufen wird nur der Basis-Zustand geladen und angezeigt. Dies wollen wir vermeiden und glücklicherweise bietet der UI-Router auch dafür eine Lösung.
Wir müssen aus unserem Basis-Zustand einen abstrakten Zustand machen. Dazu erhält der Basis-Zustand das Attribut `abstract`, welches wir auf `true` setzen. Danach ist '/' nicht mehr eigenständig aufrufbar und unser Fallback-Mechanismus greift.
Das ist so ähnlich wie in der OOP mit abstrakten Klassen. Man kann sie verwenden, um eigene Klassen zu implementieren, aber nie direkt Objekte von ihr selbst erzeugen.

*[OOP]: Objektorientierte Programmierung

### Events und Services
Ähnlich zum Standard-Router bietet der UI-Router ein paar Services und Events, um flexible in das Routing einzugreifen. Wichtige Services sind dabei:

 - `$state` - enthält Methoden zum programmatischem Routen
   - `transitionTo()`
   - `go(stateName, paramsObject)` (nutzt intern transitionTo)
 - `$stateParams` - Zugriff auf die Parameter eines Zustands

Mit Hilfe dieser AngularJS-Events könnt ihr auf das Navigieren reagieren:

 - `$stateChangeStart` - Routing zu neuem Zustand startet
 - `$stateChangeSuccess` - Routing erfolgreich abgeschlossen
 - `$stateChangeError` - Routing mit Fehler abgeschlossen

Alle Events erhalten folgende Parameter:

 - `event` - das AngularJS Event-Objekt
 - `toState` - der Zeilzustand
 - `toStateParams` - die ggfs. gesetzten Url-Parameter
 - `fromState` - vorherige Zustand
 - `fromStateParams` - die ggfs. gesetzten Url-Parameter des vorherigen Zustands
 - `error` - nur im `$stateChangeError`

## Basis-Komponenten

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/04-BaseComponents) / [Demo](https://angularjs-de.github.io/ionic-tutorial/04-BaseComponents/#/order)

Bisher sieht unsere App noch so gar nicht nach einer mobilen Anwendung aus. Ionic stellt genau für diesen Zweck eine Reihe von vorgefertigten Direktiven zur Verfügung. Dabei sollte beachtet werden, dass damit auch in vielen Fällen zusätzliche Funktionen verknüpft sind. Wird nur das Styling der Komponenten genutzt existieren dafür häufig bereits vorgefertigte Alternativen mit reinem [CSS](http://ionicframework.com/docs/components/ "CSS Komponenten").

Als Basis einer Ionic-App stehen drei Komponenten zur Verfügung:

 - `ionHeaderBar` - Kopfzeile der App, beinhaltet Titel und Schaltflächen
 - `ionContent` - Inhaltsbereich der App, übernimmt Scrolling
 - `ionFooterBar` - Fußzeile der App, beinhaltet Text und Schaltflächen

Wir benutzen nun die Komponenten in unserem Basis-Layout. Die Navigationslinks werden Inhalt einer `ionHeaderBar` und die `uiView` wird in ein `ionContent`-Element verschoben.

```html
<ion-header-bar class="bar-positive">
  <div class="buttons">
    <a ui-sref="base.order" ui-sref-active="active" class="button">Start</a>
  </div>
  <h1 class="title">Pizza App</h1>
  <div class="buttons">
    <a ui-sref="about" ui-sref-active="active" class="button">Über Uns</a>
  </div>
</ion-header-bar>
<ion-content>
  <ui-view></ui-view>
</ion-content>
```

Beim Aufruf fällt sofort auf, dass bei Einhaltung der Struktur, die Links direkt als Schaltflächen dargestellt und der aktive Zustand hervorgehoben wird. Dazu sollte sich an die vorgegebene Struktur gehalten werden:

 - `div` mit Klasse `buttons`
   - enthält Buttons links
 - `h1` mit Klasse `title`
   - enthält Seitentitel
 - `div` mit Klasse `buttons`
   - enthält Buttons rechts

Des Weiteren lässt sich der Inhaltsbereich scrollen. Dazu können eine Vielzahl von Einstellungen getroffen werden. Unter anderem lässt sich JavaScript-Scrollen aktivieren, dass für manche Ionic-Funktionen wichtig ist aber auch die Performance der Anwendung minimieren kann oder auch ein Standard-Padding einfügt werden.

Die Fußleiste kann einfach, wie die `ionHeaderBar` davor, nach dem `ionContent` eingefügt werden.

Zusätzlich zu einer Kopfzeile kann man eine fixierte Unterzeile eingefügen. Dazu kommt eine zweite `ionHeaderBar` nach der ersten hinzu. Jedoch benötigt das Element Klasse `bar-subheader`.

## Navigation

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/05-Navigation) / [Demo](https://angularjs-de.github.io/ionic-tutorial/05-Navigation/#/order)

Die bisherige App-Struktur macht für eine komplexe App wenig Sinn. Derzeit kann immer nur der scrollbare Inhalt ausgetauscht werden. Es kann aber sein, dass in einem Zustand gar nicht gescrollt werden soll oder in der Kopfzeile andere Schaltflächen angezeigt werden.

Dafür könnte natürlich in jedem Zustand eine neue Kopfzeile, Fußzeile und ein eigener Content-Bereich definiert werden. Das ist mühselig zu mühselig und geht auch einfacher.

#### Komponenten
Aus diesem Grund gibt es im Ionic Framework Navigations-Komponenten.

 - `ionNavView` - basiert auf uiView
 - `ionView` - Wrapper einer View
 - `ionNavBar` - Navigationsleiste (basiert auf ionHeaderBar)
 - `ionNavBackButton` - zeigt Zurück-Button an, falls nötig
 - `ionNavButtons` - Erlaubt das Konfigurieren der Schaltflächen in der `ionNavBar` pro View
 - `ionNavTitle` - Setzt Titel in der `ionNavBar` pro View

Als erstes ersetzen wir jede `uiView` mit `ionNavView`. Danach wird die `ionHeaderBar` mit einer `ionNavBar` ausgetauscht. Da Zwischenergebnis grauenvoll aussehen würde, machen wir direkt mit den nächsten Umbauarbeiten weiter.

Wir könnten jetzt innerhalb der Navigationsleiste die Buttons mit der `ionNavButtons`-Komponente konfigurieren. Jedoch sollten wir überlegen, ob wir diese jetzt überhaupt noch brauchen. Unser Startzustand ist der `order`-State. Von diesem aus müssen wir irgendwie zur *Über Uns*-Seite gelangen von wo aus nur die Möglichkeit besteht wieder zurückzugehen. Aus diesem Grund erhält nun jedes View-Template einen eigenen `ionContent`, dieser wird nun von einer `ionView` umschlossen. Dadurch können wir nun dort im order-State den Navigationsbutton setzen.

```html
<ion-view>
  <ion-nav-buttons side="right">
    <a ui-sref="about" ui-sref-active="active" class="button">Über Uns</a>
  </ion-nav-buttons>
  <ion-content padding="true">
    <div ng-repeat="pizza in pizzas">
      {{pizza.name}} {{pizza.price}}
    </div>
  </ion-content>
</ion-view>
```

Zusätzlich erhält die Navigationsleiste im Basis-Template einen `ionNavBackButton` und setzt den App-Titel über die `ionNavTitle`-Komponente.

```html
<ion-nav-bar class="bar-positive">
  <ion-nav-back-button></ion-nav-back-button>
  <ion-nav-title class="title">Pizza App</ion-nav-title>
</ion-nav-bar>
<ion-nav-view></ion-nav-view>
```

Klicken wir nun auf *Über Uns* erscheint sofort der Zurück-Button in der Navigationsleiste.

![Ionic Navigation Bild](ionic-navigation.gif?v=63629079934)

#### Services

Natürlich kann auch programmatisch auf die Navigation und das Verhalten der Navigationsleiste zugegriffen werden. Dazu stellt das Framework zwei Services bereit:

 - `$ionicNavBarDelegate` - Zugriff auf die Navigationleiste, z.B. Zurück-Button ausblenden, Titel setzen
 - `$ionicHistory` - Manipulieren der Navigationshistorie, manuelles Zurück-Gehen, Historie löschen, Optionen der nächsten View setzen (z.B. Animation deaktivieren, als Navigationswurzel setzen)

### Seitenmenüs

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/06-Sidemen%C3%BC) / [Demo](https://angularjs-de.github.io/ionic-tutorial/06-Sidemenü/#/order)

Das Ionic Framework stellt dem Entwickler zwei zusätzliche und grundlegende Komponenten zur Navigation bereit.

 1. **Seitenmenüs** - Ausklappbares Menü, Wechsel zwischen Hauptpunkten der App
 2. **Tabs** - Reihe von Schaltflächen zum Wechsel zwischen Hauptfunktionen

Dabei sollte beachtet werden, dass der Einsatz der Komponenten global für die App gilt. In meiner Arbeit mit Ionic habe ich auch die Erfahrungen gemacht, dass es nicht ratsam ist ein Seitenmenü oder Tabs nur in einem bestimmten Teil der Anwendung zu nutzen. Dies führt häufig zu unerwartetem Verhalten im Routing da jeder Tab eine eigene Navigationshistorie hat. Nur mit vielen Verbiegungen ist es möglich Tabs auf einer Unterseite direkt aufzurufen. Ein ähnlichen Fall gibt es bei Seitenmenüs. In der Regel ist ein Seitenmenü ein Schnellzugriff für die wichtigsten Funktionen und Informationen. Oft ist dieses auch nur zugänglich, wenn man sich nicht in einem Kind-Zustand befindet.

#### Der Aufbau
Unsere Pizza-App soll nun um ein Seitenmenü ergänzt werden. Dazu schauen wir uns erstmal an, aus was so ein Menü eigentlich besteht.

 - `ionSideMenus` - beinhaltet die einzelnen Seitenmenüs
 - `ionSideMenu` - stellt ein Seitenmenü dar, Angabe der Seite über Attribute `side` mit Wert `left` oder `right`
 - `ionSideMenuContent` - hier kommt dann der Hauptinhalt der App rein, in den meisten Fällen die Basis `ionNavView`

Wir erstellen nun im Basis-Template unserer App ein Seitenmenü auf der linken Seite. Zusätzlich erhält das Menü zwei Links, einen zur Bestellseite und einen zur „Über Uns“-Seite.

```html
<ion-side-menus>

  <ion-side-menu side="left">
    <ion-header-bar class="bar-assertive">
      <h1 class="title">Menü</h1>
    </ion-header-bar>
    <ion-content scroll="false">
      <div class="list">
        <a ui-sref="base.order" ui-sref-active="active">
          Bestellen
        </a>
        <a ui-sref="about" ui-sref-active="active">
          Über Uns
        </a>
      </div>
    </ion-content>
  </ion-side-menu>

  <ion-side-menu-content>
    <ion-nav-bar class="bar-positive">
      <ion-nav-back-button>
      </ion-nav-back-button>
      <ion-nav-title class="title">Pizza App</ion-nav-title>
    </ion-nav-bar>
    <ion-nav-view></ion-nav-view>
  </ion-side-menu-content>

</ion-side-menus>
```

Über `ionSideMenus` sagen wir, dass unsere App Seitenmenüs verwendet. Danach folgt die Definition unseres Sidemenus durch `ionSideMenu` unter der Angabe von `side="left“`. Die entsprechenden Links legen wir als Inhalt des Menüs an. Alles übrige vom vorherigen Code wird in das `ionSideMenuContent`-Element verschoben.

#### Öffnen und Schließen des Menüs
Beim Ausführen der App fällt auf, dass es keinen Button gibt, um das Menü zu öffnen. Aber wir können schon einmal das Menü "aufziehen" (auch draggen genannt). Auf der Startseite ziehen wir nun quasi am Inhalt (von links nach rechts) und bringen so das Menü zum Vorschein.
Natürlich hat das Ionic-Team auch daran gedacht, dass ein Seitenmenü auch möglichst elegant über einen Button oder generell eine Klick-Aktion geöffnet und geschlossen werden kann. Dazu existiert die Direktive `menuToggle`. Als Wert erhält sie dann den Wert, welches Seitenmenü (`left` oder `right`) mit dem Button verknüpft ist.
In unsere Anwendung bauen wir, wie für eine mobile App typisch, in der Navigationsleiste auf der linken Seite eine Schaltfläche ein, die unser Menü öffnet und schließt.

```html
<ion-nav-buttons side="left">
  <button class="button button-icon button-clear ion-navicon" menu-toggle="left">
  </button>
</ion-nav-buttons>
```

Nun können wir schnell und einfach unser wunderschönes Seitenmenü ein- und ausblenden.

![Ionic Sidemenu Bild](ionic-sidemenu.gif?v=63629079934)

#### Einhalten des Navigationskonzeptes

Beim Ausführen der Anwendung und klicken auf die Links im Seitenmenü fällt nun auf, dass das Menü immer offen bleibt und das, obwohl der komplette Kontext gewechselt wird (kein Aufruf einer Kinder-View) blendet Ionic automatisch den Zurück-Knopf nach dem Zustandswechsel ein.
Dieses Verhalten lässt sich dank einer eigenen Direktive - namens `menuClose` für Links in Seitenmenüs beheben. Schreiben wir an die beiden Links `menu-close` als Attribut, passiert beim Klick auf diese folgendes.

 1. das Seitenmenü wird geschlossen
 2. Historie der Navigation wird zurückgesetzt
 3. Animation für den kommenden Zustandsübergang deaktiviert
 4. Zustand wird gewechselt

Daher erweitern wir die Links, um die `menuClose`-Direktive.

```html
<a ui-sref="base.order" ui-sref-active="active" class="item" menu-close>
  Bestellen
</a>
```

Weil die Historie der Navigation zurückgesetzt wird verhindern wir, dass Zustände mehrfach in der Historie landen.

Hätten wir an dieser Stelle schon eine Detail-View auf einen weiteren Zustand, wie eine Informationsseite zu einer bestimmten Pizza, würde auffallen, dass unser Menü-Knopf dort automatisch ausgeblendet wird. Dies hat schlicht und ergreifend den Grund, dass man den Weg, den man als Nutzer gegangen ist auch erst wieder zurückgehen sollte. Das hat den Grund, dass sonst an vielen Stellen Navigationzyklen entstehen könnten und dadurch Funktionen oder der Bedienbarkeit der Anwendung in Mitleidenschaft gezogen werden. Wer dieses Verhalten nicht mag, kann dieses auch einfach über einen Konfigurationsparameter der `ionSideMenus`-Direktive ändern. Über das Attribut `enable-menu-with-back-views` kann der Menü-Button immer eingeblendet werden. Dazu setzt ihr den Wert einfach auf `true`.

```html
<ion-side-menus enable-menu-with-back-views="true">
  ...
</ion-side-menus>
```

#### Programmatischer Zugriff auf Seitenmenüs

Auch dafür gibt es natürlich eine ziemlich gute Lösung. Wie bei vielen Komponenten bietet Ionic auch hier einen eigenen Service an, um das Verhalten der Seitenmenüs zu steuern. Bindet einfach den `$ionicSideMenuDelegate`-Service als Abhängigkeit in euern Controller ein. Danach hab ihr Zugriff auf viele Funktionen. Ein paar wichtige stell ich hier kurz vor:

 - `toggleLeft([isOpen])` - getter- und setter-Methode, wenn `isOpen` gesetzt ist, dann wird das linke Menü bei `true` geöffnet und bei `false` geschlossen
 - `toggleRight([isOpen])` - wie `toggleLeft` nur für die rechte Seite
 - `isOpen()`, `isOpenLeft()`, `isOpenRight()` - gibt `true` zurück, falls irgendein, das linke oder das rechte Menü geöffnet ist
 - `canDragContent([canDrag])` - getter- und setter-Methode, wenn `canDrag` gesetzt ist, dann kann das Aufziehen/Zuschieben durch das Ziehen am Inhaltsbereich aktiviert/deaktiviert werden

### Listen

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/07-Lists) und [Live-Demo](https://angularjs-de.github.io/ionic-tutorial/07-Lists/#/order)

Eine der wichtigsten Komponente zur Darstellung von Content in einer App sind Listen. Ob einfach nur zur Umsetzung eine simplen Aufzählung von Einträgen gleichen Typs oder zum strukturieren komplexer Inhalte, Listen sind überall.

Als wohl häufigsten Anwendungsfall zeigen Listen eine Auswahl, die per Interaktion, wie Klick/Tap auf eine Detailseite des Eintrags leitet. Daran angelehnt, bietet Ionic - wie so oft - zwei Möglichkeiten zur Umsetzung.

 1. einfache Listen mit HTML/CSS
 2. erweiterte Listenfunktionalitäten über JavaScript-Komponenten

Bei den einfachen Listen passiert die ganze Magie nur über einer bestimmten DOM-Struktur und dazugehörigen CSS-Klassen. Ein kleines Beispiel:

```html
<ul class="list">
  <li class="item">
    ...
  </li>
</ul>
```

Im Grunde besteht eine Liste aus einem Wrapper-Knoten - im Normalfall ein *ul*- oder ein *div*-Tag mit der CSS-Klasse ***list***. Jeder Listen Eintrag ist wiederum ein *li*- bzw. *div*-Tag mit der Klasse ***item***.

Erinnern wir uns kurz an den letzten Stand unserer Pizza-App. Wir haben zwar ein Sidemenu und die Pizzen werden auch bereits auf der Start-View ausgegeben, aber hübsch ist etwas anderes. Das sollten wir schleunigst ändern und passen das ***order***-Template, wie folgt an.

```html
<ion-view>
  <ion-content padding="true">
    <div class="list">
      <div class="item" ng-repeat="pizza in pizzas">
        {{pizza.name}} {{pizza.price}}
      </div>
    </div>
  </ion-content>
</ion-view>
```

![Ionic Tutorial Simple List](medium_ionic-list.png?v=63629398881)

Aus meiner Erfahrung als Ionic-Entwickler weiß ich, dass Listeneinträge oft gruppiert ausgegeben werden soll, beispielsweise wie ein Kontaktliste nach Buchstaben getrennt oder wie in einem Kalendar nach Zeit/Datum. Auch für solche Trenner bietet Ionic eine einfache Lösung. Durch die zusätzliche CSS-Klasse *item-divider* wird ein Listeneintrag zum Trenner.

```html
<div class="list">
  <div class="item item-divider">
    Angebot
  </div>
  <div class="item" ng-repeat="pizza in pizzas">
    {{pizza.name}} {{pizza.price}}
  </div>
</div>
```

Nach dem gleichen Prinzip können auch Buttons oder Bilder ausgerichtet und angepasst werden.

 - Buttons
   - CSS-Klassen: item-button-left, item-button-right
 - Bilder
   - CSS-Klassen: item-avatar, item-thumbnail-left, item-thumbnail-right
   - Avatar: zeigt automatisch einen runden Bildauschnitt
   - Thumbnail: kleine Vorschauansicht

 Eine vollständige Dokumentation dazu findet ihr in den [Ionic-Docs](http://ionicframework.com/docs/components/#list).

Natürlich hat Ionic auch daran gedacht, dass Listen in nativen Apps viel mehr können als nur Daten auflisten. So können Einträge umsortiert oder über Gesten erweiterte Funktionalitäten angesteuert werden. Ionic bietet genau dafür eigene Direktiven und Services an.

 - **ionList**: Listen-Wrapper, Ersatz für ul/div-Tag mit Klasse list
 - **ionItem**: Listeneintrag, Ersatz für Listeneintrag mit Klasse item
 - **ionDeleteButton**: vordefinierter Löschen-Knopf, blendet vor jedem Eintrag einen Löschen-Button ein
 - **ionReorderButton**: Möglichkeit zum Umsortieren von Listeneinträgen, "Greifer" an jedem Eintrag
 - **ionOptionButton**: Option-Buttons pro Listeneintrag
 - **$ionicListDelegate**: programmatischer Zugriff auf Liste und Zusatzfunktionen

Als Beispiel erweitern wir unsere Pizza-App, um die Funktionalität Pizzen in einen Warenkorb zu legen. Der Warenkorb ist ein eigener State und zeigt die Liste der zu kaufenden Waren. Jeder Eintrag kann über einen **ionOptionButton** gelöscht werden.

Das Template zum Warenkorb könnte dann wie folgt aussehen.

```html
<ion-view>
  <ion-nav-title>Warenkorb</ion-nav-title>
  <ion-content>
    <ion-list>
      <ion-item ng-repeat="item in cart">
        <h2>{{item.name}}</h2>
        <p>{{item.price | currency}}</p>
        <ion-option-button class="button-assertive" ng-click="removeFromCart($index)">
          <i class="icon ion-minus-circled"></i>
        </ion-option-button>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>
```

Die *ionOptionButton*-Direktive wird als Kind des Listeneintrags eingebunden und erhält eine Klick-Funktion die diesen Eintrag aus dem Warenkorb entfernt. Im Hintergrund besitzt die App nun einen eigenen *cartService*, der die nötigen Daten speichert.

![Ionic Tutorial Extend List](ionic-extended-list.gif?v=63629079934)

Die Benutzung von *ionReorderButton* und *ionDeleteButton* sind sich sehr ähnlich. Als Beispiel könnte das Löschen im Warenkorb auch über *ionDeleteButtons* funktionieren.

```html
<ion-list show-delete="true">
  <ion-item ng-repeat="item in cart">
    <h2>{{item.name}}</h2>
    <p>{{item.price | currency}}</p>
    <ion-delete-button class="ion-minus-circled" ng-click="removeFromCart($index)">
    </ion-delete-button>
  </ion-item>
</ion-list>
```

Über das Attribute *show-delete* können die Löschen-Buttons auch flexibel ein- und auch wieder ausgeblendet werden. Für ionReorderButton existiert dafür das Attribut *show-reorder*. Als Kind des *ionItems* kann dem Button ganz normal unsere Klick-Funktion übergeben werden.

![Ionic Tutorial Extend List](ionic-list-delete.gif?v=63629079934)

Programmatischen Zugriff auf eure Listen erhaltet ihr über den **$ionicListDelegate**-Service.
Mit diesem lassen sich die Spezial-Buttons ein und ausblenden, Swipen der Listeneinträge unterbinden. Eine Funktionsübersicht erhaltet ihr auch in den [Ionic-Docs](http://ionicframework.com/docs/api/service/$ionicListDelegate/) des Services.

Jetzt haben wir nur noch ein Problem - Listen können seeeeeeeeehr lang sein. Gerade in hybriden Apps ist das ein großer Nachteil und Performance-Killer - vor allem wenn noch Bilder im Spiel sind. Als Lösung hat Ionic eine eigene Listen-Komponente mit dem Namen **collectionRepeat** entwickelt, die versucht nur eine minimale Anzahl an Listenelemente in den DOM hängt und diese beim Scrollen wiederverwendet.

Im Prinzip funktioniert collectionRepeat wie ein ngRepeat mit Arrays. Einziger Unterschied ist, dass ihr statt `ng-repeat` an den zu wiederholenden DOM-Knoten `collection-repeat` schreibt. Ionic bestimmt automatisch die Höhe und Breite der Listeneinträge anhand des ersten Elements. Ihr könnt die Werte auch für jeden Eintrag selbst bestimmten bzw. setzen. Dazu stehen die Attribute *item-width* und *item-height* zu Verfügung, die einen Ausdruck oder direkt eine Zahl oder Prozentwert erwarten. Dadurch habt ihr auch die Möglichkeit mehrere Listeneinträge pro Zeile anzuzeigen.

Hier der Code unserer Warenkorbliste mit *collection-repeat*.

```html
<ion-list show-delete="true">
  <ion-item collection-repeat="item in cart">
    <h2>{{item.name}}</h2>
    <p>{{item.price | currency}}</p>
    <ion-delete-button class="ion-minus-circled" ng-click="removeFromCart($index)">
    </ion-delete-button>
  </ion-item>
</ion-list>
```

### Ladehandling

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/08-Loading) und [Live-Demo](https://angularjs-de.github.io/ionic-tutorial/08-Loading/#/order)

Bei der Programmierung von Anwendungen ist es wichtig dem Nutzer Feedback zu geben, ob gerade etwas im Hintergrund geschieht oder falls temporär Nutzereingaben blockiert werden - wie beim Absenden eines Formulars - , sollte er wissen wieso.
Für diese beiden Anwendungsfälle stellt Ionic zwei Komponenten zur Verfügung.

 - $ionicLoading
   - Service
   - Overlay über die ganze View
   - Blockierung von Nutzerinteraktionen
   - möglicher Hinweistext
 - ionSpinner
   - Ladekringel-Direktive
   - Indikator, dass Daten geladen werden, z.B. API-Request läuft und noch keine Daten vorhanden

Um einen Ladelayer über die aktive View zu legen, muss der **$ionicLoading**-Service einfach im Controller als Abhängigkeit geladen werden. Danach stehen uns zwei Funktionen zur Verfügung.

 - show([options])
   - Einblenden des Ladelayers
   - Optionen:
     - template (String) - Template als String
     - templateUrl (String) - Pfad zu einer Templatedatei
     - noBackdrop (Boolean) - versteckt Backdrop, um Inhalt der View voll sichtbar zu lassen
     - scope (Scope-Objekt) - eigner Scope, um Template zu füllen (Standardwert: `$rootScope.$new()`)
     - hideOnStateChange (Boolean) - automatisch beim Verlassen des States verstecken
     - delay (Zahl als ms) - Einblenden mit einer Verzögerung
     - duration (Zahl als ms) - automatisches Ausblenden nach x ms
 - hide()
   - Ausblenden des Ladelayers

Beide Funktionen liefern ein `Promise` zurück, welches erfolgreich aufgelöst wird, wenn der Ladelayer angezeigt bzw. ausgeblendet wurde. Dadurch habt ihr die Möglichkeit mit der Ausführung bestimmter Code-Abschnitte auf das tatsächliche Anzeigen/Verschwinden zu warten.

In einer Ionic-Anwendung gibt es nur einen einzigen Ladelayer. Wird `$ionicLoading.show()` mehrmals hintereinander aufgerufen, verändert sich nur das Aussehen des ersten.

Als kleine Übung bauen wir unsere Startseite der Pizza-App so um, dass die Pizzen aus einer eigenen Datei mit einer $http-Anfrage geladen werden. Während dieser Zeit blenden wir ein Ladeoverlay ein, das mindestens 2000ms zu sehen ist. Das Absenden des Requests übernimmt ein eigener Pizza-Service.

```javascript
angular
  .module('pizzaApp')
  .controller('OrderCtrl', [
    '$scope',
    '$timeout',
    '$ionicLoading',
    'cartService',
    'pizzaService',
    function ($scope, $timeout, $ionicLoading, cartService, pizzaService) {
      // Einblenden des Layers
      $ionicLoading.show({
        template: 'Bitte warten...'
      });

      // Laden der Pizzen
      pizzaService
        .getPizzas()
        .then(function (result) {
          // Schreibe Ergebnis auf Scope
          $scope.pizzas = result;
        }, function () {
          // Error case
        })
        .finally(function () {
          // Ausblenden mit Verzögerung von 2000ms
          $timeout(function () {
            $ionicLoading.hide();
          }, 2000);
        });

      $scope.addToCart = function (pizza) {
        cartService.addCartItem(pizza);
      };
    }
  ]);
```

 ![Ionic Tutorial Loading Layer](medium_ionic-loading.png?v=63629399654)

Für unsere Beispiel-App ist der Lade-Layer ein wenig unpraktikabel, da der Nutzer sich ja trotzdem frei in der Anwendung bewegen können soll. Aus diesem Grund nutzen wir nun den **ionSpinner**. Während des Ladevorgangs setzen wir eine Scope-Variable als Indikator, um den Spinner über *ngIf* oder *ngShow* ein- und vor allem wieder auszublenden.

Der Controller-Code sieht nun so aus.

```javascript
angular
  .module('pizzaApp')
  .controller('OrderCtrl', [
    '$scope',
    '$timeout',
    'cartService',
    'pizzaService',
    function ($scope, $timeout, cartService, pizzaService) {
      $scope.loading = true;

      pizzaService
        .getPizzas()
        .then(function (result) {
          $scope.pizzas = result;
        }, function () {
          // error case
        })
        .finally(function () {
          $timeout(function () {
            $scope.loading = false;
          }, 2000);
        });

      $scope.addToCart = function (pizza) {
        cartService.addCartItem(pizza);
      };
    }
  ]);
```

Im Template richten wir den Spinner noch zentriert aus und blenden den Listeninhalt erst ein, wenn der Ladespinner ausgeblendet wurde.

```html
<ion-view>
  <ion-nav-title class="title">
    Pizza App
  </ion-nav-title>
  <ion-content padding="true">
    <div ng-show="loading" class="text-center padding">
      <ion-spinner></ion-spinner>
    </div>
    <div class="list" ng-show="!loading">
      <div class="item item-divider">
        Angebot
      </div>
      <div class="item item-button-right" ng-repeat="pizza in pizzas">
        {{pizza.name}} {{pizza.price}}
        <button class="button button-balanced icon ion-ios-cart" ng-click="addToCart(pizza)"></button>
      </div>
    </div>
  </ion-content>
</ion-view>
```

![Ionic Tutorial Loading Spinner](medium_ionic-loading-spinner.png?v=63629399832)

Standardmäßig bestimmt Ionic die passende Ladeanimation. Darüber hinaus könnt ihr aber mit Hilfe einer CSS-Klasse eine eigene Ladeanimation als SVG erstellen oder einfach eine der vordefinierten [Spinner-Klassen](http://ionicframework.com/docs/api/directive/ionSpinner/) nutzen.


### Daten aktualisieren mit Pull-To-Refresh

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/09-Refresher) und [Live-Demo](https://angularjs-de.github.io/ionic-tutorial/09-Refresher/#/order)

Sind einmal Daten einer View geladen, können diese in nativen Anwendung meist über ein Ziehen am Inhalt aktualisiert werden. Diese Geste bzw. Interaktion wird auch Pull-To-Refresh genannt. Das Ionic-Team hat natürlich auch dafür eine passende Lösung parat, denn diese Standardfunktion wird fast in jeder App genutzt und gebraucht. Mit der **ionRefresher**-Direktive wird einem Scroll-Container, wie dem *ion-content*- oder einem *ion-scroll*-Tag, die Pull-To-Refresh Funktionalität hinzugefügt.
Die Direktive kann über eigene Attribute konfiguriert werden.

 - *on-refresh*: erwartet Funktion, die beim Aktualisieren aufgerufen wird
 - *on-pulling*: erwartet Funktion, die beim Herunterziehen des Contents aufgerufen wird
 - *pulling-text*: Text der beim Herunterziehen angezeigt wird
 - *pulling-icon*: Icon das beim Herunterziehen angezeigt wird (ionicon)
 - *spinner*: Spinner-Icon, zeigt ionSpinner während der Aktualisierung
 - *disable-pulling-rotation*: Deaktiviert das Rotieren des pulling-icon beim Erreichen des Aktualisierungs-Grenzwertes

Zum Veständnis der Attribute folgt ein kleiner Ablaufplan der Pull-To-Refresh Interaktion.

 1. Nutzer hat noch nicht gescrollt bzw. der Scroll-Container ist nicht gescrollt
 2. Nutzer beginnt den Inhalt nach unten zu ziehen (drag-down)
 3. optionale *on-pulling*-Funktion wird ausgeführt, *pulling-text* und *pulling-icon* angezeigt
 4. Drag-Down erreicht Grenzwert zum Aktualisieren
 5. *pulling-icon* wird standardmäßig rotiert (z.B. aus "Pfeil-nach-unten" wird zu "Pfeil-nach-oben")
 6. Nutzer lässt Inhalt los
 7. *spinner* wird angezeigt und *on-refresh*-Funktion ausgeführt

Zum Abschluss, müssen wir der Direktive noch informieren, dass der Aktualisierungsprozesses abgeschlossen ist. Für diesen Zweck reicht es, wenn wir an der passenden Stelle - meist am Ende der Aktualisierungfunktion im Controller - das Event **scroll.refreshComplete** "broadcasten".

Unsere Pizza-Liste soll nun um eine Aktualisierungfunktion erweitert werden. Dabei müssen wir darauf achten, dass sich unser *ionSpinner* und *ionRefresher* nicht in die Quere kommen.

Hier eine mögliche Umsetzung des Controller-Codes.

```javascript
function loadPizzas(refresh) {
  // do not show ionSpinner if refreshing
  if (!refresh) {
        $scope.loading = true;
  }
  return pizzaService
    .getPizzas()
    .then(function (result) {
      $scope.pizzas = result;
    }, function () {
      // error case
    })
    .finally(function () {
      // show the spinner a little bit longer
      $timeout(function () {
        $scope.loading = false;
      }, 2000);
    });
}
// inital loading of pizzas
loadPizzas();

$scope.refresh = function () {
  // reload pizzas as refresh
  loadPizzas(true)
    .finally(function () {
      $scope
        .$broadcast('scroll.refreshComplete');
      });
};

$scope.addToCart = function (pizza) {
  cartService.addCartItem(pizza);
};
```

 Das Template wird um ein *ion-refresher*-Element erweitert und unsere *refresh*-Funktion gesetzt.

```html
<ion-view>
  <ion-nav-title class="title">Pizza App</ion-nav-title>
  <ion-content padding="true">
    <div ng-show="loading" class="text-center padding">
      <ion-spinner></ion-spinner>
    </div>
    <ion-refresher
      pulling-text="aktualisieren..."
      on-refresh="refresh()">
    </ion-refresher>
    <div class="list" ng-show="!loading">
      <div class="item item-divider">
        Angebot
      </div>
      <div class="item item-button-right" ng-repeat="pizza in pizzas">
        {{pizza.name}} {{pizza.price}}
        <button class="button button-balanced icon ion-ios-cart" ng-click="addToCart(pizza)"></button>
      </div>
    </div>
  </ion-content>
</ion-view>
```

![Ionic Tutorial Refresher](ionic-refresher.gif?v=63629079934)

### Strukturieren von Inhalten durch Cards

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/10-Cards) und [Live-Demo](https://angularjs-de.github.io/ionic-tutorial/10-Cards/#/order)

Mit sogenannten Karten (engl. Cards) bietet Ionic eine gute Möglichkeit Listeneinträge, ganze Listen oder einfach nur Inhaltesbereiche mit wenig Quellcode etwas ansprechender zu gestalten.

Der Aufbau ist dem einer Liste sehr ähnlich. Ein Elternelement - meist ein div-Tag - bekommt die CSS-Klasse *card* und das Kindelement - oft auch ein div- oder a-Tag - erhält die bereits bekannte *item*-Klasse. Darüber hinaus können auch alle weiteren "item"-Klassen genutzt werden, um das Layout anzupassen, z.B. *item-divider*, *item-avatar*, *item-icon-left|right*, ...

![Ionic Tutorial Cards](medium_ionic-cards.png?v=63629390074)

Als kleines Praxisbeispiel erhält unsere App eine Detail-View für die Pizzen, die beim Klick auf einen Angebotseintrag angezeigt wird.

![Ionic Tutorial Cards Pizza](medium_ionic-card-final.png?v=63629390026)

Das dazugehörige Template sieht dann so aus.

```html
<ion-view>
  <ion-nav-title>
    {{pizza.name}}
  </ion-nav-title>
  <ion-content>
    <div class="list card">
      <div class="item item-avatar item-icon-left">
        <i class="icon ion-pizza"></i>
        <h2>{{pizza.name}}</h2>
        <p>Ist in unserem Angebot die Nummer {{pizza.id}}</p>
      </div>

      <div class="item item-body">
        <p>
          {{pizza.description}}
        </p>
      </div>
      <div class="item item-divider balanced text-big text-right">
        {{pizza.price ? (pizza.price | currency) : 'kostenlos'}}
      </div>
    </div>
  </ion-content>
</ion-view>
```

Im entsprechenden Detail-Controller wird die anzuzeigende Pizza geladen und bereitgestellt.

### Wie geht es weiter?

 - [Modals](/artikel/ionic-tutorial-deutsch-modals/)
 - [Popups](/artikel/ionic-tutorial-deutsch-popups/)
 - [Ionicons](/artikel/ionic-tutorial-deutsch-ionicons/)
 - [Styling mit SCSS](/artikel/ionic-tutorial-deutsch-scss/)
 - [Konfiguration mit $ionicConfigProvider](/artikel/ionic-tutorial-deutsch-configuration/)

### Abschluss

Damit ist unsere kleine Rundreise durch den Ionischen-Ozean abgeschlossen. Wir hoffen es hat euch gefallen und euer Interesse an der hybriden Entwicklung mobiler Apps geweckt.

Leider haben nicht alle Komponenten im Tutorial und in unserer App ihren Platz gefunden. Aus diesem Grund nun noch die wichtigsten kurz vorgestellt.

 - Popover - Overlay, welches sich teilweise über die View legt, wird an einem DOM-Element ausgerichtet, z.B. Button in Kopfzeile öffnet Popover mit Liste an weiteren Navigationspunkten oder Einstellungen
 - ActionSheet - Schiebt sich von unten über die View, bedeckt diese nur teilweise, Auswahl an Funktionen und Aktionen
 - Tabs - Grundlegends Navigationskonzept, jeder Tab hat eigene Navigationshistorie
 - Slidebox - Galerie von Inhalten, z.B. Bildergalerie, **ab v1.2. sollte [ionSlides](/artikel/ionic-framework-new-slider/ "ionSlides") benutzt werden!!!**

Hinzu kommen noch zahlreiche Services und Funktionen, die euch vor dem Kentern bewahren oder euch zumindest erstmal über Wasser halten.

Ihr findet natürlich auch alles in der [Ionic Dokumentation](http://ionicframework.com/docs/ "Ionic Docs").

Zum Abschluss haben wir die App noch ein wenig gepimpt - aber seht einfach selbst.

Link zum [Quellcode](https://github.com/angularjs-de/ionic-pizza-service/tree/master) und [Live-Demo](https://angularjs-de.github.io/ionic-pizza-service/#/order)

<hr>
<div class="workshop-hint text-center">
<div class="h3">Hat dir das Tutorial geholfen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>Wir haben bereits viele Projekte mit Ionic umgesetzt - nutze unserer Projekterfahrung! Wir geben regelmäßig Schulungen zum Thema <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-ionic?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-buttom">Ionic und TypeScript</a>, auch Inhouse. Im Kurs lernst du die Grundlagen und Konzepte des Ionic Frameworks und kannst die Fragen stellen, die dir direkt bei deiner Umsetzung helfen.</p>
      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-ionic?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-buttom">
          <button class="btn btn-danger">Jetzt weiter lernen</button>
        </a>
      </p>
  </div>
  <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="medium_Screen-Shot-2017-03-19-at-11.52.54.png?v=63657140418" alt="Teilnehmer in der Veranstaltung Ionic &amp; Typescript Intensiv Workshop/Schulung">
  </div>
</div>
</div>
<hr>
