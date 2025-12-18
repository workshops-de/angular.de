---
title: "Mit dem Limit-Filter das letzte Element auswählen"
description: "Lernt mit einem einfachen Trick, wie ihr aus einer Liste das letzte Element herausfiltern könnt."
author: "Sascha Brink"
published_at: 2014-02-22T10:32:12.000Z
categories: "angularjs"
noindex: true
header_image: "header.jpg"
---

Hier nur ein ganz kurzer Tipp zum *Limit*-Filter.

[[cta:training-top]]



[[cta:training-bottom]]

Wusstet ihr, dass ihr Elemente auch vom letzten Element aus einschränken könnt?

Ihr müsst dazu einfach negative Werte übergeben.

```html
<li ng-repeat="item in items | limitTo:-2" ng-bind="item.name"></li>
```

Interessieren Euch die kleinen Teile der Dokumentation, die man schon mal übersieht? Sind sie für Euch hilfreich?
