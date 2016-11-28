var app = angular.module('myApp', []);

//'ngMaterial', 'ngMessages', 'material.svgAssetsCache'

app.controller('MainController', function ($scope) {
    // $scope.currentUser = null;
    // $scope.userRoles = USER_ROLES;
    // $scope.isAuthorized = AuthService.isAuthorized;
   
    // $scope.setCurrentUser = function (user) {
    //   $scope.currentUser = user;
    // };

    var part = [true, false, false, false];
    $scope.next = function(section_num) {
      part[section_num] = true;
      part[section_num-1] = false;


    }

    $scope.clicked = function() {
      console.log("clicked!");
    }

    $scope.login = function(credentials) {
      return $http
        .post('/login', credentials)
        .then(function (res) {
          
          return ;
        });
    }
});