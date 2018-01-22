import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todos from './Todos.jsx';
import InputForm from './InputForm.jsx';

import { increment, decrement } from '../appRedux/reducers/userReducer';
import { todoActions } from '../appRedux/reducers/todoReducer';

// todoActions();
import { connect } from 'react-redux';

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
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
                this.setState({ todos: data.todos, errors: data.errors, successMsgs: data.successMsgs  })
            })
            .catch((error) => {
                this.setState({ errors: [{ msg: 'Something went wrong' }] });
            });

    } // end componentDidMount
    updateInputValue = (evt)=>{
        this.setState({ todoInputValue: evt.target.value });
    };
    //Todo edit button pressed
    editTodo = (evt) => {
        console.log(this.props.todo);
        const editTodoUrl = evt.target.parentElement.action;
        this.setState({ todoInputValue: evt.target.dataset.content, editTodoUrl: editTodoUrl, todoSubmitAction: this.submitEditTodo });
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
                if (data.errors.length > 0) {
                    this.setState({errors: data.errors, successMsgs: data.successMsgs});
                } else {
                    this.setState({ todos: [data.todo, ...this.state.todos], errors: data.errors, successMsgs: data.successMsgs, todoInputValue: ''  });
                }
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
                console.log(data);
                const todos = this.state.todos.map((todo) => {
                    if (todo._id == data.todo._id) {
                        todo.content = data.todo.content;
                    }
                    return todo;
                });
                this.setState({ todos, errors: data.errors, successMsgs: data.successMsgs, editTodoUrl: '', todoInputValue: '', todoSubmitAction: this.addTodo  });
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
            const todos = this.state.todos.filter((todo) => { return todo._id !== data.todo._id });
            this.setState({ todos: todos, errors: data.errors, successMsgs: data.successMsgs });
        })
       .catch((error) => {
           this.setState({ errors: [{ msg: 'Something went wrong' }] });
       });
    };
    render() {
        return (
            <div className="container mt-lg-3">
                <InputForm  errors = { this.state.errors } successMsgs = {this.state.successMsgs } todoInputValue={ this.state.todoInputValue } todoSubmitAction={ this.state.todoSubmitAction } updateInputValue={ this.updateInputValue } />
                <Todos todos = { this.state.todos } editTodo={ this.editTodo } deleteTodo={ this.deleteTodo }/>
            </div>
        );
    }
}

export default App;

// ----------------------------REDUX-----------------------------------------
// class App extends Component {
//     componentWillMount() {
//         // console.log(this.props.updateUser());
//     }
//     render() {
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <p>Logo replaced with paragraph</p>
//                     <h1 className="App-title">Welcome to React</h1>
//                 </header>
//                 <p className="App-intro">
//                     {this.props.counter}
//                 </p>
//                 <button onClick={this.props.increment}>increment</button>
//                 <button onClick={this.props.decrement}>Decrement</button>
//             </div>
//         );
//     }
// }
//
//
// function mapStateToProps(state) {
//     return {
//         counter: state,
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         increment: () => dispatch(increment()),
//         decrement: () => dispatch(decrement())
//     };
// }
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App);
