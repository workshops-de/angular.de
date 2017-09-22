---
title: "Bootstrap SCSS 4 mit Angular in wenigen Sekunden"
description: "Gestaltet eure Angular Anwendung spielend leicht mit Bootstrap und SCSS. Hier erhaltet ihr eine einfache Schritt-für-Schritt-Anleitung."
author: "Robin Böhm"
slug: "angular-bootstrap-scss-angular-cli"
published_at: 2016-09-01 10:00:00.000000Z
categories: "angular bootstrap scss cli"
header_image: "/artikel/header_images/angular-bootstrap-scss-angular-cli.jpg"
---

## Warum brauche ich Bootstrap in meinem Angular Projekt?

Bootstrap ist ein CSS-Framework welches ein sehr breites Spektrum fertigen Komponenten und Funktionen bietet.
Es bietet unter anderen ein fertiges Grid-Layout welches sogar mit Flexbox arbeiten kann.
Gerade beim Start eines Projektes lassen sich hiermit Layouts und Designs einfach umsetzen, sodass auch die ersten Prototypen eurer WebAnwendung nicht komplett hässlich aussehen.

## Was hat Bootstrap SCSS für Vorteile?

SCSS ist eine Syntax-Erweiterung für CSS, welche euch ermöglicht verschiedene Konstrukte zu benutzen die CSS sonst nicht unterstürzt. Nützlich sind z.B. die Definition von Variablen und Funktionen. Dies erleichtert die Erstellung und vorallem die Wartbarkeit von Styles in eurem Projekt.

## Wie binde ich Bootstrap in mein Angular-CLI-Projekt ein?

Die Einbindung von Bootstrap 4(SCSS Version) in euer Angular Projekt könnt ihr mit wenigen Schritten erreichen.
Als Basisprojekt nutze ich hierbei das Standard-Projekt von `angular-cli`.
Das Projekt welches das CLI(Command-Line-Interface) generiert arbeitet bereits mit einer fertigen Konfiguration welche auf Webpack basiert.


Ihr könnt `angular-cli` sehr einfach über folgenden Befehl installieren.
Vorbedingung hierfür ist, dass Ihr NodeJS und somit den Paketmanager `npm` installiert habt.

```shell
npm i -g @angular/cli
```

Für die globale Installation mit `-g` benötigt ihr gegebenenfalls mehr Rechte als euer Standard-User besitzt.
Nach der Installation habt ihr das Kommandozeilenwerkzeug `angular-cli` zur Verfügung.
Mit dem Befehl `ng -v` könnt ihr euch die aktuelle Version ausgeben lassen.

```shell
@angular/cli: 1.4.2
node: 6.11.0
os: darwin x64
```

Mit dem `angular-cli` könnt ihr euch nun super einfach ein neues Projekt erstellen.
Ich nutze hierbei noch den Flag `--style=scss`, um mir alle generierten Style-Files direkt mit der `.scss`-Endung zu generieren.
Da ich nachher die Bootstrap SCSS Version nutzen möchte, macht es mir die folgenden Schritte deutlich leichter.

```shell
ng new AngularBootstrap --style=scss
```

Alternativ könnt ihr auch nachträglich die Default-Style-Extension mit folgendem Befehl ändern oder direkt der Datei  `.angular-cli.json` im Hauptverzeichnis der Projektes anpassen.

```shell
ng set defaults.styleExt scss
```

Nach der Installation habe ich dann ein Standard-Angular-Projekt, welches ich mit `ng serve` direkt starten kann.
Es öffnet sich dann ein Webserver der auf den Port 4200 horcht.
Ihr könnt also mit <a href="http://localhost:4200">http://localhost:4200</a> eure Angular Anwendung sofort aufrufen.
Diese beinhaltet aktuell noch nicht das CSS-Framework Bootstrap.
Dies können wir ebenfalls über NPM installieren.
Ich nutze dazu folgenden Befehl um die Version 4 zu installieren.

```shell
npm install bootstrap@4.0.0-beta
```

Nach der Installation liegt Bootstrap in meinem `node_modules/bootstrap/` Verzeichnis.
Die SCSS Version findet ihr in dem Unterverzeichnis `scss`.
Nun kann ich diese via `@import` Statement in der Datei `src/style.scss` einbinden.

Danach wird der Webserver, den wir über `ng serve` gestartet haben, unsere Anwendung neu bauen und die Seite in unserem Browser automatisch aktualisieren.

```css
@import "../node_modules/bootstrap/scss/bootstrap";
```

Nun können wir in unseren Komponenten direkt die Bootstrap-Klassen benutzen.
In dem Beispiel-Projekt bietet sich hierbei das Template unserer App-Component an, welches ihr in `src/app/app.component.html` findet.

```html
<div class="alert-warning">Hallo Welt!</div>

<div class="row">
  <div class="col-xs-4">A</div>
  <div class="col-xs-4">B</div>
  <div class="col-xs-4">C</div>
</div>
```

## Fazit

Ich benutze für meine Projekte fast immer Bootstrap in der SCSS Version.
Natürlich könnt ihr andere CSS oder SCSS Frameworks ähnlich einfach einbinden, Bootstrap dient hier nur als Beispiel.
Mit diesem Grund-Setup bin ich sofort produktiv und kann iterativ das Projekt erweitern.
Um euch zu zeigen wie schnell das gehen kann, hab ich hierzu ein kurzes Video aufgenommen.

Danke fürs lesen! Feedback jederzeit willkommen!

## Video

![Bild](medium_Screen-Shot-2016-09-01-at-19.00.45.png?v=63639968496)

Hier nochmal kurz der Video-Mitschnitt zur Einrichtung!

<iframe width="100%" height="360" src="https://www.youtube.com/embed/u1_IeSkM1yc" frameborder="0" allowfullscreen></iframe>
