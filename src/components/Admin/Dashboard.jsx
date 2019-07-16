import React, {useState, useEffect} from 'react'
import styles from './Dashboard.module.scss'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import {Profile, Users} from './routes'

export const Dashboard = ({match}) => {

    return (
        <div className={styles.root}>
            <div className={styles.nav}>
                <NavLink to="/admin/dashboard/profile">Profile</NavLink>
                <NavLink to="/admin/dashboard/users">Users</NavLink>
                <NavLink to="/admin/dashboard/groups">Groups</NavLink>
                <NavLink to="/admin/dashboard/programs">Programs</NavLink>
                <NavLink to="/admin/dashboard/classes">Classes</NavLink>
                <NavLink to="/admin/dashboard/tours">Tours</NavLink>
                <NavLink to="/admin/dashboard/articles">Articles</NavLink>
            </div>
            <div className={styles.main}>
                <Switch>
                    <Route to="/admin/dashboard/profile" component={Profile} />
                    <Route to="/admin/dashboard/users" component={Users} />
                    <Redirect from="/admin/dashboard/*" to="/admin/dashboard" />
                </Switch>
            </div>
        </div>
    )
};
