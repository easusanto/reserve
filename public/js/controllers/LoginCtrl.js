var app = angular.module('myApp', []);


app.controller('LoginController',
    ['$scope', '$rootScope', '$location', '$http',
    function ($scope, $rootScope, $location, $http) {
         $scope.login = function (user) {
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
                if(data.message==="success"){
                    changeLocation('/user_reserve_restaurant.html', true);
                    $rootScope.username = user.username;
                    console.log(data.message);
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
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
        };

        $scope.signup_student = function(user) {

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
                console.log("sign up successful.");
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
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