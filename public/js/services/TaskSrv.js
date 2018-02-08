angular.module('TaskSrv', ['employapp']).factory('TaskService', [
  '$http',
  'CookieService',
  'SharedService',
function(
  $http,
  CookieService,
  SharedService
) {
  return {
    read: function(query) {
      var url = 'http://localhost:3001/api/v1/tasks';

      console.log(SharedService.isDefined(query));

      if (SharedService.isDefined(query.query)) {
        url = url + '?';
        Object.keys(query).forEach((key) => {
          url = `${url}${key}=${query[key]}`;
        });
      }

      console.log(url);

      return $http({
        method: 'GET',
        url: url,
        data: query,
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    }
  };
}]);