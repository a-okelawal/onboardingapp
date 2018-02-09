describe('Department Controller', function() {
  beforeEach(module('employapp'));

  var scope, mockBackend, controller, location;

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$location_,
    _$httpBackend_
  ) {
    scope = _$rootScope_.$new();
    location = _$location_;
    mockBackend = _$httpBackend_;
    controller = _$controller_('DepartmentController', {
      $scope: scope
    });
  }));

  it('should have default values', function() {
    expect(scope.error).toBe(false);
    expect(scope.loading).toBe(false);
    expect(scope.data.name).toBeUndefined();
    expect(scope.data.onboardingList.length).toBe(0);
  });

  it('should handle adding to the onboarding list', function() {
    expect(scope.data.onboardingList.length).toBe(0);

    scope.addToList('One');

    expect(scope.data.onboardingList[0]).toBe('One');
    expect(scope.data.onboardingList.length).toBe(1);
  });

  it('should handle removing from the onboarding list', function() {
    scope.addToList('One');
    scope.addToList('Two');
    scope.addToList('Three');
    expect(scope.data.onboardingList.length).toBe(3);

    scope.removeItem(1);

    expect(scope.task).toBe('');
    expect(scope.data.onboardingList.length).toBe(2);
    expect(scope.data.onboardingList[0]).toBe('One');
    expect(scope.data.onboardingList[1]).toBe('Three');
  });

  it('should not allow duplicates in onboarding list', function() {
    scope.addToList('Three');
    expect(scope.task).toBe('');
    expect(scope.data.onboardingList.length).toBe(1);

    scope.task = 'Three';

    scope.addToList('Three');
    expect(scope.task).toBe('Three');
    expect(scope.data.onboardingList.length).toBe(1);
  });

  it ('should handle adding a department on success', function() {
    mockBackend.expectPOST('http://localhost:3001/api/v1/dept').respond(201, {
      message: 'Success'
    });
    mockBackend.expectGET('views/login.html').respond('');
    mockBackend.expectGET('views/viewDepartment.html').respond('');

    scope.data.name = 'Test Department';
    scope.addToList('One');
    scope.addToList('Two');
    scope.addToList('Three');

    scope.addDepartment();
    mockBackend.flush();

    expect(location.path()).toBe('/department/view');
  });

  describe('should handle adding a department on failure', function() {
    it ('when department name already exists', function() {
      mockBackend.expectPOST('http://localhost:3001/api/v1/dept').respond(409, {
        error: 'Department already exists.'
      });
      mockBackend.expectGET('views/login.html').respond('');
  
      scope.data.name = 'Test Department';
      scope.addToList('One');
      scope.addToList('Two');
      scope.addToList('Three');
  
      scope.addDepartment();
      mockBackend.flush();
  
      expect(location.path()).toBe('/');
    });

    it ('when onboarding list is empty', function() {
      scope.data.name = 'Test Department';
  
      scope.addDepartment();
  
      expect(location.path()).toBe('/');
    });
  });
});