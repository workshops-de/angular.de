---
number: 6.60
title: Promises (Callbacks 2.0)
part: Konzepte und Hintergründe
progress: 100
---
## Promises - Was ist das und was können sie?

Um Promises verständlich zu machen, fangen wir mit einer groben Umschreibung an und gehen dann auf Details und konkrete Anwendungen ein. Wenn ihr euch zunächst unter dem Begriff **Promise** nichts vorstellen könnt, seid ihr nicht allein. Promises sind so etwas wie Callbacks 2.0.
Diese Umschreibung trifft auch schon genau den Grund, warum ihr Promises nutzen solltet. Dazu machen wir kurz noch einen Ausflug und frischen unser Wissen über Callbacks auf.

### Callbacks

> **Callbacks** sind schlicht und einfach Funktionen die anderen Funktionen übergeben werden, welche sich danach um ihr Ausführung kümmert. Dabei kann diese Ausführung auch irgendwann in der Zukunft stattfinden.

**Beispiel von Callbacks**

Hier wird mit jQuery ein Ajax-Request abgesendet und auf den Erfolgs- und Fehlerfall reagiert.

```javascript
$.get('/meine/api.json')
  .done(function(){ ... })
  .fail(function(){ ... });
```

Das sieht an sich ja schon ganz ordentlich aus. Wozu brauchen wir dann Callbacks 2.0?

Dafür müssen wir ein Stück weiter denken.  Das Senden von HTTP-Anfragen ist dazu schon ein sehr gutes Beispiel. Es folgt eine Liste von Problemen bzw. Anwendungsfällen, die mit Callbacks nur schlecht, gar nicht oder nicht gerade elegant zu lösen sind.

**Callback Probleme**

  - Übersichtlichkeit - Pyramids of Doom
  - Fehlerbehandlung - Abfangen und Korrektur von Fehlern
  - Parallelität - Synchronisation mehrerer Asynchronitäten
  - Vermischung von Verantwortlichkeiten

Während der Erklärung von Promises werden wir uns die Probleme nochmals genauer anschauen und mögliche Lösungen erarbeiten.

### Promises

Promise ist das englische Wort für *Versprechen*, was eine ziemlich treffende Benamung ist. Gibt eine asynchrone Funktion ein Promise zurück, dann gibt sie dir ein Versprechen, dass dieser Programmteil ausgeführt wird. Entweder dies geschieht erfolgreich und das Versprechen wird gehalten (`resolve`) oder nicht (`reject`). Dadurch haben wir von vornherein die Möglichkeit einfach auf eine erfolgreiche oder fehlerhafte Ausführung zu reagieren.

Promises sind seit ES2015 (ES6) vollständig in der Sprache enthalten. Vorher wurden sie durch [Promises/A+](https://promisesaplus.com/ "A+ Promise") standardisiert und in zahlreichen Bibliotheken für ES5.1 implementiert, um sie nutzen zu können. In AngularJS existiert dazu die $q-Implementierung.

Für das Arbeiten mit Promises gibt es einen simplen und einfachen Ablaufplan.

1. Asynchroner Programmteil gibt ein Promise-Objekt zurück
2. Asynchroner Programmteil wird aufgerufen
3. Promise wird gehalten oder abgelehnt
4. Auf Erfolg oder Fehlschlag reagieren

Gehen wir alle Punkte nun Schritt für Schritt durch.

**Promise erzeugen**

Der $q-Service wird ganz normal als Abhängigkeit in den gewünschten Bestandteil der AngularJS-Anwendung injiziert. Danach könnt ihr Promises einfach über den Aufruf folgenden Code-Schnipsels erzeugen.

```javascript
$q()
```

Soll nun eine asynchrone Funktion ein Promise zurückgeben, geschieht dies einfach durch das erzeugte Promise.

```javascript
function asyncFn() {
  return $q();
}
```

**Promise-Funktion aufrufen**

Nun folgt ein noch simplerer Teil. Die eben erstellte Promise-Funktion muss natürlich auch aufgerufen werden. Ihr könnt die Funktion, wie einen ganz normalen Funktionsaufruf betrachten.

```javascript
asyncFn();
```

**Promise resolve und reject**

Jetzt muss unsere Funktion natürlich auch noch etwas asynchrones machen und dann das Versprechen halten oder nicht. Dazu müsst ihr der Promise-Erzeugung eine Funktion übergeben, die automatisch zwei Funktionen als Parameter erhält. Dabei handelt es sich beim ersten um die *resolve*- und beim zweiten *reject*-Funktion.

```javascript
function asyncFn() {
  return $q(function (resolve, reject) {
    // async code here
  });
}
```

Als Beispiel führen wir mit setTimeout verzögert eine Funktion aus und resolven danach unser Promise.

```javascript
function asyncFn() {
  return $q(function (resolve, reject) {
    setTimeout(function () {
      resolve('Hello');
    }, 2000);
  });
}
```

Das Ablehnen erfolgt äquivalent. Mit reject und resolve könnt ihr zusätzlich Daten als primitiven Datentyp, Objekt oder Array zurückgeben.

**Promise wird aufgelöst**

Doch wie reagieren wir jetzt auf ein `resolve` oder ein `reject`? Dazu besitzt ein jedes Promise-Objekt eine `then`-Funktion, was soviel heißt wie: Wenn die Asynchronität beendet ist bzw. das Promise aufgelöst wurde (durch `resolve` oder `reject`), dann führe aus. Aus diesem Grund werden Promises auch oft *thenables* genannt.

Diese then-function kann mit zwei Callback-Funktionen umgehen. Die erste für den Erfolgs- und die zweite für den Fehlerfall.

Unser Aufruf von `asyncFn` sieht nun wie folgt aus.

```javascript
asyncFn().then(function (data) {
  // success
}, function (errData) {
  // error
});
```

Das war im Grunde schon die ganze Magie hinter Promises und wie man sie im einfachsten Fall verwendet.

**Beispiel mit $http**

Wie bereits erwähnt ist das Senden von HTTP-Anfragen auch ein asynchroner Bestandteil einer Anwendung. Das AngularJS-Team hat natürlich mitgedacht und so bietet der `$http`-Service bereits von Haus aus die Möglichkeit mit Promises zu arbeiten. Dabei liefert ein $http-Aufruf immer ein Promise zurück.

```javascript
$http.get('/meine/api.json').then(
  function(response){ ... },
  function(error){ ... }
);
```

Im Vergleich zu unserem Beispiel mit jQuery sehen die Code-Ausschnitte doch recht ähnlich aus. Trotzdem werden wir gleich sehen, dass der Funktionsumfang und somit die Einsatzmöglichkeiten von Promises doch die von simplen Callback bei weiten übertreffen.

### Lösung der Callback Probleme?

Hier erfahrt ihr noch mehr über Promises und ihre Funktionen. Wir werden erkennen und verstehen, wie die am Anfang des Kapitels beschriebenen Probleme von Callbacks einfach gelöst werden können.

#### Übersichtlichkeit - Pyramid of Doom

**Problem**

Wenn wir mehrere asynchrone Aufrufe mit Callbacks verschachteln, wird es sehr schnell unübersichtlich. Leider lässt sich dies oft nicht vermeiden, da asynchrone Programmteile voneinander anhängig sein können. Dieses Probleme der Übersichtlichkeit ist so massiv, dass es sogar einen eigenen Namen bekommen hat: **Pyramid of Doom**.

Nehmen wir das vorherige - noch übersichtliche - Beispiel eines Requests mit jQuery und senden in Abhängigkeit dazu weitere Anfragen. Der Fehlerfall wird hierbei vernachlässigt.

```javascript
$.get('/api1').done(function(data) {
  $.get('/api2').done(function(data) {
    $.get('/api3').done(function(data) {
      ...
    });
  });
});
```

**Lösung**

Der Aufruf unserer Promise-Funktion sieht schon mal ganz annehmbar aus. Doch was passiert, wenn wir aufeinander aufbauende Funktionalitäten haben, die bei Callbacks zu einer tiefen Verschachtelung führten. Hier können wir uns eine der wichtigsten Eigenschaften eines Promises zu nutzen machen. Promises sind verkettbar, sprich sie können per *Dot*-Notation hintereinander geschrieben werden, denn als Rückgabewert eines Promise könnt ihr entweder wieder ein Promise oder einen ganz normalen Wert zurückgeben. Im nächsten `then` stehen uns die Rückgabewerte wieder zur Verfügung.

```javascript
asyncFn()
  .then(function (data) {
    // success
    return asyncCode();
  })
  .then(function (data) {
    // success
    return true;
  });
```

<div class="alert alert-info"><b>Hinweis:</b> Verkettet Promises, um Verschachteltungen von asynchronen Programmteilen zu verhindern</div>

![Promises-Composable](../images/figures/promises-composable-1.png)

Übertragen wir dies wieder auf unsere verschachtelten HTTP-Anfragen mit jQuery. Mit dem `$http`-Service und Promises sieht das in AngularJS folgendermaßen aus.

```javascript
$http.get('/api1')
  .then(function (data1) {
    // do something with data1
    // send another request
  return $http.get('/api2');
})
.then(function (data2) {
  return $http.get('/api3');
})
.then(function (data3) {
...
});
```

#### Fehlerbehandlung und Fehlerkorrektur

**Problem**

Bei verschachtelten Callbacks ist nicht definiert, wie wir mit Fehlern umgehen. Nehmen wir wieder unser letztes Beispiel dazu: Wir rufen die drei verschachtelten Callbacks aus dem letzten jQuery-Code-Schnipsel erneut auf. Die letzte API-Anfrage an `/api3` schlägt nun fehl. Wie gehen wir damit um? Was heißt das generell für die Fehlerbehandlung mit Callbacks?

```javascript
$.get('/api1').done(function(data) {
  $.get('/api2').done(function(data) {
    $.get('/api3').done(function(data) {
    }).fail(function(err){ ... });
  }).fail(function(err){ ... });
}).fail(function(err){ ... });
```

Jeder Fehler muss extra behandelt werden. Oft geschieht jedoch in den meisten Fällen im Fehlerfall das gleiche.

Schön wäre es, wenn wir in diesen Situationen die Fehlerbehandlung an einer Stelle lösen könnten.

Jetzt tritt der Fall ein, dass wir die Möglichkeit haben fehlgeschlagene Requests nochmals gegen andere APIs zu senden, um mögliche Fehler zu korrigieren. Ihr könnt euch sicher bereits vorstellen, wie komplex unser Quellcode dazu aussehen wird. Es folgt die Umsetzung, in der wir Spiegelungen von `/api2` und `/api3` unter `/api2b` und `/api3b` zur Verfügung haben.

```javascript
$.get('/api1').done(function(data) {
  $.get('/api2').done(function(data) {
    $.get('/api3').done(function(data) {
    }).fail(function(err){
      // retry with api3b
      $.get('/api3b').done(function(data) {
    }).fail(function(err){ ... });
    });
  }).fail(function(err){
    // retry with api2b and after that the whole api3 block
    $.get('/api2b').done(function(data) {
      $.get('/api3').done(function(data) {
      }).fail(function(err){
        $.get('/api3b').done(function(data) {
      }).fail(function(err){ ... });
      });
    }).fail(function(err){ ... });;
  });
}).fail(function(err){ ... });
```

Spätestens hier sollten sich bei euch die Nackenhaare aufstellen. Natürlich kann jetzt der ausgefuchste Entwickler anfangen alles schön in einzelne Funktionen aufzudröseln. Macht den reinen Quelltext der Ausgangsfunktion leserlicher und übersichtlicher, aber der Umgang mit Fehlern und Fehlerkorrektur nicht besser.

**Lösung**

Wir wir schon gesehen haben akzeptiert jedes `then` eine Fehlerfunktion. Das bedeutet, wir können in jedem Schritt auf mögliche Probleme reagieren. Aber ein Promise kann sogar noch viel mehr. Bei einem Fehler wird der erste Fehler-Callback genutzt der in einer Verkettung gefunden wird. Besitzt ein `then` keine eigene Error-Funktion, dann wird so lange zum nächsten gesprungen, bis eine geeignete gefunden wird.

![Promises-Error-Handling](../images/figures/promises-error.png)

```javascript
asyncFn()
  .then(successFn)
  .then(successFn, function (err) {
    // error
  });
```

Schlägt in obigen Code der Aufruf von `asyncFn` fehl, dann wird automatisch die Fehlerfunktion des zweiten `then`s aufgerufen.

<div class="alert alert-info"><b>Hinweis:</b> Das Weiterreichen von Fehlern und Rückgabewerten nennt sich in der Fachsprache <b>Value & Error Downstream Propagation</b>. </div>

Schauen wir uns nun einmal die Lösung für eine einheitliche Fehlerbehandlung mehrerer Anfragen an.

```javascript
$http.get('/api1')
  .then(function (data1) {
    return $http.get('/api2');
  })
  .then(function (data2) {
    return $http.get('/api3');
  })
  .then(function (data3) {
    return data3;
  }, function (err) {
    // an error happens somewhere in the promise-chain
  });
```

Zur Vereinfachung besitzt ein $q-Promise auch eine `catch`-Funktion mit der ihr eine elegant eine finale Fehlerbehandlung implementieren könnt. Mit `finally` könnt ihr sogar Logik implementieren, die immer ausgeführt werden soll, egal ob Fehler- oder Erfolgsfall. Das bietet sich vor allem an, wenn ihr eine Prozessanzeige abschließen oder einen Ladeindikator ausblenden wollt.

<div class="alert alert-info"><b>Hinweis:</b> Benutzt <code>catch</code> und <code>finally</code>, um auf elegant mit Promises zu arbeiten und redundanten Code zu vermeiden.
</div>

Durch die Verkettung und Error-Funktionen ist es auch möglich Fehler zu korrigieren!

![Promises-Error-Correction](../images/figures/promises-error-correction-1.png)

Nun stellen wir unser äußert unschönes Beispiel mit gespiegelten Schnittstellen und Callbacks auf Promises um.

```javascript
$http.get('/api1')
  .then(function (data1) {
    return $http.get('/api2')
      .catch(function (err) {
        return $http.get('/api2b');
      });
  })
  .then(function (data2) {
    return $http.get('/api3')
      .catch(function (err) {
        return $http.get('/api3');
      });
  })
  .then(function (data3) {
    return data3;
  })
  .catch(function (err) {
    // an error happens somewhere else in the chain
  });
```

Wie ihr sehen könnt, ist die gesamte Funktionalität pro Schnittstelle gekapselt. Dadurch gilt die Fehlerbehandlung für `/api2` und `/api3` nur in ihrem jeweiligen Block und die eigentliche (äußere) Promise-Kette bleibt stabil. Die finale `catch`-Funktion also nur ausgeführt, falls `/api1`, `/api2b` oder `/api3b` fehlschlägt.

<div class="alert alert-danger"><b>Achtung:</b> Fehler in asynchronen Kontexten sollten immer abgefangen werden! Ansonsten begegnet euch vielleicht schon bald: <code>Uncaught error ...</code>.</div>

#### Parallelität - Synchronisation mehrerer Asynchronitäten

**Problem**

Stellen wir uns vor, wir haben einen Programmteil, der gleichzeitig mehrere Schnittstellen abfragen möchten. Die Ergebnisse der APIs kommen in beliebiger Reihenfolge zurück. Natürlich müssen wir darauf reagieren wenn alle fertig sind, damit wir gebündelt mit den Daten weiterarbeiten können. Dies ist rein mit Callbacks ein sehr aufwändig Unterfangen.

Beispiel paralleler Anfragen mit jQuery:

```javascript
$.get('/api1').done(function(data){ result1 = data; });
$.get('/api2').done(function(data){ result2 = data; });
$.get('/api3').done(function(data){ result3 = data; });
```

Wie können wir jetzt an dieser Stelle auf feststellen, dass alle 3 APIs ihre Daten erfolgreich zurückgeliefert haben? - Wir müssten in jedem Callback überprüfen, ob die anderen APIs schon fertig sind. Damit wir das prüfen können, müssen wir noch ein zusätzliches Array erstellen, wo wir die Status der APIs zwischenspeichern. Möglich, aber nicht besonders elegant für ein Standard-Problem. Vor allen Dingen, wenn es eine gute Abstraktion dafür gibt. Dazu kommt vielleicht noch mehr Logik, da ja auch auf mögliche Fehler reagiert werden muss. Aber dazu später mehr.

**Lösung**

Auch dieses Problem lässt sich mit Promises spielend leicht lösen. Mit Hilfe von `$q` können nicht nur neue Promise-Objekte erzeugt werden. Ihr findet darauf außerdem ein paar hilfreiche Funktionen. Für unser Problem ist jedoch vor allem eine davon interessant. Über `$q.all` könnt ihr mehrere Promise-Funktionen gleichzeitig ausführen und auf ihre Fertigstellung warten bzw. reagieren.

```javascript
$q.all([asyncFn(), anotherAsyncFn()])
  .then(successFn, errorFn);
```

Dabei wird der Erfolgs-Callback ausgeführt, wenn alle Promises erfüllt wurden und die Fehlerfunktion, wenn ein Promise fehlschlägt. Als Parameter erhält der Erfolgs-Callback ein Array mit den Ergebnisse der Promise-Funktionen und der Fehler-Callback in der Regel ein Error-Objekt.

Wie wir im obigen Problembeispiel gesehen haben, ist das Synchronisieren von Callbacks nicht besonders elegant.

Beispiel paralleler Anfragen mit `$http`:

```javascript
var api1 = $http.get('/api1');
var api2 = $http.get('/api2');
var api3 = $http.get('/api3');

$q.all([api1, api2, api3])
  .then(function(responsesArray) {
    // responsesArray = [resApi1, resApi2, resApi2]
  });
```

#### Vermischung von Verantwortlichkeiten

**Problem**

In der Informatik gibt es das Prinzip der *Aufteilung nach Verantwortlichkeiten* ([Separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns)). Dies dient dazu Programmcode übersichtlich zu halten. Jeder Abschnitt and Code oder auch jede Funktion sollte sich - soweit möglich - nur um eine Aufgabe bzw. Aufgabentyp kümmern.

Nehmen wir wieder einen Standard-Callback als Beispiel:

```javascript
$.get('/meine/api.json', function(data) {
  updateView(data);
  processData(data);
});
```

 Wenn die unsere API abgerufen wurde, möchten wir etwas in der View aktualisieren mit `updateView()` und gleichzeitig die Daten weiterverarbeiten, mit `processData()`. Wir können uns sicher darauf einigen, dass das 2 sehr verschiedene Aufgaben sind.

**Lösung**

Ein Promise-Objekt oder ein Aufruf einer Promise-Funktion kann ganz einfach einer normalen Variable zugewiesen werden. Dudurch wird dieses wiederverwendbar. Das Promise-Objekt hält den Status der Asynchronität und somit auch alle wichtigen Informationen, die wir brauchen. Dadurch können wir das Promise an andere Funktionen übergeben.

Schauen wir uns die Lösung des Problems im Quellcode an.

```javascript
var apiPromise = $http.get('/meine/api.json');

apiPromise.then(updateView);
apiPromise.then(processData);
```

Die Funktionen `updateView` und `processData` können direkt als Funktionsreferenzen übergeben werden, da sie die gleiche Struktur, wie ein normal Callback für `$http`-Anfragen besitzen.

### Fazit

Mit Promises könnt ihr in vielen Fällen viel Code und Nerven sparen. Trotzdem haben natürlich reine Callback-Lösungen auch weiterhin ihre Daseinsberechtigungen. Gerade in Webanwendungen, die oft gleichzeitig an mehreren Schnittstellen angebunden sind, macht es Sinn Promises zu nutzen. Mit dem $q und dem $http-Service gibt euch AngularJS bereits alle nötigen Werkzeuge dafür in die Hand.
