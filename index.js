
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import 'antd-mobile/dist/antd-mobile.less';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducers from './app/redux/reducers/index';
import logger from 'redux-logger'
// import 'antd/dist/antd.less';
import './assets/iconfot/iconfont';

let store = createStore(reducers,applyMiddleware(logger));
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    ,document.getElementById('app'));