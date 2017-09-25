---
number: 2.2
title: Vorteile von AngularJS
part: Grundlagen
description: Lerne, welche Vorteile dir AngularJS für dein Projekt bringt.
progress: 80
---

## Code-Reduktion

AngularJS macht einen Großteil des Codes, den man normalerweise schreibt, überflüssig. Wer bisher mit jQuery gearbeitet hat, staunt häufig, wie viel kleiner der Quelltext wird. Die Reduktion des Codes begründet sich durch die Automatisierung von Standardaufgaben.

Viel Arbeit investiert man in die manuelle DOM-Selektion, DOM-Manipulation und Event-Behandlung. Um z.B. ein Element im DOM verändern, muss man es referenzieren können. Das macht man normalerweise über die Vergabe einer ID/Class und benutzt einen Selektor, wie `$('#mein-element').`. Hat man es selektiert, schreibt man explizit, was mit dem Element gemacht werden soll, z.B. `$('#mein-element').addClass('active')`. Es gibt auch die Möglichkeit auf ein Ereignis zu reagieren, wie z.B. das Bewegen der Maus. In diesem Fall würde man normalerweise einen Event-Listener mit einem Callback setzen.

Diese Aktionen nehmen in einem typischen Projekt extrem viel Platz in Anspruch. AngularJS automatisiert diese Sachen fast vollständig durch Databinding und Direktiven.


## Testbarkeit und Refaktorierung

AngularJS benutzt Dependency Injection durch und durch. Ohne an dieser Stelle in die Tiefe zu gehen, sorgt Dependency Injection für eine sehr gute Testbarkeit, weitere Code-Reduktion und einfache Refaktorierung. Wie DI im Detail funktioniert, wird im Vertiefungskapitel behandelt.


## Wiederverwendbare Komponenten und Lesbarkeit

AngularJS kann das HTML-Vokabular über Direktiven erweitern. Man könnte z.B. `<tabs><pane title="">` statt `<ul class="tabs"><li class="tab-title"><div class="tab-content">` schreiben. Die Verwendung von Direktiven bringt folgende Vorteile:

* Die Lesbarkeit wird deutlich gesteigert durch semantische Benennung und Weglassen von Elementen, die nur der Gestaltung dienen
* Automatisches Entstehen von Komponenten, die sich sehr gut testen und wiederverwenden lassen. (Testen im DOM ist einfach mit AngularJS)


## Verwendung der Datentypen von JavaScript

Ein Grund, weshalb der Einstieg in AngularJS sehr schnell geht, ist die Möglichkeit, die normalen Datentypen von JavaScript zu verwenden. Dadurch ist es sehr einfach möglich, fremde Bibliotheken einzubinden, ohne eine weitere Zwischenschicht (Glue Code) zu implementieren. Andere JavaScript-Frameworks, wie z.B. Knockout oder Ember zwingen einem auf, ihre Klassen zu erben und Attribute durch Getter/Setter zu verändern. Die Methode, die AngularJS dazu verwendet nennt sich Dirty-Checking und wird im Vertiefungskapitel näher erklärt.
