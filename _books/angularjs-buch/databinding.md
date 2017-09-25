---
number: 2.3
title: Databinding - einfach/bidirektional
part: Grundlagen
description: Was ist der Unterschied zwischen einfachem und bidirektionalem Databinding? Lerne hier mehr darüber!
progress: 80
---
Im der traditionellen JavaScript-Programmierung werden Änderungen direkt im DOM von einem Event-Handler ausgeführt. Bei bidirektionalem ändert man nur das Model. Änderungen vom Model werden vom Framework in den DOM übertragen. Dies sorgt für eine klare Trennung und verständlicheren Code.

![AngularJS Binding im Vergleich](../images/figures/binding-types.png)

## Einfaches Databinding (One-Way)
Die meisten Entwickler aus der klassischen Webentwicklung werden mit dem einfachen Databinding bestens vertraut sein. Es gibt ein Model, welches die Daten bereitstellt und ein Template, welches das Aussehen liefert. Diese werden verschmolzen und als View an den Benutzer geschickt.

Das Problem hierbei: Im Anschluss spiegeln sich weitere Änderungen am Model nicht mehr automatisch im View wider. Auch Änderungen im View (Der Benutzer tippt etwas in ein Eingabefeld), werden nicht an das *Model* zurückgemeldet. Der Entwickler muss sich selber um die Synchronisation von View und Model kümmern.

## Bidirektionales Databinding (Two-Way)
Beim bidirektionalen wird eine Verknüpfung zwischen Elementen im *View* und Datenstrukturen im *Model* hergestellt. Im grafischen Beispiel unten wird jedes Element des Arrays `$scope.todos` einem `<li>`-Element im DOM zugeordnet. Wird jetzt z.B. `'Staubsaugen'` aus dem Array entfernt, wird diese Veränderung dem *View* gemeldet und auch dort entfernt. Das Template steht jederzeit als Blaupause bereit, um neue Elemente im *View* erzeugen und verändern zu können.

Der Vorteil dürfte offensichtlich sein. Die manuelle Synchronisation fällt weg und damit auch eine Menge Arbeit und fehleranfälliger Code.

![AngularJS Data Binding](../images/figures/data-binding.png)
