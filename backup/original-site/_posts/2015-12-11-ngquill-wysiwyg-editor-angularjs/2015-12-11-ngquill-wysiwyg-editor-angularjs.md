---
title: "ngQuill - Der WYSIWYG Editor für AngularJS"
description: "Texte formatieren leicht gemacht. Der Rich-Text Editor QuillJS jetzt auch für eure AngularJS Anwendung."
author: "Bengt Weiße"
published_at: 2015-12-11 08:37:00.000000Z
categories: "angularjs"
---

Das Module [ngQuill] stellt dem Nutzer eine Direktive bereit, die den Einsatz des [Quill] Rich Text WYSIWYG Editors im eigene AngularJS-Projekt vereinfachen soll.

## Besonderheiten
  - über einen Provider voll konfigurierbar
  - Nutzung eigener Übersetzungen
  - Funktionen zur Formvalidierung (z.B. als required oder Fehler-CSS-Klasse)
  - Zugriff auf die originale Editor-Instanz - QuillJS-API kann voll genutzt werden!

## Installation
Die Installation ist, wie bei den meisten Frontend-Bibliotheken denkbar einfach:

__*bower:*__

```shell
$ bower install ngquill
```

oder

```shell
$ bower install ng-quill
```

__*npm:*__

```shell
$ npm install ng-quill
```

__*als ZIP:*__
[ngQuill Releases](https://github.com/KillerCodeMonkey/ngQuill/releases)

## Einrichtung
Nach dem das Modul erfolgreich installiert bzw. heruntergeladen wurde, muss die Quelle in die Hauptdatei (z.B. index.html) - neben AngularJS und QuillJS - der Anwendung eingebunden werden.Wurde die npm- oder bower-Installation genutzt, sind alle Abhängigkeiten bereits mit im node_modules oder bower_components Ordner enthalten.

```html
<script type="text/javascript" src="bower_components/quill/dist/quill.js"></script>
<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="bower_components/ngQuill/src/ng-quill.min.js"></script>
```

Damit auch der Editor direkt etwas hübscher aussieht, kann die CSS-Datei des Snow-Themes auch direkt im Kopfbereich der Seite eingefügt werden.

```html
<link rel="stylesheet" href="bower_components/quill/dist/quill.snow.css">
```

Als letzten Schritt muss das ngQuill-Modul noch als Abhängigkeit der eigenen Anwendung geladen werden.Die Definition der AngularJS-App könnte dann wie folgt aussehen.

```javascript
var myAppModule = angular.module('quillTest', ['ngQuill']);
```

## Nutzung
Ist ngQuill richtig installiert und eingebunden, stehen mehrere Komponenten zur Verfügung.

  1. ngQuillConfigProvider - Konfiguration des Editors im config-Block
  2. ngQuillConfig - Auslesen der Konfiguration nach dem App-Start
  3. ngQuillEditor - die Direktive als Herzstück :)

__Konfiguration über ngQuillConfigProvider__

Wie in AngularJS so üblich, dienen Provider als so etwas wie konfigurierbare Services.Daher bieten sie sich an Komponenten oder Programmteile zu Beginn global zu konfigurieren, damit sie später nicht einfach überschrieben werden können. Im Falle von ngQuill können hier global die Schriftarten und Schriftgrößen definiert werden.

```javascript
myAppModule.config([
  'ngQuillConfigProvider',
  function (ngQuillConfigProvider) {
    // Zwei Parameter: 1. Schriftgröße, 2. Schriftart
    ngQuillConfigProvider.set([{
      alias: '10',
      size: '10px'
    }], [{
      label: 'Arial',
      alias: 'Arial'
    }])
  }]);
```

__Auslesen der Konfiguration mit ngQuillConfig__

Oft muss auf die Konfigurationswerte des Moduls zugegriffen werden, um beispielsweise die Übersetzung anzupassen (z.B. bei mehrsprachigen Anwendungen). Dazu kann der Provider einfach als Abhängigkeit in AngularJS-Komponenten, z.B. Controller, eingebunden werden.

```javascript
myAppModule.controller('AppCtrl', [
  'ngQuillConfig',
  function(ngQuillConfig) {
    /* ngQuillConfig enthält folgende Schlüssel
    *  fontSizes --> Array von Schriftgrößen-Objekten
    *  fontFamilies --> Array von Schriftarten-Objekten
    *  formats --> Array von erlaube Formatierungen
    *  translations --> Übersetzungs-Objekt
    */
  }
});
```

__Den Editor einbinden mit ngQuillEditor__

Im Template kann ein Editor über die ngQuillEditor-Direktive erstellt werden. Dabei kann die globale Konfiguration lokal noch einmal überschrieben werden.
Attribute der Direktive:

 - toolbarEntries - Einträge in der Editor-Toolbar
 - toolbar - Indikator, ob Toolbar hinzugefügt werden soll oder nicht
 - showToolbar - Dadurch kann die Toolbar flexbil ein- und ausgeblendet werden
 - fontfamilyOptions - Globale Einstellungen der Schriftarten für diesen Editor überschreiben
 - fontsizeOptions - Globale Einstellungen der Schriftgrößen für diesen Editor überschreiben
 - linkTooltip - Ob Hilfswerkzeug für das Einfügen/Bearbeiten/Löschen von Links eingebunden werden soll
 - imageTooltip - Tooltip zum Einfügen von Bildern
 - theme - Setzen des zu verwendeten Themes per Theme-Name
 - translations - die Übersetzungen des Editors -> Überschreibt die Standardsprache
 - required - zur Formvalidierung von Pflichtfeldern
 - readOnly - Editor ist deaktiviert und Inhalte können nicht bearbeitet werden
 - errorClass - eigene Fehlerklasse
 - ngModel - verknüpft Editor mit einem Model - __Achtung!__ Änderungen im Editor werden auf das Model übertragen. Sollen externe Änderungen am Model im Editor sichtbar sein, sollte dies über die QuillJS-API geschehen *(siehe setHTML(), setText())*.

Im Template sieht das dann so aus.

```html
<ng-quill-editor
    ng-model="message"
    translations="translations"
    toolbar="true" show-toolbar="showToolbar"
    link-tooltip="true" image-tooltip="true"
    toolbar-entries="font size bold list bullet italic underline strike align color background link image"
    editor-required="true"
    required=""
    error-class="input-error"
    fontsize-options="fontsizeOptions"
    fontfamily-options="fontfamilyOptions">
</ng-quill-editor>
```

Ein komplettes Beispiel findet Ihr hier:
[Demo-Code]

__Die Editor-Instanz__

Oft reicht der Einsatz der Direktive nicht aus und der Zugriff auf die QuillJS-API benötigt. Aus diesem Grund wird das ngQuill-Modul ein Event *editorCreated* sobald ein Editor erzeugt wurde. Dieses erhält die neue Editor-Instanz als Parameter.

```javascript
$scope.$on('editorCreated', function (event, editor) {
  // editor enthält die QuillJS-Editor Instanz
});
```

__Übersetzungen__
Anbei eine kleine Liste mit den möglichen Übersetzungsschlüsseln und den daszugehörigen Standardübersetzungen.

 - font: 'Font',
 - size: 'Size',
 - small: 'Small',
 - normal: 'Normal',
 - large: 'Large',
 - huge: 'Huge',
 - bold: 'Bold',
 - italic: 'Italic',
 - underline: 'Underline',
 - strike: 'Strikethrough',
 - textColor: 'Text Color',
 - backgroundColor: 'Background Color',
 - list: 'List',
 - bullet: 'Bullet',
 - textAlign: 'Text Align',
 - left: 'Left',
 - center: 'Center',
 - right: 'Right',
 - justify: 'Justify',
 - link: 'Link',
 - image: 'Image',
 - visitURL: 'Visit URL',
 - change: 'Change',
 - remove: 'Remove',
 - done: 'Done',
 - cancel: 'Cancel',
 - insert: 'Insert',
 - preview: 'Preview'

## Entwicklung und Unterstützung

Das Modul ist aus einem kleinen Projekt entstanden, als ich eine schlichten, einfachen und leicht zu konfigurierenden Text-Editor gesucht habe. Für einen bequemen Einsatz benötigte ich dann eine Direktive. Natürlich ist dieses Modul noch ausbaufähig. Als Freund von freier Software bin ich für jede Unterstützung dankbar :).

   [quill]: <http://quilljs.com/>
   [ngQuillReleases]: <https://github.com/KillerCodeMonkey/ngQuill/releases>
   [ngQuill]: <https://github.com/KillerCodeMonkey/ngQuill>
   [Demo-Code]: <https://github.com/KillerCodeMonkey/ngQuill/blob/master/demo.html>
