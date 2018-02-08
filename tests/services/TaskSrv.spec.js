describe('Task Service', function() {
  var mockBackend, taskService;

  beforeEach(module('TaskSrv'));

  beforeEach(inject(function(
    _$httpBackend_,
    _TaskService_
  ) {
    taskService = _TaskService_;
    mockBackend = _$httpBackend_;
  }));

  it('should handle request to api to get tasks', function() {
    mockBackend.expectGET('http://localhost:3001/api/v1/tasks').respond(200, [
      Object({
        administrator: 'xxxx',
        assignee: 'xxxxx',
        creator: 'xxxxxxx',
        task: 'Add a task.',
        status: 'awaiting-start',
        due: new Date('12/12/2018')
      })
    ]);

    taskService.read().then(function(tasks) {
      expect(tasks.length).toBe(1);
      expect(tasks.length).toBe(1);
    });
  });
});