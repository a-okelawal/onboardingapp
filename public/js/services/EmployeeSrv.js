angular.module('EmployeeSrv', ['CookieSrv']).factory('EmployeeService', ['$http', 'CookieService', function($http, CookieService) {
  return {
    create: function(data) {
      return $http.post('http://localhost:3001/api/v1/auth/signup', data, {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    }
  };
}]);