'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TodoItems = require('./components/TodoItems.jsx');

ReactDOM.render(
	<TodoItems />,
  document.getElementById('readitemscontainer')
	);
