---
title: "Angular in der Browser Konsole - Services"
description: "Ihr wollt eure AngularJS Anwendung in der Browserkonsole analysieren und auf Services zugreifen? Dieser Artikel zeigt euch wie ihr mit dem $injector an die Services kommt."
author: "Tilman Potthof"
slug: "angularjs-access-services-via-console"
published_at: 2014-11-03 05:28:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-access-services-via-console.jpg"
---

Als ich Angular entdeckt habe war ich davon begeistert, wie leicht sich eine Anwendung durch Dependency Injection in unabhängige und klar getrennte Komponenten aufteilen lässt.
Dadurch erreicht man eine saubere Kapselung und verhindert, dass Variablen im globalen Namensraum landen.
Diese positive Eigenschaft hat jedoch zur Folge, dass man auf seine Services und Objekte nicht einfach von der Browser Konsole aus zugreifen kann, falls man eine Angular Anwendung zum Debuggen oder Lernen interaktiv manipulieren möchte.
Aber bevor es richtig losgeht, ein paar Worte dazu, warum die Browser Konsole so ein hilfreiches Werkzeug ist.

![Browser Console Code Complete](http://blog.programmingisart.com/wp-content/uploads/2014/10/browser-console-angular-code-complete-1024x550.png)

## Experimentieren mit Technologien

Dokumentation ist unverzichtbar und kann sehr wertvolle Informationen liefern, aber wenn man sich mit einer Technologie vertraut machen will, dann muss man sie ausprobieren und sich die Hände schmutzig machen.
Dies ist der einzige Weg, um zu überprüfen, ob man wirklich verstanden hat, wie sie zu benutzen ist und ob sie sich so verhält, wie in der Dokumentation beschrieben wird.
In anderen Fällen stößt man beim Ausprobieren auf Grenzfälle, die einen zwingen wieder nachzuschlagen und zu forschen, selbst wenn man dafür in den Quellcode schauen muss.
Mit kleinen Experimenten kann man so seine Annahmen über eine Technologie Schritt für Schritt überprüfen und immer weiter dazu lernen.

Wenn man gerne mit Frameworks und Bibliotheken experimentiert, dann ist es wichtig, dass man seine Annahmen in kurzen schnellen Schritten überprüfen kann, sodass man fokussiert bleibt und nicht das Interesse verliert.
Daher ist es so spannend, wenn man eine Anwendung direkt in der Browser Konsole manipulieren kann, statt auf das Neuladen der Seite zu warten oder zwischen Browser und Editor wechseln zu müssen.

## Experimentieren mit Angular

Obwohl sich mit Angular alles sauber kapseln lässt, ist es trotzdem möglich auf die Elemente in der Anwendung zuzugreifen.
Für jede der typischen Angular Komponenten (Filter, Services, Direktiven und Scopes) gibt es Möglichkeiten sie zu manipulieren.
In diesem Artikel beschränken wir uns auf Services.

***Hinweis zur Version:*** *Alle Beispiele wurden mit Angular 1.2.22 getestet, aber da ich auch viel mit 1.0.8 arbeite, sollten sie auch damit funktionieren.*

## Unser Experimentierkasten

* Ein moderner Browser mit einer JavaScript Konsole
   * [Chrome – Öffnen der Konsole](https://developers.google.com/web/tools/chrome-devtools/console/#opening-the-console)
   * [Firefox – Öffnen der Konsole](https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Opening_the_Web_Console)
* Eine Angular Anwendung zum experimentieren
   * [Angular TodoMVC](http://todomvc.com/examples/angularjs/#/)
   * Irgendeine andere Angular Anwendung

## Services Laden

Jetzt haben wir alles zusammen, um loszulegen.
Man muss nur die [TodoMVC](http://todomvc.com/examples/angularjs/#/) Anwendung öffnen, sowie die Browser Konsole auf der Seite.
Normalerweise werden Angular Services für andere Komponenten per Dependency Injection bereitgestellt.
In der Konsole müssen wir dies manuell erreichen.
Die Funktion `angular.injector()` erwartet ein Array von Modulnamen und gibt einen `injector` zurück, mit dem man Services über ihnen Namen laden kann.

```javascript
// Erzeugen des Injectors
var $injector = angular.injector(["ng"]);
var $http = $injector.get("$http")
```

Das geht auch als Einzeiler.

```javascript
// Laden des Service als Einzeiler
var $http = angular.injector(["ng"]).get("$http");
```

Jetzt kann man den `http` Service verwenden und ausprobieren, wie er funktioniert.
In der Dokumentation ist die `get()`-Methode beschrieben, die einen `HttpPromise` zurückgibt und mit dessen `then()`-Methode kann man eine Server-Antwort verarbeiten.
Um das Ergebnis zu überprüfen, können wir `console.log()` zusammen mit dem `arguments` Objekt ([MDN – arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)) verwenden.

```javascript
$http.get("/").then(function() {
  console.log(arguments);
});
```

Als Ausgabe erhalten wir ein Array mit dem Serverergebnis als Objekt.
Mit der Konsole können wir uns den Inhalt des Objekts ausklappen und einfach analysieren.

![Browser Console Http Result](http://blog.programmingisart.com/wp-content/uploads/2014/10/browser-console-http-result-1024x435.png)


## Manipulieren von Daten

Natürlich kann man auch eigene Services laden. In der TodoMVC Anwendung können wir dafür den `todoStorage` Service nehmen. Als Abhängigkeit geben wir im `injector()` nicht `ng`, sondern `todomvc`an. Mit dem zurückgegebenen Service können wir können wir Todos laden oder neue Einträge hinzufügen.

```javascript
var todoStorage = angular.injector(["todomvc"]).get("todoStorage");
var todos = todoStorage.get();
todos.push({
  title: "Buy some chickpeas",
  completed: false
});
todoStorage.put(todos);
```

Leider kann man keine Änderung in der Anzeige feststellen.
Das liegt daran, dass wir unsere Änderung außerhalb des Aktualisierungszyklus (`$digest()` cycle) gemacht haben.
Dies ist der Mechanismus hinter dem bidirektionalen (two-way) Databinding und wenn eine Änderung außerhalb passiert, dann wird sie nicht registriert.
Man kann diese Überprüfung über Aktionen manuell auslösen, die von Angular registriert werden, wie z.B das Wechseln zwischen den Todo Filtern *Active* und *Inactive*.

![Todo MVC Active State](http://blog.programmingisart.com/wp-content/uploads/2014/10/todo-mvc-active-state-1024x377.png)

Wie man den Aktualisierungszyklus auch direkt von der Konsole auslösen kann, wird in einem folgenden Artikel gezeigt.


## Probleme mit Abhängigkeiten

Die beiden Beispiele mit dem `$http`- und dem `todoStorage`-Service waren beide recht einfach und unproblematisch. Wenn man aber Services laden will, die von anderen Services abhängen, muss man beachten, dass alle abhängigen Module als Parameter in die `angular.injector()`-Funktion übergeben werden. Hier ein kurzes Beispiel, das zu einem Fehler führt.

```javascript
angular.module("foo",[]).factory("fooService", function($http) {
  return {
    getFoo: function() {
      // just returns a promise
      return $http.get("/");
    }
  }
});
var fooService = angular.injector(["foo"]).get("fooService");
```

Der Code-Schnipsel führt zu folgendem Fehler.

`Uncaught Error: [$injector:unpr] Unknown provider: $httpProvider <- $http <- fooService`

Das Problem ist leicht zu beheben, wenn man das Modul für den `$http`-Service hinzufügt (*Tipp*: `ng`) und es zu dem Array von abhängigen Modulen hinzufügt.

```javascript
var fooService = angular.injector(["ng", "foo"]).get("fooService");
```

## Probleme mit $location

Ein anderes aber schwerer zu lösendes Problem macht der `$location` Service. Das Gleiche gilt für Services, die vom `$location`-Service abhängen.

```javascript
var $location = angular.injector(["ng"]).get("$location");
```

Diese Zeile funktioniert leider nicht, sondern erzeugt folgenden Fehler.

`Uncaught Error: [$injector:unpr] Unknown provider: $rootElementProvider <- $rootElement <- $location`

Das Problem lässt sich leider nicht durch ein zusätzliches Modul lösen. Das benötigte `$rootElement` ist nur im Kontext einer Anwendung verfügbar, die mit `ng-app` mit dem HTML verknüpft wurde. Aber mit einigen Tricks ist es auch möglich, auf den `injector` einer existierenden Anwendung zuzugreifen. Dafür können wir wieder die TodoMVC Anwendung verwenden.

```javascript
var domElement = document.querySelector("[ng-app]");
var $injector = angular.element(domElement).injector();
var $location = $injector.get("$location");
```

Jetzt kann man ebenfalls mit dem `$location` Service experimentieren, aber auch hier gilt, dass die Änderungen keine Auswirkung haben, solange der Aktualisierungszyklus nicht ausgelöst wird.

## Ist das nicht ziemlich unsauber?

Ja, und meiner Meinung nach sollten die gezeigten dynamischen Manipulationen niemals im Produktionscode landen, es sei denn man entwickelt ein Werkzeug für das dynamische Analysieren von Angular Anwendungen. Die gezeigten Tricks sind nur sinnvoll zum Debuggen oder besseren Verstehen einer Anwendung.

## Selbst ausprobieren!

Viel Spaß beim Testen, Auseinandernehmen oder Zerstören eurer Angular Anwendung. Falls ihr neue Sachen herausfindet, lasst es uns wissen.
