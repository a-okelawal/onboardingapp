describe('Department Service', function() {
  var mockBackend, departmentService;

  beforeEach(module('DepartmentSrv'));

  beforeEach(inject(function(
    _$httpBackend_,
    _DepartmentService_
  ) {
    departmentService = _DepartmentService_;
    mockBackend = _$httpBackend_;
  }))

  it('should handle requests to api to add an employee', function() {
    mockBackend.expectPOST('http://localhost:3001/api/v1/dept', Object({
      name: 'H.R',
      onboardingList: ['One', 'Two', 'Three']
    })).respond(201, Object({
      message: 'H.R created successfully.'
    }));

    departmentService.create(Object({
      name: 'H.R',
      onboardingList: ['One', 'Two', 'Three']
    })).then(function(result) {
      expect(result.message).toBe('H.R created successfully.');
    });
  });
});