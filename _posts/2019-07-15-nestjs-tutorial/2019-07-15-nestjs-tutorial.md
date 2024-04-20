---
title: "NestJS Tutorial für Einsteiger"
description: "NestJS ist ein Framework für serverseitige NodeJS Implementierungen in Enterprise Projekten. In diesem Tutorial werden wir eine Rest-API implementieren."
author: "Robin Böhm"
published_at: 2019-06-21 10:15:01.000000Z
header_source: https://unsplash.com/photos/MkjeghKewIE
categories: "nestjs tutorial nodejs"
---

Dieses Tutorial erklärt euch die Grundlagen des Frameworks NestJS. Wir werden einige Code Beispiele benutzen die ihr via [Git Repository](https://github.com/angularjs-de/angular-de-nestjs-tutorial) auf eurem eigenen Rechner ausprobieren könnt.
Dieses Tutorial richtet sich an Entwickler:innen, welche die Grundlagen des Webs, Client-Server Architektur und Rest-Schnittstellen bereits verstanden haben.
Ziel dieses Tutorials ist es, zu zeigen wie eine Rest-API mit Nest gebaut werden kann.
Wir benutzen hierbei als Datenbank eine PostgreSQL Instanz, es können aber auch andere (NoSQL) Datenbanken wie MongoDB genau so einfach angebunden werden. Weiterhin wird ein lauffähiges NodeJS in Version 10 oder höher für dieses Tutorial vorausgesetzt.

## Was ist NestJS?
Der starke Einfluss von Angular bringt Konzepte wie Dependency Injection, Separation of Concerns und einen mächtigen Generator, welcher eine klare Architektur ermöglicht. Das auch über verschiedene Projektteams hinweg. NestJS liefert endlich eine gute Lösung für serverseitige NodeJS Implementierungen in Enterprise Projekten. In den meisten Fällen wird es benutzt, um API Endpoints für Frontends bereitzustellen.

<img src="/shared/assets/img/placeholder-image.svg" alt="Client Server API Illustration" class="lazy center" data-src="client-server-api.png" data-srcset="client-server-api.png"
 />


## Einordnung zu anderen Frameworks
NestJS orientiert sich sehr stark an den Konzepten und der Architektur von Angular. Es lassen sich aber auch klare Ähnlichkeiten zu Frameworks wie Spring Boot, ASP.NET oder auch Ruby on Rails finden. Abgesehen von den verschiedenen Sprachen und Ökosystemen lassen sich klare Gemeinsamkeiten erkennen, welche diese Frameworks erfolgreich machen. NestJS greift diese ebenfalls auf und kombiniert diese Stärken sehr gut.

### Der Fokus auf Businesslogik
Durch den Einsatz von Elementen wie Dependency Injection und Decorators/Annotations kann der Fokus größtenteilsauf die Definition von Business Logic gelegt werden. Die dadurch reduzierte Komplexität führt zu deutlich verbesserten Lesbarkeit und auch langlebiger Wartbarkeit, da Updates am Framework über klare und einfache Schnittstellen getrennt sind und sich oft automatisch updaten lassen.

### Die Nest CLI
Durch die Nest CLI lässt sich sehr viel Zeit gerade am Anfang eines Projektes sparen, da etliche Fragen zur organisation des Projektes bereits beantwortet sind:
Wie sieht unsere Ordnerstruktur aus?
Wie benennen wir Dateien?
Welche Formatierung nutzen wir? Tabs oder Spaces?
Wieso sieht unsere Struktur ganz anders aus als von Team B?
usw
Jeder kennt diese Situationen: Man möchte das eigentliche Problem lösen, muss aber erst einmal Zeit in das Projekt Setup investieren. Das Kommandozeilenwerkzeug Nest CLI gibt klare Strukturen vor. So kann hier teamübergreifend schnell und effizient gearbeitet werden.

### Separation of Concerns
Hinter diesem Schlagwort versteckt sich ein Design Pattern, welches sich aufgrund der langfristigen Wartbarkeit als sehr beliebt zeigt. Es geht hierbei unter anderem um den fachliche Schnitt unserer Module in Bausteine. Jeder Baustein löst hierbei eine spezielle und abgetrennte Aufgabe. Die Trennung unserer eigenen Businesslogik wird von dem Framework durch klare Grenzen und Vorgaben unterstützt. Oftmals sieht man dies auch in Verbindung mit Dependency Injection, welches eine klare Abtrennung bestimmter Funktionalitäten ermöglicht, wie z.B. Http Verbindungen oder die Implementierung eines bestimmten oAuth Providers. Die Architektur des Frameworks unterstützt diese Trennung sehr stark.

### Atomare und testbare Module
Die Aufteilung in atomare und funktionale Bausteine in unseren Anwendungen ermöglicht Wiederverwendbarkeit und Testbarkeit. Beide Eigenschaften sind für viele Projekte ein essentieller Schlüssel zum Erfolg. Atomare Bausteine lassen sich gut testen. Getesteter Code lässt sich einfacher warten und ist langfristig günstiger. Die Wartbarkeit des Projektes ermöglicht langfristig schnelle Änderungen.

## Vorteile von NestJS
Die oben genannten Vorteile gelten meist für alle der genannten Frameworks. Welche Vorteile bietet uns dann NestJS? Hierbei kommt es, wie so oft, immer auf die spezifische Projektsituation an. NestJS kann eine besonders gute Wahl in Verbindung mit einem modernen Frontend-Stack wie Angular, React oder Vue sein.

### Die gleiche Programmiersprache
Durch die Benutzung von TypeScript(JavaScript) sowohl im Frontend als auch im Backend, müssen Entwickler:innen, welche an beiden Projekten arbeiten, nicht ständig zwischen zwei Sprachen und Konzepten hin und her wechseln. Das spart enorm viel kognitive Energie welche sinnvoller eingesetzt werden kann.

### Wiederverwenden von DTOs
Unter dem Begriff DTO versteht man ein Data-Transfer-Objekt. Dies wird benutzt um die Serialisierung und De-Serialisierung bei Netzwerk-Kommunikation klar zu definieren. Im Fall einer Client-Server-Anwendung müssen diese Definitionen und Funktionen also jeweils auf beiden Seiten implementiert und synchron gehalten werden. Ein typischer Projektaufbau mit NestJS erlaubt aber die gleichzeitige Verwendung dieser Interface-Definitionen. Somit hat man eine klare Stelle für diese Definitionen und reduziert so die Gefahr einer potentielle zeitfressenden Fehlerquellen enorm.

### Ähnliche Struktur
Nest ist sehr stark durch moderne Plattformen wie Angular inspiriert. Sowohl die Entwicklungsumgebung, die Laufzeitumgebung, als auch die Build-Prozesse sind sehr ähnlich im Front und Backend. Es kann also viel gelerntes Wissen direkt wiederverwendet werden. Die oftmals strikte Trennung zwischen Backend- und Frontend-Entwickler:innen kann aufgeweicht werden und eine bessere Kommunikation fördern.

### Ähnliche Konzepte
Sehr stark ausgeprägt in Verbindung mit Angular sind die gemeinsamen Konzepte und Paradigmen, welche genutzt werden, um die Architektur zu definieren. Geführt durch einen Generator(welcher auf Schematics basiert) können sowohl NestJS-Core als auch Third-Party-Module einfach integriert und aktualisiert werden. Die Benutzung von Dependency Injection, Decorators und Modulen ermöglicht ein Wiederverwenden von vielen Wissensbausteinen.

<hr>
<div class="workshop-hint">
  <div class="h3">Keine Lust zu Lesen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>
        Nicht jeder lernt am besten aus Büchern und Artikeln. Lernen darf interaktiv sein und Spaß machen. Wir bieten euch auch
        <a target="_blank" href="/schulungen/nestjs-enterprise-applications/?utm_source=angular_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-top-link">NestJS Schulungen</a> an, falls Ihr tiefer in die Thematik einsteigen wollt.
      </p>
      <p class="">
        <a target="_blank" href="/schulungen/nestjs-enterprise-applications/?utm_source=angular_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-top-button">
          <button class="btn btn-danger">Mehr Informationen zur Schulung</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded lazy"
      style="margin-top:-20px"
      data-src="/assets/img/workshops/workshops-attendees.png"
      data-srcset="/assets/img/workshops/workshops-attendees.png"
       src="/shared/assets/img/placeholder-image.svg" alt="Teilnehmer:innen in unser Intensiv Schulung">
    </div>
  </div>
</div>
<hr>

## Konzepte
NestJS hat viele Bausteine, jedoch sind einige davon essentiell um die grundlegende Funktionsweise des Frameworks zu verstehen. Genau diesen Konzepten werden wir uns als nächstes widmen. Es handelt sich hierbei um Controller, Services und Module. Um diese zu erklären nutzen wir einen minimalen Projekt-Aufbau einer Client/Server Architektur die auf einer Rest-Schnittstelle basiert.

<img src="/shared/assets/img/placeholder-image.svg" alt="Client Server API Illustration" class="lazy center" data-src="client-server-api.png" data-srcset="client-server-api.png"
 />

### Controller
Das erste Konzept, welches wir uns ansehen, sind die Controller. Controller sind Klassen, welche sich um die Annahme und die Verarbeitung eines Requests kümmern. In einer typischen Anwendung haben wir einen Controller für jeden sogenannten Endpoint. Es kann mehrere Endpoints in einer Anwendung geben, welche natürlich auch verschachtelt auftreten können.

<img src="/shared/assets/img/placeholder-image.svg" alt="Client request to an API and controller routing" class="lazy center" data-src="nestjs-api-controller.png" data-srcset="nestjs-api-controller.png"
 />

In unserem Beispiel haben wir eine API, welche drei Endpoints anbietet: Books, Events und Auth. In unserem Fall schauen wir uns den Events Endpoint an. Der EventController implementiert Funktionen, welche uns ermöglichen verschiedene Operationen auf eine Event Ressource auszuführen.

GET       /api/events/   findAll
GET       /api/events/1   findOne
PUT       /api/events/1   update
DELETE    /api/events/1   update

<img src="/shared/assets/img/placeholder-image.svg" alt="Client request to an API and controller routing" class="lazy center" data-src="nestjs-eventcontroller.png" data-srcset="nestjs-eventcontroller.png"
 />

Diese Art von Schnittstellen werden oftmals als CRUD-Schnittstelle bezeichnet. Der Controller an dieser Stelle ist ausschließlich für die simple Definition der API Schnittstelle und dem Aufruf von Service-Funktionen zuständig, welche unseren Datenzugriff atomar kapseln.


### Services
Das Konzept eines Services ermöglicht es uns, Funktionalitäten wie z.B. Zugriff auf bestimmte Daten an einer separaten Stelle atomar zu definieren (Seperation of Concerns). Durch diese Aufteilung lassen sich die verschiedenen Bereiche einfacher warten und auch testen.

Der EventService an dieser stelle enthält die notwendigen Konfigurationen um die Operationen auf einer beliebigen Datenbank für uns auszuführen. Mit Hilfe von Dependency Injection können wir den Service sehr einfach in unserem `EventController` zur Verfügung stellen ohne eine explizite Bindung eingehen zu müssen. Im Testfall kann dieser so durch ein Stub- oder Mock-Objekt ausgetauscht werden.

<img src="/shared/assets/img/placeholder-image.svg" alt="Client request to an API and controller routing" class="lazy center-80" data-src="nestjs-controller-di.png" data-srcset="nestjs-controller-di.png"
 />

### Module
Die bisher gezeigten Konzepte von Controllern und Services können wir in fachlichen Modulen zusammenfassen. Dies hat den Vorteil, dass wir klare Grenzen zwischen Fachlichkeiten definieren und auch bestimmte Module an anderen Stellen oder Projekten wiederverwenden können.

<img src="/shared/assets/img/placeholder-image.svg" alt="Client request to an API and controller routing" class="lazy center-80" data-src="nestjs-module.png" data-srcset="nestjs-module.png"
 />

## Installation der CLI
Genug der Theorie! Mit den Grundkonzepten, die wir bisher gelernt haben können wir bereits unsere erste kleine NestJS Anwendung erstellen. Der erste Schritt hierbei ist die Installation der NestJS-CLI welche über npm erfolgt.

```cmd
npm i -g @nestjs/cli
nest --version
nest --help
```

Durch Abfragen der Version oder das Anzeigen des Hilfetextes können wir am schnellsten validieren, ob die Installation erfolgreich war. Unter Umständen ist es möglich, dass ihr hierzu ein neues Terminal, bzw. eine neue Konsole öffnen müsst. Wurden beide Funktionen erfolgreich ausgeführt, können wir nun auch schon unser erstes Projekt generieren.

## Erstellung eines Projektes
Wie ihr vielleicht schon in dem Hilfetext der Nest-CLI gesehen habt, gibt es viele Generator Funktionen, welche uns bei der Erstellung unserer Anwendung mit einer klaren Struktur und bereits aufgesetztem Build-Prozess unterstützen. Hierfür können wir das `new` command benutzen, welches uns unter dem angegebenen Namen einen neuen Ordner erstellt und eine Basis-Anwendung erstellt (auch Bootstrapping [sollte es nicht eher scaffolding sein?] genannt). Ich habe mich für den Namen “angular-de-nestjs-tutorial” entschieden. Ihr werdet bei der Installation wahrscheinlich gefragt, welchen Paketmanager ihr nutzen wollt, ich habe mich in diesem Tutorial für `npm` entschieden.

```cmd
nest new angular-de-nestjs-tutorial
cd angular-de-nestjs-tutorial
npm run start
```


Nachdem unser Projekt generiert und die notwendigen `node_modules` geladen wurden, können wir  unseren Server mit `npm run start` das erste Mal starten. Unter der Adresse [localhost:3000] (http://localhost:3000) sollten wir nun die Ausgabe “Hello World!” sehen.
Herzlichen Glückwunsch! Wir haben ein lauffähigen Nest Server erstellt!

Viel passiert hier allerdings noch nicht. Wir haben einen `AppController` und ein `AppService`, welche uns nach der bereits bekannten Aufteilung die Ausgabe “Hello World” anzeigen.

```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```




## Implementierung einer Rest Schnittstelle
Mit dieser Basis können wir uns nun an die eigentliche Aufgabe begeben: Die Erstellung einer Events Ressource unter dem API-Endpoint `/events/`. Im ersten Schritt werden wir hierzu einen Controller erstellen, welcher vorerst nur statische Daten zurückgibt. Im zweiten Schritt werden wir dann unsere Datenbank anbinden.

Um unsere Anwendung direkt in fachliche Komponenten aufzuteilen starten wir mit der Generierung eines neuen Modules mit dem Namen `events`.

```cmd
nest g module events
```

Ausgabe in der Console:

```cmd-output
CREATE /src/events/events.module.ts (83 bytes)
UPDATE /src/app.module.ts (316 bytes)
```

In der Ausgabe in unserer Konsole können wir sehen, dass wir einen neuen Unterordner mit einem Events-Modul generiert haben. Gleichzeitig hat uns dieses Modul automatisch in unserem App-Module über `imports` angemeldet.

```typescript
@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Als nächstes generieren wir einen Controller mit dem dazugehörigem Service. Hierfür nutzen wir die Generator Funktionen `controller`(kurz `co`) und `service`(kurz `s`).

```cmd
nest g s events
nest g co events
```

Ausgabe in der Console:

```cmd-output
CREATE /src/events/events.service.spec.ts (460 bytes)
CREATE /src/events/events.service.ts (90 bytes)
UPDATE /src/events/events.module.ts (163 bytes)

CREATE /src/events/events.controller.spec.ts (493 bytes)
CREATE /src/events/events.controller.ts (101 bytes)
UPDATE /src/events/events.module.ts (254 bytes)
```

Wie wir hier sehen, erkennt die CLI automatisch, dass bereits ein Events Modul existiert und fügt die benötigten Änderungen in unserem EventModul an.


```typescript
@Module({
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
```

Im ersten Schritt werden wir hier ein statisches Array an Events zurückgeben. Um dies zu erreichen erstellen wir eine `findAll` Funktion in unserem Service. Der Rückgabewert hierbei ist ein einfaches Array mit einem Beispiel-Event.

```typescript
@Injectable()
export class EventsService {

    findAll(): any[] {
        return [
            {
                id: 1,
                name: 'Angular.DE Intensiv Schulung',
            },
        ];
    }
}
```

In unserem Controller können wir dann über den Konstruktor diesen Service bereitstellen und die `findAll` Methode benutzen. Für die Basis-Route `/events/` implementieren wir hier ebenfalls eine `findAll` Methode und rufen dort den Service auf.


```typescript
@Controller('events')
export class EventsController {

    constructor(private eventService: EventsService) {}

    @Get()
    findAll(): any[] {
        return this.eventService.findAll();
    }
}
```

Damit die Änderungen alle erkannt werden, müsst ihr den Prozess unter umständen einmal neustarten. Sind alle Dateien neu kompiliert, können wir über [localhost:3000/events](http://localhost:3000/events) unseren statischen API-Call abfeuern. Das Ergebnis ist ein Array mit unserem Beispiel-Event.

### Auslesen von Parametern

Wir werden nicht alle Operationen statisch einbinden, jedoch möchte ich an dieser Stelle noch kurz zeigen wie wir Parameter aus einer URL auslesen. Indem wir in unserem `@Get` Decorator Parameter durch ein Doppelpunkt einleiten, können wir auf diese mit Hilfe des `@Param` Decorators zugreifen.  Wie ihr seht werden diese mit Hilfe eines String definiert, was uns ermöglicht auch mehrere Parameter zu benutzen. Da wir diese Funktion nur als Demonstration für Parameter benutzen nutzen wir an dieser Stelle eine rudimentär Implementierung.

```typescript
@Get(':id')
findOne(@Param('id') id: string): any {
  return this.eventService.findAll()[0];
}
```

Natürlich gibt es neben `@Get` auch weitere Decorator wie `@Put`, `@Post`, `@Patch` und  `@Delete` um weitere HTTP-Verben abzubilden. Wir werden diese im nächsten Kapitel nutzen wenn wir unsere Datenbank mit echten Daten anbinden.


## Anbinden einer Datenbank
Nachdem wir uns die Grundlegenden Konzepte eines Endpoints mit Nest angesehen haben,
werden wir als nächstes nun eine Datenbank benutzen. In diesem Beispiel habe ich mich dafür entschieden eine Postgres Datenbank zu benutzen. Es gibt aber für alle anderen gängigen Datenbanken ebenfalls Connectoren.

Die Pakete welche wir hierzu benötigen sind `typeorm` und `pg`. Wir können diese mit folgendem Befehl über `npm` installieren.

```cmd
npm install --save @nestjs/typeorm typeorm pg
```

### Initialisieren der Datenbankverbindung

Nach der erfolgreichen Installation der benötigten Pakete können wir grundlegende Konfiguration in unserem Projekt vornehmen. Hierzu müssen wir zuerst das TypeOrm Module in unserer Anwendung einbinden und mit `TypeOrmModule.forRoot()` im App-Module initialisieren.

```typescript
// ...
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
  ],
// ...
})
```

Die Initialisierung erwartet eine Datei mit dem Namen `ormconfig.json` in unserem Root-Ordner, welche die Argumente für unsere Datenbank Verbindung definiert. Der Standard nutzer bei Postgres ist der aktuelle Nutzer, was in meinem Fall  `robinboehm` ist. Des Weiteren habe ich eine Datenbank mit dem Namen `angular-de-nestjs-tutorial` angelegt. Ich nutze hierfür das Tool [PostiCo für Mac](https://eggerapps.at/postico/) in der Trial Version. Der Parameter `entities`  kann erstmal so übernommen werden, wir werden im nächsten Abschnitt lernen was es damit auf sich hat.

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "robinboehm",
  "password": "",
  "database": "angular-de-nestjs-tutorial",
  "entities": ["src/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

Falls es Probleme bei der Verbindung gibt, bekommt ihr direkt eine Fehlermeldung in der Konsole.

```cmd-output
[TypeOrmModule] Unable to connect to the database. Retrying (1)... +35ms
Error: connect ECONNREFUSED 127.0.0.1:5433
```

Diese sind auch meistens sehr aussagekräftig, solltet ihr hierbei auf eine Fehlermeldung stoßen mit der ihr nicht weiter kommt, schreibt diese gerne in die Kommentare oder meldet euch bei mir. Ein Fehler auf den ich bei der ersten Installation gestoßen bin ist die Fehlermeldung `MissingDriverError: Wrong driver: "pg" given.`, da ich in der `ormconfig.json` als type `pg` angegeben habe (so wie das Node-Paket heißt). Richtig ist an dieser stelle aber aber `postgres`.

Wenn alles funktioniert, solltet ihr folgende Zeilen in der Ausgabe eures Servers sehen.

```cmd-output
[InstanceLoader] TypeOrmCoreModule dependencies initialized
[NestApplication] Nest application successfully started
```

### Repository pattern
Nun werden wir als nächstes unsere Event-Ressource mit der Datenbank verbinden. Um dies zu erreichen werden wir als erstes eine sogenannte `Entity` anlegen. Dies ist eine Klasse, welche mit Hilfe bestimmter `typeorm Decorator` definiert welche Tabelle und welche Spalten mit dieser Art Objekten verknüpft sind. Wir benutzen hierfür die Dekoratoren `Entity`, `PrimaryGeneratedColumn` und `Column. Und um es einfach zu halten enthält unsere Event Klasse bisher nur eine ID und ein Namen.


```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```
Der Name dieser Datei ist `event.entity.ts`. Die Erweiterung des Dateinamens `.entity.ts` an dieser Stelle ist wichtig, da das TypeOrm-Modul über die `ormconfig.json` diese Entity automatisch findet.

```json
  "entities": ["src/**/*.entity{.ts,.js}"],
```

Damit unsere Nest-Anwendung ebenfalls von dieser Entity weiß, müssen wir das Event zusätzlich noch in unserem Event-Modul via `TypeOrmModule.forFeature([Event])` anmelden.

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

// ..

@Module({
  imports: [TypeOrmModule.forFeature([Event])]
// ..
})
export class EventsModule {}
```

Sobald wir dies erledigt haben können wir unseren Service mit einem sogenannten  `Repository` verbinden. Ein Repository ist eine generische Abstraktion von TypeOrm und ermöglicht uns den Zugriff auf die Datenbank über ein sehr einfaches Interface. Wir können es via Dependency Injection und dem Decorator  `@InjectRepository(Event)` in unserem Service verfügbar machen.

```typescript
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
      ) {}

    findAll(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    findOne(id: string): Promise<Event> {
        return this.eventRepository.findOne(id);
    }
}
```

Über das `eventRepository` können wir nun unsere Abfragen an die Datenbank stellen. Wir nutzen hierbei die Funktionen `find()` und `findOne()`. Diese Funktionen geben jeweils ein Promise zurück, weswegen wir das Interface unserer eigenen Methode ebenfalls anpassen müssen. Mehr Änderungen müssen wir an dieser Stelle aktuell aber nicht vornehmen. Die letzte Änderung die fehlt, ist die Anpassung der Rückgabewerte in unserem Controller. Nest kann hierbei problemlos mit Promises umgehen, womit wir hier nur die Rückgabe-Typen in unserem Controller anpassen müssen.

```typescript
//  ...
@Controller('events')
export class EventsController {
// ...
    @Get()
    findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
      return this.eventService.findOne(id);
    }
}
```


Nach einem Neustart unseres Servers solltet ihr nun über die URL `http://localhost:3000/events` ein leeres Array von Events bekommen. Ich habe mir an dieser Stelle mit Postico manuell zwei Datensätze in die Tabelle geschrieben, um die Verbindung auch mit Daten zu testen. Ihr könnt dann also auch über z.B. `http://localhost:3000/events/1` auf das Event mit der ID 1 zugreifen.


### Potentielle Fehler
An dieser Stelle bin ich in ein paar Fehler gelaufen, die euch vielleicht auch passiert sind.

#### Tabelle bereits manuell erstellt
Wenn ihr die Tabelle bereits vorher manuell erstellt habt oder eine bestehende Tabelle aus einem anderen Projekt benutzt, bekommt ihr den Fehler:  `QueryFailedError: column "name" contains null values`. Dies passiert weil TypeORM versucht diese Tabelle selber anzulegen bzw zu migrieren. Dieses Verhalten wird über die Konfiguration `"synchronize": true` in euer `ormconfig.json` ausgelöst. Wenn ihr dieses Verhalten nicht wollt, könnt ihr diese Zeile einfach löschen oder auf `false` setzen.

#### Server über start:dev gestartet

```cmd-output
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
SyntaxError: Unexpected token
```

Dies passiert, wenn ihr euren Server über `npm run start:dev` startet. Diese Option startet den Server im Watch-Mode, kompiliert bei jeder Änderung die jeweilige Datei neu und liefert die Anwendung direkt aus dem `dist` Verzeichnis aus. Das hat zur Folge, dass es dort kein `src` Verzeichnis mehr gibt und alle Dateien bereits zu `.js` Dateien transpiliert wurden. Wenn ihr den Server weiter in diesem Modus betreiben wollt, müsst ihr ebenfalls eure `ormconfig.json` anpassen:

```json
  "entities": ["dist/**/*.entity{.ts,.js}"],
```

## Fazit
Zusammenfassend würde ich behaupten: NestJS schließt endlich eine Lücke für Backend-Entwickler:innen die sich mit anderen NodeJS-Frameworks wie Express bisher eher schwer getan haben.
Die Konzepte fügen sich sehr angenehm an bereits bestehende Konzepte aus der Angular oder auch Java Spring Welt. Die Lernkurve ist relativ flach und es werden viele Module mitgeliefert welche die tägliche Arbeit durch eine angenehme Abstraktion sehr erleichern.
Des Weiteren legt das Framework ein starken Fokus auf Test, wodurch es für professionelle Projekte ein oft schmerzhaften Punkt von Beginn an löst.
Die ersten Schritte gehen leicht von der Hand und machen Spaß auf mehr!


## Eure Meinung?
Was haltet ihr von NestJS und diesem Tutorial? Hinterlasst mir gerne einen Kommentar.
Ich werde dieses Tutorial regelmäßig updaten und erweitern.
Weiterhin werde ich die nächsten Wochen auch noch speziellere Themen wie GraphQL mit Nest behandeln!


Danke fürs lesen!

<hr>
<div class="workshop-hint">
  <div class="h3">Bereit mehr NestJS zu lernen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>
        Nicht jeder lernt am besten aus Büchern und Artikeln. Lernen darf interaktiv sein und Spaß machen. Wir bieten euch auch
        <a target="_blank" href="/schulungen/nestjs-enterprise-applications/?utm_source=angular_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-bottom-link">NestJS Schulungen</a> an, falls Ihr tiefer in die Thematik einsteigen wollt.
      </p>
      <p class="">
        <a target="_blank" href="/schulungen/nestjs-enterprise-applications/?utm_source=angular_de&utm_campaign=tutorial&utm_medium=portal&utm_content=text-bottom-button">
          <button class="btn btn-danger">Mehr Informationen zur Schulung</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded lazy"
      data-src="/assets/img/workshops/workshops-attendees-2.jpg"
      data-srcset="/assets/img/workshops/workshops-attendees-2.jpg"
       src="/shared/assets/img/placeholder-image.svg" alt="Teilnehmer:innen in unser Intensiv Schulung">
    </div>
  </div>
</div>
<hr>
