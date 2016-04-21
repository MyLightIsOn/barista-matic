'use strict';

angular.module('baristaMaticApp')
    .controller('MainCtrl', function ($scope, $http, socket, inventory, drinks) {
        $scope.drinkList = [],

        inventory.ingredientList().success(function(data){
           $scope.ingredientList = data;
        });

        drinks.drinkList().success(function(data){
            $scope.drinkList = data;
        });

        $scope.drinkSelect = function(event, el) {
            var selectedDrink = el;
            drinks.drinkSelect(selectedDrink);
        };
    });
