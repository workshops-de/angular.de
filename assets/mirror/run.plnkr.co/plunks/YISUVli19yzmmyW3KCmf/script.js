angular.module( 'baconDemo', ['angular-bacon'] )

.controller( 'baconCtrl', function($scope) {
  var tickStream = Bacon.interval(500, 1)
  var aggregator = function(aggregate, tick) {
    return aggregate !== tick ? 1 : 0
  }
  var ticktackProp = tickStream.scan(0, aggregator);
  
  var toVisibility = function(ticktackVal) {
    return ticktackVal ? {visibility:'visible'} : {visibility: 'hidden'};
  };
  var blinkProp = ticktackProp
  .map(toVisibility);
  
  blinkProp.digest($scope, 'blinkCss');
})

.directive( 'blink', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div ng-style="blinkCss" ng-transclude></div>', 
  }
})
;
