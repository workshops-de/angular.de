---
title: "Ionic - Konfiguration mit $ionicConfigProvider"
description: "Im letzten Teil unserer Ionic Tutorialreihe zeigen wir euch, wie ihr mit dem $ionicConfigProvider das Framework pro Plattform konfigurieren könnt."
author: "Bengt Weiße"
published_at: 2016-01-27 08:29:00.000000Z
categories: "ionic angularjs tutorial"
---

Wie wir im [Einführungsartikel](/artikel/ionic-tutorial-deutsch/) zu Ionic erfahren haben, bringt das Framework eine Reihe von Funktionen und Komponenten mit. Viele von diesen sind über eigene Services konfigurierbar und lassen sich so spielend leicht den eigenen Vorstellungen anpassen. Für die grundlegenden Einstellungen des Frameworks bietet Ionic einen eigenen Provider mit dem Namen **$ionicConfigProvider** an.

Hier wurde mit Absicht der Typ Provider gewählt, da diese Einstellungen vor dem Start der Anwendung bzw. nicht nachträglich gesetzt werden sollen, da sie für den generellen App-Betrieb und das -Aussehen verantwortlich sind.

Für uns bedeutet das, dass wir zusätzlich zu den Zustandsdefinitionen auch Ionic in der config-Phase der AngularJS-App konfigurieren können. Dazu wird einfach der $ionicConfigProvider, wie alle anderen Provider auch, als Abhängigkeit geladen.

Danach stehen uns eine Vielzahl von Funktionen zur Verfügung. Es sei erwähnt, dass die Funktionen Setter, als Getter sind. Übergebt ihr ihnen keinen Wert, erhaltet ihr die aktuelle Konfiguration zurück.

Des Weiteren könnt ihr auch plattform-spezifisch alle Funktionen aufrufen und so eure App, je nach Betriebssystem anpassen. Dazu ruft ihr alle nachfolgend vorgestellten Funktionen über `platform.NAME` auf. Als Beispiel würde das Setzten der zu cachenden Views unter Android folgendermaßen aussehen.

`$ionicConfigProvider.platform.android.views.maxCache(5);`

## Verhalten der Views und Caching

**$ionicConfigProvider.views.transition(transition)**

Hier kann der Standard-View-Übergang gesetzt werden. Dabei kann *transition* folgende Werte annehmen.

 - platform - nimmt den für die aktuelle Plattform spezifischen Übergang, falls nicht Android oder iOS, wird iOS genutzt
 - android - Android-Style
 - ios - iOS-Style
 - none - kein Übergang

**$ionicConfigProvider.views.maxCache(maxNumber)**

Setzt die maximale Anzahl von Views, die im Cache gehalten werden. Dadurch bleiben sie im DOM!!!, daher sollte die Zahl nicht zu hoch gewählt werden. Setzt ihr *maxNumber* auf 0, wird das ViewCaching dadurch deaktiviert. Der Standardwert beträgt 10.

**$ionicConfigProvider.views.forwardCache(value)**

Im Normalfall werden von Ionic nur die so genannten BackViews gecached. Das bedeutet, wenn ich mich in die Navigationshistorie hineinnavigiere, werden die vorherigen Views gecached. Gehe ich jetzt wieder Schritt für Schritt zurück, werden diese nach und nach wieder aus dem Cache entfernt. Sollen diese auch behalten werden, dann müsst ihr das ForwardCaching aktivieren und die Funktion mit *true* als *value* aufrufen.

## JS- und Overflow-Scrolling

Wollt ihr generell JS-Scrolling in eurer App an- bzw. ausschalten, müsst ihr nicht jeden ionContent einzeln anfasse. Einfach die entsprechende Funktion auf dem $ionicConfigProvider aufrufen.

**$ionicConfigProvider.scrolling.jsScrolling(value)**

Aktiviert bzw. deaktiviert JavaScript-Scrolling global für alle ionContents. Dabei kann *value* die Werte *true* oder *false* annehmen.

## Zurück-Button Styling

Um den ionNavBackButton zu stylen, müsst ihr nicht einmal HTML-Code schreiben. Über die nun vorgestellten Funktionen könnt ihr das direkt im JavaScript-Code.

**$ionicConfigProvider.backButton.icon(value)**

Damit setzt ihr das Icon des Zurück-Knopfes. Einfach die entsprechende Icon-Klasse als *value* übergeben.

**$ionicConfigProvider.backButton.text(value)**

Damit setzt ihr den Text des Zurück-Knopfes. Einfach die entsprechende Zeichenkette als *value* übergeben. Soll nur das Icon angezeigt werden, übergebt ihr einfach einen Leerstring.

**$ionicConfigProvider.backButton.previousTitleText(value)**

Auf iOS ist es Standard, dass neben dem Zurück-Knopf der Titel der vorherigen View angezeigt wird. Hier könnt ihr dieses Verhalten pro Plattform oder generell aktivieren oder deaktivieren. Dazu die Funktion einfach mit *true* bzw. *false* aufrufen.

## Aussehen von ionCheckbox und ionToggle

Natürlich sehen auch die Eingabeelement nicht bei jedem Betriebssystem gleich aus. Am meisten fällt das im Vergleich zwischen iOS und Android bei den Checkboxen und den Toggle-Buttons auf. Über den $ionicConfigProvider könnt ihr nun selbst entscheiden, welches Styling genutzt werden soll.

**$ionicConfigProvider.form.checkbox(value)**

Setzt das Aussehen von Checkboxes. Als Wert können die Strings **square** oder **cicle** übergeben werden. Ersteres orientiert sich dabei mehr an Android und das andere ans iOS.

**$ionicConfigProvider.form.toggle(value)**

Setzt das Aussehen von Toggle-Knöpfen. Als Wert können die Strings **small** oder **large** übergeben werden. Ersteres orientiert sich dabei mehr an Android und das andere ans iOS.

## Styling der Tabs

Ein wichtiges Navigationskonzept für Apps sind Tabs. Auch Ionic bietet eine solche Komponente an. Wie so oft macht auch hier jede Plattform ihr eigenes Ding. Wer nicht die plattform-spezifische Konfiguration nutzen will, kann diese hier ändern.

**$ionicConfigProvider.tabs.style(value)**

Als Wert nimmt diese Funktion die Strings *striped* (Android) oder *standard* (iOS) entgegen. Im ersten Fall erhält die Tab-Auswahl die Hauptfarbe und der aktive Tab wird unterstrichen, was mehr dem Android-Style-Guide folgt. Falls *standard* gewählt wurde, erhält der Inhalt der Tab-Auswahl, wie Beschriftungen und Icons, die Primärfarbe und wird dadurch hervorgehoben. Dadurch ähnelt dieses mehr einer iOS App.

**$ionicConfigProvider.tabs.position(value)**

Auch bei der Positionierung unterscheiden sich Tabs je nach Betriebssystem. Bei iOS sind diese normalerweise am View-Ende und bei Android zu Beginn. Aus diesem Grund kann die Funktion auch mit den Werten *top* oder *bottom* aufgerufen werden.

## Vorladen von Templates

Wer sich während der Entwicklung seiner Ionic-App mal den Netzwerk-Verkehr angesehen hat, dem ist sicher aufgefallen, dass direkt beim Aufruf der App, die Templates angefordert werden. Dies soll später die Ausführung und den Zugriff auf diese beschleunigen.

**$ionicConfigProvider.templates.maxPrefetch(value)**

Damit könnt ihr die Anzahl der Template setzen, die vorgeladen werden sollen. Wollt ihr diese Funktion ganz ausstellen, dann übergebt einfach eine *0* als *value*. Der Standardwert beträgt *30*.

## Anpassen der Navigationsleiste

Ja, auch bei den Kopf- bzw. Navigationsleisten unterscheiden sich die Plattformen und Geschmäcker enorm.

**$ionicConfigProvider.navBar.alignTitle(value)**

Als erstes wird der View-Titel häufig anders positioniert. Bei iOS steht dieser oft in der Mitte und bei Android linksbündig. Um möglichst flexibel zu sein, akzeptiert die Funktion nachstehende Wörter als *value*.

 - platform - nimmt den für die aktuelle Plattform spezifischen Einstellung (Android = *left*, iOS = *center*), falls nicht Android oder iOS, wird *center* genutzt
 - left - linksbündig
 - right - rechtsbündig
 - center - zentriert

**$ionicConfigProvider.navBar.positionPrimaryButtons(value)**

Ein weiterer Unterschied, welche Seite für die App die Primär- bzw. Sekundärseite ist. Diese Konfiguration hat dann Auswirkung wenn beim Setzen von *ionNavButtons* statt *left* and *right*, *primary* und *secondary* als *side* gesetzt werden. Mit dieser Funktion kann die Primärseite auf folgende Werte gesetzt werden.

 - platform - je Plattform unterschiedlich, iOS = left, Android = right, sonst left, ist der Standardwert
 - left - Primärseite ist links
 - right - Primärseite ist rechts

**$ionicConfigProvider.navBar.positionSecondaryButtons(value)**

Ein weiterer Unterschied, welche Seite für die App die Primär- bzw. Sekundärseite ist. Diese Konfiguration hat dann Auswirkung wenn beim Setzen von *ionNavButtons* statt *left* and *right*, *primary* und *secondary* als *side* gesetzt werden. Mit dieser Funktion kann die Sekundärseite auf folgende Werte gesetzt werden.

 - platform - je Plattform unterschiedlich, iOS = right, Android = right, sonst right, ist der Standardwert
 - left - Primärseite ist links
 - right - Primärseite ist rechts

Als klitzekleines Beispiel setzen wir die Beschriftung des Zurück-Buttons in der Ionic-Pizza-App auf einen Leerstring.

Link zum [Quellcode](https://github.com/angularjs-de/ionic-tutorial/tree/master/15-configProvider) und [Live-Demo](https://angularjs-de.github.io/ionic-tutorial/15-configProvider/#/order)
