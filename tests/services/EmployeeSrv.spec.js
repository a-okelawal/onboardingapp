describe('EmployeeService', function() {
  var mockBackend, cookieService, employeeService;

  beforeEach(module('EmployeeSrv'));

  beforeEach(inject(function(
    _$httpBackend_,
    _CookieService_,
    _EmployeeService_
  ) {
    cookieService = _CookieService_;
    employeeService = _EmployeeService_;
    mockBackend = _$httpBackend_;
  }))

  it('should handle requests to api to add an employee', function() {
    mockBackend.expectPOST('/api/v1/auth/signup', Object({
      name: 'Abisoye Oke-lawal',
      email: 'test@email',
      role: 'employee'
    })).respond(201, Object({
      message: 'abisoye oke-lawal was created successfully as a/an employee'
    }));

    employeeService.addEmployee(Object({
      name: 'Abisoye Oke-lawal',
      email: 'test@email',
      role: 'employee'
    })).then(function(result) {
      expect(result.message).toBe('abisoye oke-lawal was created successfully as a/an employee');
    });
  });
});