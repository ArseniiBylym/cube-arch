import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import { Api } from './../../../api/index';

import styles from './Users.module.scss'

export const Users = props => {
const users = useStoreState(state => state.admin.users);
const setUsers = useStoreActions(state => state.admin.setUsers);
const deleteUser = useStoreActions(state => state.admin.deleteUser);

useEffect(() => {
    if (!users) {
        Api.users.getAll()
            .then(({docs}) => {
                console.log(docs)
                setUsers(docs)
            })
            .catch(error => console.log(error))
    }
}, [])

    return (
        <div className={styles.root}>
            Users here
        </div>
    )
};
