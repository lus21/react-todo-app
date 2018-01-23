const GET_TODOS = 'Get all todos',
      ADD_TODO = 'Add todo',
      UPDATE_TODO = 'Update todo',
      DELETE_TODO = 'Delete todo';

const url = 'http://localhost:3000/api/todos/';

const initialState = {
    todos: [],
    errors: [],
    successMsgs: [],
};

function getTodos(result) {
    return {
        type: GET_TODOS,
        payload: { todos: result.todos, errors:result.errors, successMsgs:result.successMsgs }
    };
}

function addTodo(result) {
    return {
        type: ADD_TODO,
        payload: { todos: result.todos, errors:result.errors, successMsgs:result.successMsgs }
    };
}

function updateTodo(result) {
    return {
        type: UPDATE_TODO,
        payload: { todo: result.todo, errors:result.errors, successMsgs:result.successMsgs }
    };
}

function deleteTodo(result) {
    return {
        type: DELETE_TODO,
        payload: { todo: result.todo, errors:result.errors, successMsgs:result.successMsgs }
    };
}


export function asyncGetTodos() {
    return function(dispatch) {
        fetch(url)
            .then((res) => res.json())
            .then(result => {
                dispatch(getTodos(result))
            })
    }
}
export function asyncAddTodo(body) {
    return function(dispatch) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(result => {
                dispatch(addTodo(result))
            })
    }
}
export function asyncUpdateTodo(url, body) {
    return function(dispatch) {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(result => {
                dispatch(updateTodo(result))
            })
    }
}
export function asyncDeleteTodo(url) {
    return function(dispatch) {
        fetch(url, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(result => {
                dispatch(deleteTodo(result))
            })
    }
}
/**
 * Reducer
 */
export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TODOS:
            return {
                ...state,
                todos: [...state.todos, ...payload.todos],
                errors: payload.errors,
                successMsgs: payload.successMsgs
            };
        case ADD_TODO:
            console.log('reducer ADD_TODO')
            return {
                ...state,
                todos: [...state.todos, ...payload.todos],
                errors: payload.errors,
                successMsgs: payload.successMsgs
            };
        case UPDATE_TODO:
            const updatedTodos = state.todos.map((todo) => {
                if (todo._id == payload.todo._id) {
                    todo.content = payload.todo.content;
                }
                return todo;
            });
            return {
                ...state,
                todos: updatedTodos,
                errors: payload.errors,
                successMsgs: payload.successMsgs
            };
        case DELETE_TODO:
            const todosAfterDelete = state.todos.filter(todo => todo._id !== payload.todo._id);
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== payload.todo._id),
                errors: payload.errors,
                successMsgs: payload.successMsgs
            };
        default:
            return state;
    }
}