---
title: "Angular - Asynchronität von Callbacks zu Observables"
description: "Moderne Web-Awendungen leben von mehr Interaktion. Hier erfahrt ihr wie - von Callbacks bis zu den neuen Observables in Angular."
author: "Bengt Weiße"
slug: "angular2-observables"
published_at: 2016-05-27 10:00:00.000000Z
categories: "angular angular2 angular4 observables"
header_image: "/artikel/header_images/angular2-observables.jpg"
---

Mobile Apps und Webanwendungen leben von der Interaktion mit dem Nutzer und dadurch von Asynchronität. Sei es nur ein Tap/Klick, oder das Abschnicken einer Anfrage an eine Schnittstelle. In unserem [Angular Einsteigertutorials](/artikel/angular-tutorial-deutsch/) sind wir schon kurz auf wichtige Punkte bezüglich der Asynchonität in Angular Anwendungen eingegangen. Natürlich steckt hinter diesem Begriff noch viel mehr, was erklärt werden kann und sollte. Daher folgt nun dieser Artikel, in dem wir uns ausschließlich mit Fragen und Problemen rundum das Thema Asynchronität beschäftigen.

<hr>
<div class="workshop-hint">
  <div class="h3">Keine Lust zu Lesen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>
        Nicht jeder lernt am besten aus Büchern und Artikeln. Lernen darf interaktiv sein und auch Spaß machen. Wir bieten euch auch
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-top">Angular
                    und TypeScript Schulungen</a> an, falls Ihr tiefer in die Thematik einsteigen wollt.
      </p>
      <p>
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-top">
          <button class="btn btn-danger">Mehr Informationen zur Schulung</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="medium_Screen-Shot-2017-03-19-at-11.52.54.png?v=63657140418" alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>


## Asynchronität

Was genau bedeuted eigentlich *asynchron* und *synchron*. Vielleicht habt ihr selbst schon beides genutzt, aber wart euch dessen gar nicht bewusst.

Synchronität zeichnet sich in der Programmierung oft dadurch aus, dass ihr das Ergebnis eines Funktionsaufrufs direkt einer Variablen zuweisen könnt, welche dann den entsprechenden Rückgabewert beinhaltet.

```typescript
var count = 2; // count is 2

function sum(a, b) {
  return a + b;
}
var result = sum(1, 2); // result = 3
```

Bei Asynchronität steht das Ergebnis erst nach einer unbestimmbaren Zeit oder erst zu einem bestimmten Zeitpunkt in der Zukunft fest. Erweitern wir das obige Beispiel und starten die Berechnung einer Summe zu einem späteren Zeitpunkt.

```typescript
var result = 0;

setTimeout(function () {
  result = sum(1, 2);
}, 2000);

alert(result);
```

Führen wir dieses Code-Beispiel aus, erscheint im Browser eine Hinweisbox mit dem Inhalt `0`. Die Funktion `setTimeout` startet einen asynchronen Kontext, da die Ausführung und somit das Ergebnis der Funktion erst nach mindestens zwei Sekunden feststeht. Der restliche Code wird normal (synchron) ausgeführt.

Asynchron bedeuetet daher auch nicht blockierend, sonst würde zwei Sekunden lang nichts passieren und danach die Hinweisbox mit dem Wert `3` erscheinen.

Wie eingangs erwähnt, müssen wir uns früher oder später auch mit Asynchonronitäten in einer Angular Anwendung beschäftigen. Dabei gibt es verschiedene Möglichkeiten diese zu Erzeugen bzw. mit diesen umzugehen. Hier stoßen wir - nicht nur im Angular Kontext - auf folgende Schlagworte.

- **Callback** - Funktion, die einer anderen Funktion übergeben und von dieser aus aufgerufen wird
- **Event** - Interaktion des Nutzers (z.B. `click`), [Kommunikation zwischen Komponenten](/artikel/angular2-output-events/) (`EventEmitter`)
- **Promise** - kapselt Asynchrone Code-Blöcke, kann erfolgreich sein oder fehlschlagen
- **Observable** - Stream, wichtiger Bestandteil der reaktiven Programmierung

## Probleme

**Callbacks**

Wie wir schon ausführlich in userem [AngularJS-Buch im Kapitel Promises](/buecher/angularjs-buch/angularjs-promises/) erklärt haben, stellen uns Callbacks vor folgende Probleme, die auch normale JavaScript Events nicht lösen können. Hier noch einmal ein Überblick der Probleme:

- komplexer, unleserlicher Code
- keine Parallelität
- umständliche Fehlerbehandlung, -korrektur (try-catch funktioniert nicht!)
- Vermischung von Verantwortlichkeiten

Aus dem Kapitel können wir auch entnehmen, dass Promises dafür eine geeignete Lösung darstellt.

Promises sind auch in Angular vorhanden. Programmiert ihr mit TypeScript, könnt bereits die ES2015 Promises verwenden. Diese werden einfach durch den Aufruf von `new Promise()` erstellt.

**Promises**

So gut Promises auch funktionieren, decken sie nicht alle möglchen Anwendungsfälle bzw. Wünsche des Entwicklers ab. Im Vergleich zu einfachen Callbacks verbessern sie das Leben von uns Entwicklern trotzdem erheblich.

Stellen wir uns nun vor, wir würden gerne den asynchronen Aufruf einer Promise-Funktion abbrechen, dann ist dies nicht möglich. Wird eine Promise-Funktion aufgerufen, wird sie auch direkt ausgeführt und irgendwann mit einem Wert resolved oder rejected.

Dies bedeuted auch, dass wir uns immer wieder selbst vergewissern müssen, ob sich das Resultat einer asynchronen Funktion geändert hat oder nicht. Ein Promise kann nur einmal erfüllt oder abgelehnt werden. Als Anwendungsfall fragt eine Funktion Daten von einer Schnittstelle ab. Ein anderer Programmteil führt auch diese Funktion aus und erhält aktuellere Daten. Wir müssen uns nun selbst darum kümmern, dass überall die aktuellsten Daten benutzt werden.

Daraus resultiert auch, dass Promises in Verbindung von WebSockets unbrauchbar sind.

- Können nicht abgebrochen werden
- Hält nur einen zukünftigen Wert
- Einmalige Ausführung (nicht *lazy* - Ausführung geschieht direkt beim Aufruf)

Glücklicherweise sind wir ja noch nicht am Ende unseres Artikels. Vielleicht lassen sich ja die oben aufgeführten Problemchen mit Observables lösen.

## Observables

Observables (dt. *beobachtbar*) seid ihr vielleicht schon einmal begegnet, wenn ihr bereits mit Angular oder reaktiven Programmierung gearbeitet habt.

Im Namen Observable versteckt sich der Begriff Observer. Ein Observer - zu Deutsch *Beobachter* - behält etwas im Auge und reagiert auf mögliche Änderungen. Möchte ein anderer Anwendungsteil vom Observer über die Änderungen am Observable informiert werden, kann er sich an diesem dazu an- (*subscribe*) und auch wieder abmelden (*unsubscribe*).

Ein Observable kann dabei abstrakt einfach als Daten-Stream betrachtet werden. Dadurch sind diese auch flexibel einsetzbar und es können beispielsweise mehrere Observables verknüpft oder zusammengefasst werden.

Das Prinzip ähnelt stark dem Observer-Pattern und nennt sich *Reactive Programming*. Angular nutzt als Basis dazu die Observables der [ReactiveX](http://reactivex.io/) Architektur. Durch Microsofts [Microsoft Reactive Extensions](https://github.com/Reactive-Extensions) existiert dazu eine sehr gute Implementierung in JavaScript und anderen Sprachen - kurz [RxJS](https://github.com/Reactive-Extensions/RxJS) genannt.

Aber bevor wir tiefer in die Materie einsteigen schauen wir uns ein komplettes Beispiel an, wie Observables in Angular genutzt werden können.

Im folgenden werden die einzelnen Abschnitte und Funktionen des nachstehenden Quellcodes näher erklärt.

```typescript
// import observable from the reactivex lib
import {Observable} from 'rxjs/Observable';

// create an oberservable
const source = Observable.create((observer) => {
  // random async operation
  const deregister = asyncCall((response, error) => {
    // in error case --> publish error
    if (error) {
      observer.error(error);
      return;
    }
    // success --> publish values
    observer.next(response);
    // no other "next"-call --> complete
    observer.complete();
  });

  // optional clean up function
  return () => {
    // is called on unsubcription
    deregister();
  };
});

// listen on observable
source.subscribe((data) => {
  // success
}, (errData) => {
  // error
}, () => {
  // complete
});

// source.unsubscribe();
```

**Observable erzeugen**

Als Ausgangspunkt benötigen wir ein Observable mit dem wir weiter arbeiten können. Dazu existiert in der `rxjs`-Bibliothek ein extra Modul mit dem Namen *Observable*. Dieses exportiert wiederum die Basis-Klasse `Observable`.

```typescript
import {Observable} from 'rxjs/Observable';
```

Auf dem `Observable` Objekt existiert die `create`-Funktion. Sie erlaubt uns ein neues Observable-Objekt zu erzeugen und erwartet eine Callback-Funktion, die einen *Observer* als Parameter erhält. Als Rückgabewert kann eine Funktion angegeben werden.

```typescript
const source = Observable.create((observer) => {
  // optional clean up function
  return () => {};
});
```

Glücklicherweise müsst ihr euch in den meisten Anwendungsfälle nicht selbst um die Erzeugung eines Observables kümmern. Dazu gibts es verschiedene Hilfsfunktion oder ein externer Programmteil liefert euch direkt ein Observable. Als Beispiel ist der Rückgabewert eines Http-Requests bereits ein Observable.

Über folgende Funktionen könnt ihr euch ein Observalbe erzeugen lassen.

- **Observalbe.of**(value1 [, value2, ...]) - erzeugt aus einer Reihe von Werten ein Observable
- **Observable.from**(promise | iterable | observable) - wandelt, z.b. ein Promise in ein Observable um
- **Observable.fromEvent**(eventEmitter, eventName [, selectorFn]) - wandelt ein Event in ein Observable um, `eventEmitter` kann, z.B. ein DOM-, Angular-Element, EventEmitter, ... sein

<div class="alert alert-warning"><b>Wichtig:</b> In den meisten Fällen müsst ihr euch nicht selbst um die Erstellung eines Observables kümmern!</div>

**Arbeiten mit dem Observer**

Der Observer eines Observables kümmert sich, um das Weiterleiten von Werten und Fehlern. Dazu besitzt er drei grundlegende Funktionen:

1. **next(response)** - informiert Subscriber über neue Daten
2. **complete()** - informiert Subscriber, dass keine weiteren Daten kommen, nach letztem *next*-Aufruf
3. **error(error)** - informiert Subscriber über Fehler

Daraus ergibts sich dann folgender, vereinfachter Observable-Code.

```typescript
Observable.create((observer) => {
  asyncCall((response, error) => {
    // in error case --> publish error
    if (error) {
      observer.error(error);
      return;
    }
    // success --> publish values
    observer.next(response);
    // no other "next"-call --> complete
    observer.complete();
  });
});
```

**Subscribe und Unsubscribe**

Damit uns der Observer überhaupt mitteilen kann, dass Änderungen vorliegen, müssen wir uns am Observable dazu anmelden. Die passende Funktion dazu heißt `subscribe` und kann auf der Observer-Instanz aufgerufen werden. Als Parameter können drei Funktionen für

1. den Erfolgsfall - erhält die Daten
2. den Fehlerfall - erhält Informationen über den Fehler bzw. das Fehlerobjekt
3. den Abschluss bzw. die Fertigstellung - keine Parameter

übergeben werden.

```typescript
// listen on observable
source.subscribe((data) => {
  // success
}, (errData) => {
  // error
}, () => {
  // complete
});
```

Möchte man nicht mehr auf Änderungen reagieren, können wir uns vom Observable auch wieder über die `unsubscribe`-Funktion abmelden.

```typescript
source.unsubscribe();
```

<div class="alert alert-info">Hinweis: Ihr könnt euch jederzeit von einem Observable abmelden und wieder anmelden.</div>

**Weitere Funktionen und Operatoren**

Observables bieten eine Vielzahl an weiteren Funktionen und Operatoren, die ihr nutzen könnt. In Angular ist jedoch alles sehr Modular aufgebaut und ihr müsst euch selbst darum kümmern alles zu laden, was ihr braucht.

Um beispielsweise die `of` oder `from` Funktionen zur Verfügung zu haben, müsst ihr diese extra importieren.

```typescript
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
```

Das gleiche Spiel müsst ihr bei der Nutzung von Operatoren betreiben.

```typescript
import 'rxjs/add/operator/map';
```

<div class="alert alert-warning">Wichtig: Zusätzliche Funktionen und Operatoren müssen extra importiert werden.</div>

Darüber hinaus gibt es eine Vielzahl von Operatoren, wie z.B. *zip* - Zusammenführen von Observables, *flatMap* - transformiert Werte eines Observables zu einem neuen Observable oder *map* - Transformationsfunktion für jeden Wert des Observables.

### Lösung der Probleme mit Promises? - JA!

Euch ist vielleicht schon aufgefallen, dass alle noch offenen Probleme von Promises allein beim Erklären von Observables gelöst wurden.

**Abbrechen von Asynchronitäten**

Wie beschrieben, könnt ihr euch von Observables abmelden durch den simplen Aufruf von `unsubscribe`.

**Hält nur einen Zukunftswert**

Solange ihr auf Änderungen hört, werdet ihr bei jedem Aufruf von *next* darüber informiert.

**Nicht lazy**

Observables sind *lazy*, da sie nur Daten generieren, wenn auf sie *subscribed* wurde. Dabei spielt es keine Rolle, ob die Asynchronität direkt oder erst später ausgeführt wird.

### Anwendung in Angular

Es folgen noch ein paar kleine Anwendungsfälle in Angular Apps. Vielleicht habt ihr sogar unbewusst bereits mit Observables gearbeitet.

**Http-Anfragen**

Der Http-Servie in Angular arbeitet mit Observables.

```typescript
import {Http} from '@angular/http';
// ...

// returns an observable
return this.http.get(XXX);
// ...
```

Mehr Informationen, wie ihr Http-Requests senden könnt, folgt in einem späteren Artikel von uns.

**Reagieren auf Benutzereingaben**

Nehmen wir an, wir wollen eine Suche realisieren. Dabei gelten folgende Bedingungen:

1. Die Suchanfrage soll erst 800ms nach der Eingabe des letzten Zeichens abgesendet werden.
2. Es soll wirklich nur gesucht werden, wenn sich der aktuelle zum vorherigen Wert geändert hat.
3. Falls mehrere Suchanfragen laufen, soll nur das letzte Ergebnis genutzt werden.

Puh, das sieht jetzt aber doch nach ziemlich viel Arbeit aus. Normalerweise ja, aber ist durch Observables in wenigen Zeilen erledigt.

```typescript
// searchControl = new Control();
searchControl
  // react on value changes
  .valueChanges
  // wait 800ms after last change
  .debounceTime(800)
  // check if new value differs from old one
  .distinctUntilChanged()
  // transform value of observable to new observable -> use only response of latest change
  // avoiding out of order results
  .switchMap(term => this.dataService.search(term))
  // listen on results of the search
  .subscribe(items => this.items = items);
```

Was es genau mit einem *Control* auf sich hat erfahrt ihr auch bald in einem eigenen Artikel über Formulare in Angular.

## Zusammenfassung

Zum Abschluss stellen wir die vorgestellten Methoden, um mit Asychronitäten zu arbeiten gegenüber.

| | Callbacks | Promises | Observables |
| --- | --------- | -------- | ------------|
| Single value | ✓ | ✓ | ✓ |
| Multi values | ✓ | ✗ | ✓ |
| Composable | ✗ | ✓ | ✓ |
| Lazy | ✗ | ✗ | ✓ |
| Cancable | ✗ | ✗ | ✓ |
{: .table .table-striped}

Wie sich bereits herausgestellt hat, sind Observables derzeit der flexibelste Weg.

<div class="alert alert-info"><b>Hinweis:</b> Nur weil Observables das meiste können, müsst ihr sie nicht unbedingt überall einsetzen.</div>

## Fazit

Asynchronität ist im modernen Web überall zu finden. Gerade in Single-Page-Applications, bei denen es auf dynamische Inhalte und Interaktionen ankommt, muss es für den Entwickler elegant möglich sein auf solche Situationen zu reagieren. Jede der angesprochenen Möglichkeiten hat seine Daseinsberechtigung. Verlangt ein Anwendungsfall nicht kontinuierlich auf Änderungen zu reagieren und der Vorgang muss auch nicht abgebrochen werden, steht der Nutzung von Promises im Vergleich zu Observables nichts entgegen. Auch Events oder einfache Callbacks werden euch immer noch begegnen und ihr werdet sie nutzen.

Angular setzt schon an den richtigen Stellen auf die aktuellste und flexibelste Methode mit den Observables. Kommunikation zwischen Komponenten erfolgt über Events, um eine einheitliche Basis zu den DOM-Events zu halten.

Wir hoffen, dass wir euch die Angst vor dem Arbeiten mit asynchronen Programmteilen genommen haben und ihr nun das Rüstzeug besitzt, um eure Probleme elegant und einfach zu lösen.

<hr>
<div class="workshop-hint text-center">
  <div class="h3">Hat dir das Tutorial geholfen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p> Wir bieten auch <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-buttom">Angular und TypeScript Schulungen</a>        an um dich möglichst effektiv in das Thema Angular zu begleiten. Im Kurs kannst Du die Fragen stellen, die Du nur
        schlecht googlen kannst, z.B. “Besserer Weg, um meine Applikation zu strukturieren”. Wir können sie Dir beantworten.
        </p>
      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-buttom">
          <button class="btn btn-danger">Jetzt weiter lernen</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="medium_Screen-Shot-2017-03-19-at-11.52.54.png?v=63657140418" alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>
