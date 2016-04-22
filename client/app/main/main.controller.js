'use strict';

angular.module('baristaMaticApp')
    .controller('MainCtrl', function ($scope, $http, $document, socket, inventory, drinks) {
        $scope.drinkList = [],

        inventory.ingredientList().success(function(data){
           $scope.ingredientList = data;
        });

        drinks.drinkList().success(function(data){
            $scope.drinkList = data;
        });

        $scope.drinkSelect = function(event, el) {
            var selectedDrink = el;
            drinks.drinkSelect(selectedDrink, $scope.ingredientList);
        };

        $document.bind('keypress', function(e){
            if(e.charCode === 114){
                inventory.restockInventory($scope.ingredientList)
            }
        })
    });
