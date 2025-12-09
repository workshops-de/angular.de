---
title: "Ionic Framework Tutorial - Dialoge und Modals"
description: "Der nächste Teil unseres Ionic Tutorials beschäftigt sich mit Dialogen und Modals. Wann, und wie ihr sie einsetzen solltest erfahrt ihr hier."
author: "Bengt Weiße"
published_at: 2016-01-25 08:29:00.000000Z
categories: "ionic angularjs tutorial"
---

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/11-Modals) und [Live-Demo](https://angularjs-de.github.io/ionic-tutorial/11-Modals/#/order)

**Voraussetzung**: Ihr solltet generell mit dem Framework und dem Aufbau einer Ionic-App vertraut sein. Einen Überblick dazu erhaltet ihr in unserem  [Ionic Framework Einführungstutorial](/artikel/ionic-tutorial-deutsch/).

Auf mobilen Geräten ist der Platz sehr beschränkt, um Informationen zu präsentieren. Oft müssen jedoch viele Funktionen und Details auf einer View untergebracht werden. Eine Lösung dieses Dilemmas bieten Modals. Sie legen sich über die gerade geöffnete View und bedecken diese komplett oder nur teilweise. Dies hat den Vorteil, dass der Nutzer immer noch weiß, dass sich die Inhalte des Modals noch auf die darunter liegende View und daher auch auf den gleichen Kontext beziehen.

Ein Anwendungsfall wäre z.B. eine Produktdetailseite. In einer Shopping-App liegt das Hauptaugenmerk auf das Präsentieren der eigenen Produkte und den schnellen Kauf. Auf der Produkt-View wird also ansprechend das Produkt präsentiert mit allen rechtlichen und wichtigen Daten (Lieferzeit, Preis, zum Warenkorb hinzufügen, Lagerbestand, Lieferzeit, ...). Nun gehört das Produkt zu einer bestimmten Marke. Informationen zu dieser können wichtig sein, aber haben im Vergleich zu den restlichen Daten keine Relevanz. Sollen diese trotzdem auf einem Weg erreichbar sein, kann ein Information-Button/Icon eingebaut werden, welches beim Tap ein Modal öffnet und die Marken-Details einblendet. So wird der Nutzer nicht aus seinem "Kauf-Flow" gerissen und verlässt auch die Produktdetailseite nicht.

In Ionic könnt ihr kinderleicht Modals erstellen und mit diesen arbeiten.
Ein Modal in Ionic besteht aus zwei Teilen.

 1. ionicModalView-Direktive - Erstellen des Modal-Templates
 2. $ionicModal-Service - Erzeugung des Modals

**Modal-Templates mit ionicModalView**

Damit Ionic die zusätzlichen Funktionen für den späteren Modal erzeugen kann, muss das Template des Modal von der *ionicModalView*-Direktive umschlossen werden. Danach kann ganz normal der Inhalt eingefügt werden. Dabei stehen euch alle Grundstrukturierungselemente zur Verfügung. Das bedeutet eine Header- oder Footerbar ist kein Problem. Der eigentliche scrollbare Inhalt sollte jedoch in einen *ionContent* gepackt werden.

```html
<script id="myModal.html" type="text/ng-template">
  <ion-modal-view>
    <ion-header-bar>
      <h1 class="title">Modal-Titel</h1>
    </ion-header-bar>
    <ion-content>
      Huhu!
    </ion-content>
  </ion-modal-view>
</script>
```

**Modals erzeugen mit $ionicModal**

Der *$ionicModal*-Service wird ganz normal, wie jede andere Abhängigkeit in euren Controller eingebunden. Danach stehen euch über diesen zwei Funktionen bereit, um einen Modal zu erstellen.

 1. $ionicModal.**fromTemplateUrl**(templateUrl, options) - Erstellt Modal anhand einer Template-Url
 2. $ionicModal.**fromTemplate**(templateString, options) - Erstellt Modal anhand eines Template-Strings

Beide Funktionen erwarten zwei Parameter, wobei der letztere ein Konfigations-/Optionsobjekt ist. Dieses Objekt kann folgende Keys beinhalten.

 - scope - ein Scope-Objekt, standardmäßig wird ein neuer scope angelegt
 - animation - Animationsklasse, die beim ein- bzw- ausblenden genutzt wird, standardmäßig *slide-in-up*
 - focusFirstInput - true oder false, ob das erste Eingabefeld automatisch fokussiert werden soll, standardmäßig false
 - backdropClickToClose - true oder false, ob Modal beim Klick auf den Backdrop geschlossen wird, standardmäßig true
 - hardwareBackButtonClose - true oder false, ob Modal beim Klick auf den Hardware-Zurück-Knopf geschlossen wird (Android), standardmäßig true

Als Rückgabewert liefern beide ein Promise zurück, welches mit der Modal-Instanz resolved wird, wenn der Modal erfolgreich erstellt wurde.

```javascript
$ionicModal.fromTemplateUrl('myModal.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal;
});
```

Über $scope.modal kann nun auf unseren Modal zugegriffen werden.

**Nutzung eines Modals**

Ist ein Modal erstellt, besitzt er wiederum verschiedene Funktionalitäten, um einfach damit arbeiten zu können

 - show - blendet Modal ein, gibt ein Promise zurück, welches resolved wird, wenn Modal fertig eingeblendet (animiert) wurde
 - hide - blendet Modal aus, gibt ein Promise zurück, welches resolved wird, wenn Modal fertig ausgeblendet (animiert) wurde
 - isShown - true oder false, gibt an, ob Modal gerade sichtbar ist
 - remove - lösche Modal-Instanz, entfernt ihn auch aus DOM

Nun haben wir das nötige Rüstzeug, um Modals in unserer Pizza-Service-App zu verwendet. Als Aufgabe soll nun die "Über Uns" Seite ein Modal werden.

Dazu wird aus dem aboutUs-Template ein aboutUsModal-Template.

```html
<ion-modal-view>
  <ion-header-bar>
    <div class="buttons">
      <button class="button button-clear icon ion-android-close" ng-click="aboutModal.hide()">
      </button>
    </div>
    <h1 class="title">Über uns</h1>
  </ion-header-bar>
  <ion-content class="padding">
    <div>
      Wir sind Ihr Lieferdienst, wenn es um PIZZA* geht! Dafür stehen wir mit unserem Namen.
    </div>
  </ion-content>
  <ion-footer-bar>
    <small>*ohne Ananas!</small>
  </ion-footer-bar>
</ion-modal-view>
```

Als nächstes erstellen für unseren Bases-State einen eigenen Controller names **baseCtrl*** in dem wir den Modal erzeugen.

```javascript
$ionicModal.fromTemplateUrl('app/templates/aboutModal.html', {
    scope: $scope
}).then(function (modal) {
    $scope.aboutModal = modal;
});
```

Wir stellen dem baseCtrl-Scope unseren Modal zur Verfügung. Dadurch können wir direkt im Template auf die Funktionen des Modals zugreifen. Dazu tauschen wir den bisherigen Menü-Eintrag im Seitenmenü aus.

```html
<a ng-click="aboutModal.show()" class="item item-icon-left" menu-close>
  <i class="icon ion-ios-people"></i>
  Über Uns
</a>
```

Der about-Zustand kann nun aus der State-Definition entfernt werden.
Das Ergebnis kann sich dann sehen lassen :).

![Bild](ionic-modals.gif?v=63629079934)
