---
title: "Eigene Filter implementieren und testen"
description: Lerne, wie du einen eigenen Expression-Fillter erstellen kannst. Als Beispiel benutzen wir einen truncate-Filter zum Kürzen von Zeichenketten.
author: "Philipp Tarasiewicz"
slug: "expression-filter"
published_at: 2014-03-25 12:00:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/expression-filter.jpg"
---

Filter sind in AngularJS ein mächtiges Konzept, um Daten vor der Ausgabe beliebig transformieren zu können. Grundsätzlich unterscheiden wir zwischen den so genannten Expression- und Collectionfiltern.
*Collectionfilter* kommen in Verbindung mit der `ngRepeat`-Direktive zum Einsatz, während *Expressionfilter* - wie der Name es bereits vermuten lässt - in Expressions verwendet werden können.

In diesem Beitrag wollen wir uns den Expressionfiltern widmen. Wen die Collectionsfilter mehr interessieren, dem sei mein Artikel **[ng-repeat: Der Teufel im Schafspelz](/artikel/angularjs-ng-repeat/)** ans Herz gelegt, in dem ich unter Anderem vorstelle, wie man einen eigenen Collectionfilter implementiert.

Ein Expressionfilter wird - genau wie ein Collectionfilter - mit der `filter()`-Funktion von AngularJS definiert. Sie erwartet als ersten Parameter den Namen des Filters und als zweiten Parameter eine Funktion, die die Filterimplementierung zurückgibt. Die zurückgegebene Filterimplementierung definieren wir ebenfalls mithilfe einer Funktion.

Im nachfolgenden Beispiel sehen wir die Implementierung eines `truncate`-Filters. Dieser Filter überprüft, ob eine Zeichenkette mehr als `charCount` Zeichen enthält. Wenn das der Fall ist, dann wird die Zeichenkette abgeschnitten und durch drei Punkte (…) ergänzt. An diesem Filter können wir erkennen, dass Filter auch eine beliebige Anzahl von Parametern entgegennehmen können.

```javascript
angular.module('myApp').filter('truncate', function() {
  return function (input, charCount) {
    var output  = input;

    if (output.length > charCount) {
      output = output.substr(0, charCount) + '...';
    }

    return output;
  };
});
```

Wir können den `truncate`-Filter nun in einem Template in Verbindung mit einer Expression verwenden.

```html
<p>
  {{ '0123456789' | truncate:3 }}
</p>
```

Das Ergebnisse dieser Transformation würde somit folgendermaßen aussehen:

```javascript
012…
```

Filter lassen sich übrigens auch sehr einfach testen. Wer keine Tests schreibt, ist also - wie so häufig - selbst schuld!

```javascript
describe('Filter: truncate', function () {
  var truncate, $filter;

  beforeEach(module('myApp'));

  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  beforeEach(function () {
    truncate = $filter('truncate');
  });

  it('should truncate the input accordingly', function () {
    expect(truncate('0123456789', 3)).toBe('012...');
  });
});
```
