angular.module('ngModelOptionsDemo', []);

angular.module('ngModelOptionsDemo').controller('baseController', function ($scope, $timeout) {
    $scope.user = {
      username: "tilmanpotthof",
      name: "",
      url: "http://angularjs.de/entwickler/tilmanpotthof"
    };
    
    $scope.userInputOptions = {
      updateOn: 'default'
    };
    
    $scope.debounceOptions = [0,100,250,500,750,1000,1500]
    $scope.hasDebounce = function () {
      return $scope.userInputOptions.debounce;
    };

    $scope.addDebounce = function () {
      $scope.userInputOptions.debounce = {};
    };

    $scope.removeDebounce = function () {
      delete $scope.userInputOptions.debounce;
    };
  
    $scope.onUpdateOptions = ["", "default", "blur", "default blur"];

    $scope.editInputOptions = false;
    $scope.editOptions = function () {
      $scope.editInputOptions = true;
      if ($scope.userInputOptions.updateOnDefault === true) {
        $scope.userInputOptions.updateOn = ("default " + $scope.userInputOptions.updateOn).trim();
      }
      delete $scope.userInputOptions.updateOnDefault;
    };
    $scope.saveOptions = function () {
      $scope.editInputOptions = false;
    };
});
