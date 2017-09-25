---
title: "Wie ihr SVG mit AngularJS nutzen könnt"
description: Lerne, wie du AngularJS und SVG kombinieren kannst, um dynamische Grafiken zu erzeugen.
author: "Sascha Brink"
slug: "angularjs-svg-clock"
published_at: 2014-02-21 11:48:13.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-svg-clock.jpg"
---

> [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) ist eine Spezifikation, mit der ihr Vektorgrafiken erstellen und in HTML einbetten könnt.

Dieses Beispiel inspiriert euch hoffentlich, ein wenig kreativ mit AngularJS zu werden. Mit nur wenigen Zeilen könnt ihr eine Analog-Uhr mit SVG und AngularJS erstellen.

In der HTML-Datei erstellen wir 3 Zeiger für Stunden, Minuten und Sekunden. Per JavaScript und AngularJS berechnen wir jede Sekunde die korrekte Rotation der Zeiger.

HTML (index.html):

```html
<html ng-app="cookbookApp">
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular.js"></script>
  <script src="application.js"></script>
</head>
<body ng-controller="MainController">
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <g>
      <circle style="stroke: #ccc; fill: #fff;" cx="100" cy="100" r="100"/>
      <line x1="100" y1="100" x2="100" y2="50"
            style="stroke-width: 5px; stroke: #333;"
            ng-attr-transform="rotate({{hourRotation}} 100 100)" />
      <line x1="100" y1="100" x2="100" y2="20"
            style="stroke-width: 3px; stroke: #888;"
            ng-attr-transform="rotate({{minuteRotation}} 100 100)" />
      <line x1="100" y1="100" x2="100" y2="5"
            style="stroke-width: 2px; stroke: #bb0000;"
            ng-attr-transform="rotate({{secondRotation}} 100 100)" />
    </g>
  </svg>
</body>
</html>
```


JavaScript (application.js):

```javascript
angular.module('cookbookApp', [])
  .controller('MainController', function($scope, $interval) {

    function calculateRotation() {
      var now = new Date();
      $scope.hourRotation   = 360 * now.getHours()   / 12;
      $scope.minuteRotation = 360 * now.getMinutes() / 60;
      $scope.secondRotation = 360 * now.getSeconds() / 60;
    }
    $interval(calculateRotation, 1000);
    calculateRotation();
  });
```
