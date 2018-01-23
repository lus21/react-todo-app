import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './styles/index.less';

import { Provider } from 'react-redux';
import store from './appRedux/store';

// ReactDOM.render(<App />, document.getElementById('app')); //React witout Redux

// With REDUX
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
