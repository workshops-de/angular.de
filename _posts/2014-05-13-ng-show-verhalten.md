---
title: "Das merkwürdige Verhalten von ng-show"
description: Lerne, wieso sich ng-show vor AngularJS 1.3 mehrwürdig verhalten hat.
author: "Sascha Brink"
slug: "ng-show-verhalten"
published_at: 2014-05-13 10:43:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/ng-show-verhalten.jpg"
---

> Hinweis: Das merkwürdige Verhalten wurde in AngularJS 1.3 [behoben](https://github.com/angular/angular.js/commit/bdfc9c02d021e08babfbc966a007c71b4946d69d).

Andreas Becker war so lieb und hat im [AngularJS Tutorial](/artikel/angularjs-tutorial-deutsch/) auf das merkwürdige Verhalten von *ng-show* hingewiesen:

> Im Beispiel erscheint nach der Eingabe eines Buchstabens der Satz "Du suchst gerade nach:" mit dem entsprechenden Zeichen dahinter. Tippe ich allerdings n oder f ein, erscheint dieser Satz nicht.  Hast du dafür eine Erklärung?

Kontext: Im Tutorial geht es darum den Satz anzuzeigen, wenn man in ein Textfeld etwas eingibt ([Demo](http://angularjs-de.github.io/angularjs-tutorial-code/04-directives/)).

```html
<input type="text" ng-model="search">
<p ng-show="search">Du suchst gerade nach: {{search}}</p>
```

## Erklärung

Wir haben im Quellcode nachgeforscht und folgende Erklärung gefunden: `ng-show`/`ng-hide` benutzen intern die Funktion `toBoolean`, um einen String auf true/false zu testen.

Die Funktion [toBoolean](https://github.com/angular/angular.js/blob/v1.2.16/src/Angular.js#L1004) sieht folgendermaßen aus:

```javascript
function toBoolean(value) {
  if (typeof value === 'function') {
    value = true;
  } else if (value && value.length !== 0) {
    var v = lowercase("" + value);
    value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
  } else {
    value = false;
  }
  return value;
}
```

Das bedeutet, wenn in einem String **f, 0, false, no, n oder []** steht, wird dieser als *false* gewertet.

## Lösung

Wer das "normale" Verhalten erzwingen möchte, kann einen String schon vorher mit `!!` in einen Boolean-Wert konvertieren.

```html
<input type="text" ng-model="search">
<p ng-show="!!search">Du suchst gerade nach: {{search}}</p>
```
