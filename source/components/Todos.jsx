import React from 'react';
import PropTypes from 'prop-types';
const url = 'http://localhost:3000/api/todos/';

function Todos(props) {
    return  <table className="table table-striped mt-5">
                <thead>
                <tr>
                    <th>Todo</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { props.todos.map((todo, i) => <TodoRow key = {todo._id} todo = { todo } url={ url }  editTodo={ props.editTodo } deleteTodo={ props.deleteTodo}/>)}
                </tbody>
            </table>
}

function TodoRow (props) {
        return <tr>
                    <td>{ props.todo.content }</td>
                    <td><TodoButtonsGroup todo = { props.todo } url={ url }  editTodo = { props.editTodo } deleteTodo={ props.deleteTodo}  /></td>
                </tr>
}
function TodoButtonsGroup (props) {
        return <div className="d-flex flex-row">
                    <form className="p-2" action = { url + props.todo._id }>
                        <button type="button" className="btn btn-default" onClick={ props.editTodo } data-content={ props.todo.content } >Edit</button>
                    </form>
                    <form className="p-2" action={ url + props.todo._id }>
                        <button type="button" className="btn btn-danger" onClick={ props.deleteTodo }>Delete</button>
                    </form>
                </div>
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};
Todos.defaultProps = {
    todos: [],
};
TodoRow.propTypes = {
    todo:  PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};
TodoRow.defaultProps = {
    todo: { _id: '', content: '' },
};
TodoButtonsGroup.propTypes = {
    todo:  PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};
TodoButtonsGroup.defaultProps = {
    todo: { _id: '', content: '' },
};

export default Todos;