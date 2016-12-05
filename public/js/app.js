'use strict';

angular.module('myApp', ['ngRoute', 'ui.calendar'])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'LoginController',
            templateUrl: 'public/views/login.html',
            hideMenus: true
        })

        .when('/user_reserve_restaurant', {
            controller: 'MainController',
            templateUrl: 'public/user_reserve_restaurant.html'
        })

        .when('/user_my_reservations', {
            controller: 'UserReservationsController',
            templateUrl: 'public/user_my_reservations.html'
        })


        .when('/calendar', {
            controller: 'CalendarController',
            templateUrl: 'public/calendar.html'
        })



        .otherwise({ redirectTo: '/' });
}]);

// .run(['$rootScope', '$location', '$cookieStore', '$http',
//     function ($rootScope, $location, $cookieStore, $http) {
//         // keep user logged in after page refresh
//         $rootScope.globals = $cookieStore.get('globals') || {};
//         if ($rootScope.globals.currentUser) {
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//         }
//
//         $rootScope.$on('$locationChangeStart', function (event, next, current) {
//             // redirect to login page if not logged in
//             if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                 $location.path('/login');
//             }
//         });
//     }]);
