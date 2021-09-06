---
number: 6.20
title: Unobtrusive JavaScript
description: Lerne, warum AngularJS nicht auf Unobstrusive JavaScript setzt und wie trotzdem der Quellcode wartbar bleibt.
part: Konzepte und Hintergründe
progress: 95
---

Seit Jahren wird Unobtrusive JavaScript als Heilmittel für komplizierte Applikationen propagiert. Die Idee, Logik aus dem Template zu entfernen, ist gut und richtig. Da die Ereignis-Handler in AngularJS wieder stark an alte Zeiten erinnern, möchten wir auf dieses Thema hier kurz eingehen. Nehmen wir als Beispiel `ng-click`:

```html
<button ng-click="createTask()">Aufgabe erstellen</button>
```

Im ersten Moment sieht die letzte Zeile wie das `onclick`-Ereignis von mit einem anderen Namen aus. Machen wir also wieder einen Rückschritt?

Schauen wir genauer hin:

* Es befindet sich an dieser Stelle keine Logik. `createTask()` dient lediglich als Bindeglied zwischen View und Controller.
* Wir können an dieser Stelle nur beschränkt Funktionen ausführen. `ng-click` begrenzt dies auf einen AngularJS-Ausdruck ([Expression](http://docs.angularjs.org/guide/expression)). Ausdrücke benutzen kein `eval()`. Ein `onclick`-Ereignis dagegen kann beliebiges JavaScript ausführen.
* `onclick`-Ereignisse greifen auf den Globalen Namespace zu. `ng-click` ist beschränkt auf den aktuellen Scope.

Bisher hat Unobtrusive JavaScript seine Versprechen nicht halten können. Das Ergebnis ist ein unklares Verhältnis zwischen Template und Event-Handlern. AngularJS gibt dieses Verhältnis explizit an. Somit können wir zu einem hohen Prozentsatz direkt im HTML-Template ablesen, welche Teile dynamisch sind.
