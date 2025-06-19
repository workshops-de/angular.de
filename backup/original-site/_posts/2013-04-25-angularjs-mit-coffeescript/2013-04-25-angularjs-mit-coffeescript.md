---
title: "CoffeeScript mit AngularJS nutzen"
description: "Lernt die Programmierung von AngularJS mit CoffeeScript. Schreibt übersichtlichen und sauberen Quelltext, der einfach in JavaScript umgewandelt werden kann."
author: "Sascha Brink"
published_at: 2013-04-25 22:17:46.000000Z
categories: "angularjs"
---

AngularJS kann nicht eleganter werden? Kein Problem, denken viele. Schon falsch. [CoffeeScript](http://coffeescript.org) schafft's.

[Rails](http://rubyonrails.org) als technischer Vorreiter für viele andere Frameworks setzt CoffeeScript schon seit 2011 ein - und das zu Recht. Vorteile von CoffeeScript sind:

*   CoffeeScript kompiliert zu gut lesbarem JavaScript
*   CoffeeScript korrigiert viele Designfehler von JavaScript
*   Die Syntax folgt festen Vorgaben (Glaubenskriege, ob die {-Klammer links oder rechts steht, entfallen)
*   Viele Klammern können entfallen, was das Rauschen verringert. Deshalb können wir Quelltext in CoffeeScript schneller erfassen

<!--more-->

## Was wir im Zusammenspiel beachten müssen

Wir müssen also etwas beachten? - Ja. Die meisten Beispiele, die wir von AngularJS kennen, benutzen den globalen Namespace und provozieren einige Probleme. CoffeeScript nutzt das Konzept der [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (Immediately Invoked Function Expression), um den geschriebenen Quelltext in eine eigene Funktion zu hüllen und somit den globalen Namespace sauber zu halten. Das heißt, wenn wir einen Controller definieren, wie wir es kennen:

```coffeescript
MainController = ($scope, Names) ->
```

ergibt das folgenden JavaScript-Code:

```javascript
(function() {
  var MainController;
  MainController = function($scope, Names) {};
}).call(this);
```

MainController ist keine globale Variable, wie wir es gewohnt sind. Das Problem ist auf zwei Arten lösbar:

### Lösung 1: Global

Der einfachste Weg ist es natürlich, auf andere Weise eine globale Variable zu erstellen. CoffeeScript macht dies schwer, aber nicht unmöglich. Global ist alles, was man explizit window zuweist, also window.MainController. Das sieht nicht ansprechend aus und wirkt falsch, ja. Wir haben noch eine Alternative. Um den gleichen Effekt zu erzielen, können wir auch @ benutzen. Beispiel:

```coffeescript
app = angular.module "TestApp", []

app.value "Names", ["Sascha", "Robin", "Phil"]

@MainController = ($scope, Names) ->
  $scope.names = Names
```

#### Wieso funktioniert das?

Das `@`-Zeichen übersetzt CoffeeScript in `this` von JavaScript. Die IIFE erhält als Wert `this`, was `window` entspricht. Der erste Parameter von `call(...)` definiert den sogenannten Receiver der Funktion, also die Belegung von `this` innerhalb der Funktion.

Verwirrend? Nochmal langsam. `call` führt die Funktion aus. Der erste Parameter ist `this`, was auf oberster Ebene in JavaScript `window` ist. Der Aufruf ist also gleichbedeutend mit:

```javascript
(function() {
  //...
}).call(window);
```

Der erste Parameter von `call` (in diesem Fall `window`) gibt an, welchen Wert `this` innerhalb der Funktion zugewiesen bekommt.

```javascript
(function() {
  // hier ist this = window
}).call(window);
```


Schon besser, aber...! Wer den globalen Namespace nicht verschmutzen möchte, geht folgendermaßen vor:

### Lösung 2: Lokal

AngularJS bietet eine Methode an, um einen Controller explizit einem Modul zu registrieren:

```coffeescript
app = angular.module "TestApp", []

app.value "Names", ["Sascha", "Robin", "Phil"]

app.controller 'MainController', ($scope, Names) ->
  $scope.names = Names
```

Lösung 2 solltest du natürlich Lösung 1 vorziehen. Der globale Namespace bleibt dadurch sauber und du provozierst keine Konflikte mit andere Modulen, die gleichnamige Controller enthalten.

## Services und Klassen

Wer sich schon immer gefragt hat, wann es günstig ist, *service* statt *factory* in AngularJS zu benutzen, bekommt hier die Antwort.

CoffeeScript bildet Klassen in JavaScript nach. Objekte von Klassen werden in CoffeeScript mit `new` instanziiert, AngularJS ruft Funktionen von `service` mit `new` auf - perfekte Kombination, genau! Somit können wir `service` direkt eine Klasse von CoffeeScript übergeben übergeben. Ein Beispiel dazu:

```coffeescript
app = angular.module "TestApp", []

class People
  names: ["Sascha", "Robin", "Phil"]

# app.value "NameService", new People
# app.factory "NameService", -> new People
app.service "NameService", People

app.controller 'MainController', ($scope, NameService) ->
  $scope.names = NameService.names
```
