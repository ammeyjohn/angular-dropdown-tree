(function($, angular){
	'use strict';

	var default_option = {
		'plugins': [
			'state',
			'changed'
		],
		'core': {
			'check_callback' : true,
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

				// 初始化树控件
				var tree = $('<div />');
				$(elm).find('div.dropdown-menu').append(tree);


				// 初始化jstree组件
				var initTree = function(data) {

					// 初始化jstree配置
					var opt = angular.extend({}, default_option);
					if(scope.treeData) {opt.core.data = data; }

					// 初始化树配置
					tree
					.on('changed.jstree', function(e, data){
						var title = data.instance.get_node(data.selected).text;
						scope.dropdown_title = title;
						scope.$apply();
						$(elm).removeClass('open');
					})
					.on('click', function(e){
						e.stopPropagation();
					})
					.jstree(opt);
				}

				scope.$watch('treeData', function(newData){
					if(newData) {
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