angular.module('TaskListCtrl', []).controller('TaskListController', function(
  $scope,
  TaskService,
  toasty
) {
  $scope.tasks = [];

  $scope.loadTasks = function(query) {
    TaskService.read({query: query}).then((response) => {
      $scope.tasks = response.data;
    })
    .catch((err) => {
      toasty.error({
        title: 'Uh oh!',
        msg: err.data.error,
        position: 'toasty-position-top-right',
        timeout: 3000,
        sound: false,
        theme: 'bootstrap'
      });
    });
  }
});