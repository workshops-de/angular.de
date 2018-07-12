---
title: "Einführung in Angular-CLI"
description: "Angular-CLI ist ein Werkzeug zum Generieren von Angular Projekten. Es hilft euch dabei Komponenten, Direktiven, Services und noch mehr zu generieren."
author: "David Müllerchen"
published_at: 2016-09-27 00:00:00.000000Z
categories: "angular angular2 angular4 cli"
---

Seit Brad Green auf der ng-conf verkündet hat, Angular2 sei kein Framework mehr, sondern eine Plattform, stellt sich die Frage, was die anderen Teile neben dem Framework Angular2 sind.
Der interesanteste Teil (für mich jedenfalls) ist die Cli (command line interface) `angular-cli`.

## Was ist angular-cli?

Zu allererst ist die cli ein Tool, um Angular2-Apps aufzusetzten.
Dabei wird das komplette Projekt generiert, mit der Entwicklungsumgebung und dem eigentlichen Projekt - dem, was man als Code versteht.

Die Entwicklungsumgebung umfasst:

1. Einen Server mit Autoreload, wenn der Code verändert wurde
2. Einem Modulhandler (webpack), mit dem alle gängigen Modularten geladen werden können
3. Webpack übernimt auch das Bündeln der Sourcen
4. Testumgebungen für Unit-Test und e2e-Test
5. Code-Generatoren für alle angular2-Elemente (Component, directive, pipe, service..)
6. Dependency Managment für die generierten Elemente
7. Build System, um den Auslieferungscode zu generieren
8. Alle diese Funktionen werden von der cli entgegengenommen und an die eigentliche Logik weitergereicht (Blackboxed), was den Umgang mit der cli recht komfortabel macht

## Warum sollte man es verwenden?

Der Styleguide wird befolgt, wodurch man einen sehr aufgeräumten Code bekommt. Im Idealfall findet sich so jeder recht schnell in dem Projekt zurecht.
Im Urlaub fand ich ein perfektes Beispiel anhand zweier Grundstücke, die nebeneinenader liegen. Man erkennt schnell, welches von beiden den Styleguide ignoriert:

## Wie verwendet man die angular-cli?
### Installation
Zuerst muss die cli installiert werden. Dafür benötigen wir wie so oft nodejs, da die cli per npm installiert wird.

`npm install -g @angular/cli`

Das Angular-cli-Team kam dem Wunsch der Comunity nach und wechselte von broccoli/SytemJS als Modulbundler zu Webpack.
Das war meiner Meinung nach eine sehr gute Entscheidung, denn dadurch wurde die Nutzung sehr einfach.

### Aufruf
Wenn ihr die cli installiert habt könnt ihr die cli in der CMD über `ng` erreichen.
Es gibt für einige Befehle eine Kurz- und eine Langschreibweise.

```shell
ng v == ng version
ng g == ng generate
ng s == ng serve
ng t == ng test
ng b == ng build
```

 Ich verwende oft die Kurzschreibweise.

### Unser erstes Projekt
Somit sind wir bereit ein Projekt aufzusetzten. Dabei können diverse optionale Parameter mitgegeben werden. Ein Wichtiger ist das Setzen des CSS-Reprocessors, hier können wir zur Zeit unter den vier populärsten wählen:

`--style=scss`
`--style=sass`
`--style=less`
`--style=styl`

Dann werden die Styles bei jeder Änderung kompiliert.


Um ein Projekt zu starten nutzen wir den `ng new` Befehl. Je nach Netzwerkverbindung und Geschwindigkeit des Rechners kann dies auchmal etwas länger dauern ... aber zur Not einfach mal einen Kaffee holen.

```shell
ng new [projektname] [options]
```

Wir starten in unserem workspace `cd workspace` hier rufen wir `ng new hello-cli --style=scss` auf.


#### Die Ordnerstrucktur
Im Ordner hello-cli wurden nun dieverse Ordner und Dateien erstellt.
Unter anderem sind das:


__public__: Hier werden eigene Libs oder 3rd Party libs abgelegt die dann von cli mit kopiert werden und global verfügbar sind.

__src__: Das ist unser entwicklungs Ordner. Hier spielt die Musik.

__e2e__: Dieser Ordner wird für die end-to-end Tests genutzt.

__config__: Hier liegen u.a. die Konfigurationsdateien für die Tests.


### Starten der App

Um nun unsere App im Browser anzuzeigen, müssen wir in der CMD `ng s` ausführen. Anschließend können wir im Browser unter `http://localhost:4200/` die App sehen.
Die default Einstellungen sind hier der host mit localhost und der Port mit 4200. Aber diese kann man natürlich über parameter einstellen. Bei mir wäre zur Zeit `ng s -H=192.168.56.1 -p=3333` möglich.

Danach könnt ihr die Url aufrufen und seht:

```html
<h1>app works!</h1>
```

Wenn ihr nun in einer Datei im Ordner `src` Änderungen vornehmt, führt der Browser einen Reload durch.

### Code generieren
Wir wollen mal eine eigene Komponente generieren. Eine Navigation bietet sich immer an. Den Code-Generator werfen wir über `ng g [type] [name]` an. Wenn wir also eine Komponente Navbar anlegen wollen, führen wir `ng g component navbar` in der CMD aus. Die Ausgabe sieht dann so aus:

```shell
installing component
  create src\app\navbar\navbar.component.scss
  create src\app\navbar\navbar.component.html
  create src\app\navbar\navbar.component.spec.ts
  create src\app\navbar\navbar.component.ts
```

Die Komponente wird nicht nur angelegt, sie wird auch in der app.module.ts importiert und registriert.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component'; //<= hier der Import

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent //<= hier die Registrierung
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Wenn wir diese Komponnete in der app.component.html verwenden,

```html
<app-navbar></app-navbar>
<h1>
  {{title}}
</h1>
```


lädt der Browser neu und wir sehen die Ausgabe der Komponente.

---

```html
<p>
  navbar works!
</p>
<h1>app works!</h1>
```

---

### Was können wir noch generieren?
Es gibt zur Zeit Generatoren für
- component
- directive
- pipe
- service

Wobei `ng g component [comp-name]` der einzige Generator ist, der einen eigenen Ordner erstellt.
Der Name des generierten Elements kann auch einen existierenden Pfad enthalten z.B.: `ng g service exampleModule/my-service`. Das generiert dann:

```shell
create src\app\exampleModule\my-service.service.spec.ts
create src\app\exampleModule\my-service.service.ts
```


Geben wir dem Service eine Methode getTitle

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class MyServiceService {

  public getTitle() {
    return 'Hi from my-service.service.ts'
  }
  constructor() { }
}
```

So können wir den Service in der app.component.ts importieren und verwenden.

```typescript
import { Component } from '@angular/core';
import { MyServiceService } from './exampleModule/my-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [MyServiceService]
})
export class AppComponent {
  title = this._serv.getTitle();

  constructor(private _serv: MyServiceService) {}
}
```


Die Ausgabe sollte dann so aussehen:

---

```html
<p>
  navbar works!
</p>
<h1>Hi from my-service.service.ts</h1>
```

---


### Einbinden globaler Sourcen über den Public-Ordner
Wir gehen mal davon aus, das wir vom Projektdesigner eine CSS-Datei bekommen haben. Diese soll ja für alle Elemente der App erreichbar sein, global eben. Die Datei (gobal.css) sieht so aus:

```css
h1 {
  color: deeppink;
}
```

Diese Datei legt ihr im Ordner public ab. _Der Ordner wird nicht überwacht von der Changedetection, ein Reload wird nur aus dem src-Ordner initiiert_.

In der index.html muss diese Datei noch eingebunden werden:

```html
<link rel="stylesheet" href="global.css">
```


Wenn ihr jetzt speichert, wird die App neu geladen, dabei werden auch die Dateien welche sich in _public_ befinden (bei uns ist es nur die global.css) von webpack copiert und alle h1-Tags sind in deeppink.

---

```html
<p>
  navbar works!
</p>
<h1 style="color: deeppink;">Hi from my-service.service.ts</h1>
```

---

## Test
Wie ihr gesehen habt, wird bei jedem Element eine `*.spec.ts` mit generiert. Das ist, wie viele wissen, der Unittest.
Dieser wird mit `ng t` ausgeführt und verwendent Karma und Jasmine.
Wenn wir jetzt den Test ausführen, schlägt er fehl, da wir in der app.componnet.ts den Titel geändert haben.
Wir müssen unseren Test in der app.component.spec.ts noch fixen:

```typescript
/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MyServiceService } from './exampleModule/my-service';

describe('App: HelloCli', () => {
  beforeEach(() => {
    addProviders([AppComponent, MyServiceService]);
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should have as title \'Hi from my-service.service.ts\'',
    inject([AppComponent], (app: AppComponent) => {
      expect(app.title).toEqual('Hi from my-service.service.ts');
    }));
});

```

Jetzt sollte der Test *grün* sein.

```shell
14 09 2016 10:03:49.554:WARN [karma]: No captured browser, open http://localhost:9876/
14 09 2016 10:03:49.554:INFO [karma]: Karma v0.13.22 server started at http://localhost:9876/
14 09 2016 10:03:49.554:INFO [launcher]: Starting browser Chrome
14 09 2016 10:03:52.569:INFO [Chrome 52.0.2743 (Windows 10 0.0.0)]: Connected on socket /#dIywK93UHrJ80SHqAAAA with id 23333867
Chrome 52.0.2743 (Windows 10 0.0.0): Executed 6 of 6 SUCCESS (0.192 secs / 0.143 secs)
```

Für den e2e Test (die Specs findet ihr im Ordner e2e) müsst ihr eine zweite CMD aufmachen.
In der ersten muss `ng s` ausgeführt werden, im zweiten führt ihr `ng e2e` aus, dabei werden die Test mit Protractor ausgeführt.
Hier gilt das selbe wie beim Unittest, er schlägt noch fehl, da wir den Titel in app.component.ts geändert haben.

Auch das beheben wir schnell und fixen auch die e2e/app.e2e-spec.ts:

```typescript
import { HelloCliPage } from './app.po';

describe('hello-cli App', function() {
  let page: HelloCliPage;

  beforeEach(() => {
    page = new HelloCliPage();
  });

  it('should display message saying Hi from my-service.service.ts', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hi from my-service.service.ts');
  });
});
```

Danach sollt auch der e2e Test *grün* sein.

```shell
Spec started

  hello-cli App
    √ should display message saying Hi from my-service.service.ts

Executed 1 of 1 spec SUCCESS in 1 sec.
[10:20:17] I/launcher - 0 instance(s) of WebDriver still running
[10:20:17] I/launcher - chrome #01 passed

All end-to-end tests pass.
```

## Build
Am Ende des Tages soll die App zum Kunden oder auf euren Server deployed werden, dafür müssen wir den Build-Schritt ausführen.
Während der Testphase macht es Sinn, die Sourcen leserlich zu haben - dafür gibt es `ng b` , wenn ihr dann produktiv deployen wollt, ist `ng b --prod` euer Freund. Damit werden die Sourcen minifiziert und mit einem hash versehen.
Das ergebnis findet ihr dann im Ordner _dist_.

## Gibt es eine Doku?
Ihr könnt euch mit `ng h` die buildin Doku ansehen und unter cli.angular.io findet ihr ebenfalls eine Doku sowie den Link zum github repo.

## Ist das Alles?

Ihr könnt kinderleicht 3rd-Party-Libs über npm installieren, hierzu genügt ein `npm i --save [libname]` und die cli kümmert sich um den Rest. Auch der Import von Styles und Scripts über die `.angular-cli.json` funktioniert problemlos. Externe Styles einfach über die `global.scss` im src-Ordner importieren oder in der `.angular-cli.json` registrieren, sie wird dann von webpack mit eingebunden. Dasselbe gilt für js-Dateien.

```json
// ...
"apps": [
  {
    "main": "src/main.ts",
    "tsconfig": "src/tsconfig.json",
    "mobile": false,
    "styles":["global.scss"],
    "scripts": ["global.js"]
  }
],
//...
```


## Kann man das so schon einsetzen?
Ja, auch wenn es noch im Betastadium ist, habe ich schon Projekte damit umgesetzt.
Für mich bekommt das Tool das Prädikat: **besonders wertvoll**
