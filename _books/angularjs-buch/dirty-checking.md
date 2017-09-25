---
number: 6.80
title: Dirty-Checking / Updatezyklus
description: Lerne, wie die Magie hinter AngularJS funktioniert. Du erfährst, wie das automatische Aktualisieren funktioniert und auf was du aufpassen musst.
part: Konzepte und Hintergründe
progress: 50
---

Um Model und View synchron zu halten, gibt es verschiedene Möglichkeiten. Wir beleuchten zuerst den Fall, den viele andere Frameworks nutzen und gehen danach auf die Methode von AngularJS ein.

## Beobachter Entwurfsmuster

Die meisten bekannten Frameworks setzen auf das Entwurfsmuster des [Beobachters](http://de.wikipedia.org/wiki/Beobachter_(Entwurfsmuster)) (auch Observer oder publish-subscribe). Dabei werden Werte nicht direkt verändert, sondern über Zwischenfunktionen (Getter/Setter).

Schau wir uns als Beispiel Ember.js an:

```javascript
App.TodosController = Ember.ArrayController.extend({
  addTask = function() {
    this.pushObject(Ember.Object.create({name: this.get(newTaskName), done: false}));
    this.set('newTaskName', '');
  }
});
```

EmberJS "erben" wir hier von der Function `ArrayController` und benutzen Getter und Setter, um Werte zu verändern. Das bedeutet, wenn wir z.B. `this.set('newTaskName', '')` aufrufen, ändert die `set`-Methode erst *newTaskName* auf den leeren String. Danach schaut die `set`-Methode nach, ob irgendjm. an Änderungen von *newTaskName*  interessiert ist. Jeder, der interessiert ist, wird über die Änderung informiert.

Pseudo-Code

```javascript
function set(name, value) {
  attributes[name] = value;
  observers[name].forEach(function(observer){
      observer.notify(value);
  }) ;
}
```

Der Pseudo-Code soll euch zeigen, dass `name = 'meinWert'` nicht reichen würde. Dabei würden die Observer nämlich nie mitbekommen, dass sich etwas verändert hat. Die Frage ist nun, wieso man in AngularJS einfach POJO (Plain Old JavaScript Objects) benutzen kann und keine Getter/Setter braucht.

## AngularJS und effektives Dirty-Checking

Fangen wir auch für AngularJS mit einem Code-Beispiel an:

```javascript
app.controller('TodosCtrl', function($scope) {
  $scope.todos = [];
  $scope.addTodo = function() {
    $scope.todos.push({name: $scope.newTodoName, done: false});
    $scope.newTodoName = '';
  }
});
```

Diesmal haben wir keine Getter/Setter, sondern benutzen ein normales JavaScript-Array. Schon in unseren ersten Schritten mit AngularJS haben wir gesehen, dass eine Liste von Aufgaben mit `<li ng-repeat="todos">{{name}}</li>` in der View aktualisiert wird. Was macht AngularJS so anders, dass es funktioniert?

**Die Antwort lautet Dirty Checking.** In der View könnt ihr nur Variablen benutzen, die auf `$scope` definiert wurden. `$scope` ist dabei ein einfaches Objekt (verschachtelte Scopes werden durch Prototypen vererbt). Von dem Scope-Objekt hält AngularJS immer eine Kopie vor. Wenn wir nun ein Scope-Objekt verändert haben, werden die alte und neue Version verglichen.

Soviel als Überblick. Jetzt sollten wir uns die Frage stellen, wann das Dirty-Checking ausgeführt wird. Jede Sekunde, alle 500ms oder auf ein Ereignis hin?

Tatsächlich wird das Dirty-Checking auf alle möglichen Ereignisse hin gestartet. Gehen wir hier ein paar Beispiele durch, um es verständlicher zu machen:

### Direktiven

Nehmen wir als Beispiel `<button ng-click="save()">Speichern</button>` aus einem HTML-Template. AngularJS macht daraus etwa wie folgt:

```javascript
$('button').on('click', function(){
  save();
  starteDirtyChecking();
})
```

Bei `ng-model` würde dies genauso funktionieren. Allerdings wird das Dirty-Checking bei jedem Tastendruck aufgerufen.

### Services

AngularJS hat einen `$timeout`-Service. Im Vergleich zu einem normalen setTimeout führt dieser auch nach jedem Aufruf das Dirty-Checking aus.

```javascript
setTimeout(function(){
  meinFunctionsAufruf();
  starteDirtyChecking();
}, 1000)
```

## Tragweite

Wir haben erfahren, wann das Dirty-Checking ausgeführt wird. Jetzt gehen wir noch auf das *Wo* ein. Was wir bisher mit `starteDirtyChecking()` als Pseudo-Code aufgeschrieben haben, führt eigentlich ein `scope.$apply()` aus. Die `$apply()`-Funktion überprüft alle Scopes beginnend vom `$rootScope` an.

## Performance

Besonders vielen Daten auf den Scopes, kann Dirty-Checking sehr langsam werden. Genauer gehen wir im Performance-Kapitel darauf ein.
