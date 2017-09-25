---
title: "ng-show vs. ng-if in AngularJS"
description: "In fast jeder Webanwendung gibt es Elemente, die man zeitweise aus- oder einblenden möchte. Hierfür bietet AngularJS die Direktiven ngShow, ngHide und ngIf."
author: "Tilman Potthof"
slug: "ng-show-vs-ng-if"
published_at: 2014-11-11 08:10:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/ng-show-vs-ng-if.jpg"
---

# Der kleine Unterschied - ng-show vs. ng-if

In fast jeder Webanwendung gibt es Elemente, die man zeitweise aus- oder einblenden möchte – Hilfetexte, optionale Formular-Felder, Dialog-Boxen, um nur einige Anwendungsfälle zu nennen. In Angular gibt es dafür die praktische Direktive `ng-show` bzw. deren Gegenspieler `ng-hide`. Gleichzeitig gibt es aber noch die Direktive `ng-if`, die auf den ersten Blick das gleiche tut. Hier steckt der Teufel mal wieder im Detail.

## Verhalten von `ng-show`

Mit einem kleinen Code-Beispiel lässt sich sehr einfach zeigen, worin sich die Direktiven grundlegend unterscheiden.

```html
<input type="checkbox" ng-model="showMyText" ng-init="showMyText = false">
<label ng-show="showMyText">
  <span ng-init="showMyText = true">Mein Text!</span>
  <input type="checkbox" ng-model="showMyText">
</label>
```

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/klTOmQl6yvLPjhCrF69M/preview.html" style="width:100%;height:80px;border:0"></iframe>

Der Text wird direkt angezeigt.
Daraus können wir schließen, dass die Variable `showMyText` auf `true` gesetzt wurde, was heißt, dass das innere `ng-init` nach dem Äußeren ausgewertet wurde.
Aus dieser Beobachtung können wir zwei Eigenschaften von `ng-show` ableiten.
Erstens, der Inhalt innerhalb des Blocks wird direkt ausgewertet, obwohl der Wert zuerst auf `false` gesetzt wurde und der Block initial ausgeblendet sein müsste.
Zweitens, `ng-show` erzeugt keinen neuen Scope, denn dann könnte man von außerhalb des `ng-show` Blocks nicht auf die innere Variable zugreifen.

Der Grund dafür ist einfach, denn `ng-show` blendet Elemente mithilfe der CSS-Klasse `ng-hide` aus, die das Style-Attribute `display: none` setzt. Daher verhält sich alles innerhalb des Blocks so, als ob es angezeigt würde und Direktiven wie z.B. `ng-init` werden nicht beeinflusst.

![ng-show in der Element Analyse](inspect-element-ng-show.png)

## Verhalten von `ng-if`

Wenn wir `ng-show` mit `ng-if` ersetzen erhalten wir ein komplett anderes Verhalten.

```html
<input type="checkbox" ng-model="showMyText" ng-init="showMyText = false">
<label ng-if="showMyText">
  <span ng-init="showMyText = true">Mein Text!</span>
  <input type="checkbox" ng-model="showMyText">
</label>
```

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/kJZ0jgyjieerZ6eEUMxb/preview.html" style="width:100%;height:80px;border:0"></iframe>

AngularJS zeigt den Text, anders als bei `ng-show`, nicht an.
Das heißt, dass das innere `ng-init` nicht ausgewertet wird.
Wenn man sich die Elemente in der Browser-Analyse anschaut, dann sieht man anstelle des Label-Elements einen HTML-Kommentar als Platzhalter.
Die `ng-if` Direktive führt also dazu, dass ein Element wirklich nicht erzeugt wird und damit auch alle Elemente innerhalb des Blocks nicht ausgewertet werden.

![ng-if in der Element Analyse](inspect-element-ng-if.png)

Wenn man den Text anschließend einblendet, kann man auch die innere Checkbox verändern.
Beide Checkboxen, die Innere und die Äußere, sind mit einer `showMyText` Variable verbunden, aber wenn man die Innere anklickt, verändert sich die Äußere nicht.
Damit wissen wir auch, dass die `ng-if` Direktive im Gegensatz zur `ng-show` Direktive einen eigenen Scope erzeugt.

![ng-if Checkboxen mit unterschiedlichen Scopes](ng-if-checkboxes.png)

## Abläufe und Scopes

Um die Abläufe in den Direktiven noch besser zu verstehen, gibt es hier zwei Plunker Beispiele zum Experimentieren.
Das erste Beispiel loggt Veränderungen an Variablen, Aufrufe von `ng-init` und das `$destroy` Event des Scopes der für `ng-if` erzeugt wird.


<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/ugI1KCtFFMik7tB54bDj/preview.html" style="width:100%;height:460px;border:0"></iframe>

Im zweiten Beispiel kann man sich die Elemente, die eigene Scopes haben, markieren lassen und deren `$id` Attribut anzeigen.

<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/oaypFTr2P2cF4WzZ5a0Q/preview.html" style="width:100%;height:460px;border:0"></iframe>

## Angular 1.0.x

Auch wenn es Angular 1.2 schon seit November 2013 gibt, kann ich mir gut vorstellen, dass es Projekte gibt, die noch auf einer 1.0.x Version sind.
Hierfür sollte man wissen, dass `ng-if` erst mit Angular 1.2 eingeführt wurde.
Als Workaround kann man von einer alten angular-ui Version die `ui-if` Direktive verwenden, die im Prinzip das Gleiche tut ([github: Quellcode von ui-if (angular-ui)](https://github.com/angular-ui/angular-ui-OLDREPO/blob/master/modules/directives/if/if.js)).

# Fazit

Die `ng-if` Direktive ist besonders dann nützlich, wenn das Fehlen von Variablen in einem Block zu Fehlern führt.
Das Gleiche gilt für Fälle, in denen man möchte, dass z.B. `ng-init` erst ausgewertet wird, wenn eine Variable `true` wird.
Für andere Fälle ist wahrscheinlich `ng-show` die bessere Wahl.
Ein weiterer Aspekt, den man im Hinterkopf behalten sollte, dass die Auswertung des Inhalts eines ausgeblendeten Blocks potenziell Zeit kosten kann.
Bei `ng-show` wird initial mehr Zeit verbraucht, da sofort alles ausgewertet wird.
Bei `ng-if` erfolgt die Auswertung erst beim Einblenden, dafür aber auch bei jedem Einblenden.

Auf jeden Fall ist es hilfreich den Unterschied zwischen beiden Direktiven zu kennen und beide Varianten in seinem Angular Repertoire zu haben.
