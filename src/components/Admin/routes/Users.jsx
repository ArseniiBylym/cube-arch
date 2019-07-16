import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Api } from './../../../api/index';
import styles from './Users.module.scss'
import { Spinner } from './../../shared/Spinner';

export const Users = props => {
    const users = useStoreState(state => state.content.users);
    const setUsers = useStoreActions(state => state.content.setUsers);
    const deleteUser = useStoreActions(state => state.content.deleteUser);

    useEffect(() => {
        if (!users) {
            fetchUsers();
        }
    }, [])

    const fetchUsers = async() => {
        try {
            const snapshot = await Api.users.getAll();
            let users = [];
            snapshot.forEach(doc => {
                users.push({...doc.data(), id: doc.id})
            });
            setUsers(users)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = id => async e => {
        try {
            await Api.users.delete(id);
            deleteUser(id) 
        } catch (error) {
            console.log(error)
        }
    }

    if (!users) return <Spinner />
    return (
        <div className={styles.root}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {users.map(item => (
                    <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell align="left">{item.email}</TableCell>
                        <TableCell align="left">{item.phone}</TableCell>
                        <TableCell align="center"><Button onClick={deleteHandler(item.id)} color="secondary" >Delete</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
};
