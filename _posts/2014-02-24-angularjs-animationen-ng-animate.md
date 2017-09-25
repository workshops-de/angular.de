---
title: "Animationen mit ng-animate in AngularJS 1.2"
description: Lerne, wie du Animationen mit ng-animate einsetzt, um z.B. Elemente in Tabellen ein- und auszublenden.
author: "Sascha Brink"
slug: "angularjs-animationen-ng-animate"
published_at: 2014-02-24 13:38:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-animationen-ng-animate.jpg"
---

Seit **AngularJS 1.2** sind Animationen fester Bestandteil des Frameworks. Unterstützt werden Animationen mit CSS3 und JavaScript.

<!--more-->

## Installation

Die Unterstützung für Animationen befindet sich in einer separaten Datei. Der erste Schritt besteht darin, diese einzubinden und das Modul `ngAnimate` als Abhängigkeit anzugeben. In eurer HTML-Datei wäre das beispielsweise für die AngularJS-Version des Google-CDN:

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-animate.js"></script>
```


Dazu die Modul-Deklaration im JavaScript:

```javascript
angular.module('myApp', ['ngAnimate'])
```


## Direktiven und Ereignisse

AngularJS unterstützt Animationen für die folgenden Direktiven:


<table class="table table-condensed">
  <thead>
    <tr>
      <th>
        Direktive
      </th>

      <th>
        Unterstützte Animationen
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <a href="http://docs.angularjs.org/api/ng/directive/ngRepeat#usage_animations" target="_blank">ngRepeat</a>
      </td>

      <td>
        enter, leave and move
      </td>
    </tr>

    <tr>
      <td>
        <a href="http://docs.angularjs.org/api/ngRoute/directive/ngView#usage_animations" target="_blank">ngView</a>
      </td>

      <td>
        enter and leave
      </td>
    </tr>

    <tr>
      <td>
        <a href="http://docs.angularjs.org/api/ng/directive/ngInclude#usage_animations" target="_blank">ngInclude</a>
      </td>

      <td>
        enter and leave
      </td>
    </tr>

    <tr>
      <td>
        <a href="http://docs.angularjs.org/api/ng/directive/ngSwitch#usage_animations" target="_blank">ngSwitch</a>
      </td>

      <td>
        enter and leave
      </td>
    </tr>

    <tr>
      <td>
        <a href="http://docs.angularjs.org/api/ng/directive/ngIf#usage_animations" target="_blank">ngIf</a>
      </td>

      <td>
        enter and leave
      </td>
    </tr>

    <tr>
      <td>
        <a href="http://docs.angularjs.org/api/ng/directive/ngClass#usage_animations" target="_blank">ngClass</a>
      </td>

      <td>
        add and remove
      </td>
    </tr>

    <tr>
      <td>
        <a href="http://docs.angularjs.org/api/ng/directive/ngShow#usage_animations" target="_blank">ngShow & ngHide</a>
      </td>

      <td>
        add and remove
      </td>
    </tr>
  </tbody>
</table>

Von jeder Direktive können verschiedene Ereignisse animiert werden. Für `ngRepeat` sind es zum Beispiel:

*   *enter*: ein neues Element wird in die Liste eingefügt
*   *leave*: ein Element wird aus der Liste entfernt
*   *move*: ein bestehendes Element wird innerhalb der Liste verschoben

## Vorbereitung im HTML

Der erste Schritt besteht immer darin, dem Element mit der Direktive eine Klasse zu geben. Dies gilt sowohl für Animation mit CSS3 als auch für Javascript.

```html
<li ng-repeat="item in items" class="list-item">{{item}}</li>
```


Ab jetzt kommt es darauf an, ob ihr CSS oder JavaScript unterstützen wollt.

## CSS3-Animationen

Beginnen wir mit der einfachen Variante - CSS3-Animationen. Wir animieren im folgenden Beispiel das Einblenden eines neuen Elements über einen Highlight-Effekt. D.h. ein neues Element leuchtet erst gelb auf und geht dann sanft in weiß über. In Eurem CSS schreibt ihr dazu:

```css
.list-item.ng-enter {
  -webkit-transition: 0.5s linear all;
  transition: 0.5s linear all;
  background-color: yellow;
}
.list-item.ng-enter-active {
  background-color: white;
}
```


> [Demo CSS3-Animation als JSFiddle][2]

Der Ablauf dabei sieht folgendermaßen aus:

1.  Die Klasse `.ng-enter` wird als erstes hinzugefügt.
2.  Es folgt unmittelbar die Klasse `.ng-enter-active`.
3.  Es wird gewartet bis die Animation durchgelaufen ist.
4.  Beide Klassen werden wieder entfernt.

![AngularJS CSS Animations][3]

Die Namen der zusätzlichen CSS-Klassen kommen über *Konvention* zustande:

*   *enter*: `.ng-enter` und `.ng-enter-active`
*   *leave*: `.ng-leave` und `.ng-leave-active`
*   *move*: `.ng-move` und `.ng-move-active`

## JavaScript-Animationen

Für die meisten Animationen reichen CSS3-Transitionen aus. Früher oder später werdet ihr aber wahrscheinlich an deren Grenzen stoßen. Entweder müsst ihr ältere Browser unterstützen oder ihr habt komplexe Animationen, die mit CSS3 nicht möglich sind.

Für Animationen mit JavaScript müsst ihr eine `animation` mit dem Klassennamen auf eurem Modul definieren. **Achtet dabei auf den Punkt im Namen!**

Grundsätzlicher Aufbau einer Animation mit JavaScript:

```javascript
angular.module('myApp', ['ngAnimate'])
  .animation('.list-item', function() {
    return {
      enter/leave/move: function(element, done) {
        // Die eigentliche Animation wird hier gestartet.
        // done() muss nach Beenden aufgerufen werden
      },

      // Animation, die vor Hinzufügen/Entfernen der Klassen
      // ausgeführt werden soll
      beforeAddClass: function(element, className, done) { },
      beforeRemoveClass: function(element, className, done) { },

      // Animation, die nach Hinzufügen/Entfernen der Klassen
      // ausgeführt werden soll
      addClass: function(element, className, done) { },
      removeClass: function(element, className, done) { }
    };
  });
```


> [Demo JavaScript-Animation als JSFiddle][4]

Bei JavaScript-Animationen müsst ihr euch selbst um das richtige Timing der Animationen kümmern und nach dem Ende die Funktion `done()` aufrufen.

## Fazit

Seit Version 1.1.5 hat sich die Animations-API noch einmal komplett geändert - zum Besseren. Sobald das 'ngAnimate'-Modul eingebunden wurde, ist die Bedienung kinderleicht. Zudem lassen sich Animationen sehr einfach später nachrüsten.

 [2]: http://jsfiddle.net/angularjs_de/7uV6g/
 [3]: ng-animate-ablauf.svg
 [4]: http://jsfiddle.net/angularjs_de/Lgngx/
