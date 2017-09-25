---
number: 6.90
title: Performance - Der Digest-Zyklus
description: Lerne mehr über den internen Update-Mechanismus von AngularJS kennen, damit du in keine Performance-Fallen läufst.
part: Konzepte und Hintergründe
progress: 15
---

## Angular Performance Tip 1 - $apply und $digest

Kennt Ihr den Unterschied zwischen der $apply- und $digest-Funktion?
In der Dokumentation von AngularJS wird beschrieben, dass die $apply Funktion genutzt werden soll, um hiermit Expressions in Angular auszuführen, die von "außen" kommen.
Der Grund ist recht einfach: Da das Framework mit einem Dirty Checking Algorithmus arbeitet, muss dieser natürlich nach Änderungen angestoßen werden, damit das "magische" Two-Way-Databinding funktionieren kann. (Unter der Haube kochen wir ja alle nur mit Wasser :) ). Wenn wir nun ein Event z.B. von einem WebSocket oder jQuery-Plugin bekommen, welches unseren $scope verändert, müssen wir dies natürlich bemerkbar machen. Hierzu nutzen wie die $apply-Funktion des Scopes. Warum wir dies bei der Benutzung von AngularJS nicht beachten müssen, erklären wir später.

Ein kleines Beispiel:

```javascript
element.on('click', function(event, touchend) {
      scope.$apply(function() {
        clickHandler(scope, {$event: (touchend || event)});
      });
    });
```

Hierbei registrieren wir einen EventListener auf ein Klick-Ereignis eines DOM-Elements. Wird dieses ausgelöst, führen wir eine Funktion aus, die den Scope verändert. Damit der Rest der Anwendung dies mitbekommt und sich updated, wrappen wir diesen Funktionsaufruf in einen Aufruf mit *scope.$apply*. Damit wird der Dirty-Checking-Mechanismus gestartet und überprüft, ob sich Elemente in der View aktualisieren müssen. Und warum brauchen wir das nicht bei normalen Aufrufen wie z.B. mit ng-click? Brauchen wir doch! Allerdings hat das Framework diese Standard-Fälle für uns bereits abgedeckt. Der oben verwendete Beispiel-Code stammt direkt aus der ngClick Direktive!

Aber was tut diese Funktion? Schauen wir uns das doch einmal anhand folgendem Pseudo-Code genauer an.

    function $apply(expr) {
        try {
            return this.$eval(expr);
        } catch (e) {
            $exceptionHandler(e);
        } finally {
            $rootScope.$digest();
        }
    }

Als erstes führen wir also die übergebene Expression auf dem aktuellen Scope(this) aus. Dies ist über ein try-catch Funktion mit einem globalen Exeption-Handler von Angular verbunden und ruft zu guter letzt die $digest-Funktion des RootScopes auf.

Die $digest Funktion ist also ein Teil des Aufrufs von $apply. Diese Funktion sorgt dafür, dass für diesen Scope und all seine Kind-Scopes das Dirty-Checking angestoßen wird. Somit ist nach einem Aufruf von $apply die komplette Anwendung in einem konsistenten Stand. Sehr schön und einfach gelöst!

In 99% der Fälle könnt ihr mit dieser Funktion alles erreichen was ihr wollt. Jedoch, wie euch vielleicht aufgefallen ist, wird in jedem $apply die *komplette* Scope-Hierarchie durchlaufen. Wenn wir es nun mit einer recht komplexen AngularJS-Anwendung mit komplexen Scope Hierarchien zu tun haben, kann das unter Umständen nicht immer erwünscht sein.

Es ist durchaus möglich mit der $digest nur Teilbäume zu aktualisieren, wie folgender Test zeigt:

    it('should allow $digest on a child scope with and without a right sibling', inject(
            function($rootScope) {
          // tests a traversal edge case which we originally missed
          var log = '',
              childA = $rootScope.$new(),
              childB = $rootScope.$new();

          $rootScope.$watch(function() { log += 'r'; });
          childA.$watch(function() { log += 'a'; });
          childB.$watch(function() { log += 'b'; });

          // init
          $rootScope.$digest();
          expect(log).toBe('rabrab');

          log = '';
          childA.$digest();
          expect(log).toBe('a');

          log = '';
          childB.$digest();
          expect(log).toBe('b');
        }));

**Aber Vorsicht!!** Bei der Verwendung von $digest muss uns genau bewusst sein, welche Implikationen das auf den State unserer Anwendung hat. So könnten z.B. kleine, isolierte Direktiven davon profitieren die mit einem Event nur den eigenen internen State ändern. Es kann aber auch sehr schnell zu Situationen kommen, wo sich die Anwendung nicht mehr valide verhält und nicht mehr korrekt aktualisiert wird. Es ist also ein genaues Verständnis der Gesamt-Anwendung notwendig.

Nochmal auf einen Blick zusammengefasst:

* $apply: … alles vom RootScope aus
* $digest: … nur Kinder vom aktuellen Scope aus
