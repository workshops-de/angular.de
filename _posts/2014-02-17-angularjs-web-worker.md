---
title: "Die JavaScript Web Worker API mit AngularJS"
description: Lerne, wie du Web Worker zusammen mit AngularJS einsetzen kannst und wie du damit deine Applikations-Performance extrem erhöhen kannst.
author: "Björn Weinbrenner"
slug: "angularjs-web-worker"
published_at: 2014-02-17 10:30:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-web-worker.jpg"
---

Web Worker ist eine relative neue Spezifikation, um Multi-Threading im Browser zu ermöglichen. Über eine JavaScript-API können zusätzlich zum Haupt- oder UI-Thread einer HTML-Seite weitere Threads gestartet und über eine nachrichtenbasierte Schnittstelle angesprochen werden. Der Einsatz von Web Workern hat zwei entscheidende Vorteile:

Zum einen können Prozesse parallelisiert werden, indem eine Gesamtaufgabe in kleinere Aufgaben heruntergebrochen wird. Diese können gleichzeitig ausgeführt werden. Ressourcen lassen sich so besser ausnutzen, was insbesondere bei Multi-Core-Prozessoren zugute kommt. Ob eine parallelisierte Aufgabe schneller ausgeführt wird, kann jedoch nicht pauschal beantwortet werden. Das ist abhängig von der Aufgabe und dem Gerät bzw. Browser, auf dem der Code ausgeführt wird.

Zum anderen kann bei rechenintensiven Operationen der Haupt-Thread entlastet werden. Dies ist insbesondere deshalb wichtig, um das Benutzerinterface nicht zu blockieren. Alternativ müsste man nämlich als Entwickler manuell schedulen. Das heißt komplexe Operationen immer wieder über ein setTimeout() unterbrechen, um Zeit für das Rendern des Interfaces zu schaffen.

Wie wichtig Letzteres sein kann, verdeutlicht das folgende Code-Beispiel ([hier als JSFiddle][1]):

```javascript
$('#status').html('Back in a second.');
var start = new Date().getTime();
for (; new Date().getTime() - start < 1000;) {}
$('#status').html('I\'m back.');
```


In der ersten Zeile soll mithilfe von jQuery `Back in a second` ausgegeben werden, bevor dann eine Sekunde lang eine Schleife läuft. Anschließend wird `I'm back` ausgegeben. Das Interessante hieran: Wider Erwarten wird die Nachricht `Back in a second` nie angezeigt. Solange die Schleife läuft, werden keine weiteren Anweisungen ausgeführt, auch nicht das Rendern der Nachricht, obwohl es vor der Schleife in Auftrag gegeben wurde. Wenn dann der Thread bereit dafür wäre, wird die Ausgabe sofort von der letzten Zeile überschrieben.

Was bis hierhin alles eher theoretisch klingt, ist für das Online-Tagebuch [monkkee][2] von praktischer Natur. **monkkee** verschlüsselt und entschlüsselt Tagebucheinträge im Browser mit JavaScript. Außerdem kommt ein starker Hashing-Algorithmus beim Login zum Einsatz.

Damit die Anwendung stets benutzerfreundlich reagiert (z.B. durch Darstellung eines Wartedialogs während der Entschlüsselung, wie im folgenden Screenshot), sind die rechenintensiven Algorithmen ausgelagert und laufen in einem Web Worker.

![AngularJS Web Worker Monkkee][3]

Ohne in die Tiefe zu gehen hier eine kurze Erklärung, wie die Web Worker API funktioniert: Das Worker-Skript wird über eine URL angesprochen. Somit ist der Code der Webseite und der Code des Workers zur Laufzeit vollkommen entkoppelt. Nach Initialisierung des Workers registriert man einen Callback als **onmessage**-Methode. Nun kann man dem Worker Nachrichten senden (**postMessage**-Methode) und Nachrichten vom Worker empfangen (über den Callback).

![AngularJS Web Worker Communication][4]

Weitere Quellen zum Verständnis von Web Workern:

*   Offizielle W3C Spezifikation: <http://www.w3.org/TR/workers/>
*   Wikipedia-Artikel: [Web Worker][5]
*   Artikel auf Developer.com: [7 Things You Need To Know About Web Workers][6]

Web Worker werden von allen modernen (inklusive fast aller mobilen) Browsern unterstützt. Eine Übersicht hierzu bietet [Can I use...][7]

## Web Worker in einer AngularJS-Applikation

Die Behandlung von Web Workern in monkkee habe ich jüngst als Mini-Open-Source-Projekt ausgelagert. monkkee nutzt nun den ausgelagerten Code als AngularJS-Modul und verwendet einen fertigen Service per Dependency Injection.

Das Projekt heißt [webworkerpool.js][8] und ermöglicht es, einen Pool an Workern zu verwalten. Die maximale Anzahl an Workern lässt sich konfigurieren. Wird ein Worker benötigt, wird dieser dem Pool entnommen. Sobald dieser mit seiner Aufgabe fertig ist, kommt er in den Pool zurück. Falls keine Worker verfügbar sind, werden die Aufträge in eine Warteschlange eingestellt. Ob Aufträge direkt oder später ausgeführt werden, ist für den Auftraggeber bedeutungslos, da die Promise API (**$q**) zum Einsatz kommt.

Die Anzahl der Worker ist sehr wichtig. Für monkkee kommen aktuell maximal 8 gleichzeitige Worker zum Einsatz. Beim Spielen mit hohen Zahl habe ich einen Browser auch schon zum Absturz gebracht. Abhängig von den Aufgaben ist also ein sinnvoller Wert zu wählen.

Die Web Worker API wird durch den Einsatz der Bibliothek nur noch indirekt verwendet. Untenstehende Code-Beispiele zeigen, wie das geht.

## Code-Beispiele

### Konfiguration

Um das Modul webWorkerPool zu verwenden, wird es einfach als Modulabhängigkeit deklariert:

```javascript
angular.module('myApp', ['webWorkerPool']);
```


Damit es richtig los gehen kann, bedarf es eines konfigurierten WebWorkerPools. Um einen solchen zu bekommen bestehen zwei Möglichkeiten: Wer in seiner Applikation nur ein einziges Worker-Script ansprechen möchte, der kann die URL des Workers und die Kapazität des Pools zentral konfigurieren und sich dann den Service **webWorkerPool** injizieren. Die Konfiguration wird über den Provider des Services vorgenommen, indem **workerUrl** und **capacity** gesetzt werden.

```javascript
angular.module('webWorkerPool').config(function(webWorkerPoolProvider) {
  webWorkerPoolProvider.workerUrl('hello-worker.js');
  webWorkerPoolProvider.capacity(8);
});
```


Wer mehrere Worker-URLs ansprechen möchte, der kann den WebWorkerPool selbst erstellen. Dazu besteht ein Service webWorkerPoolFactory. Über die createPool-Methode wird der WebWorkerPool erstellt, URL und Pool-Kapazität werden als Parameter übergeben.

```javascript
var webWorkerPool = webWorkerPoolFactory.createPool('hello-worker.js', 8);
```


## Verwendung des WebWorkerPools

Genau wie die Web Worker API bietet WebWorkerPool eine postMessage-Methode, mit der Nachrichten an den Worker gesendet werden können. Der Rückgabewert ist ein Promise. Durch Registrierung eines then-Callbacks auf diesem Promise kann die weitere Verarbeitung gesteuert werden. Die Registrierung eines onmessage-Callbacks ist nicht notwendig, dies wird durch die WebWorkerPool-Bibliothek intern gemacht.

```javascript
webWorkerPool.postMessage('Bob').then(function(event) {
  console.log(event.data);
});
```


Weitere Codebeispiele bieten die Jasmine-Specs des Projekts.

## Installation von webworkerpool.js

Im [dist-Ordner][9] des Github-Projekts befinden sich mehrere Dateien. Für den Einsatz mit Angular ist webworkerpool-core-angular.js oder die komprimierte Versionwebworkerpool-core-angular.min.js am Besten geeignet.

## Fazit

Mit Web Workern lassen sich rechenintensive Prozess auslagern und gegebenenfalls parallelisieren. Der UI-Thread wird entlastet und die Benutzerinteraktion läuft flüssig.

Bei der Entwicklung von monkkee konnte durch den Einsatz von mehrere parallelen Web Workern ein Performance-Gewinn erzielt werden. Die Anwendung ist auch dann benutzerfreundlich, wenn im Hintergrund Verschlüsselungsalgorithmen laufen.

Durch den Einsatz der WebWorkerPool.js-Bibliothek lassen sich sehr einfach mehrere Worker erstellen und in einem Pool verwalten. Die Gefahr, dass zu viele Worker den Browser überfordern oder gar zum Absturz bringen, wird durch eine maximale Kapazität und eine interne Warteschlange sichergestellt.

 [1]: http://jsfiddle.net/bjoerne/zeLxM
 [2]: http://www.monkkee.com
 [3]: angularjs-web-worker-monkkee.png
 [4]: angularjs-web-worker-communication.png
 [5]: http://en.wikipedia.org/wiki/Web_worker
 [6]: http://www.developer.com/lang/jscript/7-things-you-need-to-know-about-web-workers.html
 [7]: http://caniuse.com/#feat=webworkers
 [8]: https://github.com/bjoerne2/webworkerpool.js
 [9]: https://github.com/bjoerne2/webworkerpool.js/tree/master/dist
