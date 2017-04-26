---
title: "Angular2 in WebStorm ohne Syntaxfehler"
description: "Eine Anleitung wie ihr eure WebStorm IDE mit  Angular2 so konfiguriert, dass keine Syntaxfehler mehr auftreten."
author: "Robin Böhm"
slug: "angular2-webstorm-syntaxfehler"
published_at: 2015-09-23 07:01:00.000000Z
categories: "angular2 angular angular4"
header_image: "/artikel/header_images/angular2-webstorm-syntaxfehler.jpg"
---

In diesem kleinen Artikel beschreibe ich, wie ihr eure WebStorm IDE so konfiguriert, dass ihr auch schon heute ohne Syntaxfehler Angular2 Code mit z.B. Annotations schreiben könnt.

Ihr habt vielleicht schon unseren [Angular2 Tutorial Code](https://github.com/angularjs-de/angular2-tutorial-code-es6) oder ein anderes Angular2 Projekt geladen und diesen in der IDE euer Wahl geöffnet. Falls diese IDE WebStorm ist bekommt ihr sofort Syntax Fehler wie diese um die Ohren geworfen:
![WebStorm ES6 Annotations](ES6_Errors_on_Annotations.png)
Euer Build Prozess läuft trotzdem ohne Probleme durch, der Quellcode ist also korrekt. Allerdings ist die Gefahr groß, dass wirkliche Syntax-Fehler übersehen werden auf die euch normalerweise eine IDE aufmerksam machen würde. Somit wird diese Funktion der IDE etwas nutzlos.

Es gibt aber Hoffnung! Im JetBrains Blog ist  ein offizieller Support für das Angular2 Framework  ab Version 11 von WebStorm [angekündigt](http://blog.jetbrains.com/webstorm/2015/06/webstorm-11-roadmap-discussion/). Aktuell ist diese Version bereits über das Early Access Programm verfügbar. Wer mit einer älteren Version von WebStorm arbeitet kann sich aber mit dem offiziellen `Plugin JavaScript.Next` helfen. Dies kann über den normalen Plugin-Mechanismus installiert werden und ermöglicht euch die Benutzung aktueller ES7 Features.

![WebStorm ES6 Annotations](JavaScript_Next_Plugin.png)

Nach der Installation des Plugins könnt ihr die Annotations und andere ES7 Features problemlos benutzen. Zwar unterstützen aktuelle Browser diese Features noch nicht alle, jedoch könnt ihr mit Hilfe von Babel oder auch Traceur diese Features heute schon nutzen und in älteren Browsern lauffähig machen. Ich habe dazu ebenfalls ein Artikel über [ES6 mit Browserify](/artikel/angularjs-es6-browserify-babel-module-laden/) geschrieben.

![WebStorm ES7 Annotations](ES7_Annotations.png)
