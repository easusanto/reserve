var app = angular.module('myApp');

app.controller('UserReservationsController',
    ['$scope', '$rootScope', '$location', '$http',
    function ($scope, $rootScope, $location, $http) {

        $scope.getReservations = function () {
            var data1 = {
                username: 'vsa',
            };

            $http({
                url: '/get_user_reservations',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                $scope.reservations = reformatReservationData(data);
                console.log($scope.reservations);
            }).error(function (data, status, headers, config) {
                console.log("error");
            });
        };

        function reformatReservationData(data){
            var allReservations = [];
            for(var i = 0; i < data.length; i++){
                var reservation = {
                    name: getRestaurantFullName(data[i].restaurant_name),
                    description: data[i].requests,
                    date: parseDate(data[i].date),
                    start_time: parseTime(data[i].start_time),
                    end_time: parseTime(data[i].end_time),
                    numPeople: data[i].number_of_people,
                    catering: data[i].catering,
                    price: data[i].price
                }
                allReservations[i] = reservation;
            }
            return allReservations;
        }

        function getRestaurantFullName(restaurantShortName) {
            var fullName;
            switch(restaurantShortName) {
                case "hh":
                  fullName = "Hokie House";
                  break;
                case "sycamore":
                  fullName = "Sycamore Deli";
                  break;
                case "pk":
                  fullName = "PK's Bar & Grill";
                  break;
                default:
                  fullName = "pop";
            }
            return fullName;
        };

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
    }]);
