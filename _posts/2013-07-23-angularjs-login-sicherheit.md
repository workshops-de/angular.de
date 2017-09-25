---
title: "Login & Sicherheit in AngularJS"
description: Lerne, wie Authentifizierung in Single-Page-Applikationen funktioniert und was du in Bezug auf Sicherheit beachten musst.
author: "Marius Soutier"
slug: "angularjs-login-sicherheit"
published_at: 2013-07-23 16:00:00.000000Z
categories: "angularjs security authentication"
header_image: "/artikel/header_images/angularjs-login-sicherheit.jpg"
---

Authentifizierung ist ein Thema, das so gut wie jede größere Webanwendung betrifft. Da HTTP ein zustandsloses Protokoll ist, und damit keine Sessions kennt, muss bei jeder Anfrage eine Authentifizierungsinformation mitgeschickt werden. Damit sich ein Benutzer nur ein mal pro Session anmelden muss, soll diese Information erhalten bleiben und automatisch bei jedem Request mitgeschickt werden.

Konkret heißt das: Der Benutzer meldet sich bei der Webanwendung an und der Server ordnet dem authentifizierten Benutzer ein Sicherheitstoken zu (z.B. eine UUID), das auf Serverseite gespeichert wird. Das Token wird dem Client übermittelt, der sich dieses nun "merken" muss, um es bei jeder weiteren Anfrage mitzuschicken. Der Server kann dann überprüfen, ob das Token gültig ist.

<!--more-->

Web-Frameworks bieten hier zwei klassische Vorgehensweisen: *Sticky Sessions* oder *Cookies*.

Sticky Sessions werden auf der Serverseite gehalten und über einen URL-Parameter zugeordnet. Das führt bei Anwendungen mit vielen parallelen Nutzern schnell zu Skalierbarkeitsproblemen, weil der Server für jeden parallelen Nutzer eine Zustandsinformation verwalten muss, die u.a. die Abbildung von der Session-ID auf die Sessiondaten enthält. Das Problem wird dadurch noch verschärft, dass neben dem Token oft auch andere Daten in der Session gespeichert werden. Zudem sind die daraus entstehenden URLs in der Regel nicht "bookmarkable" und der Zurück-Button des Browsers überführt die Session eines Benutzers in den meisten Fällen in einen inkonsistenten Zustand.

Alternativ kann der Server ein Cookie ausstellen, das das Sicherheitstoken enthält. Der Browser schickt dieses Cookie dann automatisch bei jedem Request mit. Außer dem Skalierbarkeitsproblem entfallen damit zwar die anderen Probleme von Sticky Sessions, jedoch entsteht dabei ein Sicherheitsproblem: Wird das Cookie vom Server dazu genutzt, um Anfragen zu erlauben, ist es möglich das Cookie zu stehlen und böswillige Anfragen auszuführen.

Wie ist das möglich? Angenommen ein Benutzer unserer Webanwendung landet beim Surfen auf einer Seite mit Bildern von süßen Hundewelpen. Doch die Macher der Seite haben hinterhältige Absichten und starten beim Laden der Seite mithilfe eines unsichtbaren Bildes Requests auf unseren Webservice. Da der Browser das Cookie mit dem Sicherheitstoken mitschickt, akzeptiert unsere Server-Anwendung diese Anfragen. Solche Attacken nennen wir auch Cross-Site-Request-Forgery ([kurz: CSRF oder XSRF](https://www.youtube.com/watch?v=ySQl0NhW1J0)).

## Single Page Web Applications to the Rescue!

Single Page Applications (SPA), wie man sie vorzugsweise mit AngularJS entwickelt, können diese Probleme komplett umgehen. Da unsere SPA nach dem initialen Ladevorgang die ganze Zeit im Speicher bleibt, können wir das vom Server erhaltene Token ohne Probleme bei jedem Request mitschicken. Dazu nutzen wir keine anfälligen Cookies, sondern einen eigenen HTTP-Header.

Damit sich der Benutzer beim Neuladen der Seite (neuer Tab o.ä.) nicht erneut anmelden muss, können wir das Token nach wie vor im Cookie oder Local Storage ablegen. Dieses Cookie wird zwar auch an den Server geschickt. Dieser ignoriert es aber und somit entsteht keine Sicherheitslücke.

Auch für diesen Ansatz gilt natürlich, dass man eine verschlüsselte Verbindung über HTTPS bevorzugen sollte.

Die folgende Abbildung verdeutlicht nochmals den Ablauf.

![Security Workflow](angularjs-login-sicherheit-workflow.png)

## Auth-Token in AngularJS

Das klingt doch schon mal recht vielversprechend, aber wie geht das nun genau im Kontext von AngularJS? Müssen wir uns etwa bei jedem Request selbst darum kümmern, dass der Header mitgeschickt wird? Es wäre doch super, wenn das Framework uns diese Arbeit abnimmt. Und das tut AngularJS natürlich!

Zunächst bietet uns der [$http](http://docs.angularjs.org/api/ng.$http)-Service die Möglichkeit, für jeden Request einen Header zu setzen. Der \$httpProvider (das Modul, das den \$http-Service injiziert) hat ein `defaults.headers`-Objekt, das wiederum Unterobjekte für die üblichen HTTP-Verben bietet. Möchten wir den Header an alle Requests hängen, gibt es dafür das Unterobjekt `common`:

```javascript
$http.post("/login", credentials).then(function(response) {
  $httpProvider.defaults.headers.common["X-AUTH-TOKEN"] = response.data.token;
});
```


Da es sich aber um eine recht übliche Anforderung handelt, bringt $http einen Auth-Token-Mechanismus von Hause aus mit. Dabei muss der Server einfach nur ein Cookie namens `XSRF-TOKEN` ausliefern. AngularJS liest dieses Cookie automatisch aus und setzt den Header `X-XSRF-TOKEN`. Wird das Cookie vom Server oder Client entfernt, setzt AngularJS den Header nicht mehr. Damit ist dieser Teil erledigt.

Eine kleine Anmerkung am Rande: Die Dokumentation erwähnt, dass das Cookie nach dem ersten GET-Request gesetzt werden soll. Das ist nicht ganz korrekt, da das Cookie auch nach allen anderen HTTP-Anfragen (also POST, PUT, etc.) erkannt wird. Das stammt daher, dass klassische Round-Trip-Webanwendungen nach dem Login erst mal ein Session-Cookie ausstellen und zusätzlich das XSRF-Cookie nutzen, um Missbrauch zu verhindern. Wir beschränken uns hier jedoch auf ein einzelnes Cookie.

## Auf abgelaufene Token reagieren

Solange das Token gültig ist, klappt alles wunderbar. Eine ordentliche Backend-Implementierung sollte eine bestehende Nutzer-Session jedoch nach einer bestimmten inaktiven Zeit invalidieren. Was passiert also, wenn das Token abläuft?

$http bietet einige Methoden um GET-, POST-, PUT-, DELETE- und HEAD-Requests bequemer auszuführen. Diese Methoden liefern nicht nur eine [Promise](/buecher/angularjs-buch/angularjs-promises/) zurück, sondern eine erweiterte Promise, die die Methoden `success(callbackFn)` und `error(callbackFn)` bietet und somit Method-Chaining (bekannt aus jQuery) erlaubt. Außerdem wird die Response schon destrukturiert.

```javascript
$http.get("/users/3")
.success(function(data, status, headers, response) {
  $scope.user = data;
})
.error(function(data, status) {
  if (status == 401)
    // Zur Login-Seite
  else
    // Fehlermeldung anzeigen
});
```


Nicht schlecht, aber natürlich wollen wir nicht bei jeder Anfrage abfragen, ob der Server mit 401 geantwortet hat. Auch hier bietet uns AngularJS eine Hilfestellung. Wir können beim \$httpProvider einen so genannten **HTTP-Interceptor** anmelden. Ein Interceptor fängt jede Response ab und entscheidet, ob die Response an die aufrufende Funktion weitergeleitet wird oder nicht. Ein Interceptor ist dabei nichts anderes als eine Funktion, die eine Promise übermittelt bekommt. Status-Codes im 200er-Bereich werden dabei als erfolgreiche (**resolved**) Promise übergeben, alle anderen Codes sind nicht-erfolgreich (**rejected**). Auf Basis unserer eignenen Logik können wir darauf reagieren oder sogar die Promise ändern.

```javascript
var interceptor = function() {
  // Die Promise enthält eine Response; wir müssen wieder eine Promise zurückliefern
  return function(promise) {
    return promise.then(
      function(response) { return response;}, // alles ok, dabei belassen wir es
      function(response) {
        if (response.status == 401) {
          // Zur Login-Seite
        }
        return $q.reject(response);
      }
    );
  };
};
$httpProvider.responseInterceptors.push(interceptor);
```


Man kann mithilfe von HTTP-Interceptoren jede Menge Nettigkeiten einbauen, um innerhalb unserer Anwendung intelligent mit Fehlern umzugehen. Beispielsweise könnten wir bei einem 401 direkt ein Login-Fenster anzeigen und nach getätigtem Login den ursprünglichen Request erneut abschicken (dies wird mit [Angular 1.2](http://www.youtube.com/watch?v=W13qDdJDHp8) und around-interceptors noch einfacher). Ein weiterer Anwendungsfall könnte sich dadurch äußern, dass wir bei einem 404 mithilfe des `Exponential Backoff`-Algorithmus Timeout-Zeiten berechnen und den Request nach Ablauf des jeweiligen Timeouts erneut stellen und im Erfolgsfall die Daten nachladen.

## Routing

Wenn man mit Routen arbeitet, bietet es sich an, schon vor dem Laden der Route abzufragen, ob der Nutzer autorisiert ist, die angeforderte Seite anzuschauen. Beim Konfigurieren der Routen kann man dazu einen weiteren Parameter `resolve` übergeben. Dieser Parameter muss mit einem Objekt gefüllt werden, das pro selbst gewähltem Key eine Funktion anbietet, die beim Laden der Route aufgerufen wird. Gibt die Funktion eine Promise zurück, so entscheidet das Ergebnis (resolve oder reject) der Promise, ob die Route geladen wird. Im folgenden Code-Beispiel pingen wir den Server einfach an, der wiederum überprüft, ob ein Token gesetzt ist und wie gehabt mit 200 oder 401 antwortet.

```javascript
$routeProvider.when("/users/:id", { templateUrl:'/user.html', controller:UserCtrl, resolve:{
    authorize:function($http) {
      return $http.get("/ping"); // $http.get liefert eine Promise zurück
    }
  }
})
```


Antwortet der Server nun mit 401, wird das Event `$routeChangeError` gefeuert, auf das wir nun reagieren können. Da uns mit `nextRoute` die angeforderte Route übergeben wird, können wir uns diese merken und nach getätigtem Login wieder ansteuern.

```javascript
$scope.$on("$routeChangeError", function(event, nextRoute, currentRoute) {
  // Zur Login-Seite
  $rootScope.nextRoute = nextRoute; // oder in einem Service speichern
});
```


## Datei-Uploads

Eine letzte Herausforderung ist das Hochladen von Dateien. Der *XMLHttpRequest* unterstützt das Hochladen von Dateien nicht, bzw. erst in Version 2 des Protokolls, das aber erst ab IE10 zur Verfügung steht. Ein klassischer Trick ist daher das Posten in ein iFrame (für AngularJS gibt es dafür z.B. das recht einfach gehaltene Modul [ngUpload](https://github.com/twilson63/ngUpload)).

Wie können wir aber nun unseren Upload autorisieren? Einen Header können wir nicht mitschicken, also sollten wir unseren Webservice so erweitern, dass das Auth-Token auch in der URL oder als Formular-Wert mitgeschickt werden kann. Der URL-Ansatz empfiehlt sich hier, da der Service dann nicht erst den HTTP-Body parsen muss, um zu entscheiden, ob der Request erlaubt ist oder nicht.

## Zusammenfassung

Sicherheit und Benutzerverwaltung sind in AngularJS auch nicht komplizierter als in klassischen Webanwendungen. Wie wir gesehen haben, sind doch einige nette Tricks möglich, ohne dass man einen absurd großen Programmieraufwand hätte. Auch die guten alten HTTP-Statuscodes sind in modernen SPAs noch gut zu gebrauchen.

Schaut euch einfach das [Beispielprojekt](https://github.com/mariussoutier/PlayBasics/tree/master/AngularJS-Auth ) an und bei weiteren Fragen nehmt gerne Kontakt auf.
