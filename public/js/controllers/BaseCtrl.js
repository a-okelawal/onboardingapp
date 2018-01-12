angular.module('BaseCtrl', []).controller('BaseController', function($scope, $location, CookieService) {
  /**
   * Log user out and redirect to login screen
   */
  $scope.logout = () => {
    CookieService.clearAll();
    $location.path('/');
  };
});