angular.module('demo', []);

angular.module('demo').controller('demoController', function($scope, scopes) {
  $scope.displayScopeInformation = false;

  $scope.scopes = function () {
    return scopes.fetch().map(function (scope) {
      return { 
        id: scope.$id
      };
    });
  };
});
