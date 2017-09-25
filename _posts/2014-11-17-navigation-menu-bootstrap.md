---
title: "Generierte Navigation mit AngularJS und Bootstrap"
description: "Automatisches Erzeugen der Navigation mit AngularJS und Bootstrap auf Basis euer Routingkonfiguration. Wir erklären, wie es geht und geben euch fertige Beispiele."
author: "Tilman Potthof"
slug: "navigation-menu-bootstrap"
published_at: 2014-11-17 11:52:00.000000Z
categories: "angularjs bootstrap"
header_image: "/artikel/header_images/navigation-menu-bootstrap.jpg"
---

[Single-page-Webanwendungen](http://de.wikipedia.org/wiki/Single-page-Webanwendung) sind mittlerweile sehr verbreitet und je nach Anwendungsfall eine sinnvolle Alternative zu klassischen Webanwendungen.
Wenn man mit AngularJS Single-page-Webanwendungen entwickelt und gleichzeitig Wert auf benutzerfreundliche URLs legt, dann kommt man am `ngRoute` Modul nicht vorbei.
In diesem Artikel möchte ich euch zeigen, wie ihr eine Navigations-Direktive mit dem `$route` Service und Bootstrap bauen könnt, die automatisch durch die Definition der Routen erzeugt wird.

![AngularJS Navigation mit $route und Bootstrap](route-navigation.png)

## Definition der Routen

Im ersten Schritt müssen wir definieren, welche URL-Pfade mit welchen View-Templates verbunden werden sollen.
Dafür verwenden wir den `$routeProvider` der uns im Konfigurations-Block unseres Moduls `myApp` zur Verfügung steht.
Dabei muss `ngRoute` seit Angular Version 1.2 als Abhängigkeit angegeben und auch als eigenes Skript ([angular-route.js](https://code.angularjs.org/1.3.2/angular-route.js) eingebunden werden.

```javascript
// app.js
angular.module('myApp', [
  'ngRoute'
]).config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "dashboard.html",
  }).when("/settings", {
    templateUrl: "settings.html",
  }).otherwise({
    redirectTo: "/"
  });
});
```

Jetzt müssen wir nur noch die Templates für die jeweiligen Beispiel-Seiten anlegen.
Besonders wichtig ist hier die `ng-view`-Direktive in der *index.html* Seite, die dafür sorgt, dass die Templates der Unterseiten eingefügt werden.

```html
<!-- index.html - vollständiges HTML im Plnkr Beispiel -->
...
<body ng-app="myApp">
  <div class="container">
    <div ng-view></div>
  </div>
</body>
...

<!-- dashboard.html -->
<div>
  <h2>Dashboard</h2>
</div>

<!-- settings.html -->
<div>
  <h2>Settings</h2>
</div>
```

Die Routen sind jetzt fertig, aber wir haben noch keine Links, die die Seiten miteinander verbinden.
Wir könnten die Links natürlich einfach in das Dokument einbauen, aber wir wollen uns die Navigation aus unserer Konfiguration generieren lassen.

## Der `$route` Service

An dieser Stelle kommt der `$route` Service ins Spiel, der über `$route.routes` Zugriff auf die Konfiguration der Routen ermöglicht.
Wir erhalten für unsere Konfiguration folgendes Objekt.

```javascript
{
  "/": {
    "reloadOnSearch": true,
    "templateUrl": "dashboard.html",
    "originalPath": "/",
    "regexp": {},
    "keys": []
  },
  "": {
    "redirectTo": "/",
    "originalPath": "",
    "regexp": {},
    "keys": []
  },
  "/settings": {
    "reloadOnSearch": true,
    "templateUrl": "settings.html",
    "originalPath": "/settings",
    "regexp": {},
    "keys": []
  },
  "/settings/": {
    "redirectTo": "/settings",
    "originalPath": "/settings/",
    "regexp": {},
    "keys": []
  },
  "null": {
    "reloadOnSearch": true,
    "redirectTo": "/"
  }
}
```

Für uns sind besonders die URL-Pfade interessant und mit der Funktion `Object.keys($route.routes)` können wir sie als Array extrahieren.

```javascript
["/", "", "/settings", "/settings/", "null"]
```

Allerdings erhalten wir wesentlich mehr URLs, als wir konfiguriert haben, da Angular einige automatische Weiterleitungen einrichtet.
Praktischerweise kann man die konfigurierten Route-Objekte mit eigenen Attributen erweitern, sodass wir für unsere eigenen Routen Namen hinterlegen können.

```javascript
$routeProvider.when("/", {
  templateUrl: "dashboard.html",
  name: "Dashboard"
}).when("/settings", {
  templateUrl: "settings.html",
  name: "Settings"
}).otherwise({
  redirectTo: "/"
});
```

Diese Attribute tauchen wieder im `$route.routes` Objekt auf.

```javascript
// ...
"/settings": {
    "reloadOnSearch": true,
    "templateUrl": "settings.html",
    "name": "Settings",
    "originalPath": "/settings",
    "regexp": {},
    "keys": []
  }
// ...
```

Damit haben wir die Möglichkeit nur die Routen mit konfigurierten Namen zu verwenden und deren Namen mit den URL-Pfaden zu verknüpfen.

```javascript
var routes = [];
angular.forEach($route.routes, function (route, path) {
  if (route.name) {
    routes.push({
      path: path,
      name: route.name
    });
  }
});
```

Als Ergebnis erhalten wir folgende Liste:

```javascript
[
  {
    "path": "/",
    "name": "Dashboard"
  },
  {
    "path": "/settings",
    "name": "Settings"
  }
]
```

## Eigener Service `routeNavigation`

Die eben gezeigten Code-Schnipsel nehmen wir als Grundlage für einen eigenen Service, der die Informationen später für die Navigations-Direktive bereitstellen soll.
Zusätzlich ist für eine Navigation auch immer relevant, wo man sich gerade befindet, daher fügen wir dem Service noch eine `activeRoute` Methode hinzu, die einen Pfad unserer Route-Objekte mit `$location.path()` vergleicht.

```javascript
angular.module('myApp').factory('routeNavigation', function($route, $location) {
  var routes = [];
  angular.forEach($route.routes, function (route, path) {
    if (route.name) {
      routes.push({
        path: path,
        name: route.name
      });
    }
  });
  return {
    routes: routes,
    activeRoute: function (route) {
      return route.path === $location.path();
    }
  };
});
```

## Eigene `navigation`-Direktive

Jetzt fehlt noch die Direktive, um die Navigation einfach einbinden zu können.
Dazu müssen wir nur den `routeNavigation` Service verwenden und die Attribute für ein Template an den `$scope` binden.

```javascript
angular.module('myApp').directive('navigation', function (routeNavigation) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "navigation-directive.tpl.html",
    controller: function ($scope) {
      $scope.routes = routeNavigation.routes;
      $scope.activeRoute = routeNavigation.activeRoute;
    }
  };
});
```

Und das zugehörige Template, das die Navigation mithilfe von *Boostrap 3* anzeigt.
Das Aus- und Einblenden der mobilen Navigation erfolgt über `ng-class`und die `showMobileNav` Variable.

```html
<nav class="navbar navbar-default" role="navigation">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" ng-click="showMobileNav = !showMobileNav">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">route-navigation</a>
  </div>
  <div class="collapse navbar-collapse" ng-class="{in: showMobileNav}">
    <ul class="nav navbar-nav">
      <li ng-repeat="route in routes" ng-class="{active: activeRoute(route)}">
        <a href="#{{ route.path }}">{{ route.name }}</a>
      </li>
    </ul>
  </div>
</nav>
```

***Hinweis***: Für die Direktive wird nur **bootstrap.css** benötigt. Weder *bootstrap.js* noch *jQuery* werden erforderlich.

Zum Schluss fügen wir die Direktive einfach in unser Template ein.

```html
<body ng-app="myApp">
  <div class="container">
    <navigation></navigation>
    <div ng-view></div>
  </div>
</body>
```

## Erweitern der Routen

Wenn man jetzt eine neue Unterseite hinzufügen möchte, dann reicht es aus sie mit einem `name` Attribut in der Konfiguration einzutragen und sie ist sofort in der Navigation verfügbar.

```javascript
  // ...
  }).when("/other", {
    templateUrl: "other.html",
    name: "Other"
  })
  // ...
```

## Plunker Beispiel

Fertig zusammengefügt sieht das Beispiel wie folgt aus.

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/rN1CUfoEbGfxkHrZPuoi/preview.html" style="width:100%;height:320px;border:0"></iframe>

## TL;DR

Wir haben über eigene Attribute Namen für die Navigation hinterlegt, die wir den Route-Objekten für den `$routeProvider` mitgeben.
Diese Namen lassen sich über den `$route` Service auslesen.
Daraus haben wir wiederum eine `navigation` Direktive erstellt, die automatisch alle mit einem Namen konfigurierten Routes anzeigt.
