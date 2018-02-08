describe('AuthService', function() {
  var mockBackend, authService;

  beforeEach(module('AuthSrv'));

  beforeEach(inject(function(
    _AuthService_,
    _$httpBackend_
  ) {
    mockBackend = _$httpBackend_;
    authService = _AuthService_;
  }));

  it('should make a request to the backend to login', function() {
    mockBackend.expectPOST('http://localhost:3001/api/v1/auth/login').respond(Object({
      data: {
        jwt: 'token',
        user: Object({
          id: 1
        })
      }
    }));

    authService.login().then(function(data) {
      expect(data.jwt).toBe('token');
      expect(data.user.id).toBe(1);
    });
  });

  it('should make a request to the backend to change password', function() {
    mockBackend.expectPOST('http://localhost:3001/api/v1/auth/forgot-password').respond(Object({
      data: {
        message: 'Password change successful.'
      }
    }));

    authService.changePassword().then(function(data) {
      expect(data.message).toBe('Password change successful.');
    });
  });
});