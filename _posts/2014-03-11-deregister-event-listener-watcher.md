---
title: "Event Listener und Watcher wieder entfernen"
description: Lerne mehr über die schlecht dokumentierte Funktion, um einen Event Listener wieder zu entfernen.
author: "Sascha Brink"
slug: "deregister-event-listener-watcher"
published_at: 2014-03-11 07:45:04.000000Z
categories: "angularjs tipps"
header_image: "/artikel/header_images/deregister-event-listener-watcher.jpg"
---

## Problem

Du hast mit *scope.$on* einen Event Listener oder mit *scope.$watch* einen Watcher registriert. Du möchtest ihn nun wieder entfernen, aber hast keine Funktion dafür gefunden.

## Lösung

Für die Lösung schauen wir in den Quellcode von AngularJS. Im Folgenden sehen wir die Implementierung der `$on`-Funktion:

```javascript
$on: function(name, listener) {
  var namedListeners = this.$$listeners[name];
  if (!namedListeners) {
    this.$$listeners[name] = namedListeners = [];
  }
  namedListeners.push(listener);

  return function() {
    namedListeners[indexOf(namedListeners, listener)] = null;
  };
}
```


Wie wir sehen können, gibt die `$on`-Funktion selbst wieder eine Funktion zurück. Wenn wir diese Funktion ausführen, können wir einen Event Listener wieder entfernen.

Hier ein Beispiel dafür:

```javascript
var myEventOffFn = $scope.$on('onMyEvent', myListener);

// Listener entfernen
myEventOffFn();
```


Watcher können wir übrigens genauso entfernen:

```javascript
var myWatchFn = $scope.$watch('myVariable', myWatcher);

// Watcher entfernen
myWatchFn();
```
