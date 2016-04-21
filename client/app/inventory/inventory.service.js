'use strict';

angular.module('baristaMaticApp')
    .factory('inventory', function ($http) {
        var ingredientList = function(){
            return $http.get('/api/ingredients');
        };

        var updateIngredients = function(ingredientsToSubtract, ingredientsToUpdate){

            for(var i = 0; i < ingredientsToUpdate.length; i++){
                ingredientsToUpdate[i].units -= ingredientsToSubtract[i];
                console.log(ingredientsToUpdate[i])
            }
        };

        // Public API here
        return {
            ingredientList : ingredientList,

            updateIngredients : updateIngredients
        };
    });
