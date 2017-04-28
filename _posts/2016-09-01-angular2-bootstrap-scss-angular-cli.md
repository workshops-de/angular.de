---
title: "Bootstrap SCSS 4 mit Angular in wenigen Sekunden"
description: "Gestaltet eure Angular Anwendung spielend leicht mit Bootstrap und SCSS. Hier erhaltet ihr eine einfache Schritt-für-Schritt-Anleitung."
author: "Robin Böhm"
slug: "angular2-bootstrap-scss-angular-cli"
published_at: 2016-09-01 10:00:00.000000Z
categories: "angular angular2 angular4 bootstrap scss cli"
header_image: "/artikel/header_images/angular2-bootstrap-scss-angular-cli.jpg"
---

Die Einbindung von Bootstrap 4(SCSS) in einem Angular Projekt könnt ihr mit wenigen Schritten erreichen.
Als Basisprojekt nutze ich hierbei das Standard-Projekt von `angular-cli`.

Ihr könnt euch die `angular-cli` sehr einfach über folgenden Befehl installieren.

```shell
npm i -g angular@webpack
```

Für die globale Installation mit `-g` benötigt ihr gegebenenfalls mehr Rechte als euer Standard-User besitzt.
Nach der Installation habt ihr das Kommandozeilenwerkzeug `angular-cli` zur Verfügung.

```shell
angular-cli: 1.0.0-beta.11-webpack.8
node: 6.2.0
os: darwin x64
```

Mit dem `angular-cli` könnt ihr euch nun super einfach ein neues Projekt erstellen. Ich nutze hierbei noch den Flag `--style=scss`, um mir alle generierten Style-Files direkt mit der `.scss`-Endung zu generieren. Da ich nachher die Bootstrap SCSS Version nutzen möchte, macht es mir die folgenden Schritte deutlich leichter.

```shell
ng new a2bootstrap --style=scss
```

Nach der Installation habe ich dann ein Standard-Angular-Projekt, welches ich mit `ng serve` direkt starten kann. Es öffnet sich dann ein Webserver der auf den Port 4200 horcht. Ihr könnt also mit <a href="http://localhost:4200">http://localhost:4200</a> eure Angular Anwendung sofort aufrufen. Diese beinhaltet aktuell noch nicht das CSS-Framework Bootstrap. Dies können wir ebenfalls über NPM installieren. Ich nutze dazu folgenden Befehl um die Version 4 zu installieren.

```shell
npm install bootstrap@4.0.0-alpha.5
```

Nach der Installation liegt Bootstrap in meinem `node_modules/bootstrap/` Verzeichnis. Die SCSS Version findet ihr in dem Unterverzeichnis `scss`. Nun muss ich diese nur noch via `@import` Statement in der Datei `src/style.scss` einbinden. Alternativ könnt ihr auch die Default-Style-Extension mit folgendem Befehl Nachträglich ändern.

```shell
ng set defaults.styleExt scss
```

Danach wird der Webserver, den wir über `ng serve` gestartet haben, unsere Anwendung neu bauen und die Seite in unserem Browser automatisch aktualisieren.

```css
@import "../node_modules/bootstrap/scss/bootstrap";
```

Nun können wir in unseren Komponenten direkt die Bootstrap-Klassen benutzen. In dem Beispiel-Projekt bietet sich hierbei das Template unserer App-Component an, welches ihr in `src/app/app.component.html` findet.

```html
<div class="alert-warning">Hallo Welt!</div>

<div class="row">
  <div class="col-xs-4">A</div>
  <div class="col-xs-4">B</div>
  <div class="col-xs-4">C</div>
</div>
```

![Bild](medium_Screen-Shot-2016-09-01-at-19.00.45.png?v=63639968496)

Hier nochmal kurz der Video-Mitschnitt zur Einrichtung!

<iframe width="100%" height="360" src="https://www.youtube.com/embed/u1_IeSkM1yc" frameborder="0" allowfullscreen></iframe>
