angular.module('appRoutes', []).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/employee/add', {
      templateUrl: 'views/addEmployee.html',
      controller: 'EmployeeController'
    })
    .when('/department/add', {
      templateUrl: 'views/addDepartment.html',
      controller: 'DepartmentController'
    })
    .when('/department/view', {
      templateUrl: 'views/viewDepartment.html'
    })
    .otherwise({
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    });

  $locationProvider.html5Mode(true);
}]);