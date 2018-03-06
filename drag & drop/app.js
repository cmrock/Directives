var app = angular.module('plunker', ['ui', 'ngSanitize']);

app.controller('MainCtrl', function($scope) {

    /*
    * @description
    * Two array set ($scope.list1, $scope.list2)
    * */
    $scope.list1 = [{
        'id': 1,
        'html': '<div><table> <tr><td rowspan="3"><img src="https://placehold.it/50x50" class="circular"></td><td><b>Name</b></td><td>person1</td></tr><tr><td><b>Contact</b></td><td>0512446545445</td></tr><tr><td><b>City</b></td><td>Berlin</td></tr></table></div>'
    }, {
        'id': 2,
        'html': '<div> <table> <tr> <td rowspan="3"><img src="https://placehold.it/50x50" class="circular"></td><td><b>Name</b></td><td>person2</td></tr><tr><td><b>Contact</b></td><td>0518323725523</td></tr><tr><td><b>City</b></td><td>Hamburg</td></tr></table></div>'
    }, {
        'id': 3,
        'html': '<div> <table> <tr><td rowspan="3"><img src="https://placehold.it/50x50" class="circular"></td> <td><b>Name</b></td><td>person3</td></tr><tr><td><b>Contact</b></td><td>0512874545445</td></tr><tr><td><b>City</b></td><td>Leipzig</td></tr></table></div>'
    }, {
        'id': 4,
        'html': '<div> <table> <tr><td rowspan="3"><img src="https://placehold.it/50x50" class="circular"></td> <td><b>Name</b></td><td>person4</td></tr><tr><td><b>Contact</b></td><td>0512454509445</td></tr><tr><td><b>City</b></td><td>Munich</td></tr></table></div>'
    }];
    $scope.list2 = [{
        'id': 5,
        'html': '<div><table> <tr><td rowspan="3"><img src="https://placehold.it/50x50" class="circular"></td><td><b>Name</b></td><td>person5</td></tr><tr><td><b>Contact</b></td><td>0176124545445</td></tr><tr><td><b>City</b></td><td>koeln</td></tr></table></div>'
    }, {
        'id': 6,
        'html': '<div> <table> <tr><td rowspan="3"><img src="https://placehold.it/50x50" class="circular"></td> <td><b>Name</b></td><td>person6</td></tr><tr><td><b>Contact</b></td><td>0276183232523</td></tr><tr><td><b>City</b></td><td>Halle</td></tr></table></div>'
    }, {
        'id': 7,
        'html': '<div> <table> <tr> <td rowspan="3"><img src="https://placehold.it/50x50" class="circular"></td><td><b>Name</b></td><td>person7</td></tr><tr><td><b>Contact</b></td><td>0432128745455</td></tr><tr><td><b>City</b></td><td>Rostock</td></tr></table></div>'
    }, {
        'id': 8,
        'html': '<div> <table> <tr><td rowspan="3"><img src="https://placehold.it/50x50" class="circular"></td> <td><b>Name</b></td><td>person8</td></tr><tr><td><b>Contact</b></td><td>0431355454095</td></tr><tr><td><b>City</b></td><td>Stuttgard</td></tr></table></div>'
    }];

    /*
    * @description
    * Create empty array ($scope.list3) and add empty object as length of $scope.list2
    * */
    $scope.list3 = [];
    for (var i = 0; i < $scope.list2.length; i++) {
        $scope.list3.push({});
    }

    /*
    * @description
    * Create empty array ($scope.list4) and add empty object
    * */
    $scope.list4=[];
    $scope.list4.push({});

});

/*
* @description
* dragDropDirective for dragging object and drop into empty slots
* */
app.directive('dragdropDirective', function() {
    return {
        restrict: 'EA',
        // require: ['myDraggable','myDroppable','mySortable'],
        templateUrl: 'dragdrop-directive.html',
        scope: {
            data1: '=', //$scope.list1
            data2: '=', //$scope.list2
            data3: '=', //$scope.list3
            data4:'='   //$scope.list4
        },
        controller: function($scope) {
            $scope.paired = [];
            $scope.combined = [];
            var clipboard;

            $scope.handleDrag = function(obj) {
                clipboard = obj;
            };
            /*
            * @params {text}
            * @description
            * function to filter paired object after drag and drop action
            * */
            $scope.pairFilter = function(text) {
                var wordsToFilter = 'undefined';
                for (var i = 0; i < wordsToFilter.length; i++) {
                    if (text.indexOf(wordsToFilter) !== -1) {
                        return false;
                    }
                }
                return true;
            };
            /*
            * @params {text}
            * @description
            * function to filter unpaired object after drag and drop action
            * */
            $scope.unpairFilter = function(text) {
                var wordsToFilter = 'undefined';
                for (var i = 0; i < wordsToFilter.length; i++) {
                    if (text.indexOf(wordsToFilter) == -1) {
                        return false;
                    }
                }
                return true;
            };
            /*
            * @description
            * function to splice data from list 1 and push into list 3 in the dropped index
            * */
            $scope.handleDrop = function(ind) {
                var index = $scope.data3.indexOf(clipboard);
                if (index == -1)
                    $scope.data3[ind] = clipboard;
                $scope.combinedata(ind);

                var data1index = $scope.data1.indexOf(clipboard);
                $scope.data1.splice(data1index, 1);
            };

            $scope.$on('sorted', function(ev, val) {
                $scope.data3.splice(val.to, 0, $scope.data3.splice(val.from, 1)[0]);

            });
            /*
            * @description
            * Function to paired data after drag and drop
            * */
            $scope.combinedata = function(ind) {
                $scope.combine = [$scope.data2[0].id + "-" + $scope.data3[0].id, $scope.data2[1].id + "-" + $scope.data3[1].id, $scope.data2[2].id + "-" + $scope.data3[2].id, $scope.data2[3].id + "-" + $scope.data3[3].id];
            };

        }
    }
});

/*
* @description
* Draggable directive to drag the objects
* */
app.directive('myDraggable', function() {
    return {
        scope: {
            drag: '&'
        },
        link: function(scope, element) {
            var el = element[0];
            el.draggable = true;
            el.addEventListener('dragstart', function(e) {
                console.log(this.id);
                e.dataTransfer.setData('TEXT', " ");
                e.dataTransfer.effectAllowed = 'move';
                scope.$apply('drag()');

                return false;
            }, false);
            el.addEventListener('dragend', function(e) {
                return false;
            }, false);

        },

    };
});
/*
* @description
* Droppable directive to drop the objects
* */
app.directive('myDroppable', function() {
    return {
        scope: {
            drop: '&'
        },
        link: function(scope, element) {
            var el = element[0];
            el.addEventListener('drop', function(e) {
                scope.$apply('drop()');
                return false;
            }, false);

            el.addEventListener('dragover', function(e) {
                e.dataTransfer.dropEffect = 'move';
                if (e.preventDefault) e.preventDefault();
                return false;
            }, false);
        }
    };
});
/*
* @description
* Sortable directive to sort the objects
* */
app.directive('mySortable', function() {
    return {
        link: function(scope, el, attrs) {
            el.sortable({
                revert: true
            });
            el.disableSelection();
            el.on("sortdeactivate", function(event, ui) {
                var ind;
                var from = angular.element(ui.item).scope().$index;
                var to = el.children().index(ui.item);
                scope.$apply(function() {
                    scope.$emit('sorted', {
                        from: from,
                        to: to
                    });
                });
                scope.$apply('combinedata(ind)');
            });
        }
    };
});