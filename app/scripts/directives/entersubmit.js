'use strict';

/**
 * @ngdoc directive
 * @name chatApp.directive:enterSubmit
 * @description
 * # enterSubmit
 */
angular.module('chatApp')
  .directive('enterSubmit', function () {
    return function(scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.enterSubmit, {'event': event});
          });

          event.preventDefault();
        }
      });
    };
  });
