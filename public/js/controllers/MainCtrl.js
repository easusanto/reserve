var app = angular.module('myApp');

app.controller('MainController',
    ['$scope', '$rootScope', '$anchorScroll', '$location', '$http', '$timeout', '$compile', 'uiCalendarConfig', '$window', 'sharedProperties',
    function ($scope, $rootScope, $anchorScroll, $location, $http, $timeout, $compile, uiCalendarConfig, $window, sharedProperties) {
    $scope.username = "VSA";

    $scope.restaurant_name = "";
    $scope.restaurant_fullName = "";
    $scope.restaurant_location = "";
    $scope.section_of_venue = "";
    $scope.floor = "";
    $scope.catering = "";
    $scope.catering_options = "Yes";
    $scope.date = "";
    $scope.start_time = "";
    $scope.end_time = "";
    $scope.number_of_people = "";
    $scope.requests = "";
    $scope.totalPrice = 0;
    $scope.confNum;

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

    $scope.restaurant_info = {
	"hh": {
		"id": "hh",
		"name": "Hokie House",
		"menu": {
			"appetizers": {
				"name": "appetizers",
				"items": [{
					"name": "Wings",
					"price": 7.50,
					"scale": 0
				}, {
					"name": "Bacon Cheese Fries",
					"price": 6.50,
					"scale": 0
				}, {
					"name": "Chicken Tenders",
					"price": 7.00,
					"scale": 0
				}, {
					"name": "Mozzarella Sticks",
					"price": 5.50,
					"scale": 0
				}, {
					"name": "Nachos",
					"price": 6.00,
					"scale": 0
				}]
			},
			"entrees": {
				"name": "entrees",
				"items": [{
					"name": "Hokie Club",
					"price": 7.95,
					"scale": 0
				}, {
					"name": "Club Wrap",
					"price": 7.50,
					"scale": 0
				}, {
					"name": "Philly Cheese Steak",
					"price": 7.95,
					"scale": 0
				}, {
					"name": "Hokie Burger",
					"price": 7.50,
					"scale": 0
				}, {
					"name": "House Salad",
					"price": 6.50,
					"scale": 0
				}]
			},
			"desserts": {
				"name": "desserts",
				"items": [{
					"name": "Ice Cream",
					"price": 3.50,
					"scale": 0
				}]
			},
			"drinks": {
				"name": "drinks",
				"items": [{
					"name": "Pepsi",
					"price": 1.79,
					"scale": 0
				}, {
					"name": "Diet Pepsi",
					"price": 1.79,
					"scale": 0
				}, {
					"name": "Lemonade",
					"price": 1.69,
					"scale": 0
				}, {
					"name": "Water",
					"price": 0.50,
					"scale": 0
				}, {
					"name": "Ice Tea",
					"price": 1.79,
					"scale": 0
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
					"price": 8.99,
					"scale": 0
				}, {
					"name": "Chicken Tenders",
					"price": 8.49,
					"scale": 0
				}, {
					"name": "Grilled Quesadilla",
					"price": 6.99,
					"scale": 0
				}, {
					"name": "Loaded Cheese Fries",
					"price": 8.99,
					"scale": 0
				}, {
					"name": "Nachos Grande",
					"price": 7.99,
					"scale": 0
				}]
			},
			"entrees": {
				"name": "entrees",
				"items": [{
					"name": "Philly Cheesesteak",
					"price": 7.99,
					"scale": 0
				}, {
					"name": "Chef Salad",
					"price": 8.59,
					"scale": 0
				}, {
					"name": "Fried Shrimp",
					"price": 12.99,
					"scale": 0
				}, {
					"name": "Chicken Breast",
					"price": 8.99,
					"scale": 0
				}, {
					"name": "Pasta Alfredo",
					"price": 8.59,
					"scale": 0
				}]
			},
			"desserts": {
				"name": "desserts",
				"items": [{
					"name": "Brownie Sundae",
					"price": 3.99,
					"scale": 0
				}]
			},
			"drinks": {
				"name": "drinks",
				"items": [{
					"name": "Pepsi",
					"price": 1.80,
					"scale": 0
				}, {
					"name": "Diet Pepsi",
					"price": 1.80,
					"scale": 0
				}, {
					"name": "Lemonade",
					"price": 1.70,
					"scale": 0
				}, {
					"name": "Water",
					"price": 0.50,
					"scale": 0
				}, {
					"name": "Ice Tea",
					"price": 1.80,
					"scale": 0
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
				"items": [{
					"name": "Peewee",
					"price": 4.25,
					"scale": 0
				}, {
					"name": "Wraps",
					"price": 5.59,
					"scale": 0
				}, {
					"name": "Fries",
					"price": 3.49,
					"scale": 0
				}, {
					"name": "Chips",
					"price": 3.29,
					"scale": 0
				}]
			},
			"entrees": {
				"name": "entrees",
				"items": [{
					"name": "Burger",
					"price": 7.75,
					"scale": 0
				}, {
					"name": "Wrap",
					"price": 5.59,
					"scale": 0
				}, {
					"name": "Sandwichs",
					"price": 7.75,
					"scale": 0
				}, {
					"name": "Hotdog",
					"price": 4.49,
					"scale": 0
				}, {
					"name": "Sub",
					"price": 7.49,
					"scale": 0
				}]
			},
			"desserts": {
				"name": "desserts",
				"items": [{
					"name": "Ice Cream Sandwich",
					"price": 2.50,
					"scale": 0
				}]
			},
			"drinks": {
				"name": "drinks",
				"items": [{
					"name": "Pepsi",
					"price": 1.75,
					"scale": 0
				}, {
					"name": "Diet Pepsi",
					"price": 1.75,
					"scale": 0
				}, {
					"name": "Lemonade",
					"price": 1.65,
					"scale": 0
				}, {
					"name": "Water",
					"price": 0.25,
					"scale": 0
				}, {
					"name": "Ice Tea",
					"price": 1.65,
					"scale": 0
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

        //Create menus for restaurant
        var restName = $scope.restaurant_name
        $scope.menu_appetizers = ($scope.restaurant_info[restName].menu.appetizers.items);
        $scope.menu_entrees = ($scope.restaurant_info[restName].menu.entrees.items);
        $scope.menu_desserts = ($scope.restaurant_info[restName].menu.desserts.items);
        $scope.menu_drinks = ($scope.restaurant_info[restName].menu.drinks.items);
    };
    $scope.section2 = function(section) {
        $scope.section_of_venue = section;
        if($scope.section_of_venue == 'part'){
            $scope.section2Toggle = false;
            $scope.section3Toggle = true;
            $scope.part = true;
            $scope.totalPrice += 99;
        }
        else if ($scope.section_of_venue == 'all'){
            $scope.section2Toggle = false;
            $scope.section4Toggle = true;
            $scope.part = false;
            $scope.totalPrice += 299;
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
                    $scope.catering_options = "None";
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
                    $scope.catering_options = "None";
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
        $scope.section5Toggle = false;
        $scope.section6Toggle = true;
        $scope.totalPrice += calculatePrices();
    };

    var calculatePrices = function() {
        var totalPrice = 0;
        for (item in $scope.menu_appetizers) {
            totalPrice += ($scope.menu_appetizers[item].scale * $scope.menu_appetizers[item].price);
        }
        for (item in $scope.menu_entrees) {
            totalPrice += ($scope.menu_appetizers[item].scale * $scope.menu_appetizers[item].price);
        }
        for (item in $scope.menu_desserts) {
            totalPrice += ($scope.menu_appetizers[item].scale * $scope.menu_appetizers[item].price);
        }
        for (item in $scope.menu_drinks) {
            totalPrice += ($scope.menu_appetizers[item].scale * $scope.menu_appetizers[item].price);
        }
        return totalPrice;
    };

    $scope.section6 = function(startTime, endTime) {
      //Dates to be sent to the Backend
        $scope.start_time = startTime.getHours().toString() + ":"  + (startTime.getMinutes() > 10 ? startTime.getMinutes().toString() : "0"+startTime.getMinutes().toString()) + ":00";
        $scope.end_time = endTime.getHours().toString() + ":"  + (endTime.getMinutes() > 10 ? endTime.getMinutes().toString() : "0"+endTime.getMinutes().toString())+ ":00";
      //Dates for UI
        $scope.reservation_time = parseTime(startTime) + " - " + parseTime(endTime);
        $scope.section6Toggle = false;
        $scope.section7Toggle = true;

        $scope.loadData();
        $scope.confNum = $scope.getConfNum()
        console.log("CONFIRMATION NUMBER: ", $scope.confNum);
    };
    $scope.section7 = function() {

      var reservationData = {
          username: $scope.username? $scope.username : "VSA",
          restaurant_name: $scope.restaurant_name,
          section_of_venue: $scope.section_of_venue,
          floor: $scope.floor,
          catering: $scope.catering,
          catering_options: $scope.catering_options ? $scope.catering_options : "N/A",
          date: $scope.date,
          start_time: $scope.start_time,
          end_time: $scope.end_time,
          number_of_people: $scope.number_of_people,
          requests: $scope.requests,
          price : $scope.price,
          confNum: $scope.ConfNum,
          approval: false
      };
      console.log(reservationData);
      $scope.send_reservation(reservationData);
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
       //going back from "how many people" & "catering" page
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
       //going back from "catering options" page
       else if(sectionNumber == 5){
           if($scope.section_of_venue == "catering"){
               $scope.catering = "";
               $scope.section2Toggle = true;
               $scope.section5Toggle = false;
           }
           else{
                $scope.number_of_people = "";
               document.getElementById("num_ppl_box").value = ""
               $scope.catering = "";
               $scope.section4Toggle = true;
               $scope.section5Toggle = false;
           }

       }
       //going back from "calendar" page
       else if(sectionNumber == 6){
               if($scope.catering == 'yes' || $scope.section_of_venue == 'catering'){
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
    $scope.send_reservation = function(reservation) {
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
            requests: reservation.requests,
            confNum: reservation.confNum,
            approval: reservation.approval
        };

         $http({
                url: '/send_user_reservations',
                method: "POST",
                data: JSON.stringify(data1),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                console.log("Reservation Sent");

                //MOVE TO NEXT PAGE
                $window.location.href = '/user_my_reservations.html';
            }).error(function (data, status, headers, config) {
                console.log("WE SEEM TO HAVE AN ERROR");
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
        restaurant_name:  $scope.restaurant_name,
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
            //NOTHING IS IN DATABASE
              console.log(data.message);
          }
      }).error(function (data, status, headers, config) {
          console.log("error: ", data);
      });
    };

    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };

    //----------------------------------
    // event source that contains custom events on the scope
    //----------------------------------
    $scope.events = calendarEventsToShow;

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
          // change the day's background color to show selection
          if(thisDate !== null) {
            thisDate.css('background-color', '#f5f5f5');
          }
          $(this).css('background-color', 'green');
          thisDate = $(this);
        }

      }
    };

    $scope.getConfNum = function(){
        var temp = Math.floor(Math.random() * (1000000000 - 1000000 + 1)) + 1000000;
        return temp;
    }


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
