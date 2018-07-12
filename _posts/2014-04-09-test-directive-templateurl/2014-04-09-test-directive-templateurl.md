---
title: "Testen von Direktiven mit templateUrl"
description: "Lernt, wie ihr beim Testen von Direktiven den Fehler \"Unexpected request\" vermeidet und Templates in AngularJS testet."
author: "Robin Böhm"
published_at: 2014-04-09 07:23:00.000000Z
categories: "angularjs"
---

Fast in jedem Projekt nutzen wir Direktiven, die mit Templates arbeiten. Diese verweisen mit dem Parameter `templateUrl` auf eine Datei, die während der Laufzeit der Anwendung per HTTP-Request nachgeladen wird.

```javascript
angular.module('angularjsDE')
  .directive('templateUrlDirective', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/TemplateUrlDirective.html'
    };
  });
```


Möchte man diese Direktive testen, stopelt man relativ schnell über folgenden Fehler:

> Error: Unexpected request: GET views/TemplateUrlDirective.html

Zum Testen benutzen wir `angular-mock`. Dieses Modul bietet uns `$httpBackend` als Mock-Implementierung zum Testen von `$http`. Da `templateUrl` aber intern auch wieder `$http` nutzt, werden auch diese Aufrufe gemockt.

Zur Lösung könnten wir in diesem Fall unsere Template-Anfragen mocken und das `$httpBackend` Mock als Response unser Template zurückgeben lassen. Das ist natürlich weder schön, noch wartbar.

Alternativ können wir den Karma-Preprocessor [nghtml2js](https://github.com/karma-runner/karma-ng-html2js-preprocessor) nutzen. Mit diesem werden unsere HTML-Templates automatisch in den Template-Cache geschrieben und in unsere TestSuite geladen. Somit sparen wir uns den HTTP-Request komplett. Weiterhin müssen wir die Templates nur einmal schreiben und auch nicht an verschiedenen Stellen pflegen.

**npm install**

```shell
npm install karma-ng-html2js-preprocessor --save-dev
```

**karma.conf.js**

```javascript
files: [
  [...]
  // Match all templates for nghtml2js
  'src/**/*.html'
],
preprocessors: {
  'src/**/*.html': 'ng-html2js'
},
ngHtml2JsPreprocessor: {
  stripPrefix: 'src/',
  moduleName: 'templates'
}
```

**test/_common/templates.js**

```javascript
beforeEach(module('templates'));
```
