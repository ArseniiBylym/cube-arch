import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {StoreProvider} from 'easy-peasy';
import App from './App';
import {store} from './store';
import {MaterialThemeProvider} from './config/themeProvider';
import * as serviceWorker from './serviceWorker';
import './index.scss';

const Root = () => {
    return (
        <StoreProvider store={store}>
            <Router>
                <MaterialThemeProvider>
                    <App />
                </MaterialThemeProvider>
            </Router>
        </StoreProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
