angular.module('ngModelOptionsDemo', []);

angular.module('ngModelOptionsDemo').controller('baseController', function($scope, $timeout) {
  $scope.inputOptions = {
    getterSetter: true
  };

  $scope.inputOptionsCopy = angular.copy($scope.inputOptions);

  function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9)
  }

  function celsiusToFahrenheit(celsius) {
    return ((celsius * 9) / 5) + 32
  }

  function round(value, precision) {
    var n = Math.pow(10, precision);
    return Math.round(value * n) / n;
  }

  $scope.temperature = {
    celsiusValue: 23, // celsius
    celsius: function(celsiusValue) {
      if (!isNaN(celsiusValue)) {
        this.celsiusValue = parseFloat(celsiusValue);
      }
      return round(this.celsiusValue, 2);
    },
    fahrenheit: function(fahrenheitValue) {
      if (!isNaN(fahrenheitValue)) {
        this.celsiusValue = fahrenheitToCelsius(parseFloat(fahrenheitValue));
      }
      return round(celsiusToFahrenheit(this.celsiusValue), 2);
    }
  };
});