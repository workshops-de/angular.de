---
title: "Abschätzung der Komplexität einer Angular Anwendung"
description: "Häufig machen Angular-Anwendungen einen wesentlichen Teil der Komplexität einer Anwendung aus. Ein kleines Ruby-Script hilft bei der Bewertung."
author: "Björn Wilmsmann"
published_at: 2018-05-01 8:25:01.000000Z
header_source: https://unsplash.com/photos/PqkuJqzghew
categories: "angular advanced"
---

## Warum möchte ich die Komplexität einer Anwendung messen?

Es gibt vielfältige Gründe, die Komplexität einer Anwendung einschätzen zu wollen:

- Analyse einer bestehenden Anwendung, wenn man neu in einem Projekt ist.
- Einschätzung der Qualität und Wartbarkeit einer Anwendung.
- Identifizierung der Schwachstellen einer Anwendung, bei denen Refactoring Maßnahmen am dringendsten notwendig sind und potentiell den größten positiven Effekt liefern.

 Neben allgemeinen und sprachspezifischen Werkzeugen, die von IDEs und Anwendungen wie SonarLint / SonarQube zur Verfügung gestellt werden, kann es auch Sinn machen, nicht nur framework-spezifische Besonderheiten zu berücksichtigen, sondern sich diese zunutze zu machen, um ein besseres Bild von der Qualität und Komplexität einer Anwendung zu bekommen.

Ein Teil meiner Arbeit besteht darin, meinen Kunden ein Einschätzung darüber zu geben, in welchem Zustand sich bestehende Anwendungen befinden, und entsprechende Verbesserungsmöglichkeiten aufzuzeigen.

Häufig dienen Angular Anwendungen dabei als Front-end und machen einen wesentlichen Teil der Komplexität einer Anwendung insgesamt aus.

## Wie funktioniert das Script?

Um nun nicht einfach eine rein intuitive Abschätzung zu geben, andererseits aber auch nicht jedes Mal aufwendig individuell und manuell jede Komponente einer Angular Anwendung analysieren zu müssen ([threevirtues.com](http://threevirtues.com/) ), habe ich ein [Ruby Script](https://github.com/BjoernKW/Miscellaneous/blob/master/measure_angular_component_complexity.rb) erstellt, mit dem man die Komplexität von Angular Apps automatisiert messen kann.

Dies geht von der Annahme aus, dass sich die Komplexität einer Code Entität (Klasse, Komponente, Service …) wesentlich aus ihren Abhängigkeiten und deren Anzahl ergibt.

Das Script nimmt als Argument einen Pfad mit Angular Source Code(z.B.: `./measure_angular_component_complexity.rb src/app` ) und zählt dann in dem angegebenen Verzeichnis rekursiv die verschiedenen Arten von Abhängigkeiten (`providers`, `imports` und `declarations`) in der `TestBed` Konfiguration der Unit Tests zu den jeweiligen Komponenten  (`Services`, `Directives`, `Pipes`, `Guards`, …) .

Dazu geht das Script jede auf `.spec.ts` endende Datei durch und prüft anhand von regulären Ausdrücken, an welchen Stellen im Code die Definition der verschiedenen Abhängigkeiten von Angular Komponenten beginnt und über wieviele Zeilen diese jeweils gehen.

Dadurch kann man darauf schließen, welche Abhängigkeiten notwendig sind, damit eine Komponente kompiliert und hat somit einen ungefähren Richtwert, wie komplex eine Komponente und eine Applikation insgesamt sind. Das ist nicht unbedingt sehr genau, aber als Indikator durchaus hilfreich, um eine Anwendung zu bewerten und sich dann bei einer genaueren Analyse und Verbesserungen auf die komplexeren Komponenten zu konzentrieren.

 Das Script geht von 1 Import / Provider / Declaration Eintrag pro Zeile aus, so wie u.a. vom [Angular Style Guide](https://v17.angular.io/guide/styleguide#style-04-08) vorgeben. Ein Zählen im Fall von mehreren Imports / Providers / Declarations pro Zeile wäre möglich, aber etwas aufwendiger. Da IDEs die Möglichkeit bieten, Source Code einfach entsprechend auf 1 Eintrag pro Zeile umzuformatieren, habe ich das Script zunächst auf die im Vergleich einfachere Methode des Zählens von Zeilen beschränkt.

Neben den einzelnen Abhängigkeiten je Komponente gibt das Script auch einen Gesamtwert aus. Dabei werden Tokens, nicht Types gezählt, d.h. ein mehrfaches Vorkommen einer Abhängigkeit in mehreren Komponenten wird auch für den Gesamtwert mehrfach berücksichtigt.

## Fazit

Dies ist ein kleines Script welches mir meine tägliche Arbeit erleichtert. Ich würde mich über eure Meinung dazu freuen und hoffe, dass es dem einem oder anderen auch hilft, die Qualität der eigenen Anwendung zu Bewerten und zu verbessern. Das Projekt ist Open-Source und ich freue mich über Anregungen und Ideen, es zu verbessern!
