---
title: "Ionic 2 Tutorial - Ionicons, ionic-native und Theming"
description: "Im letzte Teil unseres Ionic 2 Tutorials betrachten wir noch einige besondere Funktionen und Bestandteile des Frameworks wie Ionicons oder ionic-native."
author: "Bengt Weiße"
published_at: 2016-05-18 12:12:12.000000Z
categories: "ionic2 angular angular2 angular4 tutorial"
---

Im letzten Teil unseres Ionic 2 Tutorials schauen wir uns ein paar besondere Bestandteile und Funktionen des Frameworks an. Dabei legen wir auch ein letztes Mal Hand an unsere Pizza-App, die wir in [Teil 1](/artikel/ionic2-tutorial-deutsch/) und [Teil 2](/artikel/ionic2-content-tutorial-deutsch/) schon von Grund auf entwickelt haben.

Den finalen und [kompletten Quellcode](https://github.com/angularjs-de/ionic2-pizza-service "Quellcode Ionic 2 Pizza App") der in diesem Tutorial entwickelten App findet unter unserem GitHub-Account. Außerdem gibt es auch eine [Live-Vorschau](http://angularjs-de.github.io/ionic2-pizza-service/www/ "Ionic 2 Pizza App") der App.

**Teil 3: Besondere Bestandteile des Frameworks**
1. Nutzung der Ionicons über `ionIcon`
2. Theming der eigenen App
3. Konfiguration eurer App
4. Zugriff auf native Schnittstellen (Plugins) durch `ionic-native`
5. Ein einfaches Eventsystem

## Nutzung der Ionicons

Was die Ionicons sind und wie ihr sie noch in anderen Projekten nutzen könnt, erfahrt ihr in unserem Tutorial zu den [Ionicons in Ionic 1](/artikel/ionic-tutorial-deutsch-ionicons/).

In der neuen Version des Frameworks ist jedoch eine neue Komponente extra dafür hinzugekommen. Sie heißt `ionIcon` und wir haben sie in unserem Tutorial schon an manchen Stellen eingesetzt. Sie erwartet im einfachsten Fall einen Icon Namen.

```html
<ion-icon name="pizza"></ion-icon>
```

Dadurch sucht sich Ionic das passende Icon je nach Plattform. Eine Liste aller verfügbaren [Icon Namen](http://ionicframework.com/docs/v2/ionicons/) findet ihr in der Ionic Dokumentation.

![Bild](ionic2-ionicon.png)

Wollt ihr selbst entscheiden, welches Icon für die Plattformen angezeigt werden, dann könnt ihr dies auch. Setzt das Icon nicht über das `name` Attribute, sondern einfach über das Plattformkürzel, z.B. `ios` oder `md`.

```html
<ion-icon ios="logo-apple" md="logo-android"></ion-icon>
```

Falls ihr die Icons dynamisch setzten wollte, können diese natürlich auch aus einer Variable oder Expression kommen.

```html
<ion-icon [name]="myIconVar"></ion-icon>
```

Eine erfreuliche Zusatzfunktion erhaltet ihr über das Setzen des `isActive` Attributes auf `false` bzw. wieder auf `true`. Dadurch werden automatisch im aktiven Modus gefüllte und im inaktiven leere (outline), nur mit einer Randlinie versehene Icons genutzt.

```html
<!-- active -->
<ion-icon name="pizza"></ion-icon>
<!-- inactive -->
<ion-icon name="pizza" isActive="false"></ion-icon>
```

## Theming der eigenen App

Das Layouten der eigenen Ionic App nennt sich nun *Theming*, da nun das Styling der einzelnen Plattformen explizit getrennt wurde. Im Vergleich zu Ionic 1 müsst ihr nicht erst die Nutzung von SASS/SCSS extra aktivieren. In der neuen Version des Frameworks wird standardmäßig mit SCSS gearbeitet. Alle wichtigen Dateien findet ihr wieder im `src` Ordner im Unterverzeichnis `theme`. Hier findet ihr eine `variables.scss`, in der ihr einfach die Style-Variablen, z.B. die Farben anpassen könnt.

Das spezielle Styling bestimmter `View`s und Komponenten sollte in einer extra SCSS-Datei im jeweiligen Verzeichnis stattfinden. Dabei sollten auch hier die Angular2 Benamungs-Konventionen beachtet werden. Als Beispiel würde eine SCSS für unseren Warenkorb `cart.component.scss` heißen und mit im Ordner `cart` liegen.

In der `variables.scss` werden Standardfarben gesetzt. Dabei ist `primary` die einzig fixe. Der Rest kann auch entfernt oder umbenannt werden.

```css
$colors: (
  primary:    #387ef5,
  secondary:  #32db64,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222,
  favorite:   #69BB7B
);
```

Ihr könnt die Farben aber nicht nur im SCSS wiederverwenden. Nutzt sie einfach im Template.

```html
<button ion-button color="danger">Attention!</button>
```

Fügt einfach weitere Farben hinzu und spezifiziert sowohl Text- als auch Hintergrundfarbe!

```css
$colors: (
  ...
  twitter:(
    base: #55acee, // bgcolor
    contrast: #ffffff // textcolor
  )
)
```

```html
<button ion-button color="twitter">Blue & White!</button>
```

Euch steht euch ein extra `color` Mixin zur Verfügung, um auf die Farben im SCSS zu zugreifen und auf deren Basis neue Farben zu erzeugen.

```css
background: color($colors, twitter, contrast);
```

Eine Liste von weiteren Funktionen und vorhanden Variablen findet ihr - wie immer - in der [Ionic Dokumentation zum Theming](http://ionicframework.com/docs/v2/theming/).

## Konfiguration eurer App

Falls ihr mit dem Standardverhalten eurer App noch nicht zufrieden seid oder ihr plattformspezifische Einstellungen vornehmen wollt, könnt ihr das natürlich auch in Ionic 2 tun. Dies geschieht nicht, wie in Ionic 1 über einen extra Provider ([`$ionicConfigProvider`](/artikel/ionic-tutorial-deutsch-configuration/)), sondern direkt über das `IonicModule` Modul von Ionic. Der `forRoot` Funktion in den imports des `@NgModule` Decorators könnt ihr als zweiten Parameter ein Konfigurationsobjekt übergeben. Welches alle oder bloß für bestimmte Plattformen Einstellungen vornehmen kann.

```typescript
IonicModule.forRoot(PizzaAppComponent, {
  backButtonText: 'Go Back',
  iconMode: 'ios',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabbarPlacement: 'bottom',
  pageTransition: 'ios',
});

IonicModule.forRoot(PizzaAppComponent, {
  tabbarPlacement: 'bottom',
  platforms: {
    ios: {
      ...
    }
  }
});
```

Ihr könnt die Einstellung auch später über die [`Config`](http://ionicframework.com/docs/v2/api/config/Config/) Instanz der App anpassen. Auf der entsprechenden Seite in der Dokumentation findet ihr auch alle möglichen Konfigurationsparameter.

Eine noch speziell zu erwähnende Funktion ist das Setzen einer fixen Plattform. So erhaltet ihr, beispielsweise auch auf iOS das Aussehen einer Android App. Dazu setzt ihr den config-Schlüssel `mode` auf das entsprechende Plattformkürzel.

```typescript
IonicModule.forRoot(PizzaAppComponent, {
  mode: 'md'
});
```

In unserer Pizza App wollen wir auf allen Plattformen nur einen Zurück-Pfeil auf Unterseiten anzeigen. Auf Android ist der Text bereits von vornherein leer.

![Bild](ionic2-card-complex.png)

Nun setzen wir den Back-Button Text generell auf einen Leerstring.

```typescript
IonicModule.forRoot(PizzaAppComponent, {
  backButtonText: ''
});
```

![Bild](ionic2-config.png)


## Zugriff auf native Schnittstellen

Mit *ngCordova* machte Ionic ein wichtigen Schritt nach vorne, um hybride App-Entwicklung noch weiter zu vereinheitlichen und zu vereinfachen. Sie stellen damit eine Schnittstelle zu zahlreichen Cordova-Plugins her und geben dem Ionic/Angular-Entwickler eine einheitliche API für alle.

Für Ionic 2 und TypeScript gibt es dafür ein extra Modul mit dem Namen `ionic-native`. Darüber erhaltet ihr Zugriff auf verschiedenste Cordova-Plugins. Sucht euch einfach das gewünschte Plugin aus der [Liste unterstützter APIs](http://ionicframework.com/docs/v2/native/) heraus. Installiert das Plugin über die CLI und importiert das entsprechende Modul.

Als Beispiel würde die Nutzung der Geräte-Kamera wie folgt aussehen:

**Kamera Plugin installieren**

```shell
ionic plugin add cordova-plugin-camera
```

**`Camera` importieren**

```typescript
import { Camera } from 'ionic-native';
```

**`Camera` nutzen**

```typescript
Camera.getPicture(options).then((imageData) => {
  // imageData is either a base64 encoded string or a file   URI
  // If it's base64:
  let base64Image = "data:image/jpeg;base64," + imageData;
  }, (err) => {
});
```

<div class="alert alert-warning"><b>Beachte:</b> Ist euer Projekt über die Ionic CLI angelegt, ist <code>ionic-native</code> bereits installiert und eingebunden. In allen anderen Fällen folgt bitte der <a href="http://ionicframework.com/docs/v2/native/" target="_blank">Anleitung in der Dokumentation</a>.</div>

## Ein einfaches Eventsystem

Wer sich schon mit Outputs/EventEmitter und Observables in Angular 2 auseinandergesetzt hat, weiß wie umständlich es sich im ersten Moment anfühlt, vorausgesetzt man hat es verstanden. Ionic bietet euch dazu eine eigene einfache Lösung und stellt euch diese über den `Events` Service zur Verfügung.

Er erlaubt es euch über `publish()` ein Event auszusenden, mit `subscribe()` darauf zu hören und sich über `unsubscribe()` wieder vom Event abzumelden.

 - **publish**(topic, eventData) - sendet allen Abonnenten des `topic`s die `eventData`
 - **subscribe**(topic, handler) - sich zu einem Thema anmelden, `handler` Funktion wird mit `eventData` ausgeführt
 - **unsubscribe**(topic, handler) - meldet ein bestimmtes Abonnement wieder ab

Das Eventsystem ist intern einfach eine Liste von `Topics` an denen alle Abonnenten mit Handler Funktion gespeichert werden. Der ein oder andere hat sich vielleicht nach dem gleichen Schema schon mal selbst ein Eventsystem geschrieben.

Im Quellcode sieht das dann so aus.

```typescript
import {Events} from 'ionic-angular';

constructor(public events: Events) {}

// first page (publish an event when a user is logged in)
function login(user) {
  console.log('User logged in!')
  events.publish('user:loggedin', user);
}

// second page (listen for the user logged in event)
events.subscribe('user:loggedin', (user) => {
  console.log('Welcome', user);
});
```

Da die Identifizierung eines Events jedoch auf einfachen Strings basiert, sollte vor allem bei komplexen Anwendungen Vorsicht geboten sein. Nur allzu leicht benutzt man unwissend bereits vorhandene Events und erhält dann unter Umständen ein unerwartetes Ergebnis oder unschöne Überraschung.

## Fazit

Unsere App ist nun fertig und ihr habt hoffentlich viel über Ionic 2 gelernt. Versucht doch ausgehend von dieser Basis die App noch zu erweitern. In unserer finalen Umsetzung haben wir noch ein paar Kleinigkeiten eingebaut, z.B. ein Badge im Seitemenü und die Nutzung von EventEmitter, um die Warenkorb Toasts nur an einer Stelle abfangen zu müssen.
