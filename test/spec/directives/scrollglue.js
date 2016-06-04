'use strict';

describe('Directive: scrollGlue', function () {

  // load the directive's module
  beforeEach(module('chatApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scroll-glue></scroll-glue>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
