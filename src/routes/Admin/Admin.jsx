import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Spinner} from '../../components/shared';
import styles from './Admin.module.scss';
import {Route} from 'react-router-dom'
import { Login, Dashboard } from './../../components/Admin';
import { Api } from './../../api';

const Admin = () => {
    const isAuth = useStoreState(state => state.auth.isAuth);
    const auth = useStoreState(state => state.auth.admin);
    const adminFetched = useStoreState(state => state.auth.adminFetched);
    const loginFailed = useStoreActions(actions => actions.auth.loginFailed);
    const loginSuccess = useStoreActions(actions => actions.auth.loginSuccess);

    useEffect(() => {
        if (!isAuth && !adminFetched) {  // disable firebase request    NEED TO REMOVE IN FUTURE !!!!
            fetchAdmin();
        }  
    }, []);

    const fetchAdmin = async () => {
        const credentials = getCredentials();
        if (!credentials || !credentials.email || !credentials.password) {
            return loginFailed();
        }
        try {
            const admin = await Api.admin.login({...credentials});
            return loginSuccess({...credentials, admin: {
                email: admin.email,
                uid: admin.uid,
            }});
        } catch(error) {
            console.log(error);
            return loginFailed();
        }   
    };

    const getCredentials = () => {
        const email = localStorage.getItem('adminEmail');
        const password = localStorage.getItem('adminPassword');
        const expDate = +localStorage.getItem('expDate');
        return (!email || !password || new Date(expDate).getTime() < Date.now()) ? null : {email, password};
    }

    if (!adminFetched) return <Spinner />;
    return (
        <div className={styles.root}>
            
            {isAuth ? (
                <Dashboard />
            ) : (
                <Login />
            )}
        </div>
    );
};

export default Admin;
