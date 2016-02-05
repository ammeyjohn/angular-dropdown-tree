(function($, angular) {
    'use strict';

    var default_option = {
        'plugins': ['changed'],
        'core': {
            'check_callback': true,
            'data': []
        }
    }

    function uiDropdownTreeCtrl() {

    }

    function uiDropdownTreeDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                treeData: '=dropdownTreeData'
            },
            templateUrl: '../src/template.html',
            controller: 'uiDropdownTreeCtrl',
            link: function link(scope, elm, attrs, controller) {

                // 为每个控件生成唯一的id编号
                var randomId = Math.random().toString(36).substr(2);
                scope.dLabel = 'dLabel_' + randomId;

                // 保存jsTree对象实例
                var tree = null;

                var getOption = function(data) {
                	var opt = angular.copy(default_option);
                    opt = angular.extend({}, opt);
                    if (scope.treeData) {
                        opt.core.data = data;
                    }
                    return opt;
                }

                // 初始化jstree组件
                var initTree = function(data) {

                    // 初始化树控件
                    tree = $(elm).find('div.dropdown-menu div');
                    if(tree.length == 0) {
                    	tree = $('<div />');
                    	$(elm).find('div.dropdown-menu').append(tree);
                    }

                   	// 获取配置
                    var opt = getOption(data);

                    // 初始化树配置
                    tree
                        .on('changed.jstree', function(e, data) {
                            var title = data.instance.get_node(data.selected).text;
                            scope.dropdown_title = title;
                            scope.$apply();
                            $(elm).removeClass('open');
                        })
                        .on('click', function(e) {
                            e.stopPropagation();
                        })
                        .jstree(opt);
                }

                var destoryTree = function() {
                	if(tree) {
                		tree.jstree('destroy');
                		tree.remove();
                		tree = null
                	}
                }

                scope.$watch('treeData', function(newData) {
                    if (newData) {
                    	destoryTree();
                        initTree(newData);
                    }
                });
            }
        }
    }

    //// Angular Code ////
    var module = angular.module('uiDropdownTree', []);
    module.controller('uiDropdownTreeCtrl', uiDropdownTreeCtrl);
    module.directive('uiDropdownTree', uiDropdownTreeDirective);

})(jQuery, angular);