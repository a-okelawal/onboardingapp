angular.module('AuthSrv', ['employapp']).factory('AuthService', [
  '$http',
  'CookieService',
function(
  $http,
  CookieService
) {
  return {
    changePassword: function(data) {
      return $http.post('http://localhost:3001/api/v1/auth/forgot-password', data);
    },
    login: function(data) {
      return $http.post('http://localhost:3001/api/v1/auth/login', data);
    },
    signup: function(data) {
      return $http.post('http://localhost:3001/api/v1/auth/signup', data, {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    }
  };
}]);