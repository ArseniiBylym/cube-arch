import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './App.scss';
import {About, Admin, Classes, Gallery, Groups, Home, Programs, Tours} from './pages';

function App() {
    return (
        <div className="App text-primary bg-primary">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/groups" component={Groups} />
                    <Route exact path="/programs" component={Programs} />
                    <Route exact path="/classes" component={Classes} />
                    <Route exact path="/tours" component={Tours} />
                    <Route exact path="/gallery" component={Gallery} />
                    <Route exact path="/about" component={About} />
                    <Route path="/admin" component={Admin} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
