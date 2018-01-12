angular.module('EmployeeCtrl', []).controller('EmployeeController', function($scope, EmployeeService) {
  $scope.data = {
    recentHire: false
  };
  $scope.error = false;
  $scope.loading = false;
  $scope.success = false;

  //TODO: Make this dynamic and add the ability to add departments
  $scope.departments = [
    { name: 'Accounting' },
    { name: 'H.R' },
    { name: 'I.T' }, 
    { name: 'Legal'}
  ];

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
    worker['name'] = `${worker.firstName} ${worker.lastName}`;
    
    EmployeeService.addEmployee(worker).then((result) => {
      resetForm();
      $scope.loading = false;
      $scope.suc = result.data.message;
      $scope.success = true;
    }, (err) => {
      $scope.loading = false;
      $scope.err = err.data.error;
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

  /**
   * function to indicate if to display loading
   */
  $scope.showSuccess = () => {
    return $scope.success;
  };
});