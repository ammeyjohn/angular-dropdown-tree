(function(angular) {
    'use strict';

    angular
        .module('dropdownTreeDemo', ['uiDropdownTree'])
        .controller('dropdownTreeDemoCtrl', function($scope) {

            $scope.data = [{
                "id": "ajson1",
                "parent": "#",
                "text": "Simple root node",
                'state': {
                            'opened': true,
                            'selected': true
                        }
            }, {
                "id": "ajson2",
                "parent": "#",
                "text": "Root node 2"
            }, {
                "id": "ajson3",
                "parent": "ajson2",
                "text": "Child 1"
            }, {
                "id": "ajson4",
                "parent": "ajson2",
                "text": "Child 2"
            }]


            $scope.update = function() {
                $scope.data = [
                    'Complex root node', {
                        'text': 'Root node 2hjkhlkj',
                        'state': {
                            'opened': true,
                            'selected': true
                        },
                        'children': [{
                                'text': 'Child 1'
                            },
                            'Child 2'
                        ]
                    }
                ]
            }
        })
})(angular);