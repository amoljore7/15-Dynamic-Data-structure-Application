import React from 'react';
import ReactDOM from 'react-dom';
import combineAllReducer from './combineAllReducer'
import App from './App.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';

import * as serviceWorker from './serviceWorker';

const store = createStore(combineAllReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Xroot = () => {
    return (<Provider store={store}> <App /> </Provider>);
}
ReactDOM.render(<Xroot />, document.getElementById('root'));

serviceWorker.register();
