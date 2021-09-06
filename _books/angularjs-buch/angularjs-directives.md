---
number: 4.20
title: Eigene Direktiven mit AngularJS
description: "Lerne, was Direktiven in AngularJS sind und wofür man sie benutzt."
part: Erweiterungen der Applikation
progress: 30
---

Bisher hatten wir schon einige Direktiven von AngularJS selbst genutzt, z.B. `ng-app`, `ng-repeat`, usw. Was aber AngularJS so mächtig macht, ist die Möglichkeit, eigene Direktiven zu schreiben.

## Was sind Direktiven und wofür benutzen wir sie?

Mit Direktiven bauen wir normalerweise für sich gekapselte HTML-Komponenten. Auch wenn wir sie dafür hauptsächlich  nutzen, ist diese Beschreibung nur sehr oberflächlich.

Gucken wir in die Dokumentation von angularjs.org, beschreibt diese Direktiven als Markierungen an DOM-Elemente, die dem AngularJS-Compiler anweisen, ein bestimmtes Verhalten an ein DOM-Element anzuhängen oder das DOM-Element und seine Kinder zu verändern.

Um es verständlicher auszudrücken, betrachten wir es von einer anderen Seite: Die große Stärke von AngularJS besteht darin, im HTML-Code einfach nur noch zu beschreiben, was wir haben wollen. Nehmen wir `<li ng-repeat="item in items">{{item}}</li>` als Beispiel. Hier beschreiben wir (deklarativ), dass wir eine Liste haben möchten. Wie AngularJS neue Elemente im DOM einfügt, wenn ein Element hinzukommt, ist uns an dieser Stelle (im HTML-Code) völlig egal.
Das, was wir beschrieben haben, muss an einer Stelle in die einzelnen Schritte (imperativ) übersetzt werden. Diese Stelle sind Direktiven. In Direktiven beschreiben wir, wie der DOM geändert werden muss, wenn z.B. ein neues Element in ein Array eingefügt wird. Das ist zumindest der Weg, den AngularJS für uns vorsieht: **DOM-Manipulation nur in Direktiven!** Findest du so etwas, wie `$('.list').append(...)` im Controller, ist das ausnahmslos falsch.

## Isolierte Scopes

Wenn wir eigene Komponenten bauen wollen, sollten sie in jeder möglichen Umgebung funktionieren. Da wir in AngularJS Scopes haben, die im DOM immer weiter vererbt werden, müssen wir diese Scope-Hierarchie unterbrechen. Wenn wir das nicht tun, könnten z.B. Namenskonflikte bei Variablen geben oder schon in definierte Variablen erzeugen unerwünschte Nebeneffekte.

Die Art und Weise, wie wir dies in AngularJS tun, nennt sich Scope-Isolierung. In den Eigenschaften, einer Direktive können wir sagen `scope: {}`. Damit haben wir keinen Zugriff mehr auf die Scope-Variablen, die oberhalb der Direktive liegen.

![Isolierte Scopes](../images/figures/angularjs-scopes-isoliert.png)

Nachdem wir die Direktive isoliert haben, können wir wieder eine Verbindung zur Außenwelt herstellen. Dies passiert über Attribute am Element der Direktive. Haben wir eine Direktive `<colorpicker>`, können wir zum Beispiel Attribute für den aktuellen Wert angeben. Das könnte so aussehen: `<colorpicker value="#ff0000">`. Die Schnittstelle zur Außenwelt können wir nun auf 3 verschiedene Arten herstellen. Im Folgenden wollen wir diese erklären.

### Isoliert mit =

Die Isolierung mit `=` ist wohl am Einfachsten zu verstehen. Wenn wir das `=` benutzen, stellen wir einfach die 2-Wege-Datenbindung zur Außenwelt wieder her. Das heißt aber in jedem Falle, dass wir **eine Variable übergeben müssen**. Zum Beispiel: `<colorpicker value="meineVariable">`. Hiermit können wir nun außerhalb der Direktive einen Wert ändern und dieser wird auch innerhalb der Direktive geändert. Oder wir ändern innerhalb der Direktive einen Wert und dieser wird auch außen geändert.

> TODO: Demo mit Input-Feld

### Isoliert mit @

Nicht immer brauchen wir eine komplette 2-Wege-Datenbindung. Oft wollen wir auch einfach nur Werte, wie in `<colorpicker value="'#ff0000'">` übergeben. Wenn wir dabei das = benutzen, würde ein Fehler geworfen, weil `#ff0000` natürlich keine Variable ist und man darauf nicht schreiben kann. Trotzdem kann man an dieser Stelle Dynamik behalten, indem man z.B. `<colorpicker value="#{{meineFarbe}}">`. Bei einem `@` gibt es also nur eine Datenbindung in eine Richtung und man Expressions benutzen.

> TODO: Demo

### Isoliert mit &

Das `&` ist erfahrungsgemäß immer am Schwierigsten zu verstehen, obwohl auch diese Art der Isolierung nur eine merkwürdige Art der Syntax hat. Das `&` steht für einen Callback. Wir können also Funktionen, die Außerhalb der Direktive sind, aufrufen.

> TODO: Demo
