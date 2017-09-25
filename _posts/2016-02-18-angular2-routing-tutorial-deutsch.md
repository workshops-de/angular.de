---
title: "Angular Routing Tutorial für Einsteiger"
description: "Das Routing durchläuft gerade in der 1er und 2er Version des Frameworks einen gewaltigen Wandel. Wie das aktuelle Routing im Vergleich zu AngularJS funktioniert, erfahrt ihr hier."
author: "Bengt Weiße"
slug: "angular2-routing-tutorial-deutsch"
published_at: 2016-02-18 10:30:00.000000Z
categories: "angular angular2 angular4 tutorial"
header_image: "/artikel/header_images/angular2-routing-tutorial-deutsch.jpg"
tutorial_page_order: '4'
---

## Routing im Überblick

So langsam nimmt die zweite Version des beliebten Single-Page-Application Frameworks Formen an. Ein sehr wichtiger Punkt zu Erstellung einer Web-Anwendung ist das **Routing**. Dabei müssen Inhalte flexibel ausgetauscht werden, so dass sich der Nutzer einfach und bequem durch die Anwendung bewegen kann.

### Routing bis AngularJS 1.4.x mit ngRoute

In der ersten Version von Angular steht das __ngRoute__-Modul im Mittelpunkt der Navigation. Es bringt folgende Komponenten mit:

 - `$routeProvider` - im config-Block der Anwendung nutzbar
     - `when()` - Funktion zur Definition von Routen über URL, Parametern, Template und Controller
     - `otherwise()` - Setzen der Standardroute
 - `$route` - Liefert Informationen zur aktuellen Route (als Abhängigkeit in z.B. Controller injizierbar)
 - `$routeParams` - Zugriff auf die Parameter der aktuellen Route (als Abhängigkeit in z.B. Controller injizierbar)
 - `ngView` - Direktive, stellt den Einhängepunkt des Routen-Templates dar

Als kleines Beispiel haben wir eine einfach App mit zwei Routen.

```typescript
angular
  .module('tutorialApp', ['ngRoute'])
  .config(function ($routeProvider) {
    // route definition
    $routeProvider
      .when('/order', {
        controller: 'ArticlesCtrl',
        templateUrl: 'articles.html'
      })
      .when('/about', {
        template: 'Über unsere Pizzeria'
      })
      // default route
      .otherwise('/order');
  })
  .controller('ArticlesCtrl', function ($scope, $routeParams) {
    // $routeParams: object with possible params;
    $scope.title = 'Artikelliste';
  });
```

Das Basis-Template könnte wie folgt aussehen.

```html
<div class="container">
    <p class="well">
        <a href="#/">Start</a> | <a href="#/about">Über</a>
    </p>
    <div ng-view></div>
</div>
```

In Version 1.3 und 1.4 des Frameworks wurden bereits erste Schritte getan, um die Anwendung für den nächsten großen Versionssprung vorzubereiten.

 - `controllerAs`-Syntax - Alias für Controller, Verwendung der `this`-Schreibweise an Stelle von `$scope`
 - `bindToController` - Zugriff auf Daten im isolierten Kontext in Direktiven

Der `controllerAs`-Syntax erlaubt es dem Entwickler über einen Alias im Template auf den Controller zuzugreifen. Ein Nebeneffekt ist, dass anstatt `$scope` direkt über `this` auf den aktuellen Kontext im Controller-Code zugegriffen werden kann.

```typescript
meineApp.controller('ArticlesCtrl', function () {
  this.title = 'Artikelliste';
});
```

Im Template wird der Controller dann wie folgt verwendet.

```html
<div ng-controller="ArticlesCtrl as articles">
  {{articles.title}}
</div>
```

Dadurch kann selbst bei verschachtelten Controllern eindeutig über den Namen auf die entsprechenden Keys zugegriffen werden. Somit können unterschiedliche Controller die gleichen Schlüssel besitzen und bleiben auch bei ihrer Verschachtelung Template immer verfügbar.

Der `controllerAs`-Syntax bringt jedoch ein paar Probleme mit sich. Vor allem wird das im Falle von Direktiven mit isoliertem Scope und eigenem Controller bemerkbar. Im Normalfall werden alle angegebenen Data-Bindings über ein Objekt für den Konfigurationsschlüssel `scope` in den Kontext - sprich den Scope der Direktive - übertragen.

```typescript
meineApp.directive('articleDirektice', function () {
  return {
    scope: {
      title: '='
    },
    controller: function ($scope) {
      // $scope.titel is available here
    },
    templateUrl: '...'
  };
});
```

Wird nun die `ControllerAs`-Syntax* benutzt, erwartet der Controller den Wert von `title` auf `this` und nicht auf dem `$scope`-Objekt. Dies kann zum Fehlverhalten im Data-Binding führen.
Um dieses Problem zu lösen, enthält AngularJS 1.4 den zusätzlichen Konfigurationsschlüssel `bindToController`. Dieser erhält nun das Objekt, was zuvor auf `scope` übergeben wurde. `scope` erhält dafür ein leeres Objekt, um AngularJS mitzuteilen, dass die Direktive über einen gekapselten, also isolierten, Scope verfügen soll.

```typescript
meineApp.directive('articleDirective', function () {
  return {
    scope: {}, // isolated scope
    bindToController: {
      title: '=' // provides title
    },
    controller: function () {
      // this.title is available
    },
    controllerAs: 'articles',
    templateUrl: '...'
  };
});
```

Über `bindToController` bleibt das Two-Way-Data-Binding auf jeden Fall erhalten!

### Rounting ab AngularJS 1.5.x mit `$router` und Components

Mit der Veröffentlichung von v1.5 weicht Angular die Grenzen zwischen erster und zweiter Version des Frameworks weiter auf. Einerseits können nun so genannte **Components** definiert  und andererseits eine neue Routing-Möglichkeit über das **ngComponentRouter**-Modul benutzt werden.

#### Components

Im Allgemeinen sind Components (zu deutsch Komponenten) einfach eine Kombination aus Template und Controller. Daher lassen sie sich am ehesten mit den bekannten Direktiven vergleichen. Wie wir in im nächsten Abschnitt kennenlernen werden, besteht eine Angular Anwendung hauptsächlich aus Komponenten. Die Definition einer Komponente erfolgt dabei ähnlich zu den anderen Bestandteilen einer AngularJS-App. Durch den Aufruf der Funktion `.component()` wird eine neue Komponente erstellt und kann verwendet werden. Sie erwartet zwei Argumente:

 1. Name der Komponente (String) - eindeutige Zeichenkette
 2. Konfiguration (Object) - verknüpft Template mit Controller

Die Ähnlichkeit zu einer bisherigen Direktive ist auch bei der näheren Betrachtung des Konfigurationsobjektes unverkennbar.

```typescript
meineApp.component('articleComponent', {
  bindings: {
    'title': '='
  },
  controller: function () {
    // this.title is available
  },
  templateUrl: '...'
});
```

Anstatt, wie zuvor (in der Version 1.4) noch die `scope`-, `bindToController`- und `controllerAs`-Eigenschaft zu setzen, wird jetzt nur noch der `bindings`-Schlüssel benötigt.

Als letzten Schritt benötigen wir eine Möglichkeit eine Komponente mit einer Route bzw. besser gesagt mit einer View zu verbinden.

#### Das ngComponentRouter-Modul

Hier setzt der Router ein. Er löst das alter und unflexible Verfahren auf Zustände in der Konfigurationsphase festlegen zu müssen. Dies hatte den Nachteil, dass ein flexibles Laden (Lazy-Loading) von Controller und Template erschwerte oder ganz unmöglich gemacht wurde. In Version 1.5 kann der neue Service einfach als Abhängigkeit geladen werden und über ihn neue Routen hinzugefügt werden. Als Beispiel brauch die eigentlich Anwendung nur alle Eltern-Routen zu kennen. Wird der Controller einer dieser Route ausgeführt, kann diese einfach während der Ausführung die Kinder-Routen konfigurieren und bekannt machen. Das ngComponentRouter-Modul besitzt drei Hauptbestandteile.

 1. `$router` - Service zum Konfigurieren von Routen
 2. `ngOutlet` - Direktive, stellt Einhängepunkte der Templates dar - mehrere möglich! (ähnlich zu ngView)
 3. `ngLink` - Direktive, um zwischen Routen zu navigieren

Als erstes muss das **ngComponentRouter**-Modul als Abhängigkeit zu unserer Anwendung hinzugefügt werden. Danach kann der `$router`-Service in einem Basis-Controller geladen werden, um die Standardrouten zu definieren. In der Index-Datei der Anwendung wird dieser Controller verwendet und ein Element mit mit `ngOutlet` ausgestattet.

```typescript
angular
  .module('tutorialApp', ['ngComponentRouter'])
  .controller('AppCtrl', function ($router) {
          $router
              .config([{
                  path: '/start',
                  name: 'Start',
                  component: 'articleComponent'
              });
      });
  ])
  .component('articleComponent', {
    //  ...
  });
```

Das Template-Schnipsel sieht dann so aus.

```html
<div ng-controller="AppCtrl">
    <div ng-outlet><div>
</div>
```

Dabei kann es mehrere "*Outlets*" geben. Dazu kann `ngOutlet` als Wert ein Name übergeben werden. Der Standard-Name heißt *default* und kann weggelassen werden. Das Verlinken zwischen verschiedenen Routen passiert am Ende über die `ngLink`-Direktive.

```html
<a ng-link="['Start']">auf zum Start!</a>
```

Wer bereits das externe *ui.Router*-Modul benutzt hat, wird vieles im neuen Angular *ngComponentRouter*-Modul wiedererkennen. Auch hier können mehrere Einhängepunkte und somit verschachtelte Routen definiert werden. Die Verlinkung im Template findet über eine eigene Direktive statt, die als Wert eine Liste von Routen - für mögliche Child-Routen - und/oder Objekten von gegebenenfalls vorhandene Routen-Parameter.

### Routing in Angular

Im Vergleich zum Standard-Router in AngularJS wurde das Routing komplett überarbeitet. Trotzdem wird vieles nicht unbekannt erscheinen, funktioniert aber doch ein wenig anders. Das Im nachfolgenden Abschnitt erfahrt ihr alles wichtige über das neue Routing.

#### Hauptbestandteile

In der neuen Version besteht das Routing wieder aus mehreren Komponenten, welche im __angular2/router__-Modul enthalten sind. Die wichtigsten davon sind:

 1. `RouteConfig` - Decorator zur Definition von Routen über URL, Parameter und Components
 2. `RouterOutlet` - Direktive, als Einhängepunkt des Templates der Component der aktuellen Route
 3. `RouterLink` - Direktive, verlinkt Routen
 4. `RouteParams` - Service für Zugriff auf die Parameter der aktuellen Route
 5. `Router` - Zugriff und programmatische Konfiguration des Routings während der Anwendungsausführung (z.B. Routing in der Komponente anstatt im Template, Zugriff auf aktuelle Route)

Eine mögliche Projektstruktur der TypeScript-Dateien könnte wie folgt aussehen:

 - index.html
 - app/
   - boot.ts
    - components/
      - app.component.ts
      - order/
          - order.component.ts
      - about/
          - about.component.ts

#### Definition von Routen

Es besteht auch die Möglichkeit einfach alle Direktiven auf einmal zu importieren. Dazu muss einfach die "Konstante" `ROUTER_DIRECTIVES` geladen werden. Damit das Routing generell funktioniert, müssen die `ROUTER_PROVIDERS` als Providers in den Komponenten Metadaten gesetzt werden. Am einfachsten macht man dies einmal in der Hauptkomponente einer Anwendung.

```typescript
import { ROUTER_DIRECTIVES, ROUTER_DIRECTIVES } from 'angular2/router';
```

Die Hauptkomponente mit der Definition der AngularJS 1.x Anwendung im Angular Kontext könnte dann so aussehen.

```typescript
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {PizzaService} from '../../../services/pizza.service';
import { OrderComponent } from './order/order.component';
import { AboutComponent } from './about/about.component';

@RouteConfig([{
  path: '/',
  redirectTo: '/order'
},{
  path: '/order',
  component: OrderComponent,
  name: 'Order'
}, {
  path: '/about',
  component: AboutComponent,
  name: 'About'
}])

@Component({
  selector: 'pizza-app',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, PizzaService],
  template: `
  <p class="well">
    <a [routerLink]="['Order']">Start</a> |
    <a [routerLink]="['About']">Über</a>
  </p>
  <router-outlet></router-outlet>
  `
})

export class PizzaAppComponent {}
```

Neben den bereits hoffentlich bekannten Angular Komponenten, werden mit `RouteConfig` drei Routen definiert.

 1. `'/'` - Aufruf der Basis-URL soll auf die Bestellen-Route/Komponente weiterleiten
 2. `'/order'` - Bestellung aufnehmen
 3. `'/about'` - Seite mit Informationen über den Pizza-Dienst

Über den Schlüssel `Component` wird die URL mit einer Komponente und somit auch mit dem Template dieser verknüpft. Um später nicht immer komplette Pfade verlinken zu müssen, kann der hier angegebene Alias benutzt werden.

#### `routerOutlet` - Einhängepunkt im Template

Als Pendant zur `ngView`-Direktive kann `routerOutlet` im Template benutzt werden. Hier wird dann das Template der mit der Route verbundenen Komponente eingehangen, um es dem Nutzer zu präsentieren. Damit die Direktive im Template zur Verfügung steht, muss diese in der Komponenten-Defintion über den `directives`-Schlüssel bekannt gemacht werden. Auch hier kann die einzelne Direktive oder einfach alle importiert werden.

Soll das Routing funktionieren, müssen zu Beginn der Anwendung die eigenen Komponenten `OrderComponent` und `AboutComponent` über `import` eingebunden werden.

#### `routerLink` - Verlinkung im Template

Um Routen im Template zu verlinken wird die `RouterLink`-Komponente zu Beginn durch `ROUTER_DIRECTIVES` geladen und dann mit dem Template verknüpft. Durch den As-Syntax bzw. dem Namen der Route kann `RouterLink` einfach der Name als Zeichenkette übergeben werden. Die eckigen Klammern um `router-link` geben an, dass nicht nur ein einfacher String, sondern eine Expression (Ausdruck) übergeben wird. Dies wird später wichtig, wenn es um Child-Routes und Routen-Parameter geht.

```html
<a [routerLink]="['Order']">Start</a>
```

#### `Router` - Programmatisches Navigieren

Natürlich kann auch programmatisch zwischen Routen gewechselt werden. Dies geschieht über den `Router`-Service. Er bietet unter anderem eine `navigate`-Methode.

```typescript
import { Router } from 'angular2/router';

@Component({
  // ...
})
export class MyComponent {
  constructor(router: Router) {
  }

  goTo(path) {
    this.router.navigate(path);
  }
}
```

#### `RouteParams` - Arbeiten mit URL-Parameter

Um mit Parametern in Routen zu arbeiten kann die `RouteParams`-Komponente genutzt werden. Dazu muss der Service importiert und dem Konstruktor der Komponente übergeben werden. Durch die **Dependency-Injection** erhalten wir nun Zugriff auf den `RouteParams`-Service und könne über die `get`-Methode bestimmte Parameter abfragen.

```typescript
import { RouteParams } from 'angular2/router';

@Component({
    ...
})
export class MyComponent {
  constructor(routeParams: RouteParams) {
      this.param = routeParams.get('PARAM_NAME');
  }
}
```

Um wirklich mit Parametern arbeiten zu können, müssen auch Routen mit diesen ausgestattet werden können. Dies geschieht sehr ähnlich zu Angular 1.x.

```typescript
@RouteConfig([{
    path: '/test/:param1',
    ...
}])
```

Im Template wird dann einfach die `routerLink`-Direktive ein wenig erweitert.

```html
<a [routerLink]="['test', {'param': 1}]">Test</a>
```

#### Bootstrap der Anwendung

Als letzten Schritt muss die Anwendung noch gestartet werden. Dies geschieht über die allgemeine `Bootstrap`-Komponente. Entweder die Hauptanwendung wird dafür erweitert oder es wird eine eigene Datei dazu angelegt. Aus persönlicher Vorliebe entscheide ich mich hier für Variante 2.

```typescript
import { bootstrap, provide } from 'angular2/platform/browser';
import { LocationStrategy, HashLocationStrategy } from 'angular2/platform/common';

import { PizzaAppComponent } from './components/app.component';

bootstrap(PizzaAppComponent, [provide(LocationStrategy, {useClass: HashLocationStrategy})]);
```

####  Konfigurieren der Standardroute und Routing-Strategie

Im nächsten Schritt konfigurieren wir den Router. In AngularJS 1.X Anwendungen mit ngRoute ist der *#-Mode* der Standard und man kann die Verwendung von normalen URLs (mit der HTML5 History API) konfigurieren. Bei Angular legen wir zum Start unserer App mit

```typescript
provide(LocationStrategy, {useClass: HashLocationStrategy])
```

fest, dass die Hash-Methode benutzt werden soll. Dadurch entstehen die bereits aus früheren Versionen bekannten URLs, mit einem #-Symbol am Anfang der Routen (`http://xxx.xx/#/order`).

In Angular ist dagegen die **PathLocationStrategy** Standard, welche URLs ohne den Hash-Zeichen erstellt. Dazu sollte jedoch ein Basis-Pfad der App konfiguriert werden. Dieser ist dann sozusagen ein Ersatz für das #-Symbol, damit die fehlerfreie Ausführung der Anwendung gewährleistet werden kann.

```typescript
import { bootstrap, provide } from 'angular2/platform/browser';
import { APP_BASE_HREF } from 'angular2/platform/common';

import { PizzaAppComponent } from './components/app.component';

bootstrap(PizzaAppComponent, [provide(APP_BASE_HREF, {useValue: '/my/app'})]);
```

Dadurch entstehen URLs wie: `http://xxx.xx/my/app/order`

Als Kurzform kann die Standardroute auch über ein spezielles Attribut in der Routen-Konfiguration gesetzt werden. Dadurch kann die Definition einer Weiterleitungs-Route auf eine andere entfernt werden.

```typescript
@RouteConfig([
  { path: '/order', name: 'Order', component: OrderComponent, useAsDefault: true },
  { path: '/about', name: 'About', component: AboutComponent }
])
```

Abschließen muss die Datei `boot.ts` als Einstiegspunkt in der `index.html` gesetzt und der Tag zum Einbinden der App eingefügt werden.

```html
<body>
  <div class="container">
      <pizza-app></pizza-app>
  </div>
</body>
```

#### Child-Routes

Eine geniale Neuerung im Routing von Angular sind die sogenannten Child-Routen. Dadurch lassen sich für eine bestehende Komponente eigene Sub-Routen definieren. Daraus ergeben sich zwei grundlegende Vorteile.

 1. modulares Definieren von Routen (kapseln kompletter Components)
 2. Auslagerung komplexer Inhalte einer Component in Child-Components/Routes

Als Beispiel bekommt die About-Route eine Child-Route, die sich darum kümmert, dass ein bestimmter Teil des Inhaltes aus einer anderen Komponente geladen wird. Dafür müssen wir drei Sachen anpassen:

 1. Erstellen einer Pizza-Komponente
 2. Pizza-Komponente definiert zwei Child-Routes: eine Liste und eine Detail-Ansicht
 3. Child-Routen definieren und verlinken
 4. Erstellen der Basis Pizza-Route, Erlauben von Child-Routes
 5. Verlinkung in der bisherigen Anwendung erweitern

Unsere Pizza-Komponente ist im Prinzip einfach eine Hülle der Kinder-Routen. Sprich wir definieren die vorhanden Kinder und bietet diesen einen eigene Einhängepunkt.

```typescript
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {PizzaListComponent} from './list/list.component.ts';
import {PizzaDetailComponent} from './detail/detail.component.ts';

@RouteConfig([{
    path: 'list',
    component: PizzaListComponent,
    name: 'List'
}, {
    path: 'detail/:id',
    component: PizzaDetailComponent,
    name: 'Detail'
}])

@Component({
    selector: 'pizzaCmp',
    directives: [ROUTER_DIRECTIVES],
    template: '<router-outlet></router-outlet>'
})
export class PizzaComponent {}
```

Wir ihr sehen könnt, erwartet die Detail-Route noch einen Parameter, um die Details zu einer bestimmten Pizza oder einem Angebot anzeigen zu können .

Die `PizzaListComponent` enthält nichts aufregendes und ist der OrderComponent sehr ähnlich. Der entscheidende Unterschied ist, dass bei einem Klick auf einen Listeneintrag die entsprechende Detailseite aufgerufen werden soll.

```typescript
import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {PizzaService} from '../../../services/pizza.service';
import {Pizza} from '../../../interfaces/pizza.interface.ts';

@Component({
  selector: 'pizzaList',
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: './app/components/pizza/list/list.component.html'
})
export class PizzaListComponent {
  public pizzas: Pizza[];

  constructor(private _pizzaService: PizzaService) {}

  ngOnInit() {
    this._pizzaService.getPizza().subscribe(pizzas => this.pizzas = pizzas);
  }
}
```

Das Template dazu könnte wie folgt aussehen.

```html
<table class="table">
  <tr>
    <th>Nummer</th>
    <th>Name</th>
    <th>Preis</th>
    <th>ID</th>
    <th></th>
  </tr>
  <tr *ngFor="let pizza of pizzas; let index=index" [routerLink]="['Detail', {'id': pizza.id}]">
    <td>{{index + 1}}</td>
    <td>{{pizza.name}}</td>
    <td *ngIf="pizza.price">{{pizza.price | currency:'USD':true}}</td>
    <td *ngIf="!pizza.price">kostenlos</td>
    <td>{{pizza.id}}</td>
    <td>
      <a class="btn btn-default btn-sm">Details</a>
    </td>
  </tr>
</table>
```

Wie ihr sehen könnt, sind auch Routen gekapselt, was bedeutet, dass eine Komponente nur die Routen ihres direktiven Elternteils bzw. der umschließenden Komponente kennt. Aus diesem Grund wird die Verlinkung zur Detailseite direkt durch

```typescript
['Detail', {'id': pizza.id}]
```

hergestellt.

Die `PizzaDetailComponent` zeigt einfach nur die gegebenen Informationen eines bestimmten Angebots an. Dies geschieht über den Routen-Parameter `id`. Zusätzlich enthält das Template einen Link zurück zur Angebots-Übersicht.

```typescript
import {Component, OnInit} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {PizzaService} from '../../../services/pizza.service';
import {Pizza} from '../../../interfaces/pizza.interface.ts';

@Component({
  selector: 'pizzaDetail',
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: './app/components/pizza/detail/detail.component.html'
})
export class PizzaDetailComponent {
  public pizza: Pizza;
  private _pizzaId: Number
  private _getPizza(pizzas: Array<Pizza>) {
    var i = 0;

    for (i; i < pizzas.length; i = i + 1) {
      if (pizzas[i].id === this._pizzaId) {
        this.pizza = pizzas[i];
        return;
      }
    }
  }

  constructor(private _pizzaService: PizzaService, private _routeParams: RouteParams) {
    this._pizzaId = parseInt(_routeParams.get('id'), 10);
  }

  ngOnInit() {
    this._pizzaService.getPizza().subscribe(pizzas => this._getPizza(pizzas));
  }
}
```

Das entsprechende Template könnte dann so aussehen:

```html
<div *ngIf="pizza">
  <a [routerLink]="['List']">< zurück</a>
  <h3>{{pizza.id}} {{pizza.name}}</h3>
  <p *ngIf="pizza.price">{{pizza.price | currency:'USD':true}}</p>
  <p *ngIf="!pizza.price">kostenlos</p>
</div>
```

Der nächste Schritt ist schnell erledigt. Damit Angular überhaupt akzeptiert, dass eine Route Child-Routen besitzt, muss die Eltern-Route mit `'/...'` enden. Die Definition unserer Pizza-Route sieht dann wie folgt aus:

```typescript
{ path: '/pizza/...', name: 'Pizza', component: PizzaComponent }
```

Als letzten Schritt muss die Verlinkung im Template über `routerLink` hinzugefügt werden. Dazu geben wir als Wert einen zweiten Array-Eintrag mit, welcher den Namen der Child-Route beinhaltet. In diesem Fall wird diese `List` heißen.

Das Verfahren kann auch genutzt werden, um natürlich noch tiefere Verschachtelungen zu erzeugen. Dadurch haben wir als Entwickler ein mächtiges Werkzeug, um Anwendungen besser Modularisieren bzw. Funktionen einfach kapseln zu können.

Es müssen nicht alle Routen in einer Komponente definiert werden.

#### Routing-Hooks

Natürlich bietet Angular auch mit dem neuen Routing Einhängepunkte, um auf diverse Routing-Zustände reagieren zu können.

  - **routerOnActivate**
    - wird aufgerufen, wenn die mit der Komponente verknüpfte Route aktiv wird
  - **routerCanReuse**
    - Gibt an, ob die aktuelle Instanz wiederverwendet werden soll
    - Rückgabewert kann ein Boolean oder ein Promise-Objekt sein
  - **routerOnReuse**
    - Funktion die ausgeführt wird, wenn die aktuelle Instanz wiederverwendet wird
  - **routerCanDeactivate**
    - Gibt Boolean oder Promise zurück
    - Route wird nur dann verlassen, wenn die Funktion `true` oder das Promise erfüllt (resolved) wird
  - **routerOnDeactivate**
    - wird vor dem Verlassen der Route ausgeführt
    - Gibt ein Promise zurück
    - Kann den Route-Wechsel solange verzögern bis das Promise erfüllt (resolved) wird

Alle Funktionen erhalten zwei Parameter:

  - **nextInstruction**
    - Objekt mit Informationen zur aktuellen Route z.B. Parameter und URL
  - **prevInstruction**
    - Objekt mit Informationen zur vorherigen Route (falls vorhanden) z.B. Parameter und URL

Als kleines Beispiel kann in einer Komponente einfach auf die Funktionen zugegriffen werde.

```typescript
routerOnActivate(nextInstruction, prevInstruction) {
  console.log(nextInstruction, prevInstruction);
}
```

Zusätzlich kann einer Komponente der *Decorator* `@CanActivate` angegeben werden. Dieser erwartet eine Funktion welche einen booleschen Wert oder ein Promise-Objekt zurückgibt. Wird das Promise abgelehnt (rejected) oder `false` zurückgegeben, wird die Komponente nicht eingehangen/ausgeführt. Der Decorator übernimmt damit die Funktion der *resolve*-Eigenschaft einer Route in AngularJS 1.

```typescript
@CanActivate(() => {
  // if false --> OrderComponente is not executed
  return true;
})
export class OrderComponent() {}
```

### Fazit

Es hat sich allein in den letzten Wochen viel beim Thema Routing getan. Aber wer das Routing von AngularJS 1.x verstanden hat, wird Ähnlichkeiten erkennen. Anwendung und die vorhandenen Standardkomponenten ähneln den bisher bekannten sehr. Des Weiteren fällt auf, dass gut gepflegte Apps wohl sehr wenig Probleme beim Upgrade auf Angular haben werden. Wie der Artikel zeigt, bemüht sich das Angular-Team Erkenntnisse und Neuerungen auch in die erste Version des Frameworks einzubringen. Dadurch können neue Paradigmen, wie Components oder das flexible Definieren von Routen bereits jetzt angewandt werden. Ob das finale Routing jedoch wirklich so aussehen wird, steht noch in den Sternen.
