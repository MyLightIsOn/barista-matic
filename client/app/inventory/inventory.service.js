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
                console.log('Database Updated')
            });
        };

        var restockInventory = function(ingredients){
            for(var i = 0; i < ingredients.length; i++){
                ingredients[i].units = 10;
                $http.put('/api/ingredients/' + ingredients[i]._id, {'units' : 10}).success(function(result){
                    console.log('Ingredients Restocked')
                });
            }
        };

        // Public API here
        return {
            ingredientList : ingredientList,

            updateIngredients : updateIngredients,

            restockInventory: restockInventory
        };
    });
