---
number: 6.40
title: jqLite - Kompatibilität mit jQuery
description: Lerne, wie AngularJS mit jQuery kombiniert werden kann und was jqLite ist.
part: Konzepte und Hintergründe
progress: 90
---

AngularJS ist Kompatibel mit jQuery. AngularJS enthält sogar eine abgespeckte Version von jQuery. Diese wird intern [jqLite](https://github.com/angular/angular.js/blob/master/src/jqLite.js) genannt. jqLite enthält nur die wichtigsten Funktionen, um die Arbeit am DOM in Direktiven zu erleichtern. Neben dem fehlenden Funktionsumfang ist auch die Performance etwas schlechter.

Wenn jQuery allerdings eingebunden ist, erkennt AngularJS dies und ersetzt jqLite durch die jQuery. Das bedeutet, wenn nur AngularJS eingebunden ist, verweist `angular.element` auf jqLite. Wird jQuery zusätzlich eingebunden, verweist `angular.element` auf jQuery.

Es ist deshalb immer ratsam in Direktiven z.B. `angular.element('.item')` statt `$('.item')` zu schreiben, um ein Element zu referenzieren.

Unterstützt werden:

 * [addClass()](http://api.jquery.com/addClass/)
 * [after()](http://api.jquery.com/after/)
 * [append()](http://api.jquery.com/append/)
 * [attr()](http://api.jquery.com/attr/)
 * [bind()](http://api.jquery.com/bind/)
 * [children()](http://api.jquery.com/children/)
 * [clone()](http://api.jquery.com/clone/)
 * [contents()](http://api.jquery.com/contents/)
 * [css()](http://api.jquery.com/css/)
 * [data()](http://api.jquery.com/data/)
 * [eq()](http://api.jquery.com/eq/)
 * [find()](http://api.jquery.com/find/) *- Begrenzt auch die Suche nach Tag-Namen*
 * [hasClass()](http://api.jquery.com/hasClass/)
 * [html()](http://api.jquery.com/html/)
 * [next()](http://api.jquery.com/next/)
 * [parent()](http://api.jquery.com/parent/)
 * [prepend()](http://api.jquery.com/prepend/)
 * [prop()](http://api.jquery.com/prop/)
 * [ready()](http://api.jquery.com/ready/)
 * [remove()](http://api.jquery.com/remove/)
 * [removeAttr()](http://api.jquery.com/removeAttr/)
 * [removeClass()](http://api.jquery.com/removeClass/)
 * [removeData()](http://api.jquery.com/removeData/)
 * [replaceWith()](http://api.jquery.com/replaceWith/)
 * [text()](http://api.jquery.com/text/)
 * [toggleClass()](http://api.jquery.com/toggleClass/)
 * [triggerHandler()](http://api.jquery.com/triggerHandler/)
 * [unbind()](http://api.jquery.com/unbind/)
 * [val()](http://api.jquery.com/val/)
 * [wrap()](http://api.jquery.com/wrap/)

Für den aktuellsten Stand lohnt sich ein Blick in den Quellcode: [jqLite](https://github.com/angular/angular.js/blob/master/src/jqLite.js).
