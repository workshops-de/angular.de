---
title: "Ist der Angular & TypeScript Workshop die richtige Entscheidung?"
description: "Ein kleiner Einblick von Michael Wellner in den Angular & TypeScript Workshop"
author: "Michael Wellner"
published_at: 2020-06-29 15:00:00
header_source: https://unsplash.com/photos/idmvPhF8t4E
categories: "angular remote schulung"
---

## Der Besuch eines Angular & TypeScript Workshops
von Michael Wellner.

Vom 12.02. - 14.02.2020 war ich auf dem "Angular & TypeScript Intensiv Workshop" von workshops.de / angular.de in Berlin.
Ich bin aktuell in einem Angular Projekt tätig, weshalb ich schon etwas Vorwissen mitbrachte. Nach einer kurzen Vorstellung des Trainers und der geplanten Inhalte, hatte jeder/jede Teilnehmer:in die Möglichkeit sich vorzustellen. Was ziemlich cool ist, es gibt ein Online Portal, zu dem die Teilnehmer:innen Zugriff haben und sich während und auch nach dem Workshop noch Folien und Aufgaben anschauen können und sich zusätzlich noch per Chat austauschen können.

## Einleitung
Da der Trainer sich auch mit React auskennt, wurde zu Beginn natürlich erst mal diskutiert, warum man sich denn für Angular entscheiden sollte. Die Folien sagten so Dinge wie: Baut auf Erfahrungen von AngularJS auf, bietet dem Entwickler Unterstützung das Richtige zu tun, versucht sich sehr nah an Web Standards zu halten, hat eine gute Wartbarkeit und es gibt ganzheitliche Lösungen für bekannte Herausforderungen wie z.B. i18n oder Animations.
Ich selbst würde noch hinzufügen, dass die Angular CLI ziemlich ausgereift ist, da diese einem gewisse Tipparbeit abnehmen kann. Außerdem bietet Angular solche Features wie Ahead-of-time-Compilation und Server-Side-Rendering. Zusätzlich sollte man natürlich auch die Trends nicht aus den Augen verlieren. Der Punkt, dass Angular ein sehr großes Bundle ausliefert ist sicher nicht ganz falsch, jedoch kann man hier durch Architektur (Lazy Laoding) und Aktualität (Angular 9 Ivy Compiler) einiges "reinholen".


## TypeScript
Als erster großer Punkt war TypeScript dran. Beginnend mit den Begrifflichkeiten "JS", "ES", "TS". ES - oder besser gesagt ECMAScript ist der offizielle Standard für JavaScript. Nach ES5 gab es einen Switch auf die Jahreszahlen in der Bezeichnung, weshalb ES2015 folgte. Dieser Standard ist wichtig für die Funktionalitäten die man verwendet und welche der Ziel Browser unterstützt. Das so genannte Transpilieren erfolgt dann über Babel, was bereits mit einem Angular Projekt ausgeliefert wird. Vergleichbar mit Java wäre das so "ich entwickle mit den coolen Java 8 Features und Babel transpiliert die App in Java 7 für meinen alten Server" (was leider nicht möglich ist bei Java). Mit ES5 gibt es einen gemeinsamen Nenner, um auch alte IE Browser zu verwenden. Deshalb ist meistens das Ziel den Code in ES5 zu transpilieren.

Natürlich wurden die Typen vorgestellt, und auch über Type Inference gesprochen, darauf möchte ich aber hier nicht eingehen.
Ein wichtiger Punkt war jedoch, dass das Verhältnis der Zuweisungen mit `const` zu `let` mindestens 70/30 betragen soll. Hier hilft einem auch der TSLinter und zeigt Variablen an, welche nicht mehr überschrieben werden aber fälschlicherweise mit `let` zugewiesen wurden.
Bei TypeScript gibt es mit dem Typ `any` eine Möglichkeit den Typ quasi weg zu lassen. Was ich davor schon des Öfteren gelesen hatte, bestätigte der Trainer: Hauptsächlich ist es die Faulheit des Entwicklers - darauf passt auch folgender Kommentar "any ist das neue TODO". Aber es muss nicht nur Faulheit sein, sondern kann auch die Unwissenheit über den Typ sein, vor allem bei Third-Party-Libraries. Hier kann jedoch das GitHub Projekt "DefinitelyTyped" Abhilfe verschaffen, in dem man gewisse Typings herunterladen und somit seine Objekte typisieren kann. Sind die Objekte hier nicht zu finden, gibt es immer noch die Möglichkeit, durch eigene Interfaces, Typen zu vergeben. Deshalb ist der Trainer der Meinung, dass es eigentlich keinen Grund mehr für die Verwendung von `any` gibt.

Des Weiteren wurden Closures angesprochen. Ein sehr komplexes und verwirrendes Thema (manchmal durch die "neue" Schreibweise mit den so genannten Fat Arrows noch verwirrender), aber ein durchaus interessantes Konzept!
Fat Arrow Funktionen wurden in diesem Zuge auch gleich besprochen.

Außerdem ging es darum, dass man z.B. als DTOs Interfaces den Klassen bevorzugen sollte. Das hat einen entscheidenden Punkt, dass Klassen beim Build echten Code erzeugen (also KBs die ausgeliefert werden), während Interfaces kein Code erzeugen. Somit kann man damit definitiv die Größe der App beeinflussen.
Als Beispiel `const book: { title: string, isbn: string}` - das ist auch schon ein Interface.
Außerdem sind die Decorators (in Java die Annotations) aktuell für TypeScript noch nicht freigegeben, weshalb ein jedes Angular Projekt (was nicht ohne Decorator auskommt) in der tsconfig Datei die `experimentalDecorators:true` setzen muss.


## Angular
Eines vorweg: Da Angular 9 erst ein paar Tage vor dem Workshop erschienen ist, haben wir Angular 8 verwendet.

Zum Schluss des ersten Tages wurde die Angular CLI - vor allem der Angular Generator vorgestellt. Mit diesem kann man ganz einfach mittels `ng generate component xyz` oder `ng generate directive abc` (und weiteren) Klassen, Templates, CSS Dateien, mit vorgegebener Struktur generieren lassen.

Außerdem wurde der Zusammenhang zwischen Modulen und Komponenten besprochen. Man soll wohl nicht mit Modulen geizen, da diese dann sehr gut nachträglich noch für ein Lazy Loading verwendet werden können. Außerdem hat der Trainer Angular Material als Beispiel genommen, dort ist jede Komponente gleichzeitig ein Modul, welches man ganz einfach importieren und somit die Komponente verwenden kann.

Am zweiten Tag haben wir mit der wirklichen Programmierung begonnen und mit der Angular CLI eine App, zwei Module und mehrere Komponenten erzeugt. Es ging darum in den verbleibenden zwei Tagen eine Bücherverwaltung (Liste, Buch anzeigen, Buch editieren) zu entwickeln.
(Auf den Code möchte ich hier nicht mehr näher eingehen, lediglich auf ein paar allgemeine Konzepte)

Zu Beginn haben wir also mit der Angular CLI die App, zwei Module und ein paar Komponenten erzeugt. Die Navigationsleiste haben wir aktuell noch mit echten Verlinkungen (so genannten "full-page-reloads") versehen, was eigentlich nicht dem Konzept einer SPA (Singe-Page-Application) entspricht, aber das Thema Routing war erst an Tag 3 dran.
Danach wurden die wichtigen Konzepte Property- und Event-Binding besprochen und anhand von kleinen Beispielen nach programmiert (Button-Klicks, Ausgeben der Maus-Position). Dies war dann der Start für die "echte" Komponenten Programmierung mit Inputs (Property Binding einer Komponente) und Outputs (Event Binding einer Komponente).

Um nun Daten einfacher zwischen Komponenten zu teilen, gibt es die Services in Angular, welche durch den Injectable Decorator in jeder beliebigen Komponente eingebunden werden können (analog zur Dependency Injection mit Spring in Java). Wenn man `provideIn: 'root'` angibt, registriert man den Service global. Dependency Injection wird bei Angular aus denselben Gründen wie bei Spring verwendet: Komponenten Klassen sauber halten (man braucht lediglich eine private Variable im Konstruktor) und man kann den Code besser testen. Jedoch hat man schnell mit zirkulären Abhängigkeiten zu kämpfen und muss deshalb aufpassen, wo man was injected, außerdem kommt es auch auf die Ebene an, in der man injected, da es sonst eventuell kein Singleton mehr ist und man Probleme mit der Datenkonsistenz bekommt.

Das Thema Observables wurde auch angesprochen, da dies aber sehr komplex ist, möchte ich hier in meinem Artikel nicht großartig darauf eingehen. Observables oder RxJS ist die Implementierung von reaktiver Programmierung im Frontend. Der von Angular angebotene HttpClient basiert auf Observables, weshalb man in einer App mit REST Aufrufen zwangsläufig nicht um Observables herumkommt.
Wir haben die bereitgestellte "bookmonkey-api" verwendet, welche wir via npm installiert haben und dann auf einem separaten Port gestartet haben.

Zum Schluss des zweiten Tages haben wir noch die Lifecycle Hooks einer Komponente erklärt bekommen. Es gibt hier die Möglichkeiten auf verschiedene Zustände einer Komponente zu reagieren.
Der dritte Tag begann mit zwei Hinweisen: Das Thema "Content Projection" soll wohl sehr interessant sein und man soll sich das mal nach dem Workshop anschauen. Außerdem hat der Trainer gezeigt, wie man mittels "webpack-bundle-analyzer" sein auslieferbares Bundle vor allem mit Blick auf die Speichergröße analysieren kann.

Das wichtigste an diesem Tag war das Thema Routing. Wir haben in unserer App Routing eingebaut um auf die Liste der Bücher und auf eine About Seite zu navigieren (ohne "full-page-reload"). Es wurde darüber diskutiert in welchem Module die Pfade registriert werden sollten. Unser BookRouting Module hat dann den Pfad `book` bekommen und zusätzlich haben auch noch die children `:isbn` und `:isbn/edit` angelegt. Diese wurden benötigt, um die Details eines Buches anzeigen zu können.
Zum Schluss des Tages haben wir Forms angeschaut - zuerst den Template Driven Ansatz und danach Reactive Ansatz. Der Hauptunterschied ist, dass man beim Template Driven Ansatz die Erstellung und Konfiguration im HTML Template hat, während man beim Reactive Ansatz den größten Teil im Code (Typescript Date) macht. Deshalb sind Template Driven Forms hauptsächlich für einfach Forms wie ein Login geeignet. Eine Form haben wir für das Editieren eines Buches unter `:isbn/edit` aufgerufen, um dort dann mittels Input Felder und Validierung das Buch zu ändern und wieder zu speichern. Die ISBN haben wir dabei der vorher angelegten Route mittels Parameter übermittelt.
Ganz am Ende hat uns der Trainer dann noch Unterlagen bezüglich Angular Testing freigeschalten, welche sich jeder bei Bedarf im Nachgang noch anschauen kann.


## Persönliches Fazit
Richtig cooler Workshop, vor allem für Angular Anfänger. Persönlich hatte ich bereits gewisse Vorkenntnisse und habe mich deshalb zusätzlich noch etwas mit Angular Material für das Design und ag-grid für eine ansprechende Bücherliste in Tabellenform beschäftigt. Ich habe vieles aus dem Workshop mitgenommen und er hat mir gezeigt, dass ich auf dem richtigen Weg bin was meine Vorkenntnisse angeht. Angular ist wirklich sehr interessant, und nimmt einem einiges ab (Stichwort CLI, Webpack und Babel). Außerdem kann man - wenn man diszipliniert Clean Code macht - durch Trennung von HTML, CSS und TypeScript, seine App sehr gut strukturieren. Deshalb kann ich definitiv sagen, dass es die richtige Entscheidung war Angular zu lernen.
