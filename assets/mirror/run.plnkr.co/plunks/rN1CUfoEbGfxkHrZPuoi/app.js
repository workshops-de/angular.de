angular.module('myApp', [
  'ngRoute'
]).config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "dashboard.html",
    name: "Dashboard"
  }).when("/settings", {
    templateUrl: "settings.html",
    name: "Settings"
  }).otherwise({
    redirectTo: "/"
  });
}).run(function ($rootScope, $location, $route) {
  $rootScope.$location = $location;
  $rootScope.$route = $route;
  $rootScope.keys = Object.keys;
});
