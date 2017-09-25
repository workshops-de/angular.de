---
title: "Neue Optionen für ngModel in AngularJS 1.3"
description: "Die Direktive ngModelOptions ermöglicht euch das Verhalten von ng-model zu konfigurieren. Welche Möglichkeiten ihr dabei habt zeigen wir euch in diesem Artikel."
author: "Tilman Potthof"
slug: "ng-model-options"
published_at: 2014-11-27 09:04:00.000000Z
categories: "angularjs 1.3"
header_image: "/artikel/header_images/ng-model-options.jpg"
---

AngularJS ist bekannt für sein einfaches bidirektionales Databinding.
Praktisch jedes Einsteiger-Tutorial beginnt damit, dass man ein Text-Eingabefeld mit der `ng-model` Direktive verbindet und die verbundene Variable wieder ausgibt (auch unser [Einsteiger-Tutorial](/artikel/angularjs-tutorial-deutsch/)).

```html
<input type="text" ng-model="search">
<p>Du suchst gerade nach: {{search}}</p>
```

Man hat noch keine Zeile JavaScript-Code geschrieben und schon ein interaktives Element auf der Seite. Mit Angular 1.3 hat man jetzt die Möglichkeit, das Verhalten der `ng-model` Direktive durch neue Optionen zu verändern.


## Einschränkungen von `ngModel`

Das vordefinierte Verhalten von `ngModel` ist praktisch und passt für sehr viele Anwendungsfälle.
Was aber, wenn man möchte, dass eine Variable nicht bei jedem Tastenanschlag aktualisiert wird, sondern erst beim Verlassen des Textfelds?
Oder wenn eine Text-Suche erst starten soll, wenn der Benutzer länger als 300 Millisekunden nichts Neues mehr getippt hat?

Bisher muss man für solche Spezialfälle eigene Logik implementieren, aber mit Angular 1.3 ist es möglich das Verhalten `ngModel` durch die neue Direktive [`ngModelOptions`](https://docs.angularjs.org/api/ng/directive/ngModelOptions) zu konfigurieren und das Verhalten anzupassen.
Die drei wichtigsten Optionen sind `updateOn`, `debounce` und `getterSetter`.

## Option `updateOn`

Mit der Option `updateOn` kann man definieren, dass das Model nur bei bestimmten Events aktualisiert wird.
Besonders relevant für den praktischen Einsatz ist das Event **blur**, da es beim Verlassen eines Eingabefelds ausgelöst wird.
Damit wird das Model nur beim Verlassen des Eingabefelds aktualisiert und nicht bei jedem Tastenanschlag.

```html
<input type="text" ng-model="user.email" ng-model-options="{updateOn:'blur'}" />
```

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/kVlCDFy0QMeGOzGqr47r/preview.html" style="width:100%;height:220px;border:0"></iframe>

## Option `debounce`

Die `debounce` Option sorgt dafür, dass das Model erst aktualisiert wird, wenn sich die Eingabe für eine bestimmte Zeit nicht mehr geändert hat.
Man kann genau in Millisekunden angeben, wie lange auf weitere Tastenanschläge gewartet werden soll.
Das ist besonders praktisch, wenn die Änderung des Models weitere Aktionen wie Suchen oder Filtern auslöst.

```html
<input type="text" ng-model="searchTerm" ng-model-options="{debounce:500} />
```

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/TJL43E8MLnwLuYHns9MO/preview.html" style="width:100%;height:300px;border:0"></iframe>

## Option `getterSetter`

Die `ngModel` Direktive bindet Eingabefelder normalerweise fest an eine Variable.
Es gibt jedoch auch hier Anwendungsfälle, in denen das Standardverhalten eher störend ist, z.B. wenn man bei jeder Änderung die Eingabe direkt weiterverarbeiten möchte.
In solchen Fällen muss man auf jede Änderung per `$scope.$watch("variable", ...` oder `ngChange` Direktive reagieren.
Auch hier bietet Angular 1.3 neue Möglichkeiten, indem man mit der Option `getterSetter: true` definiert, dass die Variable in `ngModel` nicht als Attribut, sondern als Funktion behandelt wird.
Die Funktionsweise lässt sich sehr gut an einem Celsius-Fahrenheit-Umrechner zeigen.

```html
<input ng-model="temperature.celsius" ng-model-options="{getterSetter: true}" />
<input ng-model="temperature.fahrenheit" ng-model-options="{getterSetter: true}" />
```

Im zugehörigen Controller sind die beiden `getterSetter`-Funktionen so implementiert, dass sie prüfen, ob man eine Zahl eingegeben hat.
Anschließend werden beide Werte geprüft, umgerechnet und im Feld `temperature.celsiusValue` gespeichert und wieder gerundet zurückgegeben.
Die Fahrenheit-Funktion liefert wieder einen umgerechneten Wert zurück.
Die alleinige Datenquelle bleibt in beiden Fällen aber der Wert in `temperature.celsiusValue`.

```javascript
  // app.js
angular.module('ngModelOptionsDemo').controller('baseController', function($scope, $timeout) {
  function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9)
  }

  function celsiusToFahrenheit(celsius) {
    return ((celsius * 9) / 5) + 32
  }

  function round(value, precision) {
    var n = Math.pow(10, precision);
    return Math.round(value * n) / n;
  }

  $scope.temperature = {
    celsiusValue: 23,
    celsius: function(celsiusValue) {
      if (!isNaN(celsiusValue)) {
        this.celsiusValue = parseFloat(celsiusValue);
      }
      return round(this.celsiusValue, 2);
    },
    fahrenheit: function(fahrenheitValue) {
      if (!isNaN(fahrenheitValue)) {
        this.celsiusValue = fahrenheitToCelsius(parseFloat(fahrenheitValue));
      }
      return round(celsiusToFahrenheit(this.celsiusValue), 2);
    }
  };
});
```

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/FUF0jNAE4ce1guOqWolI/preview.html" style="width:100%;height:400px;border:0"></iframe>

**Hinweis:** Das Initialisieren der Eingabefelder über die getterSetter-Funktion funktioniert erst ab 1.3.4 korrekt. Vorher werden Eingabefelder leider immer leer initialisiert.

## Interaktives Beispiel

Zum Abschluss dieses Blog-Posts gibt es noch ein interaktives Beispiel zum Bearbeiten der `ngModelOptions`.

**Tipp:** Die Optionen `updateOn` und `debounce` lassen sich kombinieren.

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/ygc28XaPL8s0XaL11tEX/preview.html" style="width:100%;height:540px;border:0"></iframe>
