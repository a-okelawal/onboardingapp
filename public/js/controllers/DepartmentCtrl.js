angular.module('DepartmentCtrl', []).controller('DepartmentController', function(
  $scope,
  $location,
  DepartmentService,
  toasty
) {
  $scope.error = false;
  $scope.loading = false;
  $scope.alerts = [];
  $scope.data = {
    onboardingList: []
  };
  
  function searchList(x) {
    var found = false;

    $scope.data.onboardingList.some(element => {
      if (x === element) {
        found = true;
        return found;
      }
    });

    return found;
  }

  $scope.addToList = (item) => {
    if (!searchList(item) && angular.isDefined(item)) {
      $scope.data.onboardingList.push(item);
      $scope.task = '';
    }
  };

  $scope.removeItem = (index) => {
    $scope.data.onboardingList.splice(index, 1);
  };

  $scope.addDepartment = () => {
    if ($scope.data.onboardingList.length < 1) {
      showError('Onboarding list cannot be empty.');
    } else {
      DepartmentService.create($scope.data)
        .then((result) => {
          $scope.data = {
            onboardingList: []
          };
          toasty.success({
            title: 'Success!',
            msg: result.data.message,
            position: 'toasty-position-top-right',
            timeout: 3000,
            sound: false,
            theme: 'bootstrap'
          });
        })
        .catch((err) => {
          showError(err.data.error);
        });
    }
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