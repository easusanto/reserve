var app = angular.module('myApp');

app.controller('RestaurantMainController',
    ['$scope', '$rootScope', '$location', '$http', '$window','sharedProperties',
    function ($scope, $rootScope, $location, $http, $window, sharedProperties) {
        $scope.section1Toggle = true;
        $scope.section2Toggle = false;

        $scope.single_reservation = "";
        $scope.reservations = "";

        $scope.get_restaurant_reservations = function (restaurant) {
            var data1 = {
                restaurant_name: restaurant,
            };

            $http({
                url: '/get_restaurant_reservations',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                console.log(data);
                $scope.reservations = reformatReservationData(data);
            }).error(function (data, status, headers, config) {
                console.log("error");
            });
        };

        // $scope.getConfNum = function(){
        //     var temp = Math.floor(Math.random() * (1000000000 - 1000000 + 1)) + 1000000;
        //     console.log(temp);
        // }

        $scope.approve = function (restaurant) {
            console.log(restaurant);

            console.log(restaurant.confNum);
            var data1 = 
            {
                "confNum": restaurant.confNum
            }

            $http({
                url: '/approve_restaurant_reservation',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                console.log(data);
                $scope.single_reservation = reformatReservationData(data);
                $window.location.reload()
            }).error(function (data, status, headers, config) {
                console.log("error");
            });
        };

        $scope.cancel_approve = function (restaurant) {
            var data1 = 
            {
                "confNum": restaurant.confNum
            };

            $http({
                url: '/cancel_approve_restaurant_reservation',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                console.log(data.approval);
                $scope.single_reservation = reformatReservationData(data);
                $window.location.reload()
            }).error(function (data, status, headers, config) {
                console.log("error");
            });
        };

        function reformatReservationData(data){
            var allReservations = [];
            for(var i = 0; i < data.length; i++){
                var reservation = {
                    confNum: data[i].confNum,
                    name: data[i].username,
                    description: data[i].requests,
                    date: parseDate(data[i].date),
                    start_time: parseTime(data[i].start_time),
                    end_time: parseTime(data[i].end_time),
                    numPeople: data[i].number_of_people,
                    catering: data[i].catering,
                    catering_options: data[i].catering_options,
                    price: data[i].price,
                    section_of_venue: data[i].section_of_venue,
                    floor: data[i].floor,
                    approval: data[i].approval
                }
                allReservations[i] = reservation;
            }
            return allReservations;
        }

        function parseTime(time){
            var hour = time.substring(0,2);
            var minute = time.substring(3, 5);
            var subscript = "";
            if(hour > 12){
                subscript = "pm";
                hour = Number(hour) - 12;
                hour = hour.toString();
            }
            else {
                subscript = "am";
            }
            return hour + ":" + minute + " " + subscript;
        }

        function parseDate(date){
            var d = new Date(date);
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            return (curr_month + "/" + curr_date + "/" + curr_year);
        }

        $scope.viewSingle = function(item){
            $scope.section1Toggle = false;
            $scope.section2Toggle = true;
            $scope.single_reservation = item;
            console.log($scope.single_reservation.name);
        }

        $scope.back = function(){
            $scope.section2Toggle = false;
            $scope.section1Toggle = true;
        }

        var init = function() {
            $scope.get_restaurant_reservations('hh');
        }
        init();
    }]);
