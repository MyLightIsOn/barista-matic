'use strict';

angular.module('baristaMaticApp')
    .factory('drinks', function ($http, inventory) {

        var drinkList = function(){
            return $http.get('/api/drinks');
        };

        var drinkSelect = function(selectedDrink, ingredientList){
            var drinkIngredients = selectedDrink.ingredients,
                drinkIngArr = [];

            for (var ingredients in drinkIngredients) {
                drinkIngArr.push(drinkIngredients[ingredients]);
            }

            inventory.updateIngredients(drinkIngArr, ingredientList)
        };

        // Public API here
        return {
            drinkList : drinkList,

            drinkSelect : drinkSelect
        };
    });
