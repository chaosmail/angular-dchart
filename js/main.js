var app = angular.module('dchart', []);

// Main Controller
app.controller("MainCtrl", ['$scope', '$timeout', function($scope,$timeout) {

    $scope.dataSetLine1 = [
        {x:5,y:5}, {x:15,y:35}, {x:45,y:25}
    ];

    $scope.dataSetLine2 = [
        {x:5,y:5}, {x:15,y:35}, {x:45,y:25}
    ];

    var countUp = function() {

        $scope.dataSetLine1.push({x:Math.random()*100,y:Math.random()*100});
        if ($scope.dataSetLine1.length > 5) $scope.dataSetLine1.shift();

        $scope.dataSetLine2.push({x:Math.random()*100,y:Math.random()*100});
        if ($scope.dataSetLine2.length > 5) $scope.dataSetLine2.shift();

        $timeout(countUp, 500);
    };

    $timeout(countUp, 500);
}]);