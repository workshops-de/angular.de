---
number: 6.11
title: Factory, Service und Provider
description: Lerne, was die Unterschiede zwischen den verschiedenen Service-Typen sind und wann du welchen einsetzen solltest.
part: Konzepte und Hintergründe
progress: 80
---

Nachdem wir [Dependency Injection](#dependency-injection) verstanden haben, lernen wir diese sinnvoll zu gebrauchen. Der Injektor vor AngularJS bietet mehrere Methoden, um Funktionen zu erzeugen, die später injiziert werden können. Die gesamten Methoden werden in der Dokumentation Services genannt und sind nicht zu verwechseln mit der einzelnen Methode *service*. Alle Services sind Singletons. Wir unterteilen die Services in:

* [Constant](#constant)
* [Value](#value)
* [Service](#service)
* [Factory](#factory)
* [Provider](#provider)

Constant macht dabei genau das, was der Name vermuten lässt - eine Konstante definieren. Die restlichen vier Methoden sind dynamisch und bauen aufeinander auf (siehe Abbildung). Provider steht dabei ganz oben und bietet die meisten Möglichkeiten an. Die restlichen Methoden bieten ein vereinfachtes Interface für häufig genutzte Anwendungsfälle. Wir gehen im Folgenden auf die Unterschiede und Einsatzmöglichkeiten ein.

![AngularJS - Root Scope](../images/figures/services.png)

## Provider

> Wir benutzen Provider, wenn wir einen Service zum Applikationsstart konfigurieren möchten.

Provider ist eine Singeleton-Funktion mit $get-Methode und grundlegend für alle weitern Services. Nur Provider können wir zum Applikationsstart konfigurieren, was auch gleich den Verwendungszweck klärt. Auch in Provider können wir andere Services injizieren. Diese müssen wir der `$get`-Funktion als Parameter übergeben.

Beispiel:

```javascript
app.provider('helloWorld', function() {
  this.setName = function(name) { this.name = name; };

  this.$get = function() {
    var self = this;
    return {
      sayHello: function() { return "Hello, " + self.name + "!"; }
    }
  };
});

app.config(function(helloWorldProvider){
  helloWorldProvider.setName('World');
});
```


## Factory

> Wir benutzen eine Factory, wenn wir Funktionen injizieren möchten. Wenn du dir unsicher bist, ob du Factory oder Service nutzen sollst - wähle eine *Factory*.

Eine Factory nutzt [Provider](#provider) als Ausgangsbasis und bietet ein vereinfachtes Interface an. Wenn wir uns einen Ausschnitt aus dem Quellcode anschauen, sehen wir, dass Factory nichts anderes macht, als die Funktion, die wir als Parameter übergeben, an die  `$get`-Methode von Provider zu delegieren.

```javascript
function factory(name, factoryFn) { return provider(name, { $get: factoryFn }); }
```

Beispiel:

```javascript
app.factory('helloWorldFromFactory', function() {
  return {
    sayHello: function() { return "Hello, World!"; }
  };
});
```


## Service

Ein Service ist einer [Factory](#factory) sehr ähnlich. Im Unterschied zu Factory wird die übergebene Funktion mit `new` konstruiert. Historisch wurde die Vereinfachung für Coffeescript eingeführt. Coffeescript unterstützt [Pseudoklassen](http://coffeescript.org/#classes), die nur mit `new` verwendet werden können. In den meisten Fällen solltest du eine Factory verwenden.

Beispiel:

```javascript
app.service('helloWorldFromService', function() {
  this.sayHello = function() { return "Hello, World!"; };
});
```


## Value

> Wir benutzen Values, wenn wir einfache Werte (oder Funktionen) übergeben möchten und dabei keine weiteren Services injizieren wollen.

Ein Value ist eine weitere Vereinfachung einer [Factory](#factory). Einem Value kann man direkt einen String, Integer, Boolean übergeben, ohne sich die Mühe zu machen, einen Funktion mit einem Rückgabewert zu übergeben. In diesem Fall ist es aber nicht möglich, andere Services zu injizieren. Der Quellcode sieht ungefähr folgendermaßen aus:

```javascript
function value(name, value) { return factory(name, function() {return value;}); }
```

Beispiel:

```javascript
app.value('helloWorldFromService', "Hello World!");
```


## Constant

> Constant benutzen wir, wenn ein Wert sich später nicht mehr ändern darf.

Die Konstante verhält sich anders als die anderen Services. Nachdem einer Konstante ein Wert zugewiesen wurde, kann dieser nicht mehr verändert werden. Die Unveränderbarkeit äußert sich auf zwei Weisen:

* Wenn wir z.B. `app.constant('pi', 3.14)` gesetzt haben, führt eine erneute Zuweisung `app.constant('pi', 3.1415)` zu keiner Änderung.
* Die Rückgabewerte der anderen Services können durch [Decorator](#decorator) verändert werden. Bei Konstanten ist das nicht möglich.

Beispiel:

```javascript
app.constant('pi', 3.14159265359);
```


