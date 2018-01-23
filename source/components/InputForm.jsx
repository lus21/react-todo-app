import React from 'react';
import PropTypes from 'prop-types';
const url = 'http://localhost:3000/api/todos/';

function InputForm (props) {
    return <div className="row">
                <div className="col-4">
                    <div>
                        { props.errors.map((error, i) => <Error key = { error } error = { error } />)}
                    </div>
                    <div>
                        { props.successMsgs.map((success, i) => <Success key = { success } success = { success } />)}
                    </div>
                    <form action={ url } method="POST" >
                        <div className="form-group">
                            <label htmlFor="todo">Todo Content</label>
                            <input ref={ props.inputRef}  type="text"  className="form-control" id="todo" name="content" placeholder="Enter todo"  />
                        </div>
                        <button type="submit" className="btn btn-success" onClick={ props.todoSubmitAction }>Submit</button>
                    </form>
                </div>
        </div>

}

function Error (props) {
    return <div className="card mb-3 text-center bg-danger">
                <div className="card-block">
                    <blockquote className="card-blockquote">
                        <p>{ props.error.msg }</p>
                    </blockquote>
                </div>
            </div>
}
function Success (props) {
        return <div className="card mb-3 text-center bg-success">
                    <div className="card-block">
                        <blockquote className="card-blockquote">
                            <p>{ props.success.msg }</p>
                        </blockquote>
                    </div>
                </div>

}
InputForm.propTypes = {
    errors: PropTypes.array.isRequired,
    todoSubmitAction: PropTypes.func.isRequired,
};
InputForm.defaultProps = {
    errors: [],
};
Error.propTypes = {
    error: PropTypes.object.isRequired,
};
Error.defaultProps = {
    error: { msg: '' },
};
Success.propTypes = {
    success: PropTypes.object.isRequired,
};
Success.defaultProps = {
    success: { msg: '' },
};

export default InputForm;