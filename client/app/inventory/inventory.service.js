'use strict';

angular.module('baristaMaticApp')
    .factory('inventory', function ($http) {
        var ingredientList = function(){
            return $http.get('/api/ingredients');
        };

        var updateIngredients = function(ingredientsToSubtract, ingredientsToUpdate){

            for(var i = 0; i < ingredientsToUpdate.length; i++){
                var remainingValue = ingredientsToUpdate[i].units -= ingredientsToSubtract[i];
                updateDB(remainingValue,ingredientsToUpdate[i])
            }
        };

        var updateDB = function(remainingValue, ingredientsToUpdate){
            $http.put('/api/ingredients/' + ingredientsToUpdate._id, {'units' : remainingValue}).success(function(result){
                console.log(result)
            });
        };

        // Public API here
        return {
            ingredientList : ingredientList,

            updateIngredients : updateIngredients
        };
    });
