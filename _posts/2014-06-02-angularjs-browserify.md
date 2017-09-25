---
title: "Browserify und AngularJS - Dream Team für SPAs"
description: "Browserify ist eine interessante Alternative zu anderen gängigen Projekt-Setups. Der Mehrwert ist die Modularisierung des Codes und das einfache Einbinden von npm-Paketen."
author: "Bastian Krol"
slug: "angularjs-browserify"
published_at: 2014-06-02 07:00:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-browserify.jpg"
---

Mit [Browserify](http://browserify.org/) lassen sich client-seitige JavaScript-Projekte mit CommonJS-Modulen strukturieren, obwohl CommonJS-Module nicht nativ im Browser lauffähig sind. Browserify transformiert alle Module und ihre transitiven Abhängigkeiten und erzeugt eine einzige, im Browser lauffähige JavaScript-Datei – das Browserify-Bundle. Auch in AngularJS-Projekten lässt sich Browserify hervorragend einsetzen. Wie das geht, zeigt dieser Artikel.

## Warum Browserify?

Der größte Mehrwert beim Einsatz von Browserify ist die Modularisierung des Codes. JavaScript bietet bis einschließlich ECMAScript 5 kein in die Sprache integriertes Modulkonzept. Browserify/CommonJS steht damit in direkter Konkurrenz zu AMD mit Implementierungen wie RequireJS, aber auch zu ES6-Transpilern wie Traceur (ab ECMAScript 6 gibt es native Module). Meiner Meinung nach bietet Browserify eine ganze Reihe von Vorteilen.

Einer der Vorteile von Browserify (wenn nicht sogar *der* Hauptvorteil), ist die Möglichkeit, npm-Pakete direkt einzubinden. Die [npm-Registry](https://www.npmjs.com/) hält eine Vielzahl von JavaScript-Modulen für alle Lebenslagen bereit. Wer npm bisher nur als Paket-Manager für server-seitiges JavaScript (sprich Node.js) wahrgenommen hat, liegt damit nicht mehr ganz richtig – die npm-Registry enthält bereits eine große Anzahl von Paketen für den Browser. Klassiker wie jQuery, jQuery-UI und es5-shim sind per npm erhältlich. Und es werden stetig mehr, da vermehrt Frontend-Projekte ihre Releases per npm bereitstellen. Selbst Pakete, die eigentlich nicht (oder nicht ausschließlich) für den Einsatz im Browser gedacht sind, lassen sich dank Browserify oft in einem Frontend-Projekt nutzen.

Browserify ist damit eine sehr interessante Alternative zu anderen gängigen Projekt-Setups (RequireJS, Script-Tags, etc.)

## Wie funktioniert Browserify?

Browserify geht beim Transformieren der Sourcen von einem CommonJS-Modul aus, welches als *Entry Point* bezeichnet wird. Ausgehend von diesem Einstiegspunkt verfolgt es alle `require`-Statements in diesem Modul und nimmt alle Abhängigkeiten des Entry Points mit in das Bundle auf. Auch die `require`-Statements in den abhängigen Modulen werden aufgelöst und in das Bundle übernommen. Dieser Prozess wird rekursiv fortgeführt bis alle `require`-Statements verarbeitet wurden und das Bundle vollständig ist.

## AngularJS und Browserify

Setzt man Browserify ein, arbeitet man mit [CommonJS-Modulen](http://wiki.commonjs.org/wiki/Modules/1.0), inklusive der CommonJS-Konstrukte `exports`/`module.exports` und `require`. Möchte man nun außerdem AngularJS einsetzen, muss man sich mit der Frage beschäftigen, wie man CommonJS-Module und das Dependency-System von AngularJS miteinander kombiniert. Dazu gibt es bereits einige Beiträge.

## Code

Das [Beispiel-Repository](https://github.com/basti1302/angular-browserify) zu diesem Artikel ist auf GitHub verfügbar. Wer lieber Code statt Prosa liest, wird dort fündig. Die Beispiel-Anwendung ist, wie sollte es anders sein, eine App zum Verwalten von Todos. Das Beispiel-Repository lässt sich auch als Projekt-Template für eigene AngularJS-Projekte mit Browserify einsetzen.

## AngularJS einbinden

Bevor wir anfangen, unsere eigene App zu implementieren, müssen wir erstmal die AngularJS-Bibliotheken selbst einbinden. Bei Erstveröffentlichung dieses Artikels gab es vom AngularJS-Team weder offizielle Releases auf npm, noch gab es ein CommonJS-kompatible Version der AngularJS-Bibliotheken. Zum Glück hat sich seit dem einiges getan und das AngularJS-Team veröffentlicht von jedem Release auch eine CommonJS-kompatible Variante in der npm Registry. Das macht die ganze Sache deutlich einfacher. Dieser Artikel und das Beispiel-Repository sind dementsprechend angepasst worden.

Um die benötigten AngularJS-Bibliotheken zu installieren, reicht folgendes npm Kommando aus:

```shell
npm install --save angular angular-route
```

Nun sind angular-core und angular-route verfügbar. Um sie in unserer App zu nutzen müssen sie nur per `require` eingebunden werden, etwa so:

```javascript
var angular = require('angular');
```

## AngularJS und CommonJS miteinander verheiraten - ein Stück in drei Akten

In einem "normalen" AngularJS-Projekt (ohne Browserify) enthält üblicherweise jede JavaScript-Datei eine AngularJS-Entität, also entweder einen Controller, einen Service oder einen Provider etc. Der typische AngularJS-Boilerplate-Code um die Deklaration z. B. eines Controllers einzuleiten, könnte so aussehen:

*app/js/controller/todo.js:*

```javascript
(function() {
  'use strict';
  angular
    .module('todoApp')
    .controller('TodoCtrl', function($scope, TodoService) {
      // ...
    });
})();
```

Im einfachsten Fall werden alle Einzeldateien dann per Script-Tag in der HTML-Datei eingebunden:

*app/index.html:*

```html
...
<script src="/app/js/service/todos.js" type="text/javascript"></script>
<script src="/app/js/service/imprint.js" type="text/javascript"></script>
<script src="/app/js/controller/edit_todo.js" type="text/javascript"></script>
<script src="/app/js/controller/todo.js" type="text/javascript"></script>
<script src="/app/js/controller/todo_list.js" type="text/javascript"></script>
<script src="/app/js/controller/imprint.js" type="text/javascript"></script>
<script src="/app/js/controller/footer.js" type="text/javascript"></script>
// ... viele weitere Script-Tags
```

### Der naive Ansatz

Dies könnte man im Prinzip beim Einsatz von Browserify ähnlich handhaben. Das entsprechende CommonJS-Modul sähe dann so aus:

*app/js/controller/todo.js:*

```javascript
'use strict';
var angular = require('angular');

angular
.module('todoApp')
.controller('TodoCtrl', function($scope, TodoService) {
  // ...
});
```

Der einzige Unterschied im Controller ist, dass wir auf die [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression) verzichten können - CommonJS-Module sind per se voneinander isoliert und greifen nicht auf den globalen Scope zu. Daher benötigen wir hier das Statement

```javascript
var angular = require('angular');
```

Eine globale Variable `angular` gibt es im CommonJS-Kontext nicht.

Da Browserify aus allen CommonJS-Modulen eine einzige Datei erzeugt, werden die vielen Script-Tags in der `index.html` durch ein einziges Script-Tag für das Browserify-Bundle ersetzt. Diese Auflistung verlagert sich ins JavaScript, zum Beispiel in unseren Entry Point. Als Entry Point bietet sich die Datei an, in der das AngularJS-Modul deklariert wird:

*app/js/app.js:*

```javascript
'use strict';

var angular = require('angular');
var app = angular.module('todoApp', [ 'ngRoute' ]);

require('./service/todos');
require('./service/imprint');
require('./controller/edit_todo');
require('./controller/todo');
require('./controller/todo_list');
require('./controller/imprint');
require('./controller/footer');
// ... weitere require-Statements, eins pro Datei
```

Viel gewonnen haben wir dadurch noch nicht. Das müsste doch besser gehen.

### Eine index.js pro Source-Verzeichnis

Der erste Schönheitsfehler, den wir beseitigen, ist die lange Liste von `require`-Statements in `app.js`. In `app.js` geben wir nur noch die die *Verzeichnisse* an, aus denen wir Module importieren wollen.

*app/js/app.js:*

```javascript
'use strict';

var angular = require('angular');
var app = angular.module('todoApp', []);

// ein require-Statement pro Unterverzeichnis statt eins pro Datei
require('./service');
require('./controller');
```

Übergibt man der `require`-Funktion als Argument ein Verzeichnis statt einer Datei, wird in diesem Verzeichnis automatisch die Datei `index.js` gesucht und diese eingebunden. Wir legen also in jedem Verzeichnis eine `index.js` an, in der wir festlegen, welche Dateien aus diesem Verzeichnis inkludiert werden sollen:

*app/js/controller/index.js:*

```javascript
'use strict';

require('./edit_todo');
require('./footer');
require('./todo');
require('./todo_list');
require('./imprint');
```

Kleine Anmerkung am Rande: Über sinnvolle Ordner-Strukturen für AngularJS-Projekte wurde an vielen anderen Stelle schon ausgiebig diskutiert. Die hier gemachten Vorschläge sind unabhängig davon, ob man seine Ordner-Struktur technisch anlegt (controller, service, directive, ...) oder sich an der Fachlichkeit orientiert.

Damit haben wir schon ein bisschen mehr Ordnung geschaffen. Trotzdem benutzen wir Browserify immer noch primär als überdimensioniertes Werkzeug zur Skript-Konkatenierung – irgendwie unbefriedigend.

### Wohin mit dem AngularJS-Boilerplate-Code?

Unsere nächste Optimierung betrifft den üblichen AngularJS-Boilerplate-Code, um eine AngularJS-Entität zu definieren. Statt diesen Code in das jeweilige CommonJS-Modul zu schreiben, können wir das auch in den `index.js`-Dateien abfrühstücken:

*app/js/controller/index.js:*

```javascript
'use strict';
var app = require('angular').module('todoApp');

app.controller('EditTodoCtrl', require('./edit_todo'));
app.controller('FooterCtrl', require('./footer'));
app.controller('TodoCtrl', require('./todo'));
app.controller('TodoListCtrl', require('./todo_list'));
app.controller('ImprintCtrl', require('./imprint'));
```

Die einzelnen CommonJS-Module für die Controller und Services kommen dann ohne AngularJS-spezifischen Code aus:

*app/js/controller/todo.js:*

```javascript
'use strict';

module.exports = function($scope, TodoService) {
  // ...
};
```

Insgesamt kommt der Code jetzt schon deutlich aufgeräumter daher. Ein positiver Effekt dieses Vorgehens ist die bessere Testbarkeit der AngularJS-Entitäten (siehe nächster Abschnitt).

## Unit-Tests

Dass die einzelnen CommonJS-Module nun nur noch jeweils aus einer Funktion bestehen, die nicht AngularJS-spezifisch ist, hat einen weiteren Vorteil: Wir sind beim Schreiben der Unit-Tests unabhängig von AngularJS, können also jedes beliebige Test-Framework einsetzen. Hier ein Beispiel mit [Mocha](https://mochajs.org/) und [Chai](http://chaijs.com/):

*test/unit/service/todos.js:*

```javascript
'use strict';

var chai = require('chai');
var expect = chai.expect;

var TodoServiceModule = require('../../../app/js/service/todos.js');

describe('The TodoService', function() {
  var TodoService;

  beforeEach(function() {
    TodoService = new TodoServiceModule();
  });

  it('should have some todos initially', function() {
    var todos = TodoService.getTodos();
    expect(todos.length).to.equal(4);
    expect(todos[0].title).to.equal('Buy milk');
  });
});
```

Diese Tests lassen sich unabhängig von AngularJS und insbesondere unabhängig vom Browser durchführen. Sie können z. B. einfach per Mocha in Node.js ausgeführt. Das erlaubt sehr schnelles Feedback und lässt sich (da es headless läuft) sehr einfach in einen CI-Build integrieren.

Zusätzlich sollte man die Unit Tests aber auch gelegentlich in echten Browsern ausführen, da es diffizile Unterschiede zwischen Node.js und den JavaScript-Runtimes in manchen Browsern geben kann. Mit Mocha lassen sich Tests z. B. einfach dadurch im Browser ausführen, dass man sowohl die Mocha-Library als auch die Tests in eine kleine [HTML-Datei](https://github.com/basti1302/angular-browserify/blob/master/test/browserified/index.html) packt. Da die Tests auch `require`-Statements enthalten, muss dazu auch erst mit Browserify ein Bundle aus den Tests erzeugt werden (s. u.).

Eine weitere Möglichkeit, die Tests im Browser auszuführen ist [Karma](http://karma-runner.github.io/0.12/index.html). Karma unterstützt auch Mocha-Test-Suites und lässt sich sehr gut als Build-Step in Task-Runner (Gulp, Grunt, ect.) einbauen. Auch das lässt sich gut in CI-Builds einsetzen.

## Kommandozeilen-Tools: Browserify & Watchify

Der Code kann noch so toll strukturiert sein, wenn er nicht im Browser läuft, ist das wenig wert. Um einen Haufen CommonJS-Module für den Einsatz im Browser aufzubereiten, müssen wir diese einmal durch Browserify laufen lassen:

```shell
browserify --entry app/js/app.js --outfile app/dist/app.js
```

Für den Entwicklungs-Workflow wäre es äußerst störend, müsste man nach jeder Änderung erst manuell Browserify aufrufen, damit man die Änderung im Browser testen kann. Dafür gibt es Watchify – Watchify läuft ständig im Hintergrund und beobachtet die Quell-Dateien. Sobald sich eine davon ändert, wird das Browserify-Bundle automatisch neu erzeugt. Der Aufruf entspricht dem von Browserify:

```shell
watchify --entry app/js/app.js --outfile app/dist/app.js
```

Um die Tests zu browserifien (z. B. um sie mit Karma auszuführen), kann man die folgenen Kommandos benutzen:

```shell
browserify test/unit/controller/*.js test/unit/service/*.js --outfile test/browserified/browserified_tests.js
```

bzw.

```shell
watchify test/unit/controller/*.js test/unit/service/*.js --outfile test/browserified/browserified_tests.js
```

Im Beispiel-Repository befinden sich im Verzeichnis `bin` Shell-Skripte zum Aufruf von [Browserify](https://github.com/basti1302/angular-browserify/blob/master/bin/browserify.sh) und [Watchify](https://github.com/basti1302/angular-browserify/blob/master/bin/watchify.sh).

## Gulp-Build, Live-Reload, Karma, Protractor und der ganze Rest

Noch etwas komfortabler als mit den Kommandozeilen-Tools Browserify und Watchify geht es mit einem Build-System. Hier ist [gulp.js](http://gulpjs.com) eine gute Wahl. Das Beispiel-Repository enthält einen `gulpfile.js` in dem die meisten Goodies, die man von einem JavaScript-Build-System erwartet, schon fertig eingerichtet sind:

* Linting der JavaScript-Sourcen mit ESlint

* Mocha Unit Tests durchführen (in Node.js),

* Sourcen mit Browserify verarbeiten (um ein nicht-minifiziertes Browserify-Bundle zu erzeugen),

* ngmin & uglify (um ein minifiziertes Browserify-Bundle zu erstellen),

* die Unit-Tests mit Browserify bundlen und per Karma im Browser ausführen,

* End-to-End-Tests mit Protractor ausführen,

* ein Server für statische Assets (gulp-connect) und

* Browser Live Reload.

Während der Entwicklung kann man z. B. einfach `gulp watch` im Hintergrund laufen lassen. Jedesmal, wenn man eine Source-Datei verändert, wird das Browserify-Bundle neu erzeugt und der Browser lädt automatisch das neue Bundle, so dass die Veränderungen direkt sichtbar sind.

## Fazit

Auch AngularJS-Projekte profitieren von Browserify. Es bietet einige nicht von der Hand zu weisende Vorteile:

* Modularisierung mit CommonJS

* einfache Verwendung von npm-Paketen

* bessere Testbarkeit, vereinfachtes Unit-Testing

* sehr ausgereiftes Tooling (Browserify-Kommandozeilen-Tool, Watchify, Gulp- und Grunt-Integration)

Dabei sind wir auf die fortgeschrittenen Möglichkeiten, die Browserify bietet, noch gar nicht eingegangen:

* [Transforms](https://github.com/substack/node-browserify/wiki/list-of-transforms)

* Verwendung von Node.js-Core-Modulen im Browser

* Source Maps

* Cloud-basierte Cross-Browser-Tests mit [testling-ci](https://ci.testling.com/)

Die Empfehlung des Tages lautet daher: Das nächste Projekt mal mit Browserify – und danach nie wieder ohne. :-)
