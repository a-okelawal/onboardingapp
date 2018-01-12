describe('Base Controller', function() {
  beforeEach(module('employapp'));

  var scope, location, controller, mockBackend;
  var cookieService;

  beforeEach(inject(function(
    _$rootScope_,
    _$location_,
    _$controller_,
    _CookieService_,
    _$httpBackend_
  ) {
    scope = _$rootScope_.$new();
    location = _$location_;
    cookieService = _CookieService_;
    controller = _$controller_('BaseController', {
      $scope: scope,
      $location: location
    });
  }));

  it('should handle logout', function() {
    expect(cookieService.isUserLoggedIn()).toBe(true);
    expect(scope.isLoggedIn()).toBe(true);

    scope.logout();

    expect(cookieService.isUserLoggedIn()).toBe(false);
    expect(scope.isLoggedIn()).toBe(false);
  });
});