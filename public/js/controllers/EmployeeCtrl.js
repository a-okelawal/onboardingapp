angular.module('EmployeeCtrl', []).controller('EmployeeController', function($scope, EmployeeService) {
  $scope.data = {};
  $scope.error = false;
  $scope.loading = false;
  $scope.success = false;

  /**
   * Reset form
   */
  function resetForm() {
    $scope.data = {};
  }

  /**
   * Add Employee
   * @param {*} worker 
   */
  $scope.addEmployee = (worker) => {
    $scope.loading = true;
    EmployeeService.addEmployee(worker).then((result) => {
      resetForm();
      $scope.suc = result.data.message;
      $scope.success = true;
    }, (err) => {
      $scope.err = err.data.error;
      $scope.error = true;
    });
  };
});