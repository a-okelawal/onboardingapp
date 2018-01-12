angular.module('LoginSrv', []).factory('LoginService', ['$http', function($http) {
  return {
    login: function(data) {
      return $http.post('/api/v1/auth/login', data);
    }
  };
}]);