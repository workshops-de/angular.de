---
title: "Angular 18 - Die Renaissance geht weiter"
description: Alle neuen Features und Updates in Angular 18, über die Zoneless Change Detection und die Angular Developer Experience und die Angular Renaissance."
author: "Lulëzim Ukaj"
co_author: "David Müllerchen"
published_at: 2024-06-11 09:27:00.000000Z
header_source:
header_image: header.jpg
categories: "angular release update"
---



Es ist soweit: Angular v18 wurde veröffentlicht!

Seit Beginn der Angular Renaissance gab es viele neue Features und Updates. Als Erstes ist einem sicherlich das neue Logo und das neue Portal [angular.dev](https://www.angular.dev) aufgefallen, das [angular.dev](https://angular.dev/) als Hauptquelle für Informationen und Ressourcen abgelöst hat. Neben den visuellen Neuerungen gab es einige bahnbrechende – in diesem Fall ist das Wort durchaus angebracht – technische Updates. In diesem Zusammenhang sind vor allem die [Angular Signals](https://angular.dev/guide/signals) und [Full App Non-Destructive Hydration](https://angular.dev/guide/ssr#configure-server-side-rendering) zu nennen. Beide Features waren der Beginn einer Neuausrichtung im Bereich der Change Detection bzw. der gesamten Rendering-Strategie für das Framework. Insbesondere die Signals sind auf großes Interesse in der Angular Community gestoßen.

Mit dem Update auf Angular Version 18 scheint sich das Angular-Team darauf konzentriert zu haben, kurz innezuhalten und alle neuen Features zu stabilisieren. Oder wie Minko Gechev vom Angular-Team-Lead selbst sagt:


„Over the past three releases, we’ve introduced a lot of new features and improvements. This time we focused on polishing the work we shipped.“


Es geht darum, die Fortschritte zu bewerten und diese in die Gesamtstrategie einzuordnen, um eine stabile und kohärente Basis für spannende neue Experimente zu schaffen. Eines dieser lang ersehnten Experimente wurde nun auch in Angular 18 vorgestellt: die Zoneless Change Detection. Auch wenn das Feature bisher explizit als “experimental feature” geführt wird, ist das nicht weniger als eine kleine Revolution in der Change Detection. Wir werden uns in der näheren Zukunft ausführlich mit diesem Thema befassen.


Hier sind die Highlights dieses Releases kurz zusammengefasst:

- Experimentelle Unterstützung für die zoneless Change Detection:
  Ein Schritt weg von zone.js, hin zu einer schlankeren, schnelleren Änderungserkennung.
- Angular.dev avanciert zur neuen Heimat für Angular-Entwickler:
  Angular.dev löst nun endgültig angular.io als Plattform für Angular Entwickler ab. Sie bietet viel mehr als nur Dokumentation und ist ein interaktiver Spielplatz mit Tutorials und Lernumgebung.
- Stabilisierung von Material 3, deferrable views und built-in Control Flow:
  Die Key Features des letzten Releases sind nun reif für den produktiven Einsatz und wurden um zahlreiche Verbesserungen ergänzt.
- Fortschritte im Server-Side Rendering:
  Verbesserter i18n Hydration-Support, Debugging mit visuellen Hinweisen, Hydration-Support in Angular Material und Event Replay, angetrieben von der gleichen Technologie, die auch Google Search nutzt.


Das Ganze könnt ihr euch zusammen mit Webdave anschauen! Hier ist der Link zum Video zum Angular Release auf Version 18!

<iframe class="" width="100%" height="315" src="https://www.youtube.com/embed/fNf4BM6sJRE?rel=0" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Zoneless Change Detection

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Illustration von Händen, die ein leeres Plakat halten mit dem Zoneless-Logo"
class="lazy img-fluid img-rounded" data-src="zoneless.jpg" data-srcset="zoneless.jpg"
/>
</p>

Die aufregendste Neuigkeit zum Major Release von Angular v18 ist die experimentelle Unterstützung für die Zoneless Change Detection. Das ist eine kleine Revolution. Angular beginnt sich von zone.js zu lösen. Auch wenn die Scheidung noch einige Zeit dauern wird, ist sie offiziell eingereicht. Das zeigt sich auch darin, dass Zone.js keine neuen Features mehr annimmt, einschließlich Patches für native Plattform-APIs. Niedrig priorisierte Fehlerbehebungen werden vom Team nicht mehr akzeptiert. [Das Angular-Team rät sogar dringend davon ab, Zone.js in Zukunft außerhalb des Kontexts von Angular-Anwendungen zu verwenden](https://www.npmjs.com/package/zone.js?activeTab=readme).

### Wie nutze ich Zoneless schon jetzt?


Du kannst mit der Zoneless Change Detection ab sofort in deiner Angular-Anwendung experimentieren. Füge einfach `provideExperimentalZonelessChangeDetection()` zu deinen Providern hinzu:

```typescript
bootstrapApplication(App, {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
});
```

Nachdem du den Provider hinzugefügt hast, entferne zone.js aus deinen Polyfills in angular.json. Ein Beispiel, wie du zoneless in deinen Komponenten verwenden kannst:

```typescript
@Component({
  ...
  template: `
    <h1>Hallo von {{ name() }}!</h1>
    <button (click)="handleClick()">Go Zoneless</button>
  `,
})
export class App {
  protected name = signal('Angular');

  handleClick() {
    this.name.set('Zoneless Angular');
  }
}

```

In diesem Beispiel bewirkt ein Klick auf den Button, dass die Methode handleClick aufgerufen wird, was den Signalwert aktualisiert und die UI entsprechend anpasst.


### Vorteile der Zoneless Change Detection?
Die neue Zoneless Change Detection bietet viele Möglichkeiten für Entwickler/innen:
Verbesserte Integration für Micro-Frontends und Interoperabilität mit anderen Frameworks.
Schnelleres Rendering und bessere Laufzeitperformance.
Vereinfachtes Debugging und lesbarere Stacktraces.


### Die Rolle von Signals für Zoneless
Ein Kernaspekt von zoneless ist die Einführung von Signals, die eine direkte und reaktive Zustandsverwaltung ermöglichen. Signals sind entscheidend für die effiziente Steuerung der Änderungserkennung, da sie es ermöglichen, Zustände explizit zu aktualisieren, ohne dass zone.js jede Aktion überwachen muss. Dies führt zu einer deutlichen Performance-Steigerung und vereinfacht die Komponentenkommunikation durch klar definierte Datenflüsse.

## Signals

Unser persönliches Highlight in dieser Version sind die neuen Signal APIs, die jetzt im Developer Preview verfügbar sind. Diese APIs transformieren die Art und Weise, wie Werte in Komponenten gehandhabt werden, weg von klassischen Klassenattributen hin zu Signals. Das Ziel ist, Komponenten zu Signal-Komponenten weiterzuentwickeln, was die Change Detection revolutionieren könnte.
Zu den Signal APIs gehören:

- input
- output
- viewChild
- viewChildren
- contentChild
- contentChildren
- model

Bis auf model, das eine Kombination aus input und output darstellt und damit ein intuitives Two-Way-Binding ermöglicht, sind die anderen schnell erklärt: Sie ersetzen die bestehenden Dekoratoren durch Signale.
Ein Beispiel:
```typescript
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  template: `
    <input
      #searchInput
      [value]="searchStr()"
      (input)="searchStr.set(searchInput.value)" />
  `,
})
export class SearchComponent {
  searchStr = model();
}

<app-search [(searchStr)]="search" />
```


## Updates der Angular DevTools

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Illustration von Händen, die ein leeres Plakat halten mit dem Hydration-Logo"
class="lazy img-fluid img-rounded" data-src="hydration.jpg" data-srcset="hydration.jpg"
/>
</p>

Angular v18 bringt auch ein Update für die Angular DevTools. Die neueste Version der DevTools ermöglicht es Entwicklern, den Hydration-Status der Komponenten visuell zu verfolgen. Du findest jetzt neben jeder Komponente ein Icon, das den Hydrationstatus der Komponente anzeigt. Ein neuer Overlay-Modus zeigt an, welche Komponenten hydratisiert wurden und welche noch ausstehen. Sollten in der Anwendung Hydrationsfehler auftreten, sind diese in den Angular DevTools im Komponenten-Explorer leichter zu erkennen.

## Verbesserungen im Server-Side Rendering

Das Server-Side Rendering (SSR) in Angular hatte für das Entwicklerteam dieses Jahr eine hohe Priorität, wie aus der Roadmap und zahlreichen Interviews hervorgeht. Folgerichtig gibt es aus dem Joint Venture mit dem [Chrome Aurora Team](https://developer.chrome.com/docs/aurora/overview?hl=de) auch mit diesem Major Update wieder einiges zu berichten im Bereich des Server-Side Rendering.

Zu den neuen Features gehören die Unterstützung für i18n Hydration, ein verbessertes Debugging, der Hydration Support in Angular Material sowie das Event Replay, das durch die gleiche Bibliothek ermöglicht wird, die auch die Google Search antreibt. Mindestens genauso wichtig sind in diesem Zusammenhang aber auch die Stabilisierung der Deferrable Views und deren Rolle in der Implementierung der partiellen Hydration.

### i18n Hydration-Support

Ein Update gab es auch für den i18n Hydration Support. I18n ist ein Numeronym und heißt nichts anderes als “Internationalisation”. Gemeint ist damit ein Modul, das sowohl Inhalte als auch Attribute deiner HTML-Tags übersetzt. Lokalisierte Inhalte werden nun noch schneller geladen und rehydriert, was eine durchgehend flüssige User Experience über verschiedene Sprachen hinweg sicherstellt. Dies ist besonders wichtig für globale Anwendungen, die eine breite Nutzerbasis haben und schnelle Ladezeiten in verschiedenen Sprachen bieten müssen. Ein anderes Anwendungsgebiet ist die Accessibility, wenn es darum geht, ARIA Attribute zu übersetzen.

### Event Replay

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Illustration von Händen, die ein leeres Plakat halten mit dem Wiz-Logo"
class="lazy img-fluid img-rounded" data-src="wiz.jpg" data-srcset="wiz.jpg"
/>
</p>


Angular und Googles internes Framework Wiz sollen langfristig zusammengeführt bzw. integriert werden, um ihre Features und Technologien zu vereinheitlichen. Das Ziel dieser Konvergenz ist natürlich, die besten Eigenschaften beider Frameworks zu kombinieren. Zur Erinnerung: Angular und Wiz haben bisher zwei verschiedene Anwendungsbereiche bedient. Wiz wurde vor allem für leistungsorientierte Consumer Apps genutzt, während Angular sich auf die Developer Experience konzentrierte.

In einem ersten Schritt arbeitet Wiz jetzt mit Angular Signals in sein Rendering-Modell integriert. So nutzt die Video-Plattform YouTube bereits Angular Signals. In die andere Richtung ist das Event Dispatch (früher als jsaction bekannt) nun im Angular-Monorepo integriert. Event Replay zeichnet Benutzerinteraktionen während der Initialladung auf und spielt sie ab, sobald deine Anwendung vollständig hydratisiert und interaktiv ist. Damit wird sichergestellt, dass trotz schlechter Internetverbindung keine Usereingaben verloren gehen.

Event Replay ist von nun an in der Developer Preview verfügbar. Du kannst es via `withEventReplay()` aktivieren:

```javascript
bootstrapApplication(App, {
  providers: [
    provideClientHydration(withEventReplay())
  ]
});
```


## Angular.dev ist das neue Zuhause

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Illustration von Händen, die ein leeres Plakat halten mit dem AngularDev-Logo"
class="lazy img-fluid img-rounded" data-src="angulardev.jpg" data-srcset="angulardev.jpg"
/>
</p>

[Angular.dev](https://angular.dev/) wurde bereits mit dem Update auf Version 17 vorgestellt und löst nun endgültig Angular.io als Hauptquelle für Informationen und Ressourcen ab. Alle Anfragen an angular.io werden nun automatisch auf angular.dev umgeleitet. Damit sichergestellt ist, dass alle bestehenden Links weiterhin funktionieren, werden eure Anfragen zu [v17.angular.io](https://angular.dev/) weitergeleitet.

Über das überarbeitete, neue Design, Dokumentation und die [Tutorials](https://angular.dev/tutorials/learn-angular) haben wir euch bereits berichtet. Richtig gut finden wir die [interaktive Lernumgebung](https://angular.dev/playground), um neue Features oder erste Schritte direkt im Browser auszuprobieren und zu lernen. Angular.dev erleichtert insbesondere Junior Entwicklern und Quereinsteigern den Einstieg in das Framework.

## Diese Features sind jetzt stabil

### Material 3

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Illustration von Händen, die ein leeres Plakat halten mit dem Material-Logo"
class="lazy img-fluid img-rounded" data-src="material.jpg" data-srcset="material.jpg"
/>
</p>


Material 3 ist die neueste Iteration des bekannten Design Systems und nun offiziell stabil. Die Komponentenbibliothek wurde vor einigen Monaten als experimentelles Feature vorgestellt. Mit der Stabilisierung von Material 3 wurden auch neue Komponenten und Funktionen eingeführt. Dazu gehören neue Date- und Timepicker, eine verbesserte Navigation und neue Formularsteuerelemente. Dazu gibt es neue Themes, eine bessere Unterstützung für dunkle Modi und mehr Accessibility in den Komponenten.

Neben den visuellen Updates hat Angular Material 3 auch in Sachen Performance zugelegt. Die Komponenten sind optimiert worden, um schneller und effizienter zu laden. Zusätzlich wurde die Webseite [material.angular.io](https://material.angular.io/) mit den neuen Material 3 Themes und entsprechenden Dokumentationen aktualisiert.

Eine Anleitung zur Nutzung von Angular Material 3 in eurer Anwendung findet ihr [hier](https://material.angular.io/guide/getting-started).

### Built-in Control Flow

Die in v17 vorgestellte neue Built-In Control Flow Syntax ist nun ebenfalls stabil. Die Control Flow Syntax ermöglicht eine effiziente Handhabung logischer Operationen innerhalb einer Angular Anwendung. Bisher gehörten Strukturdirektiven wie ngIf, ngFor und ngSwitch zwar zum Framework, aber nicht direkt zur Komponentenlogik, was zu einer Diskrepanz zwischen Komponentenlogik und Template-Kontrolle führte. Vor allem komplexere Datenstrukturen und State Management sind jetzt einfacher zu implementieren.

Entwickler können nun direkt auf Änderungen im Template reagieren, ohne auf Umwege über Strukturdirektiven angewiesen zu sein. Ein Beispiel für diese neue Syntax könnte so aussehen:

```html
@template {
  <!-- Bisher -->
  <div *if="bedingung">Inhalt anzeigen</div>

  <!-- Neu -->
  @if(bedingung){
    <div>Inhalt anzeigen</div>
  }
}
```
Hier findest du den Link zum passenden Stackblitz unseres Trainers Webdave.

## Partial Hydration und Deferrable Views
Ein Highlight des Updates sind die nun stabilisierten "deferrable views". Das sind die Code-Bausteine für Partial Hydration. Sie erlauben es Entwicklern, gezielt zu steuern, welche Teile ihrer Anwendung wann gerendert und hydratisiert werden sollen. Deferrable Views erlauben es, das Laden bestimmter Komponenten bis zu einem ausgelösten Ereignis zu verzögern. Statt wie bisher den @placeholder-Block auf dem Server zu rendern, müssen dafür alle Inhalte innerhalb der festgelegten Defer-Blöcke serverseitig gerendert und nur auf Client-Seite nach Bedarf hydratisiert werden. Das kann ein Scrollen des Users sein oder ein anderer Interaktionspunkt.
Mit Hilfe von @defer-Blöcken können Entwickler das Laden und Rendern von Komponenten gezielt verzögern:
```html
@defer (on viewport) {
  <meine-komponente />
}
```
Hier haben Entwickler folgende Möglichkeiten:
- on idle: Lädt Komponenten, wenn der Browser inaktiv ist.
- on immediate: Lädt Komponenten sofort nach der Initialisierung.
- on viewport: Lädt Komponenten, wenn sie in den
- on viewport: Lädt Komponenten, wenn sie in den sichtbaren Bereich des Bildschirms kommen.

In diesem Szenario lädt der Browser die JavaScript-Bundles für die eingestellten Deferred Views nicht, bis ein Trigger-Ereignis auftritt. Erst dann lädt Angular das zugehörige JavaScript herunter und hydratisiert diesen Teil der Ansicht. Wenn eine Komponente nicht benötigt wird, wird sie gar nicht erst hydratisiert. Das macht auch Sinn. Wenn man einen Flug suchen oder buchen will, ist es für die User Experience wichtiger, dass alle interaktiven Elemente in diesem Zusammenhang möglichst schnell geladen sind. In eher seltenen Fällen priorisieren Nutzerinnen die Marketing- oder Bonusangebote wie Restauranttipps. Und wenn diese Angebote gar nicht erst wahrgenommen werden, warum sollten sie überhaupt hydratisiert werden?


Die stabilisierten Deferrable Views sind ein weiterer Schritt einer grundsätzlichen Richtungsänderung für das Rendering in Angular. Wie bereits in der Roadmap angekündigt, plant das Angular Team, zukünftig standardmäßig auf ein hybrides Rendering (Server-Side Rendering, Partial Hydration und Static Site Generation) zu setzen. Derzeit arbeitet man im Hause Angular daran, die Bedeutung von Data Triggers zu evaluieren, wie zum Beispiel das Übergeben von empfangenen Eigenschaften oder das Ändern von Binding Values.


Für Unternehmen gibt es nun das Early Access Programm. Wer daran teilnehmen möchte, kann sich per E-Mail an devrel@angular.io wenden.

## Firebase App Hosting

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Illustration von Händen, die ein leeres Plakat halten mit dem Firebase-Logo"
class="lazy img-fluid img-rounded" data-src="firebase.jpg" data-srcset="firebase.jpg"
/>
</p>

Um der gewachsenen Komplexität auch auf der Hosting-Ebene gerecht zu werden, gibt es auch gute Neuigkeiten aus dem Hause Firebase.

Firebase hat "App Hosting" hilft dir beim Hosting von Angular- und Next.js-Anwendungen durch automatisches Bauen und Deployen von statischen Assets und dynamischen Inhalten. Die nahtlose Integration mit GitHub ermöglicht es, Änderungen direkt aus dem Repository zu deployen.


Durch die Integration in das breite Spektrum der Google Cloud-Produkte und durch die Verwaltung von Backend-Services wie Cloud Build, Cloud Run und Cloud CDN, skaliert Firebase App Hosting automatisch mit der Nachfrage.


Mehr Informationen gibt es dazu [hier](https://firebase.blog/posts/2024/05/introducing-app-hosting/).

## Community-Highlights

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Illustration von Händen, die ein leeres Plakat halten mit dem NG-DE Logo"
class="lazy img-fluid img-rounded" data-src="ngde.jpg" data-srcset="ngde.jpg"
/>
</p>

In der Welt von Angular tut sich aber auch in der Community viel. Sie ist lebendiger denn je!


Am meisten hat uns gefreut, dass es dieses mal Kudos an unsere Konferenz [Ng-de](https://ng-de.org/tickets/) gab! Neben der [ng-conf](https://ng-conf.org/), [Angular Belgrade](https://angularbelgrade.org/), [NGPoland](https://ng-poland.pl/), [ngRome](https://ngrome.io/), [NG Kenya](https://ng-kenya.com/home), [ngIndia](https://www.ng-ind.com/) und [Angular TLV](https://angular-tlv.com/) wurde die Ng-de als ein Konferenz-Highlight des Jahres genannt.


BTW, die Ng-de findet vom 10-11. Oktober im Maritim Hotel in Bonn statt. [Karten kannst du hier bestellen](https://ng-de.org/tickets/). Wir freuen uns auf dich!

## Outro: Angular 18 – die Angular Renaissance hat gerade erst angefangen

Alles in allem sagen wir zum Release: Die "Angular Renaissance" setzt sich mit voller Kraft fort! Und wenn Angular v18 unter dem Motto “innehalten und reflektieren” lesen, dann wirds bald wild!

Version 18 ist wieder mal der beste Beweis dafür, dass Developer Experience und technische Performance Hand in Hand gehen müssen. Die Einführung der experimentellen Zoneless Change Detection und die strategische Implementierung von Signals und Deferrable Views haben einen soliden technischen Grundstein gelegt. Dies ermöglicht eine schrittweise und fundamentale Neugestaltung der Change Detection und Rendering-Strategie, die Entwicklern den Übergang erleichtert, ohne sie zu überfordern. Angulars Ansatz, diese Änderungen schrittweise und auf Basis der neuen technischen Features umzusetzen, stellt sicher, dass alle weiteren Entwicklungen auf einem stabilen Fundament aufbauen. Diese durchdachte Herangehensweise ist kein Zufall, sondern das Resultat der aktiven Integration des Community-Feedbacks in den Entwicklungsprozess. Wir sind gespannt auf die Updates, die sich auf diese grundlegenden Neuerungen stützen werden.


Mit dem neuesten Update hat Angular unserer Meinung nach seine Position als Primus in der Entwicklung von skalierbarer Unternehmenssoftware gestärkt. Wir begrüßen die deutliche Ausrichtung auf eine optimierte Developer Experience, mehr Accessibility und Community. Das ist eine gelungene Vision für eine lange und große Zukunft des Frameworks.


Sind wir also am Höhepunkt der "Angular Renaissance" oder erst am Anfang einer neuen Ära? Wir sind zweifellos mittendrin in einer spannenden Zeit.


