---
title: "Service, Factory und Provider verstehen"
description: "Was ist der Unterschied? Wann brauch ich was? In diesem Artikel werden alle relevanten Wege zum Erzeugen von Services gezeigt und praktische Tipps gegeben."
author: "Tilman Potthof"
slug: "service-factory-provider"
published_at: 2014-12-12 14:07:00.000000Z
categories: "angularjs services"
header_image: "/artikel/header_images/service-factory-provider.jpg"
---

In diesem Artikel werden alle relevanten Wege zum Erzeugen von Services gezeigt und praktische Tipps gegeben, wie ihr die übliche Verwirrung mit den unterschiedlichen Methoden einfach umgehen könnt.
Wenn man sich mit Services in Angular beschäftigt, dann stößt man früher oder später darauf, dass es zum Erzeugen die Methoden `service()`, `factory()` und `provider()` gibt.
Alle haben gemeinsam, dass sie Services erzeugen, aber deren Unterschiede, sowie Vor- und Nachteile sind nicht sofort ersichtlich.

## Was ist ein Service?

Ein Service ist ein JavaScript-Objekt, dass sich über *Dependency Injection* in andere Anwendungskomponenten (Controller, Direktiven, Services, Filter) einbinden lässt.
An einem einfachen Beispiel lässt sich zeigen, wie man einen Wert aus einem Controller in einen Service auslagern kann.

```javascript
var app = angular.module("myApp", []);
app.controller("myController", function ($scope, myService) {
  $scope.myService = myService;
});
app.factory("myService", function () {
  return {
      myImportantValue: 42
  };
});
```

Anschließend kann man in einem Template den Wert über den Service abrufen.

```html
<div ng-controller="myController">{{ myService.myImportantValue }}</div>
```

Natürlich lohnt sich ein Service weniger für einzelne Werte, sondern vor allem dann, wenn man komplexe Anwendungslogik aufteilen möchte.

## Was sind die Vorteile?

Das Konzept von Services in AngularJS ist unerlässlich, wenn man eine große Anwendung in viele kleine sinnvolle Einheiten aufteilen möchte.
Im besten Fall erreicht man damit, dass eine komplexe und weiter wachsende Anwendung trotzdem erweiterbar und wartbar bleibt, ohne dass sich jede Änderung anfühlt, wie das Herausziehen eines Bausteins aus einem Jenga-Turm.
Vor allem sehr große Controller-Methoden sind ein Warnzeichen für zu unzureichende Strukturierung der Anwendungslogik.

## Wie unterscheiden sich die drei Methoden?

Für den einfachsten und häufigsten Anwendungsfall - das Bereitstellen eines Objekts für andere Komponenten - sind die Fähigkeiten aller drei Methoden gleich.
Um das an einem Beispiel zu zeigen, bauen wir dreimal einen identischen `userService` mit allen Methoden.
Der Service soll dabei eine private, nicht veränderbare Liste von Benutzern haben.
Außerdem gibt es die Methode `users()`, die eine flache Kopie der Liste zurückgibt, und die Methode `addUser()` zum Hinzufügen von neuen Benutzern.

### Beispiel `factory()`

Die Methode `factory()` ist sehr leicht zu verwenden.
Das registrierte Service-Objekt ist der *return*-Wert der Funktion.
Durch die Funktion haben wir die Möglichkeit private Variablen als *Closure* ([Wikipedia](http://de.wikipedia.org/wiki/Closure)) zu kapseln.
Das heißt, dass wir keinen direkten Zugriff mehr auf unsere `privateUserList` Variable haben, nachdem unsere Funktion das Service-Objekt erzeugt hat.
Stattdessen können nur noch die Service-Methoden auf der Liste operieren.
Dadurch, dass wir die Liste in der `users()` Methode als flache Kopie zurückgeben, haben wir einen Service geschaffen, der kein Löschen von Benutzern aus der Liste zulässt.

```javascript
angular.module("myApp").factory("userService", function () {
  var privateUserList = [];
  return {
    users: function () {
      return [].concat(privateUserList);
    },
    addUser: function (username, email) {
      privateUserList.push({username: username, email: email});
    }
  };
});
```

Wenn wir den Service jetzt in andere Komponenten einbinden, wird das Service-Objekt wie ein *Singleton* ([Wikipedia](https://de.wikipedia.org/wiki/Singleton_(Entwurfsmuster))) genau einmal erzeugt.
Sobald man das weiß, kann man dieses Wissen nutzen, um mit Service-Objekten Daten zwischen mehreren Controllern zu teilen.

```javascript
angular.module('myApp').controller('formController', function($scope, userService) {
  $scope.addUser = function() {
    userService.addUser($scope.username, $scope.email);
    $scope.username = "";
    $scope.email = "";
  }
});

angular.module('myApp').controller('userListController', function($scope, userService) {
  $scope.users = userService.users;
});
```

In einem Template können wir beide Controller unanhängig voneinander einsetzen und trotzdem finden alle Operationen über den `userService` auf der gleichen privaten Benutzer-Liste statt.

```html
<body>
  <form ng-controller="formController">
    <input type="text"  ng-model="username" placeholder="Benutzername"/>
    <input type="text"  ng-model="email" placeholder="E-Mail"/>
    <button ng-click="addUser()">Benutzer hinzufügen</button>
  </form>
  <hr/>
  <ul ng-controller="userListController">
    <li ng-repeat="user in users() track by user.username">
      {{ user.username }}
      ({{ user.email }})
    </li>
  </ul>
</body>
```

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/YqpPJT6tWUpZNgFiwT3K/preview.html" style="width:100%;height:150px;border:0"></iframe>


### Beispiel `service()`

Die Methode `service()` unterscheidet sich nur in der Art, wie das Service-Objekt erstellt wird.
Die Funktion wird von Angular mit `new` aufgerufen und erzeugt so eine Instanz des Service Objekts.
Daher werden Attribute und Funktionen, wie bei einem Konstruktur, an die `this` Variable angefügt.
Achtung, aber auch hier wird das Service-Objekt nur einmal als Singleton erzeugt.

```javascript
angular.module("myApp").service("userSerivce", function () {
  var privateUserList = [];
  this.users = function () {
    return angular.copy(privateUserList);
  };
  this.addUser = function (username, email) {
    privateUserList.push({username: username, email: email});
  };
});
```

Funktional bietet diese Möglichkeit keine Vorteile, aber man kann schon bestehende JavaScript-Konstruktoren verwenden, falls man dies möchte.

```javascript
angular.module("myApp").service("myService", MyExistingServiceConstructor);
```

### Beispiel `provider()`

Die letzte und mächtigste Möglichkeit ist die `provider()` Methode.
Der Service selbst wird, wie in der `factory()` Methode, aus einem `return` Wert erzeugt.
Allerdings wird diese Funktion als `$get` Methode an den Provider angefügt.

```javascript
angular.module("myApp").provider("userService", function() {
  this.$get = function() {
    var privateUserList = [];
    return {
      users: function() {
        return [].concat(privateUserList);
      },
      addUser: function(username, email) {
        privateUserList.push({
          username: username,
          email: email
        });
      }
    };
  };
});
```

Damit haben wir erst mal nichts gewonnen, sondern nur eine kompliziertere Schreibweise gefunden, um das Gleiche zu tun wie die `factory()` Methode.
Einen Vorteil haben wir erst, wenn wir unseren Service konfigurierbar möchten.

### Konfigurierbare Services

Für einige eingebaute Services gibt es die Möglichkeit, ihre Provider in der Konfigurations-Phase anzupassen.
Zwei relative bekannte Beispiele sind der `$routeProvider`, mit dem man seine Routen festlegen kann, oder der `$locationProvider`, für den man den HTML5 Modus aktivieren kann, sodass kein Hash für die Pfade benötigt wird.

```javascript
angular.module('myApp', [
  'ngRoute'
]).config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when("/", {
    templateUrl: "dashboard.html",
  }).when("/settings", {
    templateUrl: "settings.html",
  }).otherwise({
    redirectTo: "/"
  });
});
```

#### Konfiguration eigener Services

Allerdings ist diese Möglichkeit nicht nur den eingebauten Services vorbehalten, sondern wir können auch unsere eigenen Services konfigurierbar machen, wenn wir die `provider()` Methode verwenden.
Als Beispiel wollen wir unseren `userService` so erweitern, dass wir in der Konfigurationsphase initiale Benutzer hinzufügen können.
Dafür verschieben wir die Variable `privateUserList` in die äußere Funktion und fügen dem `userServiceProvider` über die `this` Variable eine Methode `addInitialUser()` hinzu.

```javascript
angular.module("myApp").provider("userService", function() {
  var privateUserList = [];

  this.addInitialUser = function(username, email) {
    privateUserList.push({
      username: username,
      email: email
    });
  };

  this.$get = function() {
    return {
      users: function() {
        return [].concat(privateUserList);
      },
      addUser: function(username, email) {
        privateUserList.push({
          username: username,
          email: email
        });
      }
    };
  };
});
```

Anschließend können wir, wie gewünscht, in der Konfigurationsphase Benutzer hinzufügen.

```javascript
angular.module('myApp').config(function(userServiceProvider) {
  userServiceProvider.addInitialUser("admin", "admin@example.com");
});
```

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/5pi46MIe9bEuI3nZNc3k/preview.html" style="width:100%;height:150px;border:0"></iframe>

## TL; DR

Wenn ihr mit AngularJS Anwendungsbausteine als Services auslagern wollt, dann nehmt ihr am einfachsten die `factory()` Methode, deren return-Wert ein Objekt ist, das ihr in anderen Komponenten (Controllern, Direktiven etc.) per *Dependency Injection* einfügen könnt.
Der so erstellte Service existiert nur einmal und diese Instanz wird über alle Komponenten geteilt.
