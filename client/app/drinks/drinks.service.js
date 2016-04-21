'use strict';

angular.module('baristaMaticApp')
    .factory('drinks', function ($http) {

        var drinkList = function(){
            return $http.get('/api/drinks');
        };

        var drinkSelect = function(selectedDrink){
            var drinkIngredients = selectedDrink.ingredients;

            for (var ingredients in drinkIngredients) {
                console.log(ingredients + ' : ' + drinkIngredients[ingredients]);
            }
        };

        // Public API here
        return {
            drinkList : drinkList,

            drinkSelect : drinkSelect
        };
    });
