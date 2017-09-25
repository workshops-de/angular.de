---
title: "Parsing mit $compile, $interpolate und $parse"
description: "Wofür brauche ich die Services $compile, $interpolate oder $parse? In diesem Artikel geht es darum, wie sie sich unterscheiden und wie man sie benutzt."
author: "Sascha Brink"
slug: "angularjs-compile-interpolate-parse"
published_at: 2015-08-25 07:45:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-compile-interpolate-parse.jpg"
---

<div class="alert alert-info">Dieser Artikel ist für fortgeschrittene AngularJS-Entwickler gedacht.</div>

## Ziel des Artikels:

Wie AngularJS ein HTML-Template verarbeitet, ist in den Tiefen des Frameworks verborgen. 
Normalerweise muss man auch nicht wissen, wie es funktioniert. 
Das ändert sich, wenn man eigene Direktiven zu baut. 
In diesem Fall kommt man sehr oft in die Situation, Templates oder Variablen selbst kompilieren zu müssen. 
Dazu braucht man einen der folgenden Services: $compile, $interpolate oder $parse. In diesem Artikel geht es darum, wie sie sich unterscheiden und wie man sie benutzt.

## Der typische Anwendungsfall

Ihr habt eine eigene Direktive mit einer *link*-Funktion. In dieser erstellt ihr manuell eigene Elemente.

```javascript
.directive('name', function($compile) {
  return {
    restrict: 'E',
    link: function(scope, element) {
      element.html('{{name}}');
    }
  }
});
```

Fokussiert euren Blick kurz auf die *link*-Funktion, wo wir ein Element mit dem Inhalt `{{name}}` erstellen. Wenn ihr diese Direktive mit `<name></name>` im HTML benutzt, wäre das Ergebnis immer `{{name}}`.

Da wir aber mit AngularJS arbeiten, wollen wir normalerweise nicht `{{name}}` ausgeben, sondern den Inhalt der Variable `name`. Dafür brauchen wir in diesem Fall `$compile`.

```javascript
.directive('name', function($compile) {
  return {
    restrict: 'E',
    link: function(scope, element) {
      element.html('{{name}}');
      $compile(element.contents())(scope);
    }
  }
});
```

Kompilieren wir den Inhalt von `element` zusätzlich mit `$compile`, verhält sich alles wie erwartet. Die Variable `name` wird per Two-Way-Databinding automatisch aktualisiert.

Das wäre ein Beispiel für $compile. Gehen wir die drei Services im Folgenden durch.

## Die Services $compile, $interpolate, $parse

Das Wichtige zuerst: $compile, $interpolate und $parse folgen einer Hierarchie.

Sehr einfach verständlich mit folgenden Beispielen:

* *$compile:* `<p>Hallo {{name}}</p>`
* *$interpolate:* `Hallo {{name}}`
* *$parse:* `name`

Übersicht:

* *$compile* bezieht sich auf Zeichenketten mit HTML-Tags. Zwischen den Tags wird `$interpolate` aufgerufen
* *$interpolate* bezieht sich auf Zeichenketten, die Expressions enthalten können. Kommen dabei HTML-Tags vor, wird ein Fehler geworfen. `$parse` wird auf Expressions angewendet.
* *$parse* bezieht sich auf den Inhalt von Expressions

### $compile

Ergebnis: *jqLite/jQuery*-Element

> $compile braucht immer einen Tag zum Öffnen und einen zum Schließen. Selbstschließende Tags werfen einen Fehler.

Beispiel:

```javascript
scope.name = 'Welt';
$compile('<p>Hallo {{name}}</p>')(scope)
// => [p.ng-binding.ng-scope]
```

`$compile` ist der Service, der an oberster Stelle steht. Er unterteilt einen HTML-Tag in einzelne Tokens. Auf den Inhalt eines Tokens wird `$interplate` angewendet.

Das Ergebnis von $compile ist ein **jqLite/jQuery**-Element!

Dieser Service sorgt auch dafür, dass entsprechende Watcher mit `$watch` auf dem Scope registriert werden. Deshalb funktioniert aus auch nicht, wenn man an dieser Stelle einfach ein Objekt übergibt, wie z.B.  `$compile('<p>Hallo {{name}}</p>')({ name: 'Welt' });`.

### $interpolate

Ergebnis: *String*

> Beim Verwenden von $interpolate darf sich kein Tag in der Zeichenkette befinden.

Beispiel:

```javascript
$interpolate('Hallo {{name}}')({ name: 'Welt' });
// => Hallo Welt
```

`$interpolate` unterteilt die Zeichenkette wieder weiter und sucht nach Expressions ({{}}). Auf diese wird der *$parse*-Service angewendet.

### $parse

Ergebnis: *String*

> Wichtig: Beim Verwenden von $parse darf sich keine weitere Expression ({{}}) in der Zeichenkette befinden.

Beispiel:

```javascript
$parse('name | uppercase')({ name: 'Welt' });
// => WELT
```

$parse verarbeitet auch Filter.

## Noch ein Beispiel im AngularJS-Framework:

Da wir uns die Services jetzt genauer angeschaut haben, können wir auch erklären, wieso wir bei manchen Direktiven magisch Variablen benutzen können.
Ein gutes Beispiel dafür ist `ng-click`. `ng-click` fügt magisch die Variable `$event` hinzu.

```html
<button ng-click="buttonClickFn($event)">Klick mich!</button>
```

Wenn wir uns die Direktive dazu angucken, ist das Geheimnis schnell gelüftet:

> Diese Directive ist extrem vereinfacht. Sie ist abgeleitet vom allgemeinen Fall aus [ngEventDirs.js](https://github.com/angular/angular.js/blob/master/src/ng/directive/ngEventDirs.js)

```javascript
.directive('ngClick', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function(event) {
        $parse(attrs.ngClick)(scope, { $event: event });
        scope.$apply();
      });
    }
  }
});
```

An dieser Stelle wird `$parse` mit einer Besonderheit genutzt. Statt einfach nur einen Scope zu übergeben, kann über einen weiteren Parameter noch ein Objekt übergeben werden. Dieses Objekt wird mit dem Scope zusammengeführt.

## Abschluss

Ich hoffe dieser hat euch geholfen, AngularJS etwas besser zu verstehen. Ist noch irgendwas unklar? - Dann füge ich gerne noch Beispiele hinzu.
