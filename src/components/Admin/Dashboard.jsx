import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom';
import {Profile, Users, Groups, Programs, Classes, Tours, Articles, Gallery} from './routes'
import styles from './Dashboard.module.scss'
import './Dashboard.scss';

const routes = [
    {path: '/admin/dashboard/profile', component: Profile, name: 'Profile'},
    {path: '/admin/dashboard/users', component: Users, name: 'Subscribers'},
    {path: '/admin/dashboard/groups', component: Groups, name: 'Groups'},
    {path: '/admin/dashboard/programs', component: Programs, name: 'Programs'},
    {path: '/admin/dashboard/classes', component: Classes, name: 'Classes'},
    {path: '/admin/dashboard/tours', component: Tours, name: 'Tours'},
    {path: '/admin/dashboard/articles', component: Articles, name: 'Articles'},
    {path: '/admin/dashboard/gallery', component: Gallery, name: 'Gallery'},
]

export const Dashboard = (props) => {

    return (
        <div className={styles.root}>
            <div className={styles.nav}>
                {routes.map(item => (
                    <NavLink key={item.path} to={item.path}>{item.name}</NavLink>
                ))}
            </div>
            <div className={styles.main}>
                <Switch>
                {routes.map(item => (
                    <Route key={item.path} path={item.path} component={item.component} />
                ))}
                </Switch>
            </div>
        </div>
    )
}

