---
title: "Funktionale Reaktive Programmierung mit Bacon.js"
description: "Dieser Artikel soll Euch Funktionale Reaktive Programmierung näher bringen, damit Ihr komplexe Interaktionen mit einfachem, kompaktem Code umsetzen könnt."
author: "Ramy Hardan"
slug: "angularjs-baconjs"
published_at: 2014-07-07 07:00:00.000000Z
categories: "angularjs reactive observables"
header_image: "/artikel/header_images/angularjs-baconjs.jpg"
---

Dieser Artikel soll Euch Funktionale Reaktive Programmierung näher bringen und in Verbindung mit AngularJS schmackhaft machen, damit Ihr komplexe Interaktionen mit einfachem, kompaktem Code umsetzen könnt.

## Was ist Funktionale Reaktive Programmierung?

Wer schon Formeln in Excel verwendet hat oder Databinding in AngularJS nutzt, kam bereits in den Genuss reaktiver Programmierung. Wir brauchen uns nicht selbst um die Aktualisierung des Zustands bei Änderungen zu kümmern, sondern überlassen diese Aufgabe der Plattform. Voraussetzung ist, dass wir ihr vorher die Abhängigkeiten zwischen den Daten beibringen.

In AngularJS definieren wir Abhängigkeiten zwischen Scope (Model) und DOM (View) meist über Direktiven, z.B. *ngModel*:

```html
<input ng-model="username" type="text">
```


Damit haben wir AngularJS beigebracht, das Eingabefeld zu beobachten und alle Änderungen an den Scope weiterzuleiten und dort den `username` entsprechend aufzufrischen (ebenso in umgekehrter Richtung). Das Entscheidende dabei ist, dass es sich nicht um einen One-Night-Stand handelt, sondern um eine dauerhafte Beziehung: Jeder beobachtet den anderen und reagiert, wenn sich etwas beim Partner ändert.

Hier sind wir schon im Kern reaktiver Programmierung: Sie konzentriert sich auf Zustandsänderungen über die Zeit hinweg und nicht nur auf den aktuellen Zustand.

Etwas abstrakter ließe sich das obige Beispiel so schreiben:

```javascript
scope.username = dom.input
```


Im nicht-reaktiven Zusammenhang wäre dies eine einfache Zuweisung: "Weise der Variablen `scope.username` einmalig den aktuellen Wert der Variablen `dom.input` zu."

Bei reaktiver Programmierung bedeutet der Ausdruck: "Beobachte ständig jede Änderung in `dom.input` und leite sie an `scope.username` weiter." Wegen dieser Eigenschaft hat sich die Bezeichnung *Observable* für solche dynamischen Datentypen durchgesetzt. Das *Observable* ist der funktionale Bruder des objektorientierten [Observer-Entwurfsmusters](https://de.wikipedia.org/wiki/Beobachter_(Entwurfsmuster)).

Die Werte eines *Observable* sind also nie einfach, sondern immer Ströme von Werten über die Zeit. Wenn ich z.B. `Ramy` in das Eingabefeld tippe, dann könnte `dom.input` den Wert `...'R'....'a'..'m'...'y'..` haben, je nachdem, wann ich die Tasten drücke. Die Punkte entsprechen jeweils einer Zeiteinheit.

|   | Synchron | Asynchron |
| Ein Wert | ![Bild](medium_bacon1.png?v=12345678)<br>Datentyp: z.B. Number | ![Bild](medium_bacon3.png?v=12345678)<br>Datentyp: Promise/Future |
| Viele Werte | ![Bild](medium_bacon2.png?v=12345678)<br>Datentyp: Array/Object | ![Bild](medium_bacon4.png?v=12345678)<br>Datentyp: Observable |
|   |   |   |

Das war der reaktive Teil, es fehlt noch der funktionale. Auf den Ereignisströmen lassen sich Funktionen definieren, deren Ergebnisse wiederum Ereignisströme sind. So können wir Ströme  kombinieren und zu einer "Kanalisation" ausbauen, um komplexes Verhalten abzubilden.

Wie das konkret in JavaScript aussieht, schauen wir uns am Beispiel von [Bacon.js](http://baconjs.github.io/) an.

## Was ist Bacon.js?

[Bacon.js](http://baconjs.github.io/) ermöglicht Funktionale Reaktive Programmierung in JavaScript. Beginnen wir mit einem Beispiel:

```javascript
var tickStream = Bacon.interval(500, 1);
```

Der Wert von `tickStream` ist ein [EventStream](https://github.com/baconjs/bacon.js#eventstream), in dem alle 500 Millisekunden eine `1` erscheint.

```javascript
....1....1....1....
```

Bacon.js liefert viele Funktionen, die Komposition von Strömen ermöglichen. Aus dem `tickStream` wollen wir nun einen neuen Strom erzeugen, der abwechselnd `0` und `1` enthält, statt nur `1`:

```javascript
var tickStream = Bacon.interval(500, 1);
var aggregator = function(aggregate, tick) {
  return aggregate !== tick ? 1 : 0
}
var ticktackStream = tickStream.scan(0, aggregator);
```

Die Funktion [scan](https://github.com/baconjs/bacon.js#observable-scan) aggregiert Werte eines Stroms. Dazu übergibt man ihr einen Startwert und eine Aggregierungsfunktion. Die Aggregierungsfunktion erhält als Argumente das Ergebnis ihres letzten Aufrufs (bzw. den Startwert beim ersten Aufruf) und den aktuellen Wert des Stroms. In unserem Beispiel sehen die Aufrufe von `aggregator` so aus:

```javascript
(0, 1) -> 1  // Startwert von scan,         1. Wert aus tickStream
(1, 1) -> 0  // 1. Ergebnis von aggregator, 2. Wert aus tickStream
(0, 1) -> 1  // 2. Ergebnis von aggregator, 3. Wert aus tickStream
```
usw.

Unsere beiden Ströme enthalten also folgende Werte:

```javascript
    tickStream:      ....1....1....1....
    ticktackStream: 0....1....0....1....
```

Das Ergebnis von `scan` ist streng genommen kein *EventStream*, sondern eine *Property*. Der Unterschied ist, dass eine *Property* einen aktuellen Wert (und ggf. einen Startwert) besitzt. Sie entspricht dem Konzept der überwachten Properties im Scope und ermöglicht die leichte Integration mit AngularJS, wie wir später sehen werden.

Da `ticktackStream` einen aktuellen Wert hat, benennen wir ihn um und korrigieren unser Schaubild:

```javascript
    tickStream:    ....1....1....1....
    ticktackProp: 00000111110000011111
```

*EventStream* und *Property* sind lediglich unterschiedliche Sichtweisen auf veränderliche Werte. Anfangs verwirrt diese Unterscheidung eher, die jeweiligen Einsatzzwecke werden aber mit der Zeit klarer. Mit `eventStream.toProperty()` bzw. `property.changes()` können wir beruhigenderweise immer eine Sicht gegen die andere tauschen.

Im nächsten Abschnitt verheiraten wir Bacon.js mit AngularJS und erwecken ein lange und schmerzlich vermisstes HTML-Element wieder zum Leben.

## Wie bleiben wir mit AngularJS im Fluss?

Glücklicherweise ebnet uns das Modul [angular-bacon](https://github.com/lauripiispanen/angular-bacon) einen bequemen Weg, AngularJS und Bacon.js miteinander zu verbinden:

```javascript
var baconProperty = $scope.$watchAsProperty('scopePropertyName') // AngularJS -> Bacon.js
baconPropertyOrStream.digest($scope, 'scopePropertyName')        // Bacon.js -> AngularJS
```

So können wir z.B. in unseren AngularJS-Controllern Properties aus dem Scope als Bacon.js-Properties nutzen und reaktiv weiterprogrammieren. Betten wir unseren bisherigen Bacon.js-Code also in einen Controller ein und binden den aktuellen Wert von `ticktackProp` an eine Scope-Property `ticktack`:

```javascript
angular.module( 'baconDemo', ['angular-bacon'] ).controller( 'baconCtrl', function($scope) {
    var tickStream = Bacon.interval(500, 1);
    var aggregator = function(aggregate, tick) {
      return aggregate !== tick ? 1 : 0
    };
    var ticktackProp = tickStream.scan(0, aggregator);

    ticktackProp.digest($scope, 'ticktack');
});
```


Da `ticktack` jetzt im Scope liegt, können wir sie wie gewohnt in AngularJS nutzen:

```html
<p ng-controller="baconCtrl">
  Ticktack: {{ticktack}}
</p>
```

<iframe src="https://embed.plnkr.co/C19tGuKws9aa2IOpPX3f/" width="100%" frameborder="0"></iframe>

[Plunkr in neuem Fenster öffnen](https://embed.plnkr.co/C19tGuKws9aa2IOpPX3f/)

### Zurück in die 90er: Die Wiederbelebung von &lt;blink&gt;

Sogar [Google vermisst &lt;blink&gt;](https://www.google.de/search?q=blink+tag). Erwecken wir es also wieder zum Leben. Dazu erstellen wir eine Direktive `blink`, deren Sichtbarkeit wir über [ng-style](https://docs.angularjs.org/api/ng/directive/ngStyle) mit Hilfe unserer `ticktackProp` wechseln.

Im ersten Schritt erzeugen wir aus unserer `ticktackProp` mundgerechte CSS-Happen für [ng-style](https://docs.angularjs.org/api/ng/directive/ngStyle) und binden sie an den Scope:

```javascript
var toVisibility = function(ticktackVal) {
  return ticktackVal ? {visibility:'visible'} : {visibility: 'hidden'};
};
var blinkProp = ticktackProp.map(toVisibility);

blinkProp.digest($scope, 'blinkCss');
```


Die von [map](https://github.com/baconjs/bacon.js#observable-map) erzeugte neue Bacon.js-Property `blinkProp` enthält alle mit der Funktion `toVisibility` abgebildeten Werte aus `ticktackProp`:

```javascript
ticktackProp: 00000111110000011111
blinkProp:    hhhhhvvvvvhhhhhvvvvv
```

Im Scope haben wir nun eine Property `blinkCss` mit CSS-Daten, die wir für unsere Direktive nutzen:

```javascript
angular.module('baconDemo').directive( 'blink', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div ng-style="blinkCss" ng-transclude></div>',
  }
});
```


Jetzt steht uns nichts mehr im Weg auf unserer Reise zu den Ursprüngen der Webgestaltung:

```html
<p ng-controller="baconCtrl">
  <blink>This should blink</blink>
  This shouldn't
  <blink>This should blink, too</blink>
</p>
```


<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/YISUVli19yzmmyW3KCmf/preview.html" width="100%" frameborder="0"></iframe>

[Plunkr in neuem Fenster öffnen](https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/YISUVli19yzmmyW3KCmf/preview.html)

### Es nervt auf Dauer, bitte ausschalten!

Geben wir nun dem Nutzer die Möglichkeit, das Gezappel auf dem Bildschirm mit einem Button ab- und anzuschalten. Dazu definieren wir einen Button:

```html
<p ng-controller="baconCtrl">
  <button ng-click="shouldBlink = !shouldBlink">Blink: {{shouldBlink}}</button>
  <blink>This should blink</blink>
  This shouldn't
  <blink>This should blink, too</blink>
</p>
```


Ich habe mich hier für eine schmutzige Abkürzung entschieden und die Button-Logik gleich im [ng-click](https://docs.angularjs.org/api/ng/directive/ngClick)-Attribut implementiert. Der Button setzt also beim Klicken `shouldBlink` im Scope abwechselnd auf `true` oder `false`.

Um das Blinken zu stoppen, setzen wir im ersten Versuch gleich an der Wurzel an und filtern den `tickStream`, damit er nur tickt, wenn `shouldBlink` den Wert `true` hat.

```javascript
.controller( 'baconCtrl', function($scope) {
  $scope.shouldBlink = true;
  shouldBlinkProp = $scope.$watchAsProperty('shouldBlink');
  var tickStream = Bacon.interval(500, 1).filter(shouldBlinkProp);
  // Der Rest bleibt unverändert
}
```


Mit [filter](https://github.com/baconjs/bacon.js#observable-filter) erlaubt uns Bacon.js, nur bestimmte Werte in einem Strom durchzulassen. Neben einer Filterfunktion können wir auch, wie hier, eine Property übergeben. Ist sie `true`, dürfen die Werte des Stroms passieren, sonst nicht:

```javascript
Bacon.interval:  ....1....1....1....1....1....1
shouldBlinkProp: tttttttttttffffffffffftttttttt
tickStream:      ....1....1..............1....1
```


<iframe src="https://embed.plnkr.co/Rppkr0TbLmCMDgvDAIXd/preview" width="100%" frameborder="0"></iframe>

[Plunkr in neuem Fenster öffnen](https://embed.plnkr.co/Rppkr0TbLmCMDgvDAIXd/preview)

Wer mit dem Button etwas herumspielt, wird einen Fehler entdecken. Schalte ich das Blinken aus, während die blinkenden Elemente gerade nicht sichtbar sind, bleiben sie dauerhaft verborgen. Damit die blinkenden Elemente bei ausgeschaltetem Blinken immer sichtbar sind, haken wir uns an anderer Stelle im Strom ein:

```javascript
var tickTackWithSwitch = function(latestTicktack, shouldBlinkCurrently) {
  return shouldBlinkCurrently ? latestTicktack : 1;
}
var blinkProp = ticktackProp
                .combine(shouldBlinkProp, tickTackWithSwitch)
                .map(toVisibility);
```


Mit [combine](https://github.com/baconjs/bacon.js#observable-combine) erzeugen wir aus 2 Strömen einen neuen. Der neue Strom entsteht durch verschmelzen der jeweils letzten Werte jedes Stroms, die wir an eine entsprechende Kombinierungsfunktion verfüttern (`tickTackWithSwitch`). In unserem Beispiel kombinieren wir `ticktackProp` mit `shouldBlinkProp`, um bei ausgeschaltetem Blinken immer eine 1 im Ergebnisstrom zu haben:

```javascript
    ticktackProp:    000001111100000111110000011111
    shouldBlinkProp: tttttttttttffffffffffftttttttt
    combined:        000001111101111111111100011111
```


<iframe src="https://embed.plnkr.co/mFfJc56HymdAJGELJNDP/preview" width="100%" frameborder="0"></iframe>

[Plunkr in neuem Fenster öffnen](https://embed.plnkr.co/mFfJc56HymdAJGELJNDP/preview)

Wir sollten nun ein Gefühl für die grundlegenden Funktionen ([filter](https://github.com/baconjs/bacon.js#observable-filter), [map](https://github.com/baconjs/bacon.js#observable-map), [scan](https://github.com/baconjs/bacon.js#observable-scan), [combine](https://github.com/baconjs/bacon.js#observable-combine)) eines *Observable* haben. Auch haben wir gesehen, wie wir das Verhalten durch Zusammenstecken von Strömen leicht ändern und erweitern können. Als nächstes zeige ich Code aus einem unserer echten Projekte.

## Ein Beispiel aus der Praxis

In einem unserer neuesten Projekte geben wir [Node.js](http://nodejs.org/) die Gelegenheit, sich als Backend zu bewähren, und haben einen [Circuit Breaker](http://martinfowler.com/bliki/CircuitBreaker.html) mit Bacon.js umgesetzt. Ähnlich einer elektrischen Sicherung, die bei einem überlasteten Stromkreis das gesamte Haus vor dem Abfackeln schützt, kappt der Circuit Breaker eine überlastete Verbindung zu einem entfernten System, damit nicht zu viele Anfragen auflaufen und unnötig Ressourcen fressen. Fehler in einer Komponente werden so früh signalisiert ([Fail Fast](http://en.wikipedia.org/wiki/Fail-fast) und pflanzen sich nicht fort.

Ein Circuit Breaker kennt 3 Zustände

1. Im geschlossenen Zustand lässt er alle Anfragen an das entfernte System passieren. Sollten zu viele Anfragen in Folge scheitern (durch Zeitüberschreitung), wechselt er in den offenen Zustand.

2. Ist der Circuit Breaker offen, lehnt er alle Anfragen sofort ab und übermittelt nichts an das entfernte System. Nach einer Abkühlperiode landet er im halboffenen Zustand.

3. Hier taucht der Circuit Breaker den großen Zeh ins Wasser und lässt genau eine Anfrage durch. Scheitert sie, kehrt er in den offenen Zustand zurück und die Warteperiode beginnt von neuem. Ist sie erfolgreich, schließt er den Kreis wieder.

![image alt text](image_0.png)

Wir steuern unseren Circuit Breaker über 3 Busse `sendQueue`, `successes` und `failures`. Ein [Bus](https://github.com/baconjs/bacon.js#bus) ist ein [EventStream](https://github.com/baconjs/bacon.js#eventstream), der zusätzlich eine [push](https://github.com/baconjs/bacon.js#bus-push)-Methode anbietet, um Werte in den Strom zu schieben. Um den Circuit Breaker in AngularJS zu nutzen, habe ich ihn als [$http](https://docs.angularjs.org/api/ng/service/$http)-Interceptor eingebunden:

```javascript
angular.module( 'circuitBreakerDemo', [] )
// factory für circuitBreaker zunächst ausgelassen

.factory('circuitBreakerInterceptor', function(circuitBreaker, $q, $log) {

  return {
    request: function (config) {
      var deferred = $q.defer();
      circuitBreaker.sendQueue.push({deferred: deferred, config: config});
      return deferred.promise;
    },

    response: function (response) {
      $log.info("CB", "Response", response);
      circuitBreaker.successes.push(1);
      return response;
    },

    responseError: function (rejection) {
      $log.error("CB", "ResponseError", rejection);
      circuitBreaker.failures.push(1);
      return $q.reject(rejection);
    }
  };
})

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('circuitBreakerInterceptor');
}]);
```


Die Funktionen `response` und `responseError` des Interceptors sind schnell erklärt: Wir signalisieren dem Circuit Breaker den Erfolg bzw. Fehlschlag einer Anfrage, indem wir eine `1` in den entsprechenden Bus schieben (`successes` bzw. `failures`).

Die `request`-Funktion ist nur wenig anspruchsvoller: Mit [$q](https://docs.angularjs.org/api/ng/service/$q) erzeugen wir zunächst ein neues `deferred`-Objekt, packen es mit der Anfrage (`config`) in ein Container-Objekt und schieben dies in die `sendQueue`. Dann geben wir das zu `deferred` gehörige `promise` an AngularJS zurück. Der Circuit Breaker kann nun abhängig von seinem Zustand die Anfrage erlauben (mit `deferred.resolve(config)`) oder ablehnen (mit `deferred.reject(config)`) und AngularJS erfährt von der Entscheidung über das zugehörige `promise`.

Den Code des Circuit Breakers will ich nicht in jedem Detail erklären, weil er überwiegend aus den alten Bekannten [filter](https://github.com/baconjs/bacon.js#observable-filter), [map](https://github.com/baconjs/bacon.js#observable-map) und [scan](https://github.com/baconjs/bacon.js#observable-scan) besteht. Der folgende Plunk demonstriert die Funktionsweise des Circuit Breakers und enthält den vollständigen Code.


<iframe src="https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/VZbodliA86xSQotOxpKZ/preview.html" width="100%" height="330" frameborder="0"></iframe>

[Plunkr in neuem Fenster öffnen](https://angularjs-de.github.io/plunker-mirror-angularjs.de/embed.plnkr.co/VZbodliA86xSQotOxpKZ/preview.html)


Ich beleuchte deshalb nur die Stellen, an denen wir den neuen Funktionen [throttle](https://github.com/baconjs/bacon.js#observable-throttle), [merge](https://github.com/baconjs/bacon.js#stream-merge) und [slidingWindow](https://github.com/baconjs/bacon.js#observable-slidingwindow) begegnen.

Die Warteperiode, nach der wir vom offenen Zustand in den halboffenen wechseln, können wir leicht mit Bacon.js implementieren:

```javascript
var retryPing = failures
                .filter(tripped)
                .throttle(cbConfig.waitUntilRetry)
```


Die Property `tripped`, die wir an anderer Stelle berechnen, zeigt uns an, ob die Zahl der aufeinanderfolgenden Fehler einen konfigurierbaren Grenzwert erreicht hat. [throttle](https://github.com/baconjs/bacon.js#observable-throttle) schläft für eine bestimmte Zeit, gibt den letzten Wert des Eingabestroms aus und legt sich wieder hin.

```javascript
    failures: ..1...1.1..1..........
    tripped:  fffffffftttttttttttttt
    filter:   ........1..1..........
    throttle: .....................1
                      |___Schlaf___|
```

Der folgende Codeblock entscheidet, ob wir vom halboffenen Zustand in den geschlossenen wechseln:

```javascript
var halfOpenReceive = retries
                        .map(2)
                        .merge(successes.map(1))
                        .merge(failures.map(3))
                        .slidingWindow(2,2);

var halfOpenToClosedReceive = halfOpenReceive.filter(function(v) {
  return v[0] == 2 && v[1] == 1;
});

halfOpenToClosedReceive.onValue(function() {
  $log.info("CLOSED due to successful retry.");
  recloses.push(1);
});
```

Der Strom `retries` enthält für jeden Verbindungsversuch im halboffenen Zustand eine `1`. Wir führen dann `retries`, `successes` und `failures` mittels [merge](https://github.com/baconjs/bacon.js#stream-merge) zusammen. Das Ergebnis ist ein Strom, in den alle Werte der zusammengeführten Ströme fließen. Da jeder dieser Ströme nur Einsen liefert, bilden wir sie zur Unterscheidung vorher auf verschiedene Werte ab.

```javascript
retries.map(2):   ..2......2...
successes.map(1): ...........1.
merge:            ..2......2.1.
```

Um herauszufinden, ob ein Verbindungsversuch erfolgreich war, betrachten wir die letzten beiden Werte des zusammengeführten Stroms und schließen den Kreis wieder, wenn auf einen Verbindungsversuch ein Erfolg folgt. Dazu picken wir mit `slidingWindow(2,2)`mind. 2 und max. 2, also genau 2 Werte aus dem Strom und schieben sie als Array in den Ausgabestrom.

```javascript
halfOpenReceive:         [2,3][2,3][2,1]
halfOpenToClosedReceive: .    .    [2,1]
```

## Warum so umständlich? Was habe ich davon?

Meine Erfahrung ist, dass ich mit FRP kompakteren und robusteren Code schreibe, um komplexes Verhalten abzubilden. Zusätzlich treten bei Änderungen/Erweiterungen seltener unerwünschte Seiteneffekte auf.

Ich führe das auf folgende Eigenschaften von FRP zurück:

* **Inversion of Control**: Unser Code muss sich nicht um den Kontrollfluss kümmern. Alle hier gezeigten Beispiele kommen ohne Schleifen und [if](https://cirillocompany.de/pages/anti-if-campaign)-Anweisungen aus ([McCabe](http://de.wikipedia.org/wiki/McCabe-Metrik) würde sich freuen). Mit [Dependency Injection](https://docs.angularjs.org/guide/di) begegnet uns eine Anwendung dieses Prinzips bereits bei AngularJS.

* **Vielseitigkeit**: Wir programmieren für den allgemeinen Fall, d.h. uns ist egal, ob wir einen Wert oder viele Werte, synchron oder asynchron verarbeiten. Wie unsere Beispiele zeigen, arbeitet der Großteil unseres Codes mit nur ein oder zwei Werten, die er als Funktionsparameter erhält, und bleibt so sehr einfach.

* **Komponierbarkeit**: FRP kommt dem Lego-Ideal recht nahe. Observables können wir beliebig zusammenstecken, zerlegen, und neu zusammensetzen. Die Selbstähnlichkeit und Wiederverwendbarkeit unseres Codes steigt, da Komponenten nur über Ein- und Ausgabeströme ohne gemeinsamen Zustand miteinander gekoppelt sind, egal, wie tief wir zoomen.

![image alt text](image_1.png)

## Was sollte ich bei der Entwicklung mit FRP/Bacon.js beachten?

Zum Abschluss gebe ich einige Empfehlungen, die helfen sollen, Fallstricke zu umgehen.

* **Werte nicht ändern!** Für uns hat sich bewährt, die Werte in den Strömen als unveränderlich zu behandeln. Sonst riskieren wir schwer nachvollziehbare Seiteneffekte.

* **Zeitabhängige Operationen kapseln!** Testen von asynchronem Verhalten ist ein Graus und Konstrukte wie [Jasmines Clock](http://jasmine.github.io/2.0/introduction.html#section-Mocking_the_JavaScript_Timeout_Functions) sind bestenfalls Krücken. Wir lagern asynchrone Operationen meist gemäß dem [Strategie-Muster](http://de.wikipedia.org/wiki/Strategie_(Entwurfsmuster)) aus.

Beim Circuit Breaker würden wir die oben vorgestellte `throttle`-Operation wie folgt kapseln:

```javascript
var throttler = throttleStrategy || function(observable) {
  return observable.throttle(cbConfig.waitUntilRetry);
}

var retryPing = throttler(failures.filter(tripped));
```

Übergeben wir keine `throttleStrategy`, verhält sich die `throttler`-Funktion einfach wie `throttle` aus Bacon.js. Für den Testfall können wir jetzt aber anderes Verhalten injizieren und z.B. folgende Strategie wählen:

```javascript
var output = new Bacon.Bus();
var lastValue;

var throttleStrategy = function(observable) {
  observable.onValue(function(x) {
    lastValue = x;
  });
  return output;
}
```

Unser Testcode kann nun mit `output.push(lastValue)` das Verhalten von `throttle` steuern.

* **Schnittstellen für Monitoring und Management anbieten!** Eine große Herausforderung ist, unerwartetes Verhalten nachzuvollziehen. Klassisches Debugging ist nicht sehr wirksam, da der Großteil des Kontrollflusses außerhalb unseres Codes liegt. Logging/Monitoring verdienen besondere Aufmerksamkeit, insb. da in diesem Bereich [Bacon.js noch Schwächen](https://github.com/baconjs/bacon.js/issues/273) zeigt. Logging wie Monitoring können wir über entsprechende Ströme anbieten (wir nutzen einen Strom pro Log-Level).

Besonders in einer Serverumgebung sind Management-Schnittstellen wichtig, z.B. um den Timeout des Circuit Breakers im laufenden Betrieb zu rekonfigurieren. Auch das ist im Falle von Bacon.js mit einem *Bus* möglich.

## Fazit

Im Zusammenspiel mit AngularJS kann Bacon.js den Bau von Oberflächen und Komponenten mit komplexen Interaktionen vereinfachen und unseren Code einfach und kompakt halten. Von den gleichen Konzepten, die AngularJS für Databinding oder Dependency Injection nutzt, können wir nun auch profitieren.

## Nützliche Links zu Bacon.js

* [Bacon.js Dokumentation](https://github.com/baconjs/bacon.js/) und [Wiki](https://github.com/baconjs/bacon.js/wiki/Documentation)

* [Implementierung des Spiels Snake mit Bacon.js](http://philipnilsson.github.io/badness/)

* Bacon.js Tutorial [Teil 1](http://nullzzz.blogspot.fi/2012/11/baconjs-tutorial-part-i-hacking-with.html), [Teil 2](http://nullzzz.blogspot.fi/2012/11/baconjs-tutorial-part-ii-get-started.html), [Teil 3](http://nullzzz.blogspot.fi/2012/12/baconjs-tutorial-part-iii-ajax-and-stuff.html)

* [Reactive Programming in Practice](http://eamodeorubio.github.io/reactive-baconjs/#/)
