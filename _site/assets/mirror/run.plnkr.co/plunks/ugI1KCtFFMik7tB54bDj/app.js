angular.module('demo', []);

angular.module('demo').controller('demoController', function($scope, logger) {
  $scope.displayScopeInformation = false;
  $scope.logger = logger;
  
  $scope.$watch("ngShow", function (ngShow) {
    logger.log("$watch - ngShow: " +  ngShow);
  });
  $scope.$watch("ngIf", function (ngIf) {
    logger.log("$watch - ngIf: " +  ngIf);
  });
  
  $scope.initNgShow = function () {
    logger.log('ng-init - Aufruf im ng-show Block.');
  };
  
  $scope.initNgIf = function () {
    logger.log('ng-init - Aufruf im ng-if Block.');
    var $scope = this;
    this.$on("$destroy", function () {
      logger.log("$on - $destroy Event für den ng-if Scope.");
    })
  }
});

angular.module('demo').factory('logger', function() {
  var logs = [];

  return {
    logs: function () {
      // return a copy to prevent modifications
      return angular.copy(logs).reverse();
    },
    clear: function () {
      logs = [];
    },
    log: function (msg) {
      logs.push(msg); 
    }
  }
});
