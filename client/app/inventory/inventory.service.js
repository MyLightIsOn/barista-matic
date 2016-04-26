'use strict';

angular.module('baristaMaticApp')
    .factory('inventory', function ($http) {
        var ingredientList,
            updateIngredients,
            updateDB,
            restockInventory,
            inventoryPrices,
            inventoryStockCheck,
            inventoryLow;

        ingredientList = function(){
            return $http.get('/api/ingredients');
        };

        updateIngredients = function(ingredientsToSubtract, ingredientsToUpdate, drinkList){
            var inventoryToCheck = [];

            for(var i = 0; i < ingredientsToUpdate.length; i++){
                var remainingValue = ingredientsToUpdate[i].units -= ingredientsToSubtract[i];

                if(remainingValue < 1){
                    ingredientsToUpdate[i].units = 0;
                    ingredientsToSubtract[i] = 0;
                    remainingValue = 0
                }

                updateDB(remainingValue,ingredientsToUpdate[i]);
                inventoryToCheck.push(ingredientsToUpdate[i])
            }

            inventoryStockCheck(inventoryToCheck, drinkList)
        };

        updateDB = function(remainingValue, ingredientsToUpdate){
            $http.put('/api/ingredients/' + ingredientsToUpdate._id, {'units' : remainingValue}).success(function(result){
            });
        };

        restockInventory = function(ingredients,drinkList){
            for(var i = 0; i < ingredients.length; i++){
                ingredients[i].units = 10;
                $http.put('/api/ingredients/' + ingredients[i]._id, {'units' : 10}).success(function(result){
                });
            }

            for(var i = 0; i < drinkList.length; ++i){
                drinkList[i].lowInventory = false;
            }
        };


        inventoryPrices = function(itemName, itemAmount, inventoryList){

            for(var i = 0; i < inventoryList.length; i++){
                if(itemName === inventoryList[i].dbname){
                    var totalCost =  (inventoryList[i].cost * itemAmount).toFixed(2);
                    return parseFloat(totalCost)
                }
            }
        };

        inventoryStockCheck = function(inventory, drinkList){

            for(var i = 0; i < inventory.length; ++i){
                if(inventory[i].units <= 4 && inventory[i].units != 0){
                    inventoryLow(inventory[i].dbname, drinkList)
                }
            }
        };

        inventoryLow = function(lowIventoryItem, drinkList){
            for(var i = 0; i < drinkList.length; i++){
                var drink = drinkList[i],
                    drinkIngredients = drink.ingredients;

                for (var ingredients in drinkIngredients) {
                    if(drinkIngredients[ingredients] > 0 && ingredients === lowIventoryItem){
                        drink.lowInventory = true;
                    }
                }
            }
        };

        // Public API here
        return {
            ingredientList : ingredientList,

            updateIngredients : updateIngredients,

            restockInventory : restockInventory,

            inventoryPrices : inventoryPrices,

            inventoryStockCheck : inventoryStockCheck
        };
    });
