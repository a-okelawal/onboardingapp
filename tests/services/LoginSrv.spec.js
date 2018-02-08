describe('LoginService', function() {
  var mockBackend, loginService;

  beforeEach(module('LoginSrv'));

  beforeEach(inject(function(
    _LoginService_,
    _$httpBackend_
  ) {
    mockBackend = _$httpBackend_;
    loginService = _LoginService_;
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

    loginService.login().then(function(data) {
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

    loginService.changePassword().then(function(data) {
      expect(data.message).toBe('Password change successful.');
    });
  });
});