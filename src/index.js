import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {StoreProvider} from 'easy-peasy';
import App from './App';
import {store} from './store';
import {MaterialThemeProvider} from './config/themeProvider';
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
