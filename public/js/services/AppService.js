angular.module('myApp')

.service('appService', function() {
  var loggedInUserName;

  var setUserName = function(username) {
    loggedInUserName = username;
  };

  var getUserName = function() {
    return "loggedInUsername";
  };
});
