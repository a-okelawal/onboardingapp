angular.module('BaseCtrl', []).controller('BaseController', function($scope, $cookies) {
  $scope.logout = () => {
    $cookies.clear();
  };
});