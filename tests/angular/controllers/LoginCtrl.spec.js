describe('Login Controller', function() {
  beforeEach(module('employapp'));

  var scope, controller, cookies, mockBackend;
  var LoginService;

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$cookies_,
    _LoginService_,
    _$httpBackend_
  ) {
    scope = _$rootScope_.$new();
    cookies = _$cookies_;
    LoginService = _LoginService_;
    mockBackend = _$httpBackend_;
    controller = _$controller_('LoginController', {
      $scope: scope,
      $cookies: cookies
    });
  }));

  it('should have default values', function() {
    expect(scope.loading).toBe(false);
    expect(scope.error).toBe(false);
  });

  it('should handle displaying loading', function() {
    expect(scope.showLoading()).toBe(false);

    scope.loading = true;

    expect(scope.showLoading()).toBe(true);
  });

  it('should handle displaying errors', function() {
    expect(scope.showError()).toBe(false);

    scope.error = true;

    expect(scope.showError()).toBe(true);
  });

  it('should handle errors from login', function() {
    spyOn(LoginService, 'login').and.returnValue(new Promise(function(resolve, reject) {
      reject( {data: { error: 'An Error' } });
    }));

    expect(scope.err).toBe(undefined);
    expect(scope.showError()).toBe(false);
    
    scope.login();

    expect(scope.err).toBe('An Error');
    expect(scope.showError()).toBe(true);
  });
});