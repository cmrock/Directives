var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {

    /*
    * @description
    * $scope.inputa and $scope.inputb for Radio Directive
    * */
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

    /*
    * $scope.inputc and $scope.inputd for Checkbox Directive
    * */
    $scope.inputc = {
        "email": "Max@blabla.de",
        "telephone": "017669845452"
    };
    $scope.inputd = {
        "email": "Muster@blabla.de",
        "telephone": "017659545785"
    };
});

/*
* @description
* Radio Directive
* */
app.directive('radioDirective', function() {
    return {
        restrict: 'E',
        templateUrl: "radio-directive.html",
        scope: {
            input1: "=", //inputa
            input2: "="  //inputb
        },

        controller: function($scope) {

            var data = [$scope.input1, $scope.input2];

            // function to merge data with the same key
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
            };
            $scope.name = {};

        }
    };
});

/*
* @description
* Checkbox Directive
* */
app.directive('checkboxDirective', function() {
    return {
        restrict: 'E',
        templateUrl: "checkbox-directive.html",
        scope: {
            input3: "=",  //inputc
            input4: "="   //inputd
        },

        controller: function($scope) {

            var data = [$scope.input3, $scope.input4];

            // function to merge data with the same key
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
            };

            $scope.eSelection = [];

            // function to check and uncheck checkboxes
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
