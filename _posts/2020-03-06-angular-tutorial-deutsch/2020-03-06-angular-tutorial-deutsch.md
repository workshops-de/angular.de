# Angular Tutorial

## intro

Dieses Tutorial erklärt euch die Grundlagen des Frameworks Angular.
Wir behandeln hierbei Angular in der Version 9 und höher.
Bewusst wird hierbei aber die Versionsnummer weggelassen, da das Framework nun semantische Versionierung benutzt.
Kurz gesagt: Es ist einfach Angular.

Weiterhin baut dieses Tutorial auf dem selben Code-Beispiel wie unser AngularJS 1 Tutorial auf - so können die Implementierungen leicht verglichen werden.
Es ist aber nicht erforderlich das Angular 1 Tutorial vorher durchzuarbeiten.
Diese Einführung ist für Anfänger gedacht, die gerade mit Angular beginnen.
Als Beispiel werden wir wieder eine Seite mit Warenkorb für eine Pizzeria bauen und auf dem Weg die Kernelemente von Angular kennenlernen.
Da wir das selbe Szenario benutzen, könnt Ihr die Lösungen in AngularJS 1 und Angular direkt miteinander vergleichen.

## Angular

### Typescript

Angular ist in Typescript geschrieben. Typescript ist ein Superset für JavaScript. Das bedeutet, es ist keine Neu programiersprache, sonder 'nur' tooling, welches dir zur Entwickliungszeit zur verfügung steht.

### CLI

Mit der neuen Version, wurde und Entwicklern ein neues großartiges Tool an die Hand gegeben, welches uns hilft Angular Anwendunge zu Starten.
Die rede ist von der CLI.
Mit der CLI können wir neue Projekte starten und 'Angular-kram' generieren.
Die CLI ist essentiell für die Entwicklung von Angular Anwendungen, da sie Wichtige Schritte, wie Bauen, Entwicklungsumgebung starten und vieles mehr übernimmt.

#### node

wir müssen also zu allererst die CLI installieren.
in der Webentwicklung ist es mittlerweile üblich, das man diese auf einer platform entwickelt die OS unabhängug ist. Dadurch können beliebig viele Entwickler mit beliebigen Betriebsystemen daran mitarbeiten.
Die Platform die wir nutzen ist node.js (Für die CLI benötigen wir die aktuelle LTS Version).
Wie ihr diese Platform installiert erfahrt ihr [Hier](https://nodejs.org/en/)

Node bringt einen Package Manager mit (npm = Node Package Manager). dieser ist ähnlich wie Ant, Maven oder andere Dependency manager die ihr evtl aus eurer Programierwelt kennt.

#### installation

die CLI wird also mittels npm intalliert.

dazu geht ihr in eure Console (bash oder CMD oder...) und gebt folgenden Befehl ein:

```bash
npm i @angular/cli -g
```

nach der Instalation ist die CLI in eurer Console global als `ng` verfügbar.
Ihr könnt euch die Aktuelle Version ausgeben lassen:

```bash
ng v
```

Das gibt uns die folgende Ausgabe zurück. Die Versionenn könnne naturlich abweichen je nach dem wann Ihr dieses Turorial durcharbeitet.

```bash
Angular CLI: 9.0.3
Node: 10.15.3
OS: win32 x64

Angular:
...
Ivy Workspace:

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.900.3
@angular-devkit/core         9.0.3
@angular-devkit/schematics   9.0.3
@schematics/angular          9.0.3
@schematics/update           0.900.3
rxjs                         6.5.3
```

Die CLI kann uns in vileer hinsicht interstützen. Vorrausgesetzt wir kennen den Richtigen Befehl, sollten wir mal nicht weiterwissen, können wir für jeden Befehl mit `--help` Hilfe anfordern.

hier mal die Befehle, welche für dieses Tutorial interessant sind Befehlen:
(Alle Befehle werden mit ng aufgerufen und viele akzepziren zusatzliche Parameter)

| Befehl   | Beschreibung                                                   |
| -------- | -------------------------------------------------------------- |
| new      | Erstellt einen neuen Arbeitsbereich und eine erste Angular-App |
| generate | Generiert Angular Elemente                                     |
| build    | Bauen der Anwendung um sie anschliessend zu deployen           |

Es gibt noch viel mehr Befehle, um z.B. Test oder Code checks auszuführen.

### Unser erstes Projekt generieren

Wir wollen also unsere erste Anwendung generieren.
Das machen wir wie in der Tabelle beschrieben, über den `new` befehl.
Alles was wir noch brauchen ist ein Name für unser Projekt. Hier ist eure kreativität gefragt.
der Aufruf:

```bash
ng new angular-de-tutorial
```

Die CLI fragt uns dann ob wir Routing nutzen möchtenwas wir mit nein (N) beantworten und welches CSS format wir schreiben wollen, hier bleiben wir der einfachhalber bei Standard CSS

Danach generiert die CLI das Projekt und installiert alle Abhängihgkeiten.

```bash
CREATE angular-de-tutorial/angular.json (3671 bytes)
CREATE angular-de-tutorial/package.json (1296 bytes)
CREATE angular-de-tutorial/README.md (1034 bytes)
CREATE angular-de-tutorial/tsconfig.json (543 bytes)
CREATE angular-de-tutorial/tslint.json (1953 bytes)
CREATE angular-de-tutorial/.editorconfig (246 bytes)
CREATE angular-de-tutorial/.gitignore (631 bytes)
CREATE angular-de-tutorial/browserslist (429 bytes)
CREATE angular-de-tutorial/karma.conf.js (1031 bytes)
CREATE angular-de-tutorial/tsconfig.app.json (210 bytes)
CREATE angular-de-tutorial/tsconfig.spec.json (270 bytes)
CREATE angular-de-tutorial/src/favicon.ico (948 bytes)
CREATE angular-de-tutorial/src/index.html (303 bytes)
CREATE angular-de-tutorial/src/main.ts (372 bytes)
CREATE angular-de-tutorial/src/polyfills.ts (2835 bytes)
CREATE angular-de-tutorial/src/styles.css (80 bytes)
CREATE angular-de-tutorial/src/test.ts (753 bytes)
CREATE angular-de-tutorial/src/assets/.gitkeep (0 bytes)
CREATE angular-de-tutorial/src/environments/environment.prod.ts (51 bytes)
CREATE angular-de-tutorial/src/environments/environment.ts (662 bytes)
CREATE angular-de-tutorial/src/app/app.module.ts (314 bytes)
CREATE angular-de-tutorial/src/app/app.component.html (25723 bytes)
CREATE angular-de-tutorial/src/app/app.component.spec.ts (981 bytes)
CREATE angular-de-tutorial/src/app/app.component.ts (223 bytes)
CREATE angular-de-tutorial/src/app/app.component.css (0 bytes)
CREATE angular-de-tutorial/e2e/protractor.conf.js (808 bytes)
CREATE angular-de-tutorial/e2e/tsconfig.json (214 bytes)
CREATE angular-de-tutorial/e2e/src/app.e2e-spec.ts (652 bytes)
CREATE angular-de-tutorial/e2e/src/app.po.ts (301 bytes)
```

Wiw lange dieser Vorgang dauert, hängt von der Rechenleistung eures Rechners und der Netzwerkgeschwindigkeit ab.
Bei mir zuhause dauert das ca 40s, im ICE kann es auch mal 5m dauern, wobei m für minuten steht :).

### Bootstrapping

### NgModule

### Component

### routing

#### regular

#### lazy

### Service

#### HTTPClient

### NgFor NgIf

#### Input

#### Output

### pipe
