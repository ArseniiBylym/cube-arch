import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Admin, Home, Layout} from './pages';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/" component={Layout} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
