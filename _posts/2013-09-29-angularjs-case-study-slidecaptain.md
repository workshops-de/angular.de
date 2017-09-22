---
title: "SlideCaptain - Entwicklung einer AngularJS-App"
description:
author: "Gerd Jungbluth"
slug: "angularjs-case-study-slidecaptain"
published_at: 2013-09-29 17:00:40.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-case-study-slidecaptain.jpg"
---

In letzter Zeit tut sich Einiges im Bereich der Präsentationssoftware. Neben den altbekannten Platzhirschen, die lokal auf dem Rechner installiert werden müssen, sind Web-basierte Alternativen mit unterschiedlichen Schwerpunkten entstanden. Wir zielen mit [SlideCaptain][1] darauf ab, das Editieren, Teilen und Präsentieren von gut strukturierten Präsentation so einfach und produktiv wie möglich zu machen. Und wenn SlideCaptain schon in der Cloud läuft, dann kann ich als User selbstverständlich auch meine Inhalte aus der Cloud (z.B. Dropbox, Evernote, YouTube u.v.a.m.) ganz simpel integrieren und das Ganze *responsive* auf der gesamten Palette der heutigen Endgeräte zeigen.

Und was hat das alles mit AngularJS zu tun? Ziemlich viel, weil das Frontend komplett damit entwickelt wurde. Auf Anregung von Philipp, Robin und Sascha hin möchten wir euch in diesem Artikel nun einen Einblick in unsere Erfahrungen bei der Entwicklung der App geben.

<!--more-->

### Datenmodell

Eine SlideCaptain Präsentation besteht - neben ein paar Meta-Informationen - aus Kapiteln, wobei jedes Kapitel wiederum eine oder mehrere Seiten enthält. Jede Seite gliedert sich in Abschnitte, die den eigentlichen Content als reines HTML beinhalten.

```json
{
  "__v": 26,
  "_id": "523174a9ee4de5a816000004",
  "author": "5138d1e49c9ae8a20e000004",
  "meta": {
    "lastUpdate": "2013-09-12T08:07:18.057Z",
    "title": "AngularJS Artikel",
    "stats": {
      "pages": 1,
      "sections": 1
    },
    "tags": ["AngularJS", "single page application", "Web app"],
    "createdDate": "2013-09-12T08:00:41.387Z",
    "slug": "angularjs-artikel"
  },
  "sections": [
    {
      "_id": "523174a9ee4de5a816000005",
      "pages": [
        {
          "_id": "523174a9ee4de5a816000006",
          "centered": true,
          "headline": "AngularJS Artikel",
          "paragraphs": [
            {
              "content": "<h1>AngularJS Artikel</h1>",
              "_id": "523175b7ee4de5a81600004b"
            }, {
              "content": "<p>Entwicklung einer modernen Web app am Beispiel von SlideCaptain</p>",
              "_id": "523175b7ee4de5a81600004a"
            }, {
              "content": "<p><a href=\"http://twitter.com/hankaSch\">Hanka Schmidt</a>&nbsp;/&nbsp;<a href=\"http://twitter.com/gjungb\">Gerd Jungbluth</a></p>",
              "_id": "523175b7ee4de5a816000049"
            }
          ],
          "background": {
            "image": {
              "size": "cover"
            }
          }
        }
      ],
      "title": "Einleitung"
    }
  ],
  "theme": {
    "animation": "fadeIn",
    "color": 5,
    "font": 4
  }
}
```


### Server (Node.js / MongoDB)

Serverseitig setzen wir [Node.js][2] und [MongoDB][3] ein, um über alle Schichten mit nur einem Datenformat (JSON) und einer Programmiersprache (JavaScript) effizient arbeiten zu können. Sämtliche CRUD-Operationen machen wir über ein REST-API zugänglich.

### Client (AngularJS)

Der Client ist eine reine [AngularJS][4] Single Page App. Auf dem Dashboard sieht man eine Liste der Präsentationen ("Flows") der eingeloggten Userin, im Workspace kann ein Flow bearbeitet werden.

![Dashboard][5]

![Workspace][6]

## Struktur der App

Zu Beginn haben wir uns natürlich Gedanken über die Struktur der App gemacht. Da wir jedoch keine festen Vorgaben (von außen) hatten, fiel die Planungsphase recht kurz aus, und wir sind schnell in die tatsächliche Umsetzung eingestiegen. Das Schöne bei AngularJS: die wesentlichen Bestandteile und ihre Aufgaben sind bereits definiert: Module, Services, Direktiven, Controller, Filter und Templates.

### Module

Wir haben den Client als 'One-Module' angelegt, weil wir Stück für Stück weiter entwickeln und nicht von vorne herein exakt abgrenzen konnten bzw. wollten, welche verschiedenen Module Sinn machen würden. In zukünftigen Versionen werden wir aber möglicherweise das Modul zum Editieren einer Seite (s.u.) herauslösen und auch Stand-alone zur Verfügung stellen.

### Third-Party Module

Gerne greifen wir natürlich auf externe Module zurück, als da wären:

*   [AngularUI][7] ('ui'): nützliche UI Helferlein
*   [UI Bootstrap][8] ('ui.bootstrap'): da wir das Layout ohnehin mit [Bootstrap][9] machen
*   [ui.ace][10] ('ui.ace'): die Userin kann beliebigen Code auf einer Seite präsentieren. Um das Einfügen / Editieren möglichst simpel zu machen, nutzen wir an der Stelle [Ace][11]
*   [ui.sortable][12]: zum Sortieren der Kapitel und Seiten per Drag and Drop
*   [angular-translate][13] ('ngTranslate'): SlideCaptain wird weltweit genutzt, daher möchten wir selbstverständlich auch Versionen in mehreren Spachen anbieten (derzeit fünf). Eine Einführung in das Modul gibt's unter [I18n in AngularJS Anwendungen einfach gemacht][14].
*   Darüber hinaus binden wir noch verschiedene JavaScript-Bibliotheken ein, die nichts mit AngularJS zu tun haben. (z.B. [Lo-Dash][15], [Moment.js][17], [MathJax][18])

### Services

Die Kommunikation mit der Außenwelt wird selbstverständlich über Services abgewickelt, hier die wichtigsten:

*   Sämtliche Kommunikation mit der REST-API wird über einen `RESTService` abgewickelt, der den AngularJS `$http`-Service nutzt (in Zukunft werden wir wahrscheinlich auf `$resource` umstellen (s.u.)). Der `RESTService` wird dann in die spezialisierten `UserService` und `PresentationService` injiziert.
*   Um das vom Server gelieferte JSON mit Methoden anreichern zu können, wird es von einer `PresentationFactory` bzw. `UserFactory` geparst. In den Controllern und Direktiven arbeiten wir dann mit diesen Modell-Objekten.
*   Derzeit ist SlideCaptain noch nicht offline-fähig, wir nutzen aber schon den *Local Storage* zum lokalen Speichern einiger Informationen (in einem `StorageService`, der auf [store.js][19] zurückgreift).

### Direktiven

Das besonders Schöne an AngularJS ist zweifellos die Möglichkeit, eigene Direktiven zu entwickeln. Deren wesentlichen Vorteile sehen wir in:

*   Kapseln von Code: eine Direktive übernimmt **eine** klar umrissene Aufgabe und der dazu nötige Code ist in der Direktive gekapselt.
*   Manipulation des DOMs: diese soll ausschließlich in Direktiven erfolgen, denn sie verbinden ja `$element` und `$scope` miteinander.
*   Wiederverwendbarkeit: weil eine Direktive **eine** Aufgabe übernimmt, kann sie natürlich auch an mehreren Stellen eingesetzt werden.
*   Lesbarkeit der HTML-Templates: da die Direktiven unmittelbar ins HTML eingebunden werden, ist für den Leser des Templates klar ersichtlich, welche Funktionalität zu erwarten ist.

Wir haben derzeit etwa 30 eigene Direktiven im Einsatz, von denen wir Euch ein paar kurz vorstellen möchten.

*   'scPageThumb': Rendern / Skalieren eines Thumbnails einer Seite (auf dem Dashboard, in der Liste der Seiten) `<div class="sc-page-thumb" sc-page-thumb sc-page="presentation.getFirstPage()" sc-theme="presentation.theme" data-width="{{thumbWidth}}"></div>`
*   'scFlowGrid': Rendern des kleinen Gitters mit den Kapiteln / Seiten `<div sc-flow-grid sc-presentation="presentation" sc-page="page" data-column-count="10" data-row-count="10"></div>`
*   'scSortList': Rendern / Sortieren (zusammen mit 'ui-sortable') der Liste der Seiten `<div id="sc-sort-list" sc-sort-list sc-presentation="selectedPresentation" sc-page="selectedPage" data-mode="{{listMode}}"></div>`

## Unsere Erfahrungen beim Arbeiten mit AngularJS

### Vorgeschichte

Die Kombination aus Node.js und MongoDB haben wir bereits seit etwa zwei Jahren im Einsatz. In den ersten Projekten (Thema: Datenvisualisierung) nutzten wir im Webclient eine Kombination aus [d3][20] und [Highcharts][21]. Da wir also nicht aus der klassischen jQuery-Welt kommen, waren wir bzgl. SlideCaptain völlig offen für die verschiedenen Client-Frameworks. Ein erstes Testprojekt mit AngularJS hat uns so schnell überzeugt, dass wir die Alternativen (z.B. [Ember.js][22], [Backbone.js][23], [Knockout][24]) gar nicht erst ausprobiert haben.

### Warum AngularJS?

Seit Kurzem gibt es einen sehr schönen Blog-Artikel zu [10 Reasons Why You Should Use AngularJS][25], der die wesentlichen Vorzüge von AngularJS aufzeigt. Wir haben uns hauptsächlich wegen folgender Punkte für AngularJS entschieden:

*   Änderungen am Model werden automatisch mit der View synchronisiert, Eingaben des Users werden automatisch mit dem Model synchronisiert ('two way data binding'), d.h. dass wir mehr mit weniger Code erreichen
*   Die View-Templates sind natives HTML, angereichert mit Direktiven, d.h. effiziente UI-Entwicklung ist möglich
*   Die Trennung zwischen Model/View/Controller ist klar definiert und somit entstehen bessere Architekturen
*   Die Modell-Objekte sind native JavaScript-Objekte (POJO), d.h. keine Vererbung nötig und Datenstrukturen sind eins zu eins wie in Node.js und MongoDB
*   Die (sehr mächtige) Möglichkeit, eigene Direktiven zu entwickeln, was ein modulares und agiles Entwickeln ermöglicht

### Stolperfallen

Trotz (oder vielleicht gerade wegen) der vielen Möglichkeiten, die AngularJS von Haus aus mitbringt, bleibt es natürlich nicht aus, dass manches auf Anhieb nicht so klappt, wie wir uns das gewünscht hätten.

*   Weil wir - um flexibel auf unsere eigenen Ideen und die unserer User reagieren zu können - in sehr kurzen Iterationen entwickeln, fehlt manchmal der Blick auf das große Ganze (die 'Architektur').
*   Besonders folgende Punkte mussten wir mit dem Wachsen von SlideCaptain immer mal wieder neu überdenken:
    *   verschachtelte `$scope`s (z.B. Welche Direktive und welcher Controller hat wie Zugriff auf die Modell-Objekte?)
    *   Event Handling (z.B. Wie erfahren die einzelnen Komponenten, wo sich was geändert hat?)
    *   Kommunikation zwischen Direktiven (z.B. Wie teilt die 'sc-toolbar'-Direktive der 'sc-wysiwygeditor'-Direktive mit, welchen Button der User geklickt hat?).
*   Da uns nicht unmittelbar klar war, wie das mit den 'Promises' funktioniert, haben wir relativ viel asynchronen Code, obwohl das sicher mit `$q` oder `$resource` eleganter lösbar ist.

### Was hat die Entwicklung aufgehalten?

Abgesehen von den Stolperfallen und der üblichen Lernkurve (Doku lesen, ausprobieren, Doku lesen, ausprobieren) hat uns, so lange wir uns innerhalb der Welt von AngularJS befinden, nichts wirklich aufgehalten. Allerdings gibt es ein paar Besonderheiten von SlideCaptain, an die wir uns Stück für Stück heran tasten mussten, um zur besten Lösung zu kommen.

*   Kernstück von SlideCaptain ist natürlich das Editieren einer Seite. Der Content besteht aus reinem HTML (s.o.), das in der eigentlichen Präsentation mit [Flowtime.js][26] formatiert wird. Wir haben zunächst mehrere Open Source (HTML5)-Texteditoren getestet, die alle ihre Vor- und Nachteile hatten. Nach allen Tests haben wir uns dann aber entschieden, den Editor komplett selbst zu entwickeln.
*   Bei der eigentlichen Editorfläche setzen wir auf `contenteditable` und [Rich-Text Editing][27]. Das ist einerseits sehr praktisch / modern, andererseits gibt es - wie zu erwarten - Unterschiede zwischen den Browsern, die z.T. Sonderprogrammierung notwendig machen.
*   Die Lösung der Aufgabe 'Wie bekommen wir das hin, dass Dashboard, Workspace und Präsentation bei der Vielzahl mittlerweile üblicher Bildschirmdimensionen fast exakt gleich aussehen?' hat mehrere Anläufe gebraucht.

## Fazit

Wir sind davon überzeugt (und erzählen das auch gerne jedem, der es hören möchte), dass derzeit die effizienteste und flexibelste Art, Single Page Web Apps à la SlideCaptain zu entwickeln, aus der Kombination von MongoDB, Node.js und AngularJS besteht. :-)

[Anmerkung der Redaktion: Diese Kombination der Technologien ist mittlerweile so populär geworden, dass sie unter dem Namen *MEAN-Stack* (MongoDB, Express, AngularJS, Node.js) bekannt geworden ist.]

Übrigens: Feedback zu diesem Artikel und selbstverständlich auch zu SlideCaptain sind jederzeit herzlich willkommen.

 [1]: https://www.slidecaptain.com/
 [2]: http://nodejs.org
 [3]: https://www.mongodb.com/
 [4]: http://angularjs.org/
 [5]: angularjs-case-study-slidecaptatin-dashboard.png
 [6]: angularjs-case-study-slidecaptatin-workspace.png
 [7]: http://angular-ui.github.io/
 [8]: http://angular-ui.github.io/bootstrap/
 [9]: http://getbootstrap.com/
 [10]: https://github.com/angular-ui/ui-ace
 [11]: http://ace.c9.io
 [12]: https://github.com/angular-ui/ui-sortable
 [13]: http://angular-translate.github.io/
 [14]: /artikel/angularjs-i18n-ng-translate/
 [15]: http://lodash.com/
 [17]: http://momentjs.com/
 [18]: http://www.mathjax.org/
 [19]: https://github.com/marcuswestin/store.js
 [20]: http://d3js.org/
 [21]: http://www.highcharts.com/
 [22]: http://emberjs.com
 [23]: http://backbonejs.org/
 [24]: http://knockoutjs.com/
 [25]: http://www.sitepoint.com/10-reasons-use-angularjs/
 [26]: https://marcolago.github.io/flowtime.js/
 [27]: https://developer.mozilla.org/en/docs/Rich-Text_Editing_in_Mozilla
