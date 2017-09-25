---
title: "Migration AngularJS zu Angular"
description: "Migration mit ngUpgrade leichtgemacht. Eine Zusammenfassung über alle wichtigen Schritte, wie ihr eure AngularJS App zu einer Angular2 App migrieren könnt."
author: "Jonathan Schneider"
slug: "ngupgrade-migration-angularjs-angular"
published_at: 2016-10-04 00:00:00.000000Z
categories: "angularjs angular angular2 angular4 migration"
header_image: "/artikel/header_images/ngupgrade-migration-angularjs-angular2.jpg"
---

Die Migration einer AngularJS- zu einer Angular2-Anwendung wurde in der Vergangenheit oftmals als großes Problem und Schwierigkeit bezeichnet. Code müsste weggeschmissen werden, alles wäre anders und TypeScript wird noch oben drauf gesetzt. Panisch zu reagieren und das Schlimmste zu befürchten ist aber nicht der beste Weg. Wie schauen uns im folgenden Artikel an, wieso wir keine Angst vor der Migration haben müssen und wieso es doch viel einfacher funktioniert, als vorher gedacht.

## Voraussetzung für ein Upgrade

Eine Migration muss natürlich immer gut geplant werden und es müssen zuvor die benötigten Mindestvoraussetzungen geschaffen werden. Damit ihr einen Überblick erhaltet, schauen wir uns nun diese an.

Um eine Migration starten zu können, müssen wir unsere AngularJS-Anwendung zuvor auf die Version 1.5 oder höher upgraden. Dies ist elementar wichtig, da nicht nur Angular2 weiterentwickelt wird, sondern auch viele Konzepte noch in AngularJS einfließen, die für die Migration benötigt werden.

### Unterschiede mit Components
Der Kernunterschied von Angular2 zu AngularJS ist, dass die ganze Applikation in Components aufgeschlüsselt wird und es dabei keine eigenständige Controller oder Directives mit Template mehr gibt. Diese werden in Angular2 durch Components ersetzt. Components können wiederum Child-Components enthalten und erlauben uns somit die Funktionalität in kleine wartbare und wiederverwendbare Container zu verschachteln.

![Component Struktur](medium_Screen-Shot-2016-09-11-at-15.42.31.png?v=63640820603)

Ab der AngularJS 1.5 Version können Components  erstellt werden, die maßgeblich wichtig für die Migration sind. Besteht unsere Logik bereits aus Components, haben wir den größten Teil der Migration fast schon erledigt. Sollten wir noch eine unfertige Applikation besitzen, die noch mit Directives oder reinen Controllers arbeitet, müssen wir an diesen Stellen auf Components umsteigen.

```javascript
.component('bookTitle', {
  templateUrl: 'book/book-title.component.html',
  bindings: { 'font': '<' }
  controller: function () {
    this.title = 'An awesome book';
  }
}
```

So werden alle Direktiven mit einem eigenen Template zu Components und ein Controller wird zu einer Component mit einem entsprechenden Template.

### Unterschiede mit Services
Factorys waren zudem in AngularJS früher eine sehr beliebtes Konzept. Einfach und schnell konnten wir Service generieren und diese benutzen. Mit TypeScript und Angular2 rückt dies aber immer mehr in den Hintergrund und alle Factorys sollten direkt als Service bereitgestellt werden. Dies hat den Hintergrund, dass wir in Angular2 mit TypeScript nur noch Services erstellen, die Klassen zurückgeben und wir uns den Umweg über die Factorys sparen können.

```typescript
.service('bookService',
   class BookService {
      getTitle () {
         return 'An awesome book';
    }
  }
);
```

Zusätzlich, zu dem Verzicht von Directives, Controller und Factorys, sollte auch der neue Component-Router bereits integriert sein. Dieser löst viele Probleme vom alten ngRouter und vereinfacht wiedermal die Migration von AngularJS auf Angular2. Früher wurde global der ngRouter definiert und erhielt  einzeln jeden Path. Wurde eine Route geändert, musste der Path händisch in jedem View geändert werden. Mit dem neuen Component-Router, wird innerhalb der Component der Router definiert und über den ng-link auf den Path zugegriffen. Damit kann sich der Path jederzeit ändern – solange der Name (Identifikator) gleichbeleibt.

```javascript
.component('Books', {
  $routeConfig: [
    {
      path: '/books',
      component: 'bookIndex',
      name: 'BookIndex'
    },
  ]
});
```

Was sicherlich auch immer hilfreich ist, sich den [Style-Guide](https://angular.io/), von dem Angular2-Core-Team, anzuschauen. Natürlich bezieht sich der Style-Guide auf Angular2, trotzdem können viele Prinzipien auch für AngularJS übernommen werden – der Migration kann es nur helfen.

## Die Migration: Big-Bang oder Baby-Steps

Bevor wir beginnen, muss man sich natürlich Gedanken machen, ob sich eine Migration lohnt. Besitzen wir nur eine kleine Applikation und hätten sogar Spaß daran, alles neu in Angular2 zu programmieren, muss es nicht immer eine Migration sein. Hier sollten wir lieber die Big-Bang-Strategie verfolgen.

Ist unsere Applikation aber sehr komplex, sollte wir tendenziell eher zur Baby-Steps-Strategie greifen und eine Migration vorziehen.

Für die Big-Bang-Strategie gibt es keine weitere Erläuterung. Der Code wird weggeschmissen und wir fangen von vorne an.

Hingegen die Baby-Steps-Strategie ihren Namen erhalten hat, da wir die Applikation in kleinen einfachen Schritten immer weiter migrieren. Grundsätzlich kann gesagt werden, was mit AngularJS funktioniert hat, lässt sich auch mit Angular2 bewerkstelligen.

![AngularJS to Angular 2 Migration Process](medium_Screen-Shot-2016-09-11-at-15.36.50.png?v=63640820242)

Um die Migration zu starten, müssen wir zuvor Angular2 in unsere AngularJS integrieren und das Modul ngUpgrade installieren.

```javascript
import { UpgradeAdapter } from '@angular/upgrade';
const upgradeAdapter = new UpgradeAdapter();
```

### Migration von Components
Nach und nach können nun unsere AngularJS-Components in neue Angular2-Components migrieren.

![Migration AngularJS Components zu Angular 2](medium_Screen-Shot-2016-09-11-at-15.47.44.png?v=63640820915)

Der große Vorteil: Sobald wir eine Component übersetzt haben, können wir die Angular2-Component wieder mit Hilfe des ngUpgrade-Moduls in unserer AngularJS-Applikation lauffähig machen.

```javascript
import { HeroDetailComponent } from './hero-detail.component';
angular
 .module('heroApp', [])
 .component('heroDetail',
   upgradeAdapter.downgradeNg2Component(HeroDetailComponent)
 );
```

Es kann natürlich auch mal passieren, dass wir eine neue Angular2-Component erstellt haben, die noch alte Abhängigkeiten besitzt und auf eine AngularJS-Component zugreift - Stichwort Child-Components. Mit dem ngUpgrade-Modul können wir ganz einfach ein Upgrade durchführen, um unsere alte AngularJS-Component in der neuen Angular2-Component nutzen zu können.

```javascript
const HeroDetail = upgradeAdapter.upgradeNg1Component('heroDetail');

@Component({
 selector: 'my-container',
 template: `<hero-detail></hero-detail>`,
 directives: [HeroDetail]
})
```

### Migration von Services
Somit hätten wir jetzt für die View die Kompatibilität hergestellt und müssen noch für die Services dies bereitstellen.
Hierfür wird der neu erstellte Angular2-Service einfach als downgrade mit einer AngularJS-Factory initialisiert.

```javascript
upgradeAdapter.addProvider(Heroes);

angular.module('heroApp', []) .factory('heroes', upgradeAdapter.downgradeNg2Provider(Heroes))
```

Natürlich funktioniert dies auch andersherum, um einen AngularJS-Service in Angular2 bereitzustellen.

```javascript
angular.module('heroApp', []).service('heroes', HeroesService)

upgradeAdapter.upgradeNg1Provider('heroes');

export class HeroDetailComponent {
  constructor(@Inject('heroes') heroes) {
  …
  }
}
```

![Anmeldung am jeweiligen Root-Injector](medium_Screen-Shot-2016-09-11-at-15.49.44.png?v=63640821011)

### Change Detection

View & Logic sind zwischen den Schnittstellen verknüpft, aber wie löst man das Problem der Change-Detection - ohne auf den alten $scope zuzugreifen? 
Kein Problem für ngZone, welches sich zwischen dem Browser-Event-Handler und der Applikation als Zwischenschicht legt. 
Hier werden alle Events abgefangen, die in  AngularJS und Angular benutzt werden können.

![Change-Detection mit ngZone](medium_Screen-Shot-2016-09-11-at-15.53.02.png?v=63640821222)


### TypeScript

Denkt dran im gleichen Zug auch einen TypeScript-Compiler vor euren Code zu schalten, um bereits mit den Klassen innerhalb der Service arbeiten zu können. Da am Ende sowie immer der gleiche funktionierende ES5-JavaScript-Code exportiert wird.

## Fazit

Eine Migration muss nicht immer schwierig sein. Natürlich müssen gewisse Vorkehrungen getroffen werden, um eine Migration durchzuführen. Trotzdem ist es kein Beinbruch und wir können viele Teile unsere Applikation wiederverwenden.
