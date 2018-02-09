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
    mockBackend.expectGET('/api/v1/employees').respond(200, [
      Object({
        name: 'Abisoye Oke-lawal',
        email: 'test@email.com',
        role: 'employee'
      })
    ]);

    employeeService.read().then(function(result) {
      expect(result[0].name).toBe('Abisoye Oke-lawal');
      expect(result[0].email).toBe('test@email.com');
    });
  });

  it('should handle requests to api to update an employee', function() {
    mockBackend.expectGET('/api/v1/employees/0', Object({
      role: 'admin'
    })).respond(200, [
      Object({
        role: 'admin'
      })
    ]);

    employeeService.update(Object({
      role: 'admin'
    }), 10).then(function(result) {
      expect(result[0].role).toBe('admin');
    });
  });
});