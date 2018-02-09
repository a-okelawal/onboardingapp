describe('Employee List Controller', function() {
  var controller, scope, mockBackend;

  beforeEach(module('employapp'));

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$httpBackend_
  ) {
    scope = _$rootScope_.$new();
    mockBackend = _$httpBackend_;
    controller = _$controller_('EmployeeListController', {
      $scope: scope
    });

    mockBackend.expectGET('http://localhost:3001/api/v1/employees').respond(200, [
      Object({
        name: 'Abisoye Oke-lawal',
        email: 'test@email.com',
        role: 'employee'
      })
    ]);
    mockBackend.expectGET('views/login.html').respond('');

    mockBackend.flush();
  }));

  it('should have default values', function() {
    expect(scope.employees.length).toBe(1);
  });

  it('should handle check for superadmin', function() {
    scope.user = {
      role: 'admin'
    };
    expect(scope.isSuper()).toBe(false);
    
    scope.user = {
      role: 'super'
    };
    expect(scope.isSuper()).toBe(true);
  });

  it('should handle changing roles on failure', function() {
    mockBackend.expectPUT('http://localhost:3001/api/v1/employees/10', Object({
      role: 'admin'
    })).respond(500, Object({
      error: 'Error'
    }));

    expect(scope.employees[0].role).toBe('employee');

    scope.changeRole('admin', 0, 10);
    mockBackend.flush();

    expect(scope.employees[0].role).toBe('employee');
  });

  it('should handle changing roles on success', function() {
    mockBackend.expectPUT('http://localhost:3001/api/v1/employees/10', Object({
      role: 'admin'
    })).respond(200, Object({
      message: 'Success'
    }));

    expect(scope.employees[0].role).toBe('employee');

    scope.changeRole('admin', 0, 10);
    mockBackend.flush();

    expect(scope.employees[0].role).toBe('admin');
  });
});