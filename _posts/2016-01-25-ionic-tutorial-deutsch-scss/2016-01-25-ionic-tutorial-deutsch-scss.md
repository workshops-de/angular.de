---
title: "Ionic Framework - Das Arbeiten mit SCSS"
description: "Mit Ionic habt ihr die Möglichkeit eure App mit SCSS zu stylen. Wie und warum ihr das tun solltet, erfahrt ihr hier."
author: "Bengt Weiße"
published_at: 2016-01-25 08:29:00.000000Z
categories: "ionic angularjs tutorial"
---

Für den geübten Webentwickler sind die Erweiterungssprachen Less und SASS/SCSS nicht mehr wegzudenken. Variablen und Mixins lassen - sagen wir mal fast - kinderleicht komplexe Layouts realisieren und redundanter CSS-Code sollte damit der Vergangenheit angehören.

Wie schöne wäre es, wenn das auch in Ionic-Projekten ginge.
**ES GEHT!**

Falls ihr noch eine kleine Einführung in das Thema Ionic und das Framework braucht, empfehle ich euch unser [Ionic-Einführungstutorial](/artikel/ionic-tutorial-deutsch/ "Einführung in Ionic").

## SCSS in CLI-Projekten

Ist euer Ionic-CLI-Projekt fertig eingerichtet, seid ihr nur ein paar kleine Schritte von der Lösung entfernt.

Einfach in der Kommandozeile folgenden Befehl abfeuern:

```shell
ionic setup sass
```

Dieser sollte euer Projekt nun so umbauen, dass automatisch alles funktioniert :).

Danach habt ihr im Wurzelverzeichnis des Projekt einen scss-Order. In diesem liegt die ionic.app.scss-Datei, welche nun euer Ausgangspunkt ist.

Im Hintergrund passieren folgende Schritte (die ihr natürlich auch manuell ausführen könne, falls euer Projekt nicht dem Ionic-Standard folgt oder der obige Befehl nicht funktioniert).

1. führt `npm install` aus und installiert alle nötigen Abhängigkeiten, z.B. Gulp, gulp-sass, gulp-minify-sass
2. Löscht die CSS-Pfade aus der index.html:
3. `<link href="lib/ionic/css/ionic.css" rel="stylesheet">`
4. `<link href="css/style.css" rel="stylesheet">`
5. Fügt dafür den neuen CSS-Pfad ein `<link href="css/ionic.app.css" rel="stylesheet">`
6. in die `ionic.project`  Datei fügt ihr dann folgende Zeile ein: `"gulpStartupTasks": ["sass", "watch"]`

Der letzte Schritt startet bei diversen CLI-Befehlen, wie `ionic serve` automatisch den Standard-SCSS-Watcher. Bei jeder Änderung in der ionic.app.scss wird das CSS neu generiert und die Vorschau im Browser automatisch aktualisiert. Natürlich könnt ihr hier auch euren eigenen Gulp-Task einfügen oder zusätzliche ergänzen.

## SCSS in einfachen Webprojekten

Durch Services, wie PhoneGap-Build ist man nicht immer auf das CLI angewiesen. Auch hier lässt sich recht simpel mit den SCSS-Quellen Arbeiten.

Dazu ladet ihr entweder die Quellen aus dem [Ionic-Bower-Repository](https://github.com/driftyco/ionic-bower "Ionic-Bower Repository") herunter oder installiert das Framework direkt über bower mit `bower install driftyco/ionic-bower#master`.

Nach dem Installieren findet ihr im Ionic-Verzeichnis unter *scss* eine Reihe von Dateien. Die wichtigste davon ist die **ionic.scss**. Diese müsst ihr in eure eigene scss-Datei importieren.

Danach könnt ihr euch zum Einrichten des Watchern, zum Kompilieren der Datei, an dem Gulpfile von einem Ionic-CLI-Projekt orientieren.

### Hinweise zum Arbeiten mit SCSS und Ionic

Vor dem planlosen Start mit SCSS und Ionic solltet ihr euch die verschiedenen scss-Dateien von Ionic näher anschauen.

Es fällt auf, dass die meisten davon jeweils für eine entsprechende Komponente des Frameworks existiert, z.B. _modal.scss. Wichtiger sind aber die Dateien, die scheinbar keiner Komponente zuzuordnen sind.

 - _animations.scss - Definition der Standardanimationen, z.B. Einblenden von Modals
 - _mixins.scss - Funktionen zur Erstellung von CSS-Attributen (Parameter gesteuert), z.B. Flexbox-Styling, einfaches und browserkompatibles Stylen von Schatten, ...
 - _transitions.scss - Definition der View-Übergänge
 - _variables.scss - Style-Variablen, die in allen anderen scss-Dateien genutzt werden, Definition der Standard-Farben, -Schriften

Die *_animations.scss* und *transitions.scss* sind hilfreich, wenn ihr eigene Animationen definieren wollt, aber nicht genau wisst wie das geht. Orientiert euch einfach den Standard-Animationen und -Übergängen!

Oft ist es nervig für jeden zu unterstützenden Browser bestimmte Style-Attribute zu setzen. In der *_mixins.scss* findet ihr für die gängigsten Probleme (z.B. box-shadow, Animationen) ein Mixin, welches ihr natürlich in eurer scss-Datei einfach durch den Import der ionic.scss nutzen könnt.

Die wohl wichtigste Datei für euch ist die *_variables.scss*. Dort sind alle Grundfarben, -schriften und weitere Variablen definiert. Viele fangen an für solche Dinge einfach eigene Variablen oder gar die kompletten CSS-Klassen zu überschreiben. Dabei braucht ihr einfach die nötigen Variablen überschreiben, und schon habt ihr der App einen eigenen Touch verliehen. *Wichtig dafür ist aber, dass ihr die Variablen vor dem Einbinden der ionic.scss überschreiben müsst!*

### Beispiel einer SCSS-Datei

```css
/*
To customize the look and feel of Ionic, you can override the variables
in ionic's _variables.scss file.

For example, you might change some of the default colors:

$light:                           #fff !default;
$stable:                          #f8f8f8 !default;
$positive:                        #387ef5 !default;
$calm:                            #11c1f3 !default;
$balanced:                        #33cd5f !default;
$energized:                       #ffc900 !default;
$assertive:                       #ef473a !default;
$royal:                           #886aea !default;
$dark:                            #444 !default;
*/

// The path for our ionicons font files, relative to the built CSS in www/css
$ionicons-font-path: "../lib/ionic/fonts" !default;

// Include all of Ionic
@import "www/lib/ionic/scss/ionic";
```

Das war es auch schon! Legt los und habt Spaß! :)
