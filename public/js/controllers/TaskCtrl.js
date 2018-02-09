angular.module('TaskCtrl', []).controller('TaskController', function(
  $scope,
  $location,
  EmployeeService,
  TaskService,
  toasty
) {
  $scope.loading = false;
  $scope.admins = [];
  $scope.employees = [];

  EmployeeService.read().then((result) => {
    result.data.forEach(element => {
      $scope.employees.push(element.name);
      if (element.role === 'super' || element.role === 'admin') {
        $scope.admins.push(element.name);
      }
    });
  })
  .catch((err) => {
    showError(err.data.error);
  });

  $scope.addTask = (data) => {
    data.due = (new Date($scope.due)).toLocaleDateString();
    TaskService.create(data)
      .then((result) => {
        toasty.success({
          title: 'Success!',
          msg: result.data.message,
          position: 'toasty-position-top-right',
          timeout: 3000,
          sound: false,
          theme: 'bootstrap'
        });
        $scope.data = {};
      })
      .catch((err) => {
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