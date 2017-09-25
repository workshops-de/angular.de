---
title: "ng-repeat - Der Teufel im Schafspelz"
description: Lerne, was du beim Verwenden von ng-repeat beachten musst. Insbesondere, wenn du Objekte übergibst.
author: "Philipp Tarasiewicz"
slug: "angularjs-ng-repeat"
published_at: 2013-06-05 14:30:20.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-ng-repeat.jpg"
---

Als AngularJS-Entwickler kommen wir an der Direktive *ng-repeat* nicht vorbei. Ganz im Gegenteil: So ziemlich jede Anwendung, die mit Collections operiert, benötigt den Einsatz dieser Direktive, um die Sammlungen von Daten in einer View bequem ausgeben zu können. Auf den ersten Blick sieht *ng-repeat* dabei völlig harmlos aus und jedem Entwickler erscheint offensichtlich, welche Logik sich hinter diesem Konstrukt verbirgt. Wenn man jedoch genauer hinschaut, gibt es einige Besonderheiten, die zu beachten sind.

## Grundlagen

Die *ng-repeat* Direktive dient dazu, JavaScript-Collections in einer View auszugeben. Dabei ist eine Collection im Sinne von JavaScript entweder ein Array oder ein Objekt, welches als Hashtable-Datenstruktur "missbraucht" wird. Der Einfachheit halber werden wir im Folgenden den Begriff "Hash" für solche Objekte benutzen. Rein technisch gesehen ist das Element (und seine Kindelemente), auf die die Direktive wirkt, selbst wieder ein Template, das beim Ausführen von *ng-repeat* mehrfach instanziiert wird. *Dabei gilt es zu beachten, dass jede Instanz ihren eigenen Scope bekommt.* Man kann nun das folgende einfache Beispiel konstruieren:

```html
<ul>
  <li ng-repeat="user in users">{{user.name}}</li>
</ul>
```


Damit das obere Beispiel funktioniert, muss in dem Scope, in dem das Template lebt, die Variable `users` auf ein Array oder auf einen Hash verweisen. Darüber hinaus muss dieses Array (bzw. der Hash) User-Objekte enthalten, die zumindest ein Attribut `name` besitzen. Das Ergebnis dieses Beispiels wäre die bequeme Ausgabe dieses Arrays, welche sich im Falle einer Array-Modifikation bzw. Modifikation der einzelnen User-Objekte automatisch aktualisieren würde. Im Falle von Hashes gibt es noch eine erweiterte Syntax, mit der man auf den Schlüsselwert zugreifen kann.

```html
<ul>
  <li ng-repeat="(key, user) in users">{{key}} ist zugeordnet: {{user.name}}</li>
</ul>
```


## Scope-Besonderheiten

Wie oben bereits erwähnt, bekommt jede Instanz des durch *ng-repeat* instanziierten Templates einen eigenen Scope. Wir müssen uns darüber im Klaren sein, weil uns diese Tatsache unter Umständen in eine unangenehme Situationen bringen kann. Wenn wir z.B. innerhalb der *ng-repeat* Direktive Formular-Eingabefelder dynamisch konstruieren und diese Eingabefelder mittels *ng-model* ein Zwei-Wege Data Binding zu einer im Scope definierten Variable eingehen, dann referenziert die *ng-model* Direktive in diesem Fall zunächst eine Variable, die innerhalb der Scopes der entsprechenden Template-Instanzen lebt. Es wird nicht - wie man als Unwissender erwarten könnte - die Variable eines übergeordneten Controllers referenziert. Diese Besonderheit kann man in folgendem \[Fiddle\]\[1\] genauer nachvollziehen. Dadurch, dass die durch *ng-repeat* konstruierten Scopes prototypisch von dem übergeordneten Controller-Scope erben, haben die Eingabefelder alle eingangs denselben Wert. Auch die Änderungen des Werts in dem oberen Controller-Eingabefeld werden in die durch *ng-repeat* erzeugten Unter-Scopes richtig synchronisiert. Zumindest solange wir mit den unteren Feldern noch nicht interagiert haben. Die Änderungen der unteren drei Felder werden aber nicht zurück in das obere Controller-Feld synchronisiert und selbstverständlich auch nicht untereinander. Eben, weil die referenzierten Variablen in unterschiedlichen Scopes leben.

## Filter-Besonderheiten

Ein sehr nettes Feature von *ng-repeat* ist die Tatsache, dass man die zugrundeliegende Collection auch filtern kann. Dazu bietet AngularJS uns den offensichtlich benannten Filter `filter`, welcher folgendermaßen zu nutzen ist.

```html
ng-repeat="item in items | filter: {string | Object | function()}"
```


Wir können diesen Filter also auf drei verschiedene Arten nutzen, um die Ausgabe unserer Daten-Sammlungen einzuschränken:

1.  Mit einem String als Eingabe wird dieser String als Suchbegriff interpretiert. Falls die Elemente der Collection also selber Strings sind, dann wird mittels des Suchbegriffs ein *substring*-Vergleich auf den Strings der Collection durchgeführt. Wenn die Collection-Elemente Objekte sind, dann werden von allen Objekten alle String-Attribute mit einem *substring*-Vergleich auf Basis des Suchbegriffs untersucht.

2.  Mit einem Objekt als Eingabe kann man die Menge der zu untersuchenden Attribute der Collection-Objekte einschränken. Dabei benennen wir die Attribute, anhand derer gefiltert werden soll, als Objekt-Attribute mit entsprechenden Sucheinschränkungen.

3.  Wird ein Funktionname als Eingabe gewählt, erwartet *ng-repeat* in dem übergeordneten Scope eine Funktion gleichen Namens. Diese Funktion wird für jedes Element der Collection einmal aufgerufen und das entsprechende Element wird ihr als einziger Parameter übergeben. AngularJS erwartet, dass diese Funktion `true` oder `false` zurückgibt. Stellvertretend dafür, dass ein Element in die Ausgabe mit aufgenommen werden soll `(true)` oder nicht `(false)`.

Für die ersten beiden Möglichkeiten gibt es [in der offiziellen AngularJS Dokumentation](http://docs.angularjs.org/api/ng.filter:filter) ein nettes Beispiel. Die dritte Möglichkeit wird in dem folgenden Beispiel nochmals veranschaulicht:

```html
<ul>
  <li ng-repeat="user in users | filter:isBigSpender">{{user.name}}</li>
</ul>
```


JavaScript:

```javascript
function UserCtrl($scope) {
  $scope.users = [
    {name: 'Robin', age: 47, salary: 80000},
    {name: 'Sascha', age: 39, salary: 40000},
    {name: 'Phil', age: 35, salary: 20000}
  ];

  $scope.isBigSpender = function(user) {
    if (user.age >= 40 && user.salary >= 60000) {
      return true;
    }

    return false;
  };
}
```


Wie wir erkennen können, soll das Array *users* mithilfe der Funktion *isBigSpender(…)* gefiltert werden. Als "Big Spender" gilt in diesem Beispiel jemand, der min. 40 Jahre alt ist und min. 60.000 EUR im Jahr verdient. :-) Die Logik muss entsprechend der oberen Beschreibung in einer Funktion innerhalb des Scopes des übergeordneten *UserCtrl* definiert sein. In diesem Beispiel würde also nur Robin zur Ausgabe kommen.

Auch beim Filtern gibt es aber etwas, das wir beachten müssen. Mit dem `filter`-Filter lassen sich in Verbindung mit *ng-repeat* leider nur Arrays filtern. D.h. obwohl wir mit *ng-repeat* problemlos Hashes ausgeben können, erfahren diese durch den Filter keinerlei Einschränkung. Wer Hashes dennoch filtern möchte, hat dazu die folgenden beiden Möglichkeiten:

1.  Anstatt den Hash in dem *ng-repeat*-Konstrukt direkt anzugeben, können wir eine Funktion angeben, die einen Hash zurückliefert. Somit haben wir die Möglichkeit in dieser Funktion unsere ursprüngliche Collection beliebig zu filtern. Auch diese Funktion muss in dem übergeordneten Scope definiert werden.

2.  Wir können einen eigenen Filter schreiben, der im Prinzip das gleiche tut wie unsere Funktion innerhalb der ersten Möglichkeit. Der eigene Filter hat allerdings den Vorteil, dass man der gewöhnlichen Filter-Syntax mit der Pipe folgen kann. Somit bleibt das Markup der Views lesbarer.

Für beide Möglichkeiten folgt jetzt noch ein Beispiel:

### Beispiel 1: Filtern von Hashes mittels Controller-Funktion

```html
<ul>
  <li ng-repeat="user in getBigSpenderUsers(users)">{{user.name}}</li>
</ul>
```


JavaScript:

```javascript
function UserCtrl($scope) {
  // $scope.users ist ein Hash (und kein Array!)
  $scope.users = {
    one:  {name: 'Robin', age: 47, salary: 80000},
    two:  {name: 'Sascha', age: 39, salary: 40000},
    three:  {name: 'Phil', age: 35, salary: 20000}
  };

  $scope.getBigSpenderUsers = function(users) {
    var result = {};

    angular.forEach(users, function(user, key) {
      if (user.age >= 40 && user.salary >= 60000) {
        result[key] = user;
      }
    });

    return result;
  };
}
```


### Beispiel 2: Filtern von Hashes mittels eigenem Filter

```html
<ul>
  <li ng-repeat="user in users | bigSpender">{{user.name}}</li>
</ul>
```


JavaScript:

```javascript
// Der Controller definiert hier nur die Collection
function UserCtrl($scope) {
  // $scope.users ist ein Hash (und kein Array!)
  $scope.users = {
    one:  {name: 'Robin', age: 47, salary: 80000},
    two:  {name: 'Sascha', age: 39, salary: 40000},
    three:  {name: 'Phil', age: 35, salary: 20000}
  };
}

// Der 'bigSpender' Filter
angular.module('app').filter('bigSpender', function() {
  return function(users) {
    var result = {};

    angular.forEach(users, function(user, key) {
      if (user.age >= 40 && user.salary >= 60000) {
        result[key] = user;
      }
    });

    return result;
  };
});
```


## Fazit

Zusammenfassend lässt sich sagen, dass die *ng-repeat* Direktive die Ausgabe von Collections sehr bequem macht. Jedoch muss man sie zu nutzen wissen und ihre kleinen Stolperfallen kennen. Diese Dinge sind uns in dem letzten Projekt stark aufgefallen, weil wir dort sehr stark mit Hashtable-artigen Strukturen arbeiten und diese mit *ng-repeat* zur Ausgabe bringen. Habt Ihr darüber hinaus noch weitere unerfreuliche Erfahrungen mit *ng-repeat* gemacht? Diskutiert drüber im Kommentarbereich!
