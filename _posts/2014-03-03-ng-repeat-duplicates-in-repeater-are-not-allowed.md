---
title: "ng-repeat - Duplicate error vermeiden"
description:
author: "Sascha Brink"
slug: "ng-repeat-duplicates-in-repeater-are-not-allowed"
published_at: 2014-03-03 07:45:24.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/ng-repeat-duplicates-in-repeater-are-not-allowed.jpg"
---

Hattet ihr in Verbindung mit `ng-repeat` schon einmal folgenden Fehler?

> **[ngRepeat:dupes] Duplicates in a repeater are not allowed**

Diesen Fehler bekommt ihr seit AngularJS 1.2, wenn ihr doppelte Elemente in eurem Array habt.

## Woher kommt der Fehler?

Seit Verison 1.2 unterstützt AngularJS offiziell Animationen. Wenn man jetzt z.B. ein Element innerhalb des Arrays verschieben möchte, muss AngularJS das Element genau identifizieren können, um die Animation darauf anwenden zu können.

Standardmäßig wird dabei das ganze Element aus dem Array als eindeutiger Identifikator benutzt. Wenn nun zwei oder mehr Elemente den gleichen Identifikator haben, gibt es eine Mehrdeutigkeit und dieser Fehler tritt auf.

## Wie behebt man ihn?

Natürlich ist es nicht immer gewollt, das ganze Element als eindeutigen Identifikator zu benutzen. Deshalb kann man diesen über eine extra Option `track by` steuern.

Zu Lösung benutzen wir also `track by` und brauchen nur noch einen Identifikator, der für jedes Element eindeutig ist. Dies ist der Index, den wir bei `ng-repeat` über `$index` bekommen.

Unsere Lösung sieht also folgendermaßen aus:

```html
<li ng-repeat="item in [4,4,4] track by $index">{{item}}</li>
```
