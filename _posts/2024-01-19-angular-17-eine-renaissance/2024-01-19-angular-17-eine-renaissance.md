---
title: "Die Angular 17 Renaissance"
description: "Alles zu Angular 17: Neue Features, Performance-Optimierungen, bessere Developer Experience und die Angular Renaissance im Überblick."
author: "Lulëzim Ukaj"
published_at: 2024-01-19 16:00:28.000000Z
header_source: https://raw.githubusercontent.com/workshops-de/angular.de/refs/heads/master/_posts/2024-01-19-angular-17-eine-renaissance/header.jpg
header_image: header.jpg
categories: "angular update"
---

## Einleitung

Wir leben im Zeitalter der Superlative. 'Größer, schneller, besser' war gestern. Heute ist es “am größten, am schnellsten, am besten”. Technologische Fortschritte müssen in nicht weniger als Superlativen gemessen werden, um Aufsehen zu erregen. Das gilt natürlich auch für die Welt der Frameworks. Und Angular nimmt da keine Sonderstellung ein. Folgerichtig wurde das Update auf Angular 16 im Mai dieses Jahres als das größte Update seit dem initialen Release des Frameworks beworben. Und nicht ohne Grund, denn das Update hatte es in sich: das signalbasierte Reaktivitätsmodell, die Full-App Non-Destructive Hydration, die Unterstützung von TypeScript 5.0 und vieles mehr.

Aber was kommt eigentlich nach dem Superlativ? Die Antwort auf diese fast philosophische Frage hat uns jetzt Minko Gechev gegeben: eine Renaissance. Das ist ein Begriff, der wortwörtlich übersetzt die Wiedergeburt bedeutet und eine Erneuerung verspricht. Bereits Anfang 2023 hat Sarah Drasner, als Director of Engineering bei Google und Leiterin des Angular-Teams, die neue Ära der 'Angular Renaissance' auf X, ehemals Twitter, angekündigt. Und mit diesem Begriff hat jetzt auch der Technical Lead und Manager des Angular Teams das neue Update auf Angular 17 angekündigt.

Was damit gemeint ist und ob das neue Update wirklich der Beginn einer neuen Ära ist, wollen wir uns in diesem Artikel zu Beginn des neuen Jahres nochmal gemeinsam anschauen.

Und das Beste: Wenn du bereits zu müde zum Lesen bist, kannst du dir das Ganze alternativ auch von unserem Trainer [Webdave](https://webdave.de/start) auf seinem Twitch-Kanal ansehen. Übrigens findest du alle Codebeispiele aus dem Video in [Webdaves Stackblitz](https://stackblitz.com/@web-dave)! Wie immer: Danke, Webdave!

## Angular hat ein neues Logo und Portal

<p class="text-center">
<img
style="max-width:60%"
src="/shared/assets/img/placeholder-image.svg" alt="Das neue Angular Logo"
class="lazy img-fluid img-rounded" data-src="angular-logo.jpg" data-srcset="angular-logo.jpg"
/>
</p>

Das auffälligste Update ist mit Sicherheit das neue Logo. Angular verlässt sein traditionell rotes Schild-Symbol, das mit AngularJS eingeführt wurde und auch nach der Neuentwicklung von Angular im Jahr 2016 beibehalten wurde. Stattdessen wurde nach unserer Meinung ein durchaus gelungenes stilisiertes "A" mit einem frischen und zukunftsorientierten Erscheinungsbild gewählt.

<p class="text-center">
<img
style="max-width:100%"
src="/shared/assets/img/placeholder-image.svg" alt="Die neue Angular.DEV Platform im Welcome Screen"
class="lazy img-fluid img-rounded" data-src="angulardev-screenshot.jpg" data-srcset="angulardev-screenshot.jpg"
/>
</p>

Ein weiteres primär visuelles Update ist die neue Angular-Präsenz im Web. [Angular.dev](https://angular.dev/) löst damit Angular.io als Hauptquelle für Informationen und Ressourcen ab. Das neue Portal hat ein völlig überarbeitetes neues Design bekommen und dient zukünftig als zentrale Anlaufstelle für alles rund um Angular. Das beinhaltet auch eine überarbeitete Dokumentation und eigene Tutorials. Darüber hinaus bietet angular.dev nun auch eine interaktive Lernumgebung, um neue Features oder erste Schritte direkt im Browser auszuprobieren und zu lernen. Angular.dev ist ein weiterer Schritt, einen leichteren Einstieg insbesondere für Junior Entwickler und Quereinsteiger in das Framework zu ermöglichen.

## Tooling-Updates

Zunächst wollen wir kurz die vielen Tooling-Updates in Angular 17 betrachten.

Wie versprochen ist hier auch das Video von Webdave zum Anguglar 17 Update.

<iframe class="" width="100%" height="315" src="https://www.youtube-nocookie.com/embed/tXsz5Z15yeY" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Standalone Routing Enabled by Default

Die Angular CLI hat bedeutende Updates erfahren. Standalone-Projekte und Routing sind jetzt der neue Standard, und die erforderliche Node-Version wurde auf 18 aktualisiert. Besonders für Junior Entwickler werden dadurch die Einstiegshürden in komplexe Projekte gesenkt. Erfahrene Entwickler werden die gesteigerte Effizienz und Flexibilität schätzen, die durch diese Updates ermöglicht werden.

### View Transition API

Die neue View Transition API erlaubt eine verbesserte Steuerung beim Laden und Darstellen von Grafiken. Diese Funktion bietet Entwicklern mehr Flexibilität und Kontrolle über die visuellen Aspekte ihrer Anwendungen. Vor allem dynamische und reaktionsfähige visuelle Elemente lassen sich mit größerer Präzision steuern. Das ist besonders relevant für Anwendungen mit komplexen visuellen Elementen, wie eingebetteten Maps in einer Booking-Anwendung.

### Component Decorator und Styles Management

Mit den Updates am Component Decorator und der Einführung von individuellen Styles und Templates haben Entwickler jetzt die Möglichkeit, ihre individuellen Styles direkt in Komponenten zu integrieren.
Dadurch werden weniger HTTP-Requests für externe Stylesheets benötigt, was wiederum die Initialladezeit deiner Anwendung verbessern kann.

### Deferrable Views

Das Feature der "Deferrable Views", welches sich aktuell noch in Developer Preview befindet, ermöglicht neue Möglichkeiten für das Lazy Loading von Komponenten. Mit Hilfe von `@defer`-Blöcken können Entwickler das Laden und Rendern von Komponenten gezielt verzögern:

```html
@defer (on viewport) {
 <meine-komponente />
}
```

Die Teile deiner Angular Anwendung, die nicht sofort im sichtbaren Bereich liegen, werden dadurch erst dann geladen und gerendert, wenn sie tatsächlich benötigt werden. Das schont Browser-Ressourcen in erheblichem Ausmaß, da nur die für den aktuellen Benutzerkontext relevanten Teile der Anwendung geladen werden. Hier hast du folgende Möglichkeiten:

- **on idle**: Lädt Komponenten, wenn der Browser inaktiv ist.
- **on immediate**: Lädt Komponenten sofort nach der Initialisierung.
- **on viewport**: Lädt Komponenten, wenn sie in den sichtbaren Bereich des Bildschirms kommen.

Die genannten Benchmarks sind bemerkenswert: bis zu 90% schnellere Laufzeiten und bis zu 87% schnellere Builds für hybrides Rendering sowie 67% für Client-seitiges Rendering.

## Integration von Vite und esbuild in Angular 17

<p class="text-center">
<img
style="max-width:60%"
src="/shared/assets/img/placeholder-image.svg" alt="Logos Vite und Esbuild"
class="lazy img-fluid img-rounded" data-src="esbuild.jpg" data-srcset="esbuild.jpg"
/>
</p>

Vite und Esbuild sind nun Standard in der Angular CLI für neue Projekte implementiert. Auch dieses Feature wurde bereits in der Version 16 zunächst in der Developer Preview eingeführt. Die standardmäßige Integration der Werkzeuge ist ein signifikanter Schritt nach vorn in Effizienz und Geschwindigkeit und markiert nicht weniger als einen Wendepunkt in der Build-Infrastruktur des Frameworks. Nach Angular-eigenen Zahlen werden bei der Nutzung von serverseitigem Rendering (SSR) und Static Site Generation (SSG) in ng build bis zu 87% schnellere Build-Zeiten und eine um 80% verbesserte Edit-Refresh-Schleife in ng serve gemeldet.

In einem nächsten Patch- oder Minor Release werden zusätzlich Schemata zur automatischen Migration bestehender Projekte, die Hybrid-Rendering verwenden, bereitgestellt. Wer die neue Application Builder-Technologie jetzt schon testen möchte, dem bietet die Angular-Dokumentation eine entsprechende Hilfestellung.

Weitere Informationen findest in der Angular Documentaion: [Getting started with the Angular CLI's new build system](https://v17.angular.io/guide/esbuild)

## Full App Non Destructive Hydration

<p class="text-center">
<img
style="max-width:60%"
src="/shared/assets/img/placeholder-image.svg" alt="Logo Angular Hydration"
class="lazy img-fluid img-rounded" data-src="hydration.jpg" data-srcset="hydration.jpg"
/>
</p>

Die in Angular 16 eingeführte Full App Non-Destructive Hydration ermöglicht eine effizientere Synchronisation zwischen Backend und Frontend in Single-Page-Applikationen (SPAs). Ein Kernvorteil dieser Technologie ist die signifikante Reduzierung des "Flickerns", das normalerweise beim Übergang vom serverseitigen zum clientseitigen Rendering auftritt.

Anstatt bei jedem Client-Start die gesamte DOM-Struktur neu zu rendern, nutzt Angular vorhandene serverseitig gerenderte DOM-Knoten. Wenn der Client die vom Server gerenderte HTML-Datei empfängt, identifiziert Angular diese existierenden DOM-Knoten und aktualisiert lediglich deren Eigenschaften und Attribute, anstatt eine vollständige Neuerstellung vorzunehmen.

Durch die Wiederverwendung der serverseitig gerenderten DOM-Knoten verringert sich die Zeit, die benötigt wird, um die Anwendung zu rendern. Das Resultat ist ein schnelleres Initialrendering und flickerfreie Übergänge.
Da keine Notwendigkeit besteht, neue DOM-Knoten zu erstellen, wird der Speicherverbrauch der Anwendung reduziert. Dies ist insbesondere für Geräte mit begrenzten Ressourcen, wie mobile Endgeräte, von Vorteil.

Mehr dazu findest in der Angular Documentaion: [Hydration](https://v17.angular.io/guide/hydration)

## Stabile Implementierung von Signals

Angular Signals sind nun stabil und nicht länger nur in der Developer Preview verfügbar. Signals sind das neueste Tool in der reaktiven Programmierung in Angular. Sie wurden erstmals im Mai dieses Jahres mit dem Update auf Version 16 als Developer Preview eingeführt und haben sich nun mit der Veröffentlichung von Angular 17 als festes Standbein des Frameworks etabliert.

Signals sind insbesondere für Junior Angular-Entwickler*innen ein hilfreiches Tool, da sie das reaktive Programmieren entscheidend erleichtern. Im Grunde sind sie - wie der Name es vermuten lässt - ein Signalgeber mit einem Wert, der alle verbundenen Consumer benachrichtigt, wenn sich dieser Wert ändert. Diese Werte können einfache Strings, ein Array oder auch komplexere Datentypen sein. Ändern sich diese Werte, werden automatisch alle Konsumenten informiert und aktualisieren ihre Werte. Im Vergleich zu Observables und RxJS bieten Angular Signals eine intuitivere und klarere Syntax. Dies führt zu einer verbesserten Lesbarkeit und Wartbarkeit des Codes und verbessert nebenbei auch signifikant die Leistung der Angular Anwendung.

Weitere Informationen zum Thema der Angular Signals findet ihr in den unsere bereits veröffentlichten Artikel auf Angular.de:

[Developer Ergonomics mit Angular Signals](https://angular.de/artikel/developer-ergonomics-hier-kommen-angular-signals/)

[Angular kurz erklärt: Signals](https://angular.de/artikel/angular-kurz-erklaert-signals/ )

## Die neue Control Flow-Syntax:

<iframe class="" width="100%" height="315" src="https://www.youtube-nocookie.com/embed/ENf9sNckFbs" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Die neue Control Flow-Syntax in Angular 17 ist noch im Developer Preview. Sie ermöglicht eine direktere und effizientere Kontrolle über das Template einer Komponente. Dies ist ein signifikanter Fortschritt gegenüber der vorherigen Situation, in der Strukturdirektiven wie ngIf, ngFor und ngSwitch zwar für die Template-Kontrolle verwendet wurden, aber in einem anderen Kontext als die Komponente selbst standen. Diese Direktiven gehörten zwar zum Framework, aber nicht direkt zur Komponentenlogik, was zu einer Diskrepanz zwischen Komponentenlogik und Template-Kontrolle führte.

Zum Beispiel kann eine Komponente nun direkt auf Änderungen im Template reagieren, ohne auf Umwege über Strukturdirektiven angewiesen zu sein. Ein Beispiel für diese neue Syntax könnte so aussehen:

```javascript
@template {
<!-- Bisher -->
 <div *if="bedingung">Inhalt anzeigen</div>

<!-- Neu -–>
@if(bedingung){
<div >Inhalt anzeigen</div>
}
```

[Hier findest du den Link zum passenden Stackblitz unseres Trainers Webdave](https://stackblitz.com/edit/angular-at-7tssno?file=package.json)

## Outro: Angular 17 – Eine neue Ära in der Developer Experience

Zusammenfassend können wir sagen, dass das Update auf Angular v17 eine Reihe von innovativen neuen Features und Tooling-Optimierungen mit sich gebracht hat. Im Ergebnis liefert das Angular Team wie gewohnt ein Paket signifikanter Performance-Boosts für das Framework. Damit zementiert Angular wieder einmal seinen Status als einer der Branchenführer für die professionelle Entwicklung von Enterprise Software.

Das Highlight der Feature-Updates in Angular 17 ist mit Sicherheit der neue Control Flow. Dieser befindet sich noch in der Developer Preview. Das bedeutet, dass das Feature weitgehend stabil ist, aber das Angular Team in den nächsten Monaten weiter am Feature arbeiten und Details entsprechend dem Feedback aus der Angular-Community anpassen wird. Die Angular Signals hingegen sind nun stabil, genauso wie die Integration von Vite und Esbuild in die Angular CLI.

Dieses Mal ging es jedoch um mehr als nur funktionelle Verbesserungen. Mit dem Update hat Angular auch einen neuen Look bekommen. Dazu gehören das neue Logo-Design, eine neue aktualisierte Dokumentation und insbesondere das neue Lernportal angular.dev.

Ist das jetzt schon eine Renaissance oder der Beginn einer neuen Ära?

Ja, und wir sind sogar bereits mitten in der "Angular Renaissance"!

Betrachten wir die Entwicklung des Frameworks der letzten Jahre, wird eines deutlich: die Angular-User-Experience hatte mindestens eine ähnliche Priorität wie die Performance des Frameworks. Features wie Signals oder der neue Control Flow erhöhen nicht nur die Performance des Frameworks, sondern vereinfachen vor allem das Arbeiten mit Angular. Auch das neue moderne Design muss in dieser Logik gedacht werden.

Die Entwicklung ist kein Zufall.Über die letzten Jahre hat sich das Angular-Team wieder verstärkt auf das Feedback und die Bedürfnisse der Angular-Community fokussiert und aktiv in die Weiterentwicklung des Frameworks integriert. Insbesondere die [Ergebnisse der jährlichen Angular-Umfrage](https://blog.angular.io/angular-developer-survey-2023-86372317c95f){:rel="noopener noreferrer nofollow"} tragen zur Priorisierung für das nächste Jahr bei, wie es Minko Gechev selbst sagt:

>One of the strongest guiding indicators which has been highly influential in our prioritization process are the results from the Angular developer survey.

Die Angular-Community hat gesprochen, und [die Angular-User-Experience wurde in der Roadmap 2024 als oberste Priorität ausgerufen](https://angular.dev/roadmap.). Das Angular-Team will vor allem attraktiver für Anfänger werden. Dazu werden nach und nach alle funktionellen Pain Points abgearbeitet, um es angehenden Angular-Entwicklern so leicht wie möglich zu machen, in die Welt von Angular einzutauchen.

Das sind sehr gute Neuigkeiten für alle Mitglieder der Angular-Community, insbesondere für unsere deutsche [Angular.de Community](https://angular.de/)). Schließlich bedeutet es, dass wir aktiv an der Zukunft des Frameworks teilhaben können. Eure Diskussionen und euer Feedback haben offiziell die höchste Priorität im Hause Angular. Deshalb ermutigen wir euch: Engagiert euch in unserer [Angular Community auf Discord](https://workshops.de/join-discord). Nehmt Teil an unseren 18 Meetups, die insgesamt über 10.000 Angular-Entwicklerinnen und -Entwickler als Plattform für regelmäßigen Austausch dienen. Wir sind damit in Europa die Region mit den meisten Angular-Entwicklerinnen.

[Werde Teil unserer Community und gestalte die Zukunft mit!](https://workshops.de/join-discord)
