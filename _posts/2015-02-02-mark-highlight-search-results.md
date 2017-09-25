---
title: "Filtern und Highlighting von Suchergebnissen"
description: "Das Durchsuchen von Tabellen lässt sich in Angular spielend lösen. Dieser Artikel zeigt euch, wie ihr mithilfe der `ui.utils` von `angular-ui`, die Suchbegriffe in den Ergebnissen markiert."
author: "Tilman Potthof"
slug: "mark-highlight-search-results"
published_at: 2015-02-02 09:49:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/mark-highlight-search-results.jpg"
---

Das Durchsuchen von Tabellen oder Listen lässt sich in Angular spielend lösen.
Dieser Artikel zeigt euch, wie ihr mithilfe der `ui.utils` von `angular-ui`, die Suchbegriffe in den Ergebnissen markiert.

Filter ermöglichen es Daten in Templates zu transformieren.
Das Ganze ist deshalb so praktisch, weil die Filter mit der Pipe-Syntax `|` funktionieren, die aus UNIX-Shells bekannt ist.
Damit lassen sich Transformationen viel besser verketten, als mit verschachtelten Funktionsaufrufen.

```html
{{ 'Hallo Welt' | uppercase | limitTo:5 }}
```

Dieses wenig nützliche Beispiel erzeugt die Ausgabe *HALLO*.


## Der Filter-Filter

Ein wenig verwirrend ist, dass es den Filter namens `filter` ([filter Dokumentation](https://docs.angularjs.org/api/ng/filter/filter)) gibt, mit dem man Listen filtern kann.
Besonders praktisch ist er im Einsatz mit der `ng-repeat` Direktive.

```html
<input type="text" ng-model="searchTerm"/>
<ul>
  <li ng-repeat="name in names | filter:searchTerm">{{ name }} </li>
</ul>
```

## Markieren des Suchbegriffs

Selbst komplexere Filter lassen sich auf diese Weise sehr einfach bauen.
Wenn man jetzt den Suchbegriff hervorheben möchte, dann lässt sich das nicht mehr einfach mit Bordmitteln lösen, aber dafür gibt es eine Vielzahl an Open-Source-Modulen.
Für unseren Anwendungsfall nehmen wir das Modul [`ui.utils`](http://angular-ui.github.io/ui-utils) aus dem populären Projekt [`angular-ui`](http://angular-ui.github.io/).

Zusätzlich wird noch das Angular-eigene Modul `ngSanitize` benötigt, da wir zum Hervorheben des Suchbegriffs zusätzliche HTML-Elemente rendern müssen, die in den Template-Expressions einfach *escaped* und als Text gerendert würden.

```html
<script src="http://angular-ui.github.io/ui-utils/dist/ui-utils.js"></script>
<script src="https://code.angularjs.org/1.3.10/angular-sanitize.js"></script>
```

Die beiden Abhängigkeiten müssen jetzt nur noch in unser eigenes App-Modul eingebunden werden und schon können wird die gewünschten Komponenten verwenden.

```javascript
angular.module('highlightDemo', ['ngSanitize','ui.utils']);
```

Das ist zum einen der Filter `highlight`, der dafür sorgt, dass ein Suchbegriff in einem String mit einem `span.ui-match` Element verpackt wird.
Für die CSS-Klasse `ui-match` kann man dann eine eigene Regel hinterlegen, wie der Suchbegriff hervorgehoben werden soll.
Als Zweites benötigen wird die Direktive `ng-bind-html`, die ermöglicht, dass die vom Filter erzeugten `span.ui-match` Elemente nicht als Text angezeigt werden.
Zusammen mit dem `filter` Filter und der `ng-repeat` Direktive sieht der Code dann so aus:

```html
<input type="text" ng-model="languageFilter"/>
<ul>
  <li ng-repeat="language in programmingLanguages | filter:languageFilter">
    <span ng-bind-html="language | highlight:languageFilter"></span>
  </li>
</ul>
```

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/8usO3m16k7BYDFsiNPap/preview.html" style="width:100%;height:150px;border:0"></iframe>

## Komplexe Suche

Der `hightlight` Filter lässt sich auch mit komplexeren Daten und weiteren Filter kombinieren.
Zum Generieren von Dummy-Daten gibt es den super Service [Random User Generator](https://randomuser.me/), mit dem man sich komplette Zufalls-Benutzer inklusive Bild generieren lassen kann (Beispiel: [http://api.randomuser.me/?results=100](http://api.randomuser.me/?results=100)).
Das JSON für die Benutzer sieht dann so aus:

```json
{
  "user": {
    "gender": "female",
    "name": {
      "title": "mrs",
      "first": "lucille",
      "last": "owens"
    },
    "location": {
      "street": "7390 royal ln",
      "city": "cape fear",
      "state": "alabama",
      "zip": "84370"
    },
    "email": "lucille.owens15@example.com",
    "username": "bluewolf159",
    "password": "phat",
    "salt": "FNS5hEao",
    "md5": "f39bd5efd9d77f330bdc860366924185",
    "sha1": "eb9e06383793bc480c92cd1be8abc8d36192e526",
    "sha256": "5454994b1bfd5db4dfe671646bb451dd821ec77db8a3aaee92df123c6617ae30",
    "registered": "1250870431",
    "dob": "4926174",
    "phone": "(126)-453-6024",
    "cell": "(652)-565-4839",
    "SSN": "424-87-7381",
    "picture": {
      "large": "http://api.randomuser.me/portraits/women/79.jpg",
      "medium": "http://api.randomuser.me/portraits/med/women/79.jpg",
      "thumbnail": "http://api.randomuser.me/portraits/thumb/women/79.jpg"
    },
    "version": "0.4.1"
  },
  "seed": "ac03c1fd213dfae4"
}
```

Um die verschachtelten Attribute wie Namensbestandteile und die Adresse einfach im Template einzubinden, können wir uns eigene Filter erstellen. Der vollständige Code mit Modul-Definition und Controller sieht dann wie folgt aus:

```javascript
angular.module('userTable', ['ngSanitize','ui.utils']);
angular.module('userTable').controller('userTableController', function($scope, $http) {
  $http.get("users.json").success(function(users) {
    $scope.users = users;
  });
});
angular.module('userTable').filter('name', function() {
  return function (user) {
    var name = user.user.name;
    return name.first + " " + name.last;
  };
});
angular.module('userTable').filter('email', function() {
  return function (user) {
    return user.user.email;
  };
});
angular.module('userTable').filter('address', function() {
  return function (user) {
    var location = user.user.location;
    return location.street + "<br/>" + location.city + "<br/>" + location.zip + " " + location.state;
  };
});
```

In dem Template lassen sich die Attribut-Filter mit dem `highlight` Filter und der `ng-bind-html` Direktive einfach verbinden.

```html
<td ng-bind-html="user | name | highlight:searchTerm"></td>
```

Und das Ganze als Template mit Such-Feld und Benutzer-Tabelle:

```html
<body ng-controller="userTableController">
  <input type="text" ng-model="searchTerm" />
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="user in users | filter:searchTerm">
        <td>
          <img class="user-thumb" src="{{user.user.picture.thumbnail}}" />
        </td>
        <td ng-bind-html="user | name | highlight:searchTerm"></td>
        <td ng-bind-html="user | email | highlight:searchTerm"></td>
        <td><small ng-bind-html="user | address | highlight:searchTerm"></small></td>
      </tr>
    </tbody>
  </table>
</body>
```

Das fertige Beispiel auf Plunker:

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/mNPRyvaBQxBrlElCs7UQ/preview.html" style="width:100%;height:350px;border:0"></iframe>

## Fazit

Filter sind ein mächtiges Konzept, um Daten für Templates zu transformieren und eigene Filter lassen sich leicht implementieren.
Gleichzeitig sorgt die sehr aktive Community rund um AngularJS dafür, dass es für viele Standard-Probleme schon Module mit hilfreichen Komponenten gibt.
Die Modulsammlung `angular-ui` ist nur eine von vielen Open-Source Modulen und das Suchen lohnt sich!
