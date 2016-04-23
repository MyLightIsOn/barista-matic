'use strict';

angular.module('baristaMaticApp')
    .controller('MainCtrl', function ($scope, $http, $document, socket, inventory, drinks) {
        $scope.drinkList = [],

        inventory.ingredientList().success(function(data){
           $scope.ingredientList = data;
        });

        drinks.drinkList().success(function(data){
            $scope.drinkList = data;
            drinks.drinkCost(data, $scope.ingredientList);
            $scope.drinkListAndPrice = drinks.calculatePrice(drinks.priceObj)
        });

        $scope.drinkSelect = function(event, selectedDrink) {
            drinks.drinkSelect(selectedDrink, $scope.ingredientList);
        };

        $document.bind('keypress', function(e){
            if(e.charCode === 114){
                inventory.restockInventory($scope.ingredientList)
            }

            if(e.charCode === 49 || e.charCode === 50 || e.charCode === 51 || e.charCode === 52 || e.charCode === 53 || e.charCode === 54){
                 var selectedDrink;

                switch(e.charCode){
                    case 49:
                        selectedDrink = $scope.drinkList[0];
                        break;

                    case 50:
                        selectedDrink = $scope.drinkList[1];
                        break;

                    case 51:
                        selectedDrink = $scope.drinkList[2];
                        break;

                    case 52:
                        selectedDrink = $scope.drinkList[3];
                        break;

                    case 53:
                        selectedDrink = $scope.drinkList[4];
                        break;

                    case 54:
                        selectedDrink = $scope.drinkList[5];
                        break;
                }

                $scope.drinkSelect(event, selectedDrink);
            }
        })
    });
