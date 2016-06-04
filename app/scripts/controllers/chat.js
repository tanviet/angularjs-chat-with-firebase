'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * @link https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html
 *       https://firebase.google.com/docs/database/web/start
 *       https://developer.mozilla.org/en-US/docs/Web/Events/unload
 * Controller of the chatApp
 */
angular.module('chatApp')
  .controller('ChatCtrl', function ($scope, $routeParams, $location, $firebaseArray) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Initialize variables
    var roomId = $routeParams.roomId;
    var fireBaseUrl = 'https://angularjs-chat-4b847.firebaseio.com/';
    var membersRef = new Firebase(fireBaseUrl + 'members/' + roomId);
    var messagesRef = new Firebase(fireBaseUrl + 'messages/' + roomId);
    var currentUser = null;

    $scope.chatMessage = {value: ''};
    $scope.username = '';
    $scope.readyToChat = false;
    $scope.currentLink = $location.absUrl();

    // Download the data from a Firebase reference into a (pseudo read-only) array
    // All server changes are applied in realtime
    $scope.members = $firebaseArray(membersRef);
    $scope.messages = $firebaseArray(messagesRef);

    // Create a new user
    $scope.createNewUser = function(username) {
      var memberLength = $scope.members.length;
      var i;

      $scope.username = username;

      // Check duplicate users in the room
      for (i = 0; i < memberLength; i++) {
        if ($scope.members[i].$value === username) {
          alert('This username has already existed in the room. Please choose another username.');
          return;
        }
      }

      // Add new user into the room
      $scope.members.$add(username).then(function(ref) {
        currentUser = ref;
        $scope.readyToChat = true;
      });
    };

    // Send chat messages
    $scope.addMessage = function(message) {
      $scope.messages.$add({
        from: $scope.username,
        content: message,
        timestamp: Firebase.ServerValue.TIMESTAMP
      });

      // Clear message
      $scope.chatMessage.value = '';
    };

    // Handle events when users leave room (by clicking on a link, submitting a form, closing the browser window, etc...)
    function leaveRoom() {
      if (currentUser) {
        $scope.members.$remove($scope.members.$indexFor(currentUser.key()));
      }
    }

    window.addEventListener('unload', leaveRoom);

    $scope.$on('$destroy', function() {
      window.removeEventListener('unload', leaveRoom);
      leaveRoom();
    });
  });
