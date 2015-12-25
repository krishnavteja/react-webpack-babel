var React = require('react');


module.exports = React.createClass({
    getInitialState() {
        return {
            // let's keep track of how many times we have liked the item
            likes: 0,
        };
    },
    render() {
        var owner = this.props.owner;
        var task = this.props.task;
        var likes = this.state.likes;

        return <div className='TodoItem'>
            <span className='TodoItem-owner'>{owner}</span>
            <br/>
            <span className='TodoItem-task'>{task}</span>
            <span className='TodoItem-likes'>{likes}</span>
            <span className='TodoItem-like' onClick={this.like}>Like</span>
        </div>;
    },
    like() {
        this.setState({
            likes: this.state.likes + 1
        });
    },
});