---
title: "Signal Inputs: Jetzt wird die Kommunikation zwischen Eltern- und Kindelementen noch einfacher"
description: "Signal Inputs in Angular: Vereinfachte Parent-Child-Kommunikation mit deklarativem, reaktivem Ansatz für eine bessere Developer Experience."
author: "Lulëzim Ukaj"
co_author: "David Müllerchen"
published_at: 2024-05-02 09:27:00.000000Z
header_source:
header_image: header.jpg
categories: "angular signals input output"
---




Mit einem Minor Update der Version 17 hat das Angular-Team ein neues Feature, [Signal Inputs](https://angular.dev/guide/signals/inputs#monitoring-changes), eingeführt. Die neuen Inputs sind eine reaktive Alternative zum traditionellen [@Input()-Dekorator](https://angular.dev/api/core/Input#) und machen es Entwicklern nun noch leichter, Daten zwischen Parent- und Child-Komponenten zu übertragen. Das Feature befindet sich zwar noch in der Developer Preview, dennoch ist der neue deklarative Ansatz bereits ein voller Erfolg in der Angular Community. Das ist ein guter Grund, uns das Ganze mal näher anzusehen.


## Der @Input-Dekorator

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Infografik, die den Data Flow von einer Parentkomponente zur Childkomponente darstellt"
class="lazy img-fluid img-rounded" data-src="2.jpg" data-srcset="2.jpg"
/>
</p>


Der [@Input()-Dekorator](https://angular.dev/guide/components/inputs#customizing-inputs)  ist eines der meistgenutzten Features in Angular. Er ermöglicht es, Daten von einer Eltern- an ihre Kinderkomponente zu übertragen. Das ist einer der technischen Grundbausteine für wiederverwendbare und modulare UI-Komponenten und damit für skalierbare Web-Anwendungen in Angular. Traditionell gab es immer einiges manuell einzustellen und zu managen, wenn es darum ging, ein performantes State Management zu implementieren. Das ist zeitintensiv und erfordert auch tiefgreifende Kenntnisse der Web-Entwickler*innen.


Um das Ganze verständlicher zu machen, betrachten wir ein einfaches Beispiel:

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Grafische Darstellung einer Grußkarten Web-Anwendung bestehend aus zwei select-Elementen und einer Textbox"
class="lazy img-fluid img-rounded" data-src="1.jpg" data-srcset="1.jpg"
/>
</p>



Unsere Anwendung besteht aus zwei Dropdown-Menüs (`<select>`-Elementen) und soll einem Unternehmen helfen, Glückwunsch- oder Beileid-Nachrichten zu verfassen. Das erste Dropdown enthält eine Liste von Mitarbeitern, und das zweite Dropdown eine Liste von Anlässen wie Geburtstag, Todesfall, Geburt und Urlaub. Wir haben unsere Angular-Anwendung in eine Parent- und eine Child-Komponente aufgeteilt. Die Parent-Komponente (CongratsParentComponent) verwaltet die Auswahl von Namen und Anlässen aus den Dropdown-Menüs und gibt diese Werte an die Child-Komponente weiter. Die Child-Komponente (CongratsChildComponent) empfängt die ausgewählten Werte als Inputs und generiert eine passende Nachricht.


### Elternkomponente (ParentComponent)


```typescript
import { Component } from '@angular/core';


@Component({
  selector: 'app-congrats-parent',
  template: `
    <h2>Glückwunsch-Generator</h2>
    <app-congrats-child [selectedEmployee]="selectedEmployee" [selectedReason]="selectedReason"></app-congrats-child>
    <select [(ngModel)]="selectedEmployee">
      <option *ngFor="let employee of employees">{{employee}}</option>
    </select>
    <select [(ngModel)]="selectedReason">
      <option *ngFor="let reason of reasons">{{reason.label}}</option>
    </select>
  `
})
export class CongratsParentComponent {
  selectedEmployee: string;
  selectedReason: { value: string; label: string };
  employees = ['Max Mustermann', 'Erika Musterfrau', 'John Doe'];
  reasons = [
    { value: 'birthday', label: 'Geburtstag' },
    { value: 'death', label: 'Todesfall' },
    { value: 'birth', label: 'Geburt' },
    { value: 'vacation', label: 'Urlaub' }
  ];


  constructor() {
    this.selectedEmployee = this.employees[0];
    this.selectedReason = this.reasons[0];
  }
}
```


### Kindkomponente (ChildComponent)


```typescript
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-congrats-child',
  template: `
    <div>
      <p>Generierte Nachricht:</p>
      <p>{{ generateMessage(selectedEmployee, selectedReason.value) }}</p>
    </div>
  `
})
export class CongratsChildComponent {
  @Input() selectedEmployee: string;
  @Input() selectedReason: { value: string; label: string };


  generateMessage(employee: string, reason: string): string {
    switch(reason) {
      case 'birthday':
        return `Herzlichen Glückwunsch zum Geburtstag, ${employee}!`;
      case 'death':
        return `Unser tiefstes Beileid zum Verlust, betreffend ${employee}.`;
      case 'birth':
        return `Herzlichen Glückwunsch zur Geburt, ${employee}!`;
      case 'vacation':
        return `Schönen Urlaub, ${employee}!`;
      default:
        return 'Bitte wählen Sie einen Mitarbeiter und einen Grund aus.';
    }
  }
}
```


## Wie machen Signal Inputs das Ganze leichter?


Die neuen Signal Inputs in Angular machen es für Entwickler um einiges leichter, mit dynamischen Komponenten zu arbeiten.

Anstatt wie in unserem Codebeispiel den @Input()-Dekorator und einen OnChanges-Lifecycle-Hook zu verwenden, bieten Signal Inputs eine direkte und reaktive Alternative.


Hier kannst du übrigens [unser Codebeispiel auf Stackblitz](https://stackblitz.com/edit/stackblitz-starters-3cb1y5?file=src%2Fcongrats-child.component.ts) ansehen! Kudos wieder an Webdave!


### Elternkomponente (ParentComponent) mit Signal Inputs


```typescript

import { Component, signal } from '@angular.core';
import { CongratsChildComponent } from './congrats-child.component';


@Component({
  selector: 'app-congrats-parent',
  standalone: true,
  imports: [CongratsChildComponent],
  template: `
    <h2>Grußkarten-Generator</h2>
    <app-congrats-child
      [employee]="selectedEmployee()"
      [reason]="selectedReason()"
    ></app-congrats-child>
    <select #employeeSelect (change)="selectedEmployee.set(employeeSelect.value)">
      <option *ngFor="let emp of employees">{{emp}}</option>
    </select>
    <select #reasonSelect (change)="selectedReason.set(reasonSelect.value)">
      <option *ngFor="let reason of reasons">{{reason.label}}</option>
    </select>
  `,
})
export class CongratsParentComponent {
  employees = ['Max Mustermann', 'Erika Musterfrau', 'John Doe'];
  reasons = [
    { value: 'birthday', label: 'Geburtstag' },
    { value: 'death', label: 'Todesfall' },
    { value: 'birth', label: 'Geburt' },
    { value: 'vacation', label: 'Urlaub' },
    { value: null, label: 'none' },
  ];


  selectedEmployee = signal<string>(this.employees[0]);
  selectedReason = signal<{ value: string | null; label: string }>(this.reasons[0]);


  setSelectedReason(i: string) {
    this.selectedReason.set(this.reasons[parseInt(i, 10)]);
  }
}
```


### Kindkomponente (ChildComponent) mit Signal Inputs


```typescript
import { Component, computed, effect, input } from '@angular.core';


@Component({
  selector: 'app-congrats-child',
  standalone: true,
  template: `
    <div>
      <p>Generierte Nachricht:</p>
      <p>{{ message() }}</p>
    </div>
  `,
})
export class CongratsChildComponent {
  employee = input<string>();
  reason = input<{ value: string | null; label: string }>({
    value: '', label: ''
  });


  e = effect(() => {
    const { value } = this.reason();
    if (!value) {
      alert('Ein Glückwunsch-Grund muss angegeben werden!');
    }
  });


  message = computed(() => {
    if (!this.employee() || !this.reason()) {
      return 'Bitte wählen Sie einen Mitarbeiter und einen Grund aus.';
    } else {
      switch(this.reason()?.value) {
        case 'birthday':
          return `Herzlichen Glückwunsch zum Geburtstag, ${this.employee()}!`;
        case 'death':
          return `Unser tiefstes Beileid zum Verlust, betreffend ${this.employee()}.`;
        case 'birth':
          return `Herzlichen Glückwunsch zur Geburt, ${this.employee()}!`;
        case 'vacation':
          return `Schönen Urlaub, ${this.employee()}!`;
        default:
          return '';
      }
    }
  });
}
```


Anstatt auf Änderungen manuell mit ngOnChanges zu reagieren, geben die Signal Inputs die aktuellen Werte von employee und reason automatisiert weiter. Dies vereinfacht die Implementierung und macht den Code kürzer, sauberer und intuitiver.

## Optionale vs. erforderliche Inputs
Angular unterscheidet klar zwischen optionalen und erforderlichen Signal Inputs.
### Optionale Inputs
Optionale Signal Inputs müssen nicht verwendet werden und können undefined sein.
Das ist für Szenarien gedacht, in denen Daten nicht an die Elternkomponente übergeben werden müssen. Beispielsweise hat das Input einen Default-Wert, der noch überschrieben werden kann. Das geschieht dann mit Hilfe der input()-Funktion.

**Außerdem wichtig:**

Wenn kein Wert angegeben wird, verwendet Angular per Default “undefined” als Wert.


Zurück zu unserem Beispiel: Angenommen, die Auswahl eines Mitarbeiters ist optional. Bei bestimmten Anlässen, wie bei einem Todesfall, soll der Name handschriftlich notiert werden:
```typescript
class CongratsChildComponent {
  employee = input<string | undefined>(undefined);
}
```




### Erforderliche Inputs
Erforderliche Signal Inputs hingegen müssen genutzt werden. Diese Inputs werden mit der input.required()-Funktion deklariert. Hier sollen vor allem Fehler durch fehlende Daten vermieden werden.


In unserem Beispiel muss der Anlass für unsere Glückwunschkarte immer angegeben werden:


```typescript
class CongratsChildComponent {
  reason = input.required<{ value: string; label: string }>();
}
```


## Aliasing von Inputs
Aliasing ermöglicht es dir, ein Input in der Parent-Komponente einen anderen Namen zu geben als in der Child-Komponente. Das hat den Vorteil, dass du die Namen verwenden kannst, die am besten zum internen Kontext oder zur Logik deiner Komponenten passen. In unserem Beispiel möchtest du den selectedEmployee-Input in der Child-Komponente als employeeName nutzen. Das kannst du über die Alias-Funktion der input()-Methode erreichen.

Betrachten wir wieder unser Grußkarten-Beispiel:


```typescript
// In der Kindkomponente
employeeName = input<string>('', { alias: 'selectedEmployee' });
generateMessage() {
  return `Herzlichen Glückwunsch, ${this.employeeName()}!`;
}


// In der Elternkomponente
<app-congrats-child [selectedEmployee]="selectedEmployee"></app-congrats-child>
<!-- Rest des Templates →


```


Das Aliasing kann in bestimmten Fällen sinnvoll sein, um zum Beispiel Namenskonflikte zu vermeiden oder für Refactoring-Arbeiten.

**ABER!**

Hier verweisen wir euch auf den Style Guide in der Angular Dokumentation:

[Style 05-13: Avoid aliasing inputs and outputs](https://angular.dev/style-guide#avoid-aliasing-inputs-and-outputs)


Generell gilt, bei Aliases für @input - und @ output - Dekoratoren vorsichtig zu sein. Zwei unterschiedliche Namen für die gleiche Property stiften im Team eher Verwirrung als sie Nutzen bringen. Der Styleguide empfiehlt nur dann ein Alias nur in einem einzigen Fall zu ​​verwenden, und zwar wenn der Direktivenname auch eine Input Property ist und der Direktivenname die Property nicht beschreibt!


## Ableiten von Werten (Deriving)
Das Ableiten von Werten (Deriving) mit Signal Inputs ermöglicht es, abgeleitete States oder Werte dynamisch zu erzeugen. Mit Hilfe der computed-Funktion lassen sich leicht neue, abgeleitete States erzeugen, ohne dass sie manuell eingestellt werden müssen.

In unserem fiktiven Beispiel könnten wir die computed-Funktion nutzen, um anhand des Mitarbeitergeschlechts unsere Glückwunschnachricht entsprechend abzuleiten. Je nachdem, ob der Name mit einem "a" endet (weiblich), soll die Grußbotschaft ein "liebe" oder "lieber" vor dem Text setzen:


```typescript
message = computed(() => {
  if (!this.employee() || !this.reason()) {
    return 'Bitte wählen Sie einen Mitarbeiter und einen Grund aus.';
  } else {
    switch (this.reason()?.value) {
      case 'birthday':
        return `Herzlichen Glückwunsch zum Geburtstag, ${this.employee()}!`;
      case 'death':
        return `Unser tiefstes Beileid zum Verlust, betreffend ${this.employee()}.`;
      case 'birth':
        return `Herzlichen Glückwunsch zur Geburt, ${this.employee()}!`;
      case 'vacation':
        return `Schönen Urlaub, ${this.employee()}!`;
      default:
        return '';
    }
  }
});
```


Die computed Funktion ermöglicht es, dynamisch abgeleitete States effizient zu verwalten. Das vereinfacht das Arbeiten mit interaktiven Anwendungen deutlich. Zudem wird dein Code lesbarer, indem klar zwischen statischen und dynamischen Zuständen getrennt wird.


## Monitoring (Überwachen von Änderungen)

Das Monitoring ist das A und O der reaktiven Programmierung in Angular. Eine zentrale Rolle spielt hier die effect-Funktion. Sie hilft dir, Aktionen oder Effekte auszulösen, sobald sich der Wert eines Signal Inputs ändert. Das ist besonders nützlich, wenn die Benutzeroberfläche automatisch aktualisiert werden soll oder in unserem Beispiel eine Notification an den User gegeben werden soll. Was passiert, wenn wir vergessen, einen Grund auszuwählen? Unsere Anwendung erzeugt eine Fehlermeldung! Diese Warnung soll als Popup (alert) angezeigt werden. Sie kann aber auch als sichtbare Nachricht im Benutzerinterface erscheinen.


```typescript
reasonEffect = effect(() => {
  const { value } = this.reason();
  if (!value) {
    alert('Ein Grund muss angegeben werden!');
  }
});
```


Das Monitoring über Signal Inputs in einer Anwendung bietet eine Reihe von Vorteilen. Zum einen werden durch das Monitoring Ressourcen geschont, da nur die View-Updates durchgeführt werden, in denen sich tatsächlich etwas ändert. Im Gegensatz dazu prüft Angular im Default Mode bei einem Auslöser den gesamten Komponentenbaum der App auf Änderung. Der andere große Vorteil ist, dass keine onPush Change Detection mühsam manuell implementiert werden muss. Diese automatische Aktualisierung verbessert die Benutzererfahrung, indem sie die Anwendung reaktiv und aktuell hält. Zudem trägt es zur Fehlerminimierung bei, indem es sicherstellt, dass alle erforderlichen Daten vorhanden sind, bevor weiterführende Aktionen ausgeführt werden, was letztlich die Zuverlässigkeit der Anwendung steigert. Das führt zu einer deutlich entspannteren Entwickler-Experience.
## Werttransformation
Die Transform-Funktion bei Signal Inputs in Angular dient dazu, Eingabewerte in Echtzeit zu modifizieren oder zu normalisieren, bevor sie weiterverarbeitet werden. Ein Beispiel dafür ist die Umwandlung von Datumsangaben in ein einheitliches Format. Das ist besonders nützlich im internationalen Umfeld und reduziert die Komplexität in den Komponenten. Nehmen wir an, unsere Glückwunsch-Anwendung erhält das Geburtsdatum eines Mitarbeiters in verschiedenen internationalen Formaten. Die Transform-Funktion könnte verwendet werden, um das Datum in ein einheitliches Format umzuwandeln, bevor es in einer Nachricht verarbeitet oder angezeigt wird:
```typescript
birthDate = input('', {
  // Transformiert das Datum ins deutsche Format
  transform: (date: string) => new Date(date).toLocaleDateString('de-DE'),
});
```


## Fazit und Ausblick auf Signal Inputs

Signal Inputs in Angular bieten ein neues Tool fürs Data Binding und State Management in komplexen Webanwendungen. Der große Vorteil der neuen Inputs liegt in ihrer reaktiven Natur. Anders als traditionelle @Input-Dekoratoren ermöglichen Signal Inputs eine automatische Change Detection. Das vereinfacht die Implementierung von dynamischen Benutzeroberflächen. Das wiederum spart Zeit und Ressourcen.


Die Signal sind Input sind ein weiterer Beweis, welchen Stellenwert die Developer Experience für das Angular Team dieses Jahr bekommen hat. Wir haben hier bereits oft davon gesprochen, eine verbesserte Developer Experience ist eines der Hauptziele dieses Jahr. Viele der neuen Angular Features müssen unter diesem Aspekt betrachtet werden. Während die Anforderungen an und die Komplexität der Webanwendungen gerade eher exponentiell zu steigen scheinen, reduzieren Signal Inputs den Boilerplate-Code. Das ist frischer Wind und macht Spaß.
Keep the Flow, Angular!


## Werde Teil unserer Community


Wie immer laden wir euch ein, Teil unserer [Angular Community auf Discord](https://workshops.de/join-discord) zu werden. Seit 2013 bieten wir euch hier Tutorials, Artikel und Schulungen rund um das Angular Framework. Gestartet durch unsere Begeisterung für die modernen Möglichkeiten der Webentwicklung hat sich mittlerweile eine ganze Community dazu entwickelt. Mit mittlerweile 18 Meetups, die insgesamt über 10.000 Angular-Entwickler*innen:innen als Plattform für regelmäßigen Austausch dienen, sind wir damit in Europa die Region mit den meisten Angular-Entwickler*innen.
[Werde Teil unserer Community!](https://workshops.de/join-discord)

