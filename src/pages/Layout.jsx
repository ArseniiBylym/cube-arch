import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {About, Classes, Gallery, Groups, Programs, Tours} from './';
import {Header} from '../components/Layout';

const Layout = () => {
    return (
        <div className="Layout">
            <div className="header">
                <Header />
            </div>
            <div className="content">
                <Switch>
                    <Route exact path="/groups" component={Groups} />
                    <Route exact path="/programs" component={Programs} />
                    <Route exact path="/classes" component={Classes} />
                    <Route exact path="/tours" component={Tours} />
                    <Route exact path="/gallery" component={Gallery} />
                    <Route exact path="/about" component={About} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </div>
        </div>
    );
};

export default Layout;
