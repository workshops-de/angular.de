---
number: 6.50
title: Internet Explorer - Kompatibilität (IE6, IE7, IE8)
part: Konzepte und Hintergründe
description: Zu welchen Browsern ist AngularJS kompatibel? Lerne hier, was zu beachten ist!
progress: 90
---

AngularJS ist von Haus aus kompatibel zum Internet Explorer ab Version 9. Kompatibilität mit älteren Version zu erreichen ist möglich und erfordert nur mäßigen Aufwand.

Die Kompatibilität mit älteren Versionen des Internet Explorers bricht an zwei Stellen. Zum Einen fehlt eine vollständige JavaScript-Unterstützung und zum Anderen treten Probleme mit HTML-Elementen von AngularJS auf.

## JavaScript-Erweiterungen (IE6 / IE7)

AngularJS benötigt JSON.stringify. Da JSON erst ab dem Internet Explorer 8 [unterstützt](https://blogs.msdn.microsoft.com/ie/2008/09/10/native-json-in-ie8/) unterstützt wird, müssen wir ältere Versionen mit so genannten Polyfills nachrüsten. Dies sind Bibliotheken, die Funktionen in JavaScript implementieren, welche in neueren Browsern nativ vorhanden sind.

Ein bekannter Polyfill ist [JSON3](http://bestiejs.github.io/json3/). Diesen platzieren wir konditional im Head des HTML-Dokumentes.

ACHTUNG: JSON3 muss vor AngularJS geladen werden.

```html
<head>
  <!--[if lte IE 8]>
    <script src="/javascripts/json3.min.js"></script>
  <![endif]-->
  <script src="/javascripts/angular.min.js"></script>
</head>
```

## HTML-Elemente (IE6-8)

Im HTML-Bereich krankt die Unterstützung für AngularJS an den gleichen Problemen wie HTML5. Ältere Versionen des Internet Explorers können mit unbekannten Elementen nicht richtig umgehen und sortieren diese im DOM falsch ein. AngularJS benutzt eigene Elemente, wie z.B. `<ng-include>` oder `<ng-view>`, die in älteren HTML-Standards fehlen. Damit der Internet Explorer diese Elemente korrekt behandelt, müssen sie diesem vor der ersten Benutzung bekannt gemacht werden.

Jedes einzelne Element, was später verwendet werden soll, muss im Head-Bereich definiert werden. Dabei sind sowohl die Elemente gemeint, die von AngularJS mitgeliefert werden als auch Elemente, die durch eigene Direktiven entstehen. Erzeugst du z.B. eine neue Direktive, die als Element `<tabs>` benutzt, musst du im Head `document.createElement('tabs')` schreiben.

```html
<head>
<!--[if lte IE 8]>
  <script>
    document.createElement('ng-include');
    document.createElement('ng-view');
    document.createElement('mein-tag');
  </script>
<![endif]-->
</head>
```

Erweiterungen in Form von Attributen `<li ng-repeat="..."></li>` werden gleich erkannt und müssen nicht gesondert behandelt werden.
