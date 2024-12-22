---
title: "Angular 8 - Neue Features und Anleitung zum Update"
description: "Mit Angular 8 kommen neue Features wie Ivy, Differential Loading, Lazy Loading und ein kleiner Breaking Change bei der ViewChild Direktive."
author: "Robin Böhm"
published_at: 2018-06-21 10:15:01.000000Z
header_source: https://unsplash.com/photos/1eKHJw3P5M8
categories: "angular release update"
---

In diesem Artikel wollen wir uns der neuen Angular Version widmen und wie ihr euer Projekt mit Hilfe der CLI auf die Version 8 anheben könnt. Es gibt sehr viele Neuigkeiten welche großen Einfluss auf unsere Angular-Projekte haben. Die gute Nachricht ist: Diese kommen mit keinen bzw. minimalen Breaking-Changes und automatischer Migration dank Schematics.

## Neue Features in Angular 8

Jedoch zuerst einmal eine Übersicht was euch unter anderen alles in der neuen Angular v8 erwartet:

### Angular Ivy Support
Lange haben wir darauf warten müssen, doch jetzt ist es soweit. Die neue Render Engine Ivy ist endlich released, allerdings müsst ihr diese aktivieren da sie in Version 8 noch als optionales Feature mitgeliefert wird.

Ihr habt verschiedene Möglichkeiten Ivy zu aktivieren.

Via Flag beim erstellen eines neuen Projektes:

```cmd
ng new awesome-app --enable-ivy
```

Oder in eurer `tsconfig.app.json` in euern bereits existierenden Projekt.

```json
{
  "compilerOptions": { ... },
  "angularCompilerOptions": {
    "enableIvy": true
  }
}
```

Da sich aus Sicht von uns Framework-Usern hierbei kaum etwas ändert, werde ich in diesem Artikel nicht weiter auf Ivy eingehen. Jedoch habe ich ein Meetup Talk welchen ihr euch dazu gerne ansehen könnt der die Interna von Ivy erklärt.

[Robin Böhm, Angular Ruhr Ivy](https://www.youtube.com/watch?v=aRZaE0b2HFk){:target="_blank"}


### Differential loading
Dieses Feature ermöglicht euch je nach Browser nur die Bundles auszuliefern, welche auch benötigt werden. Nutzt ihr also ein sogenannten legacy Browser der zwingend ES5 benötigt bekommt dieser ein anderes Bundle als ein neuerer evergreen Browser wie z.B. die aktuellen Versionen von Firefox, Edge oder Chrome. Diese sind oftmals wesentlich kleiner und effizienter als der “alte ES5 Code”. Als Beispiel nutzt das Angular Team ihre eigene Webseite und zeigt hierbei Optimierungen bis 20%.

<img src="/shared/assets/img/placeholder-image.svg" alt="Angular.IO saves up to 20% with Ivy" class="lazy" data-src="differential-loading-savings.png" data-srcset="differential-loading-savings.png"
 />
Bildquelle: https://blog.angularindepth.com/embrace-yourself-angular-8-is-coming-1bf187c8f0bf

Um dieses Feature zu nutzen könnt ihr eins euer Projekt mit einer sogenannten [Browserlist Konfiguration](https://github.com/browserslist/browserslist) erweitern. Explizit heißt das, dass ihr in eure `package.json` den entsprechenden Eintrag angefügt oder eine neue Datei mit dem Namen `browserlist` anlegt (präferiert, da diese Datei auch vom SEO crawler gelesen wird). Eine Beispielkonfiguration könnte z.B. so aussehen:

```json
"browserslist": [
  "last 1 version",
  "> 1%",
  "maintained node versions",
  "not dead"
]
```

Mit der neuen Version der CLI werden im Build-Prozess nun verschiedene Versionen für die verschiedenen Browser erstellt, je nachdem was ihr als “modern” und “legacy” Browser definiert habt. Die Browserlist ist hierbei die “modern” Version und das in der `tsconfig.json` eingetragene target ist die älteste legacy Version die unterstützt werden soll.

```json
"target": "es2015"
```

Die Einbindung in euerm Projekt erfolgt dann über die [nomodule Syntax](https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility) im Browser. Dies wird aber automatisch über den Build-Prozess für euch erledigt.

<img src="/shared/assets/img/placeholder-image.svg" alt="Example Network Requests for Differential Loading" class="lazy" data-src="differential-loading-network.png" data-srcset="differential-loading-network.png"
 />
Bildquelle: https://dev.to/lacolaco/differential-loading-a-new-feature-of-angular-cli-v8-4jl

Wenn ihr wissen wollt welche Browser von euer Regel inkludiert und welche exkludiert sind bietet das Projekt dieses [Browserlist Online Tool](https://browsersl.ist/#q=%3E+1%25%2C+last+2+Chrome+versions%2C+IE+11%2C+Firefox+ESR%2C+not+dead%2C+not+IE+9-11).

<img src="/shared/assets/img/placeholder-image.svg" alt="BrowserList Example output of supported modern browsers" class="lazy" data-src="browserlist-web.png" data-srcset="browserlist-web.png"
 />


### Web Worker Unterstützung
Ihr habt bestimmt schon einiges von Web-Workern gehört. Hinter diesem Begriff verbringt sich ein Browser Feature welches uns in der Single-threaded Sprache JavaScript ermöglicht doch eine Art von Multi Threading zu nutzen. Wir können dabei neue Threads, sogenannte Web-Worker, erstellen und hierbei über die Message-Queues der jeweiligen Prozesse miteinander Kommunizieren und so Arbeit vom Main-Thread auslagern. Dies ist sinnvoll für lange Berechnungen, da diese sonst ebenfalls z.B. den Render-Zyklus euer Anwendung blocken. Durch die Unterstützung von Web-Workern in Angular Version 8 könnt ihr nun bequem davon profitieren und intensive Berechnungen auslagern und auch parallel ausführen lassen. Wobei Angular hierbei lediglich die Benutzung von WebWorkern erkennt und diese ein separate bundles ausgelagert, welche nur nachgeladen werden wenn diese auch benutzt werden. Der Worker selbst läuft jedoch nicht im Angular Context.

Um ein Worker zu erstellen könnt ihr wie bei allen anderen Features die CLI benutzen um euch die entsprechenden Dateien und Erweiterungen generieren zu lassen.

```cmd
ng generate worker calculate-pi
```

Die Implementierung des Workers ist dann relativ einfach. Ihr registriert ein EventListener welcher auf das Event `message` hört. Dieses nimmt den Payload des Events und nutz diesen als Argumente für die Ausführung der langlebigen Funktion `calculatePi`. Der Rückgabewert dieser Funltion wird über die Funktion `postMessage` weitergegeben.

```typescript
import calculatePi from './calculate-pi';

addEventListener('message', ({ args }) => {
  const result = calculatePi(args.digits);
  postMessage(result, undefined);
});
```

In z.B. euerm Service könnt ihr nun ein Worker registrieren. Es werden hierbei verschiedene Modulsysteme unterstützt, für unseren Fall verwenden wir die Konfiguration `module` für ein ECMAScript Module. Das Ergebnis des Workers können wir über ein EventListener auf den EventTyp `message` erhalten. Um den Worker zu starten arbeiten wir auch hier einfach mit `postMessage` was unsere eben definierte Datei anstößt und uns die Nachkommastellen von PI berechnet.

```typescript
const worker = new Worker('./calculate-pi.worker', {type: 'module'});
worker.addEventListener('message', (event) => {
  console.debug('worker result', event.data);
});
worker.postMessage({digits: 5});
```

Die Angular-CLI sorgt dafür das die jeweiligen Worker in eigene Bundles ausgelagert werden und nur nachgeladen werden wenn sie auch benutzt werden. Das spart wieder ein wenig Ladezeit und beschleunigt eurer initiale Ladezeit euer Anwendung.

### Neue Lazy-Loading / Code-Spitting Syntax
Endlich wird der kryptische String abgelöst mit welchem wir bisher in unser Routing-Konfiguration Module definiert haben welche wir dynamisch Nachladen und somit als extra Bundle gebaut haben möchten. Dies klappt nun endlich über die native Browserfunktion `import()` was es sowohl webpack, den Browsern als auch unseren IDEs einfacher macht damit umzugehen.

<img src="/shared/assets/img/placeholder-image.svg" alt="Git Diff about router updates" class="lazy" data-src="git-diff-routerupdate-v8.png" data-srcset="git-diff-routerupdate-v8.png"
 />

Durch die neue Syntax kann nun auch unsere IDE eine korrekte statische Analyse durchführen und beliebte “typos” an dieser Stelle direkt aufdecken und uns viel Zeit sparen! Ein Weiterer Vorteil ist, dass nun auch Code-Bundling und Optimierung mit den Standard-Webpack-Modulen durchgeführt werden können und kein zusätzlicher Buildprozess dafür speziell für Angular genutzt werden muss.

### Bazel
Eine weitere Neuheit ist das Werkzeug Bazel, das Build System was Google intern benutzt und nun als open-source auch der Angular Community bereit stellt. Ein großer Vorteil hierbei ist die Unterstützung von inkrementellen Builds. Dies beschleunigt die Kompilierung eures Projektes massiv, da nur Dateien neu gebaut welche sich auch geändert haben.

Ein weiteres Feature welches für große Projekte und Enterpise-Teams sehr interessant ist, ist die Möglichkeit den Build in der Cloud auszuführen und innerhalb eines Teams einen gemeinsamen Cache zu benutzen. Wenn also einer eurer Teamkollegen/innen bereits das Paket bzw den Sourcecode gebaut habt, greift ihr einfach auf die bereits gecachte Version zurück und spart euch Zeit und Rechenpower.

Testen könnt ihr das experimentelle Build System indem ihr bazel installiert und ein neues Projekt damit generiert.

```cmd
npm i -g @angular/bazel
ng new awesome-app --collection=@angular/bazel
```

### Breaking Changes bei ViewChild und ContentChild

Ein kleinen Breaking Change bringt diese Version doch mit sich und zwar in den Direktiven `ViewChild` und `ContentChild`. Hierbei handelt es sich um eine Korrektur des inkonsistenten Verhaltens in Verbindung mit Strukturellen Direktiven wie `ngIf` oder `ngFor`. Wurden diese benutzt, war die Referenz erst im LifeCycle ngAfterViewInit/ngAfterContentInit zur Verfügung. Wurden Sie nicht benutzt bereits in ngOnInit. Dies hat an vielen Stellen zur Verwirrung geführt. Wenn ihr weitere Details wollt könnt ihr diese am besten im [PullRequest](https://github.com/angular/angular/pull/28810) nachlesen.

Ab Version 8 könnt ihr nun explizit angeben wann diese Auflösung erfolgen soll. Der Defaultwert ist `static: true`, was bedeutet ihr habt das ElementRef bereits zum LifeCyce `ngOnInit` zur Verfügung. Mit `static: false` setzt ihr das alte Verhalten bzw. nutzt es wenn ihr strukturelle Direktiven nutzt.

```typescript
@ViewChild('tooltip', { static: false })
paragraph: ElementRef;
```

Wenn ihr euer Projekt mit `ng update` auf die neueste Version anhebt, versucht die Migration den richtigen Wert automatisch zu wählen (Das ist übrigens der gleiche Algorithmus der die Zuweisung bisher zur Laufzeit versucht). Falls dies nicht Möglich oder unklar ist, wird ein `TODO` Kommentar an dieser Stelle eingefügt.

## Updateanleitung
### Welche Schritte muss ich durchführen um mein Projekt auf die neueste Version upzudaten?

Der einfachste Weg ist wie immer über `update.angular.io` wo ihr eine Schritt für Schritt Anleitung bekommt egal von welcher Version ihr zu v8 updatet. Ich gehe hier nur auf das Update von v7 auf v8 ein.

Die meisten Schritte werden durch `ng update` für euch automatisch gemacht. Allerdings könnte es einige kleinere Migrationen nach sich ziehen da wir ebenfalls auf TypeScript Version 3.4 und Node auf Version 12+ updaten müssen.  An eurem Angular Code selber sind die Änderungen sehr gering, daher lasst uns doch einmal anschauen was passiert wenn wir `ng upgrade` ausführen.

```cmd
ng update @angular/cli @angular/core
```

Nachdem wir diesen Befehl ausgeführt haben werden automatisch unsere Pakete auf die neueste Version aktualisiert und notwendige Änderungen an eurem Code vorgenommen.

<img src="/shared/assets/img/placeholder-image.svg" alt="ng update example run on an angular v7 project" class="lazy" data-src="ng-update.gif" data-srcset="ng-update.gif"
 />

Nach der Migration nutzt ihr die neue Angular Version und eure potentiellen Breaking Changes wurden erwartungsgemäß automatisch migriert bzw. mit einem ToDo versehen.

<img src="/shared/assets/img/placeholder-image.svg" alt="Git Diff for the updated package.json to angular v8" class="lazy" data-src="git-diff-package-json.png" data-srcset="git-diff-package-json.png"
 />

## Fazit
Bei dieser Version hat das Angular Team ganze Arbeit geleistet. Durch die neue Engine Ivy wird das Framework um einiges schneller - und das an vielen Stellen. Sowohl der Build als auch die Ladezeiten für den Endnutzer sind deutlich beschleunigt. Das alles kommt mit absolut kleinem Breaking-Change für uns Entwickler, was eine wahnsinnige Leistung ist. Ivy wird auch noch zu Angular v9 weiterentwickelt und ist auf unser Feedback aus der “echten Welt” angewiesen. Darum empfehle ich Ivy gerne einmal eine Chance zu geben und früh das Feedback via GitHub zurückfließen zu lassen, damit wir gemeinsam das Framework weiter für neue Herausforderungen stärken können.

Beim Update-Prozess merkt man nun ganz stark die Stärken von Schematics und die Auswirkungen auf große (Enterprise-)Projekte. Die gesparte Arbeitszeit und vermeidung potentieller Fehler durch eine automatische Migration macht das Update zu einem absoluten “nobrainer” und sollte für fast jeden Projekt problemlos durchzuführen sein. Angular v8 ist ein sehr gelungenes Release des Angular Teams! Vielen Dank dafür!

Wenn ihr mehr über Angular lernen wollt, schaut euch gerne unsere [Angular Schulungen für Einsteiger](/schulungen/angular-intensiv/) und für [Fortgeschrittene Angular Entwickler](/schulungen/angular-enterprise-applications/) an. Es gibt sowohl öffentliche Termine in Berlin, Essen, München, Stuttgart und Hamburg als auch In-House Schulungen wo wir direkt zu euch kommen.
