import React, {useContext} from 'react';
import {Route, Switch, Redirect, __RouterContext} from 'react-router-dom';
import {About, Classes, ClassDetails, Gallery, Programs, ProgramDetails, Tours, TourDetails, Articles, Contacts, BlogArticle} from './pages';
import {Header} from '../../components/Layout';
import {Particles} from '../../components/shared';
import styles from './Layout.module.scss';
import {useTransition, animated} from 'react-spring';

const useRouter = () => useContext(__RouterContext);

const Layout = () => {
    const {location} = useRouter();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 0},
      })
    return (
        <div className={styles.root}>
            <Particles />
            <div className={styles.header}>
                <Header />
            </div>
            {transitions.map(({item, props, key}) => (
                <animated.div className={styles.main} key={key} style={props}>
                    <Switch location={item}>
                        <Route exact path="/courses" component={Programs} />
                        <Route exact path="/courses/:id" component={ProgramDetails} />
                        <Route exact path="/classes" component={Classes} />
                        <Route exact path="/classes/:id" component={ClassDetails} />
                        <Route exact path="/tours" component={Tours} />
                        <Route exact path="/tours/:id" component={TourDetails} />
                        <Route exact path="/gallery" component={Gallery} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/articles" component={Articles} />
                        <Route exact path="/articles/:id" component={BlogArticle} />
                        <Route exact path="/contacts" component={Contacts} />
                        <Redirect from="/*" to="/" />
                    </Switch>
                </animated.div>
            ))}
        </div>
    );
};

export default Layout;
