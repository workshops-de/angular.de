---
number: 3.10
title: ngController - erste Berührungen mit Scopes
part: Basisapplikation
description: Lerne, was ngController ist und erstelle eine erste Liste mit ngRepeat.
progress: 20
---

> API: [ng-controller](http://docs.angularjs.org/api/ng.directive:ngController)

Applikationen, die nur in einer einzigen HTML-Datei bestehen, sind nicht sonderlich spannend. Wir erweitern unsere Applikation um einen JavaScript-Teil und fügen eine Datei `application.js` hinzu.

<<(code/ng-controller/index.html)

An dieser Stelle wird `ng-controller` als neue Direktive hinzugekommen. Wie der Name es vermuten lässt, wird an dieser Stelle ein neuer Controller eingebunden. Damit einher geht auch die Erzeugung eines neuen Scopes. Die Abbildung unten verdeutlicht die entstandene Verschachtelung der Scopes.

<<(code/ng-controller/application.js)

Ein Controller in AngularJS ist nichts weiter als eine normale Funktion. Eine Besonderheit ist nur die übergebene Variable `$scope`. Mit dieser Variable können wir Daten mit dem View austauschen. Dieser Controller macht nichts weiter, als auf dem Scope `name` den Wert *AngularJS* hinzuzufügen.

![AngularJS - Controller Scope](../images/figures/scope-controller.png)

Wie man sieht, existieren jetzt zwei Scopes. Das `$rootScope`, definiert durch `ng-app` und ein neues Scope, definiert durch `ng-controller`.

![AngularJS - Root Scope](../images/figures/scopes.png)

Das Bild oberhalb verdeutlicht noch einmal die Kommunikation zwischen Variablen und Scopes. Das Scope ist die Verbindung zwischen View und Controller. Wird eine Variable auf dem Scope geändert, werden alle Elemente im View davon benachrichtigt und der entsprechende Wert geändert.


## ngRepeat

> API: [ng-repeat](http://docs.angularjs.org/api/ng.directive:ngRepeat)

In echten Applikationen haben wir nicht nur einzelne Werte, sondern strukturierte Daten, häufig in Form von Listen - und Listen sind eine Stärke von AngularJS.

<<(code/ng-repeat/application.js)

Wir ändern in diesem Beispiel unseren Controller und stellen ein Array mit Frameworks zusammen, welches Name und URL enthält. An dieser Stelle erkennt man, wie einfach die Arbeit mit AngularJS im Vergleich zu anderen Frameworks ist. Wir benutzen für eine Liste ein einfaches JavaScript-Objekt ([POJO](http://de.wikipedia.org/wiki/Plain_Old_Java_Object)), statt von Klassen des Frameworks zu erben. Die Darstellung dieser Liste im View ist ähnlich einfach:

<<(code/ng-repeat/index.html)

In AngularJS wird die Anweisung, etwas zu wiederholen, direkt in den Tag geschrieben, der wiederholt werden soll: `<li ng-repeat="framework in frameworks">`. Wie für einen Controller, wird für jedes einzelne Listenelement ein Scope erzeugt. Deshalb können wir innerhalt des `<li>`-Elements auf *name* und *url* zuzugreifen.

Die Zuweisung für das erste Listenelement würde intern so aussehen:

```javascript
$scope.framework = { name: 'AngularJS', url: 'angularjs.org' }
```

Arrays können natürlich über mehrere Ebenen zu verschachtelt werden, um somit z.B. hierarchische Menüs darzustellen.


## ngClick, ngChange, ngMouse...

> API:
  [ngClick](http://docs.angularjs.org/api/ng.directive:ngClick) |
  [ngDblclick](http://docs.angularjs.org/api/ng.directive:ngDblclick) |
  [ngMouseup](http://docs.angularjs.org/api/ng.directive:ngMouseup) |
  [ngMousedown](http://docs.angularjs.org/api/ng.directive:ngMousedown) |
  [ngMouseenter](http://docs.angularjs.org/api/ng.directive:ngMouseenter) |
  [ngMouseleave](http://docs.angularjs.org/api/ng.directive:ngMouseleave) |
  [ngMousemove](http://docs.angularjs.org/api/ng.directive:ngMousemove) |
  [ngMouseover](http://docs.angularjs.org/api/ng.directive:ngMouseover)

> `<a href></a>` AngularJS fügt bei einem leeren href automatisch ein e.preventDefault() ein.

<<(code/ng-click/index.html)

<<(code/ng-click/application.js)

## Input...
API:
[ngChange](http://docs.angularjs.org/api/ng.directive:ngChange) /

ngModel + ng-trim="false"


form
input
select
textarea


ngBind
ngBindHtmlUnsafe
ngBindTemplate
ngChecked
ngClass
ngCloak
ngCsp
ngDisabled
ngForm
ngHide
ngHref
ngInclude
ngInit
ngList


ngMultiple
ngNonBindable
ngPluralize
ngReadonly
ngSelected
ngShow
ngSrc
ngStyle
ngSubmit
ngSwitch
ngTransclude
ngView

<<(code/shop/index.html)

<<(code/shop/about.html)

<<(code/shop/articles.html)

<<(code/shop/cart.html)

<<(code/shop/application.js)

## Die Möglichkeiten von {{...}}


## Weitere ng-Direktiven

ngClassEven
ngClassOdd
