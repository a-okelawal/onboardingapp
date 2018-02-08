angular.module('SharedSrv', []).factory('SharedService', [function() {
  return {
    isDefined: function(element) {
      if (!(!!element)) {
        return false;
      } else if (typeof element === 'object' && !(element instanceof Date) && Object.keys(element).length === 0) {
        return false;
      } else if (Array.isArray(element) && element.length === 0) {
        return false;
      } else if (element === null) {
        return false;
      } else {
        return true;
      }
    }
  };
}]);