---
title: "Angular 4 im Überblick - Die wichtigsten Neuerungen"
description: "Am 23.03.2017 ist die finale Version von Angular 4 erschienen und freigegeben. Die wichtigsten Neuerungen haben wir für dich kurz und knapp zusammengefasst."
author: "Robin Böhm"
slug: "angular-4-neuerungen"
published_at: 2017-04-03 08:00:01.000000Z
categories: "angular2 angular angular4"
header_image: "/artikel/header_images/angular-4-neuerungen.jpg"
---

## Schneller, kleiner und agiler: Angular 4 ist da

Lange haben wir drauf gewartet und mussten bangen, dass es pünktlich kommt. Jetzt ist es raus – am 23.3.2017 ist schlussendlich die finale Version von Angular v4 erschienen und freigegeben.

### Versionssprung: Wo ist die Version 3 geblieben?

Viele werden sich sicherlich Fragen, wie es überhaupt zu der Version 4 gekommen ist, ohne überhaupt Version 3 zu verteilen. Dies ist kein Versehen oder ein absichtliches Hochstufen, sondern eine Harmonisierung der Versionsnummer.

Mit der Version 4 führt Angular die semantische Versionierung (SEMVER) ein. Damit dient die Versionsnummer nicht nur zur Identifizierung einer neuen Version, sondern ist maßgeblich für Entwickler interessant. Mit der neuen Versionsnummer kann abgewägt werden, inwieweit Neuerungen die eigene Applikation beeinflussen und es womöglich programmatische Anpassungen erfordert.

Wieso es direkt Version 4 wurde, hat den ganz einfachen Grund, dass der Angular Router bereits in der Version 3 entwickelt war, die restlichen Module aber noch in der Version 2 vorlagen. Da es sich hier um ein Breaking Change handelt, wurde somit die Major Version von 2 auf 4 angehoben. Somit waren alle Module wieder auf dem gleichen Major Version und es konnte eine saubere SEMVER-Einführung gewährleistet werden. Die nächste Major Version ist somit natürlich Version 5. Noch mehr Informationen findet ihr auch im folgenden [Artikel](/artikel/angular-4-semver/).

### Die wichtigsten Neuerungen: Angular v4 im Überblick

Neben den Neuerungen hat sich auch das Wording verändert. Angular ist Angular – die Versionsnummer ist nicht mehr Bestandteil des Namens und bedarf keiner direkten Erwähnung. Die damalige Bezeichnung von Angular 2, diente eher zu Abgrenzung zum alten AngularJS.

Performance, Speed und Verringerung von Code waren die wohl wichtigsten Ziele von Angular v4. Zudem haben sich aber auch weitere Funktionen verbessert oder wurden optimiert.

#### ngIf & ngFor im neuen Kleid

Die wohl am häufigst benutzten Funktionen, haben natürlich auch in der Version 4 ein Upgrade bekommen.

ngIF hat endlich eine else-Condition erhalten und wir sparen uns die Negation eines weiteren ngIF. Dies fördert die Lesbarkeit des Codes und löst die Dopplung ab.

```html
<div *ngIf="valueObservable | async as value; else loading">
	{{value.property}}
</div>
<ng-template #loading>
	value is loading, Please wait...
</ng-template>
```

Genau wie ngIF kann ngFor auch auf lokale Variablen zugreifen. Dies spart nicht nur Zeit, sondern vereinfacht den Code ungemein.

```html
<ul>
	<li *ngFor="let prop of valueObservable | async as value; index as i">
		{{prop.name}} {{i}}/{{value.length}}
	</li>
</ul>
```

#### Die View Engine produziert weniger Code

Um die Verringerung von Code umzusetzen, musste die View Engine neu überarbeitet werden. Templates / Components werden in der View-Schicht generiert und müssen auch noch Event-Handling, Change-Detection und Data-Binding abdecken. Dieses produziert am Ende sehr viel Code und benötigt eine lange Ladezeit.

Mit Angular v4 wurde dieser Ablauf nochmals überdacht und es sind neue Ziele und Anforderungen definiert worden, die grundlegend dazu geführt haben, dass die View Engine nur noch ca. die Hälfte an Code ausliefert. Dies ist besonders für Applikationen auf Tablets und Smartphones interessant.

Mehr Informationen finden sich auch im Designdokument: [„Angular - Generating less code“](https://docs.google.com/document/d/195L4WaDSoI_kkW094LlShH6gT3B7K1GZpSBnnLkQR-g/preview)

#### Animation-Package: Kein unnötiger Ballast

Um Code einzusparen, wurde aber nicht nur die View Engine überarbeitet, sondern auch das Animation-Package aus dem Angular Core geworfen.

Somit muss, und darf, jeder entscheiden, ob er überhaupt Animationen benötigt. Sollte kein Bedarf bestehen, müssen wir keinen unnötigen Ballast in unserem Projekt mehr mit herumschleppen.

#### Neue TypeScript Version (2.1+) wird unterstützt

In der neuen Angular Version darf natürlich auch die neue TypeScript Version nicht fehlen. Mit TypeScript 2.1+, verbessert sich nicht nur die Typsicherheit, sondern auch die Geschwindigkeit des ngCompilers wird signifikant erhöht.

#### TypeScript StrictNullChecks Integration

Obwohl StrictNullChecks schon in der RC-Version 4.0.0-rc.1 implementiert war, wurde es nicht für die finale Version übernommen. Es wurde festgestellt, dass dieses Feature noch mehr Ausarbeitungszeit benötigt und voraussichtlich erst in der Version 4.1 erscheint.

Der StrictNullChecks sollte von TypeScript nahtlos in Angular einfließen und benutzt werden können.

#### Angular Universal auf eurem Server

Universal einsetzbar sollte Angular werden. Nicht nur im Webbrowser nutzbar, sondern auch auf einem eigenen Server ausführbar.

Mit Angular Universal sind wir dem ganzen einen großen Schritt näher gekommen. Vorteile von einem Server wäre die Erzeugung von suchmaschinenfreundlichen Webseiten oder die Nutzung von Web-Workers.

Leider gibt es noch keine produktiven Beispiele, die den Einsatz von Angular Universal abbilden.

#### Flat ES Modules (Flat ESM / FESM) verbessert die Performance

Die neuen „flachen Module“ sollen aus nur einer Datei bestehen, anstatt aus vielen kleinen Dateien, und somit zu einer besseren Performance beitragen. Das Kompilieren und Ausführen wird somit deutliche schneller gelingen.

### Breaking Changes: Was alles bei einem Update beachtet werden muss

Da das Update, von Angular 2 auf Angular v4, ein Major Change darstellt, müssen natürlich auch wieder notwendige Änderungen an der eigenen Applikation bedacht werden.

1. Angular v4 unterstützt nur noch TypeScript 2.1+ und bietet keine Kompatibilität mehr für die alte Version 1.8. Daher sollten alle TypeScript Änderungen geprüft werden, bevor ein Update angestoßen wird. Im besten Fall sollten alle Changes nochmals verglichen werden: [GitHub TypeScript](https://github.com/Microsoft/TypeScript)

2. Da mit Version 4 auch die Animationen aus dem Core entfernt wurden, müssen diese schnellstmöglich wieder als Modul integriert werden.

3. Die Implementierung von Lifecycle Events über Klassen, dürfen nicht mehr über die Vererbungen implementiert werden, sondern müssen direkt über das Interface integriert werden.

```
class XY extends OnInit {} --> class XY implements OnInit {}
```

4. Natürlich sollten auch auf die Dependencies geachtet werden, ob die Funktionsweise mit Angular v4 noch gewährleistet wird.

5. Der Renderer wird mit der Version 4 über RendererFactory2 aufgerufen und nicht mehr über RootRenderer.

6. Der Template-Tag `<template>` wird ersetzt durch `<ng-template>`

<div>
  <h3>Update unserer Schulungsmaterialien</h3>
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <p> Das Update unserer Schulungsmaterialien lief auch ohne Probleme. Alle Teilnehmer die bereits einen Angular Kurs ab
        Version 2 bei uns besucht haben, haben automatisch Zugriff auf die Updates der Materialien über unser virtuelles
        Klassenzimmer(Classroom).
      </p>

    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="medium_Screen-Shot-2017-03-19-at-11.52.54.png?v=63657140418"
        alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 p-3">
      <p>
        Wenn Ihr oder eure Kollegen ebenfalls Angular lernen wollt, könnt ihr sehr gern einen unser nächsten <a target="_blank"
          href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=article&utm_medium=link&utm_content=text-buttom">Angular und TypeScript Workshops</a>        besuchen. Alternativ bieten wir natürlich auch <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript/inhouse?utm_source=angularjs.de&utm_campaign=article&utm_medium=link&utm_content=text-buttom">Inhouse Schulungen für Angular und TypeScript</a>        an. Wenn ihr fragen habt, beantworten wir diese gern via E-Mail, Telefon oder in unserem Slack-Channel.
      </p>
      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-typescript?utm_source=angularjs.de&utm_campaign=article&utm_medium=button&utm_content=text-buttom">
          <button class="btn btn-danger">Jetzt Angular 4 lernen</button>
        </a>
      </p>
    </div>

  </div>
</div>



### Das Fazit zu Angular v4

Insgesamt macht Angular in der neusten Version einen sehr starken Eindruck und verfolgt weiterhin die Ziele und Ansätze von Version 2 – macht dieses aber nochmals deutlicher besser und punktet mit vielen kleinen und großes Performance-Improvements.

Die Entfernung von überflüssigen Code und die Integration von neuen Mechaniken, macht Angular noch agiler und flexibler. Mit Angular Universal bald nicht nur im Browser, sondern auf jedem Server möglich. In unseren Augen eine transparente und gelungene Weiterentwicklung von Angular 2.