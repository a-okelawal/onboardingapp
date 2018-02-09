describe('Task Service', function() {
  var mockBackend, taskService;

  beforeEach(module('TaskSrv'));

  beforeEach(inject(function(
    _$httpBackend_,
    _CookieService_,
    _TaskService_
  ) {
    taskService = _TaskService_;
    mockBackend = _$httpBackend_;
  }));

  it('should handle request to api to get tasks', function() {
    mockBackend.expectGET('http://localhost:3001/api/v1/tasks?query=task').respond(200, [
      Object({
        administrator: 'xxxx',
        assignee: 'xxxxx',
        creator: 'xxxxxxx',
        task: 'Add a task.',
        status: 'awaiting-start',
        due: new Date('12/12/2018')
      })
    ]);

    taskService.read(Object({
      query: 'task'
    })).then(function(tasks) {
      expect(tasks.length).toBe(1);
      expect(tasks.length).toBe(1);
    });
  });

  it('should handle request to api to create a task', function() {
    mockBackend.expectPOST('http://localhost:3001/api/v1/tasks', Object({
      administrator: 'Alice',
      assignee: 'Bode',
      creator: 'Femi',
      task: 'Add a another task.',
      status: 'awaiting-start',
      due: new Date('12/12/2018')
    })).respond(201, Object({
      message: 'Task created successfully.'
    }));

    taskService.create().then(function(response) {
      expect(response.message).toBe('Task created successfully.');
    });
  });
});