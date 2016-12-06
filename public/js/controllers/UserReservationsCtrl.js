var app = angular.module('myApp');

app.controller('UserReservationsController',
    ['$scope', '$rootScope', '$location', '$http',
    function ($scope, $rootScope, $location, $http) {

        $scope.section1Toggle = true;
        $scope.section2Toggle = false;

        $scope.getReservations = function () {
            var data1 = {
                username: 'VSA',
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
                    confNum: data[i].confNum,
                    name: getRestaurantFullNameAndLocation(data[i].restaurant_name)[0],
                    location: getRestaurantFullNameAndLocation(data[i].restaurant_name)[1],
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


        function getRestaurantFullNameAndLocation(restaurantShortName) {
          var fullName;
          var address;
          switch(restaurantShortName) {
            case "hh":
              fullName = "Hokie House";
              address = "322 N Main St, Blacksburg VA 24060";
              break;
            case "sycamore":
              fullName = "Sycamore Deli";
              address = "211 Draper Rd, Blacksburg VA 24060";
              break;
            case "pk":
              fullName = "PK's Bar & Grill";
              address = "432 N Main St, Blacksburg VA 24060";
              break;
            default:
              fullName = "";
              address = ""
          }
          $scope.restaurant_fullName = fullName;
          $scope.restaurant_location = address;
          return [fullName, address];
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
          $scope.getReservations();
        }
        init();
    }]);
