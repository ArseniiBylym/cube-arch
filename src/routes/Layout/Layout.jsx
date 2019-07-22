import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {About, Classes, Gallery, Programs, ProgramDetails, Tours, Articles, Contacts, BlogArticle} from './pages';
import {Header} from '../../components/Layout';
import {Particles} from '../../components/shared';
import styles from './Layout.module.scss';

const Layout = () => {
    return (
        <div className={styles.root}>
            <Particles />
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.main}>
                <Switch>
                    {/* <Route exact path="/groups" component={Groups} /> */}
                    <Route exact path="/courses" component={Programs} />
                    <Route exact path="/courses/:id" component={ProgramDetails} />
                    <Route exact path="/classes" component={Classes} />
                    <Route exact path="/tours" component={Tours} />
                    <Route exact path="/gallery" component={Gallery} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/articles" component={Articles} />
                    <Route exact path="/articles/:id" component={BlogArticle} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </div>
        </div>
    );
};

export default Layout;
