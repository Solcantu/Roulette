import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

import * as serviceWorker from './serviceWorker';
import { Provider  } from 'react-redux';

import { store } from './app/store/store';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:8001';
export const socket = socketIOClient(ENDPOINT);

socket.close();

// Variables for displaying App information
export const appVersion = '0.4.0'
export const devBuild = true;

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
                <App />
        </Provider>
    </React.StrictMode>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();