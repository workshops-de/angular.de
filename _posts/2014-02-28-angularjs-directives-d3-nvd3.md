---
title: "Diagramme in AngularJS mit D3/nvd3"
description: Lerne, wie du mit Hilfe von nvd3 die Bibliothek D3.js sehr einfach nutzen kannst, um z.B. Linien-, Balken-, Säulen oder Kreisdiagramme zu erstellen.
author: "Robin Böhm"
slug: "angularjs-directives-d3-nvd3"
published_at: 2014-02-28 14:12:00.000000Z
categories: "angularjs"
header_image: "/artikel/header_images/angularjs-directives-d3-nvd3.jpg"
---

Ihr erstellt gerade eine Anwendung, in der ihr ein **Linien-, Balken-, Säulen oder Kreisdiagramm** benötigt? Dann seid ihr bestimmt schon auf die JavaScript-Bibliothek [D3.js][1] von Mike Bostock gestoßen. Mit D3 könnt ihr diese Art von Diagrammen auf eine sehr elegante Weise erstellen. Außerdem wird die Bibliothek kontinuierlich verbessert und liefert fast [200 Beispiele][2] mit. Natürlich gibt es auch Bücher und eine Menge Artikel dazu.

Obwohl D3 schon sehr gut zu benutzen ist, geht es im Zusammenspiel mit AngularJS noch einfacher. Dazu bietet sich das Projekt [angularjs-nvd3-directives][3] an. Dieses Projekt kapselt eine Menge der Visualisierungen als AngularJS-Direktiven.

Aktuell hat **nvd3** folgende Direktiven:

*   nvd3LineChart
*   nvd3CumulativeLineChart
*   nvd3StackedAreaChart
*   nvd3MultiBarChart
*   nvd3DiscreteBarChart
*   nvd3HistoricalBarChart
*   nvd3MultiBarHorizontalChart
*   nvd3PieChart
*   nvd3ScatterChart
*   nvd3ScatterPlusLineChart
*   nvd3LinePlusBarChart
*   nvd3LineWithFocusChart
*   nvd3BulletChart
*   nvd3SparklineChart
*   nvd3SparklineWithBandlinesChart

## Ein Beispiel

Wir nehmen als Beispiel ein einfaches Liniendiagram. Die Daten werden in einem mehrdimensionalen Array abgelegt:

```javascript
values: [[ 1025409600000 , 0], [ 1028088000000 , -6.3382185140371] ... ]
```


Dieses könnt ihr dann mit der Direktive `nvd3-line-chart` ausgeben.

![D3 Chart][5]

## Code

**application.js**

```javascript
angular.module("nvd3TestApp", ['nvd3ChartDirectives'])
  .controller('MainCtrl', function ($scope) {
    $scope.data = [
      {
        key: "Series 1",
        values: [[ 1025409600000 , 0], [ 1028088000000 , -6.3382185140371] ... ]
      }
    ];
    $scope.xAxisTickFormat = function () {
      return function (d) {
        return d3.time.format('%x')(new Date(d));
      }
    };

    $scope.yAxisTickFormat = function () {
      return function (d) {
        return Math.round(d,10);
      }
    };
});
```


**index.html**

```html
<html ng-app="nvd3TestApp">
<head>
  <script src="d3.js"></script>
  <script src="nv.d3.js"></script>
  <script src="angular.js"></script>
  <script src="angularjs-nvd3-directives.js"></script>
  <script src="application.js"></script>
  <link rel="stylesheet" href="nv.d3.css"/>
</head>
<body ng-controller="MainCtrl">
  <nvd3-line-chart
    data="data"
    id="exampleId"
    xAxisTickFormat="xAxisTickFormat()"
    yAxisTickFormat="yAxisTickFormat()"
    width="550"
    height="350"
    showXAxis="true"
    showYAxis="true">
  </nvd3-line-chart>
</body>
</html>
```


Weitere Diagramm-Beispiele findet ihr in der [Projektdokumentation][6].

Viel Spaß beim Ausprobieren!

 [1]: http://d3js.org/
 [2]: https://github.com/mbostock/d3/wiki/Gallery
 [3]: https://github.com/cmaurer/angularjs-nvd3-directives
 [5]: angularjs-directives-d3-nvd3-chart.png
 [6]: http://cmaurer.github.io/angularjs-nvd3-directives/line.chart.html
