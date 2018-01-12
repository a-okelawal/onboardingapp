describe('CookieService', function() {
  var mockBackend, cookies, cookieService;
  
  beforeEach(module('CookieSrv'));

  beforeEach(inject(function(
    _$cookies_,
    _CookieService_,
    _$httpBackend_
  ) {
    cookieService = _CookieService_;
    cookies = _$cookies_;
    mockBackend = _$httpBackend_;
  }))

  it('should handle setting Token and isUserLoggedIn', function() {
    expect(cookieService.isUserLoggedIn()).toBe(false);
    
    cookieService.setToken('test token');

    expect(cookieService.isUserLoggedIn()).toBe(true);
  });

  it('should setting user and getting user', function() {
    expect(cookieService.getUser()).toBeUndefined();
    
    cookieService.setUser(Object({
      name: 'Abisoye Oke-lawal',
      email: 'test@email.com'
    }));

    var user = cookieService.getUser();

    expect(user).toBeDefined();
    expect(user.name).toBe('Abisoye Oke-lawal');
    expect(user.email).toBe('test@email.com');
  });

  it('should handle clearing tokens', function() {
    expect(cookieService.isUserLoggedIn()).toBe(true);
    expect(cookieService.getUser()).toBeDefined();

    cookieService.clearAll();

    expect(cookieService.isUserLoggedIn()).toBe(false);
    expect(cookieService.getUser()).toBeUndefined();
  });
});