var app = angular.module('myApp', []);

app.controller('MainController',  
    ['$scope', '$rootScope', '$location', '$http', function ($scope, $anchorScroll) {
    $scope.username = "";
    $scope.restaurant_name = "";
    $scope.section_of_venue = "";
    $scope.floor = "";
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

    $scope.rest_min_number = 0;
    $scope.rest_max_number = 0;
    $scope.rest_part_min_number = 0;
    $scope.rest_part_max_number = 0;

    $scope.hh = false;
    $scope.pk = false;
    $scope.sycamore = false;

    $scope.part = false;
    $scope.restaurant_info =
    {
        "hh": {
            "id": "hh",
            "name": "Hokie House",
            "menu": {
                "appetizers": {
                    "name": "appetizers",
                    "items": [{
                        "name": "temp",
                        "price": "temp"
                    }, {
                        "name": "temp",
                        "price": "temp"
                    }, {
                        "name": "temp",
                        "price": "temp"
                    }]
                },
                "entrees": {
                    "name": "entrees",
                    "items": [{
                        "name": "",
                        "price": ""
                    }, {
                        "name": "temp",
                        "price": "temp"
                    }, {
                        "name": "temp",
                        "price": "temp"
                    }]
                },
                "desserts": {
                    "name": "desserts",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                },
                "drinks": {
                    "name": "drinks",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                }
            }
        },
        "pk": {
            "id": "pk",
            "name": "PK's",
            "menu": {
                "appetizers": {
                    "name": "appetizers",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                },
                "entrees": {
                    "name": "entrees",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                },
                "desserts": {
                    "name": "desserts",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                },
                "drinks": {
                    "name": "drinks",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                }
            }
        },
        "sycamore": {
            "id": "sycamore",
            "name": "Sycamore Deli",
            "menu": {
                "appetizers": {
                    "name": "appetizers",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                },
                "entrees": {
                    "name": "entrees",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                },
                "desserts": {
                    "name": "desserts",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                },
                "drinks": {
                    "name": "drinks",
                    "items": {
                        "name": "",
                        "price": ""
                    }
                }
            }
        }
    };

   

    $scope.section1 = function(rest_name) {
        restaurant_name = rest_name;
        $scope.section1Toggle = false;
        $scope.section2Toggle = true;

        if(restaurant_name == 'hh'){
            $scope.rest_min_number = 100;
            $scope.rest_max_number = 500;
            $scope.rest_part_min_number = 30;
            $scope.rest_part_max_number = 250;
        }
        else if(restaurant_name == 'sycamore'){
            $scope.rest_min_number = 50;
            $scope.rest_max_number = 150;
            $scope.rest_part_min_number = 10;
            $scope.rest_part_max_number = 20;
        }
        else if(restaurant_name == 'pk'){
            $scope.rest_min_number = 50;
            $scope.rest_max_number = 200;
            $scope.rest_part_min_number = 20;
            $scope.rest_part_max_number = 50;
        }
    };
    $scope.section2 = function(section) {
        section_of_venue = section;

        if(section_of_venue == 'part'){
            $scope.section2Toggle = false;
            $scope.section3Toggle = true;
            $scope.part = true;
        }
        else if (section_of_venue == 'all'){
            $scope.section2Toggle = false;
            $scope.section4Toggle = true;
            $scope.part = false;
        }
        else {
            $scope.section2Toggle = false;
            $scope.section5Toggle = true;
            $scope.part = false;
        }

    };

    $scope.section3 = function(part) {
        floor = part;
        $scope.section3Toggle = false;
        $scope.section4Toggle = true;
    };

    $scope.section4 = function(num_of_people, catering) {
        number_of_people = num_of_people;
        catering = catering
        $scope.restaurant_name_is(restaurant_name);
        console.log(number_of_people);
        console.log(section_of_venue);

        if(section_of_venue == 'all'){
            if(number_of_people >=  $scope.rest_min_number && 
                number_of_people <= $scope.rest_max_number){
                if(catering == "yes"){
                    $scope.section4Toggle = false;
                    $scope.section5Toggle = true;
                }
                else if (catering == "no"){
                    $scope.section4Toggle = false;
                    $scope.section6Toggle = true;
                }
                else{
                    alert('Please select catering.');
                }
            }
            else {
                alert('Please fix number of people to be inside min/max values.');
            }
        }
        else if(section_of_venue == 'part'){

            if(number_of_people >=  $scope.rest_part_min_number && 
                number_of_people <= $scope.rest_part_max_number){

                if(catering == "yes"){
                    $scope.section4Toggle = false;
                    $scope.section5Toggle = true;
                }
                else if(catering == "no"){
                    $scope.section4Toggle = false;
                    $scope.section6Toggle = true;
                }
                else {
                    alert('Please select catering.');
                }
            }
            else {
                alert('Please fix number of people to be inside min/max values.');
            }
        }
        
    };

    $scope.section5 = function(choices) {
        catering_options = choices;
        $scope.section5Toggle = false;
        $scope.section6Toggle = true;
    };

    $scope.back = function(sectionNumber) {
        //going back from "Choose your type of reservation" page
        if(sectionNumber == 2){
            $scope.restaurant_name = "";
            $scope.section1Toggle = true;
            $scope.section2Toggle = false;
        }
        //going back from "Which Part of Venue" page
        else if(sectionNumber == 3){
            $scope.section_of_venue = "";
            $scope.section2Toggle = true;
            $scope.section3Toggle = false;
        }
        //going back from "Choose your type of reservation" page
        else if(sectionNumber == 4){
            if(section_of_venue == 'part'){
                $scope.floor = "";
                $scope.section3Toggle = true;
                $scope.section4Toggle = false;
            }
            else if(section_of_venue == 'all'){
                $scope.section_of_venue = "";
                $scope.section2Toggle = true;
                $scope.section4Toggle = false;
            }
        }
        //going back from "how many people" & "catering" page
        else if(sectionNumber == 5){
            $scope.number_of_people = "";
            document.getElementById("num_ppl_box").value = ""
            $scope.catering = "";
            $scope.section4Toggle = true;
            $scope.section5Toggle = false;
        }
        //going back from "catering options page
        else if(sectionNumber == 6){
            if($scope.catering == 'yes'){
                $scope.catering_options = "";
                $scope.section5Toggle = true;
                $scope.section6Toggle = false;
            }
            else {
                $scope.number_of_people = "";
                document.getElementById("num_ppl_box").value = ""
                $scope.catering = "";
                $scope.section4Toggle = true;
                $scope.section6Toggle = false;
            }
        }
    };

    $scope.restaurant_name_is = function(restaurant_name){
        if(restaurant_name == 'hh'){
            $scope.hh = true;
            $scope.pk = false;
            $scope.sycamore = false;
        }
        else if(restaurant_name == 'pk'){
            $scope.pk = true;
            $scope.hh = false;
            $scope.sycamore = false;
        }
        else if(restaurant_name == 'sycamore'){
            $scope.sycamore = true;
            $scope.hh = false;
            $scope.pk = false;
        }
    }

    $scope.restaurant_data = function(reservation) {
        var data1 = {
            username: reservation.username,
            restaurant_name: reservation.restaurant_name,
            section_of_venue: reservation.section_of_venue,
            floor: reservation.floor,
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
}]);