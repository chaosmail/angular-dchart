var app = angular.module('dchart', []);

// Main Controller
app.controller("MainCtrl", ['$scope', '$timeout', function($scope,$timeout) {

    $scope.dataSet = [
        [
            {x:5,y:5}, {x:15,y:35}, {x:45,y:25}
        ]
    ];

    /*var countUp = function() {
        $scope.dataSet[0].push({x:Math.random()*50,y:Math.random()*50});

        if ($scope.dataSet[0].length > 10)
            $scope.dataSet[0].shift();

        $timeout(countUp, 500);
    };

    $timeout(countUp, 500);*/
}]);