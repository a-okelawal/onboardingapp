angular.module('EmployeeCtrl', []).controller('EmployeeController', function(
  $scope,
  AuthService,
  DepartmentService,
  toasty
) {
  $scope.data = {
    recentHire: false
  };
  $scope.error = false;
  $scope.loading = false;
  $scope.success = false;

  //TODO: Make this dynamic and add the ability to add departments
  DepartmentService.read().then((result) => {
    $scope.departments = result.data;
  })
  .catch((err) => {
    toasty.error({
      title: 'Uh oh!',
      msg: msg,
      position: err.data.error,
      timeout: 3000,
      sound: false,
      theme: 'bootstrap'
    });
  });

  /**
   * Reset form
   */
  function resetForm() {
    $scope.data = {};
  }

  function resetMessages() {
    $scope.error = false;
    $scope.loading = false;
    $scope.success = false;
  } 

  /**
   * Add Employee
   * @param {*} worker 
   */
  $scope.addEmployee = (worker) => {
    resetMessages();
    worker['name'] = `${worker.firstName} ${worker.lastName}`;
    
    AuthService.signup(worker).then((result) => {
      resetForm();
      $scope.loading = false;
      $scope.suc = result.data.message;
      $scope.success = true;
    }).catch((err) => {
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