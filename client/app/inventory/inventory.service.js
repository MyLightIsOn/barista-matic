'use strict';

angular.module('baristaMaticApp')
    .factory('inventory', function ($http) {
        var ingredientList = function(){
            return $http.get('/api/ingredients');
        };

        var updateIngredients = function(ingredientsToSubtract, ingredientsToUpdate){

            for(var i = 0; i < ingredientsToUpdate.length; i++){
                var remainingValue = ingredientsToUpdate[i].units -= ingredientsToSubtract[i];

                if(remainingValue < 1){
                    ingredientsToUpdate[i].units = 0;
                    ingredientsToSubtract[i] = 0;
                    remainingValue = 0
                }

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


        var inventoryPrices = function(itemName, itemAmount, inventoryList){

            for(var i = 0; i < inventoryList.length; i++){
                if(itemName === inventoryList[i].dbname){
                    var totalCost =  (inventoryList[i].cost * itemAmount).toFixed(2);
                    return parseFloat(totalCost)
                }
            }
        };

        // Public API here
        return {
            ingredientList : ingredientList,

            updateIngredients : updateIngredients,

            restockInventory : restockInventory,

            inventoryPrices : inventoryPrices
        };
    });
