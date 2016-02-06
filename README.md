# angular-dropdown-tree

angular-dropdown-tree is an angular component that nested jsTree to bootstrap dropdown. 

## Features

* Support full json format of jsTree
* Support ngModel binding, the selection will be bound to the scope
* Support single and multiple selection

## Requirements

* jQuery
* Bootstap
* Angular
* jsTree

## Usage

### Download

* Download from github.

### Load Script

Load the script file: angular-dropdown-tree.js or angular-dropdown-tree.min.js in your application:

```html
<script type="text/javascript" src="angular-dropdown-tree.js"></script>
```

### Code
Add the uiDropdownTree module as a dependency to your application module:

```js
var myAppModule = angular.module('MyApp', ['uiDropdownTree'])
```

#### HTML View or Templates

```html
<ui-dropdown-tree dropdown-tree-data="data" dropdown-tree-multiple="true" ng-model="selected" />
```

## API

### uiDropDownTree

`ui-dropdown-tree` is the root scope of the component.

#### Attributes
##### dropdown-tree-data
Binding the tree data from the scope in your app controller. Below is the references of the format of the data.
[jsTree json format example](https://www.jstree.com/docs/json/)

```json
{
  "id"          : "string",
  "parent"      : "string",
  "text"        : "string",
  "icon"        : "string",
  "state"       : {
    "opened"    : "boolean",
    "disabled"  : "boolean",
    "selected"  : "boolean",
  }
}
```

##### dropdown-tree-multiple
Enable the multiple selection mode. The checkbox will be shown on the jsTree and all checked nodes will be returned by ngModel.

## Useful commands

### Building

To build angular-dropdown-tree, you use the following command.

    $ grunt build

This will generate non-minified and minified JavaScript files in the `dist` directory.
