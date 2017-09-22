---
number: 3.05
title: Ein erstes Programm
part: Basisapplikation
progress: 80
noindex: true
---

> API:
  [ng-app](http://docs.angularjs.org/api/ng.directive:ngApp) |
  [ng-model](http://docs.angularjs.org/api/ng.directive:ngModel)

Bevor wir mit der eigentlich Applikation durchstarten, schauen wir uns das Grundgerüst einer Applikation mit AngularJS an. Das Beispiel dazu kannst du [online](http://jsfiddle.net/angularjs_de/TeAGF/) ausprobieren oder lokal speichern. Wenn du es lokal abspeichern möchtest, erstelle ein neues Verzeichnis mit beliebigem Namen und eine Datei `index.html`, in der du den folgenden Quellcode abspeicherst. Rufe die Datei danach im Browser auf. [Online-Version »](http://jsfiddle.net/angularjs_de/TeAGF/)

<<(code/ng-app/index.html)

Wenn du die Datei im Browser aufrufst, wirst du feststellen, dass jede Textänderung im Eingabefeld eine sofortige Veränderung in der Ausgabe bewirkt.

### Wie funktioniert's?

Im HTML-Template findest du drei Erweiterungen, die von AngularJS stammen. `ng-app`, `ng-model` und `{{name}}`.

Mit `ng-app` startet die Magie von AngularJS. Intern wartet AngularJS bis der DOM geladen ist und sucht dann nach dem Attribut `ng-app`. Dabei kann es an jeder beliebigen Stelle stehen und muss sich nicht im Tag `<html>` befinden. Statt einer Main-Methode, sorgt `ng-app` für die Initialisierung.

![AngularJS - Root Scope](../images/figures/scope-root.png)

Zusammen mit der Initialisierung wird etwas erzeugt, was sich Scope nennt. In unserem Fall das erste Scope und somit `$rootScope` genannt. Scopes dienen als Vermittlungsschicht zwischen View und Controller. Wenn Variablen auf dem Scope erzeugt/verändert werden, wird dies den Elementen auf dem View des Scopes mitgeteilt. An dieser Stelle siehst du, was bidirektionales Databinding konkret bedeutet.

> Anmerkung: Variablen werden dynamisch erstellt und müssen nicht vorher auf dem Scope definiert werden.

Wenn du nun weißt, dass Scopes als Vermittlungsschicht dienen, sind `ng-model` und `{{name}}` einfach zu erklären. `ng-model` bindet in diesem Fall den Wert von *name* an das Eingabefeld. {{name}} gibt an dieser Stelle des Templates *name* aus und ändert sich entsprechend, wenn sich *name* ändert.

Wo gehört `ng-app` hin? Wenn du eine reine AngularJS-Applikation schreibst, in das `<html>`-Tag. Wenn du einzelne Seiten einer bestehenden Applikation erweitern möchtest, in ein `<div>`-Tag innerhalb von `<body>`.
