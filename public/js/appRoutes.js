angular.module('appRoutes', []).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/employee/add', {
      templateUrl: 'views/addEmployee.html',
      controller: 'EmployeeController'
    })
    .otherwise({
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    });

  $locationProvider.html5Mode(true);
}]);