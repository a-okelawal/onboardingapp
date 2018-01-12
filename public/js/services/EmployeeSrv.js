angular.module('EmployeeSrv', ['CookieSrv']).factory('EmployeeService', ['$http', 'CookieService', function($http, CookieService) {
  return {
    addEmployee: function(data) {
      return $http.post('/api/v1/auth/signup', data, {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    }
  };
}]);