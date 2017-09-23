---
title: "Angular - Outputs, Events und EventEmitter"
description: "Lasst eure Komponenten schnell und einfach über Events kommunizieren. Informiert Anwendungsteile über Änderungen mit Service-Events."
author: "Bengt Weiße"
slug: "angular2-output-events"
published_at: 2016-05-17 12:12:12.000000Z
categories: "angular angular2 angular4"
header_image: "/artikel/header_images/angular2-output-events.jpg"
---

Für das Verständnis dieses Artikels solltet ihr euch zurvor mit den Grundlagen der Angular Entwicklung befassen. Dazu bietet sich unser [Angular-Einführungstutorial](/artikel/angular-tutorial-deutsch/) an.

## Events in JavaScript

Jedem JavaScript-Entwickler sind sicher schon einmal Events über den Weg gelaufen. Sei es beim Einsatz von jQuery, um auf bestimmte DOM-Events (beispielsweise einem Klick) zu reagieren oder die direkte Nutzung nativer Events, um einen Fehler abzufangen. Als kleines Code-Beispiel hören wir auf einen Button-Klick und zeigen eine Meldung an.

```html
<html>
  <head>
    <script type="text/javascript">
      function showAlert() {
        alert('Hello');
      }
    </script>
  </head>
  <body>
    <button onclick="showAlert()">Say: Hello</button>
  </body>
</html>
```

Eine andere Möglichkeit ist den Event-Listener selbst per JavaScript auf das Element zu setzen. Dadurch entfällt das `onclick` am button-Tag.

```html
<html>
  <head>
    <script type="text/javascript">
      function addListener() {
        var buttonEl = document.querySelector('button');
        // or buttonEl.addEventListener('click', showAlert);
        buttonEl.onclick = showAlert;
      }
      function showAlert() {
        alert('Hello');
      }
    </script>
  </head>
  <body onload="addListener()">
    <button>Say: Hello</button>
  </body>
</html>
```

> Events werden immer dann benutzt, wenn wir andere Code-Bestandteile über das Eintreten eines bestimmten Ereignisses informieren wollen. Dabei kann dies auch irgendwann in der Zukunft geschehen.

Es besteht auch die Möglichkeit eigene Events zu erzeugen, diese auszuführen und auf sie zu reagieren.

## Events und Outputs in Angular

### Components/Directives

In Angular können Standart-DOM-Events sehr einfach genutzt werden. Dazu schreibt ihr das Event, was abgefangen werden soll, in die bereits aus dem Einführungsartikel bekannten `()` (Output) Klammern. Als Wert setzt ihr eine Expression, worunter auch Funktionsaufrufe zählen.

```javascript
@Component({
  selector: 'my-click-class',
  template: `
    <button (click)="showAlert()">Say: Hello</button>
  `
})
export class MyClickClass {
  showAlert() {
    window.alert('hello');
  }
}
```

Darüber hinaus lassen sich auch eigene Events - in Angular Ouputs genannt - erzeugen. Diese werdet ihr später hauptsächlich benötigen, um Daten aus einer Komponente an ihre Elternkomponente weiterzureichen. Ein Anwendungsbeispiele dafür sind sogenannte *Dummy*-Komponenten/Direktiven, welche sich vor allem für Formulare anbieten. Die eigentliche Komponente nutzt eine weitere Komponente, die sich nur um das Formular an sich kümmert. Sie hält das Formular-Template, die Validierungslogik und gibt der Elternkomponente bescheid wann und was am Ende abgeschickt werden soll.

<div class="alert alert-info"><b>Hinweis:</b> Erstellt eigene <code>Outputs</code>, um Daten an Elternkomponenten weiterzugeben.</div>

Zur Vereinfachung nehmen wir einfach unser bisheriges `click`-Beispiel und wandeln dieses so ab, dass wir folgenden Aufbau erhalten.

1. **Basis-Komponente** - reagiert auf ein eigenes Event der Click-Komponente
2. **Click-Komponente** - enthält Button, gibt Nachricht beim Klick and Basis-Komponente


Beginnen wir mit der Basis-Komponente.

```javascript
@Component({
  selector: 'base-component',
  directives: [ClickComponent],
  template: `
    Base-Component
    <click-component (showMsg)="handleMsg($event)"></click-component>
  `
})
export class MyParentComponent {

  handleMsg(msg) {
    window.alert(msg);
  }

}
```

Unsere Basis-Komponente bindet als Abhängigkeit die `ClickComponent` ein, damit diese im Template benutzt werden kann. Dort fügt sie einen Listener auf das Event mit dem Name `showMsg` hinzu. Wird das Event ausgeführt, rufen wir die Funktion `handleMsg` mit einem Parameter `$event` auf. Ihr werden recht häufig auf die von Angular reservierte Variable `$event` stoßen. Sie steht im Grunde immer für das Event-Objekt, des aktuellen Ereignisses.

Daraus erhalten wir schon ein paar Vorgaben für unsere `ClickComponent`.

```javascript
@Component({
  selector: 'click-component',
  template: `
    <button (click)="triggerEvent()">Say: Hello</button>
  `
})
export class ClickComponent {
  @Output() showMsg = new EventEmitter<string>();

  triggerEvent() {
    this.showMsg.emit('Hello');
  }
}
```

Das Template der Click-Komponente besteht nur aus unserer Schaltfläche. Auf das bereits vorhandene `Click-Event` kann einfach so gehört werden. Wir definieren uns zusätzlich in der Component ein eigenes `Output` über den dafür vorgesehenen gleichnamigen Decorator. Als Name setzen wir `showMsg` und initialisieren ihn mit einem neuen eigenen Event vom Typ `String`.

Beim Klick auf den Button wird nun die `triggerEvent`-Funktion ausgeführt, die wiederum unser eigenes Event absendet, was die Funktion `emit()` auf einem *EventEmitter* erledigt. Hier kommt der von uns festgelegte Typ `String` ins Spiel. Er erlaubt uns nur Zeichenkette im `emit` zu versenden. Aus diesem Grund steht auf `$event` nun unser `'Hello'`, anstatt eines kompletten Event-Objekts.

Unsere Basis-Komponente hört auf unser Event und zeigt daraufhin, wie erwartet, die Hinweisbox mit dem übergebenen Text an.

## Services bzw. Injectables

In der Regel werden Services - oder auch *Injectables* genannt - dazu genutzt Funktionalitäten oder Daten zwischen mehreren Anwendungsabschnitten zu teilen. Nehmen wir dazu an, dass sich zwei Components einen DataService teilen. Beide können Daten im Service ändern. Beide Komponenten müssen natürlich die eigenen Daten aktualisieren, wenn sich der DataService ändert. Die Lösung dazu nennt sich *Service-Events*. Ein Service erstellt dazu einen neuen und öffentlichen `EventEmitter`. Alle Funktionen im Service, die Daten des Services ändern, können das Event dann nutzen, um allen Interessenten über die neuen Daten zu informieren.

<div class="alert alert-info"><b>Hinweis:</b> Nutzt Service-Events, um Änderungen an gemeinsam genutzten Daten anwendungsweit zu verteilen.</div>

Als Beispiel haben wir einen `CartService`, der alle Warenkorbeinträge hält. Er besitzt ein `cartChanged`-Event und eine `addCartItem`-Funktion. Nach dem Hinzufügen eines Items soll das Event die neuen Daten verteilen.

```javascript
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class CartService {
  cart = [];
  public cartChanged = new EventEmitter<Object>();

  getCart() {
    return this.cart;
  };

  addCartItem(item): void {
    this.cart.push(item);
    this.cartChanged.emit(this.cart);
  };

}
```

Eine Komponente könnte dann wie folgt ein Event abonnieren.

```javascript
@Component({
  ...
})
export class ProductComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService
      .cartChanged
      .subscribe(updatedCart => {
        // update data in component
      });
  }
}
```

Was das Interface `OnInit` und die `ngOnInit` Funktion bedeuten, könnt ihr in unseren Artikel über den [Component-Lifecycle](/artikel/angular-2-component-lifecycle/) nachlesen.

Wer jetzt denkt, dass alles sieht jetzt doch schon irgendwie nach Observables aus. Ja, ihr habt recht, denn intern arbeitet der EventEmitter auch mit Observables.

<div class="alert alert-info"><b>Hinweis:</b> Der EventEmitter in Angular basiert intern auf Observables!</div>

## Fazit

Events sind äußerst nützlich und dienen nicht nur zu Kommunikation zwischen Komponenten über den DOM, sondern auch über Services. Dadurch lassen sich intelligente Anwendungen schreiben, die schnell und elegant auf Änderungen auf Datenebene reagieren.
