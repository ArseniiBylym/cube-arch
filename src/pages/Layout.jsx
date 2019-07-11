import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {About, Classes, Gallery, Groups, Programs, Tours, Articles, Contacts} from './';
import {Header} from '../components/Layout';
import styles from './styles/modules/layout.module.scss';

const Layout = () => {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.main}>
                <Switch>
                    <Route exact path="/groups" component={Groups} />
                    <Route exact path="/programs" component={Programs} />
                    <Route exact path="/classes" component={Classes} />
                    <Route exact path="/tours" component={Tours} />
                    <Route exact path="/gallery" component={Gallery} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/articles" component={Articles} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </div>
        </div>
    );
};

export default Layout;
