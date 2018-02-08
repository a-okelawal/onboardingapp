describe('Auth Controller', function() {
  beforeEach(module('employapp'));

  var scope, controller, cookies, mockBackend;
  var authService;

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$cookies_,
    _$httpBackend_
  ) {
    scope = _$rootScope_.$new();
    cookies = _$cookies_;
    mockBackend = _$httpBackend_;
    controller = _$controller_('AuthController', {
      $scope: scope,
      $cookies: cookies
    });
  }));

  it('should have default values', function() {
    expect(scope.loading).toBe(false);
    expect(scope.error).toBe(false);
    expect(scope.formPage).toBe('login');
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
    mockBackend.expectPOST('http://localhost:3001/api/v1/auth/login').respond(401, {error: 'An Error'});

    mockBackend.expectGET('views/login.html').respond('');

    expect(scope.err).toBe(undefined);
    expect(scope.showError()).toBe(false);
    
    scope.login();
    mockBackend.flush();

    expect(scope.err).toBe('An Error');
    expect(scope.showError()).toBe(true);
  });

  it('should handle successful login', function() {
    mockBackend.expectPOST('http://localhost:3001/api/v1/auth/login').respond(201, { 
      jwt: 'kjdbkjbdkjbd',
      user: { name: 'Test Name'}
    });

    mockBackend.expectGET('views/login.html').respond('');
    mockBackend.expectGET('views/home.html').respond('');
      
    scope.login();
    mockBackend.flush();
    
    expect(cookies.get('token')).toBe('kjdbkjbdkjbd');
  });
  
  it('should toggle the forgot password variable', function() {
    expect(scope.formPage).toBe('login');
    scope.loading = true;
    scope.error = true;

    scope.toggleForm('forgot-password');

    expect(scope.formPage).toBe('forgot-password');
    expect(scope.error).toBe(false);
    expect(scope.loading).toBe(false);
  });

  describe('Forgot Password', function() {
    it('should handle forgot password logic on failure', function() {
      scope.toggleForm('forgot-password');
      mockBackend.expectPOST('http://localhost:3001/api/v1/auth/forgot-password').respond(400, {
        error: 'Password Invalid.'
      });
      mockBackend.expectGET('views/home.html').respond('');
  
      scope.changePassword('test@email.com', 'ibadan', 'gori');
  
      mockBackend.flush();
      expect(scope.error).toBe(true);
      expect(scope.err).toBe('Password Invalid.');
      expect(scope.formPage).toBe('forgot-password');
    });
  
    it('should handle forgot password logic on success', function() {
      scope.toggleForm('forgot-password');
      mockBackend.expectPOST('http://localhost:3001/api/v1/auth/forgot-password').respond(200, {
        message: 'Password change successful.'
      });
      mockBackend.expectGET('views/home.html').respond('');
  
      scope.changePassword('test@email.com', 'ibadan', 'gorilla');
  
      mockBackend.flush();
      expect(scope.error).toBe(false);
      expect(scope.formPage).toBe('login');
    });
  });
});