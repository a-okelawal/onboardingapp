describe('Task Controller', function() {
  var controller, scope, location, taskService, mockBackend;

  beforeEach(module('employapp'));

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$location_,
    _TaskService_,
    _$httpBackend_
  ) {
    scope = _$rootScope_.$new();
    taskService = _TaskService_;
    mockBackend = _$httpBackend_;
    location = _$location_;
    controller = _$controller_('TaskController', {
      $scope: scope
    });
  }));

  it('should have default values', function() {
    expect(scope.data).toBeUndefined();
    expect(scope.loading).toBe(false);
  });

  describe('AddTask', function() {
    it('should handle errors', function() {
      mockBackend.expectGET('http://localhost:3001/api/v1/employees').respond(200,  [
        Object({
          name: 'One'
        })
      ]);
      mockBackend.expectPOST('http://localhost:3001/api/v1/tasks', Object({
        administrator: 'Alice',
        assignee: 'Bode',
        task: 'Add a another task.',
        due: "12/12/2018"
      })).respond(400, { error: 'Server Error.' });
      mockBackend.expectGET('views/login.html').respond('');

      scope.data = {
        administrator: 'Alice',
        assignee: 'Bode',
        task: 'Add a another task.'
      };

      scope.due = new Date('12/12/2018');
      scope.addTask(Object({
        administrator: 'Alice',
        assignee: 'Bode',
        task: 'Add a another task.'
      }));
      mockBackend.flush();

      expect(scope.data.administrator).toBe('Alice');
      expect(scope.data.assignee).toBe('Bode');
    });

    it('should handle success', function() {
      mockBackend.expectGET('http://localhost:3001/api/v1/employees').respond(200,  [
        Object({
          name: 'One'
        })
      ]);
      mockBackend.expectPOST('http://localhost:3001/api/v1/tasks', Object({
        administrator: 'Alice',
        assignee: 'Bode',
        task: 'Add a another task.',
        due: "12/12/2018"
      })).respond(200, {message: 'Task Created.'});
      mockBackend.expectGET('views/login.html').respond('');
      
      scope.due = new Date('12/12/2018');
      scope.addTask(Object({
        administrator: 'Alice',
        assignee: 'Bode',
        task: 'Add a another task.'
      }));
      mockBackend.flush();

      expect(scope.data.administrator).toBeUndefined();
      expect(scope.data.assignee).toBeUndefined();
      expect(scope.data.task).toBeUndefined();
    });
  });
});