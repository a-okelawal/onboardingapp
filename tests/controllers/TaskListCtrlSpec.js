describe('Task List Controller', function() {
  var controller, scope, mockBackend;

  beforeEach(module('employapp'));

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$httpBackend_
  ) {
    scope = _$rootScope_.$new();
    mockBackend = _$httpBackend_;
    controller = _$controller_('EmployeeController', {
      $scope: scope
    });

    mockBackend.expectGET('http://localhost:3001/api/v1/tasks').respond(200, [
      Object({
        administrator: 'Test User',
        assignee: 'New User',
        task: 'A new task',
        due: new Date('03/03/2018'),
        creator: 'Oga Creator'
      })
    ]);

    mockBackend.flush();
  }));

  it('should have default values', function() {
    expect($scope.tasks.length).toBe(1);
  });
});