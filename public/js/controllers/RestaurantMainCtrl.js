var app = angular.module('myApp');

app.controller('RestaurantMainController',
    ['$scope', '$rootScope', '$location', '$http', 'sharedProperties',
    function ($scope, $rootScope, $location, $http, sharedProperties) {

        // $scope.getRequests = function () {
        //     var data1 = {
        //         restaurant_name: sharedProperties.getProperty(),
        //     };

        //     $http({
        //         url: '/get_restaurant_reservations',
        //         method: "POST",
        //         data: JSON.stringify(data1),
        //         headers: {'Content-Type': 'application/json'}
        //     }).success(function (data, status, headers, config) {
        //         $scope.reservations = reformatReservationData(data);
        //         console.log($scope.reservations);
        //     }).error(function (data, status, headers, config) {
        //         console.log("error");
        //     });
        // };

        $scope.getProperty = function(){
            console.log(sharedProperties.getRestaurantName());
        }

        $scope.click = function(){
            console.log("clicked!");
        }

    }]);
