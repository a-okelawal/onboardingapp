angular.module('BaseCtrl', []).controller('BaseController', function($scope, $location, CookieService) {
  /**
   * Check if user is loged in
   */
  $scope.isLoggedIn = () => {
    return CookieService.isUserLoggedIn();
  };

  /**
   * Log user out and redirect to login screen
   */
  $scope.logout = () => {
    CookieService.clearAll();
    $location.path('/');
  };

  if (!$scope.isLoggedIn() && $location.path() != '/') {
    $location.path('/');
  }
});