angular.module('EmployeeListCtrl', []).controller('EmployeeListController', function(
  $scope,
  EmployeeService,
  toasty
) {
  $scope.employees = [];

  EmployeeService.read().then((result) => {
    $scope.employees = result.data;
  })
  .catch((err) => {
    showError(err.data.error);
  });

  $scope.isSuper = () => {
    return $scope.user.role === 'super';
  };

  $scope.changeRole = (status, index, id) => {
    const tempRole = $scope.employees[index].role;
    $scope.employees[index].role = status;

    EmployeeService.update({ role: status}, id).then((result) => {
      toasty.success({
        title: 'Success!',
        msg: 'Role Updated Successfully.',
        position: 'toasty-position-top-right',
        timeout: 3000,
        sound: false,
        theme: 'bootstrap'
      });
    }).catch((err) => {
      $scope.employees[index].role = tempRole;
      showError(err.data.error);
    });
  };

  /**
   * Show Error
   * @param {*} msg 
   */
  function showError(msg) {
    toasty.error({
      title: 'Uh oh!',
      msg: msg,
      position: 'toasty-position-top-right',
      timeout: 3000,
      sound: false,
      theme: 'bootstrap'
    });
  }
});