---
title: "Wie die Controller-As-Syntax Fehler vermeidet"
description: "Lerne, was die Controller-As-Syntax in AngularJS ist und wie du damit Fehler vermeidest. Mehr im Artikel!"
author: "Tilman Potthof"
published_at: 2015-01-05 09:01:00.000000Z
categories: "angularjs"
---

Dieser Artikel zeigt euch, wie man Variablen aus unterschiedlichen Controllern in Templates besser unterscheiden kann.

In AngularJS sind Controller die Komponenten, die Daten mit einem Template verbinden.
Da man beliebig viele Controller verwenden und verschachteln kann, kommt es vor, dass es Chaos mit den Variablennamen gibt.
Üblicherweise macht man eine Variable im Template verfügbar, indem man sie dem `$scope` Objekt hinzufügt.

```javascript
angular.module('myApp').controller('ScopeController', function ($scope) {
  $scope.headline = 'Basis Controller';
});
```

Seit Angular 1.2 gibt es einen weiteren Mechanismus, der ohne das `$scope` Objekt auskommt.
Stattdessen verwendet man die `this` Referenz in der Controller-Funktion.

```javascript
angular.module('myApp').controller('BaseController', function () {
  this.headline = 'Basis Controller';
});
```
Anschließend kann man dem Controller im Template über die `ng-controller` Direktive einen Namen geben.

```html
<div ng-controller="BaseController as base">
  <h4>{{ base.headline }}</h4>
</div>
```

Tatsächlich geben wir nicht dem Controller einen Namen – der hat ja schon einen – sondern der konkreten Instanz des Controllers.
An dieser Stelle funktioniert der Controller ähnlich, wie der Konstruktor einer JavaScript-Klasse, den man mit `new` aufruft.

```javascript
function BaseController() {
  this.headline = 'Basis Controller';
}
var base = new BaseController();
```

## Einsatz bei verschachtelten Controllern

Wenn man mehrere Controller verschachtelt, kann man über Controller-As-Syntax eine eindeutige und lesbare Zuordnung zwischen Variable und Controller erreichen.

```javascript
  angular.module('myApp').controller('BaseController', function () {
    this.headline = 'Basis Controller';
  });
  angular.module('myApp').controller('AnotherController', function () {
    this.headline = 'Weiterer Controller';
  });
```

Im Template erhalten beide Controller-Instanzen eigene Variablennamen.

```html
<div ng-controller="BaseController as base">
  <h4>{{ base.headline }}</h4>
  <div ng-controller="AnotherController as another">
      <h5>{{ another.headline }}</h5>
  </div>
</div>
```

## Mehrfaches verwenden des gleichen Controllers

Es ist ebenfalls möglich, den gleichen Controller mehrfach mit anderem Variablennamen zu verwenden.

```html
<div ng-controller="BaseController as first">
  <h4>{{ first.headline }}</h4>
  <input type="text" ng-model="first.headline">
  <div ng-controller="BaseController as second">
      <h5>{{ second.headline }}</h5>
      <input type="text" ng-model="second.headline">
  </div>
</div>
```

Anhand der Eingabefelder kann man überprüfen, dass die erzeugten Controller-Instanzen wirklich unabhängig voneinander sind.

<iframe src="/assets/mirror/embed.plnkr.co/Sh6BGgpxygAbys97aNMa/preview.html" style="width:100%;height:150px;border:0"></iframe>


## Dependency Injection

Die Angular Dependency Injection zum Zugreifen auf Services funktioniert weiterhin, wie man es von der üblichen Verwendung der Controller auch kennt.

```javascript
angular.module('myApp').controller('MyController', function(myService) {
  this.myService = myService;
});

angular.module('myApp').service('myService', function() {
  this.headline = 'Mein Service';
});
```

## Vermischtes Verwenden mit `$scope`

Durch die Dependency Injection kann man auch weiterhin das `$scope` Objekt verwenden und parallel einsetzen.
Wobei diese Vermischung schnell zu Verwirrung führen kann, gerade wenn Mitentwicklern diese Schreibweise nicht bekannt ist.

```javascript
angular.module('myApp').controller('YetAnotherController', function($scope) {
  this.headline = "Instanz Headline";
  $scope.headline = "Scope Headline";
});
```

Im Template werden die Variablen wie folgt verwendet:

```html
<div ng-controller="YetAnotherController as yac">
  <h4>{{ yac.headline }} / {{ headline }}</h4>
</div>
```


## Problem mit `$watch()`

Das `$scope` Objekt macht in Angular noch mehr, als nur die Verbindung zwischen Template und Daten herzustellen.
Es stellt auch nützliche Methoden, wie z.B. `$watch()` oder `$on()` bereit.
Dabei stellt `$on()` kein Problem dar, die `$watch()` Methode hingegen schon.
Wenn man im vorherigen Beispiel einen Watcher für die Variable `this.headline` definieren möchte, muss man für die `$watch()` Methode `"yac.headline"` verwenden.

```javascript
$scope.$watch("yac.headline", function (newHeadline) {
  console.log(newHeadline);
});
```

Jetzt haben wir aber in unserem Controller einen Variablennamen verwendet, den wir erst im Template definieren und dort auch beliebig ändern können.
Eine solche Vermischung von eigentlich klar getrennten Bereichen kann schnell zu Fehlern führen und ist definitiv unsauber.

## Aktualisierung über eigene Methoden

Alternativ zur `$watch()` Methoden, kann man seiner Controller-Instanz eigene Aktualisierungs-Methoden hinzufügen, ...

```javascript
angular.module('myApp').controller('YetAnotherController', function() {
  this.headline = "Instanz Headline";
  this.headlineChange = function () {
    console.log(this.headline)
  };
});
```

... und diese wieder im Template mit `ng-change` verwenden.

```html
<input type="text" ng-model="yac.headline" ng-change="yac.headlineChange()"/>
```

## Fazit

Die Controller-As-Syntax ermöglicht für verschiedene Anwendungsfälle eine bessere Lesbarkeit und Strukturierung von Variablen in Templates.
Gleichzeitig muss man bedenken, dass eine vermischte Verwendung von `$scope` Objekt und der `this` Referenz, möglicherweise zu andere Problemen führt.
Wie so oft muss man also von Fall zu Fall entscheiden und abwägen.
