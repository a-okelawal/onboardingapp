angular.module('EmployeeSrv', ['CookieSrv']).factory('EmployeeService', ['$http', 'CookieService', function($http, CookieService) {
  return {
    read: function() {
      return $http.get('http://localhost:3001/api/v1/employee', {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    }
  };
}]);