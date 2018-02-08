angular.module('AuthSrv', []).factory('AuthService', ['$http', function($http) {
  return {
    changePassword: function(data) {
      return $http.post('http://localhost:3001/api/v1/auth/forgot-password', data);
    },
    login: function(data) {
      return $http.post('http://localhost:3001/api/v1/auth/login', data);
    }
  };
}]);