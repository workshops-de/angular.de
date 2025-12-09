angular.module("demo").directive("displayScopeId", function ($compile) {
 
  var template = "<div class='scope-id'><span>$id: {{ $id }}</span></div>";

  return {
    restrict: "A",
    link: function ($scope, $element, attributes) {
      $element.prepend($compile(template)($scope));
    }
  }
});
