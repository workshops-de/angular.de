---
title: "Mit One-Time Binding die Performance verbessern "
description: "Oftmals stoßen wir auf Performanceprobleme bei großen AngularJS-Anwendungen. Der Einsatz von One-Time-Binding kann diese meist direkt lösen."
author: "Tilman Potthof"
slug: "angularjs-one-time-binding"
published_at: 2014-10-27 13:25:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-one-time-binding.jpg"
---

Bidirektionales (Two-Way) Databinding gehört zum täglichen Brot eines Angular Entwicklers und ist eine bekannte Kernfunktion. Was ist nun das neue einmalige (One-Time) Databinding und welches Problem löst es?

## Problem

Damit AngularJS Template-Elemente automatisch aktualisieren kann gibt es Beobachter-Funktionen(Watcher), die prüfen, ob sich Daten geändert haben. Diese Prüfung erfolgt nach Aktionen die den Aktualisierungszyklus von Angular auslösen, z.B. eine Änderung in einem Eingabefeld mit ng-model. Auch Variablen, die man definitiv nur einmal initialisieren möchte, werden in jedem Aktualisierungszyklus auf Änderungen geprüft. Je nach dem wie viele Beobachter-Funktionen es auf einer Seite gibt und wie komplex die Prüfungen sind, die sie ausführen müssen, kann dies die Reaktionsgeschwindkeit und somit Performance der Seite deutlich verschlechtern.

## Lösung

Ab Angular 1.3 gibt es eine neuen Syntax für Template-Ausdrücke `::`. Statt `{{ variable }}` kann man jetzt einfach `{{ ::variable }}` schreiben und erreicht, dass die Beobachter-Funktion nach dem ersten Aktualisierungszyklus entfernt wird. Dadurch wird der Template-Ausdruck nicht mehr geprüft und das Element nicht mehr aktualisiert. Auf diese Weise kann man verhindern, dass AngularJS überflüssige Prüfungen durchführt und so die Reaktionsgeschwindigkeit seiner Seite potenziell verbessern. Wenn man Direktiven wie `ng-if` oder `ng-view` verwendet, dann gilt das einmal Databinding bei jeder neuen Initialisierung der jeweiligen Direktive.

## Beispiel

Die einzelnen Punkte sollten am folgenden Beispiel klar werden. Wenn man einen Namen auswählt oder auf **Rotieren** klickt, dann zeigen beide Template-Ausdrücke den Namen an. Wiederholt man die Aktion,dann verändert sich nur noch der Ausdruck mit der klassischen Syntax. Anschließend kann man beide Elemente **Ausblenden** und da diese Funktion mit `ng-if` umgesetzt ist, werden die Elemente beim Einblenden neu initialisiert und erhalten beide den aktuellen Wert der Variable `selectedName`. Mit **Zurücksetzen** und **Aus/Einblenden** kann man den Ursprungszustand wiederherstellen.


<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/xRfEMg44ZDPh8dkCEN6y/preview.html" style="width:100%;height:300px;border:0"></iframe>
