import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./todoActions";
const url = 'http://localhost:3000/';

export function todoActions() {
    console.log('todoActions');
    console.log(GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO )
}

const initialState = {
    todos: [] // TodosReducer
};

export function getTodos() {
    return {
        type: GET_TODOS,
        payload: { url, method: 'GET' }
    };
}

export function addTodo(todo) {
    return {
        type: GET_TODOS,
        payload: { url, method: 'POST', todo }
    };
}

export function updateTodo(_id, todo) {
    return {
        type: UPDATE_TODO,
        payload: { url: url + _id, method: 'PUT', todo }
    };
}

export function deleteTodo(_id) {
    return {
        type: DELETE_TODO,
        payload: { url: url + _id, method: 'DELETE' }
    };
}

function fetchAsyncData() {
    return function(dispatch) {
        fetch(url,)
            .then((res) => res.json())
            .then(result => dispatch(addAsyncData(result)))
    }
}
/**
 * Reducer
 */
export default function(state = initialState.todos, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TODOS:
            return state + 1;
        case ADD_TODO:
            return state + 1;
        case UPDATE_TODO:
            return state + 1;
        case DELETE_TODO:
            return state - 1;
        default:
            return state;
    }
}