import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
const url = 'http://localhost:3000/api/todos/';

class InputForm extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            keysId: 0,
        };
    };
    generateId = () => {
        this.setState( { keysId: this.state.keys + 1 });
        return this.state.keysId;
    };
    render() {
        return(
            <div className="row">
                <div className="col-4">
                    <div>
                        {this.props.errors.map((error, i) => <Error key = { this.generateId } error = { error } />)}
                    </div>
                    <div>
                        {this.props.successMsgs.map((success, i) => <Success key = { this.generateId } success = { success } />)}
                    </div>
                    <form action={ url } method="POST" >
                        <div className="form-group">
                            <label htmlFor="todo">Todo Content</label>
                            <input type="text" className="form-control" id="todo" name="content" placeholder="Enter todo"  value={ this.props.todoInputValue } onChange={this.props.updateInputValue} />
                        </div>
                        <button type="submit" className="btn btn-success" onClick={ this.props.todoSubmitAction }>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
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
    todoInputValue: PropTypes.string,
    updateInputValue: PropTypes.func.isRequired,
    todoSubmitAction: PropTypes.func.isRequired,
};
InputForm.defaultProps = {
    errors: [],
    todoInputValue: '',
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