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
});