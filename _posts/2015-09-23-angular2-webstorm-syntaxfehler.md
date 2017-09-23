---
title: "Angular2 in WebStorm ohne Syntaxfehler"
description: "Eine Anleitung wie ihr eure WebStorm IDE mit Angular so konfiguriert, dass keine Syntaxfehler mehr auftreten."
author: "Robin Böhm"
slug: "angular2-webstorm-syntaxfehler"
published_at: 2015-09-23 07:01:00.000000Z
categories: "angular angular2 angular4"
header_image: "/artikel/header_images/angular2-webstorm-syntaxfehler.jpg"
---

In diesem kleinen Artikel beschreibe ich, wie ihr eure WebStorm IDE so konfiguriert, dass ihr auch schon heute ohne Syntaxfehler Angular2 Code mit z.B. Decorators schreiben könnt.



**Update 2017/09:** Mittlerweile können die neuen Version von WebStorm Angular ohne Probleme.
Ich hab weiter unten im Artikel ein Video von Jetbrains mit Victor Savkin angehangen, in welchem er euch seine Konfiguration von Webstorm vorstellt.
Außerdem ist der Editor Visual Studio Code mittlerweile auch ein ernstzunehmendes Produkt für Entwickler und ist somit am Ende dieses Artikels nun auch erwähnt.



Ihr habt vielleicht schon unseren [Angular2 Tutorial Code](https://github.com/angularjs-de/angular2-tutorial-code-es6) oder ein anderes Angular2 Projekt geladen und diesen in der IDE euer Wahl geöffnet. Falls diese IDE WebStorm ist bekommt ihr sofort Syntax Fehler wie diese um die Ohren geworfen:
![WebStorm ES6 Annotations](ES6_Errors_on_Annotations.png)
Euer Build Prozess läuft trotzdem ohne Probleme durch, der Quellcode ist also korrekt. Allerdings ist die Gefahr groß, dass wirkliche Syntax-Fehler übersehen werden auf die euch normalerweise eine IDE aufmerksam machen würde. Somit wird diese Funktion der IDE etwas nutzlos.

Es gibt aber Hoffnung! Im JetBrains Blog ist  ein offizieller Support für das Angular2 Framework  ab Version 11 von WebStorm [angekündigt](http://blog.jetbrains.com/webstorm/2015/06/webstorm-11-roadmap-discussion/). Aktuell ist diese Version bereits über das Early Access Programm verfügbar. Wer mit einer älteren Version von WebStorm arbeitet kann sich aber mit dem offiziellen `Plugin JavaScript.Next` helfen. Dies kann über den normalen Plugin-Mechanismus installiert werden und ermöglicht euch die Benutzung aktueller ES7 Features.

![WebStorm ES6 Annotations](JavaScript_Next_Plugin.png)

Nach der Installation des Plugins könnt ihr die Annotations und andere ES7 Features problemlos benutzen. Zwar unterstützen aktuelle Browser diese Features noch nicht alle, jedoch könnt ihr mit Hilfe von Babel oder auch Traceur diese Features heute schon nutzen und in älteren Browsern lauffähig machen. Ich habe dazu ebenfalls ein Artikel über [ES6 mit Browserify](/artikel/angularjs-es6-browserify-babel-module-laden/) geschrieben.

![WebStorm ES7 Annotations](ES7_Annotations.png)

**Update 2017/09:**

Jetbrains hat Stark an der Angular Unterstützung für WebStorm gearbeitet.
Anfang 2017 hat das Unternehmen ein Video veröffentlicht wo Victor Savkin, einer der Core-Entwickler von Angular, die Features und seine persönliche Konfiguration der IDE vorstellt.
Es werden Shortcuts, Settings und Plugins besprochen welche euch helfen eurer Webstorm optimal zu konfigurieren!


<iframe width="560" height="315" src="https://www.youtube.com/embed/upgjCMHGpwo" frameborder="0" allowfullscreen></iframe>


Eine weitere Alternative kann natürlich auch [Visual Studio Code](https://code.visualstudio.com/) sein.
Dieser Editor hat in den letzten Jahren große Fortschritte gemacht und hat aktuell die rasanteste Entwicklung.
Ihr müsst hier wahrscheinlich initial etwas mehr Arbeit in die Konfiguration der Plugins stecken, dafür ist das Repository hierfür bereits integriert und lässt sich sehr einfach bedienen.
Der komplette Editor basiert auf Web-Technologien und ist [Open Source auf GitHub verfügbar](https://github.com/Microsoft/vscode).
Somit lassen sich auch sehr leicht Plugins entwickeln und updaten.

Ich empfehle euch auf jeden Fall mal beide Optionen anzuschauen und dann zu bewerten, welche für euch persönlich die richtige Wahl ist. So oder so entstehen immer mehr Werkzeuge welche die Entwicklung im Web ständig vereinfachen und uns Entwickler produktiver machen. Danke dafür!

Generell empfehle ich die Verwendung von einer IDE mit Unterstützenden Plugins, da diese die Entwickler deutlich beschleunigen und erleichtern.
Gerade mit der Einführung von TypeScript gibt es unglaublich viele neue Möglichkeiten uns das Leben als Entwickler zu erleichtern.
Die Zeiten als man JavaScript im simplen Editor geschrieben hat sind eindeutig vorbei wenn es um professionelle Entwicklung von Anwendungen mit Web Technologien geht.



