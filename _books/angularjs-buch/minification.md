---
number: 6.30
title: Verwendung von Minifiern
part: Konzepte und Hintergründe
progress: 75
---

Bei der Verwendung von AngularJS und Minifiern gibt es einen Fallstrick. Der Injektor von AngularJS erzeugt neue Objekte anhand der Namen, die einer Funktion übergeben werden. Nehmen wir als Beispiel einen Controller, der folgendermaßen aussieht:

```javascript
app.controller('MeinController', function($scope, MeinService) { ... }
```

Nach der Minifizierung könnte der Code folgendermaßen aussehen:

```javascript
app.controller('MeinController', function(a, b) { ... }
```

## Steuerung über $inject

Hier wird das Problem offensichtlich. Da nun `a` und `b` Funktionswerte übergeben werden, versucht der Injektor Instanzen von `a` und `b` statt von `$scope` und `MeinService` zu erzeugen. Um dieses Problem zu umgehen, müssen wir den Injektor in diesen Fällen direkt steuern. Die direkte Steuerung des Injektors erfolgt über  ein Arrays von Strings:

```javascript
var MeinController = function(a, b) {
  ...
}
MeinController.$inject = ['$scope', 'MeinService'];
```

Wie man sieht, haben wir den Erzeugung der Funktion leicht verändern müssen und eine temporäre Variable eingefügt. Außerdem müssen wir bei der Veränderung des Funktionsaufrufs unbedingt die Steuerung des Injektors nachziehen. Für Controller benutzen wir diese Art der Steuerung.

## Steuerung über inline-Annotation

Wenn wir Funktionen übergeben, die den Injektor benutzen, wird die Art der Steuerung, wie wir sie gerade kennengelernt haben, unbequem. Aus

```javascript
app.factory('todo', function($http) { ... });
```

wird

```javascript
var todoFactory = function(z) { ... };
todoFactory.$inject = ['$http'];
app.factory('todo', todoFactory);
```

Für diesen Fall gibt es noch eine zweite Schreibweise - die inline-Annotation.

```javascript
app.factory('todo', ['$http', function($http) {
  ...
}]);
```

## Alternative

> TODO

Die längere Alternative für den Injektor besteht nicht nur aus mehr Zeichen, sondern lässt sich auch schlechter lesen.

https://github.com/btford/ngmin

## Zusammenfassung

Keine der beiden Schreibweisen hat Vorteile gegenüber der Anderen - sie sind gleichwertig. Soweit Minification benutzt wird, müssen sie überall eingesetzt werden, wo der Injektor verwendet wird.
