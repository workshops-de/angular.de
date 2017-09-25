---
title: "ES6 mit Browserify und Babel in AngularJS"
description: "In diesem Artikel zeige ich ein paar kleine Erweiterungen, die Euch die Entwicklung mit AngularJS erleichtern und gleichzeitig auf die Zukunft mit Angular2 vorbereiten."
author: "Robin Böhm"
slug: "angularjs-es6-browserify-babel-module-laden"
published_at: 2015-08-20 08:58:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-es6-browserify-babel-module-laden.jpg"
---

In diesem Artikel zeige ich ein paar kleine Erweiterungen, die Euch die Entwicklung mit AngularJS 1 erleichtern und gleichzeitig auf die Zukunft mit Angular2 vorbereiten. Es ist jetzt schon möglich Quellcode zu schreiben, der nahe an Angular2 ist. Ein Test-Projekt könnt Ihr auf [GitHub](https://github.com/angularjs-de/angularjs-de-seed-es6) finden. Schickt gerne eigene Pull-Requests oder Issues und optimiert gemeinsam mit mir!

**Inhalt:**

* Aktueller Stand (Plain ES5)
* Lösung mit Browserify (ES5)
* Lösung mit Babelify (ES6)
* Fazit

# Der aktuelle Stand und die Probleme

Klassisch müsst ihr all eure Skripte in die *index.html* einzubinden, damit Controller, Services, etc. geladen werden. Vielleicht wart Ihr bereits genervt von dem ständigen Nachtragen, dass Ihr Pakete wie z.B. [gulp-htmlbuild](https://www.npmjs.com/package/gulp-htmlbuild) benutzt, welche euch diese Einträge automatisch in eure HTML-Datei einfügen. Egal, ob wie ihr es momentan handhabt, Euer Code sollte ungefähr so ausschauen:

```html
<!-- index.html -->
<script src="components/BookData/services/book-data.module.js"></script>
<script src="components/BookData/services/book-data.service.js"></script>

<script src="src/app.js"></script>
```

Der JavaScript-Code sollte bei ungefähr so aussehen:

```javascript
// app.js
angular.module('myApp', ['myApp.bookData'])

// book-data.module.js
angular.module('myApp.bookData', [])

// book-data.service.js
angular.module('myApp.bookData').service('BookData', ...)
```

Somit müsst Ihr an mehreren Stellen das Modul eintragen, um es nutzen zu können. Richtig problematisch wird es aber erst, wenn Ihr ein Modul umbenennen wollt. Ist es dann noch ein Modul mit Kernfunktionalitäten, das Ihr in verschiedenen Modulen referenziert, müsst Ihr es überall umbenennen.

Habt Ihr die ganzen Sourcen in einem einzigen Paket geht das noch mit *Suchen und Ersetzen*. Habt Ihr aber ggfs ein öffentliches Modul oder semi-öffentlich im eigenen Unternehmen, welches in verschiedenen Projekten verteilt ist, wird der Prozess schon deutlich schwerer!

Um dieses Problem zu vereinfachen hilft euch hierbei Browserify und eine Konvention!

# Module laden mit Browserify (ES5)

Browserify ist ein NodeJS-Modul, welches es euch erlaubt die von NodeJS bekannte CommonJS-Syntax und den `require`-Befehl auch im Browser zu benutzen. Der große Vorteil ist: Ihr müsst jetzt nur noch einen Einstiegspunkt in euer `index .hmtl`definieren. Eure Scripte können damit auf andere Skripte relativ zum File-System bzw auf Dateien im Ordner `node_modules` zeigen.
Das Ganze sieht so aus:

```javascript
// app.js
angular.module('myApp', [require('../components/bookData/book-data.module')])
```

Fällt euch etwas auf? Richtig! Wir müssen hierbei nichtmehr auf den Modulnamen achten. Aber wie ist das möglich? - Schauen wir uns die Definition dieser Datei an!

```javascript
// book-data.module.js
angular.module('myApp.bookData', [])
  .service('BookData', require('./book-data.service'));

export 'myApp.bookData';
```

Was passiert hier also genau? Wenn wir die Datei anfragen, wird diese geladen und ihr Code ausgeführt. Somit registrieren wir das neue Modul inklusive dem Service über die globale Variable `angular.module()`. Über den Befehl `export` geben wir den Rückgabewert an, den wir erhalten wenn wir das Modul per `require(''../components/bookData/bookData.module')` einbinden. Diesen Wert legen wir dann direkt in das Dependency-Array und können uns somit die lästige Umbenennung an verschiedenen Orten sparen! Eine echte Erleichterung für Wartung und Refactoring!

## index.js oder package.json

Um die Schreibweise weiter zu vereinfachen, haben wir unter anderem diese zwei Möglichkeiten:

Ihr könnt eure `bookData.module.js` in `index.js`umbenennen. Der Module-Loader erkennt diese Datei automatisch wenn Ihr eine komplette Komponente per Ordner referenziert.

```javascript
// app.js
angular.module('myApp', [require('../components/bookData')])
```

Dies erspart uns wieder ein wenig Schreibarbeit. Diese Schreibweise bringt allerdings auch einen Nachteil: Wenn Ihr euch gerne in euer IDE mit *Navigate-To-File* Funktionen bewegt bekommt Ihr sehr schnell folgende Ansicht:

![IDE-Index-js-navigate-to-file.png](IDE-Index-js-navigate-to-file-small.png)

Die zweite Alternative ist, eine eigene `package.json` für die Komponente anzulegen. Der wichtige Parameter für das Laden unseres Modules ist hierbei: `main`.

```json
{
  "name": "myApp.bookData",
  "version": "0.0.1",
  "description": "A simple BookData component",
  "main": "book-data.module.js",
  "dependencies": {
    "angular": "1.4.3"
  }
}
```

Hier könnt Ihr neben dem Main-File auch weitere Metadaten wie z.B. die Abhängigkeiten der Komponente exakt definieren. In beiden Varianten könnt Ihr euer Modul auch über *npm* veröffentlichen und installieren. Damit wird die Schreibweise dann noch ein wenig eleganter.

```javascript
angular.module('myApp', [require('myApp.bookData')])
```

## AngularJS Pakete via npm installieren und mit Browserify einbinden

Die AngularJS-Pakete sind selber auch auf diese Möglichkeit optimiert. Somit könnt Ihr sehr einfach weitere Framework-Module einbinden und einbinden.

```shell
$ npm install angular-animate angular-aria angular-route --save
```

Da diese Module nun in unserem *node_modules* Ordner liegen(sofern nicht anders konfiguriert), können wir diese direkt referenzieren.

```javascript
angular.module('myApp', [
  require('angular-animate'),
  require('angular-aria'),
  require('angular-route'),
  require('myApp.bookData'),
]
```

Schauen wir uns an, was wir in Kombination mit Babel noch weiter erreichen können:

# Module laden mit Browserify und Babel (ES6)

Natürlich wollen wir uns langsam mit dem neuen JavaScript Sprachstandart ECMAScript 6 in Verbindung mit AngularJS beschäftigen. Dazu können wir z.B. den Transpiler [BabelJS](https://babeljs.io/) benutzen. Hierzu installieren wir uns zuerst das Paket `babelify`.

```shell
$ npm install babelify --save
```

Weiter müssen wir in unseren Browserify Bundle-Prozess diesen Schritt als Transformation einfügen.

```javascript
browserify(bundleConfig).transform(babel);
```

Einen funktionierenden Gulp-Task findet Ihr als Beispiel auf [GitHub](https://github.com/angularjs-de/angularjs-de-seed-es6/blob/master/gulp/tasks/browserify.js#L37).

Nun können wir die neuen ES6 Features benutzen wie z.B. `import` und können unsere Datei dann schon in schönem neuen ES6-Code schreiben:

```javascript
// book-data.module
import angular from 'angular'

import BookDataService from './book-data.service'

angular.module('book-data', [])
  .service('BookData', BookDataService);

export default 'book-data';
```

Unserer BookData-Service:

```javascript
export default function ($http) {

  const baseUrl = 'http://ajs-workshop.herokuapp.com/api/books/';

  this.getAll = function () {
    return $http.get(baseUrl)
      .then(response => response.data);
  };

  this.getBookByIsbn = function (isbn) {
    return $http.get(baseUrl + isbn)
      .then(response => response.data);
  };
}
```

Unsere app.js:

```javascript
import angular from 'angular';
import angularRoute from 'angular-route'
import angularAria from 'angular-aria'

// Modules
import BookDataModule from '../components/book-data'
import BookListModule from '../components/book-list'
import BookDetailModule from '../components/book-detail'
import BookCreateModule from '../components/book-create'

// Configs
import RouteConfig from './configs/route.config'

angular.module('myApp', [

  // 3rd party || angular libs
  angularRoute,
  angularAria,

  // my libs
  BookDataModule,
  BookListModule,
  BookDetailModule,
  BookCreateModule
])
.config(RouteConfig);
```

# Fazit

Alles in allem können wir uns mit diesem Aufbau eine Menge an Schreibarbeit durch das manuelle Einbinden von Skript-Tags, aber auch Modul-Abhängigkeiten sparen. In Verbindung mit Babel sind wir dazu noch ein Stück weiter an Angular2 und können unsere Module für spätere Portierungen vorbereiten. Dazu werde ich in einem weiteren Artikel mehr schreiben. Die Erleichterung der Modul-Einbindung ist eine kleine aber im Entwickler-Alltag sehr angenehme Erweiterung.
