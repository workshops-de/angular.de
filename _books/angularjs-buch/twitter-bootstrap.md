---
number: 4.50
title: Erweiterungen für Twitter Bootstrap
description: Lerne mehr über die Plugins, um Twitter Bootstrap sehr einfach in deine Applikation zu integrieren.
part: Erweiterungen der Applikation
progress: 99
---

Wenn wir über Erweiterungen für Twitter Bootstrap reden, meinen wir natürlich den JavaScript-Teil. Um AngularJS mit Twitter Bootstrap einzusetzen, gibt es im Momement zwei Alternativen - UI Bootstrap und AngularStrap. Beide sind quelloffen und unter der MIT-Lizenz auf GitHub verfügbar.

## UI Bootstrap

UI Bootstrap ist Bestandteil des bekannten Projektes *Angular UI*, welches oft genutzte Komponenten für AngularJS zur Verfügung stellt. UI Bootstrap verfolgt den Ansatz, den bestehenden Code von *Bootstrap.js* komplett in native Direktiven zu überführen. *UI Bootstrap* benutzt sprechende Namen für Elemente, wie z.B. `<alert></alert>` oder `<accordion></accordion>`.

*Die Abhängigkeiten bestehen aus:*

* AngularJS
* bootstrap.css

*Links:*

* Homepage: [UI Bootstrap](https://angular-ui.github.io/bootstrap/)
* Github: [Quellcode](https://github.com/angular-ui/bootstrap) (MIT-Lizenz)

## AngularStrap

AngularStrap geht einen anderen Weg und funktioniert als Wrapper der Bibliotheken von Bootstrap. Im Kern werden die Funktionen von Bootstrap wiederverwendet.
Somit sind jQuery und die *bootstrap.js* eine unbedingte Voraussetzung. Die Konfiguration der Bibliothek wird über Attribute vorgenommen, wie z.B. `<button type="button" class="btn" bs-dropdown="dropdown">...</button>`.

*Die Abhängigkeiten bestehen aus:*

* AngularJS
* jQuery
* bootstrap.js
* bootstrap.css

*Links:*

* Homepage: [AngularStrap](https://angular-ui.github.io/bootstrap/)
* Github: [Quellcode](https://github.com/mgcrea/angular-strap) (MIT-Lizenz)
