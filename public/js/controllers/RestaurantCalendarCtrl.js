var app = angular.module('myApp');

app.controller('RestaurantCalendarController',
    ['$scope', '$rootScope', '$anchorScroll', '$location', '$http', '$timeout', '$compile', 'uiCalendarConfig', '$window', 'sharedProperties',
    function ($scope, $rootScope, $anchorScroll, $location, $http, $timeout, $compile, uiCalendarConfig, $window, sharedProperties) {
    $scope.restaurant_name = "hh";

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
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

    var init = function() {
        $scope.loadData();
    };
    init();
}]);
