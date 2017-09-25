---
title: "Fabelhafte Formulare"
description: "Das Modul ng-fab-form erleichtert die Erstellung von Formularen in AngularJS. Wir zeigen euch welche Vorteile ihr damit habt."
author: "Johannes Millan"
slug: "form-handling-via-ng-fab-form"
published_at: 2015-01-07 15:43:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/form-handling-via-ng-fab-form.jpg"
---

*Einfaches Formular-Handling mit [ng-fab-form](https://github.com/johannesjo/ng-fab-form)*

Wer schon einmal mit Formularen in einer AngularJS-App gearbeitet hat, kennt das:

* Nicht validierte Formulare lassen sich absenden.
* Der bei einigen Nutzern immer noch beliebte Doppelklick auf den Submit-Button führt zum zweimaligen Absenden des Formulars.
* Fehlermeldungen müssen jedes Mal aufwendig mit Hilfe der Name-Attribute und zusätzlichen Markup neu konfiguriert werden..

Die Chancen stehen gut, dass man sich mehr als einmal dabei erwischt, etwas vergessen zu haben. Im Besten Fall leidet die Nutzererfahrung, im schlimmsten Fall führen die doppelt oder falsch abgesendeten Daten zu schwer nachvollziehbaren Fehlern.

Die Tools, um das Formular-Handling nach den Vorstellungen anzupassen, sind zwar alle vorhanden, aber die Benutzung gestaltet sich gefühlt durchaus aufwendig. Das Modul [ng-fab-form](https://github.com/johannesjo/ng-fab-form) versucht dieses Problem anzugehen, indem es eine globale Konfiguration von Formularen innerhalb eurer App erlaubt.

So sieht es aus:

*  [Demo-Seite](http://johannesjo.github.io/ng-fab-form#demo)
*  [Plunkr](http://plnkr.co/edit/8vCSPw?p=preview)


## Installation und Verwendung

Um ng-fab-form zu benutzen müsst ihr es nur installieren und in eurem app-Modul laden (Achtung, AngularJS 1.3 wird aufgrund der Abhängigkeit zu `ngMessages` benötigt):

Die Installation erfolgt, wie gewohnt, über Bower:

```shell
bower install ng-fab-form --save
```

Anschließend müssen `ngFabForm` und `ngMessages` in eurem App-Modul geladen werden.

```javascript
angular.module('yourApp', ['ngFabForm', 'ngMessages' ]);
```

### Benutzung der Validierung am Beispiel eines Eingabefeldes
Um die Validierung zu verwenden müssen zwei Vorraussetzungen erfüllt sein.
1. Muss sich eurer input-Feld innerhalb eines eines form-Elements befinden
2. Muss ng-model verwendet werden:
3. Eine mit ng-model kompatible Validierungs-Direktive, wie etwa `required`, `ng-pattern` oder `maxlength` muss gesetzt sein.

```html
<form name="yourFormName" ng-submit="someSubmitFn()">
  <input type ="text" ng-model="a.model.here" required>
  <button type="submit">Send me!</button>
</form>
```

Dieses html wird, wenn man die default-Einstellungen verwendet, automatisch in folgendes transformiert:

```html
<form name="yourFormName" ng-submit="someSubmitFn()">
    <input type ="text"
            ng-model="aModelHere"
            name="yourFormName_a_model_here"
            required>
    <div>
        <div ng-messages="field.$error">
            <ul class="list-unstyled validation-errors"
                ng-show="field.$invalid && (field.$touched || field.$dirty || form.$triedSubmit)">
                <li ng-message="required">This field is required</li>
                <!-- other messages -->
            </ul>
            <div class="validation-success"
                  ng-show="field.$valid && !field.$invalid"></div>
        </div>
        <div class="validation-success" ng-show="field.$valid  && !field.$invalid"></div>
    </div>
    <button type="submit">Send me!</button>
</form>
```

Doppelte Submits und das Absenden von invaliden Formularen werden dabei entsprechend eurer Einstellungen automatisch gehandelt.

## Was ng-fab-form anders macht als andere Form-Module

Die [große Anzahl von Modulen, die sich einem vereinfachten Form-Handling widmen](https://github.com/search?o=desc&q=angular+form&s=stars&type=Repositories&utf8mb4=%E2%9C%93), zeigt, dass die Probleme mit Formularen in Angular nicht ganz neu sind. Im wesentlichen gibt es dabei bisher zwei Arten von Modulen (auf weitere Beispiele könnt Ihr gerne in den Kommentaren verweisen): Form-Builder und Validation-Helper. Erstere sind dabei häufig recht unflexibel, da Sie vom Markup abstrahieren und dieses automatisch nach bestimmten Regeln generieren. Letztere erfordern normalerweise das Verwenden von bestimmten Direktiven, die zwar einfacher zu verwenden sind als das Standard-Markup, aber für gewöhnlich trotzdem immer wieder neu aufgerufen werden müssen.

`ng-fab-form` hingegen ist demgegenüber kein Form-Builder oder Framework und es erfordert - evtl. abgesehen von einer einmaligen Anpassung der Konfiguration - kein zusätzliches Markup. Das Modul lädt dabei mit einer Reihe sinnvoller Default-Einstellungen, lässt sich aber bei Bedarf umfassend konfigurieren und anpassen, auch für etwaitige Ausnahmefälle. Die vorhandenen Möglichkeiten sprengen hier leider den Rahmen. Eine gute Übersicht findet sich allerdings auf der [github-Seite](https://github.com/johannesjo/ng-fab-form).

## Weitere Features
Neben den bereits angesprochenen Funktionen gibt eine Reihe von weiteren vollständig konfigurierbaren Features:

* Einfache Implementierung eigener Validierungs-Nachrichten, sowie [eine Vorlage für eigene Themes](http://plnkr.co/edit/wVW8ih?p=info)
* Direktive zum Deaktivieren ganzer Formulare
* Auto-Scroll-To & Fokus des ersten nicht erfolgreich validierten Feldes beim Absenden des Formulars
* Eine Direktive zur Einbindung von kontext-spezifischen Validierungs-Nachrichten z.B. für `ngPattern`.
* Automatisches triggern von `$setDirty` für alle Formularfelder bei einem versuchten Submit
* Automatisches setzen des `novalidate`-Atributes für Formulare

Eine vollständige Übersicht findet sich ebenfalls auf der [github-Seite](https://github.com/johannesjo/ng-fab-form).
