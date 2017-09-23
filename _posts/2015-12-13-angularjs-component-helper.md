---
title: "Der AngularJS Component Helper"
description: "In AngularJS 1.5 wurden die Components eingeführt. Lernt wozu sie gut sind und warum ihr sie nutzen sollten. Macht eure Projekte bereit für Angular Version 2+"
author: "Robin Böhm"
slug: "angularjs-component-helper"
published_at: 2015-12-13 19:58:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-component-helper.jpg"
---

In diesem Artikel stelle ich euch den neuen Component-Helper vor. Wie uns der aktuelle [Changelog] verrät ist dieser nun endlich mit der Version 1.5.0-beta2 im Framework gelandet. Dieser ermöglicht euch eine sehr handliche schreibweise von Komponenten. Die Syntax ist hierbei sehr an den @Component-Decorator von Angular angelehnt.

```javascript
angular.module('myMod').component('myComp', {
  template: '<div>My name is {{$ctrl.name}}</div>',
  bindings: { name: '=' }
});
```

Ihr könnt die komplette Diskussion zu diesem Feature Request im Github [Issue] nachlesen. In folgender Tabelle sehr ihr eine Übersicht der wichtigsten Konfigurationen. Die komplette Beschreibung könnt ihr in der [API Doc] nachlesen.


 Name | Description | Default
 | ---|:---:| ---:|
 bindings| Define DOM attribute binding to component properties. | { }
template | Template as string | ' ' (Empty String)
templateUrl | Template via URL | undefined
transclude | Access innerHTML | true
controller | Define a constructor function | function(){ }
controllerAs | An identifier name for a reference to the controller. | $ctrl

<br/>

Der Component-Helper bietet euch hierbei einen einfachen Wrapper für mit der Zeit recht komplex gewordene `.directive(...)` Funktion. Er ist ist also so ähnlich zu verstehen wie die Factory-, Service-, Value-Helper für die `.provider(...)` Funktion. Ihr könnt dieses Thema in unserem [Buch](/buecher/angularjs-buch/services/) nachlesen falls Ihr noch nicht wisst worüber ich rede.

Neben der Reduzierung von Komplexität ermöglicht uns der Helper ebenfalls das einfache Einhalten von **Best Practices** und nährt sich der Definition von Direktiven und Komponenten von Angular2 an. *Direktiven* sind hierbei generelle HTML-Erweiterung, welche Verhalten kapseln. *Komponenten* sind eine spezielle Art von Direktiven, welche ein eigenen (Shadow-)DOM besitzen und UI Widgets oder Anwendungs-Komponenten darstellen. Somit ist dies ein weiterer Schritt zur immer sanfter werdenden Migration zu Angular2.

```javascript
// AngularJS 1.4.x way to create a component
angular.module('X')
  .directive('myComponent', function(){
    return {
      scope: {},
      template: '<div>{{$ctrl.data.name}}</div>',
      bindToController: {
        data: '='
      },
      controller: function(){},
      controllerAs: '$ctrl'
    }
  });

// AngularJS 1.5.x way to create a component
angular.module('X')
  .component('myComponent',{
    template:'<div>{{$ctrl.data.name}}</div>',
    bindings: {
      data: '='
    }
  });
```

Die beiden hier gezeigten Varianten erstellen eine identische Komponente. Wir müssen allerdings nichtmehr den ganzen *Boilerplate-Code* schreiben der mittlerweile eigentlich bei 90% der in AngularJS erstellten Direktiven immer wieder kopiert wurde. Und genau DAS ist was AngularJS meiner Meinung nach groß gemacht hat. Löse deine fachlichen Anforderungen ohne dich ständig durch Copy&Paste Kämpfen zu müssen und konzentriere dich auf das wesentliche. Die Einführung der `.component(...)` Funktion ist hierbei wieder ein Schritt in die richtige Richtung.

## Tip für TypeScript Nutzer

Ihr könnt euch nun sehr einfach ein eigenen Decorator schreiben, mit dem Ihr heute schon nahezu die Angular2 Syntax in euren AngularJS Anwendungen benutzen könnt. In unseren Projekten sieht das z.B. so aus:

```typescript
@Component({
  selector: 'group-overview',
  providers: ['$http', 'MyDataService'],
  bindings: {
    group: BoundedAs.Binding
  },
  templateUrl: 'group-overview/group-overview.component.html'
})
class GroupOverviewCmp{ ... }
```

## Fazit

Die `.component(...)` Funktion vereinfacht die Erstellung von Komponenten ungemein und ermöglicht das sehr einfache einhalten von **Best Practices**. Es stellt eine wichtige Verbindung zu den Konzepten von Angular her und geht somit weiter in die Richtung der immer sanfter werdenden Migrationsmöglichkeiten. In Verbindung mit TypeScript und dem `@Component` Decorator kann man den nächsten Schritt ebenfalls sehr einfach erreichen. Wer die Möglichkeit hat sollte auf jeden Fall auf die Version 1.5.x upgraden oder sein neues Projekt hiermit starten.

[API Doc]: <https://docs.angularjs.org/api/ng/type/angular.Module#component>
[Issue]: <https://github.com/angular/angular.js/issues/10007>
[Changelog]: <https://github.com/angular/angular.js/blob/master/CHANGELOG.md#150-beta2-effective-delegation-2015-11-17>
