angular.module('oneTimeBindingDemo', []);

angular.module('oneTimeBindingDemo').controller('baseController', function ($scope) {
  $scope.showBinding = true;
  $scope.names = ["Misko", "Adam", "Igor", "Vojta"];
  $scope.resetName = function () {
    $scope.selectedName = undefined;
  }
  $scope.rotateName = function () {
    var currentIndex = $scope.names.indexOf($scope.selectedName);
    var nextIndex = (currentIndex + 1) % $scope.names.length;
    $scope.selectedName = $scope.names[nextIndex];
  }
});
