angular.module('CookieSrv', ['ngCookies']).factory('CookieService', ['$cookies', function($cookies) {
  return {
    clearAll: function() {
      $cookies.remove('user');
      $cookies.remove('token');
    },
    getUser: function() {
      return $cookies.getObject('user');
    },
    isUserLoggedIn: function() {
      return angular.isDefined($cookies.get('token'));
    },
    setToken: function(token) {
      $cookies.put('token', token);
    },
    setUser: function(user) {
      $cookies.putObject('user', user);
    }
  };
}]);