---
title: Developer Ergonomics mit Angular Signals
description: "Warum das Angular-Team auf Signals setzt: Einsatz in Deiner Anwendung und Auswirkungen auf die Zukunft von RxJS in Angular."
author: "Philipp Escher"
published_at: 2023-08-23 15:00:00
header_source: https://unsplash.com/de/fotos/xXiKQ2AavlY
header_image: header.jpg
categories: "angular signals update"
---

## Das Angular 16 Update

Vielleicht hast Du es mitbekommen: Mit Angular 16 wurde das, gemessen am Umfang, größte Update nach dem initialen Release von Angular veröffentlicht. Neben Features wie [Non-Destructive Hydration](https://blog.angular.io/angular-v16-is-here-4d7a28ec680d#:~:text=of%20full%20app-,non%2Ddestructive%20hydration,-!){:rel="noopener noreferrer nofollow"} oder dem Support für Typescript 5.0 enthält das Update drei Reactivity Primitives und damit einen Mechanismus für Reaktivität. Sarah Drasnger, Director of Engineering bei Google, spricht auf [Twitter bzw. X](https://twitter.com/sarah_edo/status/1628065696247857152){:rel="noopener noreferrer nofollow"} sogar von einer Angular Renaissance.

## Motivation hinter Signals

Während andere Frameworks bereits länger _Reactive Primitives_ anbieten, ist es bei Angular eine Neuheit. Signals sollen Angular leichtgewichtiger machen und in Zukunft auch ermöglichen, ohne Zone.js zu arbeiten. Mit Signals soll der Angular Change-Detection emöglicht werden, fein granularer zu arbeiten und wirklich nur Neuerungen oder Änderungen zu rendern, anstatt den kompletten Component-Tree überprüfen zu müssen.

Beim aktuellen Ansatz für Change Detection mit Zone.js ist der Trigger für Change Detection, dass sich Zone.js meldet mit der Information "Etwas `könnte` sich geändert haben". Zone.js patched die Browser-APIs und kriegt damit immer, wenn sich irgendwas ändert, was eine Änderung hervorrufen könnte (etwa ein Button-Klick), eine Benachrichtigung. Auf diese Benachrichtigung reagiert Angular mit Change Detection, denn es könnte sich etwas geändert haben. Also wird der gesamte Komponentenbaum überprüft, um zu schauen was aktualisiert werden muss. Der bisherige Ansatz für Change Detection mit Zone.js hat in der Vergangenheit sehr gut funktioniert, er bringt allerdings Nachteile mit sich, u. A. für leichtgewichtige Web Components. Mit der Idee von Signals verlässt Angular diesen Ansatz, indem es präzise weiß, was sich geändert hat und somit den Dirty-Check der ganzen Komponente überspringen kann, um direkt die Views zu aktualisieren, an denen sich etwas geändert hat.

RxJS hat in Angular Anwendungen zwei Kernaufgaben: die Koordination von asynchronen Events, also den Umgang mit Race Conditions und komplexen asynchronen Dataflows, und es ist gleichzeitig auch einfach ein reaktiver Baustein. Für das zweitere bietet Angular mit Signals eine Alternative. Während RxJS schon immer Teil von Angular war, hat sich das Angular Team entschieden mit Signals einen anderen Weg zu gehen als ein bisher bekanntes `BehaviourSubject` zu benutzen. Im weiteren Verlauf des Artikels gehe ich noch auf die Abgrenzung zu RxJS ein.

## Was sind Signals?

Ein Signal in Angular hält immer einen Wert und Konsumenten können diesen Wert lesen. Ein Signal ist ein zyklischer Prozess und jedes Mal, wenn es seinen Zyklus durchläuft, produziert er eine bestimmte Menge an Informationen.

Ist also eine bestimmte Komponente ein Consumer des Signals, weil es die Informationen benötigt, so wird der Consumer informiert über Änderungen. Wie auch RxJS implementiert ein Signal das [Observer-Pattern](https://de.wikipedia.org/wiki/Beobachter_(Entwurfsmuster)){:rel="noopener noreferrer nofollow"}, setzt dieses technisch allerdings anders um.

Angular unterscheidet bei den Signals zwischen „Writable Signals“ und „Computed Signals“.

## Nutzung von Signals

Damit Du Signals nutzen kann, brauchst du einen Workspace mit Angular 16. Signals werden als Developer Preview mitgeliefert. Du brauchst aber nichts Zusätzliches tun, um sie zu nutzen.

## Writable Signals

Writable Signals sind Signale, die direkt modifiziert oder aktualisiert werden können, indem neue Werte emittiert werden. Sie dienen dazu, veränderliche Daten oder Zustandsänderungen in einer Anwendung darzustellen und zu handhaben. Komponenten oder Services können Werte an ein schreibbares Signal senden, indem sie die bereitgestellte API verwenden, wodurch Aktualisierungen an Abonnenten weitergegeben werden. Andere Entitäten wie Komponenten oder Services können ein schreibbares Signal abonnieren, um emittierte Werte zu empfangen und darauf zu reagieren.

Die API eines Writable Signals bietet vier Methoden:
- `set` setzt einen neuen Wert des Signals
- `update` aktualisiert den Wert des Signals basierend auf dem aktuellen Wert
- `mutate` aktualisiert den Wert des Signals mit einer direkten Änderung
- `asReadonly` gibt das Signal als Readonly-Signal zurück, die oben genannten Methoden stehen dann nicht zur Verfügung.

Lass uns nun ein Writable Signal und damit unser erstes Signal erstellen.

**Schritt 1**: Wir importieren die Funktion signal von `@angular/core`. Diese Funktion erlaubt es uns, ein Writable Signal zu erstellen. Füge dazu einfach den Import am Anfang der Datei hinzu, in der Du das Computed Signal erstellen möchtest:

```typescript
import { signal } from "@angular/core"
```

**Schritt 2**: Nun können wir das Writable Signal erstellen. Dazu nutzen wir die importierte Funktion signal.

Beim Erstellen eines Writable Signals lässt sich der initiale Wert des Signals mitgeben, ähnlich wie bei der Instanziierung von einem `BehaviourSubject`.

```typescript
// Signals
import { signal } from "@angular/core";

invoices = signal([]);
```

Schauen wir uns das Beispiel oben an, sehen wir, dass die API von Signals sehr ähnlich der von RxJS ist. Ein erster Unterschied lässt sich erkennen im Zugriff auf den jeweiligen Wert. Während der Zugriff auf Observables / Subjects im Template z. B. über die async-Pipe funktioniert, lässt sich der Zugriff auf Signals über einen einfachen und direkten Funktionsaufruf lösen.

**Schritt 3**: Wir greifen im Template unserer Komponente auf den Wert des Signals zu.

```typescript
<!-- Signals -->
<p>Anzahl Rechnungen: {{ invoices().length }}</p>
```

Du kannst erkennen, dass der Zugriff hier ähnlich, wenn auch anders, funktioniert. Es sei gesagt, dass der Zugriff auf ein BehaviourSubject auch anders funktionieren kann. Wir beschränken uns hier allerdings auf diese Variante.

Nun lass uns dem Signal auch einen Wert geben.

**Schritt 4**: Wir implementieren eine Methode zum Setzen des Werts des Signals.

```typescript
addInvoice(invoice: Invoice) {
    // Weg 1: Mutate
    this.invoices.mutate(invoices => invoices.push(invoice));

    // Weg 2: Update
    this.invoices.update(invoices => [...invoices, invoice]);

    // Weg 3: Set
    this.invoices.set([...this.invoices(), invoice]);
}
```

Alle drei Wege fügen die Rechnung zur Liste hinzu. Die Methoden `mutate` und `update` bieten sich an, wenn der neue Wert vom aktuellen Wert abhängt. `update` ermöglicht es, mit Immutables zu arbeiten (z. B. für Performance-Gründe).


## Computed Signals
Computed Signals sind Signale, die ihre Werte aus einem oder mehreren Eingabe-Signalen ableiten, indem eine definierte Berechnungs- oder Transformationslogik angewendet wird. Computed Signals werden verwendet, um berechnete oder abgeleitete Daten basierend auf vorhandenen Signalen zu erzeugen, anstatt die Signale selbst direkt zu modifizieren. Computed Signals verwenden eine Berechnungsfunktion oder -logik, die Eingabe-Signale als Parameter erhält und einen Ausgabewert erzeugt. Die Berechnungsfunktion wird ausgeführt, wenn sich die Eingabe-Signale ändern. Computed Signals sind intelligent optimiert und werden nur dann neu berechnet, wenn dies erforderlich ist, d.h., wenn sich die Eingabe-Signale ändern. Dies gewährleistet Effizienz und vermeidet unnötige Neuberechnungen.

Bei der Erstellung von Computed Signals unterscheidet sich der Ansatz stark vom RxJS-Ansatz. Während man in RxJS die Berechnung eines Werts mit einer pipe und unterschiedlichen RxJS-Operatoren durchführt, funktioniert es bei Signals mit einer Funktion `computed`, die dann entsprechend Wert berechnet.

**Schritt 1**: Wir importieren signal und computed von @angular/core. Diese Funktionen erlauben es uns, Writable und Computed Signals zu erstellen. Füge dazu einfach den Import am Anfang der Datei hinzu, in der Du das Computed Signal erstellen möchtest:

```typescript
import { signal, computed } from '@angular/core;
```

**Schritt 2**: Nun können wir das Computed Signal erstellen. Dazu nutzen wir die importierte Funktion computed und

```typescript
import { signal, computed } from '@angular/core;

const pageCount = computed(() => Math.ceil(this.invoiceCount() / 5));
```

Hurra! 🎉 Du hast ein Computed Signal angelegt. Der Zugriff auf das Signal funktioniert analog zu dem eines Writable Signals.

## Abgeleitete Werte

Schauen wir uns nun an, wie sich Werte aus mehreren Signals ableiten lassen. Dazu erstellen wir wieder ein Computed Signal.

```typescript
// Werte, aus denen wir ableiten wollen
const permissions = signal(["create_invoice", "delete_invoices"]);
const isAuthenticated = signal(false);

// Abgeleiteter Wert
const canDeleteInvoice = computed(() => permissions().includes("delete_invoices") && isAuthenticated());
```

Das Beispiel zeigt das Signal canDeleteInvoice, welches seinen Wert von den beiden Signals `permissions` und `isAuthenticated` ableitet. Immer, wenn sich der Wert für `permissions` oder `isAuthenticated` ändert, weiß Angular, dass alles was aus diesen Signals ableitet auch aktualisiert werden muss.

### Vorteil gegenüber RxJS: Glitch free computation

Das Pendant zum obigen Beispiel wäre mit RxJS in etwa folgendes:

```typescript
const permissions$ = new BehaviourSubject(["create_invoice", "delete_invoices"]);
const isAuthenticated$ = new BehaviourSubject(false);

const canDeleteInvoice$ = combineLatest([permissions$, isAuthenticated$]).pipe(
    map(([permissions, isAuthenticated]) => permissions.includes("delete_invoices") && isAuthenticated)
);
```

Würden sich also mit diesem Ansatz die Streams `permissions$` und `isAuthenticated$` aktualiseren, so kann es durchaus passieren, dass unerwartete Ergebnisse herauskommen: Angenommen der Benutzer wird angemeldet (isAuthenticated$ wird `true` emitten) und die Berechtigung "createInvoice" wird entzogen zur gleichen Zeit. Das würde kurzzeitig dazu führen, dass `canDeleteInvoices$` true emitted bevor es dann mit dem Emit von `permissions$` wieder `false` wird. Man nennt das auch das [Diamond-Problem](https://de.wikipedia.org/wiki/Diamond-Problem){:rel="noopener noreferrer nofollow"}.


## Effects

Effects sind Operationen, die immer dann ausgeführt werden, wenn sich ein oder mehrere Signalwerte ändern. Ähnlich wie berechnete Signale verfolgen Effekte ihre Abhängigkeiten dynamisch. Sie wissen also, von welchen Signalen sie abhängen. Lass uns nun einen Effect erstellen.

**Schritt 1**: Wir importieren die Funktion effect von @angular/core.

```typescript
import { effect } from '@angular/core';
```

**Schritt 2**: Wir erstellen den Effect.

```typescript
@Component({ ... })
export class MyComponent {
  effect(() => console.log(`Aktueller Login-Status: ${ isAuthenticated() }`);
}
```

Nachdem der Effect einmal ausgeführt wurde mit dem initialen Wert von `isAuthenticated`, wird er nun immer dann einen Log in der Konsole erstellen, wenn sich der Wert von isAuthenticated ändert.

## Einordnung Signals und RxJS

Um Signals und RxJS einordnen zu können, müssen wir ein wenig ausholen.

Bei deklarativer Programmierung geht es darum, zu sagen, was getan werden muss, und bei der imperativen Programmierung geht es darum, zu sagen, wie es getan werden muss. Reaktives Programmieren mit RxJS lässt sich der deklarativen Programmierung zuordnen.


Die meisten Entwickler beginnen mit imperativer Programmierung weil es allgemein intuitiver ist und meistens auch bekannt. Reaktive deklarative Programmierung erfordert oft eine komplette Änderung der Denkweise und das Erlernen von neuen Konzepten und Patterns, wie zum Beispiel Observables. Mit Signals wird es möglich diese beiden Paradigmen zu vereinen. Signals funktionieren reaktiv imperativ. Sobald Entwickler die Grundkonzepte von Reaktivität mit Angular verinnerlicht haben, ist es einfach möglich die Reaktivität auf ein deklaratives Level zu haben. Die sehr steile Lernkurve wird damit ein wenig abgeflacht, weil der Start mit imperativer Programmierung damit intuitiver ist.

Um von reaktiver imperativer Programmierung mit Sigals zu reaktiver deklarativer Programmierung zu wechseln bietet Angular auch entsprechende Funktionen: `fromObservable` und `fromSignal` erlauben es, Observables zu Signals bzw. Signals zu Observables zu transformieren.

Demnächst wird es sogar möglich sein, Signal-based Inputs zu nutzen ([Hier geht's zum RFC](https://github.com/angular/angular/discussions/49682)). Mithilfe der Input Transforms, die mit Angular 16.1 veröffentlicht wurden, lassen sich Inputs ganz einfach als Signals benutzen.

```typescript
@Component({
  signals: true,
  selector: 'invoices-overview',
  template: '<p>Client: {{ clientName() }}</p>',
})
export class InvoicesOverview {
  clientName = input<string>(); // Signal<string|undefined>
}
```

Die Property `clientName` ist vom Typ `Signal<string|undefined>` und beinhaltet ein Readonly Signal. Falls Du einen initialen Wert setzen möchtest, kannst Du dies auch machen: `input<string>('Unbekannt')`. Das würde dann dazu führen, dass das Signal vom Typ `Signal<string>` ist und auch initial einen string-Wert ('Unbekannt') hat.


## Zusammenfassung

Aktuell sind Signals zwar noch in der Developer Preview aber im Ganzen lässt sich erkennen, dass Angular mit Signals den Weg in eine Zukunft ohne Zone.js geht. Dazu wird die Arbeit mit Signals allerdings nicht unbedingt notwendig. Man kann sie eher als eine Möglichkeit betrachten, deklarativ reaktiv zu programmieren.