var React = require('react');
var ReactAddons = require('react-addons');
var TodoItem = require('./TodoItem.jsx');


module.exports = React.createClass({
	mixins: [ReactAddons.LinkedStateMixin],
    getInitialState() {
        return {
            todoItems: [
                {
                    task: 'Learn React',
                },
                {
                    task: 'Learn Webpack',
                },
                {
                    task: 'Conquer World',
                }
            ],
            owner: 'John Doe',
        };
    },

    render() {
        var todoItems = this.state.todoItems;
        var owner = this.state.owner;

        return <div>
            <div className='ChangeOwner'>
                <input type='text' valueLink={this.linkState('owner')} />
            </div>

            <div className='TodoItems'>
                <ul>{todoItems.map((todoItem, i) =>
                    <li key={'todoitem' + i}>
                        <TodoItem owner={owner} task={todoItem.task} />
                    </li>
                )}</ul>
            </div>
        </div>;
    }
});