import React, {useState, useEffect} from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import {Profile, Users, Groups, Programs, Classes, Tours, Articles} from './routes'
import Grid from '@material-ui/core/Grid';
import styles from './Dashboard.module.scss'
import './Dashboard.scss';

const routes = [
    {path: '/admin/dashboard/profile', component: Profile, name: 'Profile'},
    {path: '/admin/dashboard/users', component: Users, name: 'Users'},
    {path: '/admin/dashboard/groups', component: Groups, name: 'Groups'},
    {path: '/admin/dashboard/programs', component: Programs, name: 'Programs'},
    {path: '/admin/dashboard/classes', component: Classes, name: 'Classes'},
    {path: '/admin/dashboard/tours', component: Tours, name: 'Tours'},
    {path: '/admin/dashboard/articles', component: Articles, name: 'Articles'},
]

export const Dashboard = (props) => {
    useEffect(() => {
        console.log(props)
    })

    return (
        <div className={styles.root}>
            <Grid container>
                <Grid item xs={2} md={2}>
                    <div className={styles.nav}>
                        {routes.map(item => (
                            <NavLink key={item.path} to={item.path}>{item.name}</NavLink>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={10} md={10}>
                    <div className={styles.main}>
                        <Switch>
                        {routes.map(item => (
                            <Route key={item.path} path={item.path} component={item.component} />
                        ))}
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

