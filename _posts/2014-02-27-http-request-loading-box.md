---
title: "Ladebalken bei HTTP-Aufruf anzeigen"
description: Lerne, wie du dem Benutzer signalisieren kannst, dass ein Http-Aufruf gerade noch im Gange ist. Wir demonstrieren dies mit einem kurzen Beispiel.
author: "Sascha Brink"
slug: "http-request-loading-box"
published_at: 2014-02-27 11:55:15.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/http-request-loading-box.jpg"
---

## Problem

Nachdem du einen HTTP-Aufruf abgesetzt hast, möchtest du einen Ladebalken anzeigen, bis dieser beendet wurde.

## Lösung

Wir schreiben eine Direktive, die ein Element, z.B. einen Ladebalken einblendet, solange mindestens eine HTTP-Anfrage in Bearbeitung ist. Die Direktive ist isoliert, damit sie an jeder beliebigen Stelle verwendet werden kann.

Hier die wichtigsten Punkte der Lösung:

*   Ob ein Aufruf noch in der Schwebe ist, können wir mit `$http.pendingRequests.length > 0` überprüfen.
*   Einem *Watcher* können wir in AngularJS nicht nur Variablen, sondern auch Funktionen übergeben. Watcher werden ständig aufgerufen, somit sollte die Funktion nicht komplex sein. Der Vergleich von `pendingRequests` ist einfach genug, um die Applikation nicht träge zu machen.

In der Direktive überprüft der Watcher, ob noch eine Anfrage aussteht. Das Ergebnis (true/false) schreibt dieser in eine Variable `waiting`. Mit `ng-show="waiting"` blenden wir im Template den Ladebalken ein oder aus.

* * *

**application.js**

```javascript
angular.module('cookbookApp', [])
  .directive('waitingForRequest', function($http) {
    var pendingRequests = function() {
      return $http.pendingRequests.length > 0;
    };
    return {
      restrict: 'E',
      scope: {},
      template: '<div ng-show="waiting">Waiting for request to finish...</div>',
      controller: function($scope) {
        $scope.$watch(pendingRequests, function(value) {
          console.log('Pending requests: '+ $http.pendingRequests.length);
          $scope.waiting = value;
        });
      }
    };
  })
  .controller('MainCtrl', function($scope, $http) {
    $http.get('https://api.github.com/users/sbrink');
  });
```


**index.html**

```html
<html ng-app="cookbookApp">
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular.js"></script>
  <script src="application.js"></script>
</head>
<body ng-controller="MainCtrl">
  <waiting-for-request></waiting-for-request>
</body>
</html>
```
