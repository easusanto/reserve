var app = angular.module('myApp', []);

//'ngMaterial', 'ngMessages', 'material.svgAssetsCache'

app.controller('MainController', function ($scope) {
    $scope.username = "";
    $scope.restaurant_name = "";
    $scope.section_of_venue = "";
    $scope.catering = "";
    $scope.catering_options = "";
    $scope.date = "";
    $scope.start_time = "";
    $scope.end_time = "";
    $scope.number_of_people = "";
    $scope.requests = "";

    $scope.section1Toggle = true;
    $scope.section2Toggle = false;
    $scope.section3Toggle = false;
    $scope.section4Toggle = false;
    $scope.section5Toggle = false;


    $scope.section1 = function(rest_name) {
        restaurant_name = rest_name;
        $scope.section1Toggle = false;
        $scope.section2Toggle = true;
        console.log(restaurant_name);
    };
    $scope.section2 = function(section) {
        section_of_venue = section;
        $scope.section2Toggle = false;
        $scope.section3Toggle = true;
        console.log(section);
    };
    $scope.back = function(current, previous) {
        //current = false;
        console.log(current);
        console.log(previous);
        //previous = true;
    };
    $scope.restaurant_data = function(reservation) {
        var data1 = {
            username: reservation.username,
            restaurant_name: reservation.restaurant_name,
            section_of_venue: reservation.section_of_venue,
            catering: reservation.catering,
            catering_options: reservation.catering_options,
            date: reservation.date,
            start_time: reservation.start_time,
            end_time: reservation.end_time,
            number_of_people: reservation.number_of_people,
            requests: reservation.requests
        };

         $http({
                url: '/send_user_reservations',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                $scope.user = data.user; // assign  $scope.persons here as promise is resolved here 
                console.log("sign up successful.");
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
    }
});