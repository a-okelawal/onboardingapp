angular.module('BaseCtrl', []).controller('BaseController', function($scope, $location, CookieService) {
  /**
   * Go to home screen if user is already logged in.
   */
  if (CookieService.isUserLoggedIn()) {
    $scope.user = CookieService.getUser();
  } else {
    $location.path('/home');
  }

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