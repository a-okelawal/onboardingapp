angular.module('appRoutes', []).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .otherwise({
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    });

  $locationProvider.html5Mode(true);
}]);