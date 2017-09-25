---
title: "Service-Ergebnisse veränderen mit Decorators"
description: Lerne, wie du mit einem Decorator die Ausgabe eines Services verändern kannst. Hier zeigen wir, wie du den $log-Service verbessern kannst.
author: "Sascha Brink"
slug: "service-decorator-erstellen"
published_at: 2014-03-12 13:13:54.000000Z
categories: "angularjs services decorator"
header_image: "/artikel/header_images/service-decorator-erstellen.jpg"
---

## Problem

Du benutzt eine externes Modul und möchtest das Ergebnis eines Services verändern oder erweitern, ohne den Service selbst zu verändern.

## Lösung

Zur Lösung schreiben wir einen Decorator. Dieser kann Aufrufe zu Services (Provider, Factory, Service, Value) abfangen und der Ergebnis verändern. In diesem Beispiel *dekorieren* wir den `$log`-Service und stellen das aktuelle Log-Level vor die Ausgabe.

Ein Decorator kann nur in einem Config-Block initialisiert werden. Dies führt zu einigen Einschränkungen - z.B. ist es nicht möglich, andere Services zu injizieren.

Um den Decorator zu erstellen, benutzen wir den `$provide`-Service, welcher die Methode `.decorator()` enthält. In den Decorator wird automatisch der dekorierte Service als `$delegate` injiziert. In diesem Fall ist `$delegate` also `$log`.

Wir möchten das Verhalten unseres Log-Services nicht verändern. Deshalb erstellen wir ein neues Objekt und stellen alle Methoden bereit, die der originale `$log`-Service bietet.

```javascript
.config(function($provide) {
  $provide.decorator('$log', function($delegate) {
    var logger = {};
    ['log','info','warn','error','debug'].forEach(function(level) {
      logger[level] = function(message) {
        $delegate[level]('[' + level.toUpperCase() + '] ' + message);
      };
    });
    return logger;
  });
})
```
