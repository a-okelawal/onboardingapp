angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$cookies', '$location', 'LoginService',
  'CookieService',
  function($scope, $cookies, $location, LoginService, CookieService) {
  $scope.loading = false;
  $scope.error = false;

  /**
   * Go to home screen if user is already logged in.
   */
  if (CookieService.isUserLoggedIn()) {
    $location.path('/home');
  }

  /**
   * Perform login
   */
  $scope.login = () => {
    $scope.loading = true;
    $scope.error = false;

    LoginService.login({ email: $scope.email, password: $scope.password})
      .then((result) => {
        // Save token and user detail in cookies
        CookieService.setToken(result.data.jwt);
        CookieService.setUser(result.data.user);
        
        // redirect to home
        $location.path('/home');
      }, (err) => {
        $scope.err = err.data.error;
        $scope.loading = false;
        $scope.error = true;
      });
  };

  /**
   * function to indicate if to display error
   */
  $scope.showError = () => {
    return $scope.error;
  };

  /**
   * function to indicate if to display loading
   */
  $scope.showLoading = () => {
    return $scope.loading;
  };
}]);