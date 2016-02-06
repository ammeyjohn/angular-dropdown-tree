(function($, angular) {
    'use strict';

    var default_option = {
        'plugins': ['changed'],
        'core': {
            'check_callback': true,
            'data': []
        }
    }

    function uiDropdownTreeDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                multiple: '@dropdownTreeMultiple',
                treeData: '=dropdownTreeData'
            },
            require: 'ngModel',
            templateUrl: 'template.html',
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
                    // 是否支持多选
                    if (isMultiple()) {
                        opt.plugins.push('checkbox');
                    }
                    return opt;
                }

                var showSelectedTitle = function(selected) {
                    var title = '';

                    if (selected.length > 3) {
                        title = '选中' + selected.length + '项';
                    } else {
                        for (var i = 0; i < selected.length; i++) {
                        	var item = selected[i];
                        	var text = item;
                        	if(item.text) { text = item.text; }
                        	else if (item.title) { text = item.title; }
                        	else if (item.id) { text = item.id; }
                            title += ',' + text;
                        }
                        title = title.substr(1);
                    }

                    scope.dropdown_title = title;
                }

                // 初始化jstree组件
                var initTree = function(data) {

                    // 初始化树控件
                    tree = $(elm).find('div.dropdown-menu div');
                    if (tree.length == 0) {
                        tree = $('<div />');
                        $(elm).find('div.dropdown-menu').append(tree);
                    }

                    // 获取配置
                    var opt = getOption(data);

                    // 初始化树配置
                    tree
                        .on('changed.jstree', function(e, data) {
                            var selected_nodes = [];
                            for (var selected_id in data.selected) {
                                var node = data.instance.get_node(data.selected[selected_id]);
                                selected_nodes.push(node.original);
                            }
                            scope.$apply(function() {

                                // 设置ngModel
                                controller.$setViewValue(selected_nodes);

                                // 显示选中项
                                showSelectedTitle(selected_nodes);
                            });

                            if (!isMultiple()) {
                                // 关闭dropdownMenu
                                $(elm).removeClass('open');
                            }
                        })
                        .on('click', function(e) {
                            e.stopPropagation();
                        })
                        .jstree(opt);
                }

                var destoryTree = function() {
                    if (tree) {
                        tree.jstree('destroy');
                        tree.remove();
                        tree = null
                    }
                }

                var isMultiple = function() {
                    return scope.multiple.toLowerCase() == 'true';
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
    module.directive('uiDropdownTree', uiDropdownTreeDirective);

})(jQuery, angular);

angular.module('uiDropdownTree').run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("template.html",
    "<div class=\"dropdown\">\n" +
    "    <button id=\"{{dLabel}}\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "        {{dropdown_title}}\n" +
    "        <span class=\"caret\"></span>\n" +
    "    </button>\n" +
    "    <div class=\"dropdown-menu\" aria-labelledby=\"{{dLabel}}\"></div>\n" +
    "</div>\n" +
    "");
}]);
