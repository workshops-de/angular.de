angular.module('userTable', ['ngSanitize','ui.utils']);
angular.module('userTable').controller('userTableController', function($scope, $http) {
  $http.get("users.json").success(function(users) {
    $scope.users = users;
  });
});
angular.module('userTable').filter('name', function() {
  return function (user) {
    var name = user.user.name;
    return name.first + " " + name.last;
  };
});
angular.module('userTable').filter('email', function() {
  return function (user) {
    return user.user.email;
  };
});
angular.module('userTable').filter('address', function() {
  return function (user) {
    var location = user.user.location;
    return location.street + "<br/>" + location.city + "<br/>" + location.zip + " " + location.state;
  };
});
