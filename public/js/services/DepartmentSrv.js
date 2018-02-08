angular.module('DepartmentSrv', ['CookieSrv']).factory('DepartmentService', [
  '$http',
  'CookieService',
function(
  $http,
  CookieService
) {
  return {
    create: function(data) {
      return $http.post('http://localhost:3001/api/v1/dept', data, {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    },
    read: function() {
      return $http.get('http://localhost:3001/api/v1/dept', {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    }
  };
}])