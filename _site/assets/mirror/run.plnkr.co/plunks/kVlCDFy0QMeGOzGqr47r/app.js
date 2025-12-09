angular.module('ngModelOptionsDemo', []).controller('baseController', function ($scope, $timeout) {
    $scope.user = {
      name: "John Doe",
      email: "john@example.com",
    };
    
    $scope.userInputOptions = {
      updateOn: 'blur'
    };
    
    $scope.userInputOptionsCopy = angular.copy($scope.userInputOptions);

    $scope.getNameAndEmail = function (user) {
      return user.name + " <" + user.email + ">";
    }
});
