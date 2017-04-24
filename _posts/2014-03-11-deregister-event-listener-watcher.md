---
title: "Event Listener und Watcher wieder entfernen"
description: 
author: "Sascha Brink"
slug: "deregister-event-listener-watcher"
published_at: 2014-03-11 07:45:04.000000Z
categories: "angular2 angular angular4"
header_image: "/artikel/header_images/deregister-event-listener-watcher.jpg"
---

## Problem

Du hast mit *scope.$on* einen Event Listener oder mit *scope.$watch* einen Watcher registriert. Du möchtest ihn nun wieder entfernen, aber hast keine Funktion dafür gefunden.

## Lösung

Für die Lösung schauen wir in den Quellcode von AngularJS. Im Folgenden sehen wir die Implementierung der `$on`-Funktion:

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
    

Wie wir sehen können, gibt die `$on`-Funktion selbst wieder eine Funktion zurück. Wenn wir diese Funktion ausführen, können wir einen Event Listener wieder entfernen.

Hier ein Beispiel dafür:

    var myEventOffFn = $scope.$on('onMyEvent', myListener);
    
    // Listener entfernen
    myEventOffFn();
    

Watcher können wir übrigens genauso entfernen:

    var myWatchFn = $scope.$watch('myVariable', myWatcher);
    
    // Watcher entfernen
    myWatchFn(); 