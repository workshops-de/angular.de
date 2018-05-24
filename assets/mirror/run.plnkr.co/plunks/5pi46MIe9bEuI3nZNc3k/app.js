angular.module('myApp', []).config(function(userServiceProvider) {
  userServiceProvider.addInitialUser("admin", "admin@example.com");
});

angular.module('myApp').controller('formController', function($scope, userService) {
  $scope.addUser = function() {
    userService.addUser($scope.username, $scope.email);
    $scope.username = "";
    $scope.email = "";
  }
});

angular.module('myApp').controller('userListController', function($scope, userService) {
  $scope.users = userService.users;
});

angular.module("myApp").provider("userService", function() {
  var privateUserList = [];

  this.addInitialUser = function(username, email) {
    privateUserList.push({
      username: username,
      email: email
    });
  };

  this.$get = function() {
    return {
      users: function() {
        return [].concat(privateUserList);
      },
      addUser: function(username, email) {
        privateUserList.push({
          username: username,
          email: email
        });
      }
    };
  };
});
