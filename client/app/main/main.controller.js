'use strict';

angular.module('baristaMaticApp')
    .controller('MainCtrl', function ($scope, $http, socket) {
        $scope.awesomeThings = [],
        $scope.ingredientList = [];

        $http.get('/api/things').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
            socket.syncUpdates('thing', $scope.awesomeThings);
        });

        $http.get('/api/ingredients').success(function(ingredientList) {
            $scope.ingredientList = ingredientList;
            socket.syncUpdates('ingredient', $scope.ingredientList);
        });

        $scope.addThing = function() {
            if($scope.newThing === '') {
                return;
            }
            $http.post('/api/things', { name: $scope.newThing });
            $scope.newThing = '';
        };

        $scope.deleteThing = function(thing) {
            $http.delete('/api/things/' + thing._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('thing');
        });
    });
