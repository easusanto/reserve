var app = angular.module('myApp', []);

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

    $scope.restaurants_information = [
    {
        "restaurant_name": "Hokie House",
        "short_name": "hh",
        "description": "A venerable bi-level spot for beers, burgers &amp; pub grub, as well as sports on TV, billiards &amp; darts.",
        "section_options": {
            "part": [{
                "type": "top",
                "max_people": 200,
                "min_people": 75
            }, {
                "type": "bottom",
                "max_people": 100,
                "min_people": 30
            }, {
                "type": "bottom-nobar",
                "max_people": 100,
                "min_people": 30
            }],
            "all": [{
                "max_people": 500,
                "min_people": 100
            }]
        },
        "menu": {
            "appetizers": [{
                "name": "chips",
                "price": 8
            }, {
                "name": "carrots",
                "price": 5
            }, {
                "name": "chicken bites",
                "price": 10
            }],
            "entrees": [{
                "name": "grilled chicken",
                "price": 15
            }, {
                "name": "steak",
                "price": 15
            }, {
                "name": "pizza",
                "price": 10
            }],
            "drinks": [{
                "name": "orange juice",
                "price": 5
            }, {
                "name": "sweet tea",
                "price": 5
            }, {
                "name": "milk",
                "price": 6
            }]
        }
    }
    ];

    $scope.section1 = function(rest_name) {
        restaurant_name = rest_name;
        $scope.section1Toggle = false;
        $scope.section2Toggle = true;
        console.log(restaurant_name);
    };
    $scope.section2 = function(section) {
        section_of_venue = section;

        if(section_of_venue == 'part'){
            $scope.section2Toggle = false;
            $scope.section3Toggle = true;
        }
        else if (section_of_venue == 'all'){
            $scope.section2Toggle = false;
            $scope.section4Toggle = true;
        }
        else {
            $scope.section2Toggle = false;
            $scope.section5Toggle = true;
        }

    };
    $scope.section3 = function(num_of_people) {
        number_of_people = num_of_people;
        $scope.section3Toggle = false;
        $scope.section4Toggle = true;
    };
    $scope.section4 = function(choices) {
        section_of_venue = section;

        if(section_of_venue == 'part'){
            $scope.section2Toggle = false;
            $scope.section3Toggle = true;
        }
        else if (section_of_venue == 'all'){
            $scope.section2Toggle = false;
            $scope.section4Toggle = true;
        }
        else {
            $scope.section2Toggle = false;
            $scope.section5Toggle = true;
        }

    };

    $scope.back = function(sectionNumber) {
        if(sectionNumber == 2){
            $scope.section1Toggle = true;
            $scope.section2Toggle = false;
        }
        else if(sectionNumber == 3){
            $scope.section2Toggle = true;
            $scope.section3Toggle = false;
        }
        else if(sectionNumber == 4){
            $scope.section3Toggle = true;
            $scope.section4Toggle = false;
        }
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