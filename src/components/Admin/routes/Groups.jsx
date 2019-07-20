import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import styles from './styles.module.scss'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import moment from 'moment';
import { NewGroup, EditGroup } from './../components';
import { Api } from './../../../api/index';
import { Spinner } from './../../shared/Spinner';

export const Groups = props => {
    const groups = useStoreState(state => state.content.groups);
    const setGroups = useStoreActions(state => state.content.setGroups);
    const deleteGroup = useStoreActions(state => state.content.deleteGroup);
    const programs = useStoreState(state => state.content.programs);
    const setPrograms = useStoreActions(state => state.content.setPrograms);

    const [createMode, setCreateMode] = useState(false);
    const [edited, setEdited] = useState(null);

    useEffect(() => {
        if (!groups) {
            fetchData();
        }
        if (!programs) {
            fetchPrograms();
        }
    }, [])

    const fetchPrograms = async() => {
        try {
            const snapshot = await Api.programs.getAll();
            let programs = [];
            snapshot.forEach(doc => {
                programs.push({...doc.data(), id: doc.id})
            });
            setPrograms(programs)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async() => {
        try {
            const snapshot = await Api.groups.getAll();
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            setGroups(docs)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = async (id) => {
        try {
            await Api.groups.delete(id);
            deleteGroup(id) 
        } catch (error) {
            console.log(error)
        }
    }

    const itemsList = () => {
        return groups.map(item => (
            <div key={item.id} className={styles.card}>
                <Grid container>
                    <Grid item xs={4}>
                        <div className={styles.card__image} style={{backgroundImage: `url(${item.image})`}}/>
                    </Grid>
                    <Grid item xs={8} className={styles.card__content}>
                        <h2>{item.name['ukr']}</h2>
                        <div className={styles.card__datetime}>
                            <div className={styles.date}>{moment(+item.startDate).format("DD-MM-YYYY")}</div>
                            <div className={styles.time}>{moment(+item.endDate).format("DD-MM-YYYY")}</div>
                        </div>
                        <div className={styles.card__buttons}> 
                            <Button className={styles.editButton} size="large" color="secondary" variant="contained" onClick={() => setEdited(item)}>Edit</Button>
                            <Button className={styles.deleteButton} size="large" color="primary" variant="contained" onClick={() => deleteHandler(item.id)}>Delete</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        ))
    }

    if (!groups) return <Spinner />
    return (
        <div className={styles.root}>
            {createMode && (
                <NewGroup close={() => setCreateMode(false)} />
            )}
            {edited && (
                <EditGroup close={() => setEdited(null)} editedElem={edited} />
            )}
            {!createMode && !edited && (
                <>
                    <h1>Groups list</h1>
                    <div className={styles.classes}>
                        {itemsList()}
                    </div>
                    <Button className={styles.createButton} size="large" color="secondary" variant="contained" onClick={() => setCreateMode(true)}>Create new</Button>
                </>
            )}
        </div>
    )
};
