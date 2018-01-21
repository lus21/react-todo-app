import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class Todos extends Component {
    render() {
        return(
            <table className="table table-striped mt-5">
                <thead>
                <tr>
                    <th>Todo</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.todos.map((todo, i) => <TodoRow key = {todo._id} todo = { todo } url={ this.props.url }  editTodo={ this.props.editTodo } deleteTodo={this.props.deleteTodo}/>)}
                </tbody>
            </table>
        )
    }
}

class TodoRow extends Component {
    render() {
        return (
            <tr>
                <td>{ this.props.todo.content }</td>
                <td><TodoButtonsGroup todo = { this.props.todo } url={ this.props.url }  editTodo = { this.props.editTodo } deleteTodo={this.props.deleteTodo}  /></td>
            </tr>
        )
    }
}
class TodoButtonsGroup extends Component {
    render() {
        return (
            <div className="d-flex flex-row">
                <form className="p-2" action = { this.props.url + this.props.todo._id }>
                    <button type="button" className="btn btn-default" onClick={ this.props.editTodo } data-content={this.props.todo.content } >Edit</button>
                </form>
                <form className="p-2" action={ this.props.url + this.props.todo._id }>
                    <button type="button" className="btn btn-danger" onClick={ this.props.deleteTodo }>Delete</button>
                </form>
            </div>
        )
    }
}

Todos.propTypes = {
    url: PropTypes.string.isRequired,
    todos: PropTypes.array.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};
Todos.defaultProps = {
    url: 'http://localhost:3000/api/todos/',
    todos: [],
};
TodoRow.propTypes = {
    url: PropTypes.string.isRequired,
    todo:  PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};
TodoRow.defaultProps = {
    url: 'http://localhost:3000/api/todos/',
    todo: { _id: '', content: '' },
};
TodoButtonsGroup.propTypes = {
    url: PropTypes.string.isRequired,
    todo:  PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};
TodoButtonsGroup.defaultProps = {
    url: 'http://localhost:3000/api/todos/',
    todo: { _id: '', content: '' },
};

export default Todos;