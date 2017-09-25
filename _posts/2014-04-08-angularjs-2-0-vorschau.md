---
title: "7 Neuerungen, die uns in Angular 2 erwarten"
description: Lerne, was sich in Angular 2 ändern wird. Wir besprechen Punkte wie ES6, Module, Change Detection und Routing.
author: "Robin Böhm"
slug: "angularjs-2-0-vorschau"
published_at: 2014-04-08 13:16:00.000000Z
categories: "angular2 news"
header_image: "/artikel/header_images/angularjs-2-0-vorschau.jpg"
---

Mitte März 2014 gab das Angular-Team via [Blog](http://blog.angularjs.org/2014/03/angular-20.html) bekannt, ab nun aktiv an der Implementierung von AngularJS 2.0 zu arbeiten. Die Fertigstellung dieser Version liegt noch in ferner Zukunft, jedoch will das Team die Designentscheidungen offen mit der Community diskutieren. Woran im Moment gearbeitet wird, fasse ich euch in diesem Artikel zusammen. Auf einen Blick sind es:

* Streichung der Unterstürzung für ältere Versionen des IE
* Framework für mobile Geräte
* Neue Basis ist ES6
* Weitere Modularisierung
* Optimierung der Change Detection
* Einführung eines Persistenz-Layers
* Erweitertes Routing, Autorisierung und Authentifizierung

## Streichung der Unterstürzung für ältere Versionen des Internet-Explorers

AngularJS 2.0 will einen mutigen Weg, den nur wenige Frameworks bisher gewagt haben - Die Unterstützung von alten Versionen des Internet Explorers wird gestrichen. Zielplattform sollen also primär moderne Browser sein. Der Internet Explorer soll nur noch ab Version 10 untererstützt werden. Mit dieser Entscheidung will das Team die Entwicklung des Frameworks und der Anwendungen mit AngularJS 2.0 vereinfachen.

[Quelle](http://blog.angularjs.org/2014/03/angular-20.html)

## Konzentration auf mobile Geräte

Mobile Endgeräte und vor allem touch-fähige Geräte sollen besser vom Core-Framework abgedeckt werden. Mit AngularJS in der Version 1.x können wir bereits Interaktionen wie Swipe und Fast-Click sehr verwenden. In Version 2 kommen noch mehr Möglichkeiten hinzu: Techniken wie zum Beispiel ein Image-Carousel oder Infinite-Scrolling. Diese werden dann direkt in den Core eingebaut.

*“We want to give these scenarios first-class support for the best user experiences possible in your applications.”*

[Quelle](http://blog.angularjs.org/2014/03/angular-20.html)

## Neue Basis ist ES6

Die Implementierung von AngularJS 2 wird komplett in ES6 geschrieben. Somit können mächtige Features wie Object.observe() oder auch das neue Klassen-System der Sprache genutzt werden. Da ES6 derzeit noch in keinem Browser lauffähig ist, nutzt das Projekt den Traceur-Compiler. Dieser generiert aus dem ES6 Quellcode lauffähigen ES5 Quellcode.

[Quelle](https://docs.google.com/document/d/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/edit)

## Weitere Modularisierung

Bereits in AngularJS 1.2 wurden Router und Animationen ausgekoppelt und das Framework modularer. In AngularJS 2.0 geht diese Entwicklung weiter. Teile, wie Dependency Injection und Templating wandern in eigenen Module. Wer möchte, kann bereits jetzt einen ersten Blick auf die Auskopplungen werfen:

* <https://github.com/angular/di.js>
* <https://github.com/angular/zone.js>
* <https://github.com/angular/templating>
* <https://github.com/angular/expressionist.js>
* <https://github.com/angular/watchtower.js>

## Optimierung der Change Detection

Change Detection ist ein kritisches Thema in Angular, da über diesen Mechanismus die Zwei-Wege-Datenbindung realisiert wird. Das Dirty Checking bisher war immer ein Kritikpunkt, wenn es um die Performance des Frameworks ging. Durch die Einführung von *Object.observe()* in ES6 wird es Möglich sein, diesen Mechanismus native im Browser auszuführen. Da diese Schnittstelle in ES5 und somit in vielen Browsern noch nicht verfügbar ist, arbeitet das Team stark an einem performanten Polyfill. Dieser kann sehr leicht durch die native Funktion ersetzt werden, sobald diese verfügbar ist.

Aktuell, in der Version Angular 1.x, ist der Algorithmus bereits sehr performat und kann bis zu einigen 1000 Objekten in relativ kurzer Zeit bewerten. Mit der neuen und nativen Implementierung können jedoch 20.000 Objekt-Felder oder auch 300.000 Array-Felder innerhalb von 1ms überprüft werden. Hierzu hat das Team folgende Benchmarks als Basis der evaluation genannt.
field: 20,000 field checks / 1 ms:  http://jsperf.com/object-observe-polyfill-sandbox
array: 300,000 array field checks / 1ms: http://jsperf.com/array-change-detection
Eine detaillierte Beschreibung der Algorithmen und des geplanten Designs könnt ihr im offiziellen Dokument zur [Angular 2 Change Detection](https://docs.google.com/document/d/10W46qDNO8Dl0Uye3QX0oUDPYAwaPl0qNy73TVLjd1WI/edit#) nachlesen.

## Einführung eines Persistenz-Layers

Die Services `$http` und `$resource` bieten bereits eine sehr gute Abstraktion über die grundsätzliche Kommunikation mit RESTful Services. Allerdings haben viele Entwickler damit begonnen, sich weitere Abstraktionsschichten “on top” zu erstellen, um Features wie z.B. *Offline First* oder auch WebSocket-Streams zu unterstützen. Diese Features werden in Zukunft von einem neuen Persistenz Layer des Angular-Cores bereitgestellt werden und können somit einfach und einheitlich in den Projekten genutzt werden.

## Erweitertes Routing, Autorisierung und Authentifizierung

Der Standard Router in AngularJS 1.x liefert sehr begrenzte Möglichkeiten, Routen abzubilden. Dies war auch einer der Gründe, warum das Team sich dazu entschieden hat, das Modul aus dem Core zu entkoppeln. Somit haben wir die Möglichkeit, andere Routing-Module einzubinden, welche diese Aufgabe übernehmen.
Die nächste Version des Routers soll nun um einiges mächtiger werden und ein Großteil der Standard-Anwendungen abdecken können. Unter anderen werden folgende Fälle abgedeckt:

State-basiertes Routing
Mehrere und verschachtelte `ng-views`
Integration von Authentifikation und Autorisierung
Intelligentes Vorladen von Views

Es werden hierfür unter anderem Konzepte und Stärken des [EmberJS Routers](http://emberjs.com/guides/routing/) wieder verwendet. Für die Autorisierung wird eine eine direkte Schnittstelle für die Node.js Middleware [passport.js](http://passportjs.org/) angeboten.

Die Gedanken und Diskusionen hierzu könnt ihr euch [hier](https://docs.google.com/document/d/1I3UC0RrgCh9CKrLxeE4sxwmNSBl3oSXQGt9g3KZnTJI/edit) anschauen.
