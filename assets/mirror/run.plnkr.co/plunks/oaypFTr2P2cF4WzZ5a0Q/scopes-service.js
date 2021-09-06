angular.module("demo").factory("scopes", function ($rootScope) {
  // recursive function to traverse the scope tree
  function fetchScopes($scope, scopes) {
    if ($scope) {
      scopes.push($scope);
      fetchScopes($scope.$$childHead, scopes);
      if (scopes.length > 1) {
          fetchScopes($scope.$$nextSibling, scopes);
      }
    }
    return scopes;
  }
  
  return {
    fetch: function ($scope) {
      $scope = $scope || $rootScope;
      return fetchScopes($scope, []);
    }
  }
});