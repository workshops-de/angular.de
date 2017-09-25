---
title: "Spring Web MVC mit AngularJS - Eine Fallstudie"
description: "In diesem Artikel möchte ich euch anhand eines Enterprise Software Produktes zeigen, wie man AngularJS mit Spring Web MVC als Backend einsetzen kann."
author: "Björn Wilmsmann"
slug: "angularjs-spring-web-mvc"
published_at: 2014-06-10 07:00:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-spring-web-mvc.jpg"
---

**UPDATE 05.01.2015:** ZenQuery ist nun Open Source auf [GitHub](https://github.com/BjoernKW/ZenQuery) verfügbar. Insbesondere kann der Quellcode des mit AngularJS umgesetzten Frontends [hier](https://github.com/BjoernKW/ZenQueryUI) eingesehen werden.

In diesem Artikel möchte ich euch anhand eines Enterprise Software Produktes zeigen, wie man AngularJS mit Spring Web MVC als Backend einsetzen kann.

## Hintergrund: [ZenQuery](http://www.zenqry.com/), ein ‘Enterprise Backend as a Service'

Das Produkt, um das es im Folgenden gehen wird, heißt [ZenQuery](http://www.zenqry.com/) und löst ein häufiges Problem in Unternehmen:

Viele Unternehmen verfügen über erhebliche, in zahlreichen Datenbanken gespeicherte Informationsmengen. Der Zugriff auf diese Datensilos ist oft schwierig und erfordert erheblichen individuellen Entwicklungsaufwand. Jedes Unternehmen - egal welcher Größe - will heutzutage flexibel agieren können: Eine neue Mobile App oder eine Landing Page für eine Marketingkampagne soll schnell und flexibel erstellt werden. Oftmals sind die dazu nötigen Daten zwar in Datenbanken vorhanden, aber nicht einfach zugreifbar. Meist musst erst aufwendig eine eigene Anwendung erstellt werden, welche die Daten aus der Datenbank ‘abholt’ und für den eigentlichen Anwendungszweck angemessen aufbereitet.

ZenQuery löst dieses Problem durch die automatische Bereitstellung einer REST API für Datenbanktabellen und SQL-Abfragen. ZenQuery erzeugt aus SQL Abfragen automatisch eine einfach verwendbare REST Schnittstelle. ZenQuery ermöglicht es so, auf einfache Weise auf beliebige Datenbankinhalte in verschiedenen Formaten (u.a. JSON, XML, CSV und HTML) zuzugreifen.

## Idee und Zielsetzung

Die Idee zu dem Produkt ZenQuery ist als '[Heroku Dataclips](https://devcenter.heroku.com/articles/dataclips) für unternehmenseigene, interne Datenbanken' entstanden. Die Fragen, die ich mir gestellt habe, waren: Warum sollen eigentlich nur Startups von den heutigen Möglichkeiten von Software und Lösungen wie [Firebase](https://firebase.google.com/) profitieren? Kann man Unternehmen, die nicht auf Cloud-Infrastruktur setzen können oder wollen, diese Möglichkeiten nicht auch bieten?

Das ist, denke ich, eine spannende Geschäftsidee mit einigem Potential. Also machte ich mich an die Umsetzung. Was die technische Realisierung anging, stellte sich für mich zunächst die Frage, wie ein solches Produkt umzusetzen ist, so dass es sowohl den Anforderungen potentieller Kunden entspricht, als auch einen flexiblen, schnellen Entwicklungsprozess ermöglicht.

Das Produkt soll sich ganz bewusst von der meist eher unterdurchschnittlichen User Experience klassischer Enterprise Anwendungen abheben: Die Anwendung soll einfach bedienbar sein und augenblicklich auf Nutzereingaben reagieren. Die Software soll sich insgesamt wie eine Anwendung aus einem Guss anfühlen und weniger wie eine aus vielen Einzelteilen bestehende Website.

## Eine Single Page Application soll es sein

Eine [Single Page Application](http://en.wikipedia.org/wiki/Single-page_application) ist meiner Ansicht nach der richtige Ansatz für diese Anforderungen. Single Page Applications haben in letzter Zeit deutlich an Bedeutung gewonnen. Diese Architektur kombiniert die Vorteile von herkömmlichen Web-Anwendungen - dynamisches Verhalten, Vernetzung und einfachen Zugriff über den Browser - mit denen von klassischen Desktop-Client-Anwendungen: Offline-Verfügbarkeit, schnelle Antwortzeiten und Geschwindigkeit.

Single Page Applications werden - wie der Name schon andeutet - beim ersten Aufruf über den Browser vollständig geladen. Ein Nachladen einzelner Seiten entfällt. Solche Anwendungen wirken daher in der Bedienung meist flüssiger als normale Websites oder klassische Round-Trip Web-Anwendungen.

Bei Single Page Applications wird ein Großteil der Anwendungslogik, insbesondere User Interface Verhalten in den Client verlegt. Üblicherweise dient dabei eine schlanke Serverschicht weiterhin als Backend ([Client-Server Modell](https://en.wikipedia.org/wiki/Client-server_model). Single Page Applications funktionieren so auch offline und können sich bei Bedarf und Verfügbarkeit einer Internetverbindung jederzeit wieder mit dem Backend synchronisieren.

Ein wesentlicher Aspekt bei der Auswahl der Technologien war für mich, dass es sich um erprobte, zuverlässige Frameworks handelt. Die hauptsächliche Zielgruppe für das Produkt sind Enterprise Kunden, die besonderes Augenmerk auf Dinge wie Zuverlässigkeit und Wartbarkeit legen. Hype-Technologien, die so schnell gehen, wie sie gekommen sind, fallen für diese Zielgruppe raus.

## Frontend

Meine Wahl für das Framework zur Umsetzung des Frontends fiel schnell auf [AngularJS](https://angularjs.org/). Mittels AngularJS lassen sich Single Page Applications schnell und strukturiert entwickeln. Zugegeben, AngularJS ist ein wenig auch noch eine Hype-Technologie, aber sie hat sich bereits im ‘echten Leben da draußen’ bewährt und wird von großen Unternehmen eingesetzt. Nicht zuletzt durch die Tatsache, dass AngularJS von Google-Mitarbeitern initiiert und von Google aktiv gefördert wird, kann man sagen, dass AngularJS gewissermaßen ‘angekommen‘ ist. Ein Aspekt, der AngularJS in Bezug auf Zuverlässigkeit im Vergleich zu anderen Frameworks besonders hervorstechen lässt, ist der Wert, den die Entwickler auf Testbarkeit legen.

### Agile Entwicklung

Was AngularJS für Entwicker besonders angenehm macht, ist die User Experience der Entwicklungsumgebung: [Grunt](http://gruntjs.com/) öffnet die Anwendung direkt im Browser und lädt sie bei Änderungen im Code automatisch neu. Man muss nicht ständig neu kompilieren, sondern Änderungen sind direkt verfügbar. Das Two-Way Data Binding von AngularJS ermöglicht Fokussierung auf die eigentliche Anwendung. Boilerplate-Code, um Daten von A nach B zu bekommen oder das DOM manuell zu aktualisieren, entfällt.

## Backend

[Spring Web MVC](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/mvc.html) ist wiederum gut geeignet, um als Backend für eine Single Page Application zu fungieren. Wie oben erwähnt, kommen die Kunden für ein Produkt wie ZenQuery eher aus dem Enterprise-Bereich und verfügen vornehmlich über Java-Infrastruktur.

Ein erprobtes Java-Framework ist hier deswegen Voraussetzung fürs Backend. Spring, insbesondere in der [aktuellen Version 4](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/new-in-4.0.html), ist dabei [besser als sein Ruf](https://plus.google.com/+aerotwist/posts/1QhcnQizuPc). Die Entwicklung mit Spring und Java geht mittlerweile leicht von der Hand und steht zusammen mit einer leistungsfähigen IDE in Sachen Produktivität anderen Web-Frameworks in Nichts nach.

Außerdem ist ZenQuery nunmal letztendlich ein Datenbanktool und für Java gibt es zuverlässige Treiber für jede Datenbank unter der Sonne.

## yo angular

Mittels [Yeoman](http://yeoman.io/) lässt sich die Grundstruktur einer AngularJS Anwendung schnell und einfach via Kommandozeile erzeugen:

```shell
yo angular
```

Yeoman legt eine vorgegebene Ordnerstruktur mit eindeutigen Orten für [Models, Views, ViewModels](http://en.wikipedia.org/wiki/Model_View_ViewModel) und Co. an, so dass man direkt mit der Entwicklung loslegen kann.

ZenQuery besteht im Wesentlichen aus 2 Controllern: Einem für Datenbankverbindungen und einem für Datenbankabfragen. Diese Controller enthalten verschiedene Funktionen zur Zusammenstellungen der ViewModels für die jeweiligen Listen- und Detail-Views. Hier passieren Dinge wie Filterung, Paginierung (über [UI Bootstrap](http://angular-ui.github.io/bootstrap/) ) und die Ansteuerung der Model-Objekte.

Der eigentlich ‘spannende’ Teil passiert in eben diesen Model-Objekten. Bei diesen handelt es sich um Service-Factories für jede Entität im Backend, z.B. für die Datenbankverbindungen:

```javascript
zenQueryServices.factory('DatabaseConnection', function($resource, configuration) {
  return $resource(configuration.apiRootURL +
    'api/v1/databaseConnections/:databaseConnectionId',
    {},
    {
      findAll: {
        method: 'GET',
        params: { databaseConnectionId: 'findAll' },
        isArray: true
      },
      get: {
        method: 'GET'
      },
      create: {
        method: 'POST'
      },
      update: {
        params: { databaseConnectionId: '@id' },
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
    }
  );
});
```


Diese Services rufen mittels *[ngResource](https://docs.angularjs.org/api/ngResource/service/$resource)* (über Dependency Injection im Service verfügbar) URLs im Backend auf, die via REST die entsprechenden Daten als JSON zurückgeben. Hier werden verschiedenen CRUD Operationen auf HTTP Verben und Parameter abgebildet. Diese Operationen können dann im Controller wie folgt aufgerufen werden:

```javascript
$scope.databaseConnections = DatabaseConnection.findAll(
  function(databaseConnections) {
    $scope.total = databaseConnections.length;
    filter(databaseConnections);
  }
);
```

Dieses Codestück ruft die *findAll()* Funktion im oben definierten Service auf und sobald dieser Aufruf erfolgreich war, wird das zurückgegebene Array der Datenbankverbindungen an eine Funktion übergeben. Hier wird dann die Gesamtzahl der Datenbankverbindungen im *$scope* des Controllers gesetzt und die Datenbankverbindungen für die Paginierung gefiltert.

Ein weiterer Aufruf für einzelne Datenbankverbindungen sieht so aus:

```javascript
$scope.databaseConnection = DatabaseConnection.get({
  databaseConnectionId: databaseConnectionId
});
```

Hier wird eine einzelne Datenbankverbindung aus dem Backend geladen. Dazu wird dem Aufruf der *get()* Funktion des Service die ID der Datenbankverbindung als Argument übergeben.

Die Definition der Service-Factory enthält ein weiteres interessantes Detail:

```javascript
zenQueryServices.factory('DatabaseConnection', function($resource, configuration) {
  return $resource(configuration.apiRootURL +
    'api/v1/databaseConnections/:databaseConnectionId',
    { },
    {
      ...
    }
  );
});
```

Hier wird über Dependency Injection ein *configuration* Objekt genutzt, um die URL des Backends je nach Umgebung individuell setzen zu können. Dies ist nötig, weil die AngularJS App während der Entwicklung über einen eigenen Grunt-Prozess unter Port 9000 gestartet wird, während sie in Produktion im Kontext der Java-Anwendung unter ihrem Port laufen wird. Um eine umgebungsspezifische Konfiguration umzusetzen, habe ich [Simon Baileys env-config Yeoman Generator](http://newtriks.com/2013/11/29/environment-specific-configuration-in-angularjs-using-grunt/) verwendet. Sehr nützliches Tool!

## mvn jetty:run

Parallel zum Frontend wurde das Backend entwickelt. Dieses enthält einige Logik zum zeitgleichen dynamischen Ansteuern verschiedener Datenbankserver und -systeme. Die Kommunikation von Backend und Frontend geschieht über Controller, die über die *@Controller* Spring-Annotationen definiert werden. Der Begriff Controller ist hier nicht mit AngularJS Controllern zu verwechseln. Spring Web MVC ist, wie der Name sagt, ein klassisches MVC Framework. Über weitere Annotationen werden Adressen, zulässige Request-Methoden und Rückgabeformate definiert:

```javascript
@Controller
@RequestMapping("/api/v1/resultSetForQuery")
public class ResultSetController {
  @RequestMapping(
    value = "/{id}",
    method = RequestMethod.GET,
    produces = { "application/json; charset=utf-8" })
  public @ResponseBody List<Map<String, Object>> currentQuery(@PathVariable Integer id) {
    List<Map<String, Object>> rows = getRows(id, null, null);
    return rows;
  }
}
```

Die so erstellten Controller können wie weiter oben beschrieben direkt mittels *ngResource* in AngularJS verwendet werden. Da sowohl Spring Web MVC, als auch AngularJS standardmäßig JSON als Datenaustauschformat nutzen, muss man sich um so lästige Aspekte wie Objektserialisierung und Marshalling nicht selber kümmern, sondern kann direkt auf die einzelnen Objekte und ihre Attribute zugreifen.

## Kommunikation über REST mit Cross-Origin Resource Sharing

[Cross-origin Resource Sharing (CORS)](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) ist ein Mechanismus, der die normale Beschränkung von Browsern umgeht, Daten per JavaScript nur vom aktuellen Host (genauer: von der aktuellen Origin, also Protokoll, Host und Port) nachladen zu können. Dies ist während der Entwicklung einer verteilten Client-Server Anwendung wie in diesem Fall notwendig, weil das AngularJS Frontend hier über einen eigenen Grunt Prozess unter locahost:9000 ausgeliefert wird, das Java Backend aber unter localhost:8080 läuft.

Für den Browser sind dies 2 verschiedene Origins, die nur dann miteinander kommunizieren können, wenn beide entsprechende HTTP Header schicken. AngularJS tut dies automatisch. Bei Spring Web MVC ist hier zusätzlich noch die Einbindung eines [CORS Filters](https://spring.io/guides/gs/rest-service-cors/) nötig:

```javascript
@Component
public class CORSFilter implements Filter {
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) servletResponse;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    response.setHeader("Access-Control-Max-Age", "3600");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    chain.doFilter(servletRequest, servletResponse);
  }

  public void init(FilterConfig filterConfig) {}
  public void destroy() {}
}
```

## Ready to rumble

Das Deployment der fertigen Anwendung erfolgt letztlich ganz genauso wie das einer jeden anderen Java EE Anwendung. Zuvor wird beim Build das AngularJS Frontend in den /WEB-INF Ordner der Java-Anwendung kopiert. Anschließend wird aus der Java-Anwendung ein normales [WAR File](http://en.wikipedia.org/wiki/WAR_(file_format)) erzeugt, das in jedem beliebigen [Java Application Server](http://en.wikipedia.org/wiki/Application_server) installiert werden kann.

Da eine AngularJS App aus reinem HTML, JavaScript und CSS besteht, lässt sich das Frontend anschließend einfach über den Browser wie eine statische HTML-Seite aufrufen. Das ZenQuery Frontend lädt daraufhin in Sekundenbruchteilen, holt sich den aktuellen Datenbestand via REST aus dem Java Backend und stellt diese Daten in einem aufgeräumten User Interface dar:

![image alt text](image_0.png)

## Ausblick

AngularJS und Spring Web MVC sind eine hervorragende Kombination für die Entwicklung von Enterprise Anwendungen. AngularJS ermöglicht die einfache und strukturierte Entwicklung von Frontends in Form von Single Page Applications. Spring Web MVC wiederum ist ein ausgereiftes Java Framework, das besonders gut mit der IT-Infrastruktur in großen Unternehmen zusammen spielt und damit gut geeignet ist, um als Backend für eine AngularJS-Anwendung im Enterprise-Kontext zu fungieren.

Mit AngularJS und Spring Web MVC erhält man so ‘das beste aus beiden Welten’:

* einen agilen Entwicklungsprozess mit kurzen Feedbackzyklen

* eine angenehme, flüssige User Experience ähnlich der von Desktop-Anwendungen

* ein robustes Backend mit zuverlässigen Anbindungen für verschiedene Datenbanken

* ausgereifte Komponenten für praktisch jeden Anwendungsfall

Die Entscheidung, ZenQuery mittels dieser Technologien zu entwickeln, hat sich bereits jetzt gelohnt und ich denke, dass sich diese Wahl auch im Hinblick auf die Weiterentwicklung des Produktes bewähren wird.
