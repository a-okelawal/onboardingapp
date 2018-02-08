angular.module('AuthCtrl', []).controller('AuthController', ['$scope', '$cookies', '$location', 'AuthService',
  'CookieService',
  function($scope, $cookies, $location, AuthService, CookieService) {
  $scope.loading = false;
  $scope.error = false;
  $scope.formPage = 'login';

  /**
   * Go to home screen if user is already logged in.
   */
  if (CookieService.isUserLoggedIn()) {
    $location.path('/home');
  }

  /**
   * Set status of loading and error
   * @param {*} status 
   */
  function setStatus(status) {
    if (status === 'loading') {
      $scope.loading = true;
      $scope.error = false;
    } else if (status === 'reset') {
      $scope.error = false;
      $scope.loading = false;
    } else if (status === 'error') {
      $scope.error = true;
      $scope.loading = false;
    }
  }

  /**
   * Handle change password logic
   * @param {*} data 
   */
  $scope.changePassword = function(email, secret, password) {
    setStatus('loading');

    AuthService.changePassword({
      email,
      secret,
      password
    })
      .then((result) => {
        setStatus('reset');
        $scope.formPage = 'login';
      }, (err) => {
        $scope.err = err.data.error;
        setStatus('error');
      });
  };

  /**
   * Perform login
   */
  $scope.login = (email, password) => {
    setStatus('loading');

    AuthService.login({ email, password })
      .then((result) => {
        // Save token and user detail in cookies
        CookieService.setToken(result.data.jwt);
        CookieService.setUser(result.data.user);
        
        // redirect to home
        $location.path('/home');
      }, (err) => {
        $scope.err = err.data.error;
        setStatus('error');
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

  /**
   * Current Page
   * @param {String} page 
   */
  $scope.toggleForm = function(page) {
    $scope.error = false;
    $scope.loading = false;
    $scope.formPage = page;
  };
}]);