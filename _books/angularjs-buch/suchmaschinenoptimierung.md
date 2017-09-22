---
number: 4.40
title: SEO / Suchmaschinenoptimierung
part: Erweiterungen der Applikation
progress: 5
noindex: true
---

> Zuallererst: AngularJS ist für die Erstellung von Webapplikationen und weniger für die Erstellung von normalen Webseiten und dem damit verbundenen Wunsch nach Suchmaschinenoptimierung ausgelegt.

Wer dennoch AngularJS als Technologie für seine Webseite einsetzen möchte, bekommt hier einen Ansatz zum Starten. Leider ist es nicht möglich, ein allgemeingültiges Beispiel zu liefern, da das Meiste von der verwendeten Technologie im Backend abhängt.

Fangen wir bei der Betrachtung mit dem eigentlichen Problem bei der Suchmaschinenoptimierung an und teilen die Lösung in Suchmaschine, Frontend (AngularJS-Konfiguration) und Backend (deine Webserver-Technologie) auf.

### Problemdefinition

> TODO

### Suchmaschine

> TODO

### AngularJS-Konfiguration

```javascript
angular.module('HashBangURLs', []).config(['$locationProvider', function($location) {
  $location.hashPrefix('!');
}]);
```
