import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todos from './Todos.jsx';
import InputForm from './InputForm.jsx';
import { connect } from 'react-redux';
import { asyncGetTodos, asyncAddTodo, asyncUpdateTodo, asyncDeleteTodo } from '../appRedux/reducers/todoReducer';

const url = 'http://localhost:3000/api/todos/';

class App extends Component {
    state = {
        editingTodo: null
    };
    componentDidMount() {
        this.props.getTodos();
    }
    todoSubmitAction = (evt) => {
        evt.preventDefault();
        const body  = {content: this.inputElement.value };
        const editingTodo = this.state.editingTodo;
        this.inputElement.value = '';
        if(editingTodo){
            this.setState({ editingTodo: null });
            this.props.updateTodo(this.state.editingTodo, body);
        } else {
            this.props.addTodo(body);
        }

    };
    editTodo = (evt) => {
        const editTodoUrl = evt.target.parentElement.action;
        this.setState({ editingTodo: editTodoUrl });
        this.inputElement.value = evt.target.dataset.content
    };
    deleteTodo = (evt) => {
        const deleteTodoUrl = evt.target.parentElement.action;
        this.props.deleteTodo(deleteTodoUrl);
        console.log(deleteTodoUrl)
    };
    render() {

        return (
            <div className="App">
                <div className="container mt-lg-3">
                    <InputForm  errors = { this.props.errors } successMsgs = {this.props.successMsgs }  todoSubmitAction={ this.todoSubmitAction } updateInputValue={ this.updateInputValue } inputRef={el => this.inputElement = el} />
                    <Todos todos = { this.props.todos } editTodo={ this.editTodo } deleteTodo={ this.deleteTodo }/>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        errors: state.errors,
        successMsgs: state.successMsgs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTodos: () => dispatch(asyncGetTodos()),
        addTodo: (body) => dispatch(asyncAddTodo(body)),
        updateTodo: (url, body) => dispatch(asyncUpdateTodo(url, body)),
        deleteTodo: (url) => dispatch(asyncDeleteTodo(url)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
