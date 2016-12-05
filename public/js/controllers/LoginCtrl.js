var app = angular.module('myApp');

app.controller('LoginController',
    ['$scope', '$rootScope', '$location', '$http', '$window', 'appService', 'sharedProperties',
    function ($scope, $rootScope, $location, $http, $window, appService, sharedProperties) {
         $scope.login = function (user) {
           console.log("LOGGIN IN ");
            var data1 = {
                username: user.username,
                password: user.password
            };

            $http({
                url: '/login',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                if(status === 200){
                    console.log(data);
                    sharedProperties.setUserName(data.username);
                    sharedProperties.setTypeOfAccount(data.account_type);
                    if(data.account_type == 'student'){
                        changeLocation('/user_reserve_restaurant.html', true);
                    }
                    else if(data.account_type == 'restaurant'){
                        changeLocation('/restaurant_side_home.html', true);
                    }
                }  
                else{
                    alert("Incorrect username/password.");
                    console.log(data.message);
                }
            }).error(function (data, status, headers, config) {
                console.log("error");
            });
        };

        $scope.signup_restaurant = function(user) {
          if (user.password === user.password2) {
            console.log("WE MATCH");

            var data1 = {
                username: user.username,
                password: user.password,
                account_type: "restaurant"
            };

            $http({
                url: '/register',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                $scope.user = data.user; // assign  $scope.persons here as promise is resolved here
                console.log("sign up successful.");
                $window.location.reload();
                alert ("Congrats On Signing Up. You Can Now Sign On Using Your Restaurant Account.");
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
          } else {
            alert("Your password does not match");
          }
        };

        $scope.signup_student = function(user) {
          if (user.password === user.password2) {
            var data1 = {
                username: user.username,
                password: user.password,
                account_type: "student"
            };

            $http({
                url: '/register',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                $scope.user = data.user; // assign  $scope.persons here as promise is resolved here
                $window.location.reload();
                alert ("Congrats On Signing Up. You Can Now Sign On Using Your Student Account.");
                console.log("sign up successful.");
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
          } else {
            alert ("Your Password Does Not Match.");
          }
        };

        var changeLocation = function(url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if(forceReload || $scope.$$phase) {
            window.location = url;
            }
            else {
            //only use this if you want to replace the history stack
            //$location.path(url).replace();

            //this this if you want to change the URL and add it to the history stack
            $location.path(url);
            $scope.$apply();
            }
        };
    }]);
