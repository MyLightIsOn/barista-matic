'use strict';

angular.module('baristaMaticApp')
    .factory('drinks', function ($http, inventory) {
        var drinkList,
            drinkIndex,
            drinkSelect,
            drinkCost,
            buildPriceObj,
            priceObj = [],
            calculatePrice,
            attachPrice;

        drinkList = function(){
            return $http.get('/api/drinks');
        };

        drinkIndex = function(drinkList){
            for(var i = 0; i < drinkList.length; ++i){
                drinkList[i].drinkNumber = i + 1
            }
            return drinkList
        };

        drinkSelect = function(selectedDrink, ingredientList){
            var drinkIngredients = selectedDrink.ingredients,
                drinkIngArr = [];

            for (var ingredients in drinkIngredients) {
                drinkIngArr.push(drinkIngredients[ingredients]);
            }

            inventory.updateIngredients(drinkIngArr, ingredientList)
        };

        drinkCost = function(drinkIngredientList, ingredientList){

            for(var i = 0; i < drinkIngredientList.length; ++i){
                var drinkIngredients = drinkIngredientList[i].ingredients,
                    drinkDataName = drinkIngredientList[i].dataName,
                    drinkName = drinkIngredientList[i].name,
                    totalCost = [];


                for (var ingredients in drinkIngredients) {
                   var calculatedItemCost = inventory.inventoryPrices(ingredients, drinkIngredients[ingredients], ingredientList);

                        totalCost.push(calculatedItemCost);
                        if(totalCost.length === 9){
                            buildPriceObj(totalCost, drinkDataName, drinkName)
                        }

                }
            }
        };

        buildPriceObj = function(totalCost, drinkDataName, drinkName){
            var newDrinkObj = {};

            newDrinkObj.dataName = drinkDataName;
            newDrinkObj.name = drinkName;
            newDrinkObj['price'] = totalCost;
            priceObj.push(newDrinkObj);
        };

        calculatePrice = function(objToCalc){
            for(var i = 0; i < objToCalc.length; ++i){
                var priceArr = objToCalc[i].price,
                    totalPrice = 0;

                objToCalc[i].totalPrice = totalPrice;

                for(var j = 0; j < priceArr.length; ++j){
                    totalPrice += priceArr[j]
                    objToCalc[i].totalPrice = totalPrice.toFixed(2)
                }

            }
            return objToCalc
        };

        attachPrice = function(priceObj,drinkObj){
            for(var i = 0; i < priceObj.length; i++){
                drinkObj[i].totalPrice = priceObj[i].totalPrice
            }
            return drinkObj
        };

        // Public API here
        return {
            drinkList : drinkList,

            drinkIndex : drinkIndex,

            drinkSelect : drinkSelect,

            drinkCost : drinkCost,

            priceObj : priceObj,

            calculatePrice : calculatePrice,

            attachPrice : attachPrice
        };
    });
