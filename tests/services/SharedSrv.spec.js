describe('Shared Service', function() {
  var invalidVariables ,validVariables;
  var sharedService;
  
  beforeEach(module('SharedSrv'));

  beforeEach(inject(function(
    _SharedService_
  ) {
    sharedService = _SharedService_;

    invalidVariables = [
      '',
      Object({}),
      [],
      null,
      undefined
    ];

    validVariables = [
      'A',
      Object({
        test: 'some'
      }),
      [3, 4],
      4,
      new Date()
    ];
  }))

  it('should return false for empty, undefined or null variables', function() {
    invalidVariables.forEach(element => {
      expect(sharedService.isDefined(element)).toBe(false);
    });
  });

  it('should return true for defined variables', function() {
    validVariables.forEach(element => {
      expect(sharedService.isDefined(element)).toBe(true);
    });
  });
});