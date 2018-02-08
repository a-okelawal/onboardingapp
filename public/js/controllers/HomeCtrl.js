angular.module('HomeCtrl', []).controller('HomeController', function($scope) {
  $scope.displayDeptOptions = function() {
    return $scope.user.role === 'super';
  };
});