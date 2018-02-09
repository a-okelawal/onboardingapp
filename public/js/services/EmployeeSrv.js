angular.module('EmployeeSrv', ['CookieSrv']).factory('EmployeeService', ['$http', 'CookieService', function($http, CookieService) {
  return {
    read: function() {
      return $http.get('http://localhost:3001/api/v1/employees', {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    },
    update: function(details, id) {
      return $http.put(`http://localhost:3001/api/v1/employees/${id}`, details, {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    }
  };
}]);