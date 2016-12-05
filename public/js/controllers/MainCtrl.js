var app = angular.module('myApp');

app.controller('MainController',
    ['$scope', '$rootScope', '$anchorScroll', '$location', '$http', '$timeout', '$compile', 'uiCalendarConfig', '$window', 'appService',
    function ($scope, $rootScope, $anchorScroll, $location, $http, $timeout, $compile, uiCalendarConfig, $window, appService) {
    $scope.username = $rootScope.username;
    console.log($scope.username);
    $scope.restaurant_name = "";
    $scope.restaurant_fullName = "";
    $scope.restaurant_location = "";
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
    $scope.section6Toggle = false;
    $scope.section7Toggle = false;


    $scope.rest_min_number = 0;
    $scope.rest_max_number = 0;
    $scope.rest_part_min_number = 0;
    $scope.rest_part_max_number = 0;

    $scope.hh = false;
    $scope.pk = false;
    $scope.sycamore = false;

    $scope.part = false;

    $scope.available_hours = [];

    $scope.restaurant_info ={
        "hh": {
            "id": "hh",
            "name": "Hokie House",
            "menu": {
                "appetizers": {
                    "name": "appetizers",
                    "items": [{
                        "name": "Wings",
                        "price": "7.50"
                    }, {
                        "name": "Bacon Cheese Fries",
                        "price": "6.50"
                    }, {
                        "name": "Nachos",
                        "price": "6.00"
                    }]
                },
                "entrees": {
                    "name": "entrees",
                    "items": [{
                        "name": "Hokie Club",
                        "price": "7.95"
                    }, {
                        "name": "Hokie Burger",
                        "price": "7.50"
                    }, {
                        "name": "House Salad",
                        "price": "6.50"
                    }]
                },
                "desserts": {
                    "name": "desserts",
                    "items": {
                        "name": "Ice Cream",
                        "price": "3.50"
                    }
                },
                "drinks": {
                    "name": "drinks",
                    "items": [{
                        "name": "Pepsi",
                        "price": "1.79"
                    }, {
                        "name": "Water",
                        "price": "0.50"
                    }, {
                        "name": "Ice Tea",
                        "price": "1.79"
                    }]
                }
            }
        },
        "pk": {
            "id": "pk",
            "name": "PK's",
            "menu": {
                "appetizers": {
                    "name": "appetizers",
                    "items": [{
                        "name": "Wings",
                        "price": "8.99"
                    }, {
                        "name": "Loaded Cheese Fries",
                        "price": "8.99"
                    }, {
                        "name": "Nachos Grande",
                        "price": "7.99"
                    }]
                },
                "entrees": {
                    "name": "entrees",
                    "items": [{
                        "name": "Philly Cheesesteak",
                        "price": "7.99"
                    }, {
                        "name": "Chicken Breast",
                        "price": "8.99"
                    }, {
                        "name": "Pasta Alfredo",
                        "price": "8.59"
                    }]
                },
                "desserts": {
                    "name": "desserts",
                    "items": {
                        "name": "Brownie Sundae",
                        "price": "3.99"
                    }
                },
                "drinks": {
                    "name": "drinks",
                    "items": [{
                        "name": "b",
                        "price": "1.80"
                    }, {
                        "name": "b",
                        "price": "0.50"
                    }, {
                        "name": "b Tea",
                        "price": "1.80"
                    }]
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
                        "name": "Peewee",
                        "price": "4.25"
                    }
                },
                "entrees": {
                    "name": "entrees",
                    "items": [{
                        "name": "Burger",
                        "price": "7.75"
                    }, {
                        "name": "Hotdog",
                        "price": "4.49"
                    }, {
                        "name": "Sub",
                        "price": "7.49"
                    }]
                },
                "desserts": {
                    "name": "desserts",
                    "items": {
                        "name": "Ice Cream Sandwich",
                        "price": "2.50"
                    }
                },
                "drinks": {
                    "name": "drinks",
                    "items": [{
                        "name": "a",
                        "price": "1.75"
                    }, {
                        "name": "a",
                        "price": "0.25"
                    }, {
                        "name": "a Tea",
                        "price": "1.65"
                    }]
                }
            }
        }
 };

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
    };

    function parseDate(date){
      var d = new Date(date);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      return (curr_month + "/" + curr_date + "/" + curr_year);
    }

    function parseTime(time){
      var hour = time.toTimeString().substring(0,2);
      var minute = time.toTimeString().substring(3, 5);
      console.log(hour, minute);
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

    $scope.section1 = function(rest_name) {
        $scope.restaurant_name = rest_name;
        $scope.section1Toggle = false;
        $scope.section2Toggle = true;
        getRestaurantFullNameAndLocation($scope.restaurant_name);

        if($scope.restaurant_name == 'hh'){
            $scope.rest_min_number = 100;
            $scope.rest_max_number = 500;
            $scope.rest_part_min_number = 30;
            $scope.rest_part_max_number = 250;
        }
        else if($scope.restaurant_name == 'sycamore'){
            $scope.rest_min_number = 50;
            $scope.rest_max_number = 150;
            $scope.rest_part_min_number = 10;
            $scope.rest_part_max_number = 20;
        }
        else if($scope.restaurant_name == 'pk'){
            $scope.rest_min_number = 50;
            $scope.rest_max_number = 200;
            $scope.rest_part_min_number = 20;
            $scope.rest_part_max_number = 50;
        }
    };
    $scope.section2 = function(section) {
        $scope.section_of_venue = section;
        if($scope.section_of_venue == 'part'){
            $scope.section2Toggle = false;
            $scope.section3Toggle = true;
            $scope.part = true;
        }
        else if ($scope.section_of_venue == 'all'){
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
        $scope.floor = part;
        $scope.section3Toggle = false;
        $scope.section4Toggle = true;
    };
    $scope.section4 = function(num_of_people, catering) {
        $scope.number_of_people = num_of_people;
        $scope.catering = catering
        $scope.restaurant_name_is($scope.restaurant_name);

        if($scope.section_of_venue == 'all'){
            if($scope.number_of_people >=  $scope.rest_min_number &&
                $scope.number_of_people <= $scope.rest_max_number){
                if($scope.catering == "yes"){
                    $scope.section4Toggle = false;
                    $scope.section5Toggle = true;
                }
                else if ($scope.catering == "no"){
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
        else if($scope.section_of_venue == 'part'){

            if($scope.number_of_people >=  $scope.rest_part_min_number &&
                $scope.number_of_people <= $scope.rest_part_max_number){

                if($scope.catering == "yes"){
                    $scope.section4Toggle = false;
                    $scope.section5Toggle = true;
                }
                else if($scope.catering == "no"){
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
        $scope.catering_options = choices;
        $scope.section5Toggle = false;
        $scope.section6Toggle = true;
    };

    $scope.section6 = function(startTime, endTime) {
        $scope.start_time = parseTime(startTime);
        $scope.end_time = parseTime(endTime);
        console.log($scope.start_time);
        $scope.section6Toggle = false;
        $scope.section7Toggle = true;

        $scope.loadData();
    };
    $scope.section7 = function() {
        $window.location.href = '/user_my_reservations.html';
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
            if($scope.section_of_venue == 'part'){
                $scope.floor = "";
                $scope.section3Toggle = true;
                $scope.section4Toggle = false;
            }
            else if($scope.section_of_venue == 'all'){
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
        else if(sectionNumber == 7) {
          $scope.section6Toggle = true;
          $scope.section7Toggle = false;
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
    };
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
    };

    //----------------------------------------CALENDAR SECTION-----------------------------------------------
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var calendarEventsToShow = [];
    var thisDate = null;

    $scope.loadData = function() {
      var events = {
        restaurant_name:  "hh",
      };

      $http({
        url: "/get_restaurant_reservations",
        method: "POST",
        data: JSON.stringify(events),
        headers: {'Content-Type': 'application/json'}
      }).success(function (data, status, headers, config) {
          if(data[0]){
              for (var i = 0; i < data.length; i++) {
                var startDate = data[i].date.substring(0,11)+data[i].start_time;
                var endDate = data[i].date.substring(0,11)+data[i].end_time;
                var calendarEvent = {
                  title: data[i].username,
                  start: startDate,
                  end: endDate,
                  stick: true
                }
                calendarEventsToShow[i] = (calendarEvent);
              }
          }
          else{
              alert("error.");
              console.log(data.message);
          }
      }).error(function (data, status, headers, config) {
          console.log("error: ", data);
      });
    };

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };

    //----------------------------------
    // event source that contains custom events on the scope
    //----------------------------------
    $scope.events = calendarEventsToShow;
    //   {title: 'All Day Event',start: new Date(y, m, 1)},
    //   {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    //   {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    //   {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    //   {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    //   {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    // ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalendar = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender,
        dayClick: function( date, jsEvent, view ) {
          $scope.date = parseDate(date);
          console.log($scope.date);
          // change the day's background color to show selection
          if(thisDate !== null) {
            thisDate.css('background-color', '#f5f5f5');
          }
          $(this).css('background-color', 'green');
          thisDate = $(this);
        }

      }
    };


    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}]);
