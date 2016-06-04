'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatApp
 */
angular.module('chatApp')
  .controller('MainCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Create new chat room
    $scope.createRoom = function() {
      var roomId = Math.random().toString(36).substring(7);
      $location.url('/chat/' + roomId);
    };
  });
