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
    .when('/department/add', {
      templateUrl: 'views/addDepartment.html',
      controller: 'DepartmentController'
    })
    .when('/department/view', {
      templateUrl: 'views/viewDepartment.html'
    })
    .when('/employee/add', {
      templateUrl: 'views/addEmployee.html',
      controller: 'EmployeeController'
    })
    .when('/tasks/add', {
      templateUrl: 'views/addTask.html',
      controller: 'TaskController'
    })
    .when('/tasks/view', {
      templateUrl: 'views/viewTasks.html',
      controller: 'TaskListController'
    })
    .otherwise({
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    });

  $locationProvider.html5Mode(true);
}]);