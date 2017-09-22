---
title: "AngularJS-Tutorial für Einsteiger"
description: "Unser Einführungstutorial in AngularJS. Lernt alle Grundlagen anhand von viele praktischen Beispielen und einer ersten eigenen Single-Page-Application."
author: "Sascha Brink"
slug: "angularjs-tutorial-deutsch"
published_at: 2014-03-23 12:12:00.000000Z
categories: "tutorial angularjs"
header_image: "/artikel/header_images/angularjs-tutorial-deutsch.jpg"
---

Dieses Tutorial ist für Anfänger gedacht, die gerade erst mit AngularJS beginnen. Als Beispiel werden wir eine Seite mit Warenkorb für eine Pizzeria bauen und auf dem Weg die Kernelemente von AngularJS kennenlernen.

> **<i class=" fa fa-eye fa-fw"></i>  Demo: [Finale Version](http://angularjs-de.github.io/angularjs-tutorial-code/13-routes-final)**

## Voraussetzungen

Um das Tutorial nachzuvollziehen, ladet euch den Code von GitHub herunter:

> **<i class="fa fa-cloud-download fa-fw"></i> [Download als ZIP](https://github.com/angularjs-de/angularjs-tutorial-code/archive/gh-pages.zip) / [Code auf GitHub](https://github.com/angularjs-de/angularjs-tutorial-code)**

**Wichtig**: Den Code müsst ihr lokal auf einem beliebigen Webserver starten, da ihr sonst Probleme mit der *[Same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy)* bekommt. Ob ihr Apache, den eingebauten Webserver von WebStorm oder sonstigen Webserver nutzt, ist egal. Habt ihr Python installiert, funktioniert z.B.: `python -m SimpleHTTPServer`. Eine weitere Möglichkeit ist es Node.js zu installieren - die Installation liefert euch zugleich den Paketmanager npm. Mit diesem könnt ihr dann global einen HTTP-Server über den folgenden Befehl installieren: `npm install -g http-server`. Und danach ist es möglich in eurem Projektverzeichniss den HTTP-Server auszuführen mit `http-server -o`.

<hr>
<div class="">
  <div class="h3">Keine Lust zu Lesen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>
        Du lernst lieber interaktiv und möchtest Fragen an Experten stellen? Wir bieten euch auch
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-top">Angular
                    und TypeScript Schulungen</a> an. Hier kannst du in kleinen Gruppen deine Lernkurve maximieren.
      </p>
      <p class="">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-top">
          <button class="btn btn-danger">Mehr Informationen zur Schulung</button>
        </a>
      </p>

    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="medium_Screen-Shot-2017-03-19-at-11.52.54.png" alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>


## Überblick

Diese Teile wirst du von AngularJS kennenlernen:

* [Zwei-Wege-Datenbindung](#zwei-wege-datenbindung)
* [Expressions](#expressions)
* [Direktiven](#direktiven)
* [Schleifen mit ng-repeat](#ng-repeat)
* [Filter](#filter)
* [Module](#module)
* [Controller](#controller)
* [Services](#services)
* [Animationen](#animationen)
* [Routen](#routen)

## ng-app - Der Anfang jeder AngularJS-Applikation

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/01-ng-app)

Wir beginnen mit einer einfachen HTML-Datei, die zu Beginn AngularJS und [Bootstrap](http://getbootstrap.com) enthält.

```html
<html ng-app>
<head>
  <meta charset="utf8mb4" />
  <title>AngularJS Tutorial</title>
  <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
</head>
<body>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js"></script>
</body>
</html>
```

Die Datei `angular.js` ist die Einzige, die wir für eine lauffähige AngularJS-Applikation benötigen. Wir benutzen hier die Online-Version, die Google über ihr CDN verteilt. Alternativ kannst du die Datei von [angularjs.org](http://angularjs.org) herunterladen und lokal einbinden.

Durch das Attribut `ng-app` im *html*-Tag erkennt AngularJS unsere Seite nun als AngularJS-Applikation. AngularJS durchsucht dadurch die Seite nach speziellen Tags und Attributen, die zum Framework gehören. Diese heißen in AngularJS Direktiven. Mehr dazu lernst du in den nächsten Schritten.


## Zwei-Wege-Datenbindung

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/02-two-way-databinding) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/02-two-way-databinding)

Das erste, was Leute erstaunt, wenn sie AngularJS zum ersten Mal sehen, ist die Zwei-Wege-Datenbindung. Ergänzen wir unser Beispiel um folgende Zeilen innerhalb des *body*-Tags, um es zu veranschaulichen.

```html
<input type="text" ng-model="search">
<p>Du suchst gerade nach: {{search}}</p>
```

Wenn ihr etwas in das Eingabefeld eingebt, wird der Text an der Stelle ausgegeben, wo `{{search}}` steht. Dies funktioniert durch die Zwei-Wege-Datenbindung.

Durch `ng-model="search"` reagiert AngularJS, sobald Du den Wert des Eingabefeldes änderst. Der Wert in `search` wird im Speicher gehalten und andere Stellen, die `search` verwenden, werden über die Änderung informiert.

Der Ausdruck `{{search}}` ist ein Beispiel für eine Expression. AngularJS sorgt dafür, dass  die View bei einer Änderung der Variable automatisch aktualisiert wird.


## Expressions

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/03-expressions) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/03-expressions)

Expressions sind viel mächtiger, als sie im ersten Moment erscheinen. Expressions erlauben uns, Daten zu manipulieren und zu kombinieren.

```html
{{search.toUpperCase() + "!"}} oder {{1 + 2 + 3}}
```

In diesem Fall wird z.B. der Inhalt von `search` immer direkt in Großbuchstaben umgewandelt und ein Ausrufezeichen angehängt. Expressions kannst du mit mit der [eval()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)-Funktion von JavaScript vergleichen - jedoch mit eingeschränkten Möglichkeiten.


## Direktiven

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/04-directives) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/04-directives)

Wie wir bereits in der Einleitung erwähnten, hat AngularJS spezielle Tags wie `ng-app`, die wir Direktiven nennen.  Diese erweitern den Sprachumfang von HTML. Direktiven von AngularJS erkennst du an dem Präfix `ng-`. Die Direktiven helfen dir, große Teile einer Applikation ohne eine Zeile Code zu schreiben.

Probieren wir eine weitere, einfache Direktive aus und ändern dazu die Zeile mit dem Suchergebnis leicht ab:

```html
<p ng-show="search">Du suchst gerade nach: {{search}}</p>
```

Der Paragraph wird nun erst sichtbar, wenn wir anfangen, etwas in das Eingabefeld zu tippen. `ng-show` ist eine Direktive, die Elemente nur einblendet, wenn die übergebene Variable einen Wert enthält.


## Schleifen mit ng-repeat

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/05-loops) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/05-loops)

Bevor wir später unsere eigene Direktive schreiben, schauen wir uns die wahrscheinlich meistgenutzte Direktive in AngularJS an: `ng-repeat`. Dieser Direktive können wir ein Array übergeben und darüber iterieren. `ng-repeat` können wir dabei mit einer *forEach*-Schleife für DOM-Elemente vergleichen. Fügen wir also folgenden Code ein:

```html
<table class="table">
  <tr ng-repeat="article in ['Pizza Margherita', 'Pizza Tonno']">
    <td>{{article}}</td>
  </tr>
</table>
```

Was passiert dabei? AngularJS hält sich intern eine Kopie vom `<tr>`-Element vor und kopiert dieses für jedes Element aus unserem Array. Für eine Kopie wird das Element in die Variable `article` geschrieben, welche wir dann benutzen können. In unserem Beispiel hat `article` in der ersten Kopie den Wert *Pizza Margherita*, in der zweiten Kopie den Wert *Pizza Tonno*.

Natürlich können wir auch mit Variablen anstatt von fest programmierten Arrays arbeiten. In unserem Beispiel tauschen wir das Array durch eine Variable names `articles` aus:

```html
<tr ng-repeat="article in articles">
```

Bevor wir die Artikel später dynamisch laden lassen, initialisieren wir sie im *body*-Tag über eine weitere Direktive: `ng-init`.

```html
<body ng-init="articles = ['Pizza Margherita', 'Pizza Tonno']">
```

Wir haben also bisher eine Liste von Pizzen und eine nicht funktionierende Suchbox. Zeit, Beides zu kombinieren.


## Filter

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/06-filters) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/06-filters)

Um die Suche funktionstüchtig zu machen, müssen wir nur die Zeile mit `ng-repeat` abändern:

```html
<tr ng-repeat="article in articles | filter:search">
```

Das war's - probiert es aus! Wir haben hier einen Filter benutzt - einen Filter mit dem Namen *filter*. Generell benutzen wir Filter, indem wir eine Pipe (`|`) einfügen und danach den Namen des Filters angeben. Der benutzte Filter ist also der *filter*-Filter.

Durch einen Filter kann eine Liste oder ein Wert dynamisch verändert werden. In diesem Fall wird das Array von `articles` an den Filter *filter* übergeben. Dieser schränkt das Array ein. Dann wird über das eingeschränkte Array iteriert.

Filter können auch Argumente entgegennehmen (filter:`search`), die wir durch einen Doppelpunkt abtrennen. AngularJS selber bringt bereits einige Filter mit, mit denen wir Daten z.B. sortieren oder eingrenzen können. Natürlich können wir auch eigene Filter erstellen.


## Module

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/07-modules) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/07-modules)

Auch wenn wir bisher ohne eine Zeile JavaScript-Code ausgekommen sind, kommt doch irgendwann der Punkt, wo es nicht mehr ohne geht. Deshalb kann AngularJS natürlich auch mit JavaScript-Code "reden". Das Erste, was wir dazu tun müssen, ist, ein `Modul` zu erstellen. In diesem Fall legen wir eine neue Datei `app.js` an und fügen folgende Zeile hinzu:

```javascript
angular.module('tutorialApp', []);
```

Ein Modul ist eine Sammlung von Controllern, Services, Filtern und Direktiven. Module können dabei von anderen Modulen abhängig sein. Diese tragen wir in das Array hinter dem Modulnamen ein.

Das leere Array hinter `tutorialApp` bedeutet in diesem Fall, dass wir noch keine Abhängigkeit haben. Wenn wir eine Abhängigkeit hätten, könnte die Moduldefinition z.B. so aussehen: `angular.module('tutorialApp', ['ng-animate']);`.

Um dieses Modul nutzen zu können, müssen wir eine kleine Änderung am HTML-Code vornehmen. Wir erweitern das Attribut `ng-app` um den Namen unseres Moduls.

```html
<html ng-app="tutorialApp">
```

Vergesst nicht, das Skript einzubinden!

```html
<script src="app.js"></script>
```

## Scopes & Controller

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/08-controllers) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/08-controllers)

Einfach nur ein leeres Modul zu erstellen, hilft uns nicht viel weiter. Also fügen wir unseren ersten Controller hinzu. Controller werden wie alle anderen AngularJS-Komponenten auch *in* einem Modul definiert. Die Konvention hat sich eingebürgert, die Abkürzung `Ctrl` an ihren Namen anzuhängen. Den JavaScript-Code in der `app.js` ersetzen wir durch folgenden Code.

```javascript
angular.module('tutorialApp', [])
  .controller('ArticlesCtrl', function($scope){
    $scope.articles = [
      { id: 1, name: "Pizza Vegetaria", price: 5 },
      { id: 2, name: "Pizza Salami",    price: 5.5 },
      { id: 3, name: "Pizza Thunfisch", price: 6 }
    ];
  });
```

Wie wir sehen, können wir nicht nur einfache Arrays mit primitiven Datentypen sondern auch Arrays von Objekten erstellen. Dementsprechend ändern wir unsere Tabelle im HTML-Code auch leicht ab:

```html
<table class="table" ng-controller="ArticlesCtrl">
  <tr ng-repeat="article in articles | filter:search">
    <td>{{article.id}}</td>
    <td>{{article.name}}</td>
    <td>{{article.price}}</td>
  </tr>
</table>
```

An dieser Stelle lernen wir zwei neue Dinge kennen: *Controller* und *Scopes*. In einem Scope werden die Variablen gespeichert, die View- und JavaScript-Code miteinander verbinden. Mit dem *Controller* mappen wir einen Teil des DOMs zum entsprechenden JavaScript-Code.

Als wir das erste Mal `search` mit `ng-model` benutzten und es auf magische Weise `{{search}}` änderte, nachdem wir den Text im Eingabefeld änderten, musste der Wert von `search` irgendwo zwischengespeichert werden.

Dieser Ort ist ein Scope. Wir schreiben *ein* Scope, weil es mehrere geben kann. Zudem können wir sie verschachteln. Das ist aber im Moment noch nicht wichtig. Wichtig ist, dass sie einen Mechanismus besitzen, um Teile der Applikation zu informieren, wenn etwas geändert wurde.

![Scopes](angularjs-tutorial-deutsch-scopes.png)

Ein Controller kann einen neuen Scope erstellen und ihn für einen Abschnitt im DOM festlegen. Wenn wir uns das Beispiel oben anschauen, legen wir für die Tabelle einen Controller `ArticlesCtrl` fest. Im JavaScript-Code beschreiben wir den Controller näher. Dieser soll in dem Scope, unserer Vermittlungsschicht zum Template, eine Variable `articles` mit einem Array von Objekten enthalten. Deshalb können wir auch im Template über alle Artikel iterieren.


## Services

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/09-services-http) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/09-services-http)

Bisher hatten wir die Daten statisch im *Controller* definiert. Der geläufigere Fall sieht so aus, dass uns eine REST-Schnittstelle die Daten im JSON-Format liefern würde. Da dies so ein häufiger Anwendungsfall ist, besitzt AngularJS auch eine Komponente, um mit einer JSON-Schnittstelle zu kommunizieren.

Wiederverwendbare und komplexere Logik definieren wir in AngularJS mithilfe von *Services*. Das Framework bringt von Hause aus bereits viele interessante Services mit. Um also zum Beispiel eine JSON-Schnittstelle anzusprechen, verfügt AngularJS über den `$http`-Service.

> Das `$` am Anfang zeigt dabei an, dass es sich um einen Service von AngularJS handelt. Vermeidet deshalb unbedingt, eure eigenen Services mit einem `$` zu beginnen.

Da wir an dieser Stelle keinen Server implementieren möchten, erstellen wir eine Datei `articles.json` im gleichen Verzeichnis und füllen sie mit einem JSON-Objekt:

```json
[
  {"id": "1", "name": "Pizza Vegetaria", "price": 5 },
  {"id": "2", "name": "Pizza Salami",    "price": 5.5 },
  {"id": "3", "name": "Pizza Thunfisch", "price": 6 },
  {"id": "4", "name": "Aktueller Flyer", "price": 0 }
]
```

Die Daten in euren Controller zu laden ist ganz leicht. Zunächst müsst ihr `$http` als Parameter in der Funktions-Deklaration hinzufügen, um den Service überhaupt nutzen zu können:

```javascript
.controller('ArticlesCtrl', function($scope, $http){
```

Als nächstes müsst ihr die statische Zuweisung von `$scope.articles` in der `app.js` ersetzen. An dieser Stelle benutzen wir den `$http`-Service. Somit ergibt sich:

```javascript
angular.module('tutorialApp', [])
  .controller('ArticlesCtrl', function($scope, $http){
    $http.get('articles.json').then(function(articlesResponse) {
      $scope.articles = articlesResponse.data;
    });
  });
```

Was der $http-Service zurückliefert, nennen wir ein [Promise](http://en.wikipedia.org/wiki/Futures_and_promises). Promises ähneln Callbacks und können asynchrone Aufrufe stark vereinfachen.

Im derzeitigen Zustand ist unsere Tabelle beim Start der Applikation leer. Sobald also die `articles.json` vom Server erfolgreich geladen wurde, wird das Ergebnis `$scope.articles` zugewiesen. AngularJS merkt nun, dass sich Daten in `articles` befinden und aktualisiert die Tabelle.

## Service (Factory)

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/10-services-cart) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/10-services-cart)

Wir können nicht nur bestehende Services von AngularJS nutzen, sondern auch unsere Eigenen schreiben. Wenn wir einen kleinen Shop programmieren, darf natürlich der Warenkorb nicht fehlen. Wir wollen euch nur grundsätzlich zeigen, wie Services funktionieren und werden hier deshalb nur einen kleinen Teil der Funktionalität implementieren, nämlich das Hinzufügen von Artikeln und die Berechnung der Summe.

Wir können Services auf verschiedene Arten definieren. An dieser Stelle stellen wir die wahrscheinlich am häufigsten verwendete Methode vor: der [Factory-Service](/buecher/angularjs-buch/services/).

Services sind Singletons. Es existiert also immer nur eine Instanz jedes Services. Die Definition erfolgt wie beim Controller mithilfe einer Modulfunktion. In diesem Fall heißt diese Funktion factory().

Fügen wir folgenden Code nach der Moduldefinition und vor `.controller` in die `app.js` ein ([Code](https://github.com/angularjs-de/angularjs-tutorial-code/blob/gh-pages/10-services-cart/app.js)):

```javascript
angular.module('tutorialApp', [])
  .factory('Cart', function() {
    var items = [];
    return {
      getItems: function() {
        return items;
      },
      addArticle: function(article) {
        items.push(article);
      },
      sum: function() {
        return items.reduce(function(total, article) {
          return total + article.price;
        }, 0);
      }
    };
  })
```

In der `Cart`-Factory definieren wir 3 Funktionen:

  * `getItems()` gibt alle Artikel zurück.
  * `addArticle()` nimmt ein Objekt entgegen und fügt einen Artikel hinzu.
  * `sum()` summiert die Preise im Warenkorb.

Die Artikel selber halten wir in einem Array `items` vor.

Um unsere `Cart`-Factory als Service nutzen zu können, müssen wir sie dem Controller bekannt machen. Genau wie `$http` fügen wir sie nach `$scope` in die Parameterliste ein. Danach weisen wir den Service noch einer Variable auf dem Scope zu. Ansonsten könnten wir den Warenkorb nicht im Template verwenden.

```javascript
.controller('ArticlesCtrl', function($scope, $http, Cart){
  $scope.cart = Cart;
  // ... usw.
});
```

Damit können wir die Funktionen des Services jetzt nutzen. Die Artikelliste erweitern wir um eine Schaltfläche zum Hinzufügen. Dazu nutzen wir eine weitere Direktive `ng-click`.  Diese, wie der Name es vermuten lässt, reagiert auf einen Klick. Wir übergeben `ng-click` die `addArticle`-Funktion mit dem aktuellen Artikel.

```html
<td><a href class="btn btn-default btn-sm" ng-click="cart.addArticle(article);">Hinzufügen</a></td>
```

Wir können nun Artikel in den Warenkorb legen. Aber natürlich fehlt an dieser Stelle noch die Anzeige des Warenkorbes. Wir legen dazu einen zweiten Controller für unseren Warenkorb an:

```javascript
.controller('CartCtrl', function($scope, Cart){
  $scope.cart = Cart;
});
```

Mit der zugehörigen Änderung im Template:

```html
<div ng-controller="CartCtrl">
  <div ng-hide="cart.getItems().length" class="alert alert-warning">Ihr Warenkorb ist noch leer.</div>
  <table ng-show="cart.getItems().length" class="table">
    <tr ng-repeat="item in cart.getItems() track by $index">
      <td>{{item.name}}</td>
      <td>{{item.price | currency}}</td>
    </tr>
    <tr>
      <td>{{cart.getItems().length}} Artikel</td>
      <td>{{cart.sum() | currency}}</td>
      <td></td>
    </tr>
  </table>
</div>
```

> Zur Erinnerung: Der *Cart*-Service ist ein Singleton und somit gibt es insgesamt nur eine Instanz dieses Services in einer Applikation. Mithilfe von Services kommunizieren wir auch zwischen Controllern, wenn diese nicht verschachtelt, sondern Geschwister sind.

Wenn wir nun einen Artikel über die Artikelliste hinzufügen, werden die Artikel direkt im Warenkorb angezeigt. An dieser Stelle verwenden wir noch einen Trick. Normalerweise erlaubt `ng-repeat` keine Duplikate. Das umgehen wir hier, indem wir mit `track by $index` den aktuellen Index der Schleife als eindeutige Nummer setzen. Die Ausgabe der Preise hübschen wir mit dem `currency`-Filter auf.

## Animationen

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/11-animations) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/11-animations)

Um auch visuell ein wenig etwas zu bieten, werden wir uns als nächstes um Animationen in AngularJS kümmern. Dazu werden wir das Einfügen von Artikeln im Warenkorb animieren.

Animationen wurden von den AngularJS-Entwicklern in ein separates Modul mit dem Namen *ngAnimate* ausgelagert. Deshalb müssen wir dieses Modul erst einmal mithilfe eines *script*-Tags in unsere `index.html` (vor der `app.js`) einfügen. Dazu nutzen wir erneut die Version, die uns Google über sein CDN bereitstellt.

```html
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-animate.js"></script>
```

Als wir unser Module `tutorialApp` definiert hatten, ließen wir das Array für die Abhängigkeiten noch leer. In dieses Array fügen wir nun das Modul `ngAnimate` als Abhängigkeit ein, um die Animationen nutzen zu können.

```javascript
angular.module('tutorialApp', ['ngAnimate'])
```

Hiernach haben wir unsere Arbeiten auf der Code-Seite abgeschlossen und können jetzt Direktiven von AngularJS animieren. Alle weiteren Einstellungen laufen über CSS-Klassen, mit denen wir festlegen können, wann welche Animation ausgeführt werden soll.

Direktiven haben verschiedene Ereignisse, die wir animieren können. Nehmen wir als Beispiel `ng-repeat`. Wir können die Animation für ein Element festlegen, das in die Liste eingefügt, entfernt oder verschoben wird. Die Namen dieser Ereignisse lauten `ng-enter`, `ng-leave` und `ng-move` (Eine Übersicht über alle Ereignisse aller Direktiven findet ihr [hier](http://docs.angularjs.org/api/ngAnimate)).

Zum praktischen Schritt. Neue Artikel im Warenkorb wollen wir kurz aufblinken lassen. Dazu weisen wir unserer Tabellenzeile `<tr>` zuerst die CSS-Klasse `cart-item` zu. In einer zusätzlichen CSS-Datei `style.css` müssen wir lediglich noch zwei zusätzliche CSS-Klassen `.cart-item.ng-enter` und `.cart-item.ng-enter-active` definieren:

```css
.cart-item.ng-enter {
  -webkit-transition:0.5s linear all;
  transition:0.5s linear all;
  background-color: yellow;
}
.cart-item.ng-enter-active {
  background-color: white;
}
```

Die zwei CSS-Klassen bestimmen Start- und Endzustand. In `ng-enter` werden die Startfarbe *gelb* und die CSS3-Transition festgelegt. Diese Klasse wird zuerst hinzugefügt. Unmittelbar danach wird die zweite Klasse mit dem Endzustand der Farbe *weiß* hinzugefügt. Ist die Animation durchgelaufen, werden beide entfernt. Im Folgenden sehen wir graphisch, was passiert:

![Animation](angularjs-tutorial-deutsch-ng-animate.png)

Mit minimalem Aufwand könnt ihr dadurch sehr schöne Effekte erzielen. AngularJS kümmert sich dabei vollständig um das richtige Timing. Animationen über JavaScript-Frameworks sind auch möglich, sprengen aber den Rahmen dieses Tutorials.

## Eigene Direktiven

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/12-directives) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/12-directives)

Wir haben im Laufe des Tutorials einige Direktiven von AngularJS kennengelernt. Wir können aber auch eigene Direktiven schreiben. Direktiven eignen sich besonders gut für Funktionalitäten, die man wiederverwenden möchte.

Beispielsweise werden wir die Preisausgabe etwas schöner gestalten. Statt einfach *0* auszugeben, machen wir es besser und geben *kostenlos*  aus. Die Direktiven bisher, wie `ng-app` oder `ng-repeat`, waren nur Attribute. Wir können aber auch Tags benutzen. Schön wäre es, etwas in der Art zu haben:

  <price value="article.price" />

Wenn wir dies mit AngularJS umsetzen möchten, können wir dazu ganz einfach eine Direktive schreiben in Form eines neuen Tags `<price />`.

```javascript
.directive('price', function(){
  return {
    restrict: 'E',
    scope: {
      value: '='
    },
    template: '<span ng-show="value == 0">kostenlos</span>' +
      '<span ng-show="value > 0">{{value | currency}}</span>'
  }
})
```

Gehen wir die einzelnen Bestandteile der Direktive durch:

Eine Direktive erstellen wir ganz offensichtlich mit dem Keyword `directive`. Diese wird wieder in einem Modul erstellt. Die gleiche Methodik kennen wir bereits von *Controllern* und *Services*. Der Direktive übergeben wir als Parameter einen Namen und eine Funktion. Auch hier können der Funktion als Parameter wieder andere Services hinzugefügt werden. Diese Funktion gibt ein Objekt zurück, mit dem wir die Direktive konfigurieren können. Im Folgenden gehen wir die Konfigurationsparameter durch.

### restrict

Mit *restrict* legen wir die Art der Direktive fest. D.h. wird die Direktive durch Tag, Attribut oder Klasse aufgerufen. E steht in dem Fall für Element und meint Tag. Hier wären Beispiele für die anderen Möglichkeiten:

```html
<price value="article.price" /><!-- E für Element -->
<span price value="article.price"> <!-- A für Attribute -->
<span value="article.price" class="price"><!-- C für Class -->
```

### scope

Wenn wir Direktiven erstellen, machen wir das normalerweise mit der Idee, diese später wieder zu verwenden. Würden wir ein Template erstellen, in dem fest `article.price` stehen würde, könnten wir dieses Template sehr schlecht wieder verwenden. Deshalb definieren wir eine Schnittstelle, die den inneren Teil von der Umgebung entkoppelt. Da in AngularJS alles über Scopes läuft, isolieren wir sie hiermit und können so eigenständige Komponenten bauen.

Die Option *scope* macht genau dies - Scopes isolieren. In diesem Fall haben wir `value: '='`, was bedeutet, wir geben an den inneren Teil nur weiter, was als Attribut in `value` steht. Das `=` gibt an, wie diese Verbindung hergestellt werden soll. Manchmal möchten wir nur die Werte von außen nach innen lassen. Manchmal möchten wir die Werte auch innerhalb der Komponente verändern können.

In diesem Fall stellt das `=` die Zwei-Wege-Datenbindung wieder her. Wir haben `value="article.price"` gesetzt. Somit geben wir die Zwei-Wege-Datenbindung an die Variable `value` intern weiter und könnten auch `article.price` innerhalb der Direktive verändern.

### template

Im Template bringen wir den HTML-Code unter, den wir sonst normalerweise in unserer HTML-Seite direkt einfügen würden. Durch `scope: { ... }` haben wir erstmal keinen Zugriff auf die Umgebung mehr. Auf den Preis in Form von `{{value}}` können wir nur zugreifen, weil wir die Zwei-Wege-Datenbindung nach außen wieder hergestellt haben.

Bei komplexeren Templates kann der HTML-Code auch in eine eigene Datei ausgelagert werden. Dazu schreiben wir ihn in eine beliebige externe Datei, z.B. *price.tpl.html* und würden dann statt `template: '...'`, `templateUrl: 'price.tpl.html'` schreiben.

## Routen

> Link zum [Code](https://github.com/angularjs-de/angularjs-tutorial-code/tree/gh-pages/13-routes-final) / [Demo](http://angularjs-de.github.io/angularjs-tutorial-code/13-routes-final)

Bisher bestand bei uns alles nur aus einer einzigen Seite. Wenn wir eine richtige Web-Applikation bauen möchten, gehört natürlich mehr dazu. Insbesondere möchte man oft definierte Anwendungszustände über eine URL erreichbar machen. Für die sogenannten Routen bringt AngularJS deswegen ebenfalls ein eigenes Modul mit.

Wir laden zuerst das Extra-Modul und fügen es in unsere `index.html` ein (oberhalb von `app.js`):

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-route.js"></script>
```

Wie bei den Animationen müssen wie das Modul unserer Applikation bekannt machen.

```javascript
angular.module('tutorialApp', ['ngAnimate', 'ngRoute'])
```

Als nächstes kopieren wir alles, was innerhalb der Klasse `.container` steht in eine neue Datei *articles.html* und ersetzen den Inhalt durch:

```html
<p class="well">
  <a href="#/">Start</a> | <a href="#/about">Über</a>
</p>
<div ng-view></div>
```

`ng-view` ist der Container für alle Unterseiten, die Teil unserer Anwendung sind. Damit werden nur noch Seiten-Inhalte nachgeladen, ohne Skript- und CSS-Dateien erneut vom Server zu holen. AngularJS löst zudem bei einem Seitenwechsel die Scopes der aktuellen Seite auf. Dies sorgt dafür, dass der Speicher nicht unnötig belegt wird.

Auch wenn wir jetzt Seiten laden könnten, brauchen wir noch eine Verknüpfung zu URLs. Diese können wir in einem Konfigurationsblock von AngularJS angeben. Die `config()`-Blöcke werden einmal am Anfang der Applikation ausgewertet. Um die Routen in diesem zu konfigurieren, müssen wir den `$routeProvider` in dessen Funktions-Parameter übergeben.

```javascript
.config(function($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: 'articles.html' })
    .when('/about', { template: 'Über unsere Pizzeria' })
    .otherwise({ redirectTo: '/' });
})
```

Der `$routeProvider` hat zwei Methoden: `.when` und `.otherwise`. Mit when könnt ihr die Route, inkl. Konfigurations-Objekt übergeben. Wie ihr seht, könnt ihr *template* oder *templateUrl* wie in den Direktiven verwenden. Mit `.otherwise` könnt ihr festlegen, was passiert, wenn keine der Routen ausgewählt wurde.

Über die Links ganz oben könnt ihr nun zwischen zwei Seiten wechseln.

## Wie geht es weiter?

Dies ist ein Tutorial zum schnellen Starten mit AngularJS. Natürlich ist dabei nicht genug Zeit, um auf alles intensiv einzugehen und es im Detail zu erklären. Einige coole Dinge, die wir an dieser Stelle noch nicht behandelt haben, sind z.B.:

* Promises
* Lokalisierung
* Dependency Injection
* Formular-Validierung
* Unit- und E2E-Tests


<hr>
<div class="text-center">
  <div class="h3">Hat dir das Tutorial geholfen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p> Maximaler Lernerfolg um direkt in deinem Projekt durchzustarten? Überpring die "Anfängerfehler" und nutze lieber unsere
        jahrelange Erfahrung. Komm in unsere <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-buttom">Angular und TypeScript Schulungen</a>.
        Hier lernst du die Konzepte, Features und Fallstricke des Frameworks und kannst uns direkt spezifisch zu Herrausforderungen
        in deinem nächsten Projekt zu rat ziehen.
      </p>
      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-buttom">
          <button class="btn btn-danger">Jetzt weiter lernen</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="medium_Screen-Shot-2017-03-19-at-11.52.54.png" alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>
