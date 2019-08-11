import React, {useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Api } from './../../../api/index';
import styles from './styles.module.scss'
import { Spinner } from './../../shared/Spinner';

export const TestClasses = props => {
    const usersTestClasses = useStoreState(state => state.content.usersTestClasses);
    const setUsersTestClasses = useStoreActions(state => state.content.setUsersTestClasses);
    const deleteUserTestClasses = useStoreActions(state => state.content.deleteUserTestClasses);

    useEffect(() => {
        if (!usersTestClasses) {
            fetchUsers();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchUsers = async() => {
        try {
            const snapshot = await Api.users.getAllTestClasses();
            let users = [];
            snapshot.forEach(doc => {
                users.push({...doc.data(), id: doc.id})
            });
            setUsersTestClasses(users)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = id => async e => {
        try {
            await Api.users.deleteTestClass(id);
            deleteUserTestClasses(id) 
        } catch (error) {
            console.log(error)
        }
    }

    if (!usersTestClasses) return <Spinner />
    return (
        <div className={styles.root}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="left">Child</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {usersTestClasses.map(item => (
                    <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell align="left">{item.email}</TableCell>
                        <TableCell align="left">{item.phone}</TableCell>
                        <TableCell align="left">{item.child}</TableCell>
                        <TableCell align="center"><Button onClick={deleteHandler(item.id)} color="secondary" >Delete</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
};
