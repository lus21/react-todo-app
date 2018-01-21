import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todos from './Todos.jsx';
import InputForm from './InputForm.jsx';

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            url: 'http://localhost:3000/api/todos/',
            todos:[],
            errors: [],
            successMsgs: [],
            editTodoUrl: '',
            todoInputValue: '',
            todoSubmitAction: this.addTodo, //will change this.submitEditTodo when todo edit button is pressed
        };

    }
    componentDidMount() {
        fetch(this.state.url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ todos: data.todos })
                this.setState({ errors: data.errors })
                this.setState({ successMsgs: data.successMsgs })
            })
            .catch(console.error);

    } // end componentDidMount
    updateInputValue = (evt)=>{
        this.setState({ todoInputValue: evt.target.value });
    };
    //Todo edit button pressed
    editTodo = (evt) => {
        const editTodoUrl = evt.target.parentElement.action;
        this.setState({ todoInputValue: evt.target.dataset.content });
        this.setState({ editTodoUrl: editTodoUrl });
        this.setState({ todoSubmitAction: this.submitEditTodo });
    };
    addTodo = (evt) => {
        evt.preventDefault();
        fetch(this.state.url, {
            method: 'POST',
            body: JSON.stringify({ content: this.state.todoInputValue }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ todos: data.todos });
                this.setState({ errors: data.errors });
                this.setState({ successMsgs: data.successMsgs });
                this.setState({ todoInputValue: '' });
            })
            .catch((error) => {
                this.setState({ errors: [{ msg: 'Something went wrong' }] });
            });

    };
    submitEditTodo = (evt) => {
        evt.preventDefault();
        fetch(this.state.editTodoUrl, {
            method: 'PUT',
            body: JSON.stringify({ content: this.state.todoInputValue }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ todos: data.todos });
                this.setState({ errors: data.errors });
                this.setState({ successMsgs: data.successMsgs });
                this.setState({ editTodoUrl: '' });
                this.setState({ todoInputValue: '' });
                this.setState({ todoSubmitAction: this.addTodo });
            })
            .catch((error) => {
                this.setState({ errors: [{ msg: 'Something went wrong' }] });
            });

    };
    deleteTodo = (evt) => {
        const url = evt.target.parentElement.action;
        fetch(url, {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({ todos: data.todos });
            this.setState({ errors: data.errors });
            this.setState({ successMsgs: data.successMsgs });
        })
       .catch((error) => {
           this.setState({ errors: [{ msg: 'Something went wrong' }] });
       });
    };
    render() {
        return (
            <div className="container mt-lg-3">
                <InputForm  errors = { this.state.errors } successMsgs = {this.state.successMsgs } todoInputValue={ this.state.todoInputValue } todoSubmitAction={ this.state.todoSubmitAction } updateInputValue={ this.updateInputValue } />
                <Todos todos = { this.state.todos } url={ this.state.url } editTodo={ this.editTodo } deleteTodo={ this.deleteTodo }/>
            </div>
        );
    }
}

export default App;