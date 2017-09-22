---
title: "Angular - Der Component Lifecycle"
description: "Angular-Anwendungen bestehen aus Components. Diese durchleben verschiedene Stadien, auf die ihr zugreifen könnt. Warum und wie das geht, erfahrt ihr hier."
author: "Bengt Weiße"
slug: "angular-2-component-lifecycle"
published_at: 2016-04-25 12:12:12.000000Z
categories: "angular angular2 angular4"
header_image: "/artikel/header_images/angular-2-component-lifecycle.jpg"
---

Am Ende unseres [Angular Einsteigertutorials](/artikel/angular-tutorial-deutsch/) haben wir euch das Thema Component Lifecycle nur kurz vorgestellt, damit ihr zumindest mit dem Begriff etwas anfangen könnt bzw. schon mal etwas davon gehört habt. In diesem Artikel wollen wir uns den Lebenszyklus und die damit verbundenen Hook-Funktionen nun mal etwas genauer anschauen.

## Der Lebenszyklus einer Komponente

Beim Ausführen einer Angular Anwendung durchläuft jede Komponente verschiedene Stadien.
Als erstes erzeugt Angular die Komponente. Dann muss das dazugehörige Template natürlich auch gerendert werden, damit der Benutzer dieses auch sieht. Dabei werden die Data-Bindings aufgebaut, wodurch ihr auf Interaktionen des Nutzers mit eurer App reagieren könnt und programmatische Änderungen dem Nutzer automatisch sichtbar werden.

Zu guter letzt kann es natürlich auch vorkommen, dass eine Komponente wieder entfernt wird. Dies kann beispielsweise durch die Nutzung struktureller Direktiven, wie `ngIf` oder `ngFor`, passieren oder durch den Austausch des Inhalts beim Wechseln der Route.

In Angular kann eine Komponente wieder andere Komponenten nutzen, wodurch eine Abhängigkeit zwischen diesen entsteht. Aus diesem Grund kümmert sich Angular auch um diese. Der oben beschriebene Ablauf gilt natürlich dann auch für alle Kind-Komponenten. Hier können wieder verschiedene Zustände eintreten. Eine Kind-Komponente könnte entfernt oder eingefügt werden.

Der passende Name sagt im Grunde schon alles über die Funktion aus: Der Component Lifecycle bildet das ganze Leben einer Komponente ab und gibt uns Zugriff auf ihre wichtigsten Zustände.

 ![Lifecycle Hooks Angular from init to destroy](medium_Copy-of-lifecycle-hooks-init.png?v=63628809011)

## Zugriff auf den Life cycle

Wie wir im Laufe des Artikels sehen werden, ist es oft nötig auf bestimmte Ereignisse im Lebenszyklus einer Komponente zu reagieren. Zu diesem Zweck bietet uns Angular verschiedene Interfaces an, die wir implementieren können. Jedes Interface erwartet dabei die Implementierung einer gleichnamigen Funktion mit dem Prefix `ng`, welche beim Eintreten des entsprechenden Ereignisses ausgeführt wird. Sie werden auch Hooks genannt.

Standardmäßig gibt es folgende Hooks, die bei ihrer Nutzung auch beim ersten Mal in der folgenden Reihenfolge ausgeführt werden.

1. **ngOnChanges** - Änderungen von Eingabewerten (`@Input()`) (vor ngOnOnit)
2. **ngOnInit** - nach dem Aufbau der Data-Bindings
3. **ngDoCheck** - eigene Change Detection
4. **ngAfterContentInit** - nach dem Projizieren des Contents
5. **ngAfterContentChecked** - Kontrolle auf Änderungen des Contents
6. **ngAfterViewInit** - nach dem Initialisieren der Views
7. **ngAfterViewChecked** - Kontrolle auf Änderungen in den Views
8. **ngOnDestroy** - vor dem Entfernen der Komponente

Anwendung finden eure Hook-Funktionen aber erst, wenn ihr eurer Component-Klasse das dazugehörige Interface zuweist. Für jeden Hook existiert ein entsprechendes Interface ohne den Prefix *ng*.

<table class="table table-striped">
  <thead>
    <th>Interface</th>
    <th>Hook</th>
  </thead>
  <tbody>
    <tr>
      <td>OnChanges</td>
      <td>ngOnChanges</td>
    </tr>
    <tr>
      <td>OnInit</td>
      <td>ngOnInit</td>
    </tr>
    <tr>
      <td>DoCheck</td>
      <td>ngDoCheck</td>
    </tr>
    <tr>
      <td>AfterContentInit</td>
      <td>ngAfterContentInit</td>
    </tr>
    <tr>
      <td>AfterContentChecked</td>
      <td>ngAfterContentChecked</td>
    </tr>
    <tr>
      <td>AfterViewInit</td>
      <td>ngAfterViewInit</td>
    </tr>
    <tr>
      <td>AfterViewChecked</td>
      <td>ngAfterViewChecked</td>
    </tr>
    <tr>
      <td>OnDestroy</td>
      <td>ngOnDestroy</td>
    </tr>
  </tbody>
</table>

Keine Angst, falls viele Begrifflichkeiten, wie Projektion, euch noch kein Begriff sind. Diese werden im passenden Abschnitt explizit erklärt.

Aber jetzt ist erstmal interessant, wie die Nutzung der Hooks im Quellcode aussehen könnte. Dazu basteln wir uns eine kleine Komponente, die den *ngOnInit* Hook nutzt.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'name-component',
  template: `<div>{{name}}</div>`
})
export class NameComponent implements OnInit {
  @Input name: string;

  constructor() {
    // <name-component [name]="AngularJS"></name-component>
    console.log(this.name); // undefined
  }

  ngOnInit() {
    // name is defined, if a value is set via
    console.log(this.name);
  }
}
```

Alle Interfaces können einfach über ein `import` aus *angular2/core* geladen werden. Danach müsst ihr über `implements` noch angeben, dass eure Komponente das entsprechende Interface implementiert. Nun wird die *ngOnInit*-Funktion nach dem erfolgreichen Initialisieren der Komponente ausgeführt.

## Die Hooks im Detail

Im folgenden Abschnitt stellen wir euch die Bedeutung und mögliche Nutzung der einzelnen Lifecycle Hooks im Detail vor. Dazu gehen wir sie nach ihrer ersten Ausführung sortiert durch. Dabei sollte beachtet werden, dass beim Erzeugen einer Komponente ihr Konstruktor ausgeführt wird. Zu diesem Zeitpunkt sind die Data-Bindings noch nicht aufgebaut!

<div class="alert alert-danger">Achtung: Im Konstruktor sind bereits gesetzte Werte der Inputs noch nicht verfügbar, da das Data-Binding noch nicht aufgebaut ist!</div>


### ngOnChanges

Nachdem Erzeugen der Komponente werden die Data-Bindings aufgebaut. Dadurch können bereits Änderungen der Eingaben vorliegen. Nehmen wir den obige Quellcode, dann wird am Anfang bereits *name* gesetzt. Diese Änderungen werden dann dem *ngOnChanges* mitgeteilt. Der spätere Vorgang zum Überprüfen von Änderungen nennt sich in Angular übrigens Change Detection (im Angular 1 Kontexten als *Dirty Checking* implementiert). Nach jeder Change Detection wird dann der *ngOnChanges* Hook ausgeführt, falls Änderungen vorliegen.

<div class="alert alert-warning">Wichtig: Der erste ngOnChanges-Aufruf erfolgt bereits vor ngOnInit!</div>

Als Parameter erhält die Funktion ein sogenanntes Änderungsobjekt, dessen Werte vom Typ SimpleChange sind. Es existieren also in Angular eigene Klassen, um Änderungen zu repräsentieren.

Nutzen wir das obige Code-Beispiel und wandeln es so ab, dass wir den ngOnChanges Hook nutzen.

```typescript
import { Component, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'name-component',
  template: `<div>{{name}}</div>`
})
export class NameComponent implements OnChanges {
  @Input name: string;

  constructor() {
    console.log(this.name); // undefined
  }

  // changes is an object with a list of keys from type string
  // and the values are SimpleChange objects
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    // name is set ==> change detected
    // <name-component [name]="AngularJS"></name-component>
    console.log(this.changes.name);
    // this.changes = { 'name': { currentValue: 'AngularJS', previousValue: {} } }
  }
}
```

Wie ihr sehen könnt, existieren auf einem SimpleChange-Objekt die Schlüssel *currentValue* und *previousValue*. Über sie bekommt ihr Zugriff auf den aktuellen - geänderten - und den vorherigen Wert der Inputs.

<div class="alert alert-info">Hinweis: Jedes SimpleChange-Object besitzt auch eine isFirstChange-Funktion, die euch als Wert <i>true</i> oder <i>false</i> zurückgibt, falls es sich um das initiale Setzen oder um normale Änderungen handelt.</div>

Wollt ihr jedoch einfach nach dem Initialisieren der Inputs einmalig eine Funktion ausführen, bietet sich der ngOnInit-Hook an.


### ngOnInit

Wie im letzten Satz des vorherigen Abschnittes beschrieben, greift nach der ersten Ausführung des ngOnChanges Hooks der ngOnInit Hook, um auf das Initialisieren der Inputs zu reagieren.

Hier ist auch der Platz für asynchronen Code, der nach dem Erzeugen der Komponente ausgeführt werden soll.

<div class="alert alert-info">Hinweis: Im Konstruktor einer Komponente sollte nur zur Dependency Injection genutzt werden. Alles andere kann in den ngOnInit Hook verschoben werden.</div>

Ein Beispiel dazu habt ihr ja bereits im Abschnitt *Zugriff auf den Lifecycle* gesehen.


### ngDoCheck

Im Verlaufe des Artikel ist ab und zu das Wort Change Detection zu lesen. Dabei handelt es sich einfach gesprochen um eine Funktion, die prüft und erkennt, ob sich Eingabewerte der Komponente geändert haben.

Standardmäßig wird der Hook sehr häufig ausgeführt, da er eng mit diesem Change Detection Zyklus der App verknüpft ist. Dabei reagiert eine Angular Anwendung intern auf unterschiedlichste Umstände und Interaktionen, um diesen Vorgang zu starten. Im Normalfall geschieht dies von der obersten Komponente aus bis zu den letzten Kindern (*Top-to-Bottom*). Dabei spielt es keine Rolle, ob die Änderungen in der aktuellen Komponente erfolgt oder in einem ganz anderen Anwendungsteil. Als Beispiel kann bereits ein einfacher Klick eine Aktualisierung aller Komponenten auslösen.

<div class="alert alert-warning">Wichtig: Der ngDoCheck Hook wird immer dann ausgeführt, wenn die Komponente ihre Eingabewerte auf Änderungen prüfen soll. Dies kann je nach aktiver Change Detection Strategie sehr häufig passieren.</div>

Die eigene Change Detection Funktion sollte daher sehr performant implementiert werden, um die weitere Ausführung der Anwendung nicht zu blockieren.

Es folgt wieder ein kleines Beispiel. Ihr solltet damit ein wenig ausprobieren, bis euch klar ist, wann und wie oft dieser Hook ausgeführt wird!

```typescript
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'name-component',
  template: `<div>{{name}}</div>`
})
export class NameComponent implements DoCheck {
  @Input name: string;

  oldName: string;

  constructor() {
    console.log(this.name); // undefined
  }

  // is executed everytime Change Detection runs
  ngDoCheck() {
    // check if there is a new value
    if (this.oldName !== this.name) {
      this.oldName = this.name;
      // Maybe do something special
    }
  }

}
```


### ngAfterContent und ngAfterView

Als nächsten wollen wir uns die Hooks anschauen, die euch vielleicht auf den ersten Blick nicht viel sagen oder ihr gar nicht wisst, was sie bedeuten könnten.

Den Anfang machen dabei die *ngAfterContent* Hooks. Dafür machen wie einen kurzen Ausflug abseits von Hooks und dem Component Lifecylce.


**Content und Components**

Zuerst einmal sollte geklärt werden, was im Kontext von Components mit Content gemeint sein könnte. Dafür holen wir jetzt mal ein wenig weiter aus.

Components sind im Angular Kontext nichts weiter als eine speziellere Form von Direktiven. Wie wir wissen, können Direkten eigene Templates - als Template-String oder über eine extra Template-Datei - besitzen. Diese werden kompiliert und das Data-Binding zum entsprechenden Kontext aufgebaut.

In der ersten Version des Frameworks (AngularJS) existiert für Direktiven eine kleine Besonderheit mit dem Namen *Transclusion*. Dabei können zwischen dem öffnenden und schließenden Direktiven-Tag weitere Inhalte stehen. Dieser befindet dann sozusagen außerhalb der Direktive an sich, weil diese arbeitet ja intern mit dem eigenen Template.

Über die ngTransclude-Direktive kann dieser "äußere" Inhalt in das Template der eigenen Direktive eingebunden werden.

Das Template:

```html
<my-directive><p>Hallo</p></my-directive>
```

Der AngularJS Code:

```javascript
// <p>Hallo</p> is inserted where ngTransclude is set
angular
  .module('myApp')
  .directive('myDirective', function () {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      template: '... <ng-transclude></ng-transclude> ...'
    }
  });
```

In Angular heißt dieses Prinzip nun vielleicht ein wenig passender *Projection*. Dieses hat aber die gleiche Funktion.

<div class="alert alert-warning">Wichtig: Im Zusammenhang mit Komponenten/Direktiven steht der Begriff <i>Content</i> für den Inhalt zwischen dem Start- und End-Tag des Selektors.</div>

Statt ngTransclude steht euch die Direktive mit dem passenden Namen **ngContent** zur Verfügung. Ein Beispiel dafür sieht dann wie folgt aus.

Das Template:

```html
<name-component name="AngularJS.de"><b>Hello,</b></name-component>
```

Die Komponente:

```typescript
export @Component({
  selector: 'name-component',
  template: `<div><ng-content></ng-content> {{name}}</div>`
})
class NameComponent {
  @Input name: string;
}
```

Zusätzlich kann ngContent über das Attribute *select* ein Selektor übergeben werden, um nur bestimmte Inhalte zu projizieren.


**Funktionsweise von ngAfterContentInit**

Jetzt, wenn endlich klar ist, was *Content* bedeutet, machen natürlich auch die dazugehörigen Hooks mehr Sinn.

Der ngAfterContentInit Hook wird nur einmalig zu Beginn ausgeführt, wenn der Inhalt zwischen den Component-Tags an die Stelle des ngContent projiziert wurde. Damit ist sozusagen die Initialisierung des Component Contents abgeschlossen.

Wir verzichten im folgenden auf die Code-Beispiele, da sie genauso aufgebaut sind, wie die bisher vorgestellten.


**Funktionsweise von ngAfterContentChecked**

Nachdem der Content initialisiert wurde, wird dieser einmal auf mögliche Änderungen überprüft. Danach ist dieser Hook eng mit der Change Detection von Angular verknüpft, wodurch auch er ziemlich häufig aufgerufen wird.


**Views und Components**

Im Gegensatz zum Component Content steht eine View für das wirkliche Template der Komponente im Zusammenhang mit den Data-Bindings (ViewModel). Ist also irgendwo die Rede von View oder ViewChildren ist der eigentliche Inhalt der Komponente oder von ihren Kind-Elementen bzw. Kind-Komponenten die Rede.


**Funktionsweise von ngAfterViewInit**

Dieser Hook verhält sich wie der ngAfterContentInit Hook. Nur wird dieser hier einmalig nach dem Initialisieren der Views ausgeführt.

**Funktionsweise von ngAfterViewChecked**

Direkt nach dem Erzeugen der Views werden diese auf Änderungen überprüft, da sich diese ja direkt noch einmal geändert haben könnten. Danach ist dieser Hook eng mit der Change Detection von Angular verknüpft, wodurch er ziemlich oft aufgerufen wird.


## ngOnDestroy

So traurig es auch klingen mag, aber irgendwann erlebt eine Komponente auch ihr Ende. Sei es durch einen frechen Routenwechsel des Nutzers oder durch strukturelle Direktiven, die das Element einfach aus dem DOM werfen. Diese Hook-Funktion wird kurz vor dem vernichten der Komponente aufgerufen. Dadurch ist hier der Platz um richtig aufzuräumen, damit möglichst keine überflüssigen Spuren zurück bleiben (die nicht vom Garbage Collector erfasst werden - Stichwort Memory-Leaks).

Es folgt eine Liste von Dinge, die ihr im ngOnDestroy unbedingt tun solltet.

1. Informieren andere Komponenten über das Löschen informieren, falls nötig (optional)
2. Verbindung zu Observables kappen (unsubscribe)
3. Verbindung zu überflüssige DOM-Events lösen
4. Intervalle und Timeouts stoppen
5. Abmeldung von globalen Services

<div class="alert alert-warning">Wichtig: Versucht alle Dinge, die der Garbage Collector nicht aufräumen kann, selbst zu entsorgen!</div>


## Ausführungsreihenfolge

In den folgenden Grafiken erhaltet ihr noch einmal einen Überblick, wann und in welcher Reihenfolge die Lifecycle Hooks nach dem Erzeugen einer Komponente und nach einer Änderungen in der App, die einen neuen Change Detection Zyklus anstößt, ausgeführt werden.


Als ersten schauen wir uns die ausgeführten Hooks bei der Erzeugung einer Komponente an.

![Bild](medium_lifecycle-hooks-init.png?v=63628812859)

Wenn die Change Detection an einer Komponente nach der Initialisierung angestoßen wird, haben wir den Zugriff auf folgende Hooks innerhalb dieser Komponente.

![Bild](medium_lifecycle-hooks-change.png?v=63628812928)

<div class="alert alert-info">Hinweis: Nach dem Ausführen des ngOnChanges Hooks prüft Angular nochmal auf Änderungen, wodurch ngDoCheck, ngAfterContentChecked und ngAfterViewChecked ein weiteres Mal ausgeführt werden. Falls Angular dabei erneut Änderungen erkennt, erhaltet ihr im Entwicklermodus eine Warnung in der JavaScript-Konsole des Browsers.</div>

## Fazit

Wir hoffen euch einen weiteren wichtigen Bestandteil von Angular näher gebracht zu haben. Beachtet, dass ihr den Konstruktor einer Komponente nur zum Einbinden von Abhängigkeiten nutzt. Für alle anderen Anwendungsfälle , z.B. das Laden initialer Daten von einer Schnittstelle, existiert der ngOnInit Hook. Am Ende das Aufräumen nicht vergessen und Überbleibsel, wie Event- oder Observable-Subscriptions auflösen, da diese vom Garbage Collector nicht automatisch aus dem Speicher entfernt werden. Aber die genauen Details dazu habt ihr ja bereits im Artikel erfahren ;). Des Weiteren haben ähnliche Hooks auch bereits in den Angular 1 (Version 1.5.3) Components einen Platz gefunden.

Viel Spaß beim weiteren Lernen von und Programmieren mit Angular!
