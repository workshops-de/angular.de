---
title: "Angular in der Browser Konsole Teil 2 - Scopes"
description: "Wie komme ich aus der Browserconsole an einen bestimmten Scope und welche Möglichkeiten bietet mir dieses Objekt? Wir geben euch alle Informationen die ihr braucht."
author: "Tilman Potthof"
slug: "angularjs-access-scope-via-console"
published_at: 2014-12-03 07:57:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-access-scope-via-console.jpg"
---

Dieser Artikel ist eine Fortsetzung von ["Angular in der Browser Konsole: Services"](/artikel/angularjs-access-services-via-console/), in dem erklärt wurde wie man auf Angular Services in der Browser Konsole zugreift und eine Anwendung interaktiv manipulieren kann.
Allerdings konnte man auch sehen, dass Änderungen an den Model-Objekten nicht direkt zu einer Aktualisierung der Anzeige geführt haben, da diese Änderungen außerhalb des `$digest()` Aktualierungszyklus vorgenommen wurden.
Um trotzdem die Änderungen zu sehen, haben wir diesen Mechanismus von Hand ausgelöst, in dem wir andere Elemente angeklickt haben, die ebenfalls eine Aktualisierung bewirken.
In diesem Artikel zeige ich euch, wie ihr das Scope-Objekt direkt manipulieren könnt und ihr die `$digest()` Aktualisierung von der Konsole aus auslöst.

*Achtung: Falls ihr euch fragt, warum man als klar-denkender Mensch Angular Scopes interaktiv und von außerhalb der Anwendung manipulieren möchte, schaut noch mal in den ersten Artikel in dem die Motivation genauer erklärt ist.*

## Unser Experimentierkasten

Wir verwenden wieder die gleichen Werkzeuge wie im ersten Teil.
Hier noch mal die Übersicht:

* Ein moderner Browser mit einer JavaScript Konsole
   * [Chrome – Öffnen der Konsole](https://developers.google.com/web/tools/chrome-devtools/console/#opening_the_console)
   * [Firefox – Öffnen der Konsole](https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Opening_the_Web_Console)
* Eine Angular Anwendung zum experimentieren
   * [Angular TodoMVC](http://todomvc.com/examples/angularjs/#/)
   * Irgendeine andere Angular Anwendung

## Zugriff auf Scopes

Scope-Objekte in Angular sind dazu da, um Variablen für das Template-Rendering bereitzuhalten.
Nur Objekte, die einem Scope-Objekt hinzugefügt werden, können in den Template-Tags verwendet werden.
Jedes Element innerhalb einer Angular-Anwendung braucht also einen Scope, um angezeigt zu werden.
Daher kann man auf die verschiedenen Scopes über die Elemente zugreifen.
Zuerst müssen wir ein Element zum Analysieren aussuchen.
Dazu muss man nur einen Kontext-Klick auf das Todo-Eingabefeld machen und die Option "Element untersuchen" auswählen.

![TodoMVC](todomvc-inspect-element.png)

Jetzt können wir die aktuellen Elemente auf der Seite sehen.
Der Body-Tag hat das `ng-app` Attribut und eine Klasse `ng-scope`. Jedes Element, das einen eigenen Scope hat, erhält auch die CSS-Klasse `ng-scope`, um das Debuggen zu vereinfachen.
Die einzige Ausnahme sind direkte Kind-Elemente eines `ng-view` Elements.
Im Beispiel teilt sich sowohl das Section- als auch das Footer-Element einen Scope mit dem `ng-view` Element, aber alle haben die `ng-scope` Klasse.

![Chrome Element Ansicht](todomvc-html-structure.png)

Wie man sehen kann, hat das Section-Element die ID `todoapp`, mit der wir es auswählen können.
Häufig nimmt man dafür jQuery, und viele Angular Anwendungen werden zusammen mit jQuery verwendet, allerdings funktioniert Angular auch ohne jQuery.
Aus diesem Grund hat die originale TodoMVC Anwendung kein jQuery und ich zeige euch den Zugriff mit und ohne jQuery.

```javascript
var todoappDomElement = document.querySelector("#todoapp");
var todoappAngularElement = angular.element(todoappDomElement);
var $scope = todoappAngularElement.scope();
```

Jetzt noch mal mit jQuery. Das Beispiel funktioniert mit meiner selbst-gehosteten Variante von `TodoMVC`, da ich für diesen Artikel jQuery eingebunden habe.

```javascript
var $todoappElement = jQuery("#todoapp");
var $scope = $todoappElement.scope();
```


Das Ganze noch mal als Einzeiler.

```javascript
// native
var $scope = angular.element(document.querySelector("#todoapp")).scope();

// jQuery
var $scopeFromJQuery = jQuery("#todoapp").scope();
```

### Die $0 Variable

Die Chrome [Command Line API](https://developers.google.com/web/tools/chrome-devtools/console/command-line-reference) bietet einen weiteren sehr einfachen Weg an, auf Elemente zuzugreifen.
Durch die Variable `$0` erhält man Zugriff auf das Element, das man in der Element-Anzeige gerade ausgewählt hat.
Um den dazugehörigen Scope zu laden kann man `angular.element($0).scope()` ähnlich zu den Beispielen oben verwenden.

 ![Der $0 Trick in der Konsole](chrome-dev-tools-dollar-zero-trick.png)

## Scope Attribute

Das so erhaltene Scope-Objekt kann jetzt analysiert und manipuliert werden.
Man kann es einfach in der Browser Konsole ausgeben und sich die innere Struktur genauer anschauen.
Dabei findet man die Todo-Liste, die wir schon im letzten Artikel manipuliert haben, als `$scope.todos`.

![Scope Attributes](todomvc-scope-introspection.png)

## Scope Attribute mit $ und $$

Neben allen Attributen die vom `TodoCtrl` erzeugt wurden, findet man auch einige Attribute die das Präfix `$` oder `$$` haben.
Das Attribute `$parent` ist eventuell schon bekannt.
Es hält eine Verknüpfung zum – Überraschung – Eltern-Scope.
Wenn man der Kette von Eltern-Scopes immer weiter folgt, dann wird man einen Scope mit `$parent: null` finden und man hat den `$rootScope` erreicht, der von der `ng-app` Direktive erzeugt wurde.
Die beiden anderen dokumentierten Attribute sind `$id` und `$root`, genauso wie alle Methoden, die mit einem `$` anfangen ([$rootScope.Scope documentation](https://code.angularjs.org/1.2.22/docs/api/ng/type/$rootScope.Scope)).
Alle Attribute, die mit `$$` beginnen, sind private undokumentierte Attribute und können sich in zukünftigen Versionen ändern, ohne dass darüber informiert wird.

### Beobachter-Funktionen

Auch wenn man diese privaten Attribute nicht für seine Anwendungen verwenden sollte, kann man in der Konsole bedenkenlos mit ihnen experimentieren.
Ein schönes Beispiel ist das `$$watchers` Array, das Informationen über überwachte Expressions und Funktionen speichert.
Die einzelnen Watcher werden entweder von der `$scope.$watch` Methode (ebenfalls `$scope.$watchCollection` seit 1.2.x) erzeugt oder von Template Expressions.

![Scope Watchers](scope-watchers.png)

Man kann einfach überprüfen, wie die Watcher von Angular verwendet werden, indem man einen Watcher hinzufügt und danach die Länge des Watcher-Arrays überprüft.

```javascript
console.log("$scope.$$watchers.length: " + $scope.$$watchers.length);
$scope.$watchCollection("todos", function () {
  console.log(arguments);
});
console.log("$scope.$$watchers.length: " + $scope.$$watchers.length);
```

Als weiteres, aber etwas destruktiveres Experiment, kann man die Watcher mit einem leeren Array ersetzen.
Danach wird nichts mehr in dem betroffenen Element aktualisiert.

```javascript
$scope.$$watchers = [];
```

### Zählen der `$$watchers`

Kürzlich habe ich ein interessantes Beispiel gefunden, in dem das `$$watchers` Array dazu verwendet wird, alle Watcher in einer Anwendung zu zählen (Quelle: [“The Top 10 Mistakes AngularJS Developers Make”](http://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make#7-too-many-watchers)).
Ich habe das Original-Beispiel noch etwas aufgeräumt und funktional umgestaltet.
Auf jeden Fall bekommt man einen guten Eindruck, wie man die internen Attribute zur tieferen Analyse einer Anwendung einsetzen kann.

```javascript
// fetch all elements with ng-scope class
var scopeElements = Array.prototype.slice.apply(document.querySelectorAll(".ng-scope"));
// map elements to scopes
var scopes = scopeElements.map(function (element) {
  return angular.element(element).scope();
});
// filter duplicated scopes created by ng-view
var scopesById = {};
var uniqueScopes = [];
scopes.forEach(function (scope) {
  if (scopesById[scope.$id] === undefined) {
    scopesById[scope.$id] = scope;
    uniqueScopes.push(scope);
  }
});
// map uniqueScopes to watchers
var watchers = uniqueScopes.map(function (scope) {
  return scope.$$watchers;
});
// extract the length
var watchersLengths = watchers.map(function (watcher) {
  return watcher.length;
})
// sum up the length with reduce
var watchersCount = watchersLengths.reduce(function(a,b) {
  return a + b;
});
console.log("watchersCount: " + watchersCount);
```

## Manipulieren des Scopes

Nachdem wir genau wissen, wie wir auf das Scope-Objekt zugreifen können, machen wir uns ans Manipulieren.
Zum Beispiel können wir das Model verändern, das mit dem Todo-Eingabefeld verbunden ist `$scope.newTodo`.

```javascript
var $scope = angular.element(document.querySelector("#todoapp")).scope();
$scope.newTodo = "Write a blog post";
```

Wie im letzten Artikel haben wir das Model geändert, aber können immer noch keine Änderung in der Anzeige feststellen.
Die Änderung hat wieder außerhalb des `$digest()` Aktualisierungszyklus stattgefunden, aber da wir Zugriff auf das Scope-Objekt haben können wir jetzt die `$apply()` Methode verwenden, um die Aktualisierung manuell zu starten.

```javascript
$scope.$apply();
```

Damit erreichen wir dann die gewünschte Aktualisierung der Anzeige.

![Aktualisiertes Eingabefeld](todomvc-new-todo.png)

Wir können über den Scope ebenfalls den neuen Todo-Eintrag der Liste hinzufügen.

```javascript
$scope.addTodo();
$scope.$apply();
```

![Hinzugefügtes Todo](todomvc-added-todo.png)


### Anmerkung zu `$apply`

Die `$apply` Methode kann auch sinnvoll in einer Anwendung verwendet werden, falls Änderungen außerhalb des Aktualisierungszyklus passieren – z.B. wenn man jQuery-Plugins einsetzt.
Man sollte dabei aber zwei Dinge im Hinterkopf behalten.
Ersten gibt es oft einen besseren Weg innerhalb des Aktualisierungszyklus, so zum Beispiel den `$timeout()` Service, der die native Methode `setTimeout()` ersetzt.
Zweitens sorgt die `$apply()` Methode dafür, dass alle Scope-Objekte angefangen beim Root-Scope auf Änderungen überprüft werden, was eine teuere Operation werden kann, je nach Anzahl und Komplexität der Watcher.

## Alte Scope-Objekte

Scope-Objekte haben gegebenenfalls eine begrenzte Lebenszeit und können ungültig werden, wenn sich die Anzeige ändert.
Auch wenn man weiterhin Zugriff auf eine bereits geladene `$scope` Variable hat und man sie immer noch manipulieren kann, führt die `$apply` Methode in so einem Fall zu keiner Änderung.
Welche Scopes noch auf der Seite vorhanden sind, kann man mit folgender Funktion über die IDs recht gut unterscheiden.

```javascript
function scopeIds() {
  var scopeElements = Array.prototype.slice.apply(document.querySelectorAll(".ng-scope"));
  return scopeElements.map(function (element) {
  return angular.element(element).scope().$id;
  });
}
console.log(scopeIds());
```

Wenn man alle Todos löscht und die Seite neu lädt, dann sollte `scopeIds()` folgende IDs ausgeben.

```javascript
["001", "002", "002", "002"]
```

Zum einen hat man den Root-Scope (`"001"`) und den Scope, der von `ng-view` erzeugt wird (`"002"`), wobei dieser auch noch für die Kind-Elemente (`section#todoapp`, `footer#info`) auftaucht.
Wenn man jetzt ein Todo hinzufügt, dann erzeugt `ng-repeat` einen weiteren Scope (`"003"`).

```javascript
["001", "002", "002", "003", "002"]
```

Anschließend wählen wir den Todo-Filter *Active* aus und erhalten eine andere Ausgabe für `scopeIds()`, da wir einen View-Wechsel ausgelöst haben und der `ng-view` Scope (`"004"`) und alle seine Kind-Elemente (`"005"`) neu erzeugt wurden.

```javascript
["001", "004", "004", "005", "004"]
```

## Fazit

Scopes sind ein Herzstück von Angular und zum Debuggen und Analysieren praktischerweise komplett zugreifbar.
Allerdings eröffnen diese Techniken auch vielfältige Möglichkeiten, um echte Anwendungen zu manipulieren oder einfach nur schwer nachvollziehbaren Code zu schreiben.

Falls für euch noch Fragen offengeblieben sind, oder Ihr coole Ideen habt, was man mit Scopes noch für Experimente machen kann, wir freuen uns über jeden Kommentar.
