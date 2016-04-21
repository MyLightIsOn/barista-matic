'use strict';

angular.module('baristaMaticApp')
    .factory('drinks', function ($http) {
        var drinkList = function(){
            return $http.get('/api/drinks');
        };

        // Public API here
        return {
            drinkList : drinkList
        };
    });
