angular.module('myApp')
    .service('sharedProperties', function () {
        var username = "";
        var restaurant_name = "";
        var type_of_account = "";

        return {
            getUserName: function () {
                return username;
            },
            setUserName: function(value) {
                username = value;
            },
            getRestaurantName: function () {
                return restaurant_name;
            },
            setRestaurantName: function(value) {
                restaurant_name = value;
            },
            getTypeOfAccount:function () {
                return type_of_account;
            },
            setTypeOfAccount: function(value) {
                type_of_account = value;
            },
        };
    });