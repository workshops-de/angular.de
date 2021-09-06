---
number: 6.12
title: Decorator zum Erweitern von Services
description: Lerne, wie du mit Decorators Services erweitern kannst, über die du nicht selbst die Kontrolle hast.
part: Konzepte und Hintergründe
progress: 80
---

> Der Decorator (auch Dekorierer) ist ein Entwurfsmuster und eine flexible Alternative zur Unterklassenbildung, um eine Klasse um zusätzliche Funktionalitäten zu erweitern. *Entwurfsmuster. 5 Auflage*

Mit Hilfe eines Decorators können wir Funktionalitäten von Services ([Provider](#provider), [Factory](#factory), [Service](#service), [Value](#value)) erweitern oder Rückgabewerte verändern. Konstanten können nicht verändert werden.

Erstellung eines Decorators:

* Ein Decorator wird über `$provide` in der *config*-Methode erstellt.
* Eine Kurzform wie für Factories, etc. à la `app.decorator(...)` gibt es nicht.
* Mehrere Decorator lassen sich hintereinanderschalten.

In unserem Beispiel definieren wir ein einfaches Value mit dem Wert *AngularJS*. Über Decorator erweitern wir die Zeichenkette zwei Mal. Wie wir sehen, können Decorator mehrfach angewendet werden. Wir erhalten als Endergebnis *AngularJS macht Webentwicklung einfach und elegant!*. Die Decorator können natürlich auch in separaten *config*-Methoden stehen.


<<(code/decorator/index.html)

<<(code/decorator/application.js)
