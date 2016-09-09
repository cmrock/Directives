/**
 * Created by chirag on 09.09.16.
 */
var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {


    $scope.inputa = {
        "name": "Max",
        "city": "Berlin",
        "color": "red"
    };
    $scope.inputb = {
        "name": "Muster",
        "city": "Hamburg",
        "color": "Blue"

    };


    $scope.inputc = {
        "email": "Max@blabla.de",
        "telephone": "017669845452"
    };
    $scope.inputd = {
        "email": "Muster@blabla.de",
        "telephone": "017659545785"
    };
});


// Radio directive
//

app.directive('radioDirective', function() {
    return {
        restrict: 'E',
        templateUrl: "radio-directive.html",
        scope: {
            input1: "=",
            input2: "="
        },

        controller: function($scope) {
            // $scope.radiocombined=[];
            // for (var k in $scope.input2){
            //     if ($scope.input1[k] !== undefined) {
            //       $scope.radiocombined.push({
            //         [[k]]:[$scope.input1[k], $scope.input2[k]]
            //       })
            //     } else {
            //       $scope.radiocombined.push({
            //         [[k]]:[$scope.input1[k],$scope.input2[k]]
            //       })
            //     }

            //   }

            var data = [$scope.input1, $scope.input2];

            function combineKeyData(data) {
                var output = {},
                    item;
                for (var i = 0; i < data.length; i++) {
                    item = data[i];
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            if (!(key in output)) {
                                output[key] = [];
                            }
                            output[key].push(item[key]);
                        }
                    }
                }
                return output;
            }
            $scope.radioResult = combineKeyData(data);

            $scope.Utils = {
                keys: Object.keys($scope.radioResult)
            }
            $scope.name = {};

        }
    };
});


// checkbox directive
//
app.directive('checkboxDirective', function() {
    return {
        restrict: 'E',
        templateUrl: "checkbox-directive.html",
        scope: {
            input3: "=",
            input4: "="
        },

        controller: function($scope) {

            var data = [$scope.input3, $scope.input4];

            function combineKeyData(data) {
                var output = {},
                    item;
                for (var i = 0; i < data.length; i++) {
                    item = data[i];
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            if (!(key in output)) {
                                output[key] = [];
                            }
                            output[key].push(item[key]);
                        }
                    }
                }
                return output;
            }
            $scope.checkboxResult = combineKeyData(data);

            $scope.Utils = {
                keys: Object.keys($scope.checkboxResult)
            }

            $scope.eSelection = [];
            $scope.dataSelection = function(value) {
                var idx = $scope.eSelection.indexOf(value);

                if (idx > -1) {
                    $scope.eSelection.splice(idx, 1);
                } else {
                    $scope.eSelection.push(value);
                }
            };

        }
    };
});
